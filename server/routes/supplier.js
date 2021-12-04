const router = require("express").Router();
const pool = require("../database.js");

router.post("/", async (req, res) => {
    try {
        const {name, address} = await req.body;
        const newSupp = await pool.query(`INSERT INTO supplier(supplier_name, supplier_address) VALUES($1, $2) RETURNING *`, 
            [name, address]);
        res.status(200).json(newSupp.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create supplier error: " + error.message);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const supp = await req.body;
        let updateSupp = null;
        // updateSupp = await pool.query(`UPDATE supplier SET supplierid=${req.params.id}${supp.name ? `, supplier_name='${supp.name}'` : ' '}${supp.address ? `, supplier_address='${supp.address}'` : ' '} WHERE supplierid=${req.params.id} RETURNING *;`);
        updateSupp = await pool.query(`UPDATE supplier SET supplier_name='${supp.name}', supplier_address='${supp.address}' WHERE supplierid=${supp.id} RETURNING *`);
        if(!updateSupp) res.status(400).json("Cannot update");
        res.status(200).json(updateSupp.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update supplier error: "+error.message);
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteSupp = await pool.query(`DELETE FROM supplier WHERE supplierid=${req.params.id}`);
        if(!deleteSupp) res.status(400).json("Error ocurred");
        res.status(200).json("Supplier has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete supplier error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const supp = await pool.query(`SELECT * FROM supplier WHERE supplierid=${req.params.id}`);
        if(!supp) res.status(400).json("Error ocurred");
        res.status(200).json(supp.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get supplier error: "+error.message);
    } 
});

router.get("/", async (req, res) => {
    try {
        const suppliers = await pool.query(`SELECT * FROM supplier`);
        if(!suppliers) res.status(400).json("Error ocurred");
        res.status(200).json(suppliers.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get suppliers error: "+error.message);
    } 
});

module.exports = router;