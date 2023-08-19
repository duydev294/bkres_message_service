const express = require("express")
const MongoClient = require('mongodb').MongoClient
require("dotenv").config()
const url = process.env.MONGO_URL
var device_router = express.Router()

device_router.get('/data/sensors',  async (req, res)=>{
    const client = await MongoClient
        .connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); })
    const database = client.db("devices")
    const collection = database.collection("water_info")
    const data = await collection.find({}).toArray()
    // console.log(data)
    client.close()

    res.send({ data: data })
})
device_router.get('/data/sensor', async (req, res) => {
    const ip = req.query.ip
    const client = await MongoClient
        .connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); })
    const database = client.db("admin")
    const collection = database.collection("devices")
    const data = await collection.findOne({ "device_ip": ip })
    console.log(ip)
    client.close()

    res.send({ data: data })
})
device_router.get('/data/idsensor', async (req, res) => {
    const id = req.query.id
    const client = await MongoClient
        .connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); })
    const database = client.db("admin")
    const collection = database.collection("devices")
    const data = await collection.findOne({ "device_id": id })
    console.log(id)
    client.close()

    res.send({ data: data })
})
module.exports = device_router