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

console.log("la catid es: " + localStorage.catID);
console.log("el usr logeado es: " +localStorage.usrName);

let nombre = document.getElementById("usr-name");
nombre.innerHTML = localStorage.usrName;


//quiero ver que al cerrar la pestaña borre la info del usuario logeado y luego una funcion que pregunte si el
//usuario guardado es distinto a undefined le de ingreso sino muestre una ventana que redirija a logearse
/*window.addEventListener("onbeforeunload",function(evento)
{ localStorage.removeItem("usrName");
});*/

/*window.onbeforeunload = preguntarAntesDeSalir;

function preguntarAntesDeSalir(){
return "¿Seguro que quieres salir?";
};*/