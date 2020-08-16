import {Request, Response} from 'express';

import pool from '../database'

class UsuarioController {

    public async perfil (req: Request, res: Response) {
        const {id} = req.params;

        const rows = await pool.query('SELECT u.idUsuario, u.nombres, u.apellidos, u.fecha_nacimiento, u.correo_electronico,'
                                    +' u.contrasena, u.descripcion, t.nombre_tipo_usuario'
                                    +' from Market.Usuario u, Market.Tipo_Usuario t'
                                    +' Where idUsuario = ?'
                                    +' and u.tipo_usuario = t.idTipoUsuario', [id]);
        if(rows.length > 0)
        {
            const user = rows[0];
            res.json(user);                                                                 
        }
        else
        {
            res.json({"res":false}); 
        }        
    }
}

export const usuarioController = new UsuarioController();

