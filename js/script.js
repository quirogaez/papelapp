/* const datos = require('./products.js'); */
/* Se importa el objeto que actua como base de datos de los productos */
import { products } from "./products.js";

console.log(products);

/* Se inicializa itemsCart con el valor guardado en el localstorage, sino, se inicializa como un objeto vacio */
let itemsCart = JSON.parse(localStorage.getItem("itemsCart"))
                ??
                {}
console.log(itemsCart)

addEventListener("DOMContentLoaded", (event) => {
    /* Si existe productos en el objeto del local storage se pinta el numero de productos en el carrito */
    if (Object.keys(itemsCart)){
        loadNumberCart();
    }
});

/* Variables globales */
/* Se inicialzia una variable que contiene el boton del carrito */
const carroBtn = document.getElementById('carro'); 
/* Se selecciona todos los botones de lso productos */
const btnProducts = document.querySelectorAll(".product");
/* Se le agrega un evento a cada producto */
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
    showTotalValue();
    // Ocultar el modal del carrito cuando se hace clic en el botón de cierre
    closeCartBtn.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

});

/* Funciónes para el carrito de compras */
function addProduct() {
    /* Esta función e ejecuta una vez se oprime un boton de añadir al carrito */
    /*console.log(this.id) */
    const nameProduct = this.id;
    /* Se extrae las llaves del objeto itemsCart  */
    const keysProductsCart = Object.keys(itemsCart);


    /* Si el prodcuto ya se encuentra en el local storage solo se actualiza la cantidad y el valor */
    if (keysProductsCart.includes(nameProduct)) {
        /* Se define la propeidad cantidad */
        let cantidad = itemsCart[nameProduct].cantidad ?? 0;
        /* Valor total según la cantidad de productos */
        let valor = parseFloat(products[nameProduct].valor)
        

        /* Se establece nueva cantidad  con el valor que está adentro del objeto del producto */
        itemsCart[nameProduct].cantidad = cantidad + 1;
        /* Se establece nuevo valor multiplicando la cantidad del mismo producto proel valor unitario */
        valor = ((cantidad + 1) * valor);

        /* Se asigna nuevo valor según su cantidad*/
        itemsCart[nameProduct].valor = valor

        /* console.log(formatNumber(valor)) */
        /* Se persiste en el local storage */
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
        console.log(itemsCart);
        plusProductsCart(1);

    } else {
        /* Si el prodcuto no se encuentra en el local storage, se asigna la propeidad con el nombre del producto
        y se asigna las propeidades de cantidad y valor a itemsCart */
        let valor = parseFloat(products[nameProduct].valor)
        /* Se añade uno al carrito */
        let cantidad = 1;
        /* S */
        itemsCart[nameProduct] = {};
        itemsCart[nameProduct]["cantidad"] = cantidad;
        itemsCart[nameProduct]["valor"] = valor
        /* Se persiste en el local storage */
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
        console.log(itemsCart);
        plusProductsCart(1);
    }
}



function showCartItems(){
    /* Funcion que pinta todos lso productos seleccionados en el carrito */
    const cartContent = document.querySelector(".cart-content");
    const cartItems = document.querySelector(".cart-items")
    let html = "";
    const closeCartBtn = document.getElementById('cardButton-close');
    for (let productItem in itemsCart) {
        html += `
        <div class="shopcart-item">
            <img class="shopproduct__image" src="${products[productItem].img}" alt="Producto">
            <div class="shopproduct-details">
                <h3>${products[productItem].titulo}</h3>
                <p>${products[productItem].descripcion}</p>
                <p>Cantidad: ${itemsCart[productItem].cantidad}</p>
                <p>Precio unitario: $${formatNumber(products[productItem].valor)}</p>
                <p>Total: $${formatNumber(itemsCart[productItem].valor)}</p>
            </div>
        </div>`;
        /* html += `<img src="${products[productItem].img}" alt="">
        <div>
            <h3>${products[productItem].descripcion}</h3>
            <p>Precio: ${products[productItem].precio}</p>
            <p>Cantidad: ${itemsCart[productItem].valor}</p>
        </div>`; */
    }
    cartItems.innerHTML = html
    return
}
 
function showTotalValue() {
    const totalValueDom = document.querySelector(".total-value");
    let totalValue = 0;
    for (let product in itemsCart) {
        totalValue +=  itemsCart[product].valor;
    }
    totalValueDom.textContent = formatNumber(totalValue);
    return
}

function loadNumberCart() {
    const numItems = document.querySelector(".num-items");
    let quantityTotal = 0;
    for (let product in itemsCart) {
        quantityTotal +=  itemsCart[product].cantidad;
    }
    numItems.textContent = quantityTotal;
    return
}


function plusProductsCart(value) {
    /* Numero de productos dentro del shopping cart */
    const numItems = document.querySelector(".num-items");
    let numProductsCart = parseInt(numItems.textContent);
    /* Hacer operacion */
    numProductsCart = numProductsCart + value;
    console.log(numProductsCart)
    /* Asignar neuvo valro al centenedor */
    numItems.textContent = numProductsCart;
    return
}
/* Aquí terminan las funciónes para el carrito de compras */




/* module.exports = datos; //Especificar valroes del objeto */

/*  localStorage.setItem("categorias", JSON.stringify(categorias)); */

/* localStorage.removeItem("itemsCart"); */

function formatNumber(number) {
    /* Funcion que se encarga de poner los puntos en el numero */
    const formattedNumber =  new Intl.NumberFormat('de-DE').format(number)
    return formattedNumber;
}

/* localStorage.removeItem("itemsCart"); */

