import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { testConnection } from './models/index.js';
import httpStatus from 'http-status';
// import userRoute from "./routes/authRoutes.js";
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 5001;

testConnection();

app.get('/', (req, res) => {
    res.send('Welcome to Finpay backend API');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use("/api/v1", routes)

//NOT FOUND
app.use('*', (_, res, __) => {
    return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: false, message: 'LOST YOUR WAY???' });
});

// ERROR HANDLER
app.use((err, _, res, __) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message;
    return res.status(statusCode).json({ success: false, message });
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
