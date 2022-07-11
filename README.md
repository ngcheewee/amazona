# MERN AMAZONA
# Lessons
1. Introduction
2. Install Tools
3. Create React App
   1. npx create-react-app
4. Creat Git Repository
   1. move gitignore from frontend folfer to amazona folder
   2. remove / in build and node_module option
   3. goto source control and commit
5. List Products
   1. create product array
   2. add product image
   3. render products
   4. style products
6. Add routing
   1. npm i react-router-dom
   2. create route for home screen
   3. create route for product screen
7. Create Node.JS Server
   1. run npm init in backend folder
   2. update package.son set type: module (for using import instead of require)
   3. create server.js to backed folder
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. require express
   8. create route for / return backed is ready
   9. copy and paste data.js from frontend to backed
   10. create route for api/products
   11. npm install nodemon --save-dev and add 'start' in scripts option of package.json
   12. run npm start
8. Fetch products from Backed
   1. set proxy in package.json
   2. npm install axios
   3. use state hook
   4. use effect hook
   5. use reducer hook