import { isPlatform } from '@ionic/angular';
import config from '../../../capacitor.config';
import { ChangeEndpointsService } from '../services/change-endpoints.service';
export let SentryConfi: any;
export let AppVersion: any;



 SentryConfi = localStorage.getItem("SentryConfi");
 AppVersion = localStorage.getItem("AppVersion");



