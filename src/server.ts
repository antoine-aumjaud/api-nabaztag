import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ExpressApp } from 'api-nodelib';

import NabaztagRessource  from "./requesthandler/nabaztag-resource";

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    console.log('Nabaztag-API started on server 9080');
  }

  /**
   * Configure application
   */
  public config() {
    this.app
      .use(bodyParser.json())
      .listen(9080);
  }

  /**
   * Create router
   */
  public routes() {
    this.app
      .use('/', new ExpressApp('api-nabaztag').router())
      .use('/secure', new NabaztagRessource().getRouter())
  }
}

new Server();