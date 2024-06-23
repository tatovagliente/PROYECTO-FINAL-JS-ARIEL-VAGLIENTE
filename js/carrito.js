const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => modalContainer.style.display = "none");
    modalHeader.append(modalButton);

    carrito.forEach(producto => {
        const carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${producto.imagen}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>SubTotal: ${producto.precio * producto.cantidad}</p>
            <span class="delete-product">❌</span>
        `;
        modalContainer.append(carritoContent);

        const eliminarButton = carritoContent.querySelector(".delete-product");
        eliminarButton.addEventListener("click", () => eliminarProducto(producto.id));
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const compraTotal = document.createElement("div");
    compraTotal.className = "total-content";
    compraTotal.style.display = "flex";
    compraTotal.style.justifyContent = "space-evenly";
    compraTotal.style.alignItems = "center";
    compraTotal.style.width = "100%";
    compraTotal.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(compraTotal);

    const vaciarButton = document.createElement("button");
    vaciarButton.innerText = "VACIAR CARRITO";
    vaciarButton.className = "vaciar-button";
    const vaciarButtonStyles = {
        marginRight: "20px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        borderRadius: "5px"
    };
    Object.assign(vaciarButton.style, vaciarButtonStyles);

    vaciarButton.addEventListener("click", () => {
        carrito = [];
        localStorage.removeItem("carritoLocal");
        carritoCounter();
        pintarCarrito();
    });

    compraTotal.prepend(vaciarButton);

    const comprarButton = document.createElement("button");
    comprarButton.innerText = "COMPRAR";
    comprarButton.className = "comprar-button";
    const comprarButtonStyles = {
        marginLeft: "20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        borderRadius: "5px",
    }
    Object.assign(comprarButton.style, comprarButtonStyles);

    comprarButton.addEventListener("click", () => {
        alert(`Gracias por tu compra. El total a pagar es de: $${total}`);
        carrito = [];
        localStorage.removeItem("carritoLocal");
        carritoCounter();
        pintarCarrito();
    });

    compraTotal.append(comprarButton);
};

const eliminarProducto = (id) => {
    carrito = carrito.filter(producto => producto.id !== id);
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

function carritoCounter ()  {
    cantidadCarrito.style.display = carrito.length ? "block" : "none";
    cantidadCarrito.innerText = carrito.length;
    localStorage.setItem("carritoSacar", JSON.stringify(carrito.length));
};


verCarrito.addEventListener("click", pintarCarrito);
