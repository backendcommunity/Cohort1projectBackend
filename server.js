import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Welcome to Finpay backend API');
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})