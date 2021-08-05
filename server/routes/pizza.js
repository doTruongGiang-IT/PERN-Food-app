const router = require("express").Router();
const pool = require("../database.js");

router.get("/", async (req, res) => {
    try {
        const pizzas = await pool.query("SELECT * FROM foods");
        if(!pizzas) pizzas.status(400).json("Can't get pizza list");
        res.status(200).json(pizzas.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get pizza list error: "+error.message);  
    };
});

router.get("/:id", async (req, res) => {
    try {
        const pizza = await pool.query(`SELECT * FROM foods WHERE id=${req.params.id}`);
        if(!pizza) res.status(400).json("Error ocurred");
        res.status(200).json(pizza.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get pizza error: "+error.message);  
    };
});

module.exports = router;