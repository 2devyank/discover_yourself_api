"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { postconv } = require('../controller/Conversation');
const { getconvbyid } = require('../controller/Conversation');
const conrouter = express.Router();
conrouter.route("/converse").post(postconv);
conrouter.route("/converse/:id").get(getconvbyid);
module.exports = conrouter;
