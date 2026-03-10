import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

export function useThreeBackground(canvasRef) {
    const renderer = ref(null);
    const scene = ref(null);
    const camera = ref(null);
    const particles = ref(null);
    const animationId = ref(null);
    const geometries = ref([]);
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const initThree = () => {
        if (!canvasRef.value) return;

        scene.value = new THREE.Scene();
        scene.value.fog = new THREE.FogExp2(0x0a0a1a, 0.002);
        
        camera.value = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.value.position.z = 50;

        renderer.value = new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            alpha: true,
            antialias: true,
        });
        renderer.value.setSize(window.innerWidth, window.innerHeight);
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Advanced particle system with multiple layers
        createParticleLayers();
        
        // Add floating geometric shapes
        createFloatingGeometries();
        
        // Add ambient lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.5);
        scene.value.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
        pointLight.position.set(0, 0, 20);
        scene.value.add(pointLight);

        animate();
    };

    const createParticleLayers = () => {
        const layers = [
            { count: 2000, size: 0.1, color: 0x6366f1, speed: 0.001 },
            { count: 1000, size: 0.2, color: 0x8b5cf6, speed: 0.0015 },
            { count: 500, size: 0.3, color: 0xa78bfa, speed: 0.002 },
        ];

        layers.forEach((layer, index) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(layer.count * 3);
            const colors = new Float32Array(layer.count * 3);

            for (let i = 0; i < layer.count * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 150;
                positions[i + 1] = (Math.random() - 0.5) * 150;
                positions[i + 2] = (Math.random() - 0.5) * 150;

                const color = new THREE.Color(layer.color);
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: layer.size,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true,
            });

            const particleSystem = new THREE.Points(geometry, material);
            particleSystem.userData = { speed: layer.speed, layer: index };
            scene.value.add(particleSystem);
        });
    };

    const createFloatingGeometries = () => {
        const shapes = [
            new THREE.TorusGeometry(3, 0.5, 16, 100),
            new THREE.IcosahedronGeometry(2, 0),
            new THREE.OctahedronGeometry(2.5, 0),
            new THREE.TetrahedronGeometry(3, 0),
        ];

        const material = new THREE.MeshPhongMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });

        shapes.forEach((geometry, i) => {
            const mesh = new THREE.Mesh(geometry, material.clone());
            mesh.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 50
            );
            mesh.userData = {
                rotationSpeed: {
                    x: Math.random() * 0.01,
                    y: Math.random() * 0.01,
                    z: Math.random() * 0.01,
                },
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatOffset: Math.random() * Math.PI * 2,
            };
            geometries.value.push(mesh);
            scene.value.add(mesh);
        });
    };

    const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotation.y = mouse.x * 0.5;
        targetRotation.x = mouse.y * 0.5;
    };

    const animate = () => {
        animationId.value = requestAnimationFrame(animate);

        // Animate particle systems
        scene.value.children.forEach((child) => {
            if (child instanceof THREE.Points && child.userData.speed) {
                child.rotation.y += child.userData.speed;
                child.rotation.x += child.userData.speed * 0.5;
                
                // Wave motion
                const time = Date.now() * 0.001;
                const positions = child.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
                }
                child.geometry.attributes.position.needsUpdate = true;
            }
        });

        // Animate floating geometries
        const time = Date.now() * 0.001;
        geometries.value.forEach((mesh) => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.02;
        });

        // Smooth camera movement based on mouse
        if (camera.value) {
            camera.value.rotation.y += (targetRotation.y - camera.value.rotation.y) * 0.05;
            camera.value.rotation.x += (targetRotation.x - camera.value.rotation.x) * 0.05;
        }

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
        if (renderer.value) {
            renderer.value.dispose();
        }
        if (scene.value) {
            scene.value.clear();
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };

    onMounted(() => {
        initThree();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
    });

    onUnmounted(() => {
        cleanup();
    });

    return {
        scene,
        camera,
        renderer,
    };
}
