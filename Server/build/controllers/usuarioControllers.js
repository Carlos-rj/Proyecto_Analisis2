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
class UsuarioController {
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT u.idUsuario, u.nombres, u.apellidos, u.fecha_nacimiento, u.correo_electronico,'
                + ' u.contrasena, u.descripcion, t.nombre_tipo_usuario'
                + ' from Market.Usuario u, Market.Tipo_Usuario t'
                + ' Where idUsuario = ?'
                + ' and u.tipo_usuario = t.idTipoUsuario', [id]);
            if (rows.length > 0) {
                const user = rows[0];
                res.json(user);
            }
            else {
                res.json({ "res": false });
            }
        });
    }
    create_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const rows = yield database_1.default.query('INSERT INTO Market.Usuario set ?', [req.body]);
            res.json({ text: 'Usuario Creado' });
        });
    }
    //METODO PARA ACTUALIZAR USUARIO
    update_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const response = yield database_1.default.query('UPDATE Market.Usuario SET ? Where idUsuario = ?', [req.body, idUsuario]);
            //console.log(response);
            if (response.changedRows > 0) {
                res.json({ text: 'Usuario Modificado' });
                res.send(true);
            }
            else {
                res.send(false);
            }
        });
    }
    //ENDPOINT PARA LA ELIMINACION DE USUARIO
    delete_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const response = yield database_1.default.query('DELETE from Market.Usuario Where idUsuario = ?', [idUsuario]);
            res.json({ text: 'Usuario Eliminado' });
        });
    }
}
exports.usuarioController = new UsuarioController();
