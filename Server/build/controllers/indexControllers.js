"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IndexController {
    index(req, res) {
        database_1.default.query("SELECT * FROM Tipo_Usuario");
        res.json("Estamos conectados desde la base en AWS");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const password = req.body.password;
            const rows = yield database_1.default.query('SELECT * from Market.Usuario ' +
                'Where idUsuario = ? and contrasena = ?', [id, password]);
            if (rows.length > 0) {
                const user = rows[0];
                const token = jsonwebtoken_1.default.sign({ _id: id }, 'tokentest', {
                    expiresIn: 60 * 30
                });
                res.header('auth-token', token).json(user);
            }
            else {
                res.json({ "res": false });
            }
        });
    }
}
exports.indexController = new IndexController();
