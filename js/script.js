/* const datos = require('./products.js'); */
/* Se importa el objeto que actua como base de datos de los productos */
import { products } from "./products.js";



/* Se inicializa itemsCart con el valor guardado en el localstorage, sino, se inicializa como un objeto vacio */
let itemsCart = JSON.parse(localStorage.getItem("itemsCart"))
                ??
                {}


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
/* Se selecciona el boton para borrar carrito */
const btnEmpty = document.getElementById("cardButton-empty");
/* Se le agrega un evento a cada producto */
btnProducts.forEach((btn) => {
    btn.addEventListener("click", addProduct)
 })


// Mostrar el modal del carrito cuando se hace clic en el botón del carrito
carroBtn.addEventListener('click', function () {
    /* Se selecciona el contenedor que se encuentra oculto */
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('cardButton-close');
    /* Se quita el oculto de contenedor */
    cartModal.style.display = 'block';
    /* Mostrar-pintar items en el carrito */
    showCartItems();
    /* Mostrar-Pintar valor total */
    showTotalValue();
    // Ocultar el modal del carrito cuando se hace clic en el botón de cierre
    closeCartBtn.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

});

/* Evento que se dispara cuando se da click a boton vaciar carrito */
btnEmpty.addEventListener('click', function () {
    /* Se selecciona contenedor con los carts */
    const cartItems = document.querySelector(".cart-items");
    /* Se vacia contenedor */
    cartItems.innerHTML = " ";
    /* Se reinicia el objeto con los productos del carrito */
    itemsCart = {}
    /* Se persiste en el local storage */
    localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
    /* Se recarga el valor de items en el carrito */
    loadNumberCart();
    /* Se recarga el valor total del carrito */
    showTotalValue();
})

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
        itemsCart[nameProduct].valor = valor;

        /* console.log(formatNumber(valor)) */
        /* Se persiste en el local storage */
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
        /* Actualizar numero de items en el carrito */
        plusProductsCart(1);

    } else {
        /* Si el prodcuto no se encuentra en el local storage, se asigna la propeidad con el nombre del producto
        y se asigna las propeidades de cantidad y valor a itemsCart */
        let valor = parseFloat(products[nameProduct].valor)
        /* Se añade uno al carrito */
        let cantidad = 1;
        /* Se crea nuevo objeto dentro de itemsCart*/
        itemsCart[nameProduct] = {};
        itemsCart[nameProduct]["cantidad"] = cantidad;
        itemsCart[nameProduct]["valor"] = valor;
        /* Se persiste en el local storage */
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
         /* Actualizar numero de items en el carrito */
        plusProductsCart(1);
    }
}



function showCartItems(){
    /* Funcion que pinta todos los productos seleccionados en el carrito */
    /* Se selecciona el contenedor de los items del carrito de compras  */
    const cartItems = document.querySelector(".cart-items");
    /* Inicialziar cotenido html donde se podnrán lso carts */
    let html = "";
    /* For para recorrer las propeidades del objeto itemsCart */
    for (let productItem in itemsCart) {
        /* Se acumulan todos carts */
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
    /* Se añaden los carts al carrito */
    cartItems.innerHTML = html;
    return
}
 
function showTotalValue() {
    /* Esta funcion se encarga de pintar el valor total en el carrito */
    const totalValueDom = document.querySelector(".total-value");
    let totalValue = 0;
    /* Se inicialzia un for que sumará todos lso valores */
    for (let product in itemsCart) {
         /* Se acumula el valor de todos los productos (total) */
        totalValue +=  itemsCart[product].valor;
    }
    /* Se agrega al valor total con formato español */
    totalValueDom.textContent = formatNumber(totalValue);
    return
}

function loadNumberCart() {
    /* Funcion encargada de cargar el numero de productos dentro del carrito */
    const numItems = document.querySelector(".num-items");
    let quantityTotal = 0;
    for (let product in itemsCart) {
        /* Se acumula el numero de items por cada producto */
        quantityTotal +=  itemsCart[product].cantidad;
    }
    numItems.textContent = quantityTotal;
    return
}


function plusProductsCart(value) {
    /* Funcion encargada de sumar el numero de productos dentro del carrito con lso valores actuales */
    /* Numero de productos dentro del shopping cart */
    const numItems = document.querySelector(".num-items");
    let numProductsCart = parseInt(numItems.textContent);
    /* Hacer operacion que sumará el numero de productos actual con value */
    numProductsCart = numProductsCart + value;
    /* Asignar nuevo valro al centenedor */
    numItems.textContent = numProductsCart;
    return
}


/* Aquí terminan las funciónes para el carrito de compras */



function formatNumber(number) {
    /* Funcion que se encarga de poner los puntos en el numero */
    const formattedNumber =  new Intl.NumberFormat('de-DE').format(number);
    return formattedNumber;
}

/* localStorage.removeItem("itemsCart"); */

