// products.js

// Array para almacenar los productos
let products = [];

// Obtener todos los productos
function getAllProducts() {
  return products;
}

// Agregar un nuevo producto
function addProduct(product) {
  products.push(product);
}

// Eliminar un producto por su ID
function deleteProduct(productId) {
  products = products.filter((product) => product.id !== productId);
}

// Exportar las funciones para poder utilizarlas en otros archivos
module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
};
