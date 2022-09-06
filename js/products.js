//array donde se cargarán los datos recibidos:
let productArray = [];
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let arraySearch = [];

function setProdId(numId){
    localStorage.setItem("prodID", numId);
    window.location = "product-info.html";
    console.log(localStorage.prodID);
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
                //Agrego las condiciones para contemplar el filtro po precio
                if (((minCount == undefined) || (minCount != undefined && parseInt(productArray.products[i].cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(productArray.products[i].cost) <= maxCount))){
                let category = array[i];
                htmlContentToAppend += `
                <div onclick="setProdId(${category.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>`+ category.name  +` - ` + category.currency +` `+  category.cost+ `</h4> 
                                <p> `+ category.description +`</p> 
                                </div>
                                <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                            </div>

                        </div>
                    </div>
                </div>
                `
            }
        }    
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
 
};
//Me cambia el nombre de la categoria que se muestra de acuerdo a la que se ingresa
function nombreCategoria(nombre){
    let htmlContentToAppend = "Verás aquí todos los productos de la categoria ";
    document.getElementById("tit-categoria").innerHTML= `Verás aquí todos los productos de la categoria ` + nombre.catName
}
//funcion que permite ordenar y mostrar los articulos
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortProducts(currentSortCriteria, currentCategoriesArray);

    //Muestro los productos ordenadas
    showProductsList(currentCategoriesArray);
};

//funcion que verifica si el texto ingresado para buscar se encuentra en el nombre o descripcion del articulo
//va armando un nuevo array con los articulos que cumplan la coincidencia 
function busquedaTexto(texto,array){
    let arraySearch = [];
    let j=0;
    for (let i=0; i < array.length;i++ ){
        if (array[i].name.includes(texto) || array[i].description.includes(texto)){
            arraySearch[j]=array[i];
            j=j+1;        
        }
    }
    return arraySearch
}

//utiliza la funcion anterior para buscar y mostrar los articulos que cumplen con la condicion que se esta escribiendo en el buscador

function buscarAndShowProducts(texto,array){

    arraySearch = busquedaTexto(texto,array);
    console.log(arraySearch);
    showProductsList(arraySearch);

}
/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro productArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            nombreCategoria(productArray);
            showProductsList(productArray.products);
        }
    });   
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(productArray.products);
        console.log("el min y el max es: " + minCount + "-" + maxCount)
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME,productArray.products);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME,productArray.products);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT,productArray.products);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("search").value = "";

        minCount = undefined;
        maxCount = undefined;
        showProductsList(productArray.products);
    });
    //DESAFIATE: se incorpora un campo de busqueda segun nombre articulo y descripcion
    //utilizo el evento input para que busque mientras el usuario va escribiendo
    document.getElementById("search").addEventListener("input",function(evento){
        let contenido = document.getElementById("search").value;
        buscarAndShowProducts(contenido,productArray.products);
    });

});

//funcion que ordena el arreglo segun un criterio de entrada
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

