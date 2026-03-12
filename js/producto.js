// =============================================
// producto.js - Lógica de la página de detalle
// Mates Juntos
// =============================================

const products = [
    {
        id: 1,
        name: "Mate Imperial Virola Acero",
        category: "Mates de Madera",
        price: 20500,
        description: "Mate artesanal con virola de acero grabada con motivos florales. Una pieza de colección que combina la calidez de la madera con el brillo de acero. Cada virola está cincelada a mano, haciendo de cada mate una obra única.",
        images: ["/fotos/FotoImpAce.jpeg", "/fotos/FotoImpAce2.jpeg"],
        features: ["Virola de acero grabada", "Madera natural seleccionada", "Elaborado 100% a mano", "Contactar si quiere curado y listo para usar.", "Capacidad: ~180ml"]
    },
    {
        id: 2,
        name: "Mate Imperial Virola con Alpaca",
        category: "Mates de Madera",
        price: 22000,
        description: "Exclusivo mate con diseño 'Floral' de virola plateada de gran tamaño. Cuerpo de madera torneado en forma redondeada, ideal para quienes prefieren una panza amplia. La virola presenta un grabado de motivos florales y geométricos de alta complejidad.",
        images: ["/fotos/FotoImpAlpaca.jpeg","/fotos/FotoImpAlpaca2.jpeg", "/fotos/FotoImpAlpaca3.jpeg", "/fotos/FotoImpAlpaca4.jpeg"],
        features: ["Virola plateada de gran tamaño", "Madera torneada artesanal", "Diseño redondeado ergonómico", "Grabado floral y geométrico", "Capacidad: ~200ml"]
    },
    {
        id: 3,
        name: "Mate Camionero Algarrobo",
        category: "Mates de Madera",
        price: 16000,
        description: "Mate artesanal tallado a mano en madera oscura tipo ébano, con virola de acero inoxidable. Elegante y sobrio, perfecto para el uso diario. Su forma cónica clásica lo hace cómodo para sostener.",
        images: ["/fotos/FotoCam2.jpeg", "/fotos/FotoCam3.jpeg"],
        features: ["Madera oscura tipo Algarrobo", "Virola de acero inoxidable", "Forma cónica ergonómica", "Elaborado a mano", "Capacidad: ~150ml"]
    },
    {
        id: 4,
        name: "Mate Imperial Calabaza",
        category: "Mates Calabaza",
        price: 26500,
        description: "Clásico mate Imperial en calabaza lacada color negro con virola de acero inoxidable y diseño de rombos. Robusto, de boca ancha y gran capacidad. Ideal para los que toman mate largo.",
        images: ["/fotos/FotoImpCalabaza.jpeg", "/fotos/FotoImpCalabaza2.jpeg"],
        features: ["Calabaza lacada color negro", "Virola con diseño de rombos", "Boca ancha estilo camionero", "Gran capacidad: ~250ml", "Muy resistente al uso diario"]
    },
    {
        id: 5,
        name: "Mate Camionero Calabaza",
        category: "Mates Calabaza",
        price: 16000,
        description: "Clásico mate camionero en calabaza lacada color negro con virola de acero inoxidable y diseño de rombos. Robusto, de boca ancha y gran capacidad. Ideal para los que toman mate largo.",
        images: ["/fotos/FotoCamCalabaza.jpeg", "/fotos/FotoCamCalabaza2.jpeg","/fotos/FotoCamCalabaza3.jpeg"],
        features: ["Calabaza cubierta con cuero Color bordo", "Virola con diseño liso Clasico", "Boca estilo Camionero", "Gran chica: ~140ml", "Muy resistente al uso diario"]
    },
    {
        id: 6,
        name: "Bombilla Cincelada de Acero Inoxidable",
        category: "Accesorios",
        price: 10000,
        description: "Accesorio para mate, Bombilla de Acero Inoxidable, resistente.",
        images: ["/fotos/BombillaCincelada.jpeg", "/fotos/BombillaCincelada2.jpeg"],
        features: ["Madera miel seleccionada", "Virola con motivos florales", "Forma redondeada", "Tratamiento anti-humedad", "Capacidad: ~160ml"]
    },
    {
        id: 7,
        name: "Bombilla Lisa Acero Inoxidable",
        category: "Accesorios",
        price: 8500,
        description: "Bombilla de acero inoxidable con diseño clásico y funcional. Su forma recta y boca lisa facilitan la limpieza, mientras que su resistencia al calor garantiza una experiencia de mate sin preocupaciones.",
        images: ["/fotos/BombillaLisa.jpeg", "/fotos/BombillaLisa2.jpeg", "/fotos/BombillaLisa3.jpeg"],
        features: ["Acero inoxidable de alta calidad", "Diseño clásico recto", "Boca lisa para fácil limpieza", "Resistente al calor", "Longitud: 20cm"]
    }
];

let currentProduct = null;
const featureIcons = ['fa-tree', 'fa-ring', 'fa-hands', 'fa-check-circle', 'fa-ruler'];

function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

function loadProduct(id) {
    const product = products.find(p => p.id === id) || products[0];
    currentProduct = product;

    document.title = `Mates Juntos - ${product.name}`;
    document.getElementById('breadcrumb-name').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    const precioTachado = Math.ceil((product.price * 1.09) / 500) * 500;

document.getElementById('product-price').innerHTML = `
    <span class="precio-antes">$${precioTachado.toLocaleString('es-AR')}</span>
    <span class="precio-oferta">$${product.price.toLocaleString('es-AR')}</span>
`;
    document.getElementById('product-description').textContent = product.description;

    // Features
    const featuresEl = document.getElementById('features');
    featuresEl.innerHTML = '<h3>Características del producto</h3>';
    product.features.forEach((f, i) => {
        featuresEl.innerHTML += `<div class="feature-item"><i class="fas ${featureIcons[i % featureIcons.length]}"></i> ${f}</div>`;
    });

    loadGallery(product.images);
    loadRelated(product.id);
}

function loadGallery(images) {
    const mainImg = document.getElementById('main-image');
    const thumbsContainer = document.getElementById('thumbnails');

    mainImg.src = images[0];
    mainImg.alt = currentProduct.name;

    thumbsContainer.innerHTML = '';
    images.forEach((img, i) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb ${i === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img}" alt="Vista ${i + 1}" loading="lazy">`;
        thumb.onclick = () => selectImage(i, img);
        thumbsContainer.appendChild(thumb);
    });
}

function selectImage(index, src) {
    const mainImg = document.getElementById('main-image');
    mainImg.style.opacity = '0';
    mainImg.style.transition = 'opacity 0.15s ease';
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    }, 150);
    document.querySelectorAll('.thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

function loadRelated(currentId) {
    const container = document.getElementById('related-products');
    container.innerHTML = '';
    products.filter(p => p.id !== currentId).slice(0, 4).forEach(p => {
        const card = document.createElement('a');
        card.href = `producto.html?id=${p.id}`;
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h4>${p.name}</h4>
                <p>${p.category}</p>
                <div class="card-price">$${p.price.toLocaleString('es-AR')}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function changeQty(delta) {
    const input = document.getElementById('qty');
    input.value = Math.max(1, Math.min(10, parseInt(input.value) + delta));
}

function addToCart() {
    if (!currentProduct) return;
    const qty = parseInt(document.getElementById('qty').value);

    // Leemos el carrito actual del navegador
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregamos el producto tantas veces como la cantidad
    for (let i = 0; i < qty; i++) {
        carritoGuardado.push({
            id: Date.now() + i,
            nombre: currentProduct.name,
            precio: currentProduct.price
        });
    }

    // Guardamos el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carritoGuardado));

    showToast(`✓ ${qty}x ${currentProduct.name} agregado al carrito`);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function contactWhatsApp() {
    if (!currentProduct) return;
    const msg = encodeURIComponent(`Hola! Me interesa el producto: ${currentProduct.name} - $${currentProduct.price.toLocaleString('es-AR')}. ¿Podrían darme más información?`);
    window.open(`https://wa.me/5493544321486?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    loadProduct(getIdFromURL());
});
