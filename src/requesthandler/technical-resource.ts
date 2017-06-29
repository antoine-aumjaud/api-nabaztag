import { NextFunction, Request, Response, Router } from "express";

import * as config from '../conf/api-nabaztag.json';
import * as commonConfig from '../conf-common.json';

export default class TechnicalRessource {
    public getRouter() : Router {
        return Router()
            .get("/hi", (req: Request, res: Response) => res.send("hello"))
            .get("/info", (req: Request, res: Response) => this.info(req, res))
            .all("/secure/*", (req: Request, res: Response, next: NextFunction) => this.secure(req, res, next))
            .get('/secure/reloadConfig', (req: Request, res: Response) => res.status(500).send("Not implemented"))
    }

    /**
      * The info route
      *
      * @param req {Request} The express Request object.
      * @param res {Response} The express Response object.
      * @next {NextFunction} Execute the next method.
      */
    public info(req: Request, res: Response) {
        res.json({ "name": commonConfig.application_name, "version": commonConfig.application_version, "buildDate": commonConfig.build_date });
    }
    
    /**
      * The home page route.
      *
      * @param req {Request} The express Request object.
      * @param res {Response} The express Response object.
      * @next {NextFunction} Execute the next method.
      */
    public secure(req: Request, res: Response, next: NextFunction) {
        if (req.header("secure-key") === config.secureKey
            || req.query["secure-key"] === config.secureKey) {
            next();
        }
        else {
            console.log("SECURITY: error on access to this resource")
            res.status(401).send('Not authorized');
        }
    }
}
