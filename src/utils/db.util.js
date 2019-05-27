import { MongoClient, ObjectID } from 'mongodb'
import { DB_URI, DB_NAME } from '../env'

class DB {
	constructor () {
		this.client = new MongoClient(DB_URI, { useNewUrlParser: true })
		this.connection = null
		this.db = null
	}

	async connect () {
		try {
			this.connection = this.client.connect()
			this.db = this.client.db(DB_NAME)
			return await this.connection
		} catch (err) {
			console.log('DB CONNECT ERR => ', err)
			return null
		}
	}

	async findOne (collectionName, params = {}) {
		try {
			let collection = await this.db.collection(collectionName)
			let result = await collection.findOne(params)
			return result
		} catch (err) {
			console.log('FindOne Err => ', err)
			return null
		}
	}

	async insertOne (collectionName, data) {
		try {
			let collection = await this.db.collection(collectionName)
			let result = await collection.insertOne(data)
			return result
		} catch (err) {
			console.log('insertOne Err => ', err)
			return null
		}
	}

	async findById (collectionName, userId) {
		try {
			let collection = await this.db.collection(collectionName)
			let result = await collection.findOne({ _id: new ObjectID(userId) })
			return result
		} catch (err) {
			console.log('FindOne Err => ', err)
			return null
		}
	}

	disconnect () {
		this.db = null
		this.connection.close()
	}
}

export default DB
