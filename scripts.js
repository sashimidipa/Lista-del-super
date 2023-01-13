let iva = 1.21
let PrecioProducto = 0
let salirMenu = true

function agregarProducto () {
    let nombreProducto = prompt("Ingrese el nombre del Producto")
    let marcaProducto = prompt('Ingrese la marca del Producto')
    let precioProducto = prompt('Ingrese el precio del Producto')
    if (!isNaN(precioProducto)){
        PrecioProducto = precioProducto
    }
    else{ 
        alert('el precio ingresado debe ser un numero')
    }
    console.log (`${nombreProducto} ${marcaProducto} ${precioProducto}`)
}
function borrarProducto () {
    let nombreProducto = prompt("Ingrese el nombre del producto")
    let marcaProducto = prompt('Ingrese la marca del Producto')
    console.log ('El producto ha sido borrado')
}

 do {  

    let opcionMenu = prompt (`Ingrese la opción deseada
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
             PrecioProducto == 0 ? alert('No hay productos ingresados, el precio final es 0') : 
             console.log (PrecioProducto * iva)
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