const presentacionCarrito = () => {
  contenedorVentanaEmergente.innerHTML = "";
  contenedorVentanaEmergente.style.display = "flex";
  verCarrito.style.display = "none";
  const HeaderVentana = document.createElement("div");
  HeaderVentana.className = "header-ventana";
  HeaderVentana.innerHTML = `<h1 class = "header-ventana-titulo">Carrito</h1>`;
  contenedorVentanaEmergente.append(HeaderVentana);

  const botonCerrarVentana = document.createElement("h1");
  botonCerrarVentana.innerText = "Seguir comprando";
  botonCerrarVentana.className = "finalizar-compra";
  HeaderVentana.append(botonCerrarVentana);

  botonCerrarVentana.addEventListener("click", () => {
    contenedorVentanaEmergente.style.display = "none";
    verCarrito.style.display = "flex";
  });

  carrito.forEach((bienes) => {
    let contenedorCarrito = document.createElement("div");
    contenedorCarrito.className = "contenedor-carrito";
    contenedorCarrito.innerHTML = `
      <img src="${bienes.Img}">
      <h3 class="nombre-producto">${bienes.nombre}</h3>
      <p> $ ${bienes.precio}</p>
      <span class="restar-cantidad"> ➖</span> 
      <p>cantidad: ${bienes.cantidad} </p>
      <span class="sumar-cantidad">➕ </span>
      <p>Total: $ ${(bienes.cantidad * bienes.precio).toFixed(2)}</p>
      <span class="eleminar-producto-de-carrito"> ❌ </span>`;
    contenedorVentanaEmergente.append(contenedorCarrito);

    let restarCantCarrito = contenedorCarrito.querySelector(".restar-cantidad");
    restarCantCarrito.addEventListener("click", () => {
      if (bienes.cantidad !== 1) {
        bienes.cantidad--;
        swal("Se ha restado una unidad");
      }
      guardarEnLocal();
      presentacionCarrito();
    });

    let sumarCantCarrito = contenedorCarrito.querySelector(".sumar-cantidad");
    sumarCantCarrito.addEventListener("click", () => {
      bienes.cantidad++;
      guardarEnLocal();
      presentacionCarrito();
      swal("Se ha sumado una unidad");
    });

    let eliminarProductoDeCarrito = contenedorCarrito.querySelector(
      ".eleminar-producto-de-carrito"
    );
    eliminarProductoDeCarrito.addEventListener("click", () => {
      eliminarProducto(bienes.id);
      swal(
        "Producto eliminado",
        "El producto se eliminara del carrito",
        "success"
      );
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const compraTotal = document.createElement("div");
  compraTotal.className = "compra-total";
  compraTotal.innerHTML = `Total a pagar: $ ${total.toFixed(2)}`;
  contenedorVentanaEmergente.append(compraTotal);

  const botonFinalizarCompra = document.createElement("button");
  botonFinalizarCompra.id = "finalizarCompra";
  botonFinalizarCompra.className = "finalizar-compra";
  botonFinalizarCompra.innerHTML = "Finalizar compra";
  HeaderVentana.append(botonFinalizarCompra);
  if (carrito != 0) {
    botonFinalizarCompra.addEventListener("click", () => {
      habilitarFinalizarCompra();
    });
  }
  const habilitarFinalizarCompra = () => {
    contenedorVentanaEmergente.style.display = "none";
    contenedorVentanaEmergente2.innerHTML = "";
    contenedorVentanaEmergente2.style.display = "flex";
    verCarrito.style.display = "none";

    const HeaderVentana = document.createElement("div");
    HeaderVentana.className = "header-ventana";
    const inputNumTarjCr = document.createElement("input");
    inputNumTarjCr.id = "numeroTarjetaCredito";
    inputNumTarjCr.className = "numero-tarjeta-credito";
    inputNumTarjCr.placeholder = "Numero de su tarjeta";

    const inputVencimientoTarjCr = document.createElement("input");
    inputVencimientoTarjCr.id = "vencimientoTarjetaCredito";
    inputVencimientoTarjCr.className = "vencimiento-tarjeta-credito";
    inputVencimientoTarjCr.placeholder = "THRU";
    const inputCVC = document.createElement("input");
    inputCVC.id = "cvc";
    inputCVC.className = "c-v-c";
    inputCVC.placeholder = "CVC";
    HeaderVentana.innerHTML = `
      <h3 class="header-ventana-titulo">
      Resumen de compra n°: ${Math.random()}
    </h3>
        <h2 class = "total-compra-modal2">Total de compra: $ ${total.toFixed(
          2
        )}</h2>`;
    contenedorVentanaEmergente2.append(HeaderVentana);
    HeaderVentana.append(inputNumTarjCr);
    HeaderVentana.append(inputVencimientoTarjCr);
    HeaderVentana.append(inputCVC);
    var cleave = new Cleave("#numeroTarjetaCredito", {
      creditCard: true,
    });
    var cleave = new Cleave("#vencimientoTarjetaCredito", {
      date: true,
      datePattern: ["m", "y"],
    });
    var cleave = new Cleave("#cvc", {
      delimiter: "·",
      blocks: [3],
      uppercase: true,
    });
    const botonPagar = document.createElement("button");
    botonPagar.innerText = "Pagar";
    botonPagar.className = "finalizar-compra";
    HeaderVentana.append(botonPagar);
    botonPagar.addEventListener("click", () => {
      contenedorVentanaEmergente2.style.display = "none";
      verCarrito.style.display = "flex";

      limpiarLocalStorage();
    });

    let carroEnLocalStorage = JSON.parse(localStorage.getItem("carro"));
    carroEnLocalStorage.forEach((element) => {
      let contenedorCarrito = document.getElementById(
        "contenedorVentanaEmergente2"
      );
      let div = document.createElement("div");
      div.className = "contenedor-carrito";
      div.innerHTML = `Producto:
        <h3 class="nombre-producto"> ${
          element.nombre
        }</h3> <p>Precio unitario $ ${element.precio}</p> <p>Cantidad: ${
        element.cantidad
      } </p> <p>Total: $ ${(element.cantidad * element.precio).toFixed(2)}</p>
          `;
      contenedorCarrito.appendChild(div);
    });
  };
};

verCarrito.addEventListener("click", presentacionCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((Elemento) => Elemento.id === id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  contadorCarrito();
  guardarEnLocal();
  presentacionCarrito();
};

const contadorCarrito = () => {
  cantidadCarrito.style.display = "block";
  const longitudCarrito = carrito.length;
  localStorage.setItem("carroLength", JSON.stringify(longitudCarrito));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carroLength"));
};
contadorCarrito();

const limpiarLocalStorage = () => {
  carrito.length = 0;
  contadorCarrito();
  guardarEnLocal();
};
