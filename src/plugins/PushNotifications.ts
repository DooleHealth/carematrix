import { registerPlugin } from '@capacitor/core';

import type { PushNotificationsPlugin } from './definitions/PushNotificationsDef';

const PushNotifications = registerPlugin<PushNotificationsPlugin>(
  'PushNotifications',
  {},
);

export * from './definitions/PushNotificationsDef';
export { PushNotifications };