// ---VARIABLES---//
// ---VARIABLES---//

// ---FUNCIONES---//
function retrieveData () {
    fetch("http://localhost/e-commerce/server/productos")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        // data = data[0];
        // console.log(data);
        const divDatos = document.getElementById("datos");

        data.map((producto => {
          // --------------------------------//
          const div = document.createElement("div");
          const col = document.createElement("div");
          col.className += "col l3 m6 s12"
          div.className += "card " + "sticky-action" 
          const imgContent = document.createElement("div")
          imgContent.className += "card-image waves-effect waves-block waves-light"
          const img = document.createElement("img");
          img.src = "img/fondo.svg";
          img.className = "activator responsive-img";
          imgContent.appendChild(img)
          // --------------------------------//
          const cardContent = document.createElement("div")
          const spanTitle = document.createElement("span")
          const i = document.createElement("i")
          const precio = document.createElement("p");
          cardContent.className += "card-content"
          spanTitle.className += "card-title activator grey-text text-darken-4"
          i.className += "material-icons right"
          spanTitle.innerText= producto.titulo
          i.innerText = "more_vert"
          precio.innerText = producto.precio
          cardContent.appendChild(spanTitle)
          cardContent.appendChild(i)
          cardContent.appendChild(precio)
          // --------------------------------//
          const revealContent = document.createElement("div")
          const spanReveal = document.createElement("span")
          const iReveal = document.createElement("i")
          const descripcion = document.createElement("p")
          revealContent.className += "card-reveal"
          spanReveal.className += "card-title grey-text text-darken-4"
          iReveal.className += "material-icons right"
          spanReveal.innerText = producto.titulo
          iReveal.innerText = "close"
          descripcion.innerText = producto.descripcion
          spanReveal.appendChild(iReveal)
          revealContent.appendChild(spanReveal)
          revealContent.appendChild(descripcion)
          // --------------------------------//
          const actionContent = document.createElement("div")
          const btnCart = document.createElement("a")
          const btnProducto = document.createElement("a")
          const iCart = document.createElement("i")
          actionContent.className += "card-action"
          btnCart.className += "waves-effect waves-light btn"
          btnProducto.className += "waves-effect waves-light btn"
          iCart.className += "material-icons left"
          btnProducto.innerText = "Ver"
          btnCart.innerText = "Carrito"
          iCart.innerText = "shop"
          btnCart.setAttribute("onclick", `agregarCarrito(${producto.id_producto})`)
          btnProducto.href = `producto/vistaProducto.html?id=${producto.id_producto}`
          btnCart.appendChild(iCart)
          actionContent.appendChild(btnCart)
          actionContent.appendChild(btnProducto)


          div.appendChild(imgContent);
          div.appendChild(cardContent)
          div.appendChild(revealContent);
          div.appendChild(actionContent)
          col.appendChild(div)
          divDatos.appendChild(col);

        }))
      });
  };
  // ---FUNCIONES---//

  // ---EVENTOS---//
  document.addEventListener("DOMContentLoaded", function (event) {
    retrieveData();    
  });
// ---EVENTOS---//
