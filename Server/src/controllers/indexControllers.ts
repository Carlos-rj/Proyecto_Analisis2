import {Request, Response} from 'express';

import pool from '../database'
import jwt from "jsonwebtoken"

class IndexController {

    public index (req: Request, res: Response) {
        pool.query("SELECT * FROM Tipo_Usuario");
        res.json("Estamos conectados desde la base en AWS")
    }

    public async login (req: Request, res: Response) {
        const id = req.body.id;
        const password = req.body.password;

        const rows = await pool.query('SELECT * from Market.Usuario '+
                                       'Where idUsuario = ? and contrasena = ?', [id, password]);
        if(rows.length > 0)
        {
            const user = rows[0];
            const token: string = jwt.sign({_id : id}, 'tokentest',{
                expiresIn: 60 * 30                               
            })
            res.header('auth-token',token).json(user);                                                                 
        }
        else
        {
            res.json({"res":false}); 
        }        
    }
}

export const indexController = new IndexController();

