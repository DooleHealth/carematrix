import { Injectable } from "@angular/core";
export interface PusherKey{ 
    app_id: string, 
    key: string, 
    secret: string, 
    cluster: string, 
  }
@Injectable({
    providedIn: 'root'
  })
export class Pushers {
  public readonly PUSHER_KEY_PRO: PusherKey = {
    app_id: "1753153",
      key: "ab568085e820d78c40dd",
      secret: "5d91abad2e285e24b38b",
      cluster: "eu"
}
    public readonly PUSHER_KEY_DEV: PusherKey = {
        app_id: "1753151",
        key: "4d712ee2fba4e1be4d4c",
        secret: "7593af5392913fbc8c54",
        cluster: "eu"
    }
   
}
