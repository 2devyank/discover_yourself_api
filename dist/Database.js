"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({
    user: "devyanknagpal",
    password: "",
    host: "localhost",
    port: 5433,
    database: "intern"
});
exports.pool = pool;
