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
    let productSelection = prompt('Ingrese el nombre del producto que desea borrar')
    let search = array.filter(
        (prod) => prod.name.toLocaleLowerCase() == productSelection.toLocaleLowerCase()
    )
    if (search.length == 0){
        
        console.log ('El producto ha sido borrado')
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