import { ref, onMounted, onUnmounted, markRaw, shallowRef } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';

export function useCinematicJourney(canvasRef, experiences, projects, skills) {
    const renderer = shallowRef(null);
    const scene = shallowRef(null);
    const camera = shallowRef(null);
    const animationId = ref(null);
    
    // Journey state
    const isIntroComplete = ref(false);
    const showWelcome = ref(true);
    const currentExperienceIndex = ref(0);
    const currentProjectIndex = ref(0);
    const currentSkillCategory = ref(null);
    const currentExperience = ref(null);
    const currentProject = ref(null);
    const showExperienceDetail = ref(false);
    const showProjectDetail = ref(false);
    const showSkillsDetail = ref(false);
    const isJourneyActive = ref(false);
    const journeyPhase = ref('intro'); // 'intro', 'skills', 'experiences', 'projects', 'finale'
    const journeyProgress = ref(0); // 0-100%
    
    // Background music - NOT reactive, plain JavaScript
    let musicAudio = null;
    const isMusicPlaying = ref(false);
    
    // Journey stations
    const skillStations = shallowRef([]);
    const experienceStations = shallowRef([]);
    const projectStations = shallowRef([]);
    
    // Welcome message
    const welcomeMessage = ref("Welcome to My Journey");
    const welcomeSubtext = ref("Experience my skills, career path, and featured projects in an immersive 3D story");
    const welcomeInstructions = ref("Click 'Begin Journey' to explore");
    
    const initScene = () => {
        if (!canvasRef.value) return;

        scene.value = markRaw(new THREE.Scene());
        scene.value.background = new THREE.Color(0x0a0a1a);
        scene.value.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

        camera.value = markRaw(new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        ));
        
        // Start camera at intro position - positioned to see skills constellation
        camera.value.position.set(0, 35, 25);
        camera.value.lookAt(0, 15, 0);

        renderer.value = markRaw(new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            antialias: true,
            alpha: true,
        }));
        renderer.value.setSize(window.innerWidth, window.innerHeight);
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.value.shadowMap.enabled = true;
        renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;

        // Colorful, modern lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.4);
        scene.value.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 30, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        scene.value.add(directionalLight);

        // Multiple colored lights for atmosphere
        const lights = [
            { color: 0x00ffff, position: [-40, 15, 0] },
            { color: 0x9333ea, position: [40, 15, 0] },
            { color: 0x06b6d4, position: [0, 15, -40] },
        ];
        
        lights.forEach(lightData => {
            const light = new THREE.PointLight(lightData.color, 0.8, 100);
            light.position.set(...lightData.position);
            scene.value.add(light);
        });

        createGround();
        createSkillStations();
        createExperienceStations();
        createProjectStations();
        createEnvironment();

        animate();
    };

    const createGround = () => {
        const groundGeometry = new THREE.PlaneGeometry(300, 300, 100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x0f0f1e,
            roughness: 0.9,
            metalness: 0.1,
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        
        // Create animated grid
        const gridHelper = new THREE.GridHelper(300, 150, 0x6366f1, 0x1a1a2e);
        gridHelper.material.opacity = 0.15;
        gridHelper.material.transparent = true;
        
        scene.value.add(ground);
        scene.value.add(gridHelper);
        
        // Add pathway lights
        for (let i = -100; i <= 100; i += 20) {
            const pathLight = new THREE.PointLight(0x00ffff, 0.3, 15);
            pathLight.position.set(i, 0.5, 0);
            scene.value.add(pathLight);
        }
    };

    // Create skill visualization stations - Circular constellation layout
    const createSkillStations = () => {
        if (!skills || typeof skills !== 'object') return;

        const categories = Object.keys(skills);
        const stations = [];
        const radius = 35;
        const centerY = 15;
        
        categories.forEach((category, index) => {
            const angle = (index / categories.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = centerY + (Math.sin(angle * 2) * 5); // Varied heights for organic feel
            const skillList = skills[category];

            // Create floating crystal structure
            const crystalGroup = new THREE.Group();
            
            // Main crystal (icosahedron for geometric beauty)
            const crystalGeometry = new THREE.IcosahedronGeometry(3, 1);
            const crystalMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x06b6d4,
                metalness: 0.9,
                roughness: 0.1,
                transparent: true,
                opacity: 0.7,
                transmission: 0.5,
                thickness: 0.5,
                envMapIntensity: 1.5,
            });
            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            crystal.position.y = 5;
            crystalGroup.add(crystal);
            
            // Wireframe overlay for tech look
            const wireframeGeo = new THREE.EdgesGeometry(crystalGeometry);
            const wireframeMat = new THREE.LineBasicMaterial({ 
                color: 0x00ffff,
                linewidth: 2,
                transparent: true,
                opacity: 0.8
            });
            const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
            wireframe.position.copy(crystal.position);
            crystalGroup.add(wireframe);
            
            // Floating platform base - hexagonal
            const hexShape = new THREE.Shape();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const px = Math.cos(angle) * 4;
                const py = Math.sin(angle) * 4;
                if (i === 0) hexShape.moveTo(px, py);
                else hexShape.lineTo(px, py);
            }
            hexShape.closePath();
            
            const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.1 };
            const platformGeometry = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
            const platformMaterial = new THREE.MeshStandardMaterial({
                color: 0x0a1628,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0x06b6d4,
                emissiveIntensity: 0.2,
            });
            const platform = new THREE.Mesh(platformGeometry, platformMaterial);
            platform.rotation.x = -Math.PI / 2;
            platform.position.y = 0.5;
            crystalGroup.add(platform);
            
            // Energy rings spiraling around
            for (let i = 0; i < 3; i++) {
                const ringGeo = new THREE.TorusGeometry(4 + i * 0.5, 0.1, 16, 100);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.4 - i * 0.1,
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.position.y = 2 + i * 1.5;
                ring.rotation.x = Math.PI / 2 + (i * 0.2);
                crystalGroup.add(ring);
            }
            
            // Holographic text label
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            
            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 512, 0);
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
            gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 128);
            
            // Text with glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00ffff';
            ctx.fillStyle = '#00ffff';
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(category.toUpperCase(), 256, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            const labelGeometry = new THREE.PlaneGeometry(8, 2);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.y = 8;
            crystalGroup.add(label);

            // Orbiting data particles
            const particleCount = 100;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 5 + Math.random() * 2;
                const height = Math.random() * 8;
                positions[i] = Math.cos(angle) * radius;
                positions[i + 1] = height;
                positions[i + 2] = Math.sin(angle) * radius;
                
                colors[i] = 0;
                colors[i + 1] = 1;
                colors[i + 2] = 1;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.15,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            crystalGroup.add(particles);
            
            crystalGroup.position.set(x, y, z);
            scene.value.add(crystalGroup);

            stations.push({
                position: markRaw(new THREE.Vector3(x, y, z)),
                category,
                skills: skillList,
                group: markRaw(crystalGroup),
                crystal: markRaw(crystal),
                wireframe: markRaw(wireframe),
                platform: markRaw(platform),
                label: markRaw(label),
                particles: markRaw(particles),
            });
        });
        
        skillStations.value = stations;
    };

    const createExperienceStations = () => {
        if (!experiences || !experiences.length) return;

        const stations = [];
        const spiralRadius = 25;
        const spiralHeight = 60;
        const centerX = 0;
        const centerZ = 0;
        
        const sortedExperiences = [...experiences].sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });

        sortedExperiences.forEach((experience, index) => {
            const progress = index / (sortedExperiences.length - 1 || 1);
            const angle = progress * Math.PI * 4; // 2 full rotations upward
            const currentRadius = spiralRadius * (1 - progress * 0.3); // Spiral inward as we go up
            const x = centerX + Math.cos(angle) * currentRadius;
            const z = centerZ + Math.sin(angle) * currentRadius;
            const y = 5 + (progress * spiralHeight);
            const year = new Date(experience.start_date).getFullYear();

            // Create holographic pillar group
            const pillarGroup = new THREE.Group();
            
            // Base platform - octagonal
            const octagonShape = new THREE.Shape();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const px = Math.cos(angle) * 4.5;
                const py = Math.sin(angle) * 4.5;
                if (i === 0) octagonShape.moveTo(px, py);
                else octagonShape.lineTo(px, py);
            }
            octagonShape.closePath();
            
            const baseGeometry = new THREE.ExtrudeGeometry(octagonShape, { depth: 1, bevelEnabled: false });
            const baseMaterial = new THREE.MeshStandardMaterial({
                color: 0x001a33,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.3,
            });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.rotation.x = -Math.PI / 2;
            base.position.y = 0.5;
            pillarGroup.add(base);
            
            // Floating holographic screen (semi-transparent to show canvas behind)
            const screenGeometry = new THREE.BoxGeometry(7, 5, 0.2);
            const screenMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x003355,
                metalness: 0.5,
                roughness: 0.1,
                transparent: true,
                opacity: 0.3, // Much more transparent so canvas shows through
                transmission: 0.3,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.1,
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.y = 6;
            pillarGroup.add(screen);
            
            // Screen frame - glowing edges
            const frameGeo = new THREE.EdgesGeometry(screenGeometry);
            const frameMat = new THREE.LineBasicMaterial({ 
                color: 0x00ffff,
                linewidth: 3,
            });
            const frame = new THREE.LineSegments(frameGeo, frameMat);
            frame.position.copy(screen.position);
            pillarGroup.add(frame);
            
            // Holographic display - simple and reliable (NO LOGO LOADING)
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 384;
            const ctx = canvas.getContext('2d');
            
            // Clear and draw background (bright for visibility)
            ctx.fillStyle = '#001a33'; // Solid dark blue
            ctx.fillRect(0, 0, 512, 384);
            
            // Grid pattern
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 512; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, 384);
                ctx.stroke();
            }
            for (let i = 0; i < 384; i += 40) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(512, i);
                ctx.stroke();
            }
            
            // Year - top (bright and glowing)
            ctx.shadowBlur = 40;
            ctx.shadowColor = '#00ffff';
            ctx.fillStyle = '#00ffff';
            ctx.font = 'bold 110px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(year.toString(), 256, 120);
            
            // Company name - center (large and prominent)
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#00ffff';
            ctx.fillStyle = '#ffffff'; // Pure white for maximum visibility
            ctx.font = 'bold 55px Arial';
            ctx.fillText(experience.company, 256, 240);
            
            // Corners
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 3;
            // Top left
            ctx.beginPath();
            ctx.moveTo(20, 40);
            ctx.lineTo(20, 20);
            ctx.lineTo(40, 20);
            ctx.stroke();
            // Top right
            ctx.beginPath();
            ctx.moveTo(492, 40);
            ctx.lineTo(492, 20);
            ctx.lineTo(472, 20);
            ctx.stroke();
            // Bottom left
            ctx.beginPath();
            ctx.moveTo(20, 344);
            ctx.lineTo(20, 364);
            ctx.lineTo(40, 364);
            ctx.stroke();
            // Bottom right
            ctx.beginPath();
            ctx.moveTo(492, 344);
            ctx.lineTo(492, 364);
            ctx.lineTo(472, 364);
            ctx.stroke();
            
            // Create texture and mesh
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            
            const displayMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: false, // Make it fully opaque
                opacity: 1,
                side: THREE.DoubleSide,
                emissive: 0xffffff, // Make it glow bright white
                emissiveMap: texture, // Use the texture as emissive too
                emissiveIntensity: 1,
            });
            
            const display = new THREE.Mesh(
                new THREE.PlaneGeometry(6.8, 4.8),
                displayMaterial
            );
            display.position.set(0, 6, 0.5); // Move in front of screen
            
            // Rotate to face outward from spiral center
            // Calculate angle from center (0,0) to this station position (x, z)
            const angleFromCenter = Math.atan2(z, x);
            display.rotation.y = angleFromCenter; // Face outward
            
            pillarGroup.add(display);
            
            // Also add to stations array for debugging
            pillarGroup.userData.display = display;

            // Multiple holographic rings at different heights
            for (let i = 0; i < 4; i++) {
                const ringRadius = 5 - i * 0.3;
                const ringGeo = new THREE.TorusGeometry(ringRadius, 0.15, 16, 100);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.6 - i * 0.1,
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.position.y = 0.3 + i * 0.2;
                ring.rotation.x = Math.PI / 2;
                pillarGroup.add(ring);
            }

            // Energy beam with pulsing effect
            const beamGeo = new THREE.CylinderGeometry(0.2, 0.4, 10, 32);
            const beamMat = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3,
            });
            const beam = new THREE.Mesh(beamGeo, beamMat);
            beam.position.y = 5;
            pillarGroup.add(beam);

            // Data stream particles
            const particleCount = 120;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 5 + 3;
                const height = Math.random() * 10;
                positions[i] = Math.cos(angle) * radius;
                positions[i + 1] = height;
                positions[i + 2] = Math.sin(angle) * radius;
                
                colors[i] = 0;
                colors[i + 1] = 0.8 + Math.random() * 0.2;
                colors[i + 2] = 1;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.2,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            pillarGroup.add(particles);
            
            pillarGroup.position.set(x, y, z);
            scene.value.add(pillarGroup);

            stations.push({
                position: markRaw(new THREE.Vector3(x, y, z)),
                experience,
                year,
                group: markRaw(pillarGroup),
                base: markRaw(base),
                screen: markRaw(screen),
                frame: markRaw(frame),
                display: markRaw(display),
                beam: markRaw(beam),
                particles: markRaw(particles),
            });
        });
        
        experienceStations.value = stations;
    };

    const createProjectStations = () => {
        if (!projects || !projects.length) return;

        // Focus on featured projects for the journey
        const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
        if (featuredProjects.length === 0) {
            // If no featured, take first 4
            featuredProjects.push(...projects.slice(0, 4));
        }

        const stations = [];
        const radius = 40;
        const centerY = 70; // Lower from 80 to connect better with experiences spiral

        featuredProjects.forEach((project, index) => {
            const angle = (index / featuredProjects.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = centerY + (Math.sin(angle * 3) * 5); // Reduced variation from 8 to 5

            // Create showcase group
            const showcaseGroup = new THREE.Group();

            // Circular platform with holographic details
            const platformGeo = new THREE.CylinderGeometry(5, 5.5, 0.8, 32);
            const platformMat = new THREE.MeshStandardMaterial({
                color: 0x1a0033,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0x9333ea,
                emissiveIntensity: 0.4,
            });
            const platform = new THREE.Mesh(platformGeo, platformMat);
            platform.position.y = -5;
            platform.castShadow = true;
            showcaseGroup.add(platform);

            // Floating holographic cube with glass effect
            const cubeGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
            const cubeMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x4a0080,
                metalness: 0.7,
                roughness: 0.2,
                transparent: true,
                opacity: 0.6,
                transmission: 0.4,
                thickness: 0.5,
                emissive: 0x9333ea,
                emissiveIntensity: 0.3,
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.y = 0;
            showcaseGroup.add(cube);
            
            // Glowing wireframe edges
            const wireframeGeometry = new THREE.EdgesGeometry(cubeGeometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ 
                color: 0xc084fc,
                linewidth: 2 
            });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            wireframe.position.y = 0;
            showcaseGroup.add(wireframe);
            
            // Inner rotating wireframe cube
            const innerCubeGeo = new THREE.BoxGeometry(2.7, 2.7, 2.7);
            const innerCubeWire = new THREE.EdgesGeometry(innerCubeGeo);
            const innerCubeMat = new THREE.LineBasicMaterial({ 
                color: 0xa855f7,
                transparent: true,
                opacity: 0.6,
            });
            const innerCube = new THREE.LineSegments(innerCubeWire, innerCubeMat);
            innerCube.position.y = 0;
            showcaseGroup.add(innerCube);

            // Project title with gradient hologram
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            
            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 512, 0);
            gradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
            gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.6)');
            gradient.addColorStop(1, 'rgba(147, 51, 234, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 128);
            
            // Title with glow
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#c084fc';
            ctx.fillStyle = '#c084fc';
            ctx.font = 'bold 50px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const title = project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title;
            ctx.fillText(title, 256, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            const labelGeometry = new THREE.PlaneGeometry(8, 2);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.95,
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.set(x, 9, z);
            scene.value.add(label);

            // Multiple orbiting rings with varied angles
            const ring1Geometry = new THREE.TorusGeometry(6, 0.12, 16, 100);
            const ring1Material = new THREE.MeshBasicMaterial({
                color: 0xa855f7,
                transparent: true,
                opacity: 0.5,
            });
            const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
            ring1.position.set(x, 0.5, z);
            ring1.rotation.x = Math.PI / 2;
            scene.value.add(ring1);

            const ring2Geometry = new THREE.TorusGeometry(6.7, 0.12, 16, 100);
            const ring2Material = new THREE.MeshBasicMaterial({
                color: 0xa855f7,
                transparent: true,
                opacity: 0.4,
            });
            const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
            ring2.position.set(x, 0.5, z);
            ring2.rotation.x = Math.PI / 2 + 0.15;
            ring2.rotation.y = 0.3;
            scene.value.add(ring2);
            
            const ring3Geometry = new THREE.TorusGeometry(7.4, 0.12, 16, 100);
            const ring3Material = new THREE.MeshBasicMaterial({
                color: 0xa855f7,
                transparent: true,
                opacity: 0.3,
            });
            const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
            ring3.position.set(x, 0.5, z);
            ring3.rotation.x = Math.PI / 2 + 0.3;
            ring3.rotation.y = 0.6;
            scene.value.add(ring3);
            
            // Vertical energy pillars at corners
            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2;
                const pillarRadius = 5;
                const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 8, 8);
                const pillarMat = new THREE.MeshBasicMaterial({
                    color: 0x9333ea,
                    transparent: true,
                    opacity: 0.4,
                });
                const pillar = new THREE.Mesh(pillarGeo, pillarMat);
                pillar.position.set(
                    x + Math.cos(angle) * pillarRadius,
                    4.5,
                    z + Math.sin(angle) * pillarRadius
                );
                scene.value.add(pillar);
            }

            // Swirling particles with colors
            const particleCount = 150;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 7 + 2;
                const height = Math.random() * 10;
                positions[i] = x + Math.cos(angle) * radius;
                positions[i + 1] = height;
                positions[i + 2] = z + Math.sin(angle) * radius;
                
                colors[i] = 0.8 + Math.random() * 0.2;
                colors[i + 1] = 0.4 + Math.random() * 0.2;
                colors[i + 2] = 1;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.18,
                vertexColors: true,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.value.add(particles);

            stations.push({
                position: markRaw(new THREE.Vector3(x, 0, z)),
                project,
                platform: markRaw(platform),
                cube: markRaw(cube),
                wireframe: markRaw(wireframe),
                innerCube: markRaw(innerCube),
                label: markRaw(label),
                ring1: markRaw(ring1),
                ring2: markRaw(ring2),
                ring3: markRaw(ring3),
                particles: markRaw(particles),
            });
        });
        
        projectStations.value = stations;
    };

    const createEnvironment = () => {
        // Add floating holographic geometric shapes in the background
        const shapes = [
            { geometry: new THREE.OctahedronGeometry(3), count: 8 },
            { geometry: new THREE.IcosahedronGeometry(2.5), count: 8 },
            { geometry: new THREE.TetrahedronGeometry(3.5), count: 6 },
        ];

        shapes.forEach(({ geometry, count }) => {
            for (let i = 0; i < count; i++) {
                const material = new THREE.MeshStandardMaterial({
                    color: [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x9333ea][Math.floor(Math.random() * 4)],
                    emissive: [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x9333ea][Math.floor(Math.random() * 4)],
                    emissiveIntensity: 0.4,
                    transparent: true,
                    opacity: 0.2,
                    wireframe: Math.random() > 0.5,
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    Math.random() * 200 - 100,
                    Math.random() * 30 + 15,
                    Math.random() * 200 - 100
                );
                mesh.userData.rotationSpeed = {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.01,
                };
                mesh.userData.floatSpeed = Math.random() * 0.003 + 0.001;
                mesh.userData.floatOffset = Math.random() * Math.PI * 2;
                scene.value.add(mesh);
            }
        });

        // Add distant light beams
        for (let i = 0; i < 10; i++) {
            const beamGeometry = new THREE.CylinderGeometry(0.2, 0.3, 40, 32);
            const beamMaterial = new THREE.MeshBasicMaterial({
                color: [0x6366f1, 0x00ffff, 0x9333ea][i % 3],
                transparent: true,
                opacity: 0.15,
            });
            const beam = new THREE.Mesh(beamGeometry, beamMaterial);
            beam.position.set(
                Math.random() * 300 - 150,
                20,
                Math.random() * 300 - 150
            );
            beam.userData.pulseSpeed = Math.random() * 0.02 + 0.01;
            scene.value.add(beam);
        }
        
        // Create warp speed particle system for transitions
        createWarpParticles();
    };
    
    // Warp speed / galaxy particles
    const warpParticles = shallowRef(null);
    const isWarping = ref(false);
    
    const createWarpParticles = () => {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Random position in sphere around camera
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 100 + 50;
            const height = (Math.random() - 0.5) * 100;
            
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = height;
            positions[i + 2] = Math.sin(angle) * radius;
            
            // Velocity towards camera
            velocities[i] = 0;
            velocities[i + 1] = 0;
            velocities[i + 2] = 0;
            
            // Color gradient (cyan to purple)
            const colorMix = Math.random();
            colors[i] = colorMix * 0.6 + 0.4; // R
            colors[i + 1] = colorMix * 0.3 + 0.7; // G
            colors[i + 2] = 1; // B
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.value.add(particles);
        warpParticles.value = markRaw(particles);
    };
    
    const activateWarp = () => {
        isWarping.value = true;
        if (warpParticles.value) {
            gsap.to(warpParticles.value.material, {
                opacity: 0.8,
                duration: 0.5,
                ease: "power2.in"
            });
        }
    };
    
    const deactivateWarp = () => {
        isWarping.value = false;
        if (warpParticles.value) {
            gsap.to(warpParticles.value.material, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    };

    const initMusic = () => {
        console.log('=== Creating Audio Element ===');
        
        // Create and attach to DOM
        musicAudio = document.createElement('audio');
        musicAudio.id = 'background-music';
        musicAudio.src = '/audio/background-music.mp3';
        musicAudio.loop = true;
        musicAudio.volume = 0.5;
        musicAudio.preload = 'auto';
        
        // Attach to body so it persists
        document.body.appendChild(musicAudio);
        
        console.log('Audio element created and attached to DOM');
        console.log('Audio src:', musicAudio.src);
        
        musicAudio.addEventListener('loadeddata', () => {
            console.log('✅ Audio loaded! Duration:', musicAudio.duration, 'seconds');
        });
        
        musicAudio.addEventListener('canplaythrough', () => {
            console.log('✅ Can play through - ready!');
            // Try autoplay when ready
            attemptAutoplay();
        });
        
        musicAudio.addEventListener('playing', () => {
            console.log('🎵🎵🎵 EVENT: PLAYING! 🎵🎵🎵');
            isMusicPlaying.value = true;
        });
        
        // DON'T listen to pause events - they were causing issues
        
        musicAudio.addEventListener('error', (e) => {
            console.error('❌ Audio error:', musicAudio.error);
        });
        
        musicAudio.load();
        console.log('Audio loaded');
    };
    
    const attemptAutoplay = () => {
        if (!musicAudio || !musicAudio.paused) return;
        
        console.log('🎵 Attempting autoplay...');
        musicAudio.play()
            .then(() => {
                console.log('✅ Autoplay successful!');
                isMusicPlaying.value = true;
            })
            .catch(err => {
                console.log('⚠️ Autoplay blocked by browser (expected)');
                console.log('Music will start when journey begins or on first interaction...');
            });
    };

    const startJourney = () => {
        console.log('=== Starting Journey ===');
        
        showWelcome.value = false;
        isIntroComplete.value = true;
        isJourneyActive.value = true;
        journeyProgress.value = 0;
        
        // Try to play music
        if (musicAudio) {
            console.log('Attempting to play music...');
            musicAudio.play()
                .then(() => {
                    console.log('✅ Music playing!');
                    isMusicPlaying.value = true;
                })
                .catch(err => {
                    console.log('⚠️ Autoplay blocked. Click music button to play.');
                });
        }
        
        // Immediately start the skills tour (no delay)
        beginSkillsTour();
    };

    const beginSkillsTour = () => {
        if (!skillStations.value || skillStations.value.length === 0) {
            // Skip to experiences if no skills
            beginExperiencesTour();
            return;
        }

        journeyPhase.value = 'skills';
        console.log('=== Starting Skills Tour ===');
        
        // Activate warp effect during transition
        activateWarp();
        
        // Move camera to overview position
        gsap.to(camera.value.position, {
            x: 0,
            y: 40,
            z: 0,
            duration: 2.5,
            ease: "power2.inOut",
            onComplete: () => {
                deactivateWarp();
                setTimeout(() => {
                    visitNextSkillStation(0);
                }, 500);
            }
        });

        gsap.to(camera.value, {
            duration: 2.5,
            onUpdate: () => {
                camera.value.lookAt(0, 15, 0);
            }
        });
    };

    const visitNextSkillStation = (index) => {
        if (index >= skillStations.value.length) {
            // Skills tour complete, move to experiences
            setTimeout(() => {
                beginExperiencesTour();
            }, 1000);
            return;
        }

        const station = skillStations.value[index];
        currentSkillCategory.value = { category: station.category, skills: station.skills };
        
        // Calculate camera position - orbit around the skill crystal
        const orbitRadius = 12;
        const orbitAngle = (index / skillStations.value.length) * Math.PI * 2;
        const camX = station.position.x + Math.cos(orbitAngle) * orbitRadius;
        const camZ = station.position.z + Math.sin(orbitAngle) * orbitRadius;
        
        // Fly camera in smooth arc to this skill station
        gsap.to(camera.value.position, {
            x: camX,
            y: station.position.y + 5,
            z: camZ,
            duration: 2.5,
            ease: "power2.inOut",
        });

        gsap.to(camera.value, {
            duration: 2.5,
            onUpdate: () => {
                camera.value.lookAt(station.position.x, station.position.y, station.position.z);
            }
        });

        // Pulse the platform
        gsap.to(station.platform.scale, {
            x: 1.1,
            y: 1.1,
            z: 1.1,
            duration: 0.5,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut"
        });

        // Show skill details briefly (can be displayed in UI)
        showSkillsDetail.value = true;
        
        setTimeout(() => {
            showSkillsDetail.value = false;
            visitNextSkillStation(index + 1);
        }, 3000);
        
        journeyProgress.value = (index + 1) / (skillStations.value.length + experienceStations.value.length + projectStations.value.length) * 100;
    };

    const beginExperiencesTour = () => {
        if (!experienceStations.value || experienceStations.value.length === 0) {
            // Skip to projects if no experiences
            beginProjectsTour();
            return;
        }

        journeyPhase.value = 'experiences';
        console.log('=== Starting Experiences Tour ===');
        currentExperienceIndex.value = 0;
        
        // Activate warp for transition
        activateWarp();
        
        // Fly to bottom of spiral, looking up
        const firstStation = experienceStations.value[0];
        gsap.to(camera.value.position, {
            x: firstStation.position.x - 15,
            y: firstStation.position.y,
            z: firstStation.position.z + 15,
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
                deactivateWarp();
                setTimeout(() => {
                    visitNextExperience();
                }, 300);
            }
        });
        
        gsap.to(camera.value, {
            duration: 3,
            onUpdate: () => {
                camera.value.lookAt(0, 30, 0); // Look up the spiral
            }
        });
    };

    const visitNextExperience = () => {
        if (currentExperienceIndex.value >= experienceStations.value.length) {
            // Experiences complete, move to projects
            setTimeout(() => {
                beginProjectsTour();
            }, 1000);
            return;
        }

        const station = experienceStations.value[currentExperienceIndex.value];
        
        // Camera ascends in spiral following the experience towers
        const spiralOffset = 18;
        const offsetAngle = (currentExperienceIndex.value / experienceStations.value.length) * Math.PI * 4 + Math.PI / 2;
        const camX = station.position.x + Math.cos(offsetAngle) * spiralOffset;
        const camZ = station.position.z + Math.sin(offsetAngle) * spiralOffset;
        
        // Cinematic camera movement - spiral upward
        gsap.to(camera.value.position, {
            x: camX,
            y: station.position.y + 8,
            z: camZ,
            duration: 3,
            ease: "power2.inOut",
        });

        gsap.to(camera.value, {
            duration: 3,
            onUpdate: () => {
                camera.value.lookAt(station.position.x, station.position.y, station.position.z);
            },
            onComplete: () => {
                arrivedAtExperience(station);
            }
        });

        // Animate the beam growing
        gsap.to(station.beam.scale, {
            y: 1.5,
            duration: 1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut"
        });
        
        const skillCount = skillStations.value.length;
        const expIndex = currentExperienceIndex.value;
        journeyProgress.value = (skillCount + expIndex + 1) / (skillCount + experienceStations.value.length + projectStations.value.length) * 100;
    };

    const arrivedAtExperience = (station) => {
        // Pulse the screen
        gsap.to(station.screen.scale, {
            x: 1.15,
            y: 1.15,
            z: 1.15,
            duration: 0.4,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });

        // Show experience details
        setTimeout(() => {
            currentExperience.value = station.experience;
            showExperienceDetail.value = true;
        }, 800);

        // Auto-advance after viewing
        setTimeout(() => {
            showExperienceDetail.value = false;
            currentExperienceIndex.value++;
            
            setTimeout(() => {
                visitNextExperience();
            }, 800);
        }, 5000);
    };

    const beginProjectsTour = () => {
        if (!projectStations.value || projectStations.value.length === 0) {
            // Journey complete
            journeyFinale();
            return;
        }

        journeyPhase.value = 'projects';
        console.log('=== Starting Projects Tour ===');
        currentProjectIndex.value = 0;
        
        // Activate warp for dramatic ascent
        activateWarp();
        
        const firstProject = projectStations.value[0];
        
        // Transition from top of spiral to projects level
        gsap.to(camera.value.position, {
            x: firstProject.position.x - 15,
            y: firstProject.position.y + 15,
            z: firstProject.position.z + 15,
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
                deactivateWarp();
                setTimeout(() => {
                    visitNextProject();
                }, 300);
            }
        });
        
        gsap.to(camera.value, {
            duration: 3,
            onUpdate: () => {
                camera.value.lookAt(firstProject.position.x, firstProject.position.y, firstProject.position.z);
            }
        });
    };

    const visitNextProject = () => {
        if (currentProjectIndex.value >= projectStations.value.length) {
            // Projects complete, finale
            setTimeout(() => {
                journeyFinale();
            }, 1000);
            return;
        }

        const station = projectStations.value[currentProjectIndex.value];
        
        // Orbit around each project in the sky
        const orbitRadius = 20;
        const orbitAngle = (currentProjectIndex.value / projectStations.value.length) * Math.PI * 2 + Math.PI / 4;
        const camX = station.position.x + Math.cos(orbitAngle) * orbitRadius;
        const camZ = station.position.z + Math.sin(orbitAngle) * orbitRadius;
        
        // Cinematic approach to project
        gsap.to(camera.value.position, {
            x: camX,
            y: station.position.y + 5,
            z: camZ,
            duration: 3,
            ease: "power2.inOut",
        });

        gsap.to(camera.value, {
            duration: 3,
            onUpdate: () => {
                camera.value.lookAt(station.position.x, station.position.y, station.position.z);
            },
            onComplete: () => {
                arrivedAtProject(station);
            }
        });

        // Rotate the cube dramatically
        gsap.to(station.cube.rotation, {
            y: station.cube.rotation.y + Math.PI * 2,
            duration: 3,
            ease: "power2.inOut"
        });
        
        const skillCount = skillStations.value.length;
        const expCount = experienceStations.value.length;
        const projIndex = currentProjectIndex.value;
        journeyProgress.value = (skillCount + expCount + projIndex + 1) / (skillCount + expCount + projectStations.value.length) * 100;
    };

    const arrivedAtProject = (station) => {
        // Pulse the cube and inner cube
        gsap.to(station.cube.scale, {
            x: 1.15,
            y: 1.15,
            z: 1.15,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.4)"
        });
        
        if (station.innerCube) {
            gsap.to(station.innerCube.scale, {
                x: 1.3,
                y: 1.3,
                z: 1.3,
                duration: 0.6,
                yoyo: true,
                repeat: 1,
                ease: "elastic.out(1, 0.5)"
            });
        }

        // Show project details
        setTimeout(() => {
            currentProject.value = station.project;
            showProjectDetail.value = true;
        }, 800);

        // Auto-advance
        setTimeout(() => {
            showProjectDetail.value = false;
            currentProjectIndex.value++;
            
            setTimeout(() => {
                visitNextProject();
            }, 800);
        }, 5000);
    };

    const journeyFinale = () => {
        console.log('=== Journey Complete! ===');
        journeyPhase.value = 'finale';
        journeyProgress.value = 100;
        
        // Fly camera to grand overview
        gsap.to(camera.value.position, {
            x: 0,
            y: 50,
            z: 80,
            duration: 5,
            ease: "power2.inOut",
        });

        gsap.to(camera.value, {
            duration: 5,
            onUpdate: () => {
                camera.value.lookAt(0, 0, 20);
            }
        });

        setTimeout(() => {
            isJourneyActive.value = false;
            // Could show a "Journey Complete" message or CTA
        }, 6000);
    };

    const closeExperienceDetail = () => {
        showExperienceDetail.value = false;
    };

    const closeProjectDetail = () => {
        showProjectDetail.value = false;
    };

    const closeSkillsDetail = () => {
        showSkillsDetail.value = false;
    };

    const toggleMusic = () => {
        console.log('=== TOGGLE MUSIC CLICKED ===');
        
        if (!musicAudio) {
            console.log('No audio element, creating...');
            initMusic();
            setTimeout(() => {
                console.log('Retrying toggle after init...');
                toggleMusic();
            }, 1000);
            return;
        }

        console.log('Audio state before toggle:', {
            paused: musicAudio.paused,
            currentTime: musicAudio.currentTime,
            duration: musicAudio.duration,
            volume: musicAudio.volume,
            src: musicAudio.src
        });

        if (musicAudio.paused) {
            console.log('▶️ ATTEMPTING TO PLAY...');
            
            // Remove any existing event listeners that might interfere
            musicAudio.onpause = null;
            musicAudio.onsuspend = null;
            musicAudio.onstalled = null;
            
            // Set volume
            musicAudio.volume = 0.5;
            
            // PLAY
            const playPromise = musicAudio.play();
            
            console.log('play() called, promise:', playPromise);
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅✅✅ PLAY PROMISE RESOLVED! ✅✅✅');
                        console.log('Is paused?', musicAudio.paused);
                        console.log('Current time:', musicAudio.currentTime);
                        isMusicPlaying.value = true;
                        
                        // Check again after 2 seconds
                        setTimeout(() => {
                            console.log('=== 2 SECOND CHECK ===');
                            console.log('Still playing?', !musicAudio.paused);
                            console.log('Current time:', musicAudio.currentTime);
                            console.log('Duration:', musicAudio.duration);
                            
                            if (musicAudio.paused) {
                                console.error('❌ GOT PAUSED SOMEHOW! Trying again...');
                                musicAudio.play();
                            }
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('❌ PLAY PROMISE REJECTED:', err);
                        console.error('Error name:', err.name);
                        console.error('Error message:', err.message);
                        alert('Play failed: ' + err.message + '\n\nTry clicking again!');
                    });
            }
        } else {
            console.log('⏸️ PAUSING...');
            musicAudio.pause();
            isMusicPlaying.value = false;
        }
    };

    const clock = new THREE.Clock();
    
    const animate = () => {
        animationId.value = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = Date.now() * 0.001;

        // Animate warp particles smoothly
        if (warpParticles.value && isWarping.value) {
            const positions = warpParticles.value.geometry.attributes.position.array;
            const velocities = warpParticles.value.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Smooth acceleration
                velocities[i] *= 0.98;
                velocities[i + 1] *= 0.98;
                velocities[i + 2] += 0.3; // Gentle acceleration
                
                // Apply velocity
                positions[i] += velocities[i] * delta * 60;
                positions[i + 1] += velocities[i + 1] * delta * 60;
                positions[i + 2] += velocities[i + 2] * delta * 60;
                
                // Reset particles smoothly
                if (positions[i + 2] > 50) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.random() * 60 + 30;
                    positions[i] = Math.cos(angle) * radius;
                    positions[i + 1] = (Math.random() - 0.5) * 60;
                    positions[i + 2] = -80;
                    velocities[i] = (Math.random() - 0.5) * 0.2;
                    velocities[i + 1] = (Math.random() - 0.5) * 0.2;
                    velocities[i + 2] = 0;
                }
            }
            
            warpParticles.value.geometry.attributes.position.needsUpdate = true;
        }

        // Animate environment objects
        scene.value.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
                if (child.userData.rotationSpeed.z) {
                    child.rotation.z += child.userData.rotationSpeed.z;
                }
            }
            
            if (child.userData.floatSpeed) {
                child.position.y += Math.sin(time * child.userData.floatSpeed + child.userData.floatOffset) * 0.02;
            }
            
            if (child.userData.pulseSpeed) {
                child.material.opacity = 0.1 + Math.sin(time * child.userData.pulseSpeed) * 0.1;
            }
        });

        // Animate skill stations
        skillStations.value.forEach(station => {
            if (station.crystal) {
                station.crystal.rotation.y += 0.008;
                station.crystal.position.y = 5 + Math.sin(time * 1.3) * 0.3;
            }
            if (station.wireframe) {
                station.wireframe.rotation.y += 0.008;
                station.wireframe.position.y = 5 + Math.sin(time * 1.3) * 0.3;
            }
            if (station.particles) {
                station.particles.rotation.y = time * 0.3;
            }
            if (station.platform) {
                station.platform.rotation.z += 0.003;
            }
            if (station.label) {
                station.label.position.y = 8 + Math.sin(time * 1.5 + 0.5) * 0.2;
            }
        });

        // Animate experience stations
        experienceStations.value.forEach(station => {
            if (station.particles) {
                station.particles.rotation.y = time * 0.4;
            }
            if (station.screen) {
                station.screen.position.y = 6 + Math.sin(time * 1.5) * 0.2;
            }
            if (station.frame) {
                station.frame.position.y = 6 + Math.sin(time * 1.5) * 0.2;
            }
            if (station.display) {
                station.display.position.y = 6 + Math.sin(time * 1.5) * 0.2;
            }
            if (station.beam) {
                station.beam.material.opacity = 0.3 + Math.sin(time * 3) * 0.15;
            }
        });

        // Animate project stations - cube rotation relative to group position
        projectStations.value.forEach(station => {
            if (station.particles) {
                station.particles.rotation.y = time * 0.5;
            }
            if (station.cube) {
                station.cube.rotation.y += 0.01;
                station.cube.position.y = Math.sin(time * 1.2) * 0.3;
            }
            if (station.wireframe) {
                station.wireframe.rotation.y += 0.01;
                station.wireframe.position.y = Math.sin(time * 1.2) * 0.3;
            }
            if (station.innerCube) {
                station.innerCube.rotation.x += 0.015;
                station.innerCube.rotation.y -= 0.012;
                station.innerCube.position.y = Math.sin(time * 1.2) * 0.3;
            }
            if (station.ring1) {
                station.ring1.rotation.z = time * 0.7;
                station.ring1.material.opacity = 0.5 + Math.sin(time * 2.5) * 0.2;
            }
            if (station.ring2) {
                station.ring2.rotation.z = -time * 0.5;
                station.ring2.material.opacity = 0.4 + Math.sin(time * 2 + 1) * 0.2;
            }
            if (station.ring3) {
                station.ring3.rotation.z = time * 0.3;
                station.ring3.material.opacity = 0.3 + Math.sin(time * 1.8 + 2) * 0.15;
            }
            if (station.platform) {
                station.platform.rotation.y += 0.003;
            }
        });

        if (renderer.value && scene.value && camera.value) {
            renderer.value.render(scene.value, camera.value);
        }
    };

    const handleResize = () => {
        if (camera.value && renderer.value) {
            camera.value.aspect = window.innerWidth / window.innerHeight;
            camera.value.updateProjectionMatrix();
            renderer.value.setSize(window.innerWidth, window.innerHeight);
        }
    };

    const cleanup = () => {
        if (animationId.value) {
            cancelAnimationFrame(animationId.value);
        }
        if (musicAudio) {
            try {
                musicAudio.pause();
                if (musicAudio.parentElement) {
                    document.body.removeChild(musicAudio);
                }
            } catch (e) {
                console.log('Cleanup audio error:', e);
            }
            musicAudio = null;
        }
        if (renderer.value) {
            renderer.value.dispose();
        }
        if (scene.value) {
            scene.value.clear();
        }
        window.removeEventListener('resize', handleResize);
    };

    onMounted(() => {
        initScene();
        initMusic();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        cleanup();
    });

    return {
        showWelcome,
        welcomeMessage,
        welcomeSubtext,
        welcomeInstructions,
        startJourney,
        showExperienceDetail,
        showProjectDetail,
        showSkillsDetail,
        currentExperience,
        currentProject,
        currentSkillCategory,
        closeExperienceDetail,
        closeProjectDetail,
        closeSkillsDetail,
        toggleMusic,
        isMusicPlaying,
        currentExperienceIndex,
        currentProjectIndex,
        isJourneyActive,
        journeyPhase,
        journeyProgress,
    };
}
