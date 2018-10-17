import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-Dev-Middleware';
import webpackConfig from './webpack.config';
import api from './src/server/api.js';
//Initializing  packages
const app = express()

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/dist'));


//middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use('/api', api);



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});