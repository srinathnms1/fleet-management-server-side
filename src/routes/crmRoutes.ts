import { Request, Response, Application } from 'express';
import { ContactController } from "../controllers/crmController";

export class Routes {
    public contactController: ContactController = new ContactController();

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Default request successfulll!!!!'
                })
            });

        app.route('/contact')
            .get(this.contactController.getAllContacts);

        app.route('/contact/:contactId')
            .get(this.contactController.getContacts);

        app.route('/contact')
            .post(this.contactController.registerContact);

        app.route('/contact/:contactId')
            .put(this.contactController.putContact);

        app.route('/contact/:contactId')
            .delete(this.contactController.deleteContact);
    }
}