// node.js 에서 ECMA Script Modules, 즉 ESM을 사용하기 위해 Package.json에 type:module 설정 필요
// ESM은 import, export등을 의미함.
// .js로 끝나는 모든 파일을 ES 모듈로 처리하기 때문에 Require 구문 대신 import 사용 필
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('game-store')
const games = database.collection('games')
const PORT = process.env.PORT

client.connect()
console.log('connected to mongo')

const app  = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('api running'))

app.get('/api/sports', async (req, res) => {
  let data = await games.find().toArray()
  data = [
    {
      name : 'sonny',
      team : 'spurs',
      goal : 35,
      age : 32,
      country : 'south korea'
    }
  ]
  console.log(data,"data")
  res.json(data)
})

app.post('/',async (req, res) => {
  await games.insertOne({name: req.name, team: req.team})
  res.json('item was added')
})