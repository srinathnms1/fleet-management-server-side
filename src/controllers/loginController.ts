import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export class LoginController {
    public login = async (req: Request, res: Response, next: NextFunction) => {
        const url = `${process.env.AUTH_API}/login`;
        await axios.post(url, req.body)
            .then((response) => {
                return res.send(response.data);
            })
            .catch((error) => {
                return res.send(error.response.data.message);
            });
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        const url = `${process.env.AUTH_API}/register`;
        await axios.post(url, req.body)
            .then((response) => {
                return res.send(response.data);
            })
            .catch((error) => {
                return res.send(error.response.data.message);
            });
    }
}