const router = require("express").Router();
const pool = require("../database.js");

router.get("/order_status", async (req, res) => {
    let orders = null;
    try {
        orders = await pool.query("SELECT status, COUNT(*) AS number FROM orders GROUP BY status HAVING COUNT(*) > 0;");  
        if(!orders) res.status(400).json("Can't get order list");
        res.status(200).json(orders.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order list error: "+error.message);  
    };
});

router.get("/statsStaff", async (req, res) => {
    let staffs = null;
    try {
        staffs = await pool.query("SELECT staffid, COUNT(*) AS number_of_order, SUM(order_price) AS total FROM orders WHERE status='Complete' GROUP BY staffid HAVING COUNT(*)>0");  
        if(!staffs) res.status(400).json("Can't stats staff list");
        res.status(200).json(staffs.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get stats staff list error: "+error.message);  
    };
});

router.get("/pizza", async (req, res) => {
    let pizzas = null;
    try {
        pizzas = await pool.query("SELECT productid, COUNT(*) as number FROM order_detail GROUP BY productid HAVING COUNT(*) > 0 ORDER BY number DESC;");  
        if(!pizzas) res.status(400).json("Can't get pizzas list");
        res.status(200).json(pizzas.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get pizzas list error: "+error.message);  
    };
});

module.exports = router;