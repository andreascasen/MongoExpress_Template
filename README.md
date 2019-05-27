#	Express MongoDB Starting Template 	#

This is a simple starting point for a MongoDB Express application, and primarily includes things I have found myself implementing over and over again on every project.
Besides MongoDB and Express, this template also includes authentication, done with **[bcrypt](https://www.npmjs.com/package/bcrypt)** & **[JWT](https://www.npmjs.com/package/jsonwebtoken)**.

### Table of Contents ###
1. [ Scripts & Syntax. ](#syntax)
2. [ The Code. ](#code)

## 1. Description

<a name="syntax"></a>
##	Scripts & Syntax	 ##

**[Babel](https://babeljs.io/en/setup)** is a big part of this template, allowing developers to implement modern syntax such as **import / export**, **rest / spread**, etc. **[ESLint](https://www.npmjs.com/package/eslint)** is also heavily used in order to keep syntax consistent.

### Scripts ###

1. **dev:**
   
	Fires up the app locally, defaulting to port 8080.
2. **build:**
   
	"Babels" the code into the **/dist** folder, making it ready for depoyment.
3. **start:**
   
	Fires up the app locally, but from the **/dist** folder. Will fail if the folder is empty.

### Eslint ###

I included eslint and the linting rules I usually use. I personally feel like following these rules makes the code more readable, spaces it more evenly and keeps each file clean.

<a name="code"></a>
##	The Code 	##

### Middleware ###
Out of the box, this template includes the minimum amount of middleware:

**[body-parser](https://www.npmjs.com/package/body-parser):**
The good old BodyParser for express. Makes the bodies from incoming requests available.

**[cors](https://www.npmjs.com/package/cors):**
The classic CORS middleware. Configure it to dictate which origins can access your API, as well as filtering out unallowed methods.

### The DB Class  ###
The DB class is meant to simplify database operations, and is built entirely on top of the **[ mongodb library ](https://www.npmjs.com/package/mongodb)** from npm.


