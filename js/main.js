const containerProductos = document.getElementById("containerProductos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carritoLocal")) || [];

const obtenerProductos = () => {
    return new Promise((resolve, reject) => {
        fetch('./js/productos.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject('Hubo un problema en la red 💢');
                }
            })
            .then(productos => {
                setTimeout(() => {
                    resolve(productos);
                }, 1500);
            })
            .catch(error => {
                console.error('Oops, algo salio mal ❌', error);
                reject([]);
            });
    });
};

const renderProductos = () => {
    obtenerProductos()
        .then(productos => {
            productos.forEach(producto => {
                const content = document.createElement("div");
                content.className = "card";
                content.innerHTML = `
                    <img src="${producto.imagen}">
                    <h3>${producto.nombre}</h3>
                    <p class="price">$${producto.precio}</p>
                    <button class="comprar">Comprar</button>
                `;
                containerProductos.append(content);

                const comprarButton = content.querySelector(".comprar");
                comprarButton.addEventListener("click", () => {
                    agregarAlCarrito(producto);
                    Toastify({
                        text: "Producto agregado a tu Carrito",
                        duration: 3500,
                        newWindow: true,
                        close: true,
                        gravity: "bottom",
                        position: "center",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                    }).showToast();
                });
            });
        })
        .catch(error => {
            console.error('Hubo un error al cargar los productos:', error);
        });
};


const agregarAlCarrito = (producto) => {
    const item = carrito.find(item => item.id === producto.id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            imagen: producto.imagen,
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }
    carritoCounter();
    saveLocal();
};

const saveLocal = () => {
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
};

renderProductos();
carritoCounter();
