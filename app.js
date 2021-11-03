process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const os = require('os')
var bodyParser = require('body-parser')
var multer = require('multer')
var compression = require('compression')
var async = require("async")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const {beforeRequest} = require('./middleware/beforeRequest');


function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}

function setMiddleWares(app) {
    app.use((req, res, next) => { 
        // Set response headers
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Headers", "origin,X-Requested-With,Content-Type,Accept,Authorization")
        res.setHeader('Access-Control-Allow-Headers', '*');
        if(req.method =='OPTIONS'){
          const options = ['PUT','GET','PATCH','DELETE','POST']
          res.header("Access-Control-Allow-Methods", options.toString())
          return res.status(200).json({options: options})
        }

        next()
    })

    app.use(parallel([
        express.static('./public', {maxAge: '1y'}),
        express.static('./views/public', {maxAge: '1y'}),
        express.static('./data', {maxAge: '1y'}),
        compression(),
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded({limit: "50mb",extended: true, parameterLimit: 1000000}),
        multer({dest: __dirname + '/data/'}).any(),
        morgan('tiny') //combined , commomn or dev can be used
    ]));

    // Setting views
    app.set('views', path.join(__dirname, 'views'));    
    app.set('view engine', 'jade');

    app.use(beforeRequest) // Pre-process the request

    return app
}

function loadRoutes(app){
    require('./routes/index')(app)
    require('./routes/users')(app)

    // If not matched to any route, return not found error
    app.use((req, res, next) => {
        const error = new Error('Route Not Found')
        error.status = 404
        next(error)
    })

    // Randling errors that occur anywhere in the programme
    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        })
    })

    return app;
}

//Thread to receive requests, process them and emit responses
async function startWorkNode() {
    var app = express();
    app = setMiddleWares(app); // Set middlewares
    app = loadRoutes(app); // Load routes
    var {connection} = require('./config/sequelize');
    try { // Connect to the DB
        await connection.authenticate();
        console.log("Connection to database established successfully.");
    } catch (error) {
        console.error("Unable to connect to database:", error);
    }

    const http = require('http').createServer(app);
    var config = require('./config/config');
    http.listen(config.port, () => {
        console.log(`App running on port ${config.port}`)
        console.log(`Host Name ::: ${os.hostname()}`)
        console.log(`Host Architecture ::: ${os.arch()}`)
        console.log(`Host Platform ::: ${os.platform()}`)
        console.log(`Host Memory ::: ${os.totalmem()}`)
        console.log(`Host Os Type ::: ${os.type()}`)
        console.log(`Host Uptime::: ${os.uptime()}`)
    })
}

function init() {
    console.log('Environment: ', process.env.NODE_ENV)
    var cluster = require('cluster');
    // If production, run multi-threads dependent on the total number of CPUs available
    if (process.env.NODE_ENV == 'production') {
        console.log('Running in production mode...')
        if (cluster.isMaster) {
            var cpuCount = os.cpus().length; // Count the machine's CPUs
            console.log('CPUs count: ', cpuCount)
            for (var i = 0; i < cpuCount; i += 1) {
                cluster.fork(); // Create a worker for each CPU
            }
        } else {
            console.log('Worker %d running!', cluster.worker.id);
            startWorkNode() // Start a worker node
        }
    } else {
        startWorkNode() // Run a single thread
    }

    // Listen for dying workers and replace them
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
}

// Initialize and start the app
init();