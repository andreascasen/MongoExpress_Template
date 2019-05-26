/**
 * Database variables
 */
const DB_USER = process.env.DB_USER || 'dbadmin'
const DB_PWD = process.env.DB_PWD || 'admin123'
export const DB_NAME = process.env.DB_NAME || 'toll-calculator'
export const DB_URI = process.env.DB_URI || `mongodb://${ DB_USER }:${ DB_PWD }@ds149606.mlab.com:49606/${ DB_NAME }`

/**
 * General
 */
export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'
