# ArticleHub
A simple MERN (MongoDB Express.js React.js Node.js) stack Web Application to publish and view Articles.

### Installation 
1. Make sure you have Node.js and npm installed on your machine. Click [here](https://nodejs.org/en/download/package-manager/ "Install Node.js") to install.
2. Clone the repository on your system using 
    ```
    git clone https://github.com/Vatsal32/ArticleHub.git
    ```
3. Go into the cloned folder by
  ```
  cd ArticleHub
  ```
4. Create a ```.env``` file in the same directory and add the following in the document:
   ```
   JWT_KEY=ChooseTheKeyYouWishToUse
   MONGODB_URI=YourMongoDBUri
   ```
5. To install the required dependencies run
   ```
   npm install
   ```
6. To install client side dependencies run
   ```
   cd client
   npm install
   ```
7. Make sure your MonogDB server is up and running. To run the server run the following command in the ArticleHub folder
   ```
   npm start
   ```
8. To start the React.js server run the commands in the ArticleHub folder
   ```
   cd client
   npm start
   ```
9. The application will open in your browser. 
