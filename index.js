const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
  await client.connect();

  const userCollection = client.db('foodExpress').collection('user');
  app.post('/user', (req, res) => {
    const newUser = req.body;
    console.log('Adding new user', newUser);
    res.send({ result: 'Success!!' });
  });
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
