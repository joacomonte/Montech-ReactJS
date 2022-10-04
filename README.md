## Table of contents
* [General info](#general-info)
* [Technologies and Modules used](#technologies-and-modules-used)
* [Visualize the web](#visualize-the-web)
* [Setup](#setup)


## General info
Montech is a website with no other porpuse other than apply what i have been learning about ReactJS and NodeJS. 

The Montech web design is original, made from scratch with light influence from other sources.
	
## Technologies and Modules used
### Client Side
- useLayoutEffect
- AuthContext
- useNavigate
- useParams
- axios
- formik (for forms)
- yup (for validation schema)
- react-router-dom (Links, Routes...)
- AsyncPaginate
- Modals & Portals (for product preview img)


### Server Side
- express
- Sequelize (to create tables on MySQL)
- dontenv
- jsonwebtoken
- bscrypt

### SQL Server
i have used https://www.freesqldatabase.com to host my SQL db
	
## Visualize the Web
Montech Server side is hosted on Heroku and the Front side is on Netlify.

Here is the link: https://montech.netlify.app
	
## Setup
To run this project, install it locally using npm:

### on Client Side
```
$ cd client
$ npm i
$ npm start
```

### on Client Side
```
$ cd server
$ npm i
$ npm nodemon index.js
```
