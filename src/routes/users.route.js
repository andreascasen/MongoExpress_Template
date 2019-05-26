import { Router } from 'express'

import { generatePassword, isPasswordValid, signToken } from '../utils/auth.util'
import DB from '../utils/db.util'

const router = Router()
const USERS_COLLECTION = 'users'

/**
 * @function signUp
 * @description Register new user
 */
router.post('/signup', async (req, res, next) => {
	let db = new DB()

	let dbConnection = await db.connect()
	if (dbConnection === null) {
		res.status(500)
		res.send()
		return
	}

	const { username, password } = req.body

	let userQuery = await db.findOne(USERS_COLLECTION, { username })
	if (userQuery !== null) {
		res.status(400).json({ message: 'Unable to create user' })
	}

	let newPassword = await generatePassword(password)
	let newUserObject = {
		username,
		password: newPassword
	}
	let result = await db.insertOne(USERS_COLLECTION, newUserObject)
	if (result === null) {
		res.status(500).json({ error: 'Something broke' })
	} else {
		res.status(200).json({ message: 'User created' })
	}
})

/**
 * @function signIn
 * @description User log in
 */
router.post('/signin', async (req, res, next) => {
	let db = new DB()

	let dbConnection = await db.connect()
	if (dbConnection === null) {
		res.status(500)
		res.send()
		return
	}

	const { username, password } = req.body

	let user = await db.findOne(USERS_COLLECTION, { username })
	if (user === null) {
		res.status(401).json()
	}

	if (isPasswordValid(password, user.password)) {
		let payload = { username, id: user._id }
		let token = signToken(payload)
		res.status(200).json({ token })
	} else {
		res.status(401).json()
	}
})

export default router
