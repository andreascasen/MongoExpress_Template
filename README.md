#	Express MongoDB Starting Template 	#

This is a simple starting point for a MongoDB Express application, and primarily includes things I have found myself implementing over and over again on every project.
Besides MongoDB and Express, this template also includes authentication, done with **[bcrypt](https://www.npmjs.com/package/bcrypt)** & **[JWT](https://www.npmjs.com/package/jsonwebtoken)**.

##	Development & Production	 ##

**[Babel](https://babeljs.io/en/setup)** is a big part of this template, allowing developers to implement modern syntax such as **import / export**, **rest / spread**, etc. **[ESLint](https://www.npmjs.com/package/eslint)** is also heavily used in order to keep syntax consistent.

### Scripts ###

1. **dev:**
	Fires up the app locally, defaulting to port 8080.
2. **build:**
	"Babels" the code into the **/dist** folder, making it ready for depoyment.
3. **start:**
	Fires up the app locally, but from the **/dist** folder. Will fail if the folder is empty.