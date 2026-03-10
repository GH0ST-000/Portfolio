import { ref, onMounted, onUnmounted, markRaw, shallowRef } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';

export function use3DWalkableWorld(canvasRef, projects, experiences) {
    // Use shallowRef for Three.js objects to avoid deep reactivity
    const renderer = shallowRef(null);
    const scene = shallowRef(null);
    const camera = shallowRef(null);
    const animationId = ref(null);
    
    // Character and movement - use shallowRef
    const character = shallowRef(null);
    const characterMixer = shallowRef(null);
    const characterSize = ref(0.5); // Start small
    const visitedStations = ref(0);
    
    // Background music - NOT reactive, plain JavaScript
    let backgroundMusicAudio = null;
    const isMusicPlaying = ref(false);
    
    // Auto-tour state
    const isAutoTourActive = ref(false);
    const autoTourCurrentIndex = ref(0);
    const autoTourPaused = ref(false);
    let autoTourTimeoutId = null;
    let lastUserInteractionTime = Date.now();
    const AUTO_TOUR_IDLE_DELAY = 5000; // Start tour after 5 seconds of no input
    
    // Store displays separately (since stations are plain objects, not THREE objects)
    const stationDisplays = new Map();
    
    // Non-reactive Three.js objects
    let velocity = new THREE.Vector3();
    let direction = new THREE.Vector3();
    
    // Controls
    const keys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };
    
    // Project stations - use shallowRef
    const projectStations = shallowRef([]);
    const experienceStations = shallowRef([]);
    const currentStation = ref(null);
    const showProjectDetail = ref(false);
    const showExperienceDetail = ref(false);
    const currentProject = ref(null);
    const currentExperience = ref(null);
    
    const initScene = () => {
        if (!canvasRef.value) return;

        // Scene setup - use markRaw to prevent reactivity
        scene.value = markRaw(new THREE.Scene());
        scene.value.background = new THREE.Color(0x0a0a1a);
        scene.value.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

        // Camera
        camera.value = markRaw(new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        ));
        camera.value.position.set(0, 5, 10);

        // Renderer
        renderer.value = markRaw(new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            antialias: true,
        }));
        renderer.value.setSize(window.innerWidth, window.innerHeight);
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.value.shadowMap.enabled = true;
        renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.4);
        scene.value.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.value.add(directionalLight);

        // Add point lights for atmosphere
        const pointLight1 = new THREE.PointLight(0x6366f1, 1, 50);
        pointLight1.position.set(-10, 5, -10);
        scene.value.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 50);
        pointLight2.position.set(10, 5, 10);
        scene.value.add(pointLight2);

        // Create ground
        createGround();

        // Create character
        createCharacter();

        // Create project stations
        createProjectStations();
        
        // Create experience stations
        createExperienceStations();

        // Create environment
        createEnvironment();

        // Start animation
        animate();
    };

    const createGround = () => {
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.8,
            metalness: 0.2,
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        
        // Add grid pattern
        const gridHelper = new THREE.GridHelper(100, 50, 0x6366f1, 0x2a2a3e);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        
        scene.value.add(ground);
        scene.value.add(gridHelper);
    };

    const createCharacter = () => {
        // Create a more human-like character
        const characterGroup = new THREE.Group();

        // Body (torso)
        const bodyGeometry = new THREE.CapsuleGeometry(0.4, 0.8, 8, 16);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            emissive: 0x6366f1,
            emissiveIntensity: 0.2,
            roughness: 0.3,
            metalness: 0.7,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1.3;
        body.castShadow = true;
        characterGroup.add(body);

        // Head (sphere for more human-like)
        const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.3,
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.3;
        head.castShadow = true;
        characterGroup.add(head);

        // Eyes (glowing)
        const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 2.35, 0.3);
        characterGroup.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 2.35, 0.3);
        characterGroup.add(rightEye);

        // Arms (capsules for smoother look)
        const armGeometry = new THREE.CapsuleGeometry(0.12, 0.8, 8, 16);
        const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
        leftArm.position.set(-0.5, 1.3, 0);
        leftArm.castShadow = true;
        characterGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
        rightArm.position.set(0.5, 1.3, 0);
        rightArm.castShadow = true;
        characterGroup.add(rightArm);

        // Legs (capsules for smoother look)
        const legGeometry = new THREE.CapsuleGeometry(0.15, 0.9, 8, 16);
        const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        leftLeg.position.set(-0.2, 0.5, 0);
        leftLeg.castShadow = true;
        characterGroup.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        rightLeg.position.set(0.2, 0.5, 0);
        rightLeg.castShadow = true;
        characterGroup.add(rightLeg);

        // Store references for animation
        characterGroup.userData = {
            leftArm,
            rightArm,
            leftLeg,
            rightLeg,
            walkCycle: 0,
        };

        // Start with small size
        characterGroup.scale.set(characterSize.value, characterSize.value, characterSize.value);
        characterGroup.position.set(0, 0, 0);
        character.value = markRaw(characterGroup);
        scene.value.add(characterGroup);
    };

    const createProjectStations = () => {
        if (!projects || !projects.length) return;

        const radius = 20;
        const angleStep = (Math.PI * 2) / projects.length;
        const stations = [];

        projects.forEach((project, index) => {
            const angle = angleStep * index;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // Create station platform
            const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.3, 32);
            const platformMaterial = new THREE.MeshStandardMaterial({
                color: project.featured ? 0xffd700 : 0x6366f1,
                emissive: project.featured ? 0xffd700 : 0x6366f1,
                emissiveIntensity: 0.3,
                roughness: 0.3,
                metalness: 0.7,
            });
            const platform = new THREE.Mesh(platformGeometry, platformMaterial);
            platform.position.set(x, 0.15, z);
            platform.castShadow = true;
            platform.receiveShadow = true;
            scene.value.add(platform);

            // Create holographic display
            const displayGeometry = new THREE.PlaneGeometry(4, 3);
            const displayMaterial = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide,
            });
            const display = new THREE.Mesh(displayGeometry, displayMaterial);
            display.position.set(x, 2.5, z);
            display.lookAt(0, 2.5, 0);
            scene.value.add(display);

            // Add glowing particles around station
            const particleCount = 50;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 3 + 2;
                positions[i] = x + Math.cos(angle) * radius;
                positions[i + 1] = Math.random() * 4;
                positions[i + 2] = z + Math.sin(angle) * radius;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: project.featured ? 0xffd700 : 0x8b5cf6,
                size: 0.1,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.value.add(particles);

            stations.push({
                position: markRaw(new THREE.Vector3(x, 0, z)),
                project,
                platform: markRaw(platform),
                display: markRaw(display),
                particles: markRaw(particles),
            });
        });
        
        projectStations.value = stations;
    };

    const createExperienceStations = () => {
        if (!experiences || !experiences.length) return;

        // Create a story path - chronological order from oldest to newest
        // Start position
        const startX = -30;
        const startZ = 0;
        const spacing = 12; // Distance between stations
        const stations = [];
        
        // Sort experiences by start_date (oldest first for story progression)
        const sortedExperiences = [...experiences].sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });

        sortedExperiences.forEach((experience, index) => {
            // Create a path that goes forward (alternating slightly for visual interest)
            const x = startX + (index * spacing);
            const z = startZ + (index % 2 === 0 ? 3 : -3); // Zigzag pattern

            // Create hexagonal pedestal base
            const baseGeometry = new THREE.CylinderGeometry(2.5, 3, 0.5, 6);
            const baseMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a3e,
                emissive: 0x1a1a3e,
                emissiveIntensity: 0.2,
                roughness: 0.3,
                metalness: 0.8,
            });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.position.set(x, 0.25, z);
            base.castShadow = true;
            base.receiveShadow = true;
            scene.value.add(base);

            // Create cylindrical pedestal
            const pedestalGeometry = new THREE.CylinderGeometry(2, 2.2, 1.5, 6);
            const pedestalMaterial = new THREE.MeshStandardMaterial({
                color: 0x00d4ff,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.4,
                roughness: 0.3,
                metalness: 0.8,
            });
            const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
            pedestal.position.set(x, 1.25, z);
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            scene.value.add(pedestal);

            // Create floating holographic display
            const displayGeometry = new THREE.RingGeometry(1.5, 2, 32);
            const displayMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide,
            });
            const display = new THREE.Mesh(displayGeometry, displayMaterial);
            display.position.set(x, 2.5, z);
            display.rotation.x = Math.PI / 2;
            scene.value.add(display);

            // Add order indicator (number)
            const orderText = index + 1;
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00ffff';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(orderText.toString(), 64, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            const labelGeometry = new THREE.PlaneGeometry(1, 1);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.set(x, 2.5, z + 0.1);
            label.lookAt(0, 2.5, z);
            scene.value.add(label);

            // Add glowing ring around station
            const ringGeometry = new THREE.TorusGeometry(2.8, 0.12, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.6,
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(x, 0.1, z);
            ring.rotation.x = Math.PI / 2;
            scene.value.add(ring);

            // Add particles
            const particleCount = 40;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 2.5 + 1.5;
                positions[i] = x + Math.cos(angle) * radius;
                positions[i + 1] = Math.random() * 4 + 0.5;
                positions[i + 2] = z + Math.sin(angle) * radius;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x00ffff,
                size: 0.15,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.value.add(particles);

            // Add a connecting path to next station
            if (index < sortedExperiences.length - 1) {
                const nextX = startX + ((index + 1) * spacing);
                const nextZ = startZ + ((index + 1) % 2 === 0 ? 3 : -3);
                
                const pathGeometry = new THREE.PlaneGeometry(
                    Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextZ - z, 2)),
                    0.5
                );
                const pathMaterial = new THREE.MeshBasicMaterial({
                    color: 0x6366f1,
                    transparent: true,
                    opacity: 0.3,
                });
                const path = new THREE.Mesh(pathGeometry, pathMaterial);
                path.rotation.x = -Math.PI / 2;
                const midX = (x + nextX) / 2;
                const midZ = (z + nextZ) / 2;
                path.position.set(midX, 0.05, midZ);
                const angle = Math.atan2(nextZ - z, nextX - x);
                path.rotation.z = -angle;
                scene.value.add(path);
            }

            stations.push({
                position: markRaw(new THREE.Vector3(x, 0, z)),
                experience,
                order: index,
                visited: false,
                pedestal: markRaw(pedestal),
                display: markRaw(display),
                ring: markRaw(ring),
                particles: markRaw(particles),
            });
        });
        
        experienceStations.value = stations;
    };

    const createEnvironment = () => {
        // Add floating geometric shapes
        const shapes = [
            new THREE.TorusGeometry(2, 0.4, 16, 100),
            new THREE.IcosahedronGeometry(1.5, 0),
            new THREE.OctahedronGeometry(2, 0),
        ];

        shapes.forEach((geometry, i) => {
            const material = new THREE.MeshPhongMaterial({
                color: 0x6366f1,
                wireframe: true,
                transparent: true,
                opacity: 0.3,
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 60,
                5 + Math.random() * 5,
                (Math.random() - 0.5) * 60
            );
            mesh.userData = {
                rotationSpeed: {
                    x: Math.random() * 0.01,
                    y: Math.random() * 0.01,
                },
            };
            scene.value.add(mesh);
        });
    };

    const handleKeyDown = (event) => {
        // User is interacting, stop auto-tour
        lastUserInteractionTime = Date.now();
        if (isAutoTourActive.value) {
            stopAutoTour();
        }
        
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                keys.forward = true;
                break;
            case 's':
            case 'arrowdown':
                keys.backward = true;
                break;
            case 'a':
            case 'arrowleft':
                keys.left = true;
                break;
            case 'd':
            case 'arrowright':
                keys.right = true;
                break;
            case 'e':
            case 'enter':
                checkProjectInteraction();
                break;
        }
    };

    const handleKeyUp = (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                keys.forward = false;
                break;
            case 's':
            case 'arrowdown':
                keys.backward = false;
                break;
            case 'a':
            case 'arrowleft':
                keys.left = false;
                break;
            case 'd':
            case 'arrowright':
                keys.right = false;
                break;
        }
    };

    const updateCharacter = (delta) => {
        if (!character.value) return;

        const speed = 5;
        const rotationSpeed = 3;
        
        direction.set(0, 0, 0);

        // Calculate movement direction
        if (keys.forward) direction.z = -1;
        if (keys.backward) direction.z = 1;
        if (keys.left) character.value.rotation.y += rotationSpeed * delta;
        if (keys.right) character.value.rotation.y -= rotationSpeed * delta;

        // Apply movement
        if (direction.length() > 0) {
            direction.normalize();
            
            // Move in the direction the character is facing
            const moveX = -Math.sin(character.value.rotation.y) * direction.z * speed * delta;
            const moveZ = -Math.cos(character.value.rotation.y) * direction.z * speed * delta;
            
            character.value.position.x += moveX;
            character.value.position.z += moveZ;

            // Walking animation
            const userData = character.value.userData;
            userData.walkCycle += delta * 10;
            
            const swing = Math.sin(userData.walkCycle) * 0.3;
            userData.leftArm.rotation.x = swing;
            userData.rightArm.rotation.x = -swing;
            userData.leftLeg.rotation.x = -swing;
            userData.rightLeg.rotation.x = swing;
        } else {
            // Reset limbs when not moving
            const userData = character.value.userData;
            userData.leftArm.rotation.x *= 0.9;
            userData.rightArm.rotation.x *= 0.9;
            userData.leftLeg.rotation.x *= 0.9;
            userData.rightLeg.rotation.x *= 0.9;
        }

        // Keep character within bounds
        const maxDistance = 45;
        const distanceFromCenter = Math.sqrt(
            character.value.position.x ** 2 + character.value.position.z ** 2
        );
        if (distanceFromCenter > maxDistance) {
            const angle = Math.atan2(character.value.position.z, character.value.position.x);
            character.value.position.x = Math.cos(angle) * maxDistance;
            character.value.position.z = Math.sin(angle) * maxDistance;
        }

        // Update camera to follow character
        const cameraOffset = new THREE.Vector3(0, 5, 10);
        cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), character.value.rotation.y);
        camera.value.position.x = character.value.position.x + cameraOffset.x;
        camera.value.position.y = character.value.position.y + cameraOffset.y;
        camera.value.position.z = character.value.position.z + cameraOffset.z;
        camera.value.lookAt(character.value.position);

        // Check proximity to project stations
        checkStationProximity();
    };

    const checkStationProximity = () => {
        if (!character.value) return;

        const interactionDistance = 5;
        let nearestStation = null;
        let minDistance = Infinity;
        let stationType = null;

        // Check project stations
        projectStations.value.forEach(station => {
            const distance = character.value.position.distanceTo(station.position);
            if (distance < interactionDistance && distance < minDistance) {
                minDistance = distance;
                nearestStation = station;
                stationType = 'project';
            }
        });

        // Check experience stations
        experienceStations.value.forEach(station => {
            const distance = character.value.position.distanceTo(station.position);
            if (distance < interactionDistance && distance < minDistance) {
                minDistance = distance;
                nearestStation = station;
                stationType = 'experience';
            }
        });

        currentStation.value = nearestStation ? { ...nearestStation, type: stationType } : null;
    };

    const checkProjectInteraction = () => {
        if (currentStation.value) {
            if (currentStation.value.type === 'project') {
                currentProject.value = currentStation.value.project;
                showProjectDetail.value = true;
            } else if (currentStation.value.type === 'experience') {
                // Mark station as visited
                if (!currentStation.value.visited) {
                    currentStation.value.visited = true;
                    visitedStations.value++;
                    
                    // Grow character size based on progress
                    const totalStations = experienceStations.value.length;
                    const progress = visitedStations.value / totalStations;
                    const newSize = 0.5 + (progress * 1.5); // Grow from 0.5 to 2.0
                    characterSize.value = newSize;
                    
                    // Animate character growth
                    if (character.value) {
                        gsap.to(character.value.scale, {
                            x: newSize,
                            y: newSize,
                            z: newSize,
                            duration: 1.5,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                    
                    // Change station color to visited
                    if (currentStation.value.ring) {
                        currentStation.value.ring.material.color.setHex(0x00ff00);
                    }
                }
                
                currentExperience.value = currentStation.value.experience;
                showExperienceDetail.value = true;
            }
        }
    };

    const closeProjectDetail = () => {
        showProjectDetail.value = false;
        currentProject.value = null;
    };

    const closeExperienceDetail = () => {
        showExperienceDetail.value = false;
        currentExperience.value = null;
    };

    // Auto-tour functions
    const startAutoTour = () => {
        if (isAutoTourActive.value || !experienceStations.value.length) return;
        
        console.log('🚀 Starting auto-tour...');
        isAutoTourActive.value = true;
        autoTourCurrentIndex.value = 0;
        moveToNextStation();
    };
    
    const stopAutoTour = () => {
        console.log('⏹️ Stopping auto-tour...');
        isAutoTourActive.value = false;
        autoTourPaused.value = false;
        if (autoTourTimeoutId) {
            clearTimeout(autoTourTimeoutId);
            autoTourTimeoutId = null;
        }
    };
    
    const moveToNextStation = () => {
        if (!isAutoTourActive.value || !character.value || !experienceStations.value.length) return;
        
        const station = experienceStations.value[autoTourCurrentIndex.value];
        if (!station) {
            // Tour complete - go back to start
            console.log('✅ Auto-tour complete! Returning to start...');
            moveToStart();
            return;
        }
        
        console.log(`🎯 Moving to station ${autoTourCurrentIndex.value + 1}/${experienceStations.value.length}`);
        
        // Create preview display BEFORE character arrives
        const previewDisplay = createPreviewDisplay(station);
        stationDisplays.set(`station_${autoTourCurrentIndex.value}_preview`, previewDisplay);
        
        // Calculate direction to station
        const targetPos = station.position;
        const currentPos = character.value.position;
        
        // Animate character to station
        const distance = currentPos.distanceTo(targetPos);
        const duration = Math.max(3, distance / 4); // Slower for cinematic effect
        
        // Face the target
        const angle = Math.atan2(
            targetPos.x - currentPos.x,
            targetPos.z - currentPos.z
        );
        
        gsap.to(character.value.rotation, {
            y: -angle,
            duration: 0.5,
            ease: "power2.inOut"
        });
        
        // Cinematic camera orbit animation
        const cameraOrbitData = {
            angle: 0,
            radius: 12,
            height: 8
        };
        
        // Animate camera orbiting around the character's path
        gsap.to(cameraOrbitData, {
            angle: Math.PI * 2, // Full rotation
            duration: duration,
            ease: "none",
            onUpdate: () => {
                if (camera.value && character.value) {
                    // Calculate camera position in orbit
                    const camX = character.value.position.x + Math.cos(cameraOrbitData.angle) * cameraOrbitData.radius;
                    const camZ = character.value.position.z + Math.sin(cameraOrbitData.angle) * cameraOrbitData.radius;
                    const camY = character.value.position.y + cameraOrbitData.height;
                    
                    camera.value.position.set(camX, camY, camZ);
                    camera.value.lookAt(character.value.position.x, character.value.position.y + 1, character.value.position.z);
                }
            }
        });
        
        // Move to target with walking animation
        const walkAnimation = gsap.to(character.value.position, {
            x: targetPos.x,
            z: targetPos.z,
            duration: duration,
            ease: "power1.inOut",
            onUpdate: () => {
                // Animate walking
                if (character.value && character.value.userData) {
                    const userData = character.value.userData;
                    userData.walkCycle += 0.3;
                    const swing = Math.sin(userData.walkCycle) * 0.3;
                    userData.leftArm.rotation.x = swing;
                    userData.rightArm.rotation.x = -swing;
                    userData.leftLeg.rotation.x = -swing;
                    userData.rightLeg.rotation.x = swing;
                }
            },
            onComplete: () => {
                // Reset limbs
                if (character.value && character.value.userData) {
                    const userData = character.value.userData;
                    gsap.to([userData.leftArm.rotation, userData.rightArm.rotation, 
                             userData.leftLeg.rotation, userData.rightLeg.rotation], {
                        x: 0,
                        duration: 0.5
                    });
                }
                
                // Smooth transition back to follow camera
                if (camera.value && character.value) {
                    const cameraOffset = new THREE.Vector3(0, 5, 10);
                    cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), character.value.rotation.y);
                    
                    gsap.to(camera.value.position, {
                        x: character.value.position.x + cameraOffset.x,
                        y: character.value.position.y + cameraOffset.y,
                        z: character.value.position.z + cameraOffset.z,
                        duration: 1,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (camera.value && character.value) {
                                camera.value.lookAt(character.value.position);
                            }
                        },
                        onComplete: () => {
                            // Auto-interact with station
                            if (isAutoTourActive.value) {
                                autoInteractWithStation(station);
                            }
                        }
                    });
                } else {
                    // Auto-interact with station
                    if (isAutoTourActive.value) {
                        autoInteractWithStation(station);
                    }
                }
            }
        });
    };
    
    const createPreviewDisplay = (station) => {
        const experience = station.experience;
        const position = station.position;
        
        // Format date
        const formatDate = (dateString) => {
            if (!dateString) return 'Present';
            const cleanDate = dateString.split(' ')[0];
            try {
                const date = new Date(cleanDate);
                const year = date.getFullYear();
                const month = date.toLocaleDateString('en-US', { month: 'short' });
                return `${month} ${year}`;
            } catch {
                return cleanDate;
            }
        };
        
        // Create preview group
        const previewGroup = new THREE.Group();
        previewGroup.position.set(position.x, 5, position.z);
        
        // Create single cycling card
        const createCyclingCard = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1024;
            canvas.height = 256;
            
            const drawText = (text, color) => {
                // Clear
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Background
                ctx.fillStyle = color.bg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Border
                ctx.strokeStyle = color.border;
                ctx.lineWidth = 8;
                ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
                
                // Text
                ctx.fillStyle = color.text;
                ctx.font = 'bold 80px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            };
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({ 
                map: texture, 
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0
            });
            const geometry = new THREE.PlaneGeometry(8, 2);
            const mesh = new THREE.Mesh(geometry, material);
            
            // Cycle through: Company → Position → Dates
            const states = [
                {
                    text: experience.company || 'Company',
                    color: { bg: '#001a33', border: '#00ffff', text: '#00ffff' }
                },
                {
                    text: experience.position || experience.role || 'Position',
                    color: { bg: '#1a0033', border: '#ffffff', text: '#ffffff' }
                },
                {
                    text: `${formatDate(experience.start_date)} → ${formatDate(experience.end_date || null)}`,
                    color: { bg: '#1a001a', border: '#a78bfa', text: '#a78bfa' }
                }
            ];
            
            let currentState = 0;
            
            // Function to show next state
            const showNextState = () => {
                // Fade out
                gsap.to(material, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        // Change text
                        currentState = (currentState + 1) % states.length;
                        drawText(states[currentState].text, states[currentState].color);
                        texture.needsUpdate = true;
                        
                        // Fade in
                        gsap.to(material, {
                            opacity: 1,
                            duration: 0.3
                        });
                    }
                });
            };
            
            // Initial draw
            drawText(states[0].text, states[0].color);
            
            // Start cycling
            gsap.to(material, {
                opacity: 1,
                duration: 0.6,
                onComplete: () => {
                    // Cycle every 2 seconds
                    setInterval(showNextState, 2000);
                }
            });
            
            return mesh;
        };
        
        const cyclingCard = createCyclingCard();
        previewGroup.add(cyclingCard);
        
        scene.value.add(previewGroup);
        
        // Make card face camera
        const rotateInterval = setInterval(() => {
            if (camera.value && previewGroup.parent) {
                cyclingCard.lookAt(camera.value.position);
            }
        }, 50);
        
        previewGroup.userData = { rotationInterval: rotateInterval };
        
        return previewGroup;
    };
    
    const createFullDetailsDisplay = (station) => {
        const experience = station.experience;
        const position = station.position;
        
        // Parse achievements
        const parseAchievements = (html) => {
            if (!html) return [];
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const listItems = doc.querySelectorAll('li');
            return Array.from(listItems).map(li => li.textContent.trim()).filter(text => text);
        };
        
        const achievements = parseAchievements(experience.achievements || experience.description);
        
        // Create details group
        const detailsGroup = new THREE.Group();
        detailsGroup.position.set(position.x, 2, position.z); // Higher and closer
        
        // Function to create animated scrolling holocard
        const createHoloCard = (title, items, color, xOffset, yOffset) => {
            // Create all items text (not just first 4)
            const allItems = items.map(item => item.substring(0, 80)).slice(0, 8); // Max 8 items
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;
            
            // Animation state
            let scrollOffset = 0;
            const scrollSpeed = 30; // Slower for readability
            const maxScroll = Math.max(0, allItems.length * 70 - 380); // Content height - visible area
            
            const drawCard = (offset) => {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Background
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Glowing border
                ctx.strokeStyle = `rgb(${color.r + 50}, ${color.g + 50}, ${color.b + 50})`;
                ctx.lineWidth = 10;
                ctx.shadowColor = `rgb(${color.r + 50}, ${color.g + 50}, ${color.b + 50})`;
                ctx.shadowBlur = 20;
                ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
                
                // Title (static)
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 70px Arial'; // Bigger title
                ctx.textAlign = 'center';
                ctx.fillText(title, canvas.width / 2, 80);
                
                // Line under title
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(50, 100);
                ctx.lineTo(canvas.width - 50, 100);
                ctx.stroke();
                
                // Create clipping region for scrollable content
                ctx.save();
                ctx.beginPath();
                ctx.rect(30, 110, canvas.width - 60, 470);
                ctx.clip();
                
                // Items (scrollable)
                ctx.font = '48px Arial'; // Bigger font
                ctx.textAlign = 'left';
                ctx.shadowBlur = 10;
                let yPos = 170 - offset; // Adjusted for bigger title
                
                allItems.forEach((item, i) => {
                    ctx.fillStyle = '#ffffff';
                    
                    // Bullet
                    ctx.fillText('●', 40, yPos);
                    
                    // Text with wrapping
                    const maxWidth = canvas.width - 150;
                    const words = item.split(' ');
                    let line = '';
                    
                    for (let word of words) {
                        const testLine = line + word + ' ';
                        const metrics = ctx.measureText(testLine);
                        
                        if (metrics.width > maxWidth && line !== '') {
                            ctx.fillText(line, 90, yPos);
                            line = word + ' ';
                            yPos += 60; // Adjusted spacing between items // Adjusted spacing
                        } else {
                            line = testLine;
                        }
                    }
                    if (line) {
                        ctx.fillText(line, 90, yPos);
                    }
                    yPos += 70;
                });
                
                ctx.restore();
            };
            
            // Initial draw
            drawCard(0);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({ 
                map: texture, 
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0
            });
            const geometry = new THREE.PlaneGeometry(5.5, 4.5); // Bigger and taller
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = xOffset;
            mesh.position.y = yOffset;
            
            // Auto-scroll animation if content is longer than visible area
            if (maxScroll > 0) {
                const scrollDuration = (maxScroll / scrollSpeed) * 1000; // Convert to ms
                
                // Start scrolling after 1 second delay
                setTimeout(() => {
                    gsap.to({ value: 0 }, {
                        value: maxScroll,
                        duration: scrollDuration / 1000,
                        ease: "none",
                        repeat: -1,
                        yoyo: true,
                        repeatDelay: 1,
                        onUpdate: function() {
                            scrollOffset = this.targets()[0].value;
                            drawCard(scrollOffset);
                            texture.needsUpdate = true;
                        }
                    });
                }, 1000);
            }
            
            return mesh;
        };
        
        // Split achievements into two groups
        const leftAchievements = achievements.slice(0, 4);
        const rightAchievements = achievements.slice(4, 8);
        
        // Left card - Achievements (Bottom Left)
        if (leftAchievements.length > 0) {
            const leftCard = createHoloCard(
                'KEY ACHIEVEMENTS',
                leftAchievements,
                { r: 20, g: 80, b: 20 }, // Dark green
                -5.5, // Closer to center
                0.5   // Slightly higher
            );
            detailsGroup.add(leftCard);
            
            // Face camera
            leftCard.lookAt(camera.value.position);
            
            // Animate in
            gsap.to(leftCard.material, {
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });
            
            // Scale in
            leftCard.scale.set(0, 0, 0);
            gsap.to(leftCard.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "back.out(1.5)"
            });
        }
        
        // Right card - More achievements or tech details (Bottom Right)
        if (rightAchievements.length > 0) {
            const rightCard = createHoloCard(
                'IMPACT & RESULTS',
                rightAchievements,
                { r: 20, g: 20, b: 80 }, // Dark blue
                5.5,  // Closer to center
                0.5   // Slightly higher
            );
            detailsGroup.add(rightCard);
            
            // Face camera
            rightCard.lookAt(camera.value.position);
            
            // Animate in
            gsap.to(rightCard.material, {
                opacity: 1,
                duration: 0.8,
                delay: 0.4,
                ease: "power2.out"
            });
            
            // Scale in
            rightCard.scale.set(0, 0, 0);
            gsap.to(rightCard.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                delay: 0.4,
                ease: "back.out(1.5)"
            });
        } else if (leftAchievements.length > 0) {
            // If no right achievements, show tech stack
            const techStack = ['Full-Stack Development', 'System Architecture', 'Performance Optimization', 'Code Quality'];
            const rightCard = createHoloCard(
                'TECHNOLOGIES',
                techStack,
                { r: 80, g: 20, b: 80 }, // Purple
                5.5,  // Closer to center
                0.5   // Slightly higher
            );
            detailsGroup.add(rightCard);
            
            // Face camera
            rightCard.lookAt(camera.value.position);
            
            gsap.to(rightCard.material, {
                opacity: 1,
                duration: 0.8,
                delay: 0.4
            });
            
            rightCard.scale.set(0, 0, 0);
            gsap.to(rightCard.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                delay: 0.4,
                ease: "back.out(1.5)"
            });
        }
        
        // Particles between cards
        const particleCount = 100;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = Math.random() * 6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            
            const colorOptions = [
                new THREE.Color(0x00ff00),
                new THREE.Color(0x0000ff),
                new THREE.Color(0xff00ff)
            ];
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMat = new THREE.PointsMaterial({
            size: 0.2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        detailsGroup.add(particles);
        
        // Particle animation
        gsap.to(particles.rotation, {
            y: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none"
        });
        
        scene.value.add(detailsGroup);
        
        // Face camera
        const rotateInterval = setInterval(() => {
            if (camera.value && detailsGroup.parent) {
                detailsGroup.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        child.lookAt(camera.value.position);
                    }
                });
            }
        }, 50);
        
        detailsGroup.userData = { rotationInterval: rotateInterval };
        
        return detailsGroup;
    };
    
    const createHolographicDisplay = (station) => {
        // Just create preview first
        return createPreviewDisplay(station);
    };
    
    const removeHolographicDisplay = (displayGroup) => {
        if (!displayGroup) return;
        
        // Clear rotation interval
        if (displayGroup.userData.rotationInterval) {
            clearInterval(displayGroup.userData.rotationInterval);
        }
        
        // Kill all GSAP animations for this group
        gsap.killTweensOf(displayGroup);
        gsap.killTweensOf(displayGroup.position);
        gsap.killTweensOf(displayGroup.rotation);
        gsap.killTweensOf(displayGroup.scale);
        
        // Animate out
        gsap.to(displayGroup.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
            ease: "back.in(1.7)",
            onComplete: () => {
                scene.value.remove(displayGroup);
                // Clean up
                displayGroup.traverse(child => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (child.material.map) child.material.map.dispose();
                        child.material.dispose();
                    }
                });
            }
        });
    };
    
    const autoInteractWithStation = (station) => {
        if (!isAutoTourActive.value) return;
        
        console.log(`📍 Interacting with station ${autoTourCurrentIndex.value + 1}`);
        
        // Mark as visited and grow character
        if (!station.visited) {
            station.visited = true;
            visitedStations.value++;
            
            const totalStations = experienceStations.value.length;
            const progress = visitedStations.value / totalStations;
            const newSize = 0.5 + (progress * 1.5);
            characterSize.value = newSize;
            
            if (character.value) {
                gsap.to(character.value.scale, {
                    x: newSize,
                    y: newSize,
                    z: newSize,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                });
            }
            
            if (station.ring) {
                station.ring.material.color.setHex(0x00ff00);
            }
        }
        
        // Stage 1: Preview is already showing
        // Wait 2.5 seconds at the station
        
        if (autoTourTimeoutId) {
            clearTimeout(autoTourTimeoutId);
        }
        
        autoTourTimeoutId = setTimeout(() => {
            if (!isAutoTourActive.value) return;
            
            // Stage 2: Remove preview and show full details
            const previewKey = `station_${autoTourCurrentIndex.value}_preview`;
            const preview = stationDisplays.get(previewKey);
            
            if (preview) {
                // Clear interval
                if (preview.userData && preview.userData.rotationInterval) {
                    clearInterval(preview.userData.rotationInterval);
                }
                
                // Fade out preview
                preview.children.forEach(child => {
                    if (child.material && child.material.opacity !== undefined) {
                        gsap.to(child.material, {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                });
                
                setTimeout(() => {
                    scene.value.remove(preview);
                    stationDisplays.delete(previewKey);
                }, 500);
            }
            
            // Show full details
            const detailsDisplay = createFullDetailsDisplay(station);
            const detailsKey = `station_${autoTourCurrentIndex.value}_details`;
            stationDisplays.set(detailsKey, detailsDisplay);
            
            // Wait before moving to next
            if (autoTourTimeoutId) {
                clearTimeout(autoTourTimeoutId);
            }
            
            autoTourTimeoutId = setTimeout(() => {
                if (!isAutoTourActive.value) return;
                
                // Remove details display
                const details = stationDisplays.get(detailsKey);
                
                if (details) {
                    if (details.userData && details.userData.rotationInterval) {
                        clearInterval(details.userData.rotationInterval);
                    }
                    
                    gsap.to(details.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                        onComplete: () => {
                            scene.value.remove(details);
                            stationDisplays.delete(detailsKey);
                        }
                    });
                }
                
                autoTourCurrentIndex.value++;
                console.log(`➡️ Moving to index ${autoTourCurrentIndex.value}`);
                
                // Move to next station
                if (autoTourTimeoutId) {
                    clearTimeout(autoTourTimeoutId);
                }
                
                autoTourTimeoutId = setTimeout(() => {
                    if (isAutoTourActive.value) {
                        moveToNextStation();
                    }
                }, 500);
            }, 5000); // Show details for 5 seconds
        }, 2500); // Wait 2.5 seconds before showing details
    };
    
    const moveToStart = () => {
        if (!character.value) return;
        
        console.log('🏁 Returning to start position...');
        
        const startPos = new THREE.Vector3(0, 0, 0);
        const currentPos = character.value.position;
        const distance = currentPos.distanceTo(startPos);
        const duration = Math.max(3, distance / 4); // Slower for cinematic effect
        
        // Face start
        const angle = Math.atan2(-currentPos.x, -currentPos.z);
        gsap.to(character.value.rotation, {
            y: -angle,
            duration: 0.5,
            ease: "power2.inOut"
        });
        
        // Cinematic camera orbit animation for return journey
        const cameraOrbitData = {
            angle: Math.PI,
            radius: 12,
            height: 8
        };
        
        // Animate camera orbiting around the character
        gsap.to(cameraOrbitData, {
            angle: Math.PI * 3, // 1.5 full rotations
            duration: duration,
            ease: "none",
            onUpdate: () => {
                if (camera.value && character.value) {
                    const camX = character.value.position.x + Math.cos(cameraOrbitData.angle) * cameraOrbitData.radius;
                    const camZ = character.value.position.z + Math.sin(cameraOrbitData.angle) * cameraOrbitData.radius;
                    const camY = character.value.position.y + cameraOrbitData.height;
                    
                    camera.value.position.set(camX, camY, camZ);
                    camera.value.lookAt(character.value.position.x, character.value.position.y + 1, character.value.position.z);
                }
            }
        });
        
        // Move to start
        gsap.to(character.value.position, {
            x: 0,
            z: 0,
            duration: duration,
            ease: "power1.inOut",
            onUpdate: () => {
                if (character.value && character.value.userData) {
                    const userData = character.value.userData;
                    userData.walkCycle += 0.3;
                    const swing = Math.sin(userData.walkCycle) * 0.3;
                    userData.leftArm.rotation.x = swing;
                    userData.rightArm.rotation.x = -swing;
                    userData.leftLeg.rotation.x = -swing;
                    userData.rightLeg.rotation.x = swing;
                }
            },
            onComplete: () => {
                if (character.value && character.value.userData) {
                    const userData = character.value.userData;
                    gsap.to([userData.leftArm.rotation, userData.rightArm.rotation, 
                             userData.leftLeg.rotation, userData.rightLeg.rotation], {
                        x: 0,
                        duration: 0.5
                    });
                }
                
                // Smooth transition back to normal follow camera
                if (camera.value && character.value) {
                    const cameraOffset = new THREE.Vector3(0, 5, 10);
                    gsap.to(camera.value.position, {
                        x: character.value.position.x + cameraOffset.x,
                        y: character.value.position.y + cameraOffset.y,
                        z: character.value.position.z + cameraOffset.z,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (camera.value && character.value) {
                                camera.value.lookAt(character.value.position);
                            }
                        },
                        onComplete: () => {
                            // Reset tour
                            isAutoTourActive.value = false;
                            autoTourCurrentIndex.value = 0;
                            console.log('✅ Auto-tour finished!');
                        }
                    });
                } else {
                    // Reset tour
                    isAutoTourActive.value = false;
                    autoTourCurrentIndex.value = 0;
                    console.log('✅ Auto-tour finished!');
                }
            }
        });
    };
    
    const checkIdleAndStartTour = () => {
        const timeSinceLastInteraction = Date.now() - lastUserInteractionTime;
        
        // Check if user has been idle and tour should start
        if (!isAutoTourActive.value && 
            timeSinceLastInteraction > AUTO_TOUR_IDLE_DELAY &&
            !showProjectDetail.value &&
            !showExperienceDetail.value &&
            experienceStations.value.length > 0) {
            
            // Check if character is roughly at start position
            if (character.value) {
                const distanceFromStart = Math.sqrt(
                    character.value.position.x ** 2 + 
                    character.value.position.z ** 2
                );
                
                // Only start tour if character is near start (within 5 units)
                if (distanceFromStart < 5) {
                    startAutoTour();
                }
            }
        }
    };

    const clock = new THREE.Clock();
    
    const animate = () => {
        animationId.value = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Only update manual character controls if auto-tour is not active
        if (!isAutoTourActive.value) {
            updateCharacter(delta);
        }
        
        // Check if we should start auto-tour
        checkIdleAndStartTour();

        // Animate environment
        scene.value.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
            }
        });

        // Animate project station particles
        const time = Date.now() * 0.001;
        projectStations.value.forEach(station => {
            if (station.particles) {
                station.particles.rotation.y = time * 0.5;
            }
        });

        // Animate experience station particles and rings
        experienceStations.value.forEach(station => {
            if (station.particles) {
                station.particles.rotation.y = time * 0.3;
            }
            if (station.ring) {
                station.ring.rotation.z = time * 0.5;
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
        // Stop auto-tour
        stopAutoTour();
        
        if (animationId.value) {
            cancelAnimationFrame(animationId.value);
        }
        if (backgroundMusicAudio) {
            try {
                backgroundMusicAudio.pause();
                if (backgroundMusicAudio.parentElement) {
                    document.body.removeChild(backgroundMusicAudio);
                }
            } catch (e) {
                console.log('Cleanup audio error:', e);
            }
            backgroundMusicAudio = null;
        }
        if (renderer.value) {
            renderer.value.dispose();
        }
        if (scene.value) {
            scene.value.clear();
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };

    const initMusic = () => {
        console.log('=== Initializing Music ===');
        
        // Create audio element and attach to DOM
        backgroundMusicAudio = document.createElement('audio');
        backgroundMusicAudio.id = 'walkable-world-music';
        backgroundMusicAudio.src = '/audio/background-music.mp3';
        backgroundMusicAudio.loop = true;
        backgroundMusicAudio.volume = 0.3;
        backgroundMusicAudio.preload = 'auto';
        
        // Attach to body so it persists
        document.body.appendChild(backgroundMusicAudio);
        
        console.log('Audio element created:', backgroundMusicAudio.src);
        
        // Add event listeners
        backgroundMusicAudio.addEventListener('loadeddata', () => {
            console.log('✅ Music loaded! Duration:', backgroundMusicAudio.duration);
        });
        
        backgroundMusicAudio.addEventListener('playing', () => {
            console.log('🎵 Music is playing');
            isMusicPlaying.value = true;
        });
        
        backgroundMusicAudio.addEventListener('error', (e) => {
            console.error('❌ Music loading error:', backgroundMusicAudio.error);
        });
        
        backgroundMusicAudio.addEventListener('canplaythrough', () => {
            console.log('✅ Music ready to play');
            // Try to autoplay when ready
            attemptAutoplay();
        });
        
        backgroundMusicAudio.load();
    };
    
    const attemptAutoplay = () => {
        if (!backgroundMusicAudio || !backgroundMusicAudio.paused) return;
        
        console.log('🎵 Attempting autoplay...');
        const playPromise = backgroundMusicAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('✅ Autoplay successful!');
                    isMusicPlaying.value = true;
                })
                .catch(err => {
                    console.log('⚠️ Autoplay blocked by browser (expected)');
                    console.log('Music will start on first user interaction...');
                    // Set up one-time listeners for user interaction
                    const startOnInteraction = () => {
                        if (backgroundMusicAudio && backgroundMusicAudio.paused) {
                            backgroundMusicAudio.play().then(() => {
                                console.log('🎵 Music started after user interaction!');
                                isMusicPlaying.value = true;
                            });
                        }
                        // Remove listeners after first use
                        document.removeEventListener('click', startOnInteraction);
                        document.removeEventListener('keydown', startOnInteraction);
                    };
                    document.addEventListener('click', startOnInteraction, { once: true });
                    document.addEventListener('keydown', startOnInteraction, { once: true });
                });
        }
    };
    
    const toggleMusic = () => {
        console.log('=== Toggle Music Clicked ===');
        
        if (!backgroundMusicAudio) {
            console.log('No audio element, initializing...');
            initMusic();
            setTimeout(() => {
                console.log('Retrying toggle after init...');
                toggleMusic();
            }, 1000);
            return;
        }
        
        console.log('Current audio state:', {
            paused: backgroundMusicAudio.paused,
            currentTime: backgroundMusicAudio.currentTime,
            duration: backgroundMusicAudio.duration,
            src: backgroundMusicAudio.src
        });
        
        if (backgroundMusicAudio.paused) {
            console.log('▶️ Attempting to play...');
            
            // Remove any event listeners that might interfere
            backgroundMusicAudio.onpause = null;
            backgroundMusicAudio.onsuspend = null;
            
            // Set volume
            backgroundMusicAudio.volume = 0.3;
            
            const playPromise = backgroundMusicAudio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Play promise resolved!');
                        console.log('Is paused?', backgroundMusicAudio.paused);
                        isMusicPlaying.value = true;
                        
                        // Check after 2 seconds
                        setTimeout(() => {
                            console.log('=== 2 Second Check ===');
                            console.log('Still playing?', !backgroundMusicAudio.paused);
                            console.log('Current time:', backgroundMusicAudio.currentTime);
                            
                            if (backgroundMusicAudio.paused) {
                                console.error('❌ Got paused somehow! Trying again...');
                                backgroundMusicAudio.play();
                            }
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('❌ Play failed:', err.message);
                        alert('Music play failed: ' + err.message + '\n\nTry clicking again!');
                        isMusicPlaying.value = false;
                    });
            }
        } else {
            console.log('⏸️ Pausing...');
            backgroundMusicAudio.pause();
            isMusicPlaying.value = false;
            console.log('Music paused');
        }
    };

    onMounted(() => {
        initScene();
        initMusic(); // Initialize music on mount
        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    });

    onUnmounted(() => {
        cleanup();
    });

    return {
        currentStation,
        showProjectDetail,
        showExperienceDetail,
        currentProject,
        currentExperience,
        closeProjectDetail,
        closeExperienceDetail,
        toggleMusic,
        isMusicPlaying,
        visitedStations,
        characterSize,
        isAutoTourActive,
        startAutoTour,
        stopAutoTour,
    };
}
