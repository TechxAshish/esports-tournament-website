const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
