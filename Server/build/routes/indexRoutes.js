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
        this.router.post('/login', indexControllers_1.indexController.login);
        this.router.get('/login/colonias', indexControllers_1.indexController.colonias);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
