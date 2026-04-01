// ============================================================
// ✅ FIX 3: Carrito persistente usando localStorage
// El carrito se guarda y se recupera entre páginas
// ============================================================

// Cargar carrito desde localStorage al iniciar
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarCarrito(nombre, precio) {
    const itemExistente = carrito.find(item => item.nombre === nombre);
    if (itemExistente) {
        itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
    mostrarToast(`✅ "${nombre}" agregado al carrito`);
}

// Eliminar producto del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarCarrito();
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalSpan = document.getElementById('total');
    const carritoCount = document.querySelector('.carrito-count');

    if (!carritoItems) return; // Si no está en la página del carrito, salir

    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * (item.cantidad || 1);
        total += subtotal;
        cantidadTotal += (item.cantidad || 1);

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <div class="item-info">
                <span class="item-nombre">${item.nombre}</span>
                <span class="item-cantidad">x${item.cantidad || 1}</span>
            </div>
            <div class="item-precio-eliminar">
                <span class="item-precio">$${subtotal.toLocaleString('es-AR')}</span>
                <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">✕</button>
            </div>
        `;
        carritoItems.appendChild(div);
    });

    if (totalSpan) totalSpan.textContent = total.toLocaleString('es-AR');
    if (carritoCount) carritoCount.textContent = `(${cantidadTotal})`;
}

// Finalizar compra por WhatsApp
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agregá productos antes de finalizar la compra.');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0);
    const listaProductos = carrito
        .map(item => `• ${item.nombre} x${item.cantidad || 1} - $${(item.precio * (item.cantidad || 1)).toLocaleString('es-AR')}`)
        .join('%0A');

    const mensaje = `Hola! Quisiera hacer el siguiente pedido:%0A%0A${listaProductos}%0A%0A*Total: $${total.toLocaleString('es-AR')}*%0A%0APor favor confirmenme disponibilidad. ¡Gracias!`;
    const numeroWhatsApp = '5493544321486';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(urlWhatsApp, '_blank');
}

// ✅ FIX 4: Confirmación visual del formulario (para cuando Formspree no redirige)
function mostrarConfirmacion(event) {
    // Si usás Formspree con AJAX, podés evitar la recarga así:
    // (opcional, Formspree también funciona sin esto)
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ Mensaje enviado!';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Enviar Mensaje';
        btn.disabled = false;
        form.reset();
    }, 3000);
}

// Menú hamburguesa
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('active');
}

// Toast de notificación
function mostrarToast(mensaje) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background: #2D5016; color: white;
            padding: 12px 20px; border-radius: 8px;
            font-size: 14px; z-index: 9999;
            opacity: 0; transition: opacity 0.3s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});