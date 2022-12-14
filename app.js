require('dotenv').config();
require('express-async-errors');

const morgan = require('morgan');


// express
const express = require('express');
const app = express();
// rest of the packages
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const cors = require('cors');
//datatbase
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');


// middleware
const notFoundMiddleware = require('./middleware/not-found');

const errorHandlerMiddleware = require('./middleware/error-handler');
const { application } = require('express');
//const test = require('./middlewtare/test');

app.use(morgan('tiny'));

app.use(express.json());


app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});


app.get('/', (req, res) => {
    res.send('e-commerce api');
})

app.get('/api/v1', (req, res) => {
    //console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('e-commerce api');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();
