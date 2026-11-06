import { Hole, CourseProject } from '../types/golf';

export function createBlankHoles(count: 9 | 18 = 18): Hole[] {
  const holes: Hole[] = [];
  const pars: (3 | 4 | 5)[] = count === 9 
    ? [4, 5, 3, 4, 4, 4, 3, 5, 4] 
    : [4, 5, 3, 4, 4, 4, 3, 5, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4];
  
  const yardages = count === 9
    ? [410, 525, 175, 390, 445, 340, 210, 560, 435]
    : [410, 525, 175, 390, 445, 340, 210, 560, 435, 420, 455, 160, 515, 430, 545, 180, 365, 470];

  for (let i = 1; i <= count; i++) {
    const par = pars[i - 1] || 4;
    const yardage = yardages[i - 1] || 400;
    
    // Position sequentially across a 1000x1000 plot
    const angle = (i / count) * Math.PI * 2;
    const centerX = 500;
    const centerY = 500;
    const teeDist = 320;
    const greenDist = 380;
    
    const teeX = Math.round(centerX + Math.cos(angle) * teeDist);
    const teeY = Math.round(centerY + Math.sin(angle) * teeDist);
    const greenX = Math.round(centerX + Math.cos(angle + 0.2) * greenDist);
    const greenY = Math.round(centerY + Math.sin(angle + 0.2) * greenDist);
    
    holes.push({
      id: `h_${Date.now()}_${i}`,
      number: i,
      par,
      yardage,
      elevationChangeYards: (i % 3 === 0) ? -12 : (i % 2 === 0) ? 8 : 0,
      dogleg: (i % 4 === 0) ? 'Right' : (i % 3 === 0) ? 'Left' : 'Straight',
      handicapIndex: i,
      description: `Hole #${i}: Par ${par}, ${yardage} yards. Ready for custom fairway shaping, green complex sculpting, and bunkering.`,
      tee: { x: teeX, y: teeY, elevation: 100 },
      landing1: {
        x: Math.round((teeX + greenX) / 2),
        y: Math.round((teeY + greenY) / 2),
        elevation: 100
      },
      green: { x: greenX, y: greenY, elevation: 100, radius: 18 },
      pins: [
        { id: `p_${i}_1`, x: greenX, y: greenY, difficulty: 'Medium' }
      ],
      bunkers: [
        {
          id: `b_${i}_1`,
          type: 'greenside',
          x: greenX - 14,
          y: greenY - 8,
          radiusX: 9,
          radiusY: 5,
          depthMeters: 1.5,
          rotation: 20
        }
      ],
      waterHazards: [],
      notes: 'Initial plot setup. Follow blank plot zeroing procedure in 2K25 Course Designer.',
      completedSteps: {
        plotSetup: true,
        sculptTerrain: false,
        layFairway: false,
        greenComplex: false,
        bunkersPlaced: false,
        hazardDecor: false,
        vegetation: false,
        playtested: false
      }
    });
  }

  return holes;
}

export function createNewCourseProject(options: {
  name: string;
  subtitle?: string;
  style?: CourseProject['style'];
  environmentTheme?: string;
  holesCount?: 9 | 18;
  locationName?: string;
}): CourseProject {
  const holesCount = options.holesCount || 18;
  const holes = createBlankHoles(holesCount);
  const totalYardage = holes.reduce((sum, h) => sum + h.yardage, 0);
  const totalPar = holes.reduce((sum, h) => sum + h.par, 0);

  return {
    id: `proj_${Date.now()}`,
    name: options.name || 'Untitled Course Project',
    subtitle: options.subtitle || `${holesCount}-Hole Championship Course`,
    style: options.style || 'Championship',
    environmentTheme: options.environmentTheme || 'boreal',
    holesCount,
    targetLengthYards: totalYardage,
    targetPar: totalPar,
    locationName: options.locationName || 'Custom Location',
    isRealRecreation: false,
    conceptPrompt: `A world-class ${holesCount}-hole ${options.style || 'Championship'} course designed for PGA TOUR 2K25.`,
    aiConceptSummary: 'Brand new project initialized with zeroed automated layout and clean plot boundaries ready for manual sculpting.',
    aiRecommendations: [
      `Configure the 2K25 "${options.environmentTheme || 'Boreal'}" theme settings.`,
      'Apply the community blank plot zero-out workflow before laying fairways.',
      'Calibrate green slopes below 2.2 degrees for tournament fairness.'
    ],
    holes,
    objectBudget: {
      currentTrees: 500,
      maxTrees: 10000,
      currentProps: 50,
      maxProps: 1200,
      estimatedMemoryMb: 85,
      maxMemoryMb: 950
    },
    playtestLogs: [],
    lastModified: new Date().toLocaleString(),
    version: 'v1.0-draft'
  };
}
