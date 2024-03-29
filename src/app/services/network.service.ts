import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private online$: Observable<boolean> = undefined;

    constructor(public network: Network, public platform: Platform) {
        this.online$ = new Observable(observer => {
            observer.next(true);
        }).pipe(mapTo(true));

        if (Capacitor.isNativePlatform()) {
            // on Device
            console.log('on Device');
            this.online$ = merge(
                this.network.onConnect().pipe(mapTo(true)),
                this.network.onDisconnect().pipe(mapTo(false))
            );
        } else {
            // on Browser
            console.log('on Browser');
            this.online$ = merge(
                of(navigator.onLine),
                fromEvent(window, 'online').pipe(mapTo(true)),
                fromEvent(window, 'offline').pipe(mapTo(false))
            );
        }
    }

    public getNetworkType(): string {
        return this.network.type;
    }

    public getNetworkStatus(): Observable<boolean> {
        return this.online$;
    }
}

