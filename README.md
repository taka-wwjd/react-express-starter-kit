# react-express-starter

Create a new application with React(front-end) and Express(back-end).  
This application builds a secure environment using APIkey authentication for frontend and backend API calls.

## Getting Started

### Install:

```
npm install -g react-express-starter
```

### Create New Application

Run the command in the directory where you want to create the application.

```
rest
```

After answering some questions in interactive mode, a starter application is generated.

#### File Structure:

```
app
├ app.js
├ config.js
├ extension.js
├ webpack.config.js
├ public
│    ├ index.html
│    ├ fonts
│    ├ images
│    ├ javascripts
│    └ stylesheets
│        └ scss
│        ├ _fonts.scss
│        └ main.scss
├ routes
│    └ name.js
└ views
     ├ Root.jsx
     └ Index
          └ Welcome.jsx
```

* `routes`
  * A directory where Express router is stored.
* `routes/name.js`
  * It's a backend called from `views/Index/Welcome.jsx` and returning the application name.
* `views`
  * A directory where React component is stored.
* `views/Root.jsx`
  * The base file from which routing starts.
* `views/Index`
  * A directory for storing the components of the index screen to be displayed when accessing the root path /.
* `views/Index/Welcome.jsx`
  * A component file for drawing a welcome message on the index screen.

#### Optional MySQL support flag:

If you need MySQL support, the following option are available.

```
rest -m
```
or 
```
rest --mysql
```

## Add React Component



## Add Express Router
