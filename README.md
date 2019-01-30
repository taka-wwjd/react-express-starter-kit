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
├ extension.js
├ webpack.config.js
├ config
│    ├ api.js
│    └ app.js
├ public
│    ├ index.html
│    ├ fonts
│    ├ images
│    ├ javascripts
│    └ stylesheets
│        └ scss
│        ├ _fonts.scss
│        └ main.scss
├ api
│    └ name.js
└ views
     ├ Root.jsx
     └ Index
          └ Welcome.jsx
```

* `config`
  * A directory where application configure is stored.
* `config/api.js`
  * Contains the api key for simple authentication of front-end and back-end connection.
  * This authentication is a simple one that prevents backend output from being drawn directly in the browser.
  * In fact, the build output of webpack contains the key as is.
* `config/app.js`
  * Contains the configure for back-end application (and MySQL).
  * You can add the necessary keys and values ​​freely to this file.
  * Be careful not to call this file from the front-end so that setting information is not included in the build output of webpack.
* `api`
  * A directory where Express router is stored.
* `api/name.js`
  * It's a back-end called from `views/Index/Welcome.jsx` and returning the application name.
* `views`
  * A directory where React component is stored.
* `views/Root.jsx`
  * The base file from which routing starts.
* `views/Index`
  * A directory for storing the components of the index screen to be displayed when accessing the root path /.
* `views/Index/Welcome.jsx`
  * A component file for drawing a welcome message on the index screen.

### Module Versions

```
"devDependencies": {
  "@babel/core": "^7.2.2",
  "@babel/preset-env": "^7.2.2",
  "@babel/preset-react": "^7.0.0",
  "@babel/plugin-proposal-class-properties": "^7.2.2",
  "babel-loader": "^8.0.5",
  "webpack": "^4.28.4",
  "webpack-cli": "^3.2.1",
  "concurrently": "^4.1.0",
  "nodemon": "^1.18.9",
  "file-loader": "^3.0.1",
  "url-loader": "^1.1.2",
  "style-loader": "^0.23.1",
  "css-loader": "^2.1.0",
  "sass-loader": "^7.1.0",
  "node-sass": "^4.11.0"
},
"dependencies": {
  "axios": "^0.18.0",
  "helmet": "^3.15.0",
  "express": "^4.16.4",
  "react": "^16.7.0",
  "react-dom": "^16.7.0",
  "react-router": "^4.3.1",
  "react-router-dom": "^4.3.1",
  "body-parser": "^1.18.3",
  "cookie-parser": "^1.4.3",
  "mysql": "^2.16.0" // If you need MySQL support.
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