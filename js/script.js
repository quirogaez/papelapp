/* const datos = require('./products.js'); */

import { products } from "./products.js";

console.log(products);


let itemsCart = JSON.parse(localStorage.getItem("itemsCart"))
                ??
                {}
console.log(itemsCart)
addEventListener("DOMContentLoaded", (event) => {

});


const carroBtn = document.getElementById('carro'); 
const btnProducts = document.querySelectorAll(".product");

 btnProducts.forEach((btn) => {
    btn.addEventListener("click", addProduct)
 })


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

function addProduct() {
    /*console.log(this.id) */
    const nameProduct = this.id;
    const keysProductsCart = Object.keys(itemsCart);
    if (keysProductsCart.includes(nameProduct)) {
        /* Se define la propeidad cantidad */
        let cantidad = itemsCart[nameProduct].cantidad ?? 0;
        let valor = parseFloat(products[nameProduct].valor)
        

        /* Se establece nueva cantidad */
        itemsCart[nameProduct].cantidad = cantidad + 1;
        /* Se establece neuvo valor */
        valor = ((cantidad + 1) * valor);

        /* Se asigna nuevo valor */
        itemsCart[nameProduct].valor = valor

        /* console.log(formatNumber(valor)) */
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
        console.log(itemsCart);

    }
    else {
        let valor = parseFloat(products[nameProduct].valor)
        let cantidad = 1;
        /* S */
        itemsCart[nameProduct] = {};
        itemsCart[nameProduct]["cantidad"] = cantidad;
        itemsCart[nameProduct]["valor"] = valor;
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
        console.log(itemsCart);
    }
}



function showCartItems(){
    const cartContent = document.querySelector(".cart-content");
    const cartItems = document.querySelector(".cart-items")
    let html = "";
    const closeCartBtn = document.getElementById('cardButton-close');
    for (let productItem in itemsCart) {
        html += `
        <td></td>
        <img src="${products[productItem].img}" alt="">              
        <td>
            <img class="product__image">
        </td>
        <!-- aquí titulo, descripción y slider cantidad -->
        <td>
            <!-- titulo y descripción-->
            <tr>
                <h3>${products[productItem].titulo}</h3>
                <p>${products[productItem].descripcion}</p>
                <p>Cantidad: ${itemsCart[productItem].cantidad}</p>
                <p>Valor: ${products[productItem].valor}</p>
                <p>Valor total: ${itemsCart[productItem].valor}</p>
            </tr>
        </td>`
        /* html += `<img src="${products[productItem].img}" alt="">
        <div>
            <h3>${products[productItem].descripcion}</h3>
            <p>Precio: ${products[productItem].precio}</p>
            <p>Cantidad: ${itemsCart[productItem].valor}</p>
        </div>`; */
    }
    cartItems.innerHTML = html

}
 
function showTotalValue() {

}

/* module.exports = datos; //Especificar valroes del objeto */

/*  localStorage.setItem("categorias", JSON.stringify(categorias)); */

/* localStorage.removeItem("itemsCart"); */

function formatNumber(number) {
    /* Funcion que se encarga de poner los puntos en el numero */

    /* const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(number));
   */
    const formattedNumber =  new Intl.NumberFormat('de-DE').format(number)
    return formattedNumber;
}

localStorage.removeItem("itemsCart");

