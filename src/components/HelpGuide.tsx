import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Compass,
  Mountain,
  Sparkles,
  Layers,
  Flag,
  Play,
  Trophy,
  Download,
  Bot,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  FileText,
  FolderOpen
} from 'lucide-react';

interface HelpGuideProps {
  onNavigateTab: (tabId: string) => void;
}

interface HelpSection {
  id: string;
  tabId?: string;
  title: string;
  category: 'Overview' | 'Design Studios' | 'LiDAR & GIS' | 'In-Game 2K25' | 'Community Workflows';
  icon: any;
  summary: string;
  keyFeatures: string[];
  optionsExplained: { name: string; description: string; howToUse: string; proTip?: string }[];
  stepByStepGuide: string[];
}

export const HelpGuide: React.FC<HelpGuideProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedSectionId, setExpandedSectionId] = useState<string>('project_dashboard');

  const helpSections: HelpSection[] = [
    {
      id: 'project_manager',
      tabId: 'dashboard',
      title: 'Project Manager & Course Creation',
      category: 'Overview',
      icon: FolderOpen,
      summary:
        'Allows creating brand new 9-hole or 18-hole course projects from scratch, switching between active projects, and deleting retired courses with confirmation protection.',
      keyFeatures: [
        'Create new courses with custom names, subtitles, hole counts (9 or 18), themes, and styles',
        'Switch between multiple design projects at any time without losing edits',
        'Safe deletion dialog protecting active course data from accidental deletion',
        'Automatic coordinate grid and initial routing initialization for all new courses'
      ],
      optionsExplained: [
        {
          name: 'Save Project Button (Ctrl+S)',
          description: 'Persists all course changes, hole routings, and settings directly to browser persistent storage.',
          howToUse: 'Click "Save Project" in the sidebar, top header bar, or dashboard header, or press Ctrl+S (Cmd+S on Mac).',
          proTip: 'The button glows amber with an "Unsaved" tag when you have unsaved edits, and switches to emerald "Project Saved" with a timestamp once saved.'
        },
        {
          name: 'Exit Protection & Close App Prompt',
          description: 'Prevents accidental data loss by prompting you to save your project before closing the browser tab or exiting.',
          howToUse: 'Click "Close / Exit Studio" or close the tab/window. If you have unsaved changes, a dialog will ask you to save first.',
          proTip: 'You can choose "Save & Close", "Close Without Saving", or "Keep Editing".'
        },
        {
          name: '+ New Course Project Button',
          description: 'Opens the project creation form in the sidebar or dashboard banner.',
          howToUse: 'Click "+ New Course Project" in the left sidebar or "Switch / New Project" on the dashboard.',
          proTip: 'Choose between 9-hole or 18-hole routing right at creation to set up the appropriate plot scale.'
        },
        {
          name: 'Open Project / Switch',
          description: 'Activates a selected course project from your studio library with unsaved change protection.',
          howToUse: 'Click "Open Project" on any course card in the Project Manager list.',
          proTip: 'If you have unsaved edits when switching, the studio prompts you to "Save & Switch" so nothing is lost.'
        },
        {
          name: 'Delete Project (Trash Icon)',
          description: 'Permanently removes a course project with an explicit safety confirmation dialog.',
          howToUse: 'Click the red trash icon next to a project, then confirm "Delete Project" in the modal.',
          proTip: 'The studio guards your last remaining course project so you always have at least one active workspace.'
        }
      ],
      stepByStepGuide: [
        'Click "+ New Course Project" in the left sidebar or the Dashboard header.',
        'Enter the Course Name, Subtitle, 9 or 18 Hole count, and 2K25 Environment Theme.',
        'Click "Create & Open Project" to initialize the course routing matrix (saved automatically).',
        'As you edit holes, click "Save Project" or press Ctrl+S / Cmd+S at any time to save progress.',
        'When closing the app or browser tab, the studio will prompt you to save if there are unsaved edits.'
      ]
    },
    {
      id: 'project_dashboard',
      tabId: 'dashboard',
      title: 'Project Dashboard',
      category: 'Overview',
      icon: Compass,
      summary:
        'The command center of your golf course design project. Displays active course specifications, 18-hole matrix status, object memory budget estimations, and overall completion meters.',
      keyFeatures: [
        'Complete 18-hole progress matrix with par, yardage, and dogleg badges',
        '2K25 Object Budget Estimator to safeguard against console and PC memory limits',
        'Course completion percentage calculated across all 8 construction stages',
        'Quick jump navigation to any individual hole or tool'
      ],
      optionsExplained: [
        {
          name: 'Hole Matrix Cards (#1 to #18)',
          description: 'Visual indicator of every hole status, showing par, yardage, elevation change, and completion indicators.',
          howToUse: 'Click any hole card to immediately open the Hole Designer focused on that specific hole.',
          proTip: 'Keep an eye on the 5 status dots at the bottom of each card (Terrain, Fairway, Green, Bunkers, Playtested).'
        },
        {
          name: '2K25 Object Budget Estimator',
          description: 'Tracks placed objects (trees, bushes, buildings, spectator stands) against estimated game limits.',
          howToUse: 'Monitor the memory meter when designing. Keep placed trees under 8,000 to prevent in-game stutter or console crashes.',
          proTip: 'Use automated theme vegetation for background foliage and save placed objects for custom greenside styling.'
        },
        {
          name: 'Active Project Stats Bar',
          description: 'Displays Par, Total Yardage, Active Theme, LiDAR status, and Architectural Style.',
          howToUse: 'Review this banner to ensure your overall course profile matches your target tournament criteria.'
        }
      ],
      stepByStepGuide: [
        'Review the project metrics on the header banner.',
        'Check the Course Construction Progress bar to see which design phases need attention.',
        'Inspect the 2K25 Object Budget to ensure you are well under limits.',
        'Click on any incomplete hole card to jump directly to its design studio.'
      ]
    },
    {
      id: 'ai_concept_studio',
      tabId: 'concept',
      title: 'AI Course Concept Studio',
      category: 'Design Studios',
      icon: Sparkles,
      summary:
        'Translates natural language prompts into cohesive golf course architectural blueprints, complete with recommended 2K25 themes, bunker styles, and environmental settings.',
      keyFeatures: [
        'Natural language prompt synthesizer with instant presets',
        'Generates 3 alternative architectural concepts from a single prompt',
        'Perspective simulations: Aerial, Tee-to-Green, Green Complex, Clubhouse Vista',
        'One-click application of concept DNA directly into your current project'
      ],
      optionsExplained: [
        {
          name: 'Natural Language Description Box',
          description: 'The creative prompt input where you describe your ideal course setting, hazards, topography, and mood.',
          howToUse: 'Type or edit a description (e.g., "Championship alpine links along steep granite ridges with deep pot bunkers and glacial creeks") and click "Generate Architecture Concepts".',
          proTip: 'Include specific details such as green sizes (punchbowls, multi-tier), water frequency, and target yardages.'
        },
        {
          name: 'Perspective Selector (Aerial / Tee-to-Green / Green / Vista)',
          description: 'Simulates different camera angles and environmental moods for the generated concept.',
          howToUse: 'Click the perspective buttons below the concept image to inspect different architectural views.',
          proTip: 'Use Tee-to-Green perspective to check horizon backdrop suitability in 2K25.'
        },
        {
          name: 'Apply Concept to Project',
          description: 'Transfers the selected concept theme, bunker style, and recommendations into the project configuration.',
          howToUse: 'Select your preferred concept tab (A, B, or C) and click the green "Apply This Concept to Project" button.'
        }
      ],
      stepByStepGuide: [
        'Select a preset chip or type a detailed natural language prompt.',
        'Click "Generate Architecture Concepts" to generate 3 distinct architectural variations.',
        'Switch between Concept A, B, and C tabs to compare styling, backdrops, and recommendations.',
        'Click "Apply This Concept to Project" to configure your course theme and parameters.'
      ]
    },
    {
      id: 'theme_explorer',
      tabId: 'themes',
      title: 'PGA TOUR 2K25 Theme Explorer',
      category: 'Design Studios',
      icon: Layers,
      summary:
        'Comprehensive reference library of verified in-game environmental themes in 2K25, detailing foliage compositions, lighting behaviors, turf color palettes, and side-by-side comparison.',
      keyFeatures: [
        'Reference profiles for all 10 verified in-game themes (Boreal, Links, Tropical, Desert, etc.)',
        'Turf & Environmental Color Harmonization palettes (Fairway, Green, Rough, Sand, Water)',
        'Side-by-side comparison mode for evaluating two themes simultaneously',
        'Clear distinction between verified game themes and automated vegetation behaviors'
      ],
      optionsExplained: [
        {
          name: 'Theme Selector Cards',
          description: 'Browse all available 2K25 themes with preview color swatches and style indicators.',
          howToUse: 'Click any theme card to load its detailed description, vegetation profiles, and backdrop.',
          proTip: 'Notice the ACTIVE badge indicating your currently assigned project theme.'
        },
        {
          name: 'Side-by-Side Compare Toggle',
          description: 'Enables dual-card view to compare two themes simultaneously.',
          howToUse: 'Click "Side-by-Side Compare" in the header, then choose a second theme from the dropdown menu to compare turf tones and vegetation lists side by side.',
          proTip: 'Crucial for choosing between similar styles, such as Boreal vs. Rustic or Links vs. Harvest.'
        },
        {
          name: 'Turf Color Harmonization Palette',
          description: 'Displays the exact color swatches used by the 2K25 graphics engine for fairways, greens, rough, sand, and water.',
          howToUse: 'Use these swatches when calibrating your monitor and visualizing how lighting will interact with your course.'
        }
      ],
      stepByStepGuide: [
        'Browse the theme cards to find an environment that fits your vision.',
        'Inspect the Typical Foliage list to see which trees and bushes will generate automatically.',
        'Use "Side-by-Side Compare" to evaluate trade-offs between two options.',
        'Click "Set as Project Theme" to lock in your choice.'
      ]
    },
    {
      id: 'masterplan_designer',
      tabId: 'masterplan',
      title: 'Interactive Course Masterplan Designer',
      category: 'Design Studios',
      icon: Compass,
      summary:
        'Top-down 2D vector CAD canvas for complete 18-hole routing. Interactively drag tee boxes, green complexes, and landing zones while reviewing safety margins and contour lines.',
      keyFeatures: [
        'Interactive SVG 1000x1000 plot coordinate canvas with zoom and pan',
        'Draggable yellow tee markers, blue landing zones, and green circles',
        'Layer visibility toggles: Contours, Fairway Ribbons, Bunkers, Water Hazards',
        'Real-time automated routing safety validation detecting dangerous fairway/green crossings'
      ],
      optionsExplained: [
        {
          name: 'Draggable Routing Handles (Tees & Greens)',
          description: 'Interactive markers on the SVG canvas representing actual in-game cartesian plot coordinates.',
          howToUse: 'Click and drag any yellow tee box or green circle across the canvas to reposition it. The yardage and coordinates update in real time.',
          proTip: 'Zoom in to 150% or 200% using the zoom controls for pixel-precise pin and tee placement.'
        },
        {
          name: 'Layer Toggles (Contours / Fairways / Bunkers / Water)',
          description: 'Buttons in the top toolbar to hide or show individual course elements.',
          howToUse: 'Toggle off Fairways or Bunkers to inspect the underlying contour elevation lines without visual obstruction.',
          proTip: 'Turn on Contours when routing holes to ensure tees and greens sit naturally on elevated ridges.'
        },
        {
          name: 'Routing Quality Audit Panel',
          description: 'Automatic safety checker that inspects distance between greens and adjacent tee boxes.',
          howToUse: 'Review the audit alerts on the right-hand panel. If a warning highlights adjacent holes closer than 45 yards, reposition them for safety.',
          proTip: 'Tournament venues require at least 50 yards of safety separation between greens and spectator/tee areas.'
        }
      ],
      stepByStepGuide: [
        'Select the hole you want to adjust from the number strip or on canvas.',
        'Drag the yellow tee marker to establish your teeing ground on an elevated plateau.',
        'Drag the blue landing circle to define your fairway landing zone or dogleg turn.',
        'Drag the green complex circle to set your target putting surface location.',
        'Check the Routing Quality Audit to ensure no hazardous fairway crossings exist.'
      ]
    },
    {
      id: 'lidar_studio',
      tabId: 'lidar',
      title: 'LiDAR & Terrain Studio',
      category: 'LiDAR & GIS',
      icon: Mountain,
      summary:
        'Professional geographical elevation data processing. Calibrate Coordinate Reference Systems (CRS/EPSG), filter vegetation returns, generate 16-bit heightmaps, and inspect 3D DTMs.',
      keyFeatures: [
        'Multi-format support: LAZ, LAS, GeoTIFF, and ASCII DEMs',
        'EPSG CRS database covering major golf regions (US East/West, UK National Grid, Australia, Web Mercator)',
        'Point-cloud filtering: separates Ground returns (Class 2) from tree canopy (Class 3/4/5)',
        'Interactive 3D WebGL Terrain Viewer with orbital camera, wireframe, and elevation exaggeration'
      ],
      optionsExplained: [
        {
          name: 'Coordinate Reference System (EPSG Code)',
          description: 'Specifies the geographical projection datum of the raw LiDAR source.',
          howToUse: 'Select the EPSG code matching your LiDAR source (e.g., EPSG:32618 for US East Coast, EPSG:27700 for UK courses).',
          proTip: 'Matching the exact CRS prevents horizontal distortion and ensures OpenStreetMap vectors align perfectly.'
        },
        {
          name: 'Ground Return Filtering (Strip Canopy)',
          description: 'Algorithms that isolate true bare-earth elevation and discard tree canopy and building returns.',
          howToUse: 'Keep "Remove non-ground returns" checked. This ensures tree tops are not accidentally baked into the heightmap as bumpy hills.',
          proTip: 'Always apply 1 to 2 passes of Gaussian smoothing to eliminate laser sensor jitter on fairway landing zones.'
        },
        {
          name: 'Interactive 3D WebGL Terrain Viewer',
          description: 'Hardware-accelerated 3D view of your processed terrain, displaying flagsticks, tee cylinders, and elevation contours.',
          howToUse: 'Left-click + drag to orbit the camera; scroll wheel to zoom in and out. Use the top toolbar to switch between Perspective and Top-Down views.',
          proTip: 'Click the exaggeration button (1.0x, 1.4x, 1.8x) to heighten subtle swales and runoffs.'
        },
        {
          name: 'TGC Designer Tools Pre-flight Check',
          description: 'Verifies file dimensions, bit depth (16-bit), and directory readiness for external community tools.',
          howToUse: 'Verify all 4 checklist items display green checkmarks before exporting your heightmap to TGC Designer Tools.'
        }
      ],
      stepByStepGuide: [
        'Select your LiDAR format (LAZ / LAS / GeoTIFF).',
        'Choose the Coordinate Reference System (CRS) matching the course geographic location.',
        'Configure the grid resolution (1.0m recommended for PGA TOUR 2K25).',
        'Click "Run DTM Surface Interpolation" to generate the bare-earth model.',
        'Inspect the result in the 3D WebGL Viewer, adjusting elevation exaggeration as needed.',
        'Click "Export Heightmap" to save the 16-bit elevation data.'
      ]
    },
    {
      id: 'hole_designer',
      tabId: 'hole',
      title: 'Individual Hole Designer',
      category: 'Design Studios',
      icon: Flag,
      summary:
        'Detailed architectural configuration for each individual hole. Set par, yardage, elevation differentials, bunker matrices, green surface radius, and pin locations.',
      keyFeatures: [
        'Spec configuration: Par (3/4/5), Yardage, Dogleg, Elevation Delta, and Handicap rating',
        'Bunkering matrix: Add and edit Fairway, Greenside, Pot, Waste, and Cross bunkers',
        'Green complex geometry: Adjust putting surface radius, square footage, and pin difficulty',
        'Strategic architecture analysis explaining risk/reward angles and shot values'
      ],
      optionsExplained: [
        {
          name: 'Elevation Delta (Yards)',
          description: 'The vertical elevation difference between the tee box and the green platform.',
          howToUse: 'Enter negative values for downhill drop shots (e.g., -18y) and positive values for uphill holes (e.g., +12y).',
          proTip: 'Downhill holes in 2K25 produce significant rollouts; remember to widen landing areas for downhill tee shots.'
        },
        {
          name: 'Bunker Adder (+ Fairway, + Greenside, + Pot)',
          description: 'Quick-action buttons to add specific bunker styles to the hole design.',
          howToUse: 'Click the bunker button of your choice, then calibrate its length (m), depth (m), and position in the bunker list.',
          proTip: 'Pot bunkers should be given 2.0m+ depth to simulate authentic Scottish links revetted faces.'
        },
        {
          name: 'Green Surface Radius & Area',
          description: 'Controls the size and scale of the putting surface in yards.',
          howToUse: 'Adjust the radius (e.g., 14 for small target greens like Pebble Beach, 22 for large championship greens like St Andrews).',
          proTip: 'The square footage calculation automatically updates to help you design realistic green sizes (typically 4,500 to 7,500 sq ft).'
        }
      ],
      stepByStepGuide: [
        'Select the hole you wish to design using the hole selector.',
        'Under "Hole Specs & Elevation", enter the par, total yardage, and elevation change.',
        'Switch to "Bunkering Matrix" and add strategic fairway or greenside bunkers.',
        'Switch to "Green Complex & Pins" to calibrate your putting surface radius.',
        'Review the "Strategic Architecture Analysis" to confirm shot values are balanced.'
      ]
    },
    {
      id: 'research_studio',
      tabId: 'research',
      title: 'Real-World Course Research Studio',
      category: 'Design Studios',
      icon: BookOpen,
      summary:
        'Searchable architectural dossier library of legendary courses (St Andrews, Augusta National, Pinehurst No. 2, Pebble Beach, Royal Melbourne, Sawgrass) with one-click design DNA transfer.',
      keyFeatures: [
        'Curated library of world top-100 golf courses with historical blueprints',
        'Breakdown of signature architectural features (Amen Corner, Road Hole, Redan, Island Green)',
        'Key design principles for translating classical features into PGA TOUR 2K25',
        'One-click "Apply Design DNA to Project" integration'
      ],
      optionsExplained: [
        {
          name: 'Search & Type Filter Bar',
          description: 'Filter courses by name, architect, region, or style (Links, Parkland, Sandbelt, Ocean).',
          howToUse: 'Type keywords in the search box or click filter chips to find relevant courses.',
          proTip: 'Search "MacKenzie" to find courses with large, bold, strategic green complexes.'
        },
        {
          name: 'Apply Design DNA to Project',
          description: 'Imports the selected course design principles and style into your active project recommendations.',
          howToUse: 'Select any course in the list and click "Apply Design DNA to Project" in the header.',
          proTip: 'Use this feature when creating a fictional course that pays homage to a legendary architectural style.'
        }
      ],
      stepByStepGuide: [
        'Browse or search the famous golf course library.',
        'Select a course to read its historical overview and signature hole characteristics.',
        'Review the "Key Principles to Recreate in PGA TOUR 2K25" checklist.',
        'Click "Apply Design DNA to Project" to incorporate those principles into your active project.'
      ]
    },
    {
      id: 'execution_guide',
      tabId: 'execution',
      title: '2K25 Execution Assistant',
      category: 'In-Game 2K25',
      icon: Play,
      summary:
        'Bridges the external planning studio and the actual in-game Course Designer. Provides the proven Blank Plot Zero-Out setup and an 8-stage hole construction checklist.',
      keyFeatures: [
        'Community-proven Blank Plot Zero-Out guide (Crazycanuck1985 & b101 design methodology)',
        '8-stage construction checklist for every hole with completion tracking',
        'Direct advice on sculpting brushes, spline placement, and green contouring',
        'Protects against default game surface glitches and accidental terrain distortion'
      ],
      optionsExplained: [
        {
          name: 'Blank Plot Zero-Out Setup Card',
          description: 'Step-by-step instructions for initializing a clean plot inside 2K25 without messy automated fairways and greens.',
          howToUse: 'Follow the 4 steps listed inside PGA TOUR 2K25 before touching any sculpting brushes.',
          proTip: 'Always save your blank plot as a master template file before starting hole #1.'
        },
        {
          name: '8-Stage Hole Checklist (Plot, Terrain, Fairway, Green, etc.)',
          description: 'Interactive checklist tracking construction progress for the active hole.',
          howToUse: 'As you build each feature in 2K25, click the corresponding checkbox to update your course progress.',
          proTip: 'Always playtest the hole from the back championship tee (Step 8) before moving on to the next hole.'
        }
      ],
      stepByStepGuide: [
        'Read the Blank Plot Zero-Out Setup and apply it inside PGA TOUR 2K25.',
        'Select Hole #1 and follow Step 1 (Plot Boundary) and Step 2 (Sculpt Major Elevation).',
        'Lay your fairway spline along the planned corridor (Step 3).',
        'Sculpt the green platform and verify slope angles are under 2.5 degrees (Step 4).',
        'Place bunkers, water hazards, and trees (Steps 5-7).',
        'Playtest the hole inside 2K25 and mark it complete (Step 8).'
      ]
    },
    {
      id: 'ai_architect',
      tabId: 'assistant',
      title: 'AI Golf Course Architect',
      category: 'Design Studios',
      icon: Bot,
      summary:
        'Intelligent conversational design advisor trained on classical architecture and 2K25 mechanics. Features an automated 6-category Course Design Quality Audit scorecard.',
      keyFeatures: [
        'Conversational advice on bunker positioning, green contours, elevation, and theme settings',
        'One-click prompt suggestions for fast design answers',
        '6-category Architectural Scorecard out of 100 with weighted metrics',
        'Actionable tips on risk/reward and tour player carry requirements'
      ],
      optionsExplained: [
        {
          name: 'Architectural Scorecard (out of 100)',
          description: 'AI evaluation of your routing flow, hazard strategy, green variety, elevation drama, and fairness.',
          howToUse: 'Check the scorecard on the right panel to identify which design areas could use improvement.',
          proTip: 'A score above 90 indicates a well-balanced layout suitable for competitive tournament play.'
        },
        {
          name: 'Quick Prompt Chips (Ask: Bunkers, Slopes, Drivable Par 4s, etc.)',
          description: 'Pre-formulated common architectural questions for fast answers.',
          howToUse: 'Click any chip to send the question directly to the AI Architect.',
          proTip: 'You can also type custom questions about specific hole numbers or strategy challenges.'
        }
      ],
      stepByStepGuide: [
        'Open the AI Architect tab to view your course quality scores.',
        'Click a quick prompt chip or type a custom architectural question.',
        'Read the recommendations and note specific tips for in-game execution.',
        'Incorporate the advice into your Masterplan or Hole Designer.'
      ]
    },
    {
      id: 'playtesting_qa',
      tabId: 'playtesting',
      title: 'Playtesting & Quality Assurance',
      category: 'In-Game 2K25',
      icon: Trophy,
      summary:
        'Log in-game playtest sessions inside 2K25, verify fairway landing widths, monitor green firmness receptivity, and maintain an issue register for contour or physics glitches.',
      keyFeatures: [
        'Log tee used, driver carry tested, and landing corridor width',
        'Track green receptivity (Firm / Moderate / Soft) and miss tolerance rating',
        'Record issues and bugs (speed slots feeding into bunkers, blind approach issues)',
        'Historical log of all testing sessions organized by hole number and date'
      ],
      optionsExplained: [
        {
          name: 'Record 2K25 In-Game Test Form',
          description: 'Form to capture observations from your playtesting rounds in 2K25.',
          howToUse: 'Select the hole tested, enter tested carry yardage and landing width, rate receptivity, and click "Save Playtest Record".',
          proTip: 'Test with different wind directions in 2K25 to ensure holes remain playable into a 15mph headwind.'
        },
        {
          name: 'Issue Discovered Field',
          description: 'Log specific problems to fix in the Course Designer (e.g., "steep front ridge repels good shots into water").',
          howToUse: 'Type any observed gameplay issue and save. The issue is logged with a warning badge for easy tracking.',
          proTip: 'Review your issue log before finalizing a course for publication.'
        }
      ],
      stepByStepGuide: [
        'Launch PGA TOUR 2K25 and playtest a hole in Course Designer Play Mode.',
        'Switch to this tab and select the hole tested.',
        'Enter your driver carry distance and record whether the landing zone felt fair.',
        'Note any bounce or contour issues in the Issue Discovered field.',
        'Click "Save Playtest Record" to keep a permanent testing log.'
      ]
    },
    {
      id: 'export_centre',
      tabId: 'export',
      title: 'Production Export Centre',
      category: 'Community Workflows',
      icon: Download,
      summary:
        'Export master plans, 16-bit DTM heightmaps, scorecard CSV spreadsheets, and complete JSON project backup archives.',
      keyFeatures: [
        'Full Project Master Archive (.json) containing all holes, themes, and coordinates',
        '16-Bit DTM Heightmap Grid (.json) formatted for TGC Designer Tools',
        'Hole Coordinates & Scorecard (.csv) spreadsheet with GPS positions',
        'Official 18-Hole Tournament Scorecard table'
      ],
      optionsExplained: [
        {
          name: 'Full Project Master Archive (.json)',
          description: 'Creates a complete backup file of your entire design studio project.',
          howToUse: 'Click "Export Complete Project" to download the JSON archive to your local drive.',
          proTip: 'Export a backup after every major design milestone (e.g., routing completed, front-nine built).'
        },
        {
          name: '16-Bit DTM Heightmap Grid',
          description: 'Exports normalized elevation raster data suitable for external community terrain tools.',
          howToUse: 'Click "Export 16-Bit Heightmap" to save the heightmap data for TGC Designer Tools.',
          proTip: 'Ensure your vertical scaling in TGC Designer Tools matches the meters/feet calibration from the LiDAR Studio.'
        },
        {
          name: 'Scorecard & Coordinates (.csv)',
          description: 'Exports a spreadsheet table with yardages, pars, handicap ratings, and cartesian plot coordinates.',
          howToUse: 'Click "Export CSV Spreadsheet" to open in Excel or Google Sheets for quick reference while building in-game.'
        }
      ],
      stepByStepGuide: [
        'Review the 18-Hole Official Tournament Scorecard table.',
        'Click "Export Complete Project" to create an offline JSON backup.',
        'Click "Export 16-Bit Heightmap" if importing terrain via TGC Designer Tools.',
        'Click "Export CSV Spreadsheet" for a convenient reference sheet during in-game construction.'
      ]
    }
  ];

  // Filter sections by search and category
  const filteredSections = helpSections.filter((section) => {
    const matchesSearch =
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.optionsExplained.some(
        (o) =>
          o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCat = activeCategory === 'All' || section.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Overview', 'Design Studios', 'LiDAR & GIS', 'In-Game 2K25', 'Community Workflows'];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Comprehensive User Documentation
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Studio Manual & Option Reference Guide</h1>
          <p className="text-sm text-slate-400">
            Detailed explanations of every option, workflow, tool, and button across all 11 design studios, with step-by-step tutorials and professional 2K25 course designer tips.
          </p>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics, tools, options, or 2K25 tips (e.g. 'pot bunker', 'blank plot', 'EPSG', 'heightmap')..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Community Best Practices Notice */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-900/50 text-xs text-emerald-200/90 flex items-start gap-3 shadow-lg">
        <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-emerald-300 font-bold">Recommended 4-Phase Course Design Workflow:</strong>
          <p className="text-slate-300 leading-relaxed">
            Progress through the studios in this order for best results:
            <span className="font-semibold text-white"> (1) AI Concept Studio & Theme Explorer</span> →
            <span className="font-semibold text-white"> (2) LiDAR & Terrain Studio</span> →
            <span className="font-semibold text-white"> (3) Course Masterplan & Hole Designer</span> →
            <span className="font-semibold text-white"> (4) 2K25 Execution Assistant & Playtesting</span>.
          </p>
        </div>
      </div>

      {/* Main Accordion List of Help Sections */}
      <div className="space-y-4">
        {filteredSections.map((sec) => {
          const isExpanded = expandedSectionId === sec.id;
          const Icon = sec.icon;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/95 border-emerald-500/60 shadow-xl ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedSectionId(isExpanded ? '' : sec.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                      isExpanded
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-800 text-emerald-400 border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {sec.category}
                      </span>
                      <h2 className="text-lg font-black text-white">{sec.title}</h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{sec.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {sec.tabId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab(sec.tabId!);
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition"
                    >
                      <span>Open Studio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="p-1 rounded-lg text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-emerald-400" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-800/80 space-y-6 text-xs text-slate-300 mt-2">
                  {/* Detailed Summary */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold uppercase tracking-wider text-emerald-400 text-[11px] block">
                      Purpose & Function
                    </span>
                    <p className="leading-relaxed text-slate-200">{sec.summary}</p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {sec.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Options & Controls Deep Dive */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4 h-4 text-emerald-400" /> Options & Tools Breakdown
                    </h3>
                    <div className="space-y-3">
                      {sec.optionsExplained.map((opt, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              {opt.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">Control #{idx + 1}</span>
                          </div>

                          <p className="text-slate-300 leading-relaxed">{opt.description}</p>

                          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-[11px] space-y-1">
                            <div className="text-slate-400">
                              <strong className="text-emerald-400">How to use:</strong> {opt.howToUse}
                            </div>
                            {opt.proTip && (
                              <div className="text-amber-300/90 flex items-start gap-1.5 pt-1 border-t border-slate-800/60">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Pro Architect Tip:</strong> {opt.proTip}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Workflow */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400" /> Step-by-Step Execution Guide
                    </h3>
                    <div className="space-y-2">
                      {sec.stepByStepGuide.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-slate-200 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  {sec.tabId && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onNavigateTab(sec.tabId!)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition"
                      >
                        <span>Launch {sec.title}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
