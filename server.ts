import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is available
function getGeminiClient(): GoogleGenAI | null {
  const currentKey = process.env.GEMINI_API_KEY;
  if (!currentKey || currentKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: currentKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// POST endpoint for generating course concepts
app.post('/api/concepts/generate', async (req, res) => {
  try {
    const { prompt, style, holesCount, difficulty } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      console.log('No GEMINI_API_KEY set, generating custom heuristic concepts for:', prompt);
      const fallbackConcepts = generateSmartFallbackConcepts(prompt, style);
      return res.json({ concepts: fallbackConcepts, source: 'heuristics' });
    }

    const systemInstruction = `You are a world-class golf course architect and expert advisor for the Course Designer in PGA TOUR 2K25.
Analyze the user's course vision and generate exactly 3 distinct, creative course concepts (Concept A, Concept B, Concept C) customized to their description.
For each concept, choose the best matching official PGA TOUR 2K25 theme from this list:
- "boreal" (Boreal)
- "links" (Links)
- "tropical" (Tropical)
- "desert" (Desert)
- "countryside" (Countryside)
- "swiss" (Swiss)
- "harvest" (Harvest)
- "rustic" (Rustic)
- "autumn" (Autumn)
- "step" (Step / Steppe)

Provide realistic yardages (6800 to 7600), par (70, 71, or 72), authentic architectural styling, and practical 2K25 Course Designer execution recommendations.`;

    console.log('[Server] Calling ai.models.generateContent for model gemini-3.8-flash...');
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Course Vision Prompt: "${prompt}"
Preferred Style: ${style || 'Championship'}
Holes: ${holesCount || 18}
Difficulty: ${difficulty || 'Championship'}

Generate 3 diverse, detailed course architectural concepts suitable for recreation in PGA TOUR 2K25.`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'List of 3 distinct golf course concepts',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING, description: 'Evocative course name with concept letter' },
              themeId: { type: Type.STRING, description: 'One of: boreal, links, tropical, desert, countryside, swiss, harvest, rustic, autumn, step' },
              themeName: { type: Type.STRING, description: 'Display name of 2K25 theme' },
              style: { type: Type.STRING, description: 'Architectural style (e.g. Traditional Links, Sandbelt, Desert Oasis, Alpine)' },
              par: { type: Type.INTEGER, description: 'Par 70, 71, or 72' },
              lengthYards: { type: Type.INTEGER, description: 'Total yardage' },
              backdrop: { type: Type.STRING, description: 'Recommended 2K25 horizon backdrop setting' },
              vegetationPreset: { type: Type.STRING, description: 'Key trees, bushes, and grasses to populate' },
              waterFeatureType: { type: Type.STRING, description: 'Lakes, streams, wetlands, ocean, or dry arroyos' },
              bunkerStyle: { type: Type.STRING, description: 'Specific bunker shape and lip character' },
              terrainSignature: { type: Type.STRING, description: 'Topographical landforms, ridges, or swales' },
              summary: { type: Type.STRING, description: 'Architectural rationale and playing character' },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 practical in-game instructions for PGA TOUR 2K25 Course Designer'
              }
            },
            required: [
              'id',
              'title',
              'themeId',
              'themeName',
              'style',
              'par',
              'lengthYards',
              'backdrop',
              'vegetationPreset',
              'waterFeatureType',
              'bunkerStyle',
              'terrainSignature',
              'summary',
              'recommendations'
            ]
          }
        }
      }
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API call timed out after 8 seconds')), 8000)
    );

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
    console.log('[Server] Gemini API response received.');

    const parsed = JSON.parse(response.text || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) {
      return res.json({ concepts: parsed, source: 'gemini' });
    }

    const fallbackConcepts = generateSmartFallbackConcepts(prompt, style);
    return res.json({ concepts: fallbackConcepts, source: 'heuristics' });
  } catch (err: any) {
    console.error('Error in /api/concepts/generate:', err);
    // Return smart generated concepts rather than failing
    const { prompt, style } = req.body || {};
    const fallbackConcepts = generateSmartFallbackConcepts(prompt || 'Championship Golf Course', style);
    return res.json({ concepts: fallbackConcepts, source: 'heuristics', warning: err.message });
  }
});

// Helper to synthesize custom concepts when offline or API key is absent
function generateSmartFallbackConcepts(prompt: string, style?: string) {
  const p = prompt.toLowerCase();
  
  let primaryTheme = 'boreal';
  let primaryThemeName = 'Boreal';
  if (p.includes('link') || p.includes('coast') || p.includes('ocean') || p.includes('sea') || p.includes('dune')) {
    primaryTheme = 'links';
    primaryThemeName = 'Links';
  } else if (p.includes('tropical') || p.includes('island') || p.includes('palm') || p.includes('jungle') || p.includes('rainforest')) {
    primaryTheme = 'tropical';
    primaryThemeName = 'Tropical';
  } else if (p.includes('desert') || p.includes('canyon') || p.includes('sandstone') || p.includes('cactus') || p.includes('arizona')) {
    primaryTheme = 'desert';
    primaryThemeName = 'Desert';
  } else if (p.includes('mountain') || p.includes('alpine') || p.includes('swiss') || p.includes('peak') || p.includes('cliff')) {
    primaryTheme = 'swiss';
    primaryThemeName = 'Swiss';
  } else if (p.includes('rustic') || p.includes('river') || p.includes('woodland') || p.includes('timber')) {
    primaryTheme = 'rustic';
    primaryThemeName = 'Rustic';
  } else if (p.includes('autumn') || p.includes('fall') || p.includes('maple')) {
    primaryTheme = 'autumn';
    primaryThemeName = 'Autumn';
  } else if (p.includes('parkland') || p.includes('country') || p.includes('estate') || p.includes('cottage')) {
    primaryTheme = 'countryside';
    primaryThemeName = 'Countryside';
  } else if (p.includes('prairie') || p.includes('sandhill') || p.includes('grain') || p.includes('harvest')) {
    primaryTheme = 'harvest';
    primaryThemeName = 'Harvest';
  }

  // Derive descriptive names based on user keywords
  const cleanWords = prompt.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3);
  const keyword1 = cleanWords[0] ? cleanWords[0].charAt(0).toUpperCase() + cleanWords[0].slice(1) : 'Highland';
  const keyword2 = cleanWords[1] ? cleanWords[1].charAt(0).toUpperCase() + cleanWords[1].slice(1) : 'Reserve';

  return [
    {
      id: `c_${Date.now()}_1`,
      title: `${keyword1} ${keyword2} Club (Concept A)`,
      themeId: primaryTheme,
      themeName: primaryThemeName,
      style: style || 'Championship Tournament',
      par: 72,
      lengthYards: 7285,
      backdrop: `${primaryThemeName} Horizon with Dramatic Atmospheric Haze`,
      vegetationPreset: `Native ${primaryThemeName} trees, dense perimeter rough, and fescue borders`,
      waterFeatureType: 'Strategically integrated natural ponds and winding creek hazards',
      bunkerStyle: 'Deep, sculpted tournament bunkers with crisp, defined sod lips',
      terrainSignature: `Dynamic undulating fairway ridges and elevated green plateaus inspired by "${prompt.slice(0, 60)}..."`,
      summary: `A tournament-tested layout that directly translates your vision: "${prompt}". Designed to test accuracy off the tee while presenting memorable risk/reward decision points.`,
      recommendations: [
        `Select the 2K25 "${primaryThemeName}" theme and calibrate automated vegetation density to 70%.`,
        'Use the Blank Plot zero-out workflow before laying fairways to keep elevations clean.',
        'Keep putting green cup slopes below 2.2 degrees to ensure fair, competitive tournament roll.'
      ]
    },
    {
      id: `c_${Date.now()}_2`,
      title: `${keyword1} Valley National (Concept B)`,
      themeId: primaryTheme === 'links' ? 'boreal' : 'links',
      themeName: primaryTheme === 'links' ? 'Boreal' : 'Links',
      style: 'Traditional Strategic',
      par: 71,
      lengthYards: 7120,
      backdrop: 'Rolling Coastal Dunes & Wide Open Sky',
      vegetationPreset: 'Fescue wisps, gorse clusters, and natural ground scrub',
      waterFeatureType: 'Subtle collection swales and diagonal burn crossings',
      bunkerStyle: 'Classic sod-faced revetted pot bunkers placed in speed slots',
      terrainSignature: 'Firm, rumpled fairway hummocks and false fronts funneling into collection hollows',
      summary: 'A strategic, ground-game alternative emphasizing shot shape, rolling terrain, and multi-tier greens that reward creative recovery play.',
      recommendations: [
        'Set fairway firmness high in 2K25 to encourage bounding rollout on dogleg drives.',
        'Carve subtle punchbowl bowls on blind green approaches to keep extreme elevation drops playable.',
        'Position cross-bunkers at 280-295 yards to force decisions on tee club selection.'
      ]
    },
    {
      id: `c_${Date.now()}_3`,
      title: `${keyword2} Sanctuary Golf Links (Concept C)`,
      themeId: primaryTheme === 'swiss' ? 'rustic' : 'swiss',
      themeName: primaryTheme === 'swiss' ? 'Rustic' : 'Swiss',
      style: 'Dramatic Showcase',
      par: 72,
      lengthYards: 7410,
      backdrop: 'Majestic Mountain Massifs & Towering Ridges',
      vegetationPreset: 'Evergreen conifers, rocky scree outcrops, and mountain wildflowers',
      waterFeatureType: 'Cascading boulder-lined waterfalls and reflecting basins',
      bunkerStyle: 'Expansive sandbelt-style waste areas cut directly into natural hill contours',
      terrainSignature: 'Dramatic vertical drops, cliffside tee boxes, and natural spectator amphitheaters',
      summary: 'A breathtaking, cinematic championship design leveraging verticality and natural rock hazard features for maximum visual impact.',
      recommendations: [
        'Utilize 2K25 landscape sculpting brushes with 0.8 falloff to create sheer rock wall edges.',
        'Design Hole 17 as a high-drama drivable risk-and-reward par 4 under 335 yards.',
        'Place multi-tier grandstand spectator mounds around the 9th and 18th clubhouse greens.'
      ]
    }
  ];
}

// Mount Vite middleware in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PGA TOUR 2K25 Designer Studio running on http://localhost:${PORT}`);
  });
}

startServer();
