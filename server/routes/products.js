const router = require("express").Router();
const pool = require("../database.js");
const PIZZA_TYPE = "pizza";

router.get("/", async (req, res) => {
    try {
        const pizzas = await pool.query(`SELECT * FROM product`);
        if(!pizzas) pizzas.status(400).json("Can't get product list");
        res.status(200).json(pizzas.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get product list error: "+error.message);  
    };
});

router.get("/pizzas", async (req, res) => {
    try {
        const pizzas = await pool.query(`SELECT * FROM product WHERE product_type='${PIZZA_TYPE}'`);
        if(!pizzas) pizzas.status(400).json("Can't get pizza list");
        res.status(200).json(pizzas.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get pizza list error: "+error.message);  
    };
});

router.get("/:id", async (req, res) => {
    try {
        const pizza = await pool.query(`SELECT * FROM product WHERE productid=${req.params.id}`);
        if(!pizza) res.status(400).json("Error ocurred");
        res.status(200).json(pizza.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get pizza error: "+error.message);  
    };
});

router.post("/", async (req, res) => {
    try {
        const {name, price, image, size, desc, type} = await req.body;
        const newProduct = await pool.query(`INSERT INTO product(product_name, product_price, product_image, product_size, product_desc, product_type) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [name, price, image, size, desc, type]);
        res.status(200).json(newProduct.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Create product error: "+error.message);  
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteProduct = await pool.query(`DELETE FROM product WHERE productid=${req.params.id}`);
        if(!deleteProduct) res.status(400).json("Error ocurred");
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete product error: "+error.message);
    } 
});

router.put("/:id", async (req, res) => {
    try {
        const product = await req.body;
        let updateProduct = null;
        // updateProduct = await pool.query(`UPDATE product SET productid=${req.params.id}${product.name ? `, product_name='${product.name}'` : ' '}${product.price ? `, product_price='${product.price}'` : ' '}${product.image ? `, product_image='${product.image}'` : ''}${product.size ? `, product_size='${product.size}'` : ''}${product.desc ? `, product_desc='${product.desc}'` : ''} WHERE productid=${req.params.id} RETURNING *;`);
        updateProduct = await pool.query(`UPDATE product SET product_name='${product.name}', product_price=${product.price}, product_image='${product.image}', product_size='${product.size}', product_desc='${product.desc}' WHERE productid=${product.id} RETURNING *`);
        if(!updateProduct) res.status(400).json("Cannot update");
        res.status(200).json(updateProduct.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update product error: "+error.message);
    };
});

module.exports = router;