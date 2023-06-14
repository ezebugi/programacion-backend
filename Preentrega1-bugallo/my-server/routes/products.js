const express = require("express");
const router = express.Router();

const ProductManager = require("../ProductManager"); // Asegúrate de que la ruta sea correcta

// Obtener todos los productos o limitar la cantidad
router.get("/", async (req, res) => {
  const limit = req.query.limit; // Obtener el valor del query param 'limit'
  const products = await ProductManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// Obtener un producto específico por su ID
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await ProductManager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const newProduct = req.body;
  const product = await ProductManager.addProduct(newProduct);

  res.json(product);
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  const product = await ProductManager.updateProduct(pid, updatedProduct);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await ProductManager.deleteProduct(pid);

  if (product) {
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

module.exports = router;
