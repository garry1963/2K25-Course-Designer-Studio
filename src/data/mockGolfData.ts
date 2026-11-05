import { CourseTheme, FamousCourseInspiration, CourseProject, Hole } from '../types/golf';

export const OFFICIAL_2K25_THEMES: CourseTheme[] = [
  {
    id: 'boreal',
    name: 'Boreal',
    description: 'Crisp northern woodland landscape surrounded by dense coniferous pine forests, clear freshwater glacial lakes, and undulating granite outcrops.',
    verifiedInGame: true,
    typicalVegetation: ['Tall Scots Pine', 'Balsam Fir', 'Spruce', 'Birch Clusters', 'Highland Heather'],
    suitableStyles: ['Championship Parkland', 'Northern Woodland', 'Canadian Shield'],
    suggestedBackdrop: 'Distant Pine Ridges & Misty Mist',
    suggestedWater: 'Deep Blue Glacial Lakes & Mountain Creeks',
    terrainCharacteristics: 'Rolling moraines, dramatic rocky ledges, soft undulating sandy subsoil.',
    recommendedColors: {
      fairway: '#2d6a4f',
      green: '#52b788',
      rough: '#1b4332',
      bunkerSand: '#e9d8a6',
      water: '#1d3557'
    }
  },
  {
    id: 'links',
    name: 'Links',
    description: 'Authentic coastal dunesland influenced by Atlantic sea breezes, golden fescue whisps, firm sod-walled revetted bunkers, and ripple-filled fairways.',
    verifiedInGame: true,
    typicalVegetation: ['Wild Fescue', 'Marram Grass', 'Gorse Bushes', 'Sea Cabbage'],
    suitableStyles: ['Traditional British Links', 'Pure Coastal Dunes', 'Open Ocean Links'],
    suggestedBackdrop: 'Open Ocean Horizon & Sand Dune Bluff',
    suggestedWater: 'Tidal Swells, Burns & Swales (minimal still ponds)',
    terrainCharacteristics: 'Firm natural swales, rumpled fairway hummocks, deep sunken greens, and natural dune valleys.',
    recommendedColors: {
      fairway: '#4f772d',
      green: '#90a955',
      rough: '#606c38',
      bunkerSand: '#ddb892',
      water: '#264653'
    }
  },
  {
    id: 'tropical',
    name: 'Tropical',
    description: 'Lush exotic paradise characterized by volcanic backdrop peaks, coconut palm groves, crystal turquoise lagoons, and dramatic ocean cliffside tee shots.',
    verifiedInGame: true,
    typicalVegetation: ['Coconut Palm', 'Banana Trees', 'Ferns', 'Bamboo Groves', 'Hibiscus'],
    suitableStyles: ['Resort Golf', 'Island Championship', 'Ocean Cliff'],
    suggestedBackdrop: 'Jagged Volcanic Peaks & Coral Reef Lagoon',
    suggestedWater: 'Turquoise Coral Bays & Serene Waterfalls',
    terrainCharacteristics: 'Dramatic cliff drops, terraced jungle ravines, elevated amphitheatre greens.',
    recommendedColors: {
      fairway: '#38b000',
      green: '#70e000',
      rough: '#007200',
      bunkerSand: '#fefae0',
      water: '#0077b6'
    }
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Southwestern canyon style featuring stark red rock sandstone buttes, saguaro cacti, transition waste areas, and target-style oasis fairways.',
    verifiedInGame: true,
    typicalVegetation: ['Saguaro Cactus', 'Cholla', 'Mesquite Bushes', 'Desert Scrub', 'Palo Verde'],
    suitableStyles: ['Southwest Target Golf', 'Canyon Championship', 'Desert Oasis'],
    suggestedBackdrop: 'Red Sandstone Mesas & Distant Desert Haze',
    suggestedWater: 'Reflective Oasis Basins & Dry Washes / Arroyos',
    terrainCharacteristics: 'Sharp rocky canyon cuts, flat scrub plains bordered by steep scree bluffs.',
    recommendedColors: {
      fairway: '#588157',
      green: '#a3b18a',
      rough: '#b08968',
      bunkerSand: '#e7c6ff',
      water: '#2a9d8f'
    }
  },
  {
    id: 'countryside',
    name: 'Countryside',
    description: 'Classic British & European pastoral landscape framed by mature oaks, hedgerows, stone cottages, and gentle rolling farmland.',
    verifiedInGame: true,
    typicalVegetation: ['English Oak', 'Weeping Willow', 'Hawthorn Hedgerows', 'Cow Parsley'],
    suitableStyles: ['Traditional Parkland', 'Estate Golf', 'Manor Course'],
    suggestedBackdrop: 'Pastoral Rolling Meadows & Distant Church Spire',
    suggestedWater: 'Reflective Estate Ponds & Lazy Winding Streams',
    terrainCharacteristics: 'Gentle undulating green hills, natural valley hollows, manicured parkland lawns.',
    recommendedColors: {
      fairway: '#2d6a4f',
      green: '#74c69d',
      rough: '#1b4332',
      bunkerSand: '#faedcd',
      water: '#283618'
    }
  },
  {
    id: 'swiss',
    name: 'Swiss',
    description: 'Towering alpine peaks, dramatic elevation plunges of over 100 feet, crystalline glacial streams, and Swiss chalet architecture.',
    verifiedInGame: true,
    typicalVegetation: ['Alpine Larch', 'Swiss Stone Pine', 'Mountain Wildflowers'],
    suitableStyles: ['High Alpine Mountain Course', 'Downhill Rollercoaster'],
    suggestedBackdrop: 'Snowcapped 14,000ft Alpine Mountain Massifs',
    suggestedWater: 'Chilly Glacier-fed Torrent Rivers & Mountain Tarns',
    terrainCharacteristics: 'Extreme elevation drop-offs, stepped valley tiers, shelf greens carved into hillsides.',
    recommendedColors: {
      fairway: '#386641',
      green: '#6a994e',
      rough: '#2b4d2f',
      bunkerSand: '#f0ebd8',
      water: '#0077b6'
    }
  },
  {
    id: 'harvest',
    name: 'Harvest',
    description: 'Golden midwestern prairie landscape bathed in autumn light, with rustic wooden barns, swaying amber grain fields, and sprawling waste areas.',
    verifiedInGame: true,
    typicalVegetation: ['Amber Wheat Stalks', 'Burr Oak', 'Tall Prairie Grasses', 'Cattails'],
    suitableStyles: ['Sandhills Style', 'Modern American Prairie', 'Heartland Championship'],
    suggestedBackdrop: 'Open Horizon with Amber Grain Silos & Distant Windmills',
    suggestedWater: 'Marshland Ponds & Winding Prairie Creeks',
    terrainCharacteristics: 'Subtle rolling blowouts, expansive sandy expanses, broad generous fairway ribbons.',
    recommendedColors: {
      fairway: '#606c38',
      green: '#a3b18a',
      rough: '#dda15e',
      bunkerSand: '#d4a373',
      water: '#3d5a80'
    }
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'Rugged Appalachian and Pacific Northwest mountain foothill feel with timber trestles, weathered wood fences, and dense fir groves.',
    verifiedInGame: true,
    typicalVegetation: ['Douglas Fir', 'Western Red Cedar', 'Fern Underbrush', 'Blackberry Briars'],
    suitableStyles: ['Timberland Resort', 'Mountain Foothills', 'River Gorge'],
    suggestedBackdrop: 'Dense Evergreen Foothills with Rising Fog',
    suggestedWater: 'Rushing Salmon Streams & Boulder-strewn Ponds',
    terrainCharacteristics: 'Ridge-running fairways, dramatic ravine crossings, elevated tee boxes.',
    recommendedColors: {
      fairway: '#2b580c',
      green: '#639a67',
      rough: '#173f27',
      bunkerSand: '#e0cda9',
      water: '#1e3d59'
    }
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Spectacular New England style in peak fall foliage with flaming crimson maples, golden birch, and dark green hemlocks.',
    verifiedInGame: true,
    typicalVegetation: ['Sugar Maple (Red/Orange)', 'Paper Birch', 'Hemlock', 'Oak'],
    suitableStyles: ['New England Classic', 'Ivy League Championship', 'Adirondack Retreat'],
    suggestedBackdrop: 'Vibrant Multi-color Mountain Ridges',
    suggestedWater: 'Fallen-leaf mirrored lakes and rocky brooks',
    terrainCharacteristics: 'Rolling glacial drift with exposed granite slabs and sunken kettle basins.',
    recommendedColors: {
      fairway: '#406343',
      green: '#74959a',
      rough: '#99582a',
      bunkerSand: '#eddcd2',
      water: '#34495e'
    }
  },
  {
    id: 'step',
    name: 'Step / Steppe',
    description: 'Arid scrubland and plateau setting with terraced canyon shelves, expansive views, and dry washes.',
    verifiedInGame: true,
    typicalVegetation: ['Sagebrush', 'Juniper', 'Dry Thistle', 'Dwarf Pine'],
    suitableStyles: ['High Desert Canyon', 'Badlands Golf', 'Rimrock Championship'],
    suggestedBackdrop: 'Tiered Mesa Terraces & Expansive Blue Sky',
    suggestedWater: 'Dry Arroyos with Occasional Deep Sump Basin',
    terrainCharacteristics: 'Stepped cliffs, tableland plateaus, sharp elevation transitions.',
    recommendedColors: {
      fairway: '#4a6b47',
      green: '#8cb369',
      rough: '#b89c72',
      bunkerSand: '#e6ccb2',
      water: '#4361ee'
    }
  }
];

export const FAMOUS_INSPIRATIONS: FamousCourseInspiration[] = [
  {
    name: 'St Andrews (Old Course)',
    location: 'Fife, Scotland',
    architect: 'Mother Nature & Old Tom Morris',
    year: 1552,
    type: 'Classic Links',
    signatureFeature: 'The Road Hole (17th) & Swilcan Bridge',
    description: 'The Home of Golf. Famous for shared double greens, hidden pot bunkers like Hell Bunker, wide expanses of rolling turf, and the necessity to play along the ground.',
    keyDesignPrinciples: [
      'Generous fairways with hidden strategic angles',
      'Shared double greens for 14 holes',
      'Severely penal pot bunkers requiring sideways pitch-outs',
      'Natural swales, hummocks and hollows (The Valley of Sin)'
    ]
  },
  {
    name: 'Augusta National',
    location: 'Augusta, Georgia, USA',
    architect: 'Alister MacKenzie & Bobby Jones',
    year: 1932,
    type: 'Championship Parkland',
    signatureFeature: 'Amen Corner (11, 12, 13) & Golden Bell Par 3',
    description: 'The pinnacle of parkland drama. Celebrated for pristine white Georgia sand bunkers, dramatic elevation changes unnoticed on television, and segmented sloping greens.',
    keyDesignPrinciples: [
      'Dramatic 100ft elevation drops (e.g. 10th hole downhill sweep)',
      'Subtle collection areas rather than heavy rough',
      'Green complex slope tiers dictating approach quadrant',
      'Risk/reward water carries over creeks (Rae\'s Creek)'
    ]
  },
  {
    name: 'Pinehurst No. 2',
    location: 'Village of Pinehurst, NC, USA',
    architect: 'Donald Ross',
    year: 1907,
    type: 'Sandhills / Heathland',
    signatureFeature: 'Inverted Saucer Green Complexes & Wiregrass Waste Areas',
    description: 'Famed for crowned turtleback greens where errant shots trickle into closely mown collection hollows, placing supreme premium on pitch-and-run recovery shots.',
    keyDesignPrinciples: [
      'Turtleback crowned greens rejecting off-center approach shots',
      'Native wiregrass and sandy pine straw rather than lush rough',
      'Wide fairway corridors tempting aggressive lines',
      'Run-off aprons cut to fairway height'
    ]
  },
  {
    name: 'Pebble Beach Golf Links',
    location: 'Monterey Peninsula, California, USA',
    architect: 'Jack Neville & Douglas Grant',
    year: 1919,
    type: 'Ocean Cliff Links',
    signatureFeature: 'Cliffside 7th Par 3 & Clifftop 8th Blind Second Shot',
    description: 'Spectacular layout clinging to Carmel Bay. Features tiny greens (averaging under 3,500 sq ft), ocean abyss hazard margins, and iconic Pacific winds.',
    keyDesignPrinciples: [
      'Small target greens demanding precise iron play',
      'Intimidating ocean cliff hazards punishing sliced drives',
      'Holes that pivot directly into and out of prevailing coastal winds',
      'Iconic cypress and sea spray visuals'
    ]
  },
  {
    name: 'Royal Melbourne (West)',
    location: 'Black Rock, Victoria, Australia',
    architect: 'Alister MacKenzie',
    year: 1926,
    type: 'Sandbelt',
    signatureFeature: 'Surgically Crisp Sandbelt Bunker Lips & Firm Slopes',
    description: 'The crown jewel of the Melbourne Sandbelt. Renowned for bunkers cut directly into putting surfaces, native tea tree frames, and lightning-fast undulating turf.',
    keyDesignPrinciples: [
      'Bunkers with vertical sand faces flush against the putting green',
      'Doglegs where carrying the corner bunker opens up the green entry',
      'Natural grey/black tea-tree framing and firm sand subbase',
      'Multi-tiered greens encouraging running approach shots'
    ]
  },
  {
    name: 'TPC Sawgrass (Stadium Course)',
    location: 'Ponte Vedra Beach, Florida, USA',
    architect: 'Pete & Alice Dye',
    year: 1980,
    type: 'Modern Stadium / Target',
    signatureFeature: '17th Island Green & 18th Bulkhead Lake Left',
    description: 'The masterclass in psychological intimidation and visual angles. Pete Dye used railroad sleepers, alternating dogleg directions, and visual trickery to disrupt comfort.',
    keyDesignPrinciples: [
      'Alternating hole directions so no two consecutive holes play the same wind',
      'Bulkhead wooden retaining walls along water edges',
      'Bunkers positioned to block the view of receptive landing areas',
      'Target precision required on every approach'
    ]
  }
];

export const INITIAL_HOLES_18: Hole[] = [
  {
    id: 'h1',
    number: 1,
    par: 4,
    yardage: 412,
    elevationChangeYards: -8,
    dogleg: 'Straight',
    handicapIndex: 7,
    description: 'Gentle opening tee shot from an elevated tee looking down toward a generous fairway framed by mature pines. Second shot over a subtle creek to a two-tier green.',
    tee: { x: 120, y: 150, elevation: 110 },
    landing1: { x: 260, y: 195, elevation: 104 },
    green: { x: 380, y: 220, elevation: 102, radius: 18 },
    pins: [
      { id: 'p1_1', x: 375, y: 218, difficulty: 'Easy' },
      { id: 'p1_2', x: 383, y: 222, difficulty: 'Sunday Pin' }
    ],
    bunkers: [
      { id: 'b1_1', type: 'fairway', x: 245, y: 180, radiusX: 12, radiusY: 6, depthMeters: 1.2, rotation: 25 },
      { id: 'b1_2', type: 'greenside', x: 370, y: 228, radiusX: 9, radiusY: 5, depthMeters: 1.5, rotation: -15 }
    ],
    waterHazards: [],
    notes: 'In 2K25: Use smooth blend between tee plateau and fairway roll. Keep green slope under 2.2 degrees.',
    completedSteps: {
      plotSetup: true,
      sculptTerrain: true,
      layFairway: true,
      greenComplex: true,
      bunkersPlaced: true,
      hazardDecor: false,
      vegetation: false,
      playtested: false
    }
  },
  {
    id: 'h2',
    number: 2,
    par: 5,
    yardage: 535,
    elevationChangeYards: 14,
    dogleg: 'Right',
    handicapIndex: 3,
    description: 'Uphill dogleg right par 5. Aggressive players can challenge the fairway corner bunker to reach the plateau green in two.',
    tee: { x: 390, y: 235, elevation: 102 },
    landing1: { x: 500, y: 260, elevation: 108 },
    landing2: { x: 630, y: 240, elevation: 112 },
    green: { x: 740, y: 225, elevation: 116, radius: 20 },
    pins: [
      { id: 'p2_1', x: 735, y: 220, difficulty: 'Medium' }
    ],
    bunkers: [
      { id: 'b2_1', type: 'fairway', x: 515, y: 245, radiusX: 14, radiusY: 7, depthMeters: 1.8, rotation: 40 },
      { id: 'b2_2', type: 'greenside', x: 728, y: 215, radiusX: 10, radiusY: 6, depthMeters: 1.6, rotation: 10 },
      { id: 'b2_3', type: 'greenside', x: 748, y: 235, radiusX: 8, radiusY: 5, depthMeters: 1.4, rotation: -20 }
    ],
    waterHazards: [],
    notes: 'Place false front on the green to reject under-struck 3-woods back down the fairway.',
    completedSteps: {
      plotSetup: true,
      sculptTerrain: true,
      layFairway: true,
      greenComplex: false,
      bunkersPlaced: false,
      hazardDecor: false,
      vegetation: false,
      playtested: false
    }
  },
  {
    id: 'h3',
    number: 3,
    par: 3,
    yardage: 168,
    elevationChangeYards: -18,
    dogleg: 'Straight',
    handicapIndex: 15,
    description: 'Drop-shot par 3 playing over a natural rock quarry pond into an hourglass green protected by deep sod-faced bunkers left and right.',
    tee: { x: 760, y: 250, elevation: 120 },
    green: { x: 820, y: 350, elevation: 102, radius: 15 },
    pins: [
      { id: 'p3_1', x: 818, y: 345, difficulty: 'Medium' },
      { id: 'p3_2', x: 823, y: 355, difficulty: 'Sunday Pin' }
    ],
    bunkers: [
      { id: 'b3_1', type: 'pot', x: 810, y: 348, radiusX: 6, radiusY: 5, depthMeters: 2.1, rotation: 0 },
      { id: 'b3_2', type: 'greenside', x: 830, y: 352, radiusX: 7, radiusY: 5, depthMeters: 1.7, rotation: -30 }
    ],
    waterHazards: [
      {
        id: 'w3_1',
        type: 'lake',
        points: [{ x: 780, y: 290 }, { x: 830, y: 310 }, { x: 800, y: 330 }, { x: 770, y: 300 }]
      }
    ],
    notes: 'Wind will severely knock down high iron shots here. Keep rear collection bowl receptive.',
    completedSteps: {
      plotSetup: true,
      sculptTerrain: true,
      layFairway: true,
      greenComplex: true,
      bunkersPlaced: true,
      hazardDecor: true,
      vegetation: false,
      playtested: false
    }
  },
  {
    id: 'h4',
    number: 4,
    par: 4,
    yardage: 388,
    elevationChangeYards: 5,
    dogleg: 'Left',
    handicapIndex: 9,
    description: 'Slight dogleg left hugging a woodland boundary. A drive placed on the right side of the fairway affords the ideal angle into a punchbowl green.',
    tee: { x: 810, y: 380, elevation: 103 },
    landing1: { x: 740, y: 490, elevation: 105 },
    green: { x: 670, y: 580, elevation: 108, radius: 17 },
    pins: [{ id: 'p4_1', x: 672, y: 578, difficulty: 'Easy' }],
    bunkers: [
      { id: 'b4_1', type: 'fairway', x: 720, y: 470, radiusX: 11, radiusY: 6, depthMeters: 1.5, rotation: 55 }
    ],
    waterHazards: [],
    notes: 'Classic punchbowl green architecture. Funnels approach shots toward the pin.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h5',
    number: 5,
    par: 4,
    yardage: 462,
    elevationChangeYards: -6,
    dogleg: 'Right',
    handicapIndex: 1,
    description: 'The number 1 handicap hole. Long championship par 4 demanding a 270-yard carry over a diagonal ravine, followed by a mid-iron to a well-guarded green.',
    tee: { x: 650, y: 590, elevation: 110 },
    landing1: { x: 530, y: 640, elevation: 105 },
    green: { x: 420, y: 700, elevation: 104, radius: 19 },
    pins: [{ id: 'p5_1', x: 418, y: 698, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b5_1', type: 'waste', x: 550, y: 615, radiusX: 18, radiusY: 8, depthMeters: 1.2, rotation: -20 },
      { id: 'b5_2', type: 'greenside', x: 405, y: 695, radiusX: 8, radiusY: 6, depthMeters: 1.8, rotation: 15 }
    ],
    waterHazards: [],
    notes: 'Ensure generous bail-out fairway grass right of the green for players laying up.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h6',
    number: 6,
    par: 4,
    yardage: 335,
    elevationChangeYards: -12,
    dogleg: 'Straight',
    handicapIndex: 13,
    description: 'Drivable risk-and-reward par 4! Downhill shot inviting players to pull driver, but surrounded by 5 menacing pot bunkers and steep false runoff contours.',
    tee: { x: 400, y: 720, elevation: 115 },
    landing1: { x: 310, y: 770, elevation: 106 },
    green: { x: 230, y: 810, elevation: 103, radius: 14 },
    pins: [{ id: 'p6_1', x: 228, y: 812, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b6_1', type: 'pot', x: 250, y: 800, radiusX: 5, radiusY: 5, depthMeters: 2.2, rotation: 0 },
      { id: 'b6_2', type: 'pot', x: 220, y: 795, radiusX: 5, radiusY: 4, depthMeters: 2.0, rotation: 10 },
      { id: 'b6_3', type: 'pot', x: 215, y: 820, radiusX: 6, radiusY: 5, depthMeters: 1.9, rotation: -10 }
    ],
    waterHazards: [],
    notes: 'Exciting spectator hole. Design fairway speed slots to feed bounding balls onto the putting surface.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: true, greenComplex: true, bunkersPlaced: true, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h7',
    number: 7,
    par: 3,
    yardage: 210,
    elevationChangeYards: 8,
    dogleg: 'Straight',
    handicapIndex: 11,
    description: 'Brutal long uphill par 3 modeled after the Redan architecture concept. Shots shaped with a fade catch the right bank and feed down toward back-left pins.',
    tee: { x: 210, y: 830, elevation: 102 },
    green: { x: 130, y: 920, elevation: 110, radius: 18 },
    pins: [{ id: 'p7_1', x: 125, y: 925, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b7_1', type: 'greenside', x: 115, y: 910, radiusX: 14, radiusY: 6, depthMeters: 2.4, rotation: -45 }
    ],
    waterHazards: [],
    notes: 'Authentic Redan green contouring: slope slopes diagonally away from front-right to back-left.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h8',
    number: 8,
    par: 5,
    yardage: 565,
    elevationChangeYards: -4,
    dogleg: 'Double',
    handicapIndex: 5,
    description: 'Double dogleg par 5 sweeping around an expansive natural wetland. Three strategic shot options reward precise positioning over brute force.',
    tee: { x: 110, y: 900, elevation: 108 },
    landing1: { x: 150, y: 760, elevation: 106 },
    landing2: { x: 140, y: 620, elevation: 104 },
    green: { x: 180, y: 490, elevation: 104, radius: 21 },
    pins: [{ id: 'p8_1', x: 182, y: 492, difficulty: 'Medium' }],
    bunkers: [
      { id: 'b8_1', type: 'fairway', x: 135, y: 740, radiusX: 12, radiusY: 6, depthMeters: 1.4, rotation: 30 },
      { id: 'b8_2', type: 'cross', x: 155, y: 550, radiusX: 16, radiusY: 6, depthMeters: 1.6, rotation: -20 }
    ],
    waterHazards: [
      {
        id: 'w8_1',
        type: 'marsh',
        points: [{ x: 160, y: 700 }, { x: 190, y: 660 }, { x: 170, y: 590 }, { x: 135, y: 640 }]
      }
    ],
    notes: 'Crossing hazard demands decision on second shot: carry the marsh or lay back.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h9',
    number: 9,
    par: 4,
    yardage: 440,
    elevationChangeYards: 12,
    dogleg: 'Straight',
    handicapIndex: 17,
    description: 'Uphill finishing hole for the front nine returning directly toward the clubhouse terrace. Deep greenside amphitheatre with natural spectator mounds.',
    tee: { x: 190, y: 470, elevation: 104 },
    landing1: { x: 180, y: 320, elevation: 110 },
    green: { x: 170, y: 190, elevation: 116, radius: 19 },
    pins: [{ id: 'p9_1', x: 168, y: 188, difficulty: 'Easy' }],
    bunkers: [
      { id: 'b9_1', type: 'fairway', x: 195, y: 310, radiusX: 10, radiusY: 6, depthMeters: 1.5, rotation: 10 },
      { id: 'b9_2', type: 'greenside', x: 155, y: 185, radiusX: 9, radiusY: 6, depthMeters: 2.0, rotation: 35 }
    ],
    waterHazards: [],
    notes: 'Finish back at the central clubhouse hub. Check sightlines from patio.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: true, greenComplex: true, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  // Back nine 10-18
  {
    id: 'h10',
    number: 10,
    par: 4,
    yardage: 420,
    elevationChangeYards: -15,
    dogleg: 'Left',
    handicapIndex: 8,
    description: 'Dramatic drop from the clubhouse ridge down into the secluded back nine pine forest valley.',
    tee: { x: 230, y: 150, elevation: 115 },
    landing1: { x: 310, y: 90, elevation: 103 },
    green: { x: 420, y: 70, elevation: 100, radius: 18 },
    pins: [{ id: 'p10_1', x: 422, y: 68, difficulty: 'Medium' }],
    bunkers: [{ id: 'b10_1', type: 'fairway', x: 295, y: 80, radiusX: 10, radiusY: 6, depthMeters: 1.5, rotation: 20 }],
    waterHazards: [],
    notes: 'Downhill tee shot adds roughly 25 yards of roll.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h11',
    number: 11,
    par: 4,
    yardage: 450,
    elevationChangeYards: 0,
    dogleg: 'Right',
    handicapIndex: 2,
    description: 'Demanding dogleg right through ancient pines. A large lake guards the entire right side of the green.',
    tee: { x: 440, y: 80, elevation: 100 },
    landing1: { x: 560, y: 95, elevation: 100 },
    green: { x: 690, y: 110, elevation: 101, radius: 19 },
    pins: [{ id: 'p11_1', x: 695, y: 112, difficulty: 'Sunday Pin' }],
    bunkers: [{ id: 'b11_1', type: 'greenside', x: 675, y: 95, radiusX: 8, radiusY: 5, depthMeters: 1.8, rotation: 10 }],
    waterHazards: [
      { id: 'w11_1', type: 'lake', points: [{ x: 680, y: 120 }, { x: 720, y: 125 }, { x: 715, y: 150 }, { x: 670, y: 140 }] }
    ],
    notes: 'Bail-out left of green leaves a delicate pitch toward the water.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h12',
    number: 12,
    par: 3,
    yardage: 155,
    elevationChangeYards: -5,
    dogleg: 'Straight',
    handicapIndex: 18,
    description: 'Signature short par 3 tucked into a tranquil pine glade with a diagonal stone wall and azalea banks.',
    tee: { x: 710, y: 100, elevation: 101 },
    green: { x: 810, y: 80, elevation: 96, radius: 14 },
    pins: [{ id: 'p12_1', x: 812, y: 78, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b12_1', type: 'greenside', x: 795, y: 85, radiusX: 7, radiusY: 4, depthMeters: 1.8, rotation: 30 },
      { id: 'b12_2', type: 'greenside', x: 820, y: 70, radiusX: 6, radiusY: 4, depthMeters: 1.4, rotation: -20 }
    ],
    waterHazards: [],
    notes: 'Shallow wide green requires precise yardage control.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: true, greenComplex: true, bunkersPlaced: true, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h13',
    number: 13,
    par: 5,
    yardage: 510,
    elevationChangeYards: -8,
    dogleg: 'Left',
    handicapIndex: 12,
    description: 'Classic risk-reward par 5 sweeping along a winding creek. Going for the green in two requires clearing the creek.',
    tee: { x: 830, y: 90, elevation: 96 },
    landing1: { x: 870, y: 210, elevation: 93 },
    landing2: { x: 890, y: 340, elevation: 90 },
    green: { x: 910, y: 460, elevation: 88, radius: 20 },
    pins: [{ id: 'p13_1', x: 915, y: 462, difficulty: 'Medium' }],
    bunkers: [
      { id: 'b13_1', type: 'fairway', x: 890, y: 220, radiusX: 11, radiusY: 6, depthMeters: 1.5, rotation: 0 },
      { id: 'b13_2', type: 'greenside', x: 925, y: 450, radiusX: 10, radiusY: 6, depthMeters: 2.0, rotation: 25 }
    ],
    waterHazards: [
      { id: 'w13_1', type: 'creek', points: [{ x: 850, y: 200 }, { x: 880, y: 330 }, { x: 890, y: 440 }, { x: 930, y: 480 }] }
    ],
    notes: 'Echoes Augusta #13. A hook or draw off the tee gains great advantage.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h14',
    number: 14,
    par: 4,
    yardage: 435,
    elevationChangeYards: 10,
    dogleg: 'Straight',
    handicapIndex: 6,
    description: 'Long straight uphill par 4 without any bunkers! The challenge is purely delivered by a giant rolling Biarritz green contour with a 3-foot center swale.',
    tee: { x: 900, y: 480, elevation: 88 },
    landing1: { x: 860, y: 600, elevation: 94 },
    green: { x: 840, y: 730, elevation: 98, radius: 24 },
    pins: [{ id: 'p14_1', x: 838, y: 740, difficulty: 'Easy' }],
    bunkers: [],
    waterHazards: [],
    notes: 'Biarritz green architecture with dramatic central trench.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h15',
    number: 15,
    par: 5,
    yardage: 540,
    elevationChangeYards: -12,
    dogleg: 'Straight',
    handicapIndex: 10,
    description: 'Downhill par 5 playing to an island fairway landing zone over a scenic lake. Thrilling eagle opportunity for courageous drives.',
    tee: { x: 820, y: 750, elevation: 98 },
    landing1: { x: 740, y: 790, elevation: 92 },
    landing2: { x: 620, y: 830, elevation: 88 },
    green: { x: 500, y: 860, elevation: 86, radius: 20 },
    pins: [{ id: 'p15_1', x: 498, y: 862, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b15_1', type: 'fairway', x: 720, y: 805, radiusX: 12, radiusY: 5, depthMeters: 1.5, rotation: 15 },
      { id: 'b15_2', type: 'greenside', x: 515, y: 850, radiusX: 9, radiusY: 5, depthMeters: 1.8, rotation: -20 }
    ],
    waterHazards: [
      { id: 'w15_1', type: 'lake', points: [{ x: 580, y: 880 }, { x: 530, y: 890 }, { x: 480, y: 870 }, { x: 510, y: 830 }] }
    ],
    notes: 'Front water pond penalizes short second shots.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h16',
    number: 16,
    par: 3,
    yardage: 185,
    elevationChangeYards: -8,
    dogleg: 'Straight',
    handicapIndex: 16,
    description: 'Amphitheater par 3 with thousands of stadium spectator mounds ringing the green and an inlet pond on the left.',
    tee: { x: 480, y: 850, elevation: 86 },
    green: { x: 380, y: 880, elevation: 78, radius: 17 },
    pins: [{ id: 'p16_1', x: 378, y: 882, difficulty: 'Medium' }],
    bunkers: [
      { id: 'b16_1', type: 'greenside', x: 385, y: 895, radiusX: 10, radiusY: 5, depthMeters: 1.9, rotation: 35 }
    ],
    waterHazards: [
      { id: 'w16_1', type: 'lake', points: [{ x: 420, y: 850 }, { x: 370, y: 865 }, { x: 360, y: 890 }, { x: 410, y: 880 }] }
    ],
    notes: 'Sunday pin is tucked 4 paces off the left water edge.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h17',
    number: 17,
    par: 4,
    yardage: 360,
    elevationChangeYards: 6,
    dogleg: 'Right',
    handicapIndex: 14,
    description: 'Short strategic par 4 where long hitters can flirt with the canyon wall to leave a 40-yard pitch to an infinity green.',
    tee: { x: 360, y: 870, elevation: 80 },
    landing1: { x: 290, y: 830, elevation: 84 },
    green: { x: 240, y: 760, elevation: 86, radius: 16 },
    pins: [{ id: 'p17_1', x: 238, y: 758, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b17_1', type: 'waste', x: 310, y: 810, radiusX: 20, radiusY: 10, depthMeters: 1.2, rotation: 50 },
      { id: 'b17_2', type: 'greenside', x: 230, y: 770, radiusX: 7, radiusY: 5, depthMeters: 1.7, rotation: -10 }
    ],
    waterHazards: [],
    notes: 'Visual illusion: green appears closer than it is due to sunken waste area.',
    completedSteps: { plotSetup: true, sculptTerrain: false, layFairway: false, greenComplex: false, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  },
  {
    id: 'h18',
    number: 18,
    par: 4,
    yardage: 470,
    elevationChangeYards: 18,
    dogleg: 'Left',
    handicapIndex: 4,
    description: 'Grand finale! Championship caliber par 4 climbing back up to the iconic clubhouse patio with water on the entire left flank and pot bunkers guarding the right fairway landing.',
    tee: { x: 240, y: 730, elevation: 86 },
    landing1: { x: 210, y: 550, elevation: 96 },
    green: { x: 160, y: 230, elevation: 114, radius: 22 },
    pins: [{ id: 'p18_1', x: 158, y: 228, difficulty: 'Sunday Pin' }],
    bunkers: [
      { id: 'b18_1', type: 'fairway', x: 225, y: 540, radiusX: 14, radiusY: 7, depthMeters: 1.8, rotation: 15 },
      { id: 'b18_2', type: 'greenside', x: 175, y: 240, radiusX: 11, radiusY: 6, depthMeters: 2.2, rotation: -30 }
    ],
    waterHazards: [
      { id: 'w18_1', type: 'lake', points: [{ x: 190, y: 560 }, { x: 170, y: 400 }, { x: 140, y: 250 }, { x: 160, y: 210 }] }
    ],
    notes: 'Ultimate pressure finishing hole. Requires heroic tee shot hugging the water margin.',
    completedSteps: { plotSetup: true, sculptTerrain: true, layFairway: true, greenComplex: true, bunkersPlaced: false, hazardDecor: false, vegetation: false, playtested: false }
  }
];

export const DEMO_PROJECT_WHISPERING_PINES: CourseProject = {
  id: 'proj_whispering_pines',
  name: 'Whispering Pines Golf Club',
  subtitle: 'Championship 18-Hole Forest & Mountain Reserve',
  style: 'Championship',
  environmentTheme: 'boreal',
  holesCount: 18,
  targetLengthYards: 7212,
  targetPar: 72,
  locationName: 'Highland Ridge, Banff / Kananaskis Foothills',
  isRealRecreation: false,
  gpsCoords: { lat: 51.1784, lng: -115.5708 },
  conceptPrompt: 'A dramatic 18-hole championship mountain-forest layout carved through towering Scots pine ridges, featuring glacial creeks, deep sod bunkers, dramatic drop-shot par 3s, and a cathedral clubhouse finish.',
  aiConceptSummary: 'Masterful balance of traditional Scottish heathland bunker styling with North American mountain grandeur. Exceptional routing rhythm featuring alternate dogleg directions, elevation swings of up to 45 feet, and generous recovery contours.',
  aiRecommendations: [
    'Utilize the 2K25 Boreal Theme to capitalize on high-density Scots Pine foliage and natural boulder clusters.',
    'Execute a zero-hole blank plot in 2K25 Course Designer before sculpting the dramatic 18-yard drop on hole 3.',
    'Keep green stimp meter calibrated to 155-165 (approx 11.5 tournament stimp) to ensure playability on the Biarritz contours of hole 14.',
    'Incorporate sod-walled pot bunkers around greens with 1.8m to 2.2m depth to create strategic penalty angles.'
  ],
  holes: INITIAL_HOLES_18,
  objectBudget: {
    currentTrees: 4200,
    maxTrees: 10000,
    currentProps: 340,
    maxProps: 1200,
    estimatedMemoryMb: 380,
    maxMemoryMb: 950
  },
  playtestLogs: [
    {
      id: 'pt_1',
      holeNumber: 3,
      date: '2026-11-04',
      tee: 'Championship',
      pinPosition: 'Sunday Pin (Right rear)',
      driverCarryTested: 168,
      fairwayLandingWidthYards: 0,
      greenReceptivity: 'Moderate',
      missToleranceRating: 7,
      issuesIdentified: ['Steep front ridge repels slightly under-hit mid irons into water'],
      notes: 'Added 2 yards of soft fairway fringe before water boundary to reward near-misses.'
    },
    {
      id: 'pt_2',
      holeNumber: 6,
      date: '2026-11-04',
      tee: 'Tournament',
      pinPosition: 'Center Bowl',
      driverCarryTested: 295,
      fairwayLandingWidthYards: 32,
      greenReceptivity: 'Firm',
      missToleranceRating: 8,
      issuesIdentified: ['Downhill speed slot feeds driven balls directly into back-left pot bunker'],
      notes: 'Softened speed slot gradient from 4.2% to 2.8% to allow ball to stop pin-high.'
    }
  ],
  lastModified: '2026-11-05 13:42',
  version: 'v2.4-masterplan'
};
