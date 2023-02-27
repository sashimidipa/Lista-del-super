// ****** item selection **********

const form = document.querySelector(".market-form");
const alert = document.querySelector(".alert");
const market = document.getElementById("market");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".market-container");
const list = document.querySelector(".market-list");
const clearBtn = document.querySelector(".clear-btn");
let parsedJason = [];
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
window.addEventListener('load', showWellcome);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********
// First time 
const demoList = async () => {
        const nuList= await fetch('https://run.mocky.io/v3/2a3b66c6-306e-43d2-87ff-86011181d37d')
        console.log(nuList)
        const data = await nuList.json()
        .then( (json) => console.log(ar = json))
        .then((ar) => additems(parsedJason)) 
}
function showWellcome() {
  if (localStorage.getItem("isMyFirstTime")){
  localStorage.setItem("isMyFirstTime", false)
  } else {
    localStorage.setItem("isMyFirstTime", true)
    swal({
      title: "Veo que es la primera vez que usas la app te gustaria que precarguemos una pequeña lista como demo para que aprendas a usar los elementos de la nuestra",
      text: "Una vez cargada la lista podras usar los botones de edicion o eliminar para cambiarla o vaciar la lista y crear la tuya propia",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willAccept) => {
      if (willAccept) { 
        demoList()
      } else{
        swal("Que disfrutes tu experiencia!!");
      }
    });
  }
} 
function additems(){
  ar.forEach(function (Item) {
    const value = Item.value;
    const id = new Date().getTime().toString();
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("market-item");
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
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();;
  });
}
// add item

function addItem(e) {
  e.preventDefault();
  const value = market.value;
  const id = new Date().getTime().toString();
  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("market-item");
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
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    Toastify({
      text: "El producto se ha agregado con exito",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "center", 
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){}
    }).showToast();
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    Toastify({
      text: "El producto se ha sido editado exitosamente",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "center",
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} 
    }).showToast();

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    Toastify({
      text: "Por favor ingrese un producto",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "center", 
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #b02f00, #c93d3d)",
      },
      onClick: function(){} 
    }).showToast();
  }
}
// clear items

function clearItems() {
  const items = document.querySelectorAll(".market-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  Toastify({
    text: "La lista ha sido vaciada",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #b02f00, #c93d3d)",
    },
    onClick: function(){} 
  }).showToast();
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
  Toastify({
    text: "El producto ha sido eliminado",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #b02f00, #c93d3d)",
    },
    onClick: function(){} 
  }).showToast();

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
  market.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "editar";
}
// set backt to defaults
function setBackToDefault() {
  market.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "agregar";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const market = { id, value };
  let items = getLocalStorage();
  items.push(market);
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
  element.classList.add("market-item");
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
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}