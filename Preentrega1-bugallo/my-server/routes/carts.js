const express = require("express");
const router = express.Router();

const CartManager = require("../CartManager"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  const newCart = req.body;
  const cart = await CartManager.createCart(newCart);

  res.json(cart);
});

// Listar los productos de un carrito
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CartManager.getCartById(cid);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: "Carrito no encontrado" }); // Corrección aquí
  }
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const cart = await CartManager.getCartById(cid);
  const product = await ProductManager.getProductById(pid);

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

  await CartManager.updateCart(cid, cart);

  res.json(cart);
});

module.exports = router;
