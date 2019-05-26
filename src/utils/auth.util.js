import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import DB from './db.util'

import { JWT_SECRET } from '../env'

/**
 * @function generatePassword
 * @param { String } plainText
 * @returns { String }
 */
export const generatePassword = async (plainText) => {
	try {
		let salt = await bcrypt.genSalt(10)
		let hash = await bcrypt.hash(plainText, salt)
		return hash
	} catch (err) {
		console.log('[generatePassword] Err => ', err)
		return null
	}
}

/**
 * @function isPasswordValid
 * @param { String } plainText
 * @param { String } hash
 * @returns { Boolean }
 */
export const isPasswordValid = async (plainText, hash) => {
	let match = await bcrypt.compare(plainText, hash)
	return match
}

export const signToken = (payload, hours) => {
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: `${ hours }h` })
	return token
}

const verifyToken = async token => {
	try {
		const decoded = await jwt.verify(token, JWT_SECRET)
		return decoded
	} catch (err) {
		return null
	}
}

/**
 * @function authenticateByToken
 * @param { Object } headers
 * @returns { Boolean | Null}
 */
export const authenticateByToken = async (headers) => {
	const { authorization = null } = headers
	if (authorization === null) {
		return false
	}

	let token = authorization.split(' ')[1]
	let decoded = await verifyToken(token, JWT_SECRET)
	if (decoded === null) {
		return false
	}

	let db = new DB()
	let connection = await db.connect()
	if (connection === null) {
		return null
	}

	let user = await db.findOne('users', { username: decoded.username })
	if (user === null) {
		return false
	}

	return true
}
