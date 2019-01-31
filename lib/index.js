const commander = require('commander');
const currentDir = require('current-dir');
const fs = require('fs-extra');
const shell = require('shelljs');
const questions = require('questions');

const run = () => {
  commander
    .version('1.0.5')
    .option('-m, --mysql', 'With MySQL support')
    .option('-r, --react', 'Add React component')
    .option('-e, --express', 'Add Express router')
    .parse(process.argv);

  if (commander.react) {
    addReactComponent();
  } else if (commander.express) {
    addExpressRouter();
  } else {
    createApplication(commander);
  }
}

const createApplication = (commander) => {
  console.log();
  console.log('[react-express-starter-kit]');
  console.log('--------------------------------------------------');
  console.log();
  console.log('Mode: Create new application');
  if (commander.mysql) {
    console.log('      (With MySQL support)');
  }
  console.log();

  questions.askMany({
    appName: { info: 'App name' },
    appPort: { info: 'App port [3000]', required: false },
    appDescription: { info: 'App description', required: false }
  }, (result) => {
    let answer = {
      appName: result.appName,
      appPort: result.appPort,
      appDescription: result.appDescription
    };

    answer.appName = answer.appName.replace(/\s+/g, '_');

    answer.appPort = Number(answer.appPort);
    if (!answer.appPort) {
      answer.appPort = 3000;
    }

    console.log();
    console.log('--------------------------------------------------');
    console.log();

    copyTemplate(answer);
    createPackage(commander, answer);
    createAppConfig(commander, answer);
    createDbConfig(commander, answer);
    installNpm();
  });
}

const addReactComponent = (route) => {
  console.log();
  console.log('[react-express-starter-kit]');
  console.log('--------------------------------------------------');
  console.log();
  console.log('Mode: Add react component');
  console.log();

  questions.askMany({
    componentDir: { info: 'React component dir' },
    componentName: { info: 'React component name' },
    withReactRouter: { info: 'With react router [y/N]', required: false }
  }, (result) => {
    answer = {
      componentDir: result.componentDir,
      componentName: result.componentName,
      withReactRouter: result.withReactRouter
    };

    answer.componentDir = answer.componentDir.replace(/\s+/g, '_');
    answer.componentDir = answer.componentDir.charAt(0).toUpperCase() + answer.componentDir.slice(1)

    answer.componentName = answer.componentName.replace(/\s+/g, '_');
    answer.componentName = answer.componentName.charAt(0).toUpperCase() + answer.componentName.slice(1)

    answer.withReactRouter = answer.withReactRouter.replace(/^(.).*/, '$1');
    answer.withReactRouter = answer.withReactRouter.toUpperCase();

    console.log();
    console.log('--------------------------------------------------');
    console.log();

    let source = fs.readFileSync(__dirname + '/add/react/Template.jsx', 'utf-8');

    source = source.replace('class Template', 'class ' + answer.componentName);
    source = source.replace('export default Template', 'export default ' + answer.componentName);

    let dirPath = './src/views/' + answer.componentDir;
    let fileName = answer.componentName + '.jsx';
    let filePath = dirPath + '/' + fileName;

    fs.mkdirsSync(dirPath);
    fs.writeFileSync(filePath, source);

    console.log(filePath + ' file created successfully.');
    console.log();

    if (answer.withReactRouter === 'Y') {
      updateAppJs('react', answer.componentDir);
      updateRootJsx(answer.componentDir, answer.componentName);

      console.log('New routing created: /' + answer.componentDir.toLowerCase());
      console.log();
    }
  });
}

const addExpressRouter = (route) => {
  console.log();
  console.log('[react-express-starter-kit]');
  console.log('--------------------------------------------------');
  console.log();
  console.log('Mode: Add express router');
  console.log();

  questions.askOne({
    info: 'Express router name'
  }, (routerName) => {
    routerName = routerName.replace(/\s+/g, '_').toLowerCase();

    console.log();
    console.log('--------------------------------------------------');
    console.log();

    let source = fs.readFileSync(__dirname + '/add/express/template.js', 'utf-8');

    let fileName = routerName + '.js';
    let filePath = './api/' + fileName;

    fs.writeFileSync(filePath, source);

    console.log(filePath + ' file created successfully.');
    console.log();

    updateAppJs('express', routerName, filePath)
  });
}

const updateAppJs = (mode, routerName, filePath) => {
  let location;
  let contents;

  source = fs.readFileSync('./app.js', 'utf-8');

  if (mode === 'express') {
    location = source.search('\\s*//\\s*<REQUIRES>');
    contents = '\nconst api_' + routerName + ' = require(\'' + filePath + '\');';
    source = source.slice(0, location) + contents + source.slice(location);

    location = source.search('\\s*//\\s*<ROUTING-E>');
    contents = '\napp.use(\'/api/' + routerName + '\', api_' + routerName + ');';
    source = source.slice(0, location) + contents + source.slice(location);
  }
  else if (mode === 'react') {
    location = source.search('\\s*//\\s*<ROUTING-R>');
    contents = '\napp.use(\'/' + routerName.toLowerCase() + '\', express.static(__dirname + \'/src/public\'));';
    source = source.slice(0, location) + contents + source.slice(location);
  }

  fs.writeFileSync('./app.js', source);

  console.log('./app.js file updated successfully.');
  console.log();
}

const updateRootJsx = (componentDir, componentName) => {
  let location;
  let contents;

  source = fs.readFileSync('./src/views/Root.jsx', 'utf-8');

  location = source.search('\\s*//\\s*<IMPORTS>');
  contents = '\nimport ' + componentDir + componentName + ' from \'./' + componentDir + '/' + componentName + '.jsx\';';
  source = source.slice(0, location) + contents + source.slice(location);

  location = source.search('\\s*{/\\*\\s*<ROUTES>');
  contents = '\n          <Route exact path="/' + componentDir.toLowerCase() + '" component={' + componentDir + componentName + '} />';
  source = source.slice(0, location) + contents + source.slice(location);

  fs.writeFileSync('./src/views/Root.jsx', source);

  console.log('./src/views/Root.jsx file updated successfully.');
  console.log();
}

const createPackage = (commander, answer) => {
  let packageHash = {
    'name': answer.appName,
    'version': '1.0.0',
    'description': answer.appDescription,
    'private': true,
    'main': 'app.js',
    'devDependencies': {
      '@babel/core': '^7.2.2',
      '@babel/preset-env': '^7.2.2',
      '@babel/preset-react': '^7.0.0',
      '@babel/plugin-proposal-class-properties': '^7.2.2',
      'babel-loader': '^8.0.5',
      'webpack': '^4.28.4',
      'webpack-cli': '^3.2.1',
      'concurrently': '^4.1.0',
      'nodemon': '^1.18.9',
      'file-loader': '^3.0.1',
      'url-loader': '^1.1.2',
      'style-loader': '^0.23.1',
      'css-loader': '^2.1.0',
      'sass-loader': '^7.1.0',
      'node-sass': '^4.11.0'
    },
    'dependencies': {
      'axios': '^0.18.0',
      'helmet': '^3.15.0',
      'express': '^4.16.4',
      'react': '^16.7.0',
      'react-dom': '^16.7.0',
      'react-router': '^4.3.1',
      'react-router-dom': '^4.3.1',
      'body-parser': '^1.18.3',
      'cookie-parser': '^1.4.3'
    },
    'scripts': {
      'server': 'nodemon app.js',
      "start": 'concurrently "webpack --mode production --devtool false" "npm run server"',
      "debug": 'concurrently "webpack --mode development --devtool inline-source-map --watch --progress" "npm run server"'
    }
  };

  if (commander.mysql) {
    packageHash.dependencies.mysql = '^2.16.0';
  }

  const packageText = JSON.stringify(packageHash, null, 2);

  fs.writeFileSync(currentDir() + '/package.json', packageText);

  console.log('./package.json file created successfully.');
  console.log();
}

const createAppConfig = (commander, answer) => {
  let apiKey = generateApiKey();

  let jsText = '';
  jsText += 'module.exports = {\n';
  jsText += '  name: \'' + answer.appName + '\',\n';
  jsText += '  port: ' + answer.appPort + ',\n';
  jsText += '  apiKey: \'' + apiKey + '\'\n';
  jsText += '};';

  fs.writeFileSync(currentDir() + '/app.config.js', jsText);

  console.log('./app.config.js file created successfully.');
  console.log();
}

const createDbConfig = (commander, answer) => {
  let jsText = '';
  jsText += 'module.exports = {';
  if (commander.mysql) {
    jsText += '\n';
    jsText += '  mysql: {\n';
    jsText += '    host: \'\',\n';
    jsText += '    user: \'\',\n';
    jsText += '    password: \'\',\n';
    jsText += '    database: \'\'\n';
    jsText += '  }\n';
  }
  jsText += '};';

  fs.writeFileSync(currentDir() + '/api/lib/db.config.js', jsText);

  console.log('./api/lib/db.config.js file created successfully.');
  console.log();
}

const copyTemplate = (answer) => {
  let from = __dirname + '/new';
  let to = currentDir();

  fs.copySync(from, to);

  let source = fs.readFileSync(currentDir() + '/src/public/index.html', 'utf-8');

  source = source.replace('<title>AppName</title>', '<title>' + answer.appName + '</title>');

  fs.writeFileSync(currentDir() + '/src/public/index.html', source);

  console.log('Template files copied successfully.');
  console.log();
}

const installNpm = () => {
  console.log('Installing npm dependencies...');
  console.log();

  shell.exec('npm install', { silent: false });

  console.log();
  console.log('Install finished!!');
  console.log();
}

const generateApiKey = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const keyLength = 32;

  let apiKey = '';
  for (let i = 0; i < keyLength; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return apiKey;
}

exports.run = run;