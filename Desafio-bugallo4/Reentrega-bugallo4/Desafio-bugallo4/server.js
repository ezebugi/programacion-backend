const express = require("express");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");

const app = express();
const server = app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

const io = NewServer(server);

// Configuración de Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Rutas
app.get("/", (req, res) => {
  res.render("home", { products: getAllProducts() });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products: getAllProducts() });
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Escucha el evento 'newProduct' desde el cliente
  socket.on("newProduct", (product) => {
    // Agrega el nuevo producto
    addProduct(product);

    // Emite el evento 'updateProducts' a todos los clientes conectados
    io.emit("updateProducts", getAllProducts());
  });

  // Escucha el evento 'deleteProduct' desde el cliente
  socket.on("deleteProduct", (productId) => {
    // Elimina el producto
    deleteProduct(productId);

    // Emite el evento 'updateProducts' a todos los clientes conectados
    io.emit("updateProducts", getAllProducts());
  });

  // Manejo de desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Funciones auxiliares para gestionar los productos
function getAllProducts() {}

function addProduct(product) {}

function deleteProduct(productId) {}

// server.js

// Importar las funciones desde el archivo products.js
const { getAllProducts, addProduct, deleteProduct } = require("./products");

app.get("/products", (req, res) => {
  const allProducts = getAllProducts();
  res.json(allProducts);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct);
  res.sendStatus(200);
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  deleteProduct(productId);
  res.sendStatus(200);
});
