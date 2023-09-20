const carroBtn = document.getElementById('carro');  


// Mostrar el modal del carrito cuando se hace clic en el botón del carrito
carroBtn.addEventListener('click', function () {
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('cardButton-close');
    cartModal.style.display = 'block';
    /* Mostrar items en el carrito */
    showCartItems();
    // Ocultar el modal del carrito cuando se hace clic en el botón de cierre
    closeCartBtn.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });
});

