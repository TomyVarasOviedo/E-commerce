// ---VARIABLES---//
let menu = document.getElementById('menu')
let menuMobile = document.getElementById('mobile-demo')
let menuCategoria 
let containerBody = document.getElementById("container")
let galeria = document.querySelector('.galeria')
let galeriaUl = document.querySelector('#img-gallery ul')
let usuario = 1
// let datos = await categorias()
// ---VARIABLES---//

// ---FUNCIONES---//
let categorias = async()=>{
  fetch("http://localhost/e-commerce/server/categorias")
  .then(res=>res.json())
  .then(respuesta=>{
    menuCategoria = respuesta.filter(categoria=>categoria.id_categoria <= 3)
  })
  // navbarCategorias()
  // secciones()
  return new Promise((resolve, reject)=>{
    resolve(menuCategoria)
    reject()
  })
}
let navbarCategorias = async()=>{
  let datosNav = await categorias()
  // console.log(datosNav)
    datosNav.forEach(categoria => {
      menu.innerHTML += `<li><a href="#${categoria.nombre}" data-categoria="${categoria.id_categoria}">${categoria.nombre}</a></li>`
      menuMobile.innerHTML += `<li><a class="sidenav-close" href="#${categoria.nombre}" data-categoria="${categoria.id_categoria}">${categoria.nombre}</a></li>`
    });
    menuMobile.innerHTML += "<li><a href='#img-gallery' class='sidenav-close' >Galeria</a></li>"
    menu.innerHTML += "<li><a href='#img-gallery'>Galeria</a></li>"
    menu.innerHTML += "<li><a href='carrito/carrito.html?usuario=1'><i class='material-icons small'>shopping_cart</i></a></li>"
}
let secciones = async()=>{
   await categorias().then(resolve=>{
    //  console.log(resolve)
     resolve.forEach(seccion=>{
       fetch(`http://localhost/e-commerce/server/producto-categoria/${seccion.id_categoria}`)
       .then(res=>res.json())
       .then(respuesta=>{
        if (respuesta.lenght != 0) {
         const section = document.createElement('section');
         const container = document.createElement('div');
         const h1Categoria = document.createElement('h1');
         const row = document.createElement('div');
         section.className = "section"
        //  container.className = "container"
         row.className = "row"
         h1Categoria.innerText = respuesta[0].categoria
         section.setAttribute("id", respuesta[0].categoria)
         row.appendChild(h1Categoria)
         container.appendChild(row)
         section.appendChild(container)
         containerBody.appendChild(section)
        //  ----------------------------------//
          respuesta.forEach(producto=>{
            const div = document.createElement("div");
            const col = document.createElement("div");
            col.className += "col xl3 l4 m6 s12"
            div.className += "card " + "sticky-action" 
            const imgContent = document.createElement("div")
            imgContent.className += "card-image waves-effect waves-block waves-light img"
            const img = document.createElement("img");
            img.src = `img/${producto.imagen}`;
            img.className = "activator responsive-img img";
            imgContent.appendChild(img)
            // --------------------------------//
            const cardContent = document.createElement("div")
            const spanTitle = document.createElement("span")
            const precio = document.createElement("p");
            cardContent.className += "card-content"
            spanTitle.className += "card-title activator grey-text text-darken-4"
            precio.className += "precio"
            spanTitle.innerText= producto.titulo
            precio.innerText = producto.precio
            cardContent.appendChild(spanTitle)
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
            btnCart.setAttribute("onclick", `agregarCarrito(${producto.id_producto}, ${usuario})`)
            btnProducto.href = `producto/index.html?id=${producto.id_producto}`
            btnCart.appendChild(iCart)
            actionContent.appendChild(btnCart)
            actionContent.appendChild(btnProducto)


            div.appendChild(imgContent);
            div.appendChild(cardContent)
            div.appendChild(revealContent);
            div.appendChild(actionContent)
            col.appendChild(div)
            row.appendChild(col)
          })
        }
      })
     })
   })
}
let cerrarNavbar = ()=>{
  var elems = document.querySelectorAll('.sidenav');
  var instance = M.Sidenav.getInstance(elems);
  instance.close()
}
let agregarCarrito =(id_producto, usuario)=>{
  let form = new FormData()
  form.set("usuario", usuario)
  form.set("producto", id_producto)
  fetch("http://localhost/e-commerce/server/carrito-agregar",
  {
    method: "POST",
    body: form
  }).then(res=>res.json())
  .then(respuesta=>{
    console.log(respuesta)
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      iconColor: '#fff',
      background: 'var(--color-principal)',
      padding: '2em',
      title: 'Agregado al Carrito',
      width: '35em',
      customClass:{
        title:'titulo-carrito'
      }
    })
  })
  console.log(id_producto, usuario)
}
let pintarGaleria = async()=>{
  let productosArray
  await categorias().then(resolve=>{
    resolve.forEach(categoria=>{
      let nombreCategoria = categoria.nombre.split(" ", 1)
      const li = document.createElement('li')
      li.setAttribute("data-filter", `${nombreCategoria}`)
      li.innerText = `${categoria.nombre}`
      galeriaUl.appendChild(li)
      filtrarGaleria()
      fetch(`http://localhost/e-commerce/server/producto-categoria/${categoria.id_categoria}`)
      .then(res=>res.json())
      .then(respuesta=>{
        
        if (respuesta.length != 0) {
          respuesta.forEach(producto=>{
            const containerImg = document.createElement("div")
            const img = document.createElement("img")
            // -------------***-------------//
            containerImg.className += `itemBox ${producto.categoria} img`
            img.src = `img/${producto.imagen}`
            // -------------***-------------//
            containerImg.appendChild(img)
            galeria.appendChild(containerImg)
          })
        }
      })
    })
  })
}
  // ---FUNCIONES---//

  // ---EVENTOS---//
  document.addEventListener("DOMContentLoaded", function (event) {
      categorias()
      setTimeout(() => {
        navbarCategorias()
        secciones()
        pintarGaleria()
      }, 1000);   
  });
// ---EVENTOS---//

// ---JQUERY---//
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()>1) {
      $("nav").addClass('sticky');	
    } else {
    $("nav").removeClass('sticky');
    }
  })
});
let filtrarGaleria =()=>{
  $('#img-gallery .row ul li').click(function() {
    const value = $(this).attr('data-filter');
    if(value == 'all'){
        $('.itemBox').show(1000);
    }
    else{
       $('.itemBox').not('.' + value).hide(100);
       $('.itemBox').filter('.' + value).show(100);
    }
  })
}

$('*').mousedown(function (e) {  
  if (e.which == 3) {
    Swal.fire({
      icon: 'error', 
      title: '¿Que haces pa?',
      text: 'Queres robarte la imagen rata tacaña'
    })
    $(document).bind("contextmenu" , function (e) {
      return false
    })
  }
})
// ---JQUERY---//

