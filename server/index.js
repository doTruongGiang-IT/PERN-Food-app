const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/orders");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename:  (req, file, callback) => {
        callback(null, req.body.name);
    },
});

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
})