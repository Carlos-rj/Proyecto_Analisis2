"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        database_1.default.query("SELECT * FROM Tipo_Usuario");
        res.json("Estamos conectados desde la base en AWS");
    }
}
exports.indexController = new IndexController();
