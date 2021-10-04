import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../../services/logging.service';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector, public router: Router) { }

    handleError(error: Error | HttpErrorResponse) {
        
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);
        
        //const loading = this.injector.get(LoadingController);
        let message: string;
        let stackTrace: string;
       
        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getServerMessage(error);
            // Always log errors
            notifier.showError(message);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
           
            // Always log errors
            notifier.showError(message); 
        }

       
        //logger.logError(error);
      
    }
}