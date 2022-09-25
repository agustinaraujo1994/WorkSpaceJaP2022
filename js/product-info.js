let URL = PRODUCT_INFO_URL+localStorage.prodID+".json";
let URL_COMENTARIOS = PRODUCT_INFO_COMMENTS_URL+localStorage.prodID+".json";


function showProductsList(array){
    let htmlContentToAppend = "";
                let category = array;
                htmlContentToAppend += `<br>
                                        <h1> ${category.name} </h2>
                                        <hr>
                                        <strong>Precio</strong>
                                        <p>${category.currency} ${category.cost}</p>
                                        <strong>Descripción</strong>
                                        <p>${category.description}</p>
                                        <strong>Categoria</strong>
                                        <p>${category.category}</p>
                                        <strong>Cantidad vendidos</strong>
                                        <p>${category.soldCount}</p>
                                        <strong>Imágenes ilustrativas</strong>
                                        <div id="imagenes-carrusel">
                                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                          <div class="carousel-item active">
                                            <img src="`+category.images[0]+`" class="d-block w-100" alt="...">
                                          </div>
                                          <div class="carousel-item">
                                            <img src="`+category.images[1]+`" class="d-block w-100" alt="...">
                                          </div>
                                          <div class="carousel-item">
                                            <img src="`+category.images[2]+`" class="d-block w-100" alt="...">
                                          </div>
                                          <div class="carousel-item">
                                          <img src="`+category.images[3]+`" class="d-block w-100" alt="...">
                                        </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Next</span>
                                        </button>
                                      </div>
                                      
                                        </div>` 
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
 
};
//Creo una funcion para mostrar los comentarios
function mostrarComentarios(array){
    htmlContentToAppend="<br> <strong>Comentarios</strong>";
    for (let i=0; i<array.length; i++){
        htmlContentToAppend += `<div id="list-comentarios" class="list-group-item list-group-item-action cursor-active">
                                    <p><b>${array[i].user}</b> - ${array[i].dateTime} - `
        for (let j=1;j<=array[i].score;j++){ //genera la cantidad de estrellas segun el score del cliente
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`
        };
        if (array[i].score != 5){
            for (let k=1;k<=(5-array[i].score);k++){// en caso que el score el cliente sea distinto de 5 completa el resto de las estrellas sin pintar
                htmlContentToAppend += `<span class="fa fa-star"></span>`
            };
        };
        htmlContentToAppend +=  `</p>
                                  <p>${array[i].description}
                                </div>`                    
                                   
    };
    document.getElementById("coment-list-container").innerHTML = htmlContentToAppend;
};

function setProdId(numId){
    localStorage.setItem("prodID", numId);
    window.location = "product-info.html";
    console.log(localStorage.prodID);
};

function mostrarProdRel(array){
    htmlContentToAppend = `<hr><br><strong>Productos Relacionados</strong>`
    htmlContentToAppend += `<div id="contenedor-rel">`
    for (let i=0;i<array.length;i++){
        htmlContentToAppend += ` <div><div onclick="setProdId(${array[i].id})" id="img-articulo" class=" list-group-item-action cursor-active">
        <img src="` + array[i].image +` " alt="product image" class="img-thumbnail">
        <p>` + array[i].name +`</p>
        </div></div>` 
    }; 
    htmlContentToAppend += `</div>`
    document.getElementById("prod-rel-container").innerHTML = htmlContentToAppend;
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            console.log(productArray);
            showProductsList(productArray);
            mostrarProdRel(productArray.relatedProducts);
        }
    });
});

//Funcion que permite darle el formato a la fecha según el que ya existe 
function formatoFecha (fecha){
    let fechaConFormato ="";
    let año = fecha.getFullYear();
    let mes = "";
    let dia ="";
    let hora ="";
    let minuto = "";
    let segundo = "";
    if ((fecha.getMonth() + 1)<10) {
        mes = "0"+(fecha.getMonth() + 1)
    } else { mes = (fecha.getMonth() + 1)};
    if ((fecha.getDate() + 1)<10) {
        dia = "0"+(fecha.getDate())
    } else { dia = (fecha.getDate())};
    if ((fecha.getHours()<10)) {
        hora = "0"+(fecha.getHours())
    } else { hora = (fecha.getHours())};
    if ((fecha.getMinutes()<10)) {
        minuto = "0"+(fecha.getMinutes())
    } else { minuto = (fecha.getMinutes())};
    if ((fecha.getSeconds()<10)) {
        segundo = "0"+(fecha.getSeconds())
    } else { segundo = (fecha.getSeconds())};
    fechaConFormato = año + "-" + mes + "-" + dia + " " + " " + hora + ":" + minuto + ":" + segundo;
    return fechaConFormato
};

//DESAFIATE:
//Hago un nuevo evento y obtengo la url de comentario para el producto en cuestion
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_COMENTARIOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let comentariosArray = resultObj.data;
            console.log(comentariosArray);
            mostrarComentarios(comentariosArray);

        document.addEventListener("submit",function(e){
            e.preventDefault(); //evito la actulizacion de la pagina
            let idProduct = localStorage.prodID; //voy guardando todos los datos que necesito agregar en el comentario
            let score = document.getElementById("list-score").value;
            let textComentario = document.getElementById("ingresar-comentario").value;
            let usuario = localStorage.usrName;
            let date = new Date ();
            let fecha = formatoFecha(date); //utilizo la funcion que le da el formato a la fecha 
            let nuevoitem = `{"product": "${idProduct}", "score": "${score}", "description": "${textComentario}", "dateTime" : "${fecha}", "user": "${usuario}"}` ;
            let nuevoitemObj = JSON.parse(nuevoitem);
            comentariosArray.push(nuevoitemObj);
            mostrarComentarios(comentariosArray); //muestro nuevo arreglo de comentario que tiene nuevo item
            document.getElementById("ingresar-comentario").value=""; //borro el contenido del campo del comentario
        });
        }
    });
});