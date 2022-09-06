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
                                        <div id="img-articulos">
                                            <img src="` + category.images[0] +` " alt="product image" class="img-thumbnail">
                                            <img src="` + category.images[1] +` " alt="product image" class="img-thumbnail">
                                            <img src="` + category.images[2] +` " alt="product image" class="img-thumbnail">
                                            <img src="` + category.images[3] +` " alt="product image" class="img-thumbnail">
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

console.log(URL_COMENTARIOS);
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            console.log(productArray);
            showProductsList(productArray);
        }
    });
});

//Hago un nuevo evento y obtengo la url de comentario para el producto en cuestion
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_COMENTARIOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let comentariosArray = resultObj.data;
            console.log(comentariosArray);
            mostrarComentarios(comentariosArray);
        }
    });
});