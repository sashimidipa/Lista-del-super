<<<<<<< HEAD
// const smartself = []
// let iva = 1.21
// let ProductPrice = 0
// let ProductName = ""
// let ProductBrand = ""
// let salirMenu = true
// class Product {
//     constructor(id, name, brand, price){
//         this.id = id,
//         this.name = ProductName,
//         this.brand = ProductBrand,
//         this.price = ProductPrice
//     }
// }
// function addProduct (array) {
//     let productName = prompt("Ingrese el nombre del Producto")
//     ProductName = productName
//     let productBrand = prompt('Ingrese la marca del Producto')
//     ProductBrand = productBrand
//     let productPrice = parseInt(prompt('Ingrese el precio del Producto'))
//     if (!isNaN(productPrice)){
//         ProductPrice = productPrice
//     }
//     else{ 
//         alert('el precio ingresado debe ser un numero')
//     }
//     console.log (`${productName} ${productBrand} ${productPrice}`)

//     const newProduct = new Product (array.length+1, productName, productBrand,productPrice)
//     console.log(newProduct)
//     array.push(newProduct)
//     console.log(array)
// }

// function deleteProduct (array) {
//     let prodString = [];
//     let list = 'La lista de objetos es:';
//         array.forEach(
//             (prod)=>{
//                 prodString.push(`\n ${prod.id} - ${prod.name} - ${prod.brand} que vale ${prod.price}`)
//             }
//         )
//         for (let m in prodString){
//             list = list + prodString[m];
//         }
//     let productSelection = prompt(list + '\n seleccione el producto a borrar');
    
    
//     // let productSelection = prompt('Ingrese el nombre del producto que desea borrar')

//     if ((productSelection) <= array.length){
//         array.splice((productSelection -1), productSelection)
//         alert ('el producto ingresado ha sido borrado')
//     }
//     else{
//         alert ('el producto ingresado es inexistente')
//     }
// }

// function calcTot (array){
//     array.forEach(element => { console.log('el total de su compra es: ' + (sumar(element.price)))  
//     })
// }

//  do {  

//     let opcionMenu = prompt (`Ingrese la opción deseada
//      1 - Agregar un producto
//      2 - Borrar producto
//      3 - Consultar precio final
//      0 - Salir del ménu`)
//      switch(opcionMenu){
//          case "1":
//             addProduct (smartself)
//          break
//         case "2":
//             deleteProduct(smartself)
//          break
//          case "3":
//             calcTot (smartself)
//          break
//          case "0":
//              console.log("Salir del menu")
//              salirMenu = false
//          break
//          default:
//              console.log("Opción no válida")
//          break             
//     }
// } while(salirMenu)

//MUDANDO A DOM
// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("El producto se agrego a la lista", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Producto cambiado", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Por favor ingrese un producto", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("La lista ha sido vaciada", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("El producto ha sido eliminado", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "editar";
}
// set backt to defaults
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "agregar";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
=======
const smartself = []
let iva = 1.21
let ProductPrice = 0
let ProductName = ""
let ProductBrand = ""
let salirMenu = true
class Product {
    constructor(id, name, brand, price){
        this.id = id,
        this.name = ProductName,
        this.brand = ProductBrand,
        this.price = ProductPrice
    }
}
function addProduct (array) {
    let productName = prompt("Ingrese el nombre del Producto")
    ProductName = productName
    let productBrand = prompt('Ingrese la marca del Producto')
    ProductBrand = productBrand
    let productPrice = parseInt(prompt('Ingrese el precio del Producto'))
    if (!isNaN(productPrice)){
        ProductPrice = productPrice
    }
    else{ 
        alert('el precio ingresado debe ser un numero')
    }
    console.log (`${productName} ${productBrand} ${productPrice}`)

    const newProduct = new Product (array.length+1, productName, productBrand,productPrice)
    console.log(newProduct)
    array.push(newProduct)
    console.log(array)
}

function deleteProduct (array) {
    let prodString = [];
    let list = 'La lista de objetos es:';
        array.forEach(
            (prod)=>{
                prodString.push(`\n ${prod.id} - ${prod.name} - ${prod.brand} que vale ${prod.price}`)
            }
        )
        for (let m in prodString){
            list = list + prodString[m];
        }
    let productSelection = prompt(list + '\n seleccione el producto a borrar');
    
    
    // let productSelection = prompt('Ingrese el nombre del producto que desea borrar')

    if ((productSelection) <= array.length){
        array.splice((productSelection -1), productSelection)
        alert ('el producto ingresado ha sido borrado')
    }
    else{
        alert ('el producto ingresado es inexistente')
    }
}

function calcTot (array){
    array.forEach(element => { console.log('el total de su compra es: ' + (sumar(element.price)))  
    })
}

 do {  

    let opcionMenu = prompt (`Ingrese la opción deseada
     1 - Agregar un producto
     2 - Borrar producto
     3 - Consultar precio final
     0 - Salir del ménu`)
     switch(opcionMenu){
         case "1":
            addProduct (smartself)
         break
        case "2":
            deleteProduct(smartself)
         break
         case "3":
            calcTot (smartself)
         break
         case "0":
             console.log("Salir del menu")
             salirMenu = false
         break
         default:
             console.log("Opción no válida")
         break             
    }
} while(salirMenu)
>>>>>>> 6a979684ac65d5e84f2b709907d8971b08efcb5f
