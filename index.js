const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// App initialization
const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDb configs

const uri =
  'mongodb+srv://dbuser1:AllaboutmongoDB@cluster1-km.7tchu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
/* client.connect((err) => {
  const collection = client.db('foodExpress').collection('users');
  console.log('DB connected');
  // perform actions on the collection object
  client.close()
}); */

/* async function run() {
  try {
    await client.connect();
    const userCollection = client.db('foodExpress').collection('users');
    const user = { name: 'Sabiha Sultana', email: 'sabihaSultana@gmail.com' };
    const result = await userCollection.insertOne(user);
    console.log(`User inserted with id:${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir); */

async function run() {
  try {
    await client.connect();
    console.log('MongoDB connection successful!');
    const userCollection = client.db('foodExpress').collection('user');

    // Get all user
    app.get('/user', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // Post User: add a new user.
    app.post('/user', async (req, res) => {
      const newUser = req.body;
      console.log('Adding new user', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // Delete a user
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    {
    }
  }
}

run().catch(console.dir);

// Get requests
app.get('/', (req, res) => {
  res.send('Running My Node CRUD server!');
});

// Post Requests

// Watch Dog
app.listen(port, () => {
  console.log('CRUD Server is running in port:5500');
});
