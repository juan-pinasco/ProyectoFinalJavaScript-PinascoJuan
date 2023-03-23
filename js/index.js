const mainContenido = document.getElementById("mainContenido");

const verCarrito = document.getElementById("verCarrito");

const contenedorVentanaEmergente = document.getElementById(
  "contenedorVentanaEmergente"
);

const contenedorVentanaEmergente2 = document.getElementById(
  "contenedorVentanaEmergente2"
);

const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carro")) || [];

const getProductos = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const res = await data.json();

  res.forEach((bienes) => {
    let contenidoDeCadaUnaDeLasCards = document.createElement("div");
    contenidoDeCadaUnaDeLasCards.className = "card";
    contenidoDeCadaUnaDeLasCards.innerHTML = `
    <img src="${bienes.image}">
    <h3>${bienes.title}</h3>
    <p class="precio">$ ${bienes.price}</p>`;

    mainContenido.append(contenidoDeCadaUnaDeLasCards);

    let botonComprar = document.createElement("button");
    botonComprar.innerText = `Comprar`;
    botonComprar.className = `boton-comprar`;

    contenidoDeCadaUnaDeLasCards.append(botonComprar);

    botonComprar.addEventListener("click", () => {
      swal({
        title: "¿Esta seguro que desea comprar este producto?",
        text: "Este producto se agregara al carrito, señalizado en la parte superior a su derecha",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const repetido = carrito.some(
            (productoRepetido) => productoRepetido.id === bienes.id
          );
          repetido
            ? carrito.map((prod) => {
                prod.id === bienes.id && prod.cantidad++;
              })
            : carrito.push({
                id: bienes.id,
                nombre: bienes.title,
                precio: bienes.price,
                Img: bienes.image,
                cantidad: (bienes.cantidad = 1),
              });
          contadorCarrito();
          guardarEnLocal();
          swal("Productucto agregado", {
            icon: "success",
          });
        } else {
          swal("Compra cancelada", {
            icon: "error",
          });
        }
      });
    });
  });
};

getProductos();

const guardarEnLocal = () => {
  localStorage.setItem("carro", JSON.stringify(carrito));
};
