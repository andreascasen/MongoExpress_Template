import { MongoClient, ObjectID } from 'mongodb'

class DB {
	constructor (DB_URI) {
		this.client = new MongoClient(DB_URI, { useNewUrlParser: true })
		this.connection = null
		this.db = null
	}

	async connect (DB_NAME) {
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
			let collection = this.db.collection(collectionName)
			let result = await collection.findOne(params)
			return result
		} catch (err) {
			console.log('[FindOne] Err => ', err)
			return null
		}
	}
	
	async findById (collectionName, userId) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.findOne({ _id: new ObjectID(userId) })
			return result
		} catch (err) {
			console.log('[findById] Err => ', err)
			return null
		}
	}

	async findOneAndUpdate (collectionName, params = {}, data, opts) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.findOneAndUpdate(params, data, opts)
			return result
		} catch (err) {
			console.log('[findOneAndUpdate] Err => ', err)
			return null
		}
	}

	async findOneAndDelete (collectionName, params = {}, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.findOneAndDelete(params, opts)
			return result
		} catch (err) {
			console.log('[findOneAndDelete] Err => ', err)
			return null
		}
	}

	async find (collectionName, params = {}, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let results = await collection.find(params, opts)
			return results.toArray()
		} catch (err) {
			console.log('[Find] Err => ', err)
			return null
		}
	}

	async findAndUpdate (collectionName, query, sort, data, opts) {
		try {
			let collection = this.db.collection(collectionName)
			let results = await collection.findAndModify(query, sort, data, opts)
			return results
		} catch (err) {
			console.log('[FindAndUpdate] Err => ', err)
			return null
		}
	}

	async findAndDelete (collectionName, query, sort, opts) {
		try {
			let collection = this.db.collection(collectionName)
			let results = await collection.findAndRemove(query, sort, opts)
			return results
		} catch (err) {
			console.log('[findAndDelete] Err => ', err)
			return null
		}
	}

	async insertOne (collectionName, data, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.insertOne(data, opts)
			return result
		} catch (err) {
			console.log('[insertOne] Err => ', err)
			return null
		}
	}

	async insertMany (collectionName, docs, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.insertMany(docs, opts)
			return result
		} catch (err) {
			console.log('[insertMany] Err => ', err)
			return null
		}
	}

	async deleteOne (collectionName, params = {}, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.deleteOne(params, opts)
			return result
		} catch (err) {
			console.log('[deleteOne] Err => ', err)
			return null
		}
	}

	async deleteMany (collectionName, params = {}, opts = {}) {
		try {
			let collection = this.db.collection(collectionName)
			let result = await collection.deleteMany(params, opts)
			return result
		} catch (err) {
			console.log('[deleteMany] Err => ', err)
			return null
		}
	}

	disconnect () {
		this.db = null
		this.connection.close()
	}
}

export default DB
