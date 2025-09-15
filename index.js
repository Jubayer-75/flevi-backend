require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose"); // Add this line
const app = express();
app.use(express.json());
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple Message model
const Message = mongoose.model("Message", { text: String });

app.get("/", (req, res) => {
  res.send("Hello Baby jan, Node.js is running! 🚀");
});

app.get("/about", (req, res) => {
  res.send("This is the About page!");
});

app.get("/api/info", (req, res) => {
  res.json({ name: "Baby jan", status: "Backend running", version: "1.0" });
});

app.get("/greet", (req, res) => {
  const name = req.query.name || "Guest";
  res.send(`Hello, ${name}!`);
});

// Save message to database
app.post("/api/message", async (req, res) => {
  const { message } = req.body;
  const newMessage = new Message({ text: message });
  await newMessage.save();
  res.json({ received: message, saved: true });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

});
