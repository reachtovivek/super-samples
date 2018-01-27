import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as compression from "compression";
 import { AppRoute } from "./route/AppRoute";



/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;
  private router: express.Router;
  /**
   * NodeJS the application.
   *
   * @class Server
   * @method inIt
   * @static
   * @return Returns the newly created INSTANCE for this app.
   */
  public static inIt(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    //this.listen();
  }

  /**
   * server will listen on this port
   *
   * @class Server
   * @method listen
   */
  private listen():void {
    this.app.listen(3005, '0.0.0.0', () => {
    console.log('server is listening on :::: '+ 3005);
 });
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  private config():void {
    console.log('config');
    //compress response object
  this.app.use(compression());
  //handle cross origin
  this.app.use(cors());
    //add static paths
  this.app.use(express.static(path.join(__dirname, "public")));

  //use json form parser middlware
  this.app.use(bodyParser.json({limit: "25mb"}));

  //use query string parser middlware
  this.app.use(bodyParser.urlencoded({limit: "25mb",
    extended: true
  }));

  //use cookie parser middleware
  this.app.use(cookieParser("SECRET_GOES_HERE"));

  //catch 404 and forward to error handler
  this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    //cors apply//
	   res.header("Access-Control-Allow-Origin", "*");
		 res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
		 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Content-Type', 'application/json'); //set common resp format//
      err.status = 404;
      next(err);
  });

  }

  /**
    * Create router.
    *
    * @class Server
    * @method config
    * @return void
    */
  private routes():void {
    console.log('routes')
    // let router: express.Router;
    // router = express.Router();
    this.router = express.Router();

    //IndexRoute
    AppRoute.create(this.router);

    //use router middleware
    this.app.use(this.router);
  }

}
//const server = Server.inIt();
//module.exports = server;
