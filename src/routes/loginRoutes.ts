import { Application } from 'express';
import { LoginController } from '../controllers/loginController';

export class LoginRoutes {
    public loginController: LoginController = new LoginController();

    public routes(app: Application): void {
        app.route('/login')
            .post(this.loginController.login);

        app.route('/register')
            .post(this.loginController.register);
    }
}