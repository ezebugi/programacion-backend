// const express = require("express");
// const productsRouter = require("./routes/products");
// const cartsRouter = require("./routes/carts");

// const app = express();
// const port = 8080;

// app.use(express.json());

// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);

// app.listen(port, () => {
//   console.log(`Servidor escuchando en el puerto ${port}`);
// });
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas para el manejo de productos
const productsRouter = express.Router();

// Listar todos los productos
productsRouter.get("/", (req, res) => {
  const products = readProductsFromFile();
  res.json(products);
});

// Obtener un producto por su id
productsRouter.get("/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = readProductFromFile(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
productsRouter.post("/", (req, res) => {
  const newProduct = req.body;
  const products = readProductsFromFile();
  const id = generateProductId();
  newProduct.id = id;
  products.push(newProduct);
  writeProductsToFile(products);
  res.json(newProduct);
});

// Actualizar un producto por su id
productsRouter.put("/:pid", (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  const products = readProductsFromFile();
  const index = products.findIndex((product) => product.id === pid);

  if (index !== -1) {
    updatedProduct.id = pid;
    products[index] = updatedProduct;
    writeProductsToFile(products);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Eliminar un producto por su id
productsRouter.delete("/:pid", (req, res) => {
  const pid = req.params.pid;
  const products = readProductsFromFile();
  const index = products.findIndex((product) => product.id === pid);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    writeProductsToFile(products);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.use("/api/products", productsRouter);

// Rutas para el manejo de carritos
const cartsRouter = express.Router();

// Crear un nuevo carrito
cartsRouter.post("/", (req, res) => {
  const newCart = req.body;
  const carts = readCartsFromFile();
  const id = generateCartId();
  newCart.id = id;
  carts.push(newCart);
  writeCartsToFile(carts);
  res.json(newCart);
});

// Obtener los productos de un carrito
cartsRouter.get("/:cid", (req, res) => {
  const cid = req.params.cid;
  const cart = readCartFromFile(cid);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: "Carrito no encontrado" });
  }
});

// Agregar un producto a un carrito
cartsRouter.post("/:cid/product/:pid", (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = readCartFromFile(cid);
  const product = readProductFromFile(pid);

  if (!cart || !product) {
    res.status(404).json({ message: "Carrito o producto no encontrado" });
    return;
  }

  const existingProduct = cart.products.find((p) => p.product === pid);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  writeCartToFile(cart);

  res.json(cart);
});

app.use("/api/carts", cartsRouter);

// Función para leer los productos desde el archivo productos.json
function readProductsFromFile() {
  const productsData = fs.readFileSync("productos.json", "utf8");
  return JSON.parse(productsData);
}

// Función para escribir los productos en el archivo productos.json
function writeProductsToFile(products) {
  const productsData = JSON.stringify(products, null, 2);
  fs.writeFileSync("productos.json", productsData, "utf8");
}

// Función para generar un id único para los productos
function generateProductId() {
  const products = readProductsFromFile();
  let id = Math.floor(Math.random() * 1000) + 1;
  while (products.some((product) => product.id === id)) {
    id = Math.floor(Math.random() * 1000) + 1;
  }
  return id;
}

// Función para leer los carritos desde el archivo carrito.json
function readCartsFromFile() {
  const cartsData = fs.readFileSync("carrito.json", "utf8");
  return JSON.parse(cartsData);
}

// Función para escribir los carritos en el archivo carrito.json
function writeCartsToFile(carts) {
  const cartsData = JSON.stringify(carts, null, 2);
  fs.writeFileSync("carrito.json", cartsData, "utf8");
}

// Función para generar un id único para los carritos
function generateCartId() {
  const carts = readCartsFromFile();
  let id = Math.floor(Math.random() * 1000) + 1;
  while (carts.some((cart) => cart.id === id)) {
    id = Math.floor(Math.random() * 1000) + 1;
  }
  return id;
}

// Función para leer un carrito desde el archivo carrito.json
function readCartFromFile(cid) {
  const carts = readCartsFromFile();
  return carts.find((cart) => cart.id === cid);
}

// Función para escribir un carrito en el archivo carrito.json
function writeCartToFile(cart) {
  const carts = readCartsFromFile();
  const index = carts.findIndex((c) => c.id === cart.id);

  if (index !== -1) {
    carts[index] = cart;
  } else {
    carts.push(cart);
  }

  writeCartsToFile(carts);
}

// Función para leer un producto desde el archivo productos.json
function readProductFromFile(pid) {
  const products = readProductsFromFile();
  return products.find((product) => product.id === pid);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
