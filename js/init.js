const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
let LIST_URL = PRODUCTS_URL+localStorage.catID+EXT_TYPE;//Busco los datos de la categoria segun la info de localstorage que es autos

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//console.log("la catid es: " + localStorage.catID);
//console.log("el usr logeado es: " +localStorage.usrName);

function logout(){
  localStorage.removeItem("usrName");
  console.log("algo");

}

document.addEventListener("DOMContentLoaded",function(e){
  let nombre = localStorage.usrName;
  let htmlconenido = ` <div class="dropdown">
  <a class="nav-item" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${nombre}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
    <li><a class="dropdown-item" id="cerrar" href="index.html" onclick="logout()">Cerrar Sesión</a></li>
  </ul>
</div>` ;

document.getElementById("usr-name").innerHTML = htmlconenido;

});

document.addEventListener("DOMContentLoaded",function(e){
  if (localStorage.usrName == undefined){
    alert("Debe ingresar sesión");
    window.location="index.html";
  }
});


