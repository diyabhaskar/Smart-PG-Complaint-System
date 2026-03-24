const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb://DiyaBhaskar:iamdiya77@ac-vtkoslm-shard-00-00.sbl4w9w.mongodb.net:27017,ac-vtkoslm-shard-00-01.sbl4w9w.mongodb.net:27017,ac-vtkoslm-shard-00-02.sbl4w9w.mongodb.net:27017/student?ssl=true&replicaSet=atlas-19761l-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);
let db;

async function startServer() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        db = client.db("student");
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("DATABASE ERROR:", err.message);
        process.exit(1);
    }
}

startServer();

app.post('/api/complaints', async (req, res) => {
    if (!db) {
        return res.status(503).json({ error: "Database not ready yet" });
    }
    try {
        const collection = db.collection("complaints");
        const { name, issue, category } = req.body;

        const result = await collection.insertOne({
            name,
            issue,
            category,
            date: new Date()
        });

        console.log("Complaint saved:", result.insertedId);
        res.status(201).json({ message: "Saved successfully", id: result.insertedId });
    } catch (error) {
        console.error("Insert Error:", error);
        res.status(500).json({ error: "Failed to save to database" });
    }
});
