const express = require("express");
const ProductManager = require("./ProductManager"); // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3000;

// Endpoint para obtener todos los productos o limitar la cantidad
app.get("/products", async (req, res) => {
  const limit = req.query.limit; // Obtener el valor del query param 'limit'
  const products = await ProductManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// Endpoint para obtener un producto específico por su ID
app.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await ProductManager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
