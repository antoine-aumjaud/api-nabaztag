import { NextFunction, Request, Response, Router } from "express";

import NabaztagService from '../service/nabaztag-service';

export default class NabaztagRessource {
    
    private readonly nabaztagService = new NabaztagService();

    public getRouter() : Router {
        return Router()
            .get("/isAwake",      (req: Request, res: Response) => this.isAwake(res))
            .post("/wakeUp",      (req: Request, res: Response) => this.wakeUp(res))
            .post("/sleep",       (req: Request, res: Response) => this.sleep(res))
            .post("/sendMessage", (req: Request, res: Response) => this.sendMessage(req, res))
            .post("/moveEarLeft", (req: Request, res: Response) => this.moveEarLeft(req, res))
            .post("/moveEarRight",(req: Request, res: Response) => this.moveEarRight(req, res))
            .post("/changeColor", (req: Request, res: Response) => this.changeColor(req, res))
    }

    public isAwake(response: Response) {
        this.nabaztagService.isAwake()
            .then((result) => response.json({isAwake: result}));
    }
    public wakeUp(response: Response) {
        this.nabaztagService.wakeUp();
        response.end();
    }
    public sleep(response: Response) {
        this.nabaztagService.sleep();
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
