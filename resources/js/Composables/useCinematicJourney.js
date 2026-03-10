import { ref, onMounted, onUnmounted, markRaw, shallowRef } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';

export function useCinematicJourney(canvasRef, experiences, projects) {
    const renderer = shallowRef(null);
    const scene = shallowRef(null);
    const camera = shallowRef(null);
    const animationId = ref(null);
    const character = shallowRef(null);
    
    // Journey state
    const isIntroComplete = ref(false);
    const showWelcome = ref(true);
    const currentExperienceIndex = ref(0);
    const currentProjectIndex = ref(0);
    const currentExperience = ref(null);
    const currentProject = ref(null);
    const showExperienceDetail = ref(false);
    const showProjectDetail = ref(false);
    const isJourneyActive = ref(false);
    const journeyPhase = ref('experiences'); // 'experiences' or 'projects'
    const characterSize = ref(0.3); // Start very small
    
    // Background music - NOT reactive, plain JavaScript
    let musicAudio = null;
    const isMusicPlaying = ref(false);
    
    // Experience and Project stations
    const experienceStations = shallowRef([]);
    const projectStations = shallowRef([]);
    
    // Welcome message
    const welcomeMessage = ref("Hello, I'm Luke");
    const welcomeSubtext = ref("Watch my career journey unfold automatically");
    const welcomeInstructions = ref("Click 'Begin Journey' to start");
    
    const initScene = () => {
        if (!canvasRef.value) return;

        scene.value = markRaw(new THREE.Scene());
        scene.value.background = new THREE.Color(0x0a0a1a);
        scene.value.fog = new THREE.FogExp2(0x0a0a1a, 0.012);

        camera.value = markRaw(new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        ));
        
        // Start camera at intro position
        camera.value.position.set(-35, 8, 5);
        camera.value.lookAt(-30, 2, 0);

        renderer.value = markRaw(new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            antialias: true,
        }));
        renderer.value.setSize(window.innerWidth, window.innerHeight);
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.value.shadowMap.enabled = true;
        renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;

        // Dramatic lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
        scene.value.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        scene.value.add(directionalLight);

        // Spotlights for drama
        const spotlight = new THREE.SpotLight(0x00ffff, 1.5);
        spotlight.position.set(-30, 10, 0);
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        spotlight.castShadow = true;
        scene.value.add(spotlight);

        createGround();
        createCharacter();
        createExperienceStations();
        createEnvironment();

        animate();
    };

    const createGround = () => {
        const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.8,
            metalness: 0.2,
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        
        const gridHelper = new THREE.GridHelper(200, 100, 0x6366f1, 0x2a2a3e);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        
        scene.value.add(ground);
        scene.value.add(gridHelper);
    };

    const createCharacter = () => {
        const characterGroup = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.CapsuleGeometry(0.4, 0.8, 8, 16);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            emissive: 0x6366f1,
            emissiveIntensity: 0.3,
            roughness: 0.3,
            metalness: 0.7,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1.3;
        body.castShadow = true;
        characterGroup.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.4,
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.3;
        head.castShadow = true;
        characterGroup.add(head);

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 2.35, 0.3);
        characterGroup.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 2.35, 0.3);
        characterGroup.add(rightEye);

        // Arms
        const armGeometry = new THREE.CapsuleGeometry(0.12, 0.8, 8, 16);
        const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
        leftArm.position.set(-0.5, 1.3, 0);
        leftArm.castShadow = true;
        characterGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
        rightArm.position.set(0.5, 1.3, 0);
        rightArm.castShadow = true;
        characterGroup.add(rightArm);

        // Legs
        const legGeometry = new THREE.CapsuleGeometry(0.15, 0.9, 8, 16);
        const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        leftLeg.position.set(-0.2, 0.5, 0);
        leftLeg.castShadow = true;
        characterGroup.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        rightLeg.position.set(0.2, 0.5, 0);
        rightLeg.castShadow = true;
        characterGroup.add(rightLeg);

        characterGroup.userData = { leftArm, rightArm, leftLeg, rightLeg, head };
        characterGroup.scale.set(characterSize.value, characterSize.value, characterSize.value);
        characterGroup.position.set(-30, 0, 0);
        
        character.value = markRaw(characterGroup);
        scene.value.add(characterGroup);
    };

    const createExperienceStations = () => {
        if (!experiences || !experiences.length) return;

        const startX = -30;
        const spacing = 15;
        const stations = [];
        
        const sortedExperiences = [...experiences].sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });

        sortedExperiences.forEach((experience, index) => {
            const x = startX + (index * spacing);
            const z = 0;

            // Pedestal
            const pedestalGeometry = new THREE.CylinderGeometry(2.5, 3, 2, 6);
            const pedestalMaterial = new THREE.MeshStandardMaterial({
                color: 0x00d4ff,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.5,
                roughness: 0.3,
                metalness: 0.8,
            });
            const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
            pedestal.position.set(x, 1, z);
            pedestal.castShadow = true;
            scene.value.add(pedestal);

            // Year label above station
            const year = new Date(experience.start_date).getFullYear();
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00ffff';
            ctx.font = 'bold 80px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(year.toString(), 128, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            const yearGeometry = new THREE.PlaneGeometry(3, 1.5);
            const yearMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
            });
            const yearLabel = new THREE.Mesh(yearGeometry, yearMaterial);
            yearLabel.position.set(x, 5, z);
            scene.value.add(yearLabel);

            // Glowing ring
            const ringGeometry = new THREE.TorusGeometry(3.2, 0.15, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.7,
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(x, 0.2, z);
            ring.rotation.x = Math.PI / 2;
            scene.value.add(ring);

            // Particles
            const particleCount = 50;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 3 + 2;
                positions[i] = x + Math.cos(angle) * radius;
                positions[i + 1] = Math.random() * 5 + 0.5;
                positions[i + 2] = z + Math.sin(angle) * radius;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x00ffff,
                size: 0.2,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.value.add(particles);

            stations.push({
                position: markRaw(new THREE.Vector3(x, 0, z)),
                experience,
                year,
                pedestal: markRaw(pedestal),
                yearLabel: markRaw(yearLabel),
                ring: markRaw(ring),
                particles: markRaw(particles),
            });
        });
        
        experienceStations.value = stations;
    };

    const createProjectStations = () => {
        if (!projects || !projects.length) return;

        const startX = experienceStations.value.length > 0 
            ? -30 + (experienceStations.value.length * 15) + 20 
            : 20;
        const spacing = 12;
        const stations = [];

        projects.forEach((project, index) => {
            const x = startX + (index * spacing);
            const z = 0;

            // Different color for projects - purple
            const pedestalGeometry = new THREE.CylinderGeometry(2.5, 3, 2, 8);
            const pedestalMaterial = new THREE.MeshStandardMaterial({
                color: 0x9333ea,
                emissive: 0x9333ea,
                emissiveIntensity: 0.5,
                roughness: 0.3,
                metalness: 0.8,
            });
            const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
            pedestal.position.set(x, 1, z);
            pedestal.castShadow = true;
            scene.value.add(pedestal);

            // Purple ring for projects
            const ringGeometry = new THREE.TorusGeometry(3.2, 0.15, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xc084fc,
                transparent: true,
                opacity: 0.7,
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(x, 0.2, z);
            ring.rotation.x = Math.PI / 2;
            scene.value.add(ring);

            // Purple particles
            const particleCount = 50;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 3 + 2;
                positions[i] = x + Math.cos(angle) * radius;
                positions[i + 1] = Math.random() * 5 + 0.5;
                positions[i + 2] = z + Math.sin(angle) * radius;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: 0xc084fc,
                size: 0.2,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.value.add(particles);

            stations.push({
                position: markRaw(new THREE.Vector3(x, 0, z)),
                project,
                pedestal: markRaw(pedestal),
                ring: markRaw(ring),
                particles: markRaw(particles),
            });
        });
        
        projectStations.value = stations;
    };

    const createEnvironment = () => {
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.OctahedronGeometry(Math.random() * 2 + 1);
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() > 0.5 ? 0x6366f1 : 0x8b5cf6,
                emissive: Math.random() > 0.5 ? 0x6366f1 : 0x8b5cf6,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.3,
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.random() * 100 - 50,
                Math.random() * 20 + 10,
                Math.random() * 100 - 50
            );
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
            };
            scene.value.add(mesh);
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
        
        // Hide welcome screen
        showWelcome.value = false;
        isIntroComplete.value = true;
        isJourneyActive.value = true;
        
        // Try to play music
        if (musicAudio) {
            console.log('Attempting autoplay...');
            musicAudio.play()
                .then(() => {
                    console.log('✅ Autoplay worked!');
                    isMusicPlaying.value = true;
                })
                .catch(err => {
                    console.log('⚠️ Autoplay blocked (expected). Click music button to play.');
                    console.log('Error:', err.message);
                });
        }
        
        // Start the auto-journey
        setTimeout(() => {
            moveToNextExperience();
        }, 2000);
    };

    const moveToNextExperience = () => {
        if (currentExperienceIndex.value >= experienceStations.value.length) {
            // Journey complete
            isJourneyActive.value = false;
            return;
        }

        const station = experienceStations.value[currentExperienceIndex.value];
        const targetPos = station.position;
        
        // Animate character movement
        gsap.to(character.value.position, {
            x: targetPos.x,
            z: targetPos.z,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: () => {
                // Walking animation
                const walkCycle = Date.now() * 0.005;
                const swing = Math.sin(walkCycle) * 0.3;
                character.value.userData.leftArm.rotation.x = swing;
                character.value.userData.rightArm.rotation.x = -swing;
                character.value.userData.leftLeg.rotation.x = -swing;
                character.value.userData.rightLeg.rotation.x = swing;
            },
            onComplete: () => {
                // Arrived at station
                arrivedAtStation(station);
            }
        });

        // Animate camera follow
        gsap.to(camera.value.position, {
            x: targetPos.x + 5,
            y: 8,
            z: targetPos.z + 10,
            duration: 3,
            ease: "power2.inOut",
        });

        gsap.to(camera.value, {
            onUpdate: () => {
                camera.value.lookAt(targetPos.x, 2, targetPos.z);
            }
        });

        // Grow character
        const newSize = 0.3 + ((currentExperienceIndex.value + 1) / experienceStations.value.length) * 1.2;
        characterSize.value = newSize;
        
        gsap.to(character.value.scale, {
            x: newSize,
            y: newSize,
            z: newSize,
            duration: 2,
            ease: "elastic.out(1, 0.5)"
        });
    };

    const arrivedAtStation = (station) => {
        // Wave hello animation
        gsap.to(character.value.userData.rightArm.rotation, {
            z: -Math.PI / 3,
            duration: 0.3,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut"
        });

        // Show experience details
        setTimeout(() => {
            currentExperience.value = station.experience;
            showExperienceDetail.value = true;
        }, 800);

        // After 5 seconds, say goodbye and move on
        setTimeout(() => {
            sayGoodbye();
        }, 5000);
    };

    const sayGoodbye = () => {
        // Hide modal
        showExperienceDetail.value = false;

        // Shake hands goodbye animation
        gsap.to(character.value.userData.rightArm.rotation, {
            x: Math.PI / 4,
            duration: 0.2,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut",
            onComplete: () => {
                // Reset arm
                gsap.to(character.value.userData.rightArm.rotation, {
                    x: 0,
                    z: 0,
                    duration: 0.3
                });
                
                // Move to next
                currentExperienceIndex.value++;
                setTimeout(() => {
                    moveToNextExperience();
                }, 1000);
            }
        });

        // Nod head
        gsap.to(character.value.userData.head.rotation, {
            x: 0.3,
            duration: 0.3,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                character.value.userData.head.rotation.x = 0;
            }
        });
    };

    const closeExperienceDetail = () => {
        showExperienceDetail.value = false;
    };

    const closeProjectDetail = () => {
        showProjectDetail.value = false;
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

        // Animate environment
        scene.value.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
            }
        });

        // Animate particles
        const time = Date.now() * 0.001;
        experienceStations.value.forEach(station => {
            if (station.particles) {
                station.particles.rotation.y = time * 0.3;
            }
            if (station.ring) {
                station.ring.rotation.z = time * 0.5;
                station.ring.material.opacity = 0.5 + Math.sin(time * 2) * 0.3;
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
        currentExperience,
        currentProject,
        closeExperienceDetail,
        closeProjectDetail,
        toggleMusic,
        isMusicPlaying,
        currentExperienceIndex,
        currentProjectIndex,
        characterSize,
        isJourneyActive,
        journeyPhase,
    };
}
