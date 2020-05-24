import { Request, Response, Application } from 'express';
import { ContactController } from '../controllers/crmController';
import { authVerify } from '../middlewares/authMiddleware';

export class CrmRoutes {
    public contactController: ContactController = new ContactController();

    public routes(app: Application): void {
        app.route('/contact')
            .get(authVerify, this.contactController.getAllContacts);

        app.route('/contact/:contactId')
            .get(authVerify, this.contactController.getContacts);

        app.route('/contact')
            .post(authVerify, this.contactController.registerContact);

        app.route('/contact/:contactId')
            .put(authVerify, this.contactController.putContact);

        app.route('/contact/:contactId')
            .delete(authVerify, this.contactController.deleteContact);
    }
}