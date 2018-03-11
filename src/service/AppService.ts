import {Request } from "express";
import { AppDaos } from "../daos/AppDaos";
import { AppUtilities } from "../utilities/AppUtilities";
import {ApiConfig} from "../mapping/config";


/**
 * Constructor
 *
 * @class AppService
 */
export class AppService {


  private appDaos=new AppDaos();
  private appUtilities=new AppUtilities();

  /**
   * Constructor
   *
   * @class AppService
   * @constructor
   */
  constructor() {
    //initialize variables

  }



  /**
   * get method of service.
   *
   * @return void
   */
  public get():void {
    console.log('get service');
    this.appDaos.get();
    this.appUtilities.utilities();
  }

    /**
     * get method of service.
     *
     * @return void
     */
    public async getInformationRetrieval(req:Request):Promise<any> {
       // console.log(' getInformationRetrieval service',req.query);
        let options =
            {
                method: 'GET',
                params: req.query,
                dataType: 'json'
            }
        return await AppUtilities.getInformation(ApiConfig.informationRetrieval,options);

    }
}
