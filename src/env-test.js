require('dotenv').config();

const {DB_HOST,DB_USER,NODE_ENV}=process.env

console.log(DB_HOST,DB_USER,NODE_ENV);