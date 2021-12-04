const router = require("express").Router();
const pool = require("../database.js");

router.get("/", async (req, res) => {
    const user = req.query.user;
    let orders = null;

    try {
        if(user) {    
            let orderID = await pool.query(`SELECT id FROM users WHERE lower(username)=lower('${user}')`);
            orderID = orderID.rows[0].id.toString();
            orders = await pool.query(`SELECT * FROM orders WHERE customerid=${orderID}`);
        }else {
            orders = await pool.query("SELECT * FROM orders ORDER BY orderid");  
        };
        if(!orders) res.status(400).json("Can't get order list");
        res.status(200).json(orders.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order list error: "+error.message);  
    };
});

router.get("/user/:id", async (req, res) => {
    try {
        const order = await pool.query(`SELECT * FROM orders WHERE customerid=${req.params.id}`);
        if(!order) res.status(400).json("Error ocurred");
        res.status(200).json(order.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order error: "+error.message);  
    };
});

router.get("/latest/:id", async (req, res) => {
    try {
        const order = await pool.query(`SELECT * FROM orders WHERE customerid=${req.params.id} ORDER BY orderid DESC LIMIT 1`);
        // const order = await pool.query(`SELECT * FROM orders WHERE customerid=${req.params.id}`);
        if(!order) res.status(400).json("Error ocurred");
        res.status(200).json(order.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order error: "+error.message);  
    };
});

router.get("/:id", async (req, res) => {
    try {
        const order = await pool.query(`SELECT * FROM orders WHERE orderid=${req.params.id}`);
        if(!order) res.status(400).json("Error ocurred");
        res.status(200).json(order.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get order error: "+error.message);  
    };
});

router.post("/", async (req, res) => {
    try {
        let today = new Date();
        // const dd = String(today.getDate());
        // const mm = String(today.getMonth() + 1); //January is 0!
        // const yyyy = today.getFullYear();
        // const HH = today.getHours();
        // const MM = today.getMinutes();
        // // today = mm + '/' + dd + '/' + yyyy + ":" + HH + MM;

        const {address, customer_id, price, phone} = req.body;
        const newOrder = await pool.query(`INSERT INTO orders(customerid, address, placed_at, status, order_price, phone_number) VALUES($1,$2,$3,$4,$5,$6)`,
        [customer_id, address, today, 'Order Placed', price, phone]);
        if(!newOrder) res.status(400).json("Wrong credentials");
        res.status(200).json(newOrder.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Create order error: "+error.message);  
    };
});

router.put("/:id", async (req, res) => {
    try {
        // let today = new Date();
        // const dd = String(today.getDate());
        // const mm = String(today.getMonth() + 1); //January is 0!
        // const yyyy = today.getFullYear();
        // today = mm + '/' + dd + '/' + yyyy;

        const order = await req.body;
        let updateOrder = null;
        updateOrder = await pool.query(`UPDATE orders SET status='${order.status}'${order.staffid !== null ? `, staffid=${order.staffid}` : ' '} WHERE orderid=${req.params.id}`);
        if(!updateOrder) res.status(400).json("Wrong credentials");
        res.status(200).json(updateOrder.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update order error: "+error.message);  
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteOrder = await pool.query(`DELETE FROM orders WHERE orderid=${req.params.id}`);
        if(!deleteOrder) res.status(400).json("Error ocurred");
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete order error: "+error.message);  
    };
});

module.exports = router;