import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-Dev-Middleware';
import webpackConfig from '../../webpack.config';

//Initializing  packages
const app = express()

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

//Routes
app.get('/', (req, res) => {
    res.send('Hello...');
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});