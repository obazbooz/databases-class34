import { MongoClient } from 'mongodb';
const uri =
  'mongodb+srv://hyfuser:hyfpassword@cluster0.x4fs6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  if (err) {
    throw err;
  }

  const dbWorld = client.db('world');
  const collection = client.db('world').collection('city');
  const newDocument = {
    ID: 5000,
    Name: 'Samo',
    CountryCode: 'SYR',
    District: 'Samo Street',
    Population: 1,
  };

  const findDocumentQueryByName = { Name: 'Samo', Population: 1 };
  const updateDocumentNewValue = { $set: { Population: 1 } };

  const pipeline = [
    {
      $match: {
        Name: 'Samo',
      },
    },
    {
      $match: {
        CountryCode: 'SYR',
      },
    },
  ];

  let insertDocument = await collection.insertOne(newDocument, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`Document added!`);
  });

  let updateDocument = await collection.updateOne(
    findDocumentQueryByName,
    updateDocumentNewValue,
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log(`Document updated!`);
    },
  );

  const agg = await collection.aggregate(pipeline).toArray();
  console.log(agg);

  let deleteDocument = await collection.deleteOne(
    findDocumentQueryByName,
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log(`Document deleted!`);
    },
  );
});

client.close();
