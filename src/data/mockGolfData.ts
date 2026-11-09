import { CourseTheme, FamousCourseInspiration } from '../types/golf';

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
