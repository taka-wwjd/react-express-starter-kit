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
  "@babel/core": "^7.8.3",
  "@babel/preset-env": "^7.8.3",
  "@babel/preset-react": "^7.8.3",
  "@babel/plugin-proposal-class-properties": "^7.8.3",
  "@babel/plugin-syntax-dynamic-import": "^7.8.3",
  "babel-loader": "^8.0.6",
  "webpack": "^4.41.5",
  "webpack-cli": "^3.3.10",
  "concurrently": "^5.0.2",
  "nodemon": "^2.0.2",
  "file-loader": "^5.0.2",
  "url-loader": "^3.0.0",
  "style-loader": "^1.1.2",
  "css-loader": "^3.4.2",
  "sass-loader": "^8.0.2",
  "node-sass": "^4.13.0",
  "sass": "^1.24.4",
  "fibers": "^4.0."
},
"dependencies": {
  "axios": "^0.19.1",
  "helmet": "^3.21.2",
  "express": "^4.17.1",
  "react": "^16.12.0",
  "react-dom": "^16.12.0",
  "react-router": "^5.1.2",
  "react-router-dom": "^5.1.2",
  "body-parser": "^1.19.0",
  "cookie-parser": "^1.4.4",
  "path": "^0.12.7"
  "mysql": "^2.17.1" // If you need MySQL support.
}
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