"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { VINTAGE_SHIRTS, VintageShirt } from "@/data/products";
import { ArrowUpRight, MessageCircle, RotateCcw, Sparkles, X, Check } from "lucide-react";

interface ShirtMeshGroup {
  group: THREE.Group;
  shirt: VintageShirt;
  basePosition: THREE.Vector3;
  baseRotation: THREE.Euler;
  speed: number;
  floatOffset: number;
}

export function ShirtShowcase3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedShirt, setSelectedShirt] = useState<VintageShirt | null>(null);
  const [hoveredShirt, setHoveredShirt] = useState<VintageShirt | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  // References to keep state in animation loop
  const meshesRef = useRef<ShirtMeshGroup[]>([]);
  const selectedShirtIdRef = useRef<string | null>(null);
  const isRotatingRef = useRef(true);

  useEffect(() => {
    selectedShirtIdRef.current = selectedShirt?.id || null;
  }, [selectedShirt]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xfff5ea, 5);
    mainSpot.position.set(5, 8, 7);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.6;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0xf97316, 2.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const softFill = new THREE.DirectionalLight(0xffffff, 1.2);
    softFill.position.set(0, 5, -5);
    scene.add(softFill);

    // HELPER: Generate procedural vintage shirt canvas textures
    const createVintageShirtTexture = (shirt: VintageShirt): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;

      // Background fabric color
      ctx.fillStyle = shirt.model3DConfig.color;
      ctx.fillRect(0, 0, 512, 512);

      // Fabric weave texture noise
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let i = 0; i < 512; i += 4) {
        ctx.fillRect(i, 0, 2, 512);
        ctx.fillRect(0, i, 512, 2);
      }

      // Pattern Variations based on shirt style
      ctx.fillStyle = shirt.model3DConfig.accentColor;
      ctx.strokeStyle = shirt.model3DConfig.accentColor;

      if (shirt.model3DConfig.patternType === "botanical") {
        // Vintage Palm & Foliage shapes
        for (let x = 32; x < 512; x += 70) {
          for (let y = 32; y < 512; y += 70) {
            ctx.beginPath();
            ctx.ellipse(x, y, 16, 28, Math.PI / 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 20, y + 15, 12, 22, -Math.PI / 4, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,255,255,0.15)";
            ctx.fill();
            ctx.fillStyle = shirt.model3DConfig.accentColor;
          }
        }
      } else if (shirt.model3DConfig.patternType === "geometric") {
        // 70s Archival geometric chevron/diamonds
        ctx.lineWidth = 6;
        for (let y = 0; y < 512; y += 40) {
          ctx.beginPath();
          for (let x = 0; x < 512; x += 40) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + 20, y + 20);
            ctx.lineTo(x + 40, y);
          }
          ctx.stroke();
        }
      } else if (shirt.model3DConfig.patternType === "stripes") {
        // Multi-tone vertical retro stripes
        for (let x = 0; x < 512; x += 32) {
          ctx.fillRect(x, 0, 12, 512);
          ctx.fillStyle = "rgba(0,0,0,0.2)";
          ctx.fillRect(x + 12, 0, 4, 512);
          ctx.fillStyle = shirt.model3DConfig.accentColor;
        }
      } else if (shirt.model3DConfig.patternType === "retro-dots") {
        // Polka / micro print
        for (let x = 20; x < 512; x += 36) {
          for (let y = 20; y < 512; y += 36) {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      } else {
        // Abstract wave brushstrokes
        ctx.lineWidth = 14;
        ctx.lineCap = "round";
        for (let y = 30; y < 512; y += 80) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.bezierCurveTo(120, y - 40, 260, y + 50, 512, y - 20);
          ctx.stroke();
        }
      }

      // Front button placket shadow
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(250, 0, 12, 512);
      ctx.fillStyle = "#ffffff";
      for (let y = 80; y < 500; y += 75) {
        ctx.beginPath();
        ctx.arc(256, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    // BUILD SHORT-SLEEVE SHIRT 3D GEOMETRY GROUP
    const createShirt3D = (shirt: VintageShirt): THREE.Group => {
      const shirtGroup = new THREE.Group();
      shirtGroup.userData = { shirtId: shirt.id, shirtData: shirt };

      const fabricTexture = createVintageShirtTexture(shirt);
      const fabricMaterial = new THREE.MeshStandardMaterial({
        map: fabricTexture,
        roughness: 0.75,
        metalness: 0.08,
      });

      const collarMaterial = new THREE.MeshStandardMaterial({
        color: shirt.model3DConfig.collarColor,
        roughness: 0.8,
      });

      const buttonMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.3,
        metalness: 0.4,
      });

      // 1. Torso Body (Short sleeve button-up boxy torso)
      const torsoShape = new THREE.BoxGeometry(1.65, 2.1, 0.45, 4, 6, 2);
      // Soften edges with vertex displacement
      const pos = torsoShape.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const z = pos.getZ(i);
        // taper torso subtly towards waist and curve front
        if (z > 0) {
          pos.setZ(i, z + Math.sin((y + 1) * 1.5) * 0.06);
        }
      }
      torsoShape.computeVertexNormals();

      const torsoMesh = new THREE.Mesh(torsoShape, fabricMaterial);
      torsoMesh.castShadow = true;
      shirtGroup.add(torsoMesh);

      // 2. Left Short Sleeve
      const leftSleeveGeo = new THREE.CylinderGeometry(0.36, 0.4, 0.9, 16);
      leftSleeveGeo.rotateZ(-Math.PI / 3.2);
      const leftSleeve = new THREE.Mesh(leftSleeveGeo, fabricMaterial);
      leftSleeve.position.set(-1.1, 0.55, 0);
      shirtGroup.add(leftSleeve);

      // 3. Right Short Sleeve
      const rightSleeveGeo = new THREE.CylinderGeometry(0.36, 0.4, 0.9, 16);
      rightSleeveGeo.rotateZ(Math.PI / 3.2);
      const rightSleeve = new THREE.Mesh(rightSleeveGeo, fabricMaterial);
      rightSleeve.position.set(1.1, 0.55, 0);
      shirtGroup.add(rightSleeve);

      // 4. Cuban / Camp Open Collar
      const collarLeftGeo = new THREE.BoxGeometry(0.45, 0.22, 0.12);
      collarLeftGeo.rotateZ(-0.4);
      const collarLeft = new THREE.Mesh(collarLeftGeo, collarMaterial);
      collarLeft.position.set(-0.35, 1.05, 0.28);
      shirtGroup.add(collarLeft);

      const collarRightGeo = new THREE.BoxGeometry(0.45, 0.22, 0.12);
      collarRightGeo.rotateZ(0.4);
      const collarRight = new THREE.Mesh(collarRightGeo, collarMaterial);
      collarRight.position.set(0.35, 1.05, 0.28);
      shirtGroup.add(collarRight);

      // 5. Buttons down center front placket
      for (let y = 0.65; y >= -0.75; y -= 0.4) {
        const buttonGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 12);
        buttonGeo.rotateX(Math.PI / 2);
        const button = new THREE.Mesh(buttonGeo, buttonMaterial);
        button.position.set(0, y, 0.24);
        shirtGroup.add(button);
      }

      // 6. Chest Pocket
      const pocketGeo = new THREE.BoxGeometry(0.38, 0.42, 0.04);
      const pocket = new THREE.Mesh(pocketGeo, fabricMaterial);
      pocket.position.set(-0.45, 0.35, 0.23);
      shirtGroup.add(pocket);

      return shirtGroup;
    };

    // Instantiate shirts in spatial 3D arrangement
    const meshes: ShirtMeshGroup[] = [];
    VINTAGE_SHIRTS.forEach((shirt, index) => {
      const shirtGroup = createShirt3D(shirt);
      const [px, py, pz] = shirt.model3DConfig.position;
      shirtGroup.position.set(px, py, pz);

      const [rx, ry, rz] = shirt.model3DConfig.initialRotation;
      shirtGroup.rotation.set(rx, ry, rz);

      scene.add(shirtGroup);

      meshes.push({
        group: shirtGroup,
        shirt,
        basePosition: new THREE.Vector3(px, py, pz),
        baseRotation: new THREE.Euler(rx, ry, rz),
        speed: 0.8 + index * 0.15,
        floatOffset: index * 1.2,
      });
    });

    meshesRef.current = meshes;

    // RAYCASTING FOR INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedShirt = (clientX: number, clientY: number): VintageShirt | null => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const groups = meshes.map((m) => m.group);
      const intersects = raycaster.intersectObjects(groups, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && current.parent !== scene) {
          if (current.userData && current.userData.shirtData) {
            return current.userData.shirtData;
          }
          current = current.parent;
        }
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const hit = getIntersectedShirt(e.clientX, e.clientY);
      setHoveredShirt(hit);
      container.style.cursor = hit ? "pointer" : "default";
    };

    const handlePointerDown = (e: MouseEvent) => {
      const hit = getIntersectedShirt(e.clientX, e.clientY);
      if (hit) {
        setSelectedShirt(hit);
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mousedown", handlePointerDown);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile screens
      if (width < 640) {
        camera.position.z = 10.5;
      } else if (width < 1024) {
        camera.position.z = 8.5;
      } else {
        camera.position.z = 7.5;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentSelectedId = selectedShirtIdRef.current;
      const shouldRotate = isRotatingRef.current;

      meshes.forEach((item) => {
        const isSelected = item.shirt.id === currentSelectedId;

        if (isSelected) {
          // Bring selected shirt into forward hero focus
          item.group.position.lerp(new THREE.Vector3(0, 0, 3.2), 0.08);
          // Gently rotate selected shirt for 360 inspection
          item.group.rotation.y += 0.015;
          item.group.rotation.x = Math.sin(elapsedTime * 1.5) * 0.08;
          item.group.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.08);
        } else {
          // Calculate natural floating and ambient spatial motion
          const floatY = shouldRotate
            ? Math.sin(elapsedTime * item.speed + item.floatOffset) * 0.18
            : 0;
          const floatX = shouldRotate
            ? Math.cos(elapsedTime * (item.speed * 0.7) + item.floatOffset) * 0.08
            : 0;

          const targetPos = new THREE.Vector3(
            item.basePosition.x + floatX,
            item.basePosition.y + floatY,
            item.basePosition.z
          );

          item.group.position.lerp(targetPos, 0.05);

          if (shouldRotate) {
            item.group.rotation.y =
              item.baseRotation.y + Math.sin(elapsedTime * item.speed + item.floatOffset) * 0.22;
            item.group.rotation.x =
              item.baseRotation.x + Math.cos(elapsedTime * 0.6 + item.floatOffset) * 0.1;
          }

          item.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handlePointerDown);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getWhatsAppLink = (shirt: VintageShirt) => {
    const text = encodeURIComponent(
      `Hello RARE, I want to order the "${shirt.name}" (${formatPrice(shirt.price)}).\nPlease confirm size availability and Lagos/nationwide dispatch.`
    );
    return `https://wa.me/2348000000000?text=${text}`;
  };

  return (
    <section className="relative w-full bg-[#070709] border-b border-[#27272a] overflow-hidden py-16 lg:py-24">
      {/* Editorial Header */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-[#27272a] text-[#f97316] text-[11px] font-mono tracking-widest uppercase rounded-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPATIAL 3D ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              INTERACTIVE <br />
              <span className="text-[#f97316]">VINTAGE SHIRT</span> GALLERY
            </h2>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md uppercase tracking-wider">
              Explore short-sleeve camp shirts floating in 3D perspective. Click any shirt to inspect custom retro prints and order directly.
            </p>

            {/* Showcase Controls */}
            <div className="flex items-center md:justify-end gap-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className="px-3 py-1.5 border border-[#27272a] hover:border-zinc-500 bg-[#121214] text-zinc-300 rounded-sm flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? "text-[#f97316]" : "text-zinc-500"}`} />
                <span>{isRotating ? "MOTION ON" : "MOTION PAUSED"}</span>
              </button>

              {selectedShirt && (
                <button
                  type="button"
                  onClick={() => setSelectedShirt(null)}
                  className="px-3 py-1.5 border border-[#f97316]/50 bg-black text-[#f97316] hover:bg-[#f97316] hover:text-black rounded-sm flex items-center gap-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>RESET VIEW</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] select-none">
        {/* Canvas DOM Node */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* Ambient Grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

        {/* Hovered Shirt HUD Card */}
        {hoveredShirt && !selectedShirt && (
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 bg-[#121214]/90 border border-zinc-700/80 p-4 rounded-sm backdrop-blur-md max-w-xs animate-in fade-in duration-200">
            <span className="text-[10px] font-mono text-[#f97316] uppercase tracking-widest block">
              CLICK TO FOCUS
            </span>
            <h4 className="text-sm font-bold uppercase text-white tracking-tight mt-0.5">
              {hoveredShirt.name}
            </h4>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800 text-xs font-mono">
              <span className="text-zinc-400">{hoveredShirt.series}</span>
              <span className="text-white font-bold">{formatPrice(hoveredShirt.price)}</span>
            </div>
          </div>
        )}

        {/* Selected Shirt Inspector Drawer Overlay */}
        {selectedShirt && (
          <div className="absolute top-6 right-6 z-30 w-full max-w-sm sm:max-w-md bg-[#121214]/95 border border-[#f97316]/50 p-6 rounded-sm shadow-2xl backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-start justify-between pb-4 border-b border-[#27272a]">
              <div>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#f97316] text-black">
                  {selectedShirt.badge || "IN FOCUS"}
                </span>
                <span className="ml-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {selectedShirt.series}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedShirt(null)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Close focused shirt inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 font-mono">
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                {selectedShirt.name}
              </h3>

              <div className="text-xl font-bold text-[#f97316]">
                {formatPrice(selectedShirt.price)}
              </div>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {selectedShirt.description}
              </p>

              {/* Sizes Available */}
              <div className="pt-2">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1.5">
                  AVAILABLE SIZES:
                </span>
                <div className="flex gap-2">
                  {selectedShirt.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-2.5 py-1 text-xs border border-zinc-700 bg-zinc-900 text-white rounded-sm font-semibold"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Garment Specifications */}
              <div className="pt-2 space-y-1 text-[11px] text-zinc-400">
                <div className="flex justify-between border-b border-zinc-900 py-1">
                  <span>COLLAR</span>
                  <span className="text-zinc-200">{selectedShirt.collar}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 py-1">
                  <span>FABRIC</span>
                  <span className="text-zinc-200">{selectedShirt.fabric}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 py-1">
                  <span>TAILORING</span>
                  <span className="text-zinc-200">Lagos Artisan Studio</span>
                </div>
              </div>

              {/* WhatsApp Action */}
              <div className="pt-4">
                <a
                  href={getWhatsAppLink(selectedShirt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#f97316] hover:bg-[#ea580c] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER ON WHATSAPP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Helper Indicator */}
        <div className="pointer-events-none absolute bottom-4 inset-x-0 flex justify-center z-10">
          <div className="px-4 py-1.5 bg-black/75 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-widest rounded-full backdrop-blur-sm">
            <span>DRAG / ROTATE / SELECT INDIVIDUAL SHIRTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
