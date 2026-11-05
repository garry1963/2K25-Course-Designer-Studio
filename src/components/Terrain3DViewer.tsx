import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Hole } from '../types/golf';
import { Camera, Sun, Layers, RotateCcw, Mountain, Maximize2, Compass } from 'lucide-react';

interface Terrain3DViewerProps {
  heightmap: number[][];
  holes?: Hole[];
  selectedHole?: Hole | null;
  exaggeration?: number;
  wireframe?: boolean;
  showContour?: boolean;
  onSelectHole?: (hole: Hole) => void;
}

export const Terrain3DViewer: React.FC<Terrain3DViewerProps> = ({
  heightmap,
  holes = [],
  selectedHole,
  exaggeration = 1.4,
  wireframe = false,
  showContour = false,
  onSelectHole
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<'perspective' | 'topDown'>('perspective');
  const [lightingPreset, setLightingPreset] = useState<'goldenHour' | 'noon' | 'overcast'>('goldenHour');
  const [wireframeState, setWireframeState] = useState(wireframe);
  const [exagState, setExagState] = useState(exaggeration);

  // References for three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const terrainMeshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const holesGroupRef = useRef<THREE.Group | null>(null);

  // Interaction tracking for mouse drag orbit
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 180, theta: Math.PI / 4, phi: Math.PI / 3 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x131d27);
    scene.fog = new THREE.FogExp2(0x131d27, 0.0035);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 2000);
    cameraRef.current = camera;
    updateCameraPosition();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting Setup
    const ambient = new THREE.HemisphereLight(0x90e0ef, 0x2d6a4f, 0.85);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfff3b0, 1.4);
    dirLight.position.set(120, 160, 90);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 10;
      dirLight.shadow.camera.far = 400;
      const d = 120;
      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    // Build Terrain Geometry from Heightmap
    buildTerrain();

    // Group for hole routing pins, fairways and markers
    const holesGroup = new THREE.Group();
    scene.add(holesGroup);
    holesGroupRef.current = holesGroup;

    // Animation / Render loop
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update camera coordinates based on spherical angles
  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.position.set(x, Math.max(y, 10), z);
    cameraRef.current.lookAt(0, 0, 0);
  };

  // Rebuild terrain geometry when heightmap or exaggeration changes
  const buildTerrain = () => {
    if (!sceneRef.current) return;
    if (terrainMeshRef.current) {
      sceneRef.current.remove(terrainMeshRef.current);
      terrainMeshRef.current.geometry.dispose();
      if (Array.isArray(terrainMeshRef.current.material)) {
        terrainMeshRef.current.material.forEach((m) => m.dispose());
      } else {
        terrainMeshRef.current.material.dispose();
      }
    }

    const rows = heightmap.length || 32;
    const cols = heightmap[0]?.length || 32;
    const terrainSize = 140;

    const geometry = new THREE.PlaneGeometry(terrainSize, terrainSize, cols - 1, rows - 1);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const h = (heightmap[r]?.[c] ?? 0.5) * 22 * exagState;
      pos.setY(i, h);
    }
    geometry.computeVertexNormals();

    // Procedural textured terrain material
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    // Base fairway / rough gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#2d5a27');
    grad.addColorStop(0.5, '#406c35');
    grad.addColorStop(1, '#1b3b19');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Add contour stripes if enabled
    if (showContour) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      for (let y = 0; y < 512; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(150, y + 8, 350, y - 8, 512, y);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.05,
      wireframe: wireframeState,
      flatShading: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    sceneRef.current.add(mesh);
    terrainMeshRef.current = mesh;
  };

  // Re-render terrain when exaggeration or wireframe changes
  useEffect(() => {
    buildTerrain();
  }, [heightmap, exagState, wireframeState, showContour]);

  // Render Hole Markers & Fairway Ribbon lines in 3D
  useEffect(() => {
    const group = holesGroupRef.current;
    if (!group) return;

    // Clear existing hole markers
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
      if ((child as any).material) (child as any).material.dispose();
    }

    holes.forEach((h) => {
      // Map 0..1000 coordinates to -65..65 in 3D scene space
      const to3DX = (val: number) => ((val - 500) / 500) * 60;
      const to3DZ = (val: number) => ((val - 500) / 500) * 60;

      const teePos = new THREE.Vector3(to3DX(h.tee.x), 5, to3DZ(h.tee.y));
      const greenPos = new THREE.Vector3(to3DX(h.green.x), 5, to3DZ(h.green.y));

      const isSelected = selectedHole?.id === h.id;

      // Tee Cylinder
      const teeGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 12);
      const teeMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x38bdf8 : 0xfacc15,
        roughness: 0.3
      });
      const teeMesh = new THREE.Mesh(teeGeo, teeMat);
      teeMesh.position.copy(teePos);
      group.add(teeMesh);

      // Green Disc
      const greenGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.4, 16);
      const greenMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x4ade80 : 0x22c55e,
        roughness: 0.5
      });
      const greenMesh = new THREE.Mesh(greenGeo, greenMat);
      greenMesh.position.copy(greenPos);
      group.add(greenMesh);

      // Fairway centerline curve
      const points = [teePos];
      if (h.landing1) {
        points.push(new THREE.Vector3(to3DX(h.landing1.x), 5, to3DZ(h.landing1.y)));
      }
      if (h.landing2) {
        points.push(new THREE.Vector3(to3DX(h.landing2.x), 5, to3DZ(h.landing2.y)));
      }
      points.push(greenPos);

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, isSelected ? 1.4 : 0.7, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x38bdf8 : 0xa3e635,
        roughness: 0.4,
        emissive: isSelected ? 0x0284c7 : 0x000000,
        emissiveIntensity: 0.4
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tubeMesh);

      // Flagstick on green
      const poleGeo = new THREE.CylinderGeometry(0.12, 0.12, 5.5, 6);
      const poleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const poleMesh = new THREE.Mesh(poleGeo, poleMat);
      poleMesh.position.set(greenPos.x, greenPos.y + 2.7, greenPos.z);
      group.add(poleMesh);

      // Flag
      const flagGeo = new THREE.BoxGeometry(1.6, 1.0, 0.08);
      const flagMat = new THREE.MeshBasicMaterial({ color: isSelected ? 0xef4444 : 0xf97316 });
      const flagMesh = new THREE.Mesh(flagGeo, flagMat);
      flagMesh.position.set(greenPos.x + 0.8, greenPos.y + 4.8, greenPos.z);
      group.add(flagMesh);
    });
  }, [holes, selectedHole]);

  // Mouse drag handler for orbiting camera
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevMouseRef.current.x;
    const dy = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    sphericalRef.current.theta -= dx * 0.008;
    sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - dy * 0.008));
    updateCameraPosition();
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    sphericalRef.current.radius = Math.max(40, Math.min(320, sphericalRef.current.radius + e.deltaY * 0.12));
    updateCameraPosition();
  };

  const resetCamera = (mode: 'iso' | 'top') => {
    if (mode === 'top') {
      sphericalRef.current = { radius: 190, theta: 0, phi: 0.1 };
      setCameraMode('topDown');
    } else {
      sphericalRef.current = { radius: 180, theta: Math.PI / 4, phi: Math.PI / 3 };
      setCameraMode('perspective');
    }
    updateCameraPosition();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Floating HUD Toolbar */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 shadow-lg text-xs text-slate-200">
        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
          <Mountain className="w-4 h-4" /> 3D LiDAR Mesh
        </span>
        <span className="text-slate-500">|</span>
        <span>Holes: {holes.length}</span>
        {selectedHole && (
          <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">
            Hole #{selectedHole.number} (Par {selectedHole.par})
          </span>
        )}
      </div>

      {/* Camera and View Controls Dock */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-lg border border-slate-700/60 shadow-lg">
        <button
          onClick={() => resetCamera('iso')}
          title="Isometric 3D Perspective"
          className={`px-2.5 py-1 text-xs rounded font-medium transition ${
            cameraMode === 'perspective' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Perspective
        </button>
        <button
          onClick={() => resetCamera('top')}
          title="Top-down Ortho View"
          className={`px-2.5 py-1 text-xs rounded font-medium transition ${
            cameraMode === 'topDown' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Top Down
        </button>
        <div className="w-[1px] h-4 bg-slate-700 mx-1" />
        <button
          onClick={() => setWireframeState(!wireframeState)}
          title="Toggle Wireframe Mesh"
          className={`p-1.5 rounded transition ${wireframeState ? 'bg-amber-600/80 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={() => setExagState((prev) => (prev >= 2.2 ? 0.8 : prev + 0.4))}
          title={`Elevation Exaggeration: ${exagState.toFixed(1)}x`}
          className="px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 rounded flex items-center gap-1"
        >
          <Mountain className="w-3.5 h-3.5 text-emerald-400" />
          {exagState.toFixed(1)}x
        </button>
      </div>

      {/* Navigation hints badge at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/75 backdrop-blur-sm rounded-full border border-slate-800 text-[11px] text-slate-400 pointer-events-none flex items-center gap-3">
        <span>Left-click + Drag to Rotate</span>
        <span>•</span>
        <span>Scroll wheel to Zoom</span>
        <span>•</span>
        <span className="text-emerald-400">PGA TOUR 2K25 Terrain View</span>
      </div>
    </div>
  );
};
