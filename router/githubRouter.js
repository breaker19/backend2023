import { Router } from 'express';
import session from 'express-session';
import { antenticacionPorGithub_CB, autenticacionPorGithub, passportInitialize, passportSession} from '../src/middlewares/passport.js';
import MongoStore from 'connect-mongo';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';

export const githubRouter = Router();

githubRouter.use(session({
    store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR }),
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false
  })); 

githubRouter.use(passportInitialize, passportSession)

githubRouter.get('/github', autenticacionPorGithub)

githubRouter.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/api/session/githubcallback') })


