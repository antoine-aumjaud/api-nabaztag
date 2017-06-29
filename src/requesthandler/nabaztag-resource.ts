import { NextFunction, Request, Response, Router } from "express";

import NabaztagService from '../service/nabaztag-service';

export default class NabaztagRessource {
    
    private readonly nabaztagService = new NabaztagService();

    public getRouter() : Router {
        return Router()
            .get("/isWakeUp",     (req: Request, res: Response) => this.isWakeUp(res))
            .post("/wakeUp",      (req: Request, res: Response) => this.wakeUp(res))
            .post("/sendMessage", (req: Request, res: Response) => this.sendMessage(req, res))
            .post("/moveEarLeft", (req: Request, res: Response) => this.moveEarLeft(req, res))
            .post("/moveEarRight",(req: Request, res: Response) => this.moveEarRight(req, res))
            .post("/changeColor", (req: Request, res: Response) => this.changeColor(req, res))
    }

    public isWakeUp(response: Response) {
        this.nabaztagService.isWakeUp()
            .then((result) => response.send(result));
    }
    public wakeUp(response: Response) {
        this.nabaztagService.isWakeUp()
            .then((result) => this.nabaztagService.wakeUp());
        response.end();
    }
    public sendMessage(request: Request, response: Response) {
        const message = request.body.message;
        this.nabaztagService.sendMessage(message);
        response.end();
    }
    public moveEarLeft(request: Request, response: Response) {
        const value = request.body.position;
        this.nabaztagService.moveEarLeft(value);
        response.end();
    }
    public moveEarRight(request: Request, response: Response) {
        const value = request.body.position;
        this.nabaztagService.moveEarRight(value);
        response.end();
    }
    public changeColor(request: Request, response: Response) {
        const color = request.body.color;
        this.nabaztagService.changeColor(color);
        response.end();
    }
}
