/**
 * Developers:
 * First Name: Tal
 * Last Name: Zechariya
 * ID: 318686532
 *
 * First Name: Shay
 * Last Name: Shuv
 * ID: 206842585
 *
 * First Name: Leor
 * Last Name: Marshall
 * ID: 315421990
 */
require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_DB_NAME:', process.env.MONGODB_DB_NAME);const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

module.exports = mongoose;

/*// חיבור עם MongoDB דרך Mongoose
mongoose.connect('mongodb+srv://shayshov:27JPWyrBHd4EnhAy@caloriescluster.e2zur.mongodb.net/CaloriesCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB with Mongoose');
}).catch((error) => {
    console.error('Error connecting to MongoDB with Mongoose:', error);
});

module.exports = mongoose;




// חיבור עם MongoDB דרך Mongoose עם משתני סביבה
mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
*/


/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ttal7997:Tt84268426@cluster0.6j9o8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);*/
