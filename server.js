const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app                  = new (require('express'));
const chalk                = require('chalk');
const fs = require('fs');
const cors = require('cors');

const morgan = require('morgan');

const globalConfig         = require('./config/global');

const express   = require('express');
const apiRouter = express.Router();
const path = require('path');


const superagent = require('superagent');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser')


//这里从环境变量读取配置，方便命令行启动
const HOST = 'https://www.instagram.com'
//超时时间
const TIME_OUT = 30 * 1e3;

//设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use(bodyParser());
app.use((req, res, next) => {
    if (!req.timedout) next();
});

const DIST_DIR  = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const PORT        = process.env.PORT || globalConfig.expressPort;
let webpackConfig = {}

switch (process.env.NODE_ENV) {
    case 'production':
        webpackConfig = require('./config/webpack.config.prod');
        break;
    case 'staging':
        webpackConfig = require('./config/webpack.config.staging');
        break;
    case 'localdev':
        webpackConfig = require('./config/webpack.config.localdev');
        break;
    default:
        // development
        webpackConfig = require('./config/webpack.config.dev.js');
        break;
}


//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

//app.options('*', cors())

//app.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', 'http://api.instagram.com');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Appkey, X-Auth-Apptoken, X-Auth-Usertoken, X-Access-Token');
//
//    next();
//});

//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
//app.use(morgan('common', {stream: accessLogStream}));
//app.use(morgan('combined'));

app.get('/api/users', function (req, res) {
    var sreq = superagent.get('https://api.instagram.com/v1/users/search?q=eshowshow&access_token=4988264296.9f7d8bd.2d449d35ad7e44d191385f8d8e495989');
    sreq.pipe(res);
    sreq.on('end', function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
    });
});


if (process.env.NODE_ENV === 'localdev') {
    console.log('not ENV production')

    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            chunks: false,
            colors: true
        },
        reporter: true
    }));
    app.use(webpackHotMiddleware(compiler));






    app.get("*", (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'development') {
    //app.use(function(req, res, next){
    //    if(req.headers['x-forwarded-proto'] === 'http'){
    //        next();
    //    }else{
    //        res.redirect('http://' + req.hostname + req.url);
    //    }
    //});
    app.use(express.static(DIST_DIR));

    /* Redirect http to https */
    //app.get('*', function(req,res,next) {
    //    if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
    //        res.redirect('https://'+req.hostname+req.url);
    //    else
    //        next(); /* Continue to other routes if we're not redirecting */
    //});
    //app.use('v1/users/search', function (req, res) {
    //    console.log('GEEEEE')
    //
    //    //获得方法类型
    //    const method = req.method.toLowerCase();
    //    const sreq = request[method](HOST + req.originalUrl);
    //    //如果为 post 或者 put 则需要发送时传递body
    //    if (method === 'post' || method === 'put') {
    //        sreq.set('Content-Type', 'application/json')
    //            .send(req.body)
    //    }
    //    sreq.pipe(res);
    //    sreq.on('end', function (error, result) {
    //        if (error) {
    //            console.log(error);
    //            return;
    //        }
    //    });
    //});




    app.get("*", (req, res) => res.sendFile(HTML_FILE));
}

//app.get("*", function(req, res) {
//  res.sendFile(__dirname + '/index.html')
//})

app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    } else {

        if (process.env.NODE_ENV === 'localdev') {
            console.log('\n')
            console.log(chalk.bgBlack(" => run Express... => Webpack start building..."));
        }else{
            console.log(chalk.bgBlack(` => Express on ${PORT}..`));
        }

        console.log(chalk.green(" => Node Env: ") + chalk.green(process.env.NODE_ENV));
    }
})
