/********************** GENERAL **********************/

// Funzione per aggiornare l'opacità in base allo scroll
function updateOpacity() {
    const images = document.querySelectorAll('.bgimg-1, .bgimg-2, .bgimg-3, .bgimg-4');

    // Calcola l'opacità in base alla posizione di scroll per ogni immagine
    images.forEach(image => {
        const rect = image.getBoundingClientRect();
        const imageTop = rect.top + window.scrollY;
        const imageBottom = imageTop + image.offsetHeight;
        const opacity = Math.min(1, Math.max(0, (imageBottom - window.scrollY) / window.innerHeight));
        image.style.opacity = opacity;
    });
}

// Aggiungi un evento listener per lo scroll
window.addEventListener('scroll', updateOpacity);

// Create particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 20;

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Set random bit content
    particle.textContent = Math.random() < 0.5 ? '0' : '1';

    // Initial position
    resetParticle(particle);

    particlesContainer.appendChild(particle);

    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';

    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);

    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    // Animate with GSAP-like timing
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    // Create particles at mouse position
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;

    // Create temporary particle
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Small size
    particle.textContent = Math.random() < 0.5 ? '0' : '1';
    particle.style.fontSize = `${Math.random() * 4 + 10}px`;

    // Position at mouse
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';

    particlesContainer.appendChild(particle);

    // Animate outward
    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);

    // Subtle movement of gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

    spheres.forEach(sphere => {
        const currentTransform = getComputedStyle(sphere).transform;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

/********************** MENU SECTION **********************/

// Apply dark mode by default
document.body.classList.add("dark-mode");

function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    var icon = document.querySelector('.fa-moon-o, .fa-sun-o');
    if (element.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
    } else {
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
    }
}

function openNav() {
    document.getElementById("mySidebar").style.display = "block";
    document.body.classList.add("no-scroll"); // Blocca lo scroll
}

function closeNav() {
    document.getElementById("mySidebar").style.display = "none"; // Nasconde il menu
    document.body.classList.remove("no-scroll"); // Riabilita lo scroll
}

/******************** HOME SECTION ********************/

/* PROMPT SIMULATOR */
// Typing effect
const text = "Hey! 👋 Explore my CV site and <br> if you click the cube below a few times ... 🚀";
let i = 0;
function type() {
    if (i < text.length) {
        document.getElementById("typedText").innerHTML = text.substring(0, i + 1) + '<span class="cursor">▋</span>';
        i++;
        setTimeout(type, 50);
    }
}
window.onload = () => setTimeout(type, 1000);

/* CUBE */
// Impostazioni iniziali
const container = document.getElementById('cubeContainer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Parametri del cubo
const cubeSize = 2.6;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const bitColor0 = '#ffffff';
const bitColor1 = '#ffffff';
const materials = [];

// Creazione dei materiali con maggiore luminosità
for (let i = 0; i < 6; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const matrixSize = 16;
    const cellSize = canvas.width / matrixSize;
    for (let y = 0; y < matrixSize; y++) {
        for (let x = 0; x < matrixSize; x++) {
            const bit = Math.random() < 0.5 ? '0' : '1';
            ctx.fillStyle = bit === '0' ? bitColor0 : bitColor1;
            ctx.fillText(bit, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = renderer.getMaxAnisotropy(); // Migliora la qualità della texture
    const mat = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0.1, 0.1, 0.1), // Aumenta la luminosità
        emissiveIntensity: 0.5
    });
    materials.push(mat);
}

// Creazione del cubo
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Illuminazione
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const pointLight = new THREE.PointLight(0x00ffff, 1.5, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Spotlights in 6 direzioni
const spotLights = [];
const directions = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
];

directions.forEach(dir => {
    const spot = new THREE.SpotLight(0x00ffff, 0, 10, Math.PI / 6, 0.5, 1);
    spot.position.set(0, 0, 0);
    spot.target.position.set(dir.x * 10, dir.y * 10, dir.z * 10);
    scene.add(spot);
    scene.add(spot.target);
    spotLights.push(spot);
});

// Creazione di luci che emergono dalle crepe
const explosionLight = new THREE.PointLight(0xffffff, 0, 100);
scene.add(explosionLight);

// Funzione per espandere il cubo e attivare l'esplosione
let clickCount = 0;
const maxClicks = 4;
const bitPieces = [];
let exploded = false;

function enhanceCubeVisual() {
    cube.scale.x += 0.1;
    cube.scale.y += 0.1;
    cube.scale.z += 0.1;

    // Aumenta l'intensità delle luci
    spotLights.forEach(spot => {
        spot.intensity = Math.min(spot.intensity + 0.5, 5);
        spot.distance += 3;
    });

    camera.position.z -= 0.5;
}

function explodeCube() {
    exploded = true;
    scene.remove(cube);

    const numBits = 200;
    for (let i = 0; i < numBits; i++) {
        const pieceGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const pieceMat = new THREE.MeshBasicMaterial({
            color: Math.random() < 0.5 ? bitColor0 : bitColor1
        });
        const piece = new THREE.Mesh(pieceGeo, pieceMat);
        piece.position.copy(cube.position);

        const angle = Math.random() * Math.PI * 2;
        const zDir = (Math.random() - 0.5) * 2;
        const speed = 0.2 + Math.random() * 0.4;
        piece.userData = {
            velocity: {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed,
                z: zDir * speed
            }
        };

        scene.add(piece);
        bitPieces.push(piece);
    }

    explosionLight.position.copy(cube.position);
    explosionLight.intensity = 10;

    const btnContainer = document.getElementById('btnContainer');
    btnContainer.style.visibility = 'visible';
    btnContainer.style.zIndex = '3';
}

function crumbleStep() {
    if (clickCount < maxClicks) {
        clickCount++;
        if (clickCount < maxClicks) {
            enhanceCubeVisual();
        } else {
            explodeCube();
        }
    }
}

renderer.domElement.addEventListener('click', crumbleStep);

// Funzione di animazione
function animate() {
    requestAnimationFrame(animate);
    if (!exploded) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    } else {
        if (explosionLight.intensity > 0) {
            explosionLight.intensity *= 0.95;
        }

        bitPieces.forEach(piece => {
            const v = piece.userData.velocity;
            piece.position.x += v.x;
            piece.position.y += v.y;
            piece.position.z += v.z;
        });
    }

    renderer.render(scene, camera);
}

animate();

// Resize support
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function downloadCV() {
    const link = document.createElement('a'); // Create a new anchor element
    link.href = 'my_cv_resume.pdf'; // Replace with the correct file path
    link.download = 'valerio_serino_cv_resume.pdf'; // Specify the file name for the download
    link.click(); // Trigger the click event to start the download
}

/********************** EDUCATION SECTION **********************/

function toggleDescription(descriptionId, arrowIconId) {
    var x = document.getElementById(descriptionId);
    var arrow = document.getElementById(arrowIconId);
    if (x.style.display === "none") {
        x.style.display = "block";
        arrow.classList.remove("fa-chevron-down");
        arrow.classList.add("fa-chevron-up");
    } else {
        x.style.display = "none";
        arrow.classList.remove("fa-chevron-up");
        arrow.classList.add("fa-chevron-down");
    }
}


function toggleAllDescriptions() {
    var descriptions = document.querySelectorAll('[id^="description"]');
    var arrows = document.querySelectorAll('[id^="arrow-icon"]');
    var button = document.getElementById("toggle-all-button");
    if (button.innerHTML === "Show all details") {
        descriptions.forEach(function (description) {
            description.style.display = "block";
        });
        arrows.forEach(function (arrow) {
            arrow.classList.remove("fa-chevron-down");
            arrow.classList.add("fa-chevron-up");
        });
        button.innerHTML = "Collapse all";
    } else {
        descriptions.forEach(function (description) {
            description.style.display = "none";
        });
        arrows.forEach(function (arrow) {
            arrow.classList.remove("fa-chevron-up");
            arrow.classList.add("fa-chevron-down");
        });
        button.innerHTML = "Show all details";
    }
}
