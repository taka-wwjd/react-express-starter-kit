const chalk = require('chalk')
const commander = require('commander')
const currentDir = require('current-dir')
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const questions = require('questions')

const CONSOLE_TITLE = chalk.bold.cyan('[react-express-starter-kit]')
const DEFAULT_PORT = 3000

const run = () => {
  commander
    .version('1.1.0')
    .option('-m, --mysql', 'With MySQL support')
    .option('-r, --react', 'Add React component')
    .option('-e, --express', 'Add Express router')
    .parse(process.argv)

  if (commander.react) {
    addReactComponent()
  } else if (commander.express) {
    addExpressRouter()
  } else {
    createApplication(commander)
  }
}

const createApplication = (commander) => {
  console.log()
  console.log(CONSOLE_TITLE)
  console.log('--------------------------------------------------')
  console.log()
  console.log('Mode: Create new application')
  if (commander.mysql) {
    console.log('      (With MySQL support)')
  }
  console.log()

  const count = getNumberOfDirItems('./')
  if (count >= 1) {
    console.log('--------------------------------------------------')
    console.log()
    console.log(chalk.white.bgMagenta(' ERROR '))
    console.log(chalk.magenta('To create a new application please run with the directory empty.'))
    console.log()

    return false
  }

  questions.askMany({
    appName: { info: 'App name' },
    appPort: { info: 'App port [' + DEFAULT_PORT + ']', required: false },
    appDescription: { info: 'App description', required: false }
  }, (result) => {
    let answer = {
      appName: result.appName,
      appPort: result.appPort,
      appDescription: result.appDescription
    }

    answer.appName = answer.appName.replace(/\s+/g, '_')
    answer.appPort = Number(answer.appPort)
    if (!answer.appPort) {
      answer.appPort = DEFAULT_PORT
    }

    console.log()
    console.log('--------------------------------------------------')
    console.log()

    copyTemplate(answer)
    createPackage(commander, answer)
    createAppConfig(commander, answer)
    createDbConfig(commander, answer)
    installNpm()
  })
}

const addReactComponent = (route) => {
  const viewsDirPath = 'src/views'
  const templateFilePath = path.resolve(__dirname, 'add/react/Template.jsx')

  console.log()
  console.log(CONSOLE_TITLE)
  console.log('--------------------------------------------------')
  console.log()
  console.log('Mode: Add react component')
  console.log('')

  try {
    fs.statSync(currentDir() + '/' + viewsDirPath)
  } catch (error) {
    console.log('--------------------------------------------------')
    console.log()
    console.log(chalk.white.bgMagenta(' ERROR '))
    console.log(chalk.magenta(`Can't locate directory: ./${viewsDirPath}`))
    console.log()

    return false
  }

  questions.askMany({
    componentDir: { info: 'React component dir' },
    componentName: { info: 'React component name' },
    withReactRouter: { info: 'With react router [y/N]', required: false }
  }, (result) => {
    let answer = {
      componentDir: result.componentDir,
      componentName: result.componentName,
      withReactRouter: result.withReactRouter
    }

    answer.componentDir = answer.componentDir.replace(/\s+/g, '_')
    answer.componentDir = answer.componentDir.charAt(0).toUpperCase() + answer.componentDir.slice(1)

    answer.componentName = answer.componentName.replace(/\s+/g, '_')
    answer.componentName = answer.componentName.charAt(0).toUpperCase() + answer.componentName.slice(1)

    answer.withReactRouter = answer.withReactRouter.replace(/^(.).*/, '$1')
    answer.withReactRouter = answer.withReactRouter.toUpperCase()

    console.log()
    console.log('--------------------------------------------------')
    console.log()

    const componentDirPath = viewsDirPath + '/' + answer.componentDir
    const componentFileName = answer.componentName + '.jsx'
    const componentFilePath = componentDirPath + '/' + componentFileName

    try {
      fs.statSync(currentDir() + '/' + componentFilePath)

      console.log(chalk.white.bgMagenta(' ERROR '))
      console.log(chalk.magenta(`File already exists: ./${componentFilePath}`))
      console.log()

      return false
    } catch (error) { }

    let source = fs.readFileSync(templateFilePath, 'utf-8')

    source = source.replace('class Template', `class ${answer.componentDir}${answer.componentName}`)
    source = source.replace('export default Template', `export default ${answer.componentDir}${answer.componentName}`)

    fs.mkdirsSync(componentDirPath)
    fs.writeFileSync(currentDir() + '/' + componentFilePath, source)

    console.log(`./${componentFilePath} file created successfully.`)
    console.log()

    if (answer.withReactRouter === 'Y') {
      const routerName = answer.componentDir.toLowerCase() + '/' + answer.componentName.toLowerCase()

      updateAppJs('react', routerName, null)
      updateRootJsx(answer.componentDir, answer.componentName, routerName)

      console.log(`New routing created: /${routerName}`)
      console.log()
    }
  })
}

const addExpressRouter = (route) => {
  const routerDirPath = 'api'
  const templateFilePath = path.resolve(__dirname, 'add/express/template.js')

  console.log()
  console.log(CONSOLE_TITLE)
  console.log('--------------------------------------------------')
  console.log()
  console.log('Mode: Add express router')
  console.log()

  try {
    fs.statSync(currentDir() + '/' + routerDirPath)
  } catch (error) {
    console.log('--------------------------------------------------')
    console.log()
    console.log(chalk.white.bgMagenta(' ERROR '))
    console.log(chalk.magenta(`Can't locate directory: ./${routerDirPath}`))
    console.log()

    return false
  }

  questions.askOne({
    info: 'Express router name'
  }, (routerName) => {
    routerName = routerName.replace(/\s+/g, '_').toLowerCase()

    console.log()
    console.log('--------------------------------------------------')
    console.log()

    const routerFileName = routerName + '.js'
    const routerFilePath = routerDirPath + '/' + routerFileName

    try {
      fs.statSync(currentDir() + '/' + routerFilePath)

      console.log(chalk.white.bgMagenta(' ERROR '))
      console.log(chalk.magenta(`File already exists: ./${routerFilePath}`))
      console.log()

      return false
    } catch (error) { }

    let source = fs.readFileSync(templateFilePath, 'utf-8')

    fs.writeFileSync(currentDir() + '/' + routerFilePath, source)

    console.log(`./${routerFilePath} file created successfully.`)
    console.log()

    updateAppJs('express', routerName, routerFilePath)
  })
}

const updateAppJs = (mode, routerName, routerFilePath) => {
  const appJsFilePath = 'app.js'
  const publicDirPath = 'src/public'
  const routerDirPath = 'api'
  const routerPrefix = '__api'

  let location
  let contents
  let source = fs.readFileSync(currentDir() + '/' + appJsFilePath, 'utf-8')

  switch (mode) {
    case 'express':
      location = source.search('\\s*//\\s*<REQUIRES>')
      contents = `\nconst ${routerPrefix}${snakeToPascal(routerName)} = require('./${routerFilePath}')`
      source = source.slice(0, location) + contents + source.slice(location)

      location = source.search('\\s*//\\s*<ROUTING-E>')
      contents = `\napp.use('/${routerDirPath}/${routerName}', ${routerPrefix}${snakeToPascal(routerName)})`
      source = source.slice(0, location) + contents + source.slice(location)

      break
    case 'react':
      location = source.search('\\s*//\\s*<ROUTING-R>')
      contents = `\napp.use('/${routerName}', express.static(path.resolve((__dirname, '${publicDirPath}'))))`
      source = source.slice(0, location) + contents + source.slice(location)

      break
  }

  fs.writeFileSync(currentDir() + '/' + appJsFilePath, source)

  console.log(`./${appJsFilePath} file updated successfully.`)
  console.log()
}

const updateRootJsx = (componentDir, componentName, routerName) => {
  const rootJsxFilePath = 'src/views/Root.jsx'

  let location
  let contents
  let source = fs.readFileSync(currentDir() + '/' + rootJsxFilePath, 'utf-8')

  location = source.search('\\s*//\\s*<IMPORTS>')
  contents = `\nconst ${componentDir}${componentName} = lazy(() => import('./${componentDir}/${componentName}.jsx'))`
  source = source.slice(0, location) + contents + source.slice(location)

  location = source.search('\\s*{/\\*\\s*<ROUTES>')
  contents = `\n            <Route exact path='/${routerName}' component={${componentDir}${componentName}} />`
  source = source.slice(0, location) + contents + source.slice(location)

  fs.writeFileSync(currentDir() + '/' + rootJsxFilePath, source)

  console.log(`./${rootJsxFilePath} file updated successfully.`)
  console.log()
}

const createPackage = (commander, answer) => {
  const packageJsonFilePath = 'package.json'

  let packageHash = {
    'name': answer.appName,
    'version': '1.0.0',
    'description': answer.appDescription,
    'private': true,
    'main': 'app.js',
    'devDependencies': {
      '@babel/core': '^7.4.5',
      '@babel/preset-env': '^7.4.5',
      '@babel/preset-react': '^7.0.0',
      '@babel/plugin-proposal-class-properties': '^7.4.4',
      '@babel/plugin-syntax-dynamic-import': '^7.2.0',
      'babel-loader': '^8.0.6',
      'webpack': '^4.35.0',
      'webpack-cli': '^3.3.5',
      'concurrently': '^4.1.1',
      'nodemon': '^1.19.1',
      'file-loader': '^4.0.0',
      'url-loader': '^2.0.1',
      'style-loader': '^0.23.1',
      'css-loader': '^3.0.0',
      'sass-loader': '^7.1.0',
      'node-sass': '^4.12.0'
    },
    'dependencies': {
      'axios': '^0.19.0',
      'helmet': '^3.18.0',
      'express': '^4.17.1',
      'react': '^16.8.6',
      'react-dom': '^16.8.6',
      'react-router': '^5.0.1',
      'react-router-dom': '^5.0.1',
      'body-parser': '^1.19.0',
      'cookie-parser': '^1.4.4',
      'path': '^0.12.7'
    },
    'scripts': {
      'start': 'concurrently "webpack --mode production --devtool false" "node app.js"',
      'debug': 'concurrently "webpack --mode development --devtool inline-source-map --watch --progress" "nodemon app.js"'
    }
  }

  if (commander.mysql) {
    packageHash.dependencies.mysql = '^2.17.1'
  }

  const packageText = JSON.stringify(packageHash, null, 2)

  fs.writeFileSync(currentDir() + '/' + packageJsonFilePath, packageText)

  console.log(`./${packageJsonFilePath} file created successfully.`)
  console.log()
}

const createAppConfig = (commander, answer) => {
  let apiKey = generateApiKey()

  let jsText = ''
  jsText += 'module.exports = {\n'
  jsText += `  name: '${answer.appName}',\n`
  jsText += `  port: ${answer.appPort},\n`
  jsText += `  apiKey: '${apiKey}'\n`
  jsText += '}\n'

  fs.writeFileSync(currentDir() + '/app.config.js', jsText)

  console.log('./app.config.js file created successfully.')
  console.log()
}

const createDbConfig = (commander, answer) => {
  const dbConfigFilePath = 'api/lib/db.config.js'

  let jsText = ''
  jsText += 'module.exports = {'
  if (commander.mysql) {
    jsText += '\n'
    jsText += '  mysql: {\n'
    jsText += '    host: \'\',\n'
    jsText += '    user: \'\',\n'
    jsText += '    password: \'\',\n'
    jsText += '    database: \'\'\n'
    jsText += '  }\n'
  }
  jsText += '}\n'

  fs.writeFileSync(currentDir() + '/' + dbConfigFilePath, jsText)

  console.log(`./${dbConfigFilePath} file created successfully.`)
  console.log()
}

const copyTemplate = (answer) => {
  const indexHtmlFilePath = 'src/public/index.html'

  let from = path.resolve(__dirname, 'new')
  let to = currentDir()

  fs.copySync(from, to)

  let source = fs.readFileSync(currentDir() + '/' + indexHtmlFilePath, 'utf-8')

  source = source.replace('<title>AppName</title>', `<title>${answer.appName}</title>`)

  fs.writeFileSync(currentDir() + '/' + indexHtmlFilePath, source)

  console.log('Template files copied successfully.')
  console.log()
}

const installNpm = () => {
  console.log('Installing npm dependencies...')
  console.log()

  shell.exec('npm install', { silent: false })

  console.log()
  console.log('Install finished!!')
  console.log()
}

const generateApiKey = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const keyLength = 32

  let apiKey = ''
  for (let i = 0; i < keyLength; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return apiKey
}

const getNumberOfDirItems = (path) => {
  let count = 0
  fs.readdirSync('./').forEach((itemName) => {
    if (!itemName.match(/^\./)) {
      count++
    }
  })

  return count
}

const snakeToPascal = (text) => {
  text = text.charAt(0).toUpperCase() + text.slice(1)

  return text.replace(/_./g, (s) => {
    return s.charAt(1).toUpperCase()
  })
}

exports.run = run
