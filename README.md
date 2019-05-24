# react-express-starter-kit

Create a new application with React(front-end) and Express(back-end).

## Getting Started

### Install

```
npm install -g react-express-starter-kit
```

### Create New Application

Run the command in a directory where you want to create the application.

```
rest
```

After answering some questions in interactive mode, new application will be generated.

#### MySQL Support Flag:

If you need MySQL support, the following option are available.

```
rest -m
```
or 
```
rest --mysql
```

### Run Application

Run the command in a directory of application root.

#### Production Mode:

```
npm start
```

Specify the following option in webpack and start it.  

`--mode production --devtool false`

#### Development Mode:

```
npm run debug
```

Specify the following option in webpack and start it.  

`--mode development --devtool inline-source-map --watch --progress`

#### Other Modes:

You can also changes webpack.config.js if necessary.

### File Structure

```
app
 ├ app.js
 ├ app.config.js
 ├ webpack.config.js
 ├ api
 │  ├ name.js
 │  └ lib
 │      ├ db.config.js
 │      └ extension.js
 └ src
     ├ public
     │  ├ index.html
     │  ├ fonts
     │  ├ images
     │  ├ javascripts
     │  └ stylesheets
     │       └ scss
     │           ├ _fonts.scss
     │           └ main.scss
     └ views
        ├ Root.jsx
        └ Index
            └ Welcome.jsx
```

* **app.config.js**
  * Configure for common references from React(front-end) and Express(back-end).
  * You can also add new key and value as needed.
  * **ATTENTION**  
  This file contain API key for validate of  React(front-end) and Express(back-end) between connection.  
  Please note that this authentication is a simple one that prevents Express(back-end) output from being drawn directly in the browser.  
  In fact, the build output of webpack contains API key as is.
* **api/**
  * Express(back-end) routers is stored.
* **api/name.js**
  * Express(back-end) router called from `views/Index/Welcome.jsx` and returning the application name.
* **api/lib/**
  * Configure and extend files is stored.
* **api/lib/db.config.js**
  * Configure for MySQL access(If you needed).
  * Be careful not to require or import this file from React(front-end) so that database authentication ID/PASS is not included in the build output of webpack.
* **api/lib/extension.js**
  * Contains extend functions used by Express (back-end).
  * You can also add new functions as needed.
* **views/**
  * React(front-end) component directories is stored.
  * Create directories in this hierarchy for each page required by the application.
* **views/Root.jsx**
  * React(front-end) routing starts point.
* **views/Index**
  * React(front-end) components is stored of the index screen to be displayed when accessing the root path /.
* **views/Index/Welcome.jsx**
  * React(front-end) component for drawing a welcome message on the index screen.

### Module Versions

```
"devDependencies": {
  "@babel/core": "^7.4.4",
  "@babel/preset-env": "^7.4.4",
  "@babel/preset-react": "^7.0.0",
  "@babel/plugin-proposal-class-properties": "^7.4.4",
  "babel-loader": "^8.0.6",
  "webpack": "^4.31.0",
  "webpack-cli": "^3.3.2",
  "concurrently": "^4.1.0",
  "nodemon": "^1.19.0",
  "file-loader": "^3.0.1",
  "url-loader": "^1.1.2",
  "style-loader": "^0.23.1",
  "css-loader": "^2.1.1",
  "sass-loader": "^7.1.0",
  "node-sass": "^4.12.0"
},
"dependencies": {
  "axios": "^0.18.0",
  "helmet": "^3.18.0",
  "express": "^4.17.0",
  "react": "^16.8.6",
  "react-dom": "^16.8.6",
  "react-router": "^5.0.0",
  "react-router-dom": "^5.0.0",
  "body-parser": "^1.19.0",
  "cookie-parser": "^1.4.4",
  "path": "^0.12.7"
  "mysql": "^2.17.1" // If you need MySQL support.
},
```

## Add React Component

Run the command in a directory of application root.

```
rest -r
```

After answering some questions in interactive mode, a new component will be added.  
The file structure of React component is one screen one directory structure.  
So, select the new or existing directory and enter the component name.

## Add Express Router

Run the command in a directory of application root.

```
rest -e
```

After answering some questions in interactive mode, a new router will be added.