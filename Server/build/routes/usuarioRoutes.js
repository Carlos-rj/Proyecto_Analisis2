"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControllers_1 = require("../controllers/usuarioControllers");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/perfil/:id', usuarioControllers_1.usuarioController.perfil);
        this.router.post('/create-user', usuarioControllers_1.usuarioController.create_user); // Crear usuario
        this.router.put('/update-user/:idUsuario', usuarioControllers_1.usuarioController.update_user); // Editar el perfil
        this.router.put('/delete-user/:idUsuario', usuarioControllers_1.usuarioController.delete_user); // Eliminar el perfil
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
