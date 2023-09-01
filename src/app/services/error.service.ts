import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }


getClientMessage(error: any): any {

    if(error.constructor == Array){
        return error.toString();
    }else if(error.constructor == Object){
        return JSON.stringify(error);
    }else if(typeof error == 'object'){
        return error.message ? error.message : 'error';
    }else{
        return error;
    }    
           
}

getClientStack(error: Error): string {
    return error.stack;
}

getServerMessage(error: HttpErrorResponse): string {
   
    if(error.constructor == Array){
        return error;
    }else if(error.constructor == Object){
        return JSON.stringify(error);
    }else if(typeof error == 'object'){
        return error.message;
    }else{
        return error;
    }    
        
}

getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
}


}
