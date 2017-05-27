const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app                  = new (require('express'));
const chalk                = require('chalk');
const globalConfig         = require('./config/global');

const express   = require('express');
const apiRouter = express.Router();
const path = require('path');
const igDownload = require('instagram-download')

// igDownload()

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


app.use(function(req, res, next) {
    //for CORS
    res.header('Access-Control-Allow-Origin', 'http://api.instagram.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Appkey, X-Auth-Apptoken, X-Auth-Usertoken, X-Access-Token');

    next();
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
    app.get('*', function(req,res,next) {
        if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
            res.redirect('https://'+req.hostname+req.url);
        else
            next(); /* Continue to other routes if we're not redirecting */
    });

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
