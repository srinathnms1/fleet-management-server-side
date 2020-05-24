import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { CrmRoutes } from './routes/crmRoutes';
import { LoginRoutes } from './routes/loginRoutes';
import { authVerify } from './middlewares/authMiddleware';

class App {
    public app: express.Application;
    public router = express.Router();
    public crmRoutePrv: CrmRoutes = new CrmRoutes();
    public loginRoutePrv: LoginRoutes = new LoginRoutes();
    public mongoUrl: string = 'mongodb://localhost/CRMdb';
    // public mongoUrl: string = 'mongodb+srv://srinathnms:<password>@cluster0-goawe.mongodb.net/test?retryWrites=true&w=majority';

    public constructor() {
        this.app = express();
        this.config();
        this.configCors();
        this.configRoutes();
        this.mongoSetup();
    }

    private config(): void {
        dotenv.config();
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private configCors(): void {
        this.app.use(cors({
            origin: 'http://yourapp.com'
          }));
    }

    private configRoutes(): void {
        this.loginRoutePrv.routes(this.app);
        this.app.use(authVerify);
        this.crmRoutePrv.routes(this.app);
    }

    private mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;