export interface Hole {
  id: string;
  number: number;
  par: 3 | 4 | 5;
  yardage: number;
  elevationChangeYards: number; // e.g. -12 (downhill) or +18 (uphill)
  dogleg: 'Straight' | 'Left' | 'Right' | 'Double';
  handicapIndex: number;
  description: string;
  // Routing points in course plot coordinates (0..1000)
  tee: { x: number; y: number; elevation: number };
  landing1?: { x: number; y: number; elevation: number };
  landing2?: { x: number; y: number; elevation: number };
  green: { x: number; y: number; elevation: number; radius: number };
  pins: { id: string; x: number; y: number; difficulty: 'Easy' | 'Medium' | 'Sunday Pin' }[];
  bunkers: {
    id: string;
    type: 'fairway' | 'greenside' | 'pot' | 'waste' | 'cross';
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    depthMeters: number;
    rotation: number;
  }[];
  waterHazards: {
    id: string;
    type: 'lake' | 'creek' | 'coastal' | 'marsh';
    points: { x: number; y: number }[];
  }[];
  notes: string;
  completedSteps: {
    plotSetup: boolean;
    sculptTerrain: boolean;
    layFairway: boolean;
    greenComplex: boolean;
    bunkersPlaced: boolean;
    hazardDecor: boolean;
    vegetation: boolean;
    playtested: boolean;
  };
}

export interface CourseTheme {
  id: string;
  name: string;
  description: string;
  verifiedInGame: boolean;
  typicalVegetation: string[];
  suitableStyles: string[];
  suggestedBackdrop: string;
  suggestedWater: string;
  terrainCharacteristics: string;
  recommendedColors: {
    fairway: string;
    green: string;
    rough: string;
    bunkerSand: string;
    water: string;
  };
}

export interface LiDARDataset {
  id: string;
  name: string;
  sourceType: 'LAZ' | 'LAS' | 'GeoTIFF' | 'DEM' | 'ASCII';
  crs: string; // e.g., EPSG:32618 (WGS 84 / UTM zone 18N)
  horizontalUnit: 'meters' | 'feet';
  verticalDatum: 'NAVD88' | 'EGM96' | 'Ellipsoidal';
  pointCount: number;
  minElevation: number;
  maxElevation: number;
  resolutionMeters: number;
  status: 'Ready' | 'Processing' | 'Masked' | 'Exported';
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  heightmapData?: number[][]; // 2D grid of normalized height [0..1]
}

export interface FamousCourseInspiration {
  name: string;
  location: string;
  architect: string;
  year: number;
  type: string;
  signatureFeature: string;
  description: string;
  keyDesignPrinciples: string[];
}

export interface PlaytestLog {
  id: string;
  holeNumber: number;
  date: string;
  tee: 'Championship' | 'Tournament' | 'Member' | 'Forward';
  pinPosition: string;
  driverCarryTested: number;
  fairwayLandingWidthYards: number;
  greenReceptivity: 'Firm' | 'Moderate' | 'Soft';
  missToleranceRating: number; // 1-10
  issuesIdentified: string[];
  notes: string;
}

export interface CourseProject {
  id: string;
  name: string;
  subtitle: string;
  style: 'Championship' | 'Traditional Links' | 'Sandbelt' | 'Desert Oasis' | 'Alpine Mountain' | 'Tropical Rainforest' | 'Heathland';
  environmentTheme: string; // theme ID
  holesCount: 9 | 18;
  targetLengthYards: number;
  targetPar: number;
  locationName: string;
  isRealRecreation: boolean;
  gpsCoords?: { lat: number; lng: number };
  conceptPrompt: string;
  aiConceptSummary?: string;
  aiRecommendations?: string[];
  holes: Hole[];
  lidar?: LiDARDataset;
  objectBudget: {
    currentTrees: number;
    maxTrees: number;
    currentProps: number;
    maxProps: number;
    estimatedMemoryMb: number;
    maxMemoryMb: number;
  };
  playtestLogs: PlaytestLog[];
  lastModified: string;
  version: string;
}
