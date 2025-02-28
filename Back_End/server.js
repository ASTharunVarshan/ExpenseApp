// Import express
const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")

// Create an Express app
const app = express();
app.use(cors())
app.use(express.json())

// Define a route for the homepage
// app.get('/', (req, res) => {
// res.send('Hello, Express.js!');
// });
// Create expense
const mongoURI = 'mongodb+srv://astharunvarshansocial:mR6PKMtNg4FJ8EIm@cluster0.p3mvk.mongodb.net/expenses?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, 
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => 
      console.error('MongoDB connection error:', err));
const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: Date,
  })
  
  const Expense = mongoose.model("Expense", expenseSchema)
app.post("/api/expenses", async (req, res) => {
    try {
      const newExpense = new Expense(req.body)
      await newExpense.save()
      res.status(200).json(newExpense)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  
  // Get all expenses
  app.get("/api/expenses", async (req, res) => {
    try {
      const expenses = await Expense.find()
      res.json(expenses)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  //Update expense
app.put("/api/expenses/:id", async (req, res) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json({
        message: "Expense updated successfully",
        updatedExpense,
      });
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  

// Delete expense
app.delete("/api/expenses/:id", async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id)
      res.json({ message: "Expense deleted successfully" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
     
// Start the server on port 3000
app.listen(8080, () => {
console.log('Server is running on http://localhost:8080');
});