function agregarProducto () {
let nombreProducto = prompt("Ingrese el nombre del producto")
let marcaProducto = prompt('Ingrese la marca del Producto')
let precioProducto = prompt('Ingrese el precio del Producto')
console.log (nombreProducto + marcaProducto + precioProducto)
}
function borrarProducto () {
    let nombreProducto = prompt("Ingrese el nombre del producto")
    let marcaProducto = prompt('Ingrese la marca del Producto')
    console.log ('El producto ha sido borrado')
}
let iva = 0.21

let salirMenu = true
 do{
    let opcionMenu = prompt(`Ingrese la opción deseada
     1 - Agregar un producto
     2 - Borrar producto
     3 - Consultar precio final
     0 - Salir del ménu`)
     switch(opcionMenu){
         case "1":
             agregarProducto()
         break
        case "2":
            borrarProducto()
         break
         case "3":
            let precioFinal = precioProducto * iva
         break
         case "0":
             console.log("Salir del menu")
             salirMenu = false
         break
         default:
             console.log("Opción no válida")
         break             
    }
}while(salirMenu)