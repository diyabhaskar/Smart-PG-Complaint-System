const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); 

// 1. Connection string using User: DiyaBhaskar
const uri = "mongodb://DiyaBhaskar:iamdiya77@ac-vtkoslm-shard-00-00.sbl4w9w.mongodb.net:27017,ac-vtkoslm-shard-00-01.sbl4w9w.mongodb.net:27017,ac-vtkoslm-shard-00-02.sbl4w9w.mongodb.net:27017/student?ssl=true&replicaSet=atlas-19761l-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to Atlas as user: DiyaBhaskar");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}
connectDB();

// --- ROUTES ---

app.post('/api/complaints', async (req, res) => {
    try {
        const database = client.db("student"); 
        const collection = database.collection("complaints");

        const newComplaint = {
            name: req.body.name,
            issue: req.body.issue,
            category: req.body.category,
            date: new Date(),
            // This now takes the name from the form input
            submittedBy: req.body.name 
        };

        const result = await collection.insertOne(newComplaint);
        res.status(201).json({ message: "Saved to student database!", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Failed to save" });
    }
});