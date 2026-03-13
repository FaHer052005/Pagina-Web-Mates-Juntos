// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar producto al carrito
function agregarCarrito(nombre, precio) {
    const producto = {
        nombre: nombre,
        precio: precio,
        id: Date.now()
    };
    
    carrito.push(producto);
    actualizarCarrito();
    mostrarNotificacion(`${nombre} agregado al carrito`);
}

// Actualizar carrito en la UI
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // ← agregá esta línea
    
    const carritoItems = document.getElementById('carrito-items');
    const carritoCount = document.querySelector('.carrito-count');
    const total = document.getElementById('total');
    
    carritoCount.textContent = `(${carrito.length})`;
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p style="text-align: center; color: #999;">Tu carrito está vacío</p>';
        total.textContent = '0';
        return;
    }
    
    carritoItems.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <span class="carrito-item-nombre">${item.nombre}</span>
            <span class="carrito-item-precio">$${item.precio}</span>
            <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>
    `).join('');
    
    const totalPrice = carrito.reduce((sum, item) => sum + item.precio, 0);
    total.textContent = totalPrice;
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    
    // Armamos la lista de productos
    const listaProductos = carrito
        .map(item => `- ${item.nombre} - $${item.precio.toLocaleString('es-AR')}`)
        .join('%0A');
    
    // Armamos el mensaje completo
    const mensaje = 
        `Hola! Quiero hacer un pedido 🧉%0A%0A` +
        `${listaProductos}%0A%0A` +
        `*Total: $${total.toLocaleString('es-AR')}*%0A%0A` +
        `¿Cómo puedo pagar?`;
    
    // Tu número de WhatsApp (con código de país, sin espacios ni guiones)
    const numero = '5493544321486';
    
    // Abrimos WhatsApp
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
}

// Enviar formulario
function enviarFormulario(event) {
    event.preventDefault();

    const nombre = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const mensaje = event.target.elements[2].value;

    // Armamos el mensaje para WhatsApp
    const texto = 
        `Hola! Tengo una consulta 🧉%0A%0A` +
        `*Nombre:* ${nombre}%0A` +
        `*Email:* ${email}%0A%0A` +
        `*Mensaje:*%0A${mensaje}`;

    // Tu número de WhatsApp
    const numero = '5493544321486';

    // Abrimos WhatsApp con el mensaje
    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');

    // Limpiamos el formulario
    event.target.reset();
}

// Toggle menú hamburguesa
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Cerrar menú cuando se hace click en un link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    
    // Inicializar carrito
    actualizarCarrito();
});

// Notificación temporal
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
