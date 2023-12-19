require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const globalError = require('./middlewares/global-error');
const { reqestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(reqestLogger);
app.use('/api/', require('./routes/index'));

app.use(errorLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(helmet());

app.use(errors());
app.use(globalError);

app.listen(PORT);
