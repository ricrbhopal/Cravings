import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;