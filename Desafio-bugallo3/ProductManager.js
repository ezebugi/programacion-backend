const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();

    product.id = this.generateProductId();
    products.push(product);

    this.saveProductsToFile(products);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((p) => p.id === id);

    if (!product) {
      console.log("Error: Producto no encontrado");
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    products[productIndex] = { ...products[productIndex], ...updatedFields };
    this.saveProductsToFile(products);
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter((p) => p.id !== id);
    this.saveProductsToFile(updatedProducts);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error: No se pudo leer el archivo de productos");
      return [];
    }
  }

  saveProductsToFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      console.log("Productos guardados correctamente");
    } catch (error) {
      console.log("Error: No se pudo guardar el archivo de productos");
    }
  }

  generateProductId() {
    const products = this.getProductsFromFile();
    const lastProduct = products[products.length - 1];

    if (lastProduct) {
      return lastProduct.id + 1;
    } else {
      return 1;
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager("productos.js");

// Agregar producto
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10.99,
  thumbnail: "ruta/imagen1.jpg",
  code: "ABC123",
  stock: 5,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener producto por ID
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(productById);

// Actualizar producto
productManager.updateProduct(productId, { price: 12.99 });

// Eliminar producto
productManager.deleteProduct(productId);
