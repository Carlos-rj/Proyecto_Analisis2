import {Request, Response} from 'express';

import pool from '../database'

class UsuarioController {

    public async perfil (req: Request, res: Response) {
        const {id} = req.params;

        const rows = await pool.query('SELECT u.idUsuario, u.nombres, u.apellidos, u.fecha_nacimiento, u.correo_electronico,'
                                    +' u.contrasena, u.descripcion, t.nombre_tipo_usuario, c.nombre_colonia, r.nombre_residencial'
                                    +' from Market.Usuario u, Market.Tipo_Usuario t, Market.Colonia c, Market.Residencial r'
                                    +' Where idUsuario = ?'
                                    +' and u.tipo_usuario = t.idTipoUsuario' 
                                    +' and u.id_colonia = c.idColonia'
                                    +' and c.id_Residencial = r.idResidencial', [id]);
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

    public async create_user (req: Request, res:Response):Promise<void>{
        console.log(req.body);
        const rows =  await pool.query('INSERT INTO Market.Usuario set ?',[req.body]);

        res.json({text: 'Usuario Creado'});
    }

    //METODO PARA ACTUALIZAR USUARIO
    public async update_user(req: Request, res: Response):Promise<void> {
        const { idUsuario } = req.params;

        const response = await pool.query('UPDATE Market.Usuario SET ? Where idUsuario = ?', [req.body, idUsuario]);
        //console.log(response);
        if(response.changedRows > 0)
        {
            res.json({text: 'Usuario Modificado'});
            res.send(true);
        }
        else
        {
            res.send(false);
        }
    }

    //ENDPOINT PARA LA ELIMINACION DE USUARIO
    public async delete_user(req: Request, res: Response):Promise<void> {
        const { idUsuario } = req.params;

        const response = await pool.query('DELETE from Market.Usuario Where idUsuario = ?', [idUsuario]);
        res.json({text: 'Usuario Eliminado'});
    }
}

export const usuarioController = new UsuarioController();

