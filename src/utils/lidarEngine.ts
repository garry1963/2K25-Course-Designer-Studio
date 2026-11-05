export interface LiDARPoint {
  x: number;
  y: number;
  z: number;
  classification: 'ground' | 'vegetation' | 'water' | 'building' | 'road';
  intensity: number;
}

export interface LiDARProcessConfig {
  crs: string;
  horizontalUnit: 'meters' | 'feet';
  verticalDatum: 'NAVD88' | 'EGM96' | 'Ellipsoidal';
  gridResolution: number; // e.g. 1m or 2m
  smoothPasses: number;
  removeVegetation: boolean;
  elevationExaggeration: number;
  cropBounds: { xMin: number; xMax: number; yMin: number; yMax: number };
}

export interface ProcessingReport {
  fileName: string;
  totalPoints: number;
  groundPoints: number;
  filteredOutliers: number;
  detectedCRS: string;
  elevationRange: { min: number; max: number; unit: string };
  gridDimensions: { width: number; height: number };
  tgcToolsCompatible: boolean;
  warnings: string[];
  recommendations: string[];
}

/**
 * Procedural generation of a realistic golf course Digital Elevation Model (DEM)
 * Simulates real USGS / UK DEFRA LiDAR point-clouds for golf course sites
 */
export function generateProceduralHeightmap(
  width = 64,
  height = 64,
  style: 'rolling' | 'mountain' | 'dunes' | 'flat' = 'rolling'
): number[][] {
  const grid: number[][] = [];
  const freq1 = style === 'mountain' ? 0.04 : style === 'dunes' ? 0.08 : 0.03;
  const freq2 = style === 'mountain' ? 0.12 : 0.06;

  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      // Perlin-style sinusoidal multi-octave noise
      const n1 = Math.sin(x * freq1) * Math.cos(y * freq1);
      const n2 = Math.sin((x + 15) * freq2) * Math.cos((y + 12) * freq2) * 0.4;
      const n3 = Math.sin((x + y) * 0.15) * 0.15;
      
      // Ridge or valley feature
      let elevation = (n1 + n2 + n3 + 1.5) / 3.0; // [0..1]
      
      if (style === 'mountain') {
        elevation = Math.pow(elevation, 1.4) * 1.6;
      } else if (style === 'dunes') {
        elevation = Math.sin(x * 0.1 + n1 * 2) * 0.2 + elevation * 0.8;
      }
      
      // Clamp between 0 and 1
      row.push(Math.max(0, Math.min(1, elevation)));
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Generate simulated LiDAR point cloud points with classification
 */
export function generateSampleLiDARPoints(count = 1500): LiDARPoint[] {
  const points: LiDARPoint[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 800 + 100;
    const y = Math.random() * 800 + 100;
    
    // Base elevation
    const distFromCenter = Math.hypot(x - 500, y - 500);
    const baseElev = 100 + Math.sin(x * 0.01) * 15 + Math.cos(y * 0.008) * 20 - (distFromCenter * 0.02);
    
    const r = Math.random();
    let classification: LiDARPoint['classification'] = 'ground';
    let z = baseElev;
    
    if (r < 0.65) {
      classification = 'ground';
      z = baseElev + (Math.random() - 0.5) * 0.2;
    } else if (r < 0.90) {
      classification = 'vegetation';
      z = baseElev + 3 + Math.random() * 12; // Canopy return
    } else if (r < 0.96) {
      classification = 'road';
      z = baseElev;
    } else {
      classification = 'water';
      z = 92.5; // Water table
    }

    points.push({
      x,
      y,
      z,
      classification,
      intensity: Math.floor(Math.random() * 255)
    });
  }
  return points;
}

export const COMMON_GOLF_CRS = [
  { code: 'EPSG:32618', name: 'WGS 84 / UTM zone 18N (US East Coast - Pinehurst, Sawgrass)', unit: 'meters' },
  { code: 'EPSG:32617', name: 'WGS 84 / UTM zone 17N (Augusta, GA, Ohio, Florida)', unit: 'meters' },
  { code: 'EPSG:32610', name: 'WGS 84 / UTM zone 10N (Pacific Coast - Pebble Beach, Bandon)', unit: 'meters' },
  { code: 'EPSG:27700', name: 'OSGB36 / British National Grid (St Andrews, Troon, Royal Birkdale)', unit: 'meters' },
  { code: 'EPSG:28355', name: 'GDA94 / MGA zone 55 (Melbourne Sandbelt, Victoria, Australia)', unit: 'meters' },
  { code: 'EPSG:3857', name: 'WGS 84 / Pseudo-Mercator (Web Mapping / OSM)', unit: 'meters' }
];
