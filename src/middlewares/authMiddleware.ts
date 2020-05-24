import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authVerify = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        next();
    });
};