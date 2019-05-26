import NodeCache from 'node-cache'

export const FILM_KEY = 'FILMS'
export const PEOPLE_KEY = 'PEOPLE'

/**
 * @class Cache
 * @description - Class responsible for handling all cache operations
 * @method read
 * @method write
 * @method delete
 * @method clear
 * @method close
 */
class Cache {
	constructor (ttlSeconds) {
		this.cache = new NodeCache({
			stdTTL: ttlSeconds, // Standard TTL for every cached data
			errorOnMissing: true
		})
	}

	async read (key) {
		try {
			const value = await this.cache.get(key)
			if (value === undefined) {
				return null
			}
			return value
		} catch (err) {
			console.log('Caching Error => ', err)
			return null
		}
	}

	async write (key, dataObj) {
		try {
			const success = await this.cache.set(key, dataObj)
			if (!success) {
				return null
			}
			return success
		} catch (err) {
			console.log('Caching Error => ', err)
			return null
		}
	}

	async delete (key) {
		try {
			const deleted = await this.cache.del(key)
			return deleted
		} catch (err) {
			console.log('Caching error => ', err)
			return null
		}
	}

	clear () {
		this.cache.flushAll()
	}

	close () {
		this.cache.close()
	}
}

export const cacheService = new Cache(30 * 60)
