import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRoutes from './routes/users.route'

const app = express()
app.disable('x-powered-by')

/** Middleware */
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(async (req, res, next) => {
	res.set('Content-Type', 'application/json')
	next()
})

/** Routes */
app.use('/user', userRoutes)
app.use('/', async (req, res) => {
	res.status(200).json({ message: 'Running on 3000!' })
})

/** Error handling */
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ error: err.message })
})

export default app

const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`))
