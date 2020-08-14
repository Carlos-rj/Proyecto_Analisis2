import {Request, Response} from 'express';

import pool from '../database'

class IndexController {
    public index (req: Request, res: Response) {
        pool.query("SELECT * FROM Tipo_Usuario");
        res.json("Estamos conectados desde la base en AWS")
    }
}

export const indexController = new IndexController();

