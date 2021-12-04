const router = require("express").Router();
const pool = require("../database.js");

router.post("/", async (req, res) => {
    try {
        const {name, price, supp_id} = await req.body;
        const newIngredient = await pool.query(`INSERT INTO ingredient(supplierid, ingredient_name, ingredient_price) VALUES($1, $2, $3) RETURNING *`, 
            [supp_id, name, price]);
        res.status(200).json(newIngredient.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create ingredient error: " + error.message);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const ingredient = await req.body;
        let updateIngredient = null;
        // updateIngredient = await pool.query(`UPDATE ingredient SET ingredientid=${req.params.id}${ingredient.name ? `, ingredient_name='${ingredient.name}'` : ' '}${ingredient.price ? `, ingredient_price='${ingredient.price}'` : ' '}${ingredient.supp_id ? `, supplierid='${ingredient.supp_id}'` : ' '} WHERE ingredientid=${req.params.id} RETURNING *;`);
        updateIngredient = await pool.query(`UPDATE ingredient SET ingredient_name='${ingredient.name}', ingredient_price=${ingredient.price}, supplierid=${ingredient.supp_id} WHERE ingredientid=${ingredient.id} RETURNING *`);
        if(!updateIngredient) res.status(400).json("Cannot update");
        res.status(200).json(updateIngredient.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update ingredient error: "+error.message);
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteIngredient = await pool.query(`DELETE FROM ingredient WHERE ingredientid=${req.params.id}`);
        if(!deleteIngredient) res.status(400).json("Error ocurred");
        res.status(200).json("Ingredient has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete ingredient error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const ingredient = await pool.query(`SELECT * FROM ingredient WHERE ingredientid=${req.params.id}`);
        if(!ingredient) res.status(400).json("Error ocurred");
        res.status(200).json(ingredient.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get supplier error: "+error.message);
    } 
});

router.get("/", async (req, res) => {
    try {
        const ingredients = await pool.query(`SELECT * FROM ingredient`);
        if(!ingredients) res.status(400).json("Error ocurred");
        res.status(200).json(ingredients.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get ingredients error: "+error.message);
    } 
});

module.exports = router;