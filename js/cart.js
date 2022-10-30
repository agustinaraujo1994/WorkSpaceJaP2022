const CART_URL = CART_INFO_URL+"25801.json"
let cartArray = [];
let contTitCart = document.getElementById("contenedor-cart-tit");
let contCart = document.getElementById("contenedor-cart");
let htmlContenido = "";
let valorcheck = 3;

function eliminarArticuloCarrito(elemento){
  cartArray.articles.splice(elemento,1);
  localStorage.setItem("arrayCarrito",JSON.stringify(cartArray)) 
  cartArray = JSON.parse(localStorage.arrayCarrito)
  mostrarCarrito(cartArray);
  mostrarCosto(cartArray);

  document.getElementById("body-tabla").addEventListener("input",function(e){
    for  (let j=0;j<cartArray.articles.length;j++){
    let cantidadIngresada = document.getElementsByClassName("cantidad")[j].value;
    cartArray.articles[j].count= parseFloat(cantidadIngresada);
    localStorage.setItem("arrayCarrito",JSON.stringify(cartArray))
    cartArray = JSON.parse(localStorage.arrayCarrito)
    document.getElementsByClassName("valor-total")[j].innerHTML = cartArray.articles[j].currency +" "+ cantidadIngresada*cartArray.articles[j].unitCost;
    
  };
  
  mostrarCosto(cartArray);
  validaCantidad()
  
  });

};

//Funcion que muestra el carrito de compra
function mostrarCarrito(array){
    contTitCart.innerHTML="<br><h2>Carrito de Compras</h2><br><h4>Artículos a Comprar</h4>"
    htmlContenido = "";
    htmlContenido += `<table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Costo</th>
        <th scope="col">Cantidad</th>
        <th scope="col">SubTotal</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody id="body-tabla">`;
     for (let i=0;i<array.articles.length;i++){
       htmlContenido += `<tr>
        <th scope="row"><img class="img-art-cart" src="`+array.articles[i].image+`"></th>
        <td>`+array.articles[i].name+`</td>
        <td>`+array.articles[i].currency+` `+array.articles[i].unitCost+`</td>
        <td><input type="text" class="cantidad"></td>
        <td class="valor-total"></td>
        <td><input type="button" name="eliminar" value="Eliminar" id="eliminar-articulo" onclick="eliminarArticuloCarrito(`+i+`)"></td>
      </tr>`};
        htmlContenido += `</tbody>  </table>`;
    contCart.innerHTML = htmlContenido;

    let valorTotFilaTabla= document.getElementsByClassName("valor-total");
    let cantidadTotFilaTabla = document.getElementsByClassName("cantidad");
    for (let i=0;i<array.articles.length;i++){
      let costoinicial = array.articles[i].unitCost*array.articles[i].count;
      valorTotFilaTabla[i].innerHTML = "USD "+costoinicial;
      cantidadTotFilaTabla[i].value = array.articles[i].count;

    };
    
};

function mostrarCosto(array){
  let costoTotal = 0;
  for (i=0;i<array.articles.length;i++){
    let cantidadIngresada = document.getElementsByClassName("cantidad")[i].value;
    costoTotal += cantidadIngresada*array.articles[i].unitCost
  }; 
  
  for (i=0;i<3;i++){
    if (document.getElementsByClassName("check-radio")[i].checked){
      valorcheck = document.getElementsByClassName("check-radio")[i].value;
    };
  };

  if (valorcheck == 3){
    document.getElementById("alerta-envio").innerHTML = `<p style="color:red" >Debe seleccionar un tipo de envio</p>`
    } else {
      document.getElementById("alerta-envio").innerHTML ="<p></p>"
      document.getElementById("lista-costos-total").innerHTML = "USD "  + costoTotal;  
      let costoTotalSuma = Math.round(valorcheck*costoTotal)+costoTotal;
      document.getElementById("lista-costos-envio").innerHTML = "USD " + Math.round(valorcheck*costoTotal);
      document.getElementById("lista-costos-suma").innerHTML="USD " + Math.round(costoTotalSuma);
    };
  
};


document.getElementById("tipo-envio").addEventListener("click",function(e){

    mostrarCosto(JSON.parse(localStorage.arrayCarrito));

});

function validaCheckEnvio(){
  return (valorcheck!=3);
};


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data;
            if (localStorage.arrayCarrito == undefined)
            {localStorage.setItem("arrayCarrito",JSON.stringify(cartArray))} 
            
            cartArray = JSON.parse(localStorage.arrayCarrito);
            mostrarCarrito(cartArray); 
        };      


        document.getElementById("body-tabla").addEventListener("input",function(e){
          for  (let j=0;j<cartArray.articles.length;j++){
          let cantidadIngresada = document.getElementsByClassName("cantidad")[j].value;
          cartArray.articles[j].count= parseFloat(cantidadIngresada);
          localStorage.setItem("arrayCarrito",JSON.stringify(cartArray))
          cartArray = JSON.parse(localStorage.arrayCarrito)
          document.getElementsByClassName("valor-total")[j].innerHTML = cartArray.articles[j].currency +" "+ cantidadIngresada*cartArray.articles[j].unitCost;
        };
        mostrarCosto(cartArray);
        validaCantidad()
      
      });
    });
  
});

function validacionModal(){

document.getElementById("forma-pago").addEventListener("click",function(e){

 if (document.getElementById("tarjeta-credito").checked){
  document.getElementById("num-cuenta").disabled = true;
  document.getElementById("num-tarjeta").disabled = false;
  document.getElementById("cod-seguridad").disabled = false;
  document.getElementById("vencimiento").disabled = false;
 };

 if (document.getElementById("transferencia").checked){
  document.getElementById("num-tarjeta").disabled = true;
  document.getElementById("cod-seguridad").disabled = true;
  document.getElementById("vencimiento").disabled = true;
  document.getElementById("num-cuenta").disabled = false;
 };


  if (validaFormaPago()){document.getElementById("alerta-forma-pago").innerHTML = `<p style="color: green;" >Forma de pago seleccionada correctamente</p>`};

});

document.getElementById("forma-pago").addEventListener("input",function(e){
  validaFormaPago();
});

};


document.getElementById("btn-forma-pago").addEventListener("click",function(e){
  e.preventDefault();
});

function textValidate(field){
  let myField = document.getElementById(field);
  if (myField.value !== ""){
      //si no esta vacío
      myField.classList.remove("is-invalid");
      myField.classList.add("is-valid");
      return true;
  } else {
      //si esta vacío
      myField.classList.remove("is-valid");
      myField.classList.add("is-invalid");
      document.getElementById(`feedback${field}`).removeAttribute("hidden");
      return false;
  }
};

function validaCantidad(){
  let validacionCantidad = true;
  for (i=0;i<cartArray.articles.length;i++){
    if (cartArray.articles[i].count==0){
      validacionCantidad = false;
    };
  };

  if (!validacionCantidad){
    document.getElementById("alerta-cantidad"). innerHTML=`<p style="color: red;" >La cantidad ingresada debe ser mayor a cero</p>`
  } else {document.getElementById("alerta-cantidad"). innerHTML=""};

  return validacionCantidad;
};

function validaFormaPago(){
  
  if (document.getElementById("tarjeta-credito").checked){
    textValidate("num-tarjeta");
    textValidate("cod-seguridad");
    textValidate("vencimiento");
    return (textValidate("num-tarjeta") && textValidate("cod-seguridad") && textValidate("vencimiento"));
  } else {if (document.getElementById("transferencia").checked){
    textValidate("num-cuenta");
    return textValidate("num-cuenta");
  } else {
    return false
  }}  



};



document.getElementById("btn-submit").addEventListener("click",function(e){
  textValidate("calle");  
  textValidate("numero"); 
  textValidate("esquina"); 
  validaCantidad();
  validaFormaPago();

  if (!(textValidate("calle")) || !(textValidate("numero")) || !(textValidate("esquina")) || !(validaCantidad()) || !(validaCheckEnvio()) || !(validaFormaPago())){
    alert("Datos ingresados con error");
  } else {
    alert("Has comprado con éxito") 
  };

document.getElementById("formulario").addEventListener("input",function(e){
    textValidate("calle");  
    textValidate("numero"); 
    textValidate("esquina"); 
  });
});
