class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  addProduct(product) {
    // Validar campos obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Error: Todos los campos son obligatorios");
      return;
    }

    // Validar que el campo "code" no se repita
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.log("Error: El código del producto ya existe");
      return;
    }

    product.id = this.productId++;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado");
    }
  }
}

const productManager = new ProductManager();

// productos
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10.99,
  thumbnail: "ruta/imagen1.jpg",
  code: "ABC123",
  stock: 5,
});
productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 19.99,
  thumbnail: "ruta/imagen2.jpg",
  code: "DEF456",
  stock: 10,
});
productManager.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 5.99,
  thumbnail: "ruta/imagen3.jpg",
  code: "GHI789",
  stock: 3,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener producto por ID
const productId = 2;
const productById = productManager.getProductById(productId);
console.log(productById);
