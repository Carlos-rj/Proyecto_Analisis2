"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/login', indexControllers_1.indexController.login);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
