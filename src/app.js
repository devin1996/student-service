"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
//for the frontend application
app.use(cors({
    origin: ["http://localhost:3000"]
}));
app.use(express.json());
console.log('Listening to post 8000');
app.listen(8000);
