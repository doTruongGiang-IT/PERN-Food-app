const router = require("express").Router();
const pool = require("../database.js");

router.get("/", async (req, res) => {
    const user = req.query.user;
    let orders = null;

    try {
        if(user) {    
            let orderID = await pool.query(`SELECT id FROM users WHERE lower(username)=lower('${user}')`);
            orderID = orderID.rows[0].id.toString();
            orders = await pool.query(`SELECT * FROM orders WHERE customer_id=${orderID}`);
        }else {
            orders = await pool.query("SELECT * FROM orders ORDER BY id");  
        };
        if(!orders) res.status(400).json("Can't get order list");
        res.status(200).json(orders.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order list error: "+error.message);  
    };
});

router.get("/:id", async (req, res) => {
    try {
        const order = await pool.query(`SELECT * FROM orders WHERE customer_id=${req.params.id}`);
        if(!order) res.status(400).json("Error ocurred");
        res.status(200).json(order.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order error: "+error.message);  
    };
});

router.post("/", async (req, res) => {
    try {
        let today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const {address, customer_id, food_id} = req.body;
        const newOrder = await pool.query(`INSERT INTO orders(address, placed_at, status, customer_id, food_id) VALUES($1,$2,$3,$4,$5)`,
        [address, today, 'Order Placed', customer_id, food_id]);
        if(!newOrder) res.status(400).json("Wrong credentials");
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json(error);
        console.log("Create order error: "+error.message);  
    };
});

router.put("/:id", async (req, res) => {
    try {
        let today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const {id, status} = await req.body;
        let updateOrder = null;
        updateOrder = await pool.query(`UPDATE orders SET status='${status}', placed_at='${today}' WHERE id=${id}`);
        if(!updateOrder) res.status(400).json("Wrong credentials");
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update order error: "+error.message);  
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteOrder = await pool.query(`DELETE FROM orders WHERE id=${req.params.id}`);
        if(!deleteOrder) res.status(400).json("Error ocurred");
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete order error: "+error.message);  
    };
});

module.exports = router;