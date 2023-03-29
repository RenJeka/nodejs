const MongoClient = require('mongodb').MongoClient;

const _dbName = 'testJekaDB';
const _dbCollection = 'testCollectionJekaDB';
const mongoClient = new MongoClient('mongodb://localhost:27017/');

const db = mongoClient.db(_dbName);
const collection = db.collection(_dbCollection);


async function insertData() {
    await collection.insertOne(getDataToInsert());
    return JSON.stringify(await collection.find().toArray());
}

async function connectMongoDB() {
    try {
        await mongoClient.connect();

    } catch (error) {
        console.log(error);

    }
}

async function closeMongoDBConnection() {
    await mongoClient.close();
    console.log('connection closed');
}



function randomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTodayDate() {
    return new Date().toLocaleString()
}

function getDataToInsert() {
    return {firstName: 'Jeka', lastName: 'Good', age: randomAge(16, 50), date: getTodayDate()}
}

module.exports = {
    connectMongoDB: connectMongoDB,
    closeMongoDBConnection: closeMongoDBConnection,
    insertData: insertData
};
