package com.doole.inca.pushnotifications;

import android.util.Log;

import androidx.annotation.NonNull;

import com.doole.inca.call.CallCapacitor;
import com.google.android.gms.common.util.Strings;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;
import java.util.Objects;

public class MessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d("MessagingService", "Received notification");
        Map<String, String> data = remoteMessage.getData();
        String isVoIP = data.get("voip");
        if(isVoIP != null  && "true".equals(isVoIP.toLowerCase())) {
            CallCapacitor cc = new CallCapacitor(getApplicationContext());
            String caller = Objects.requireNonNullElse(data.get("caller"), "--");
            String callId = data.get("callId");
            if(Strings.emptyToNull(callId).isEmpty()) {
                Log.e("MessagingService", "Received call without callId: " + callId);
                return;
            }
            cc.receiveCall(caller, callId);
        } else {
            PushNotificationsPlugin.sendRemoteMessage(remoteMessage);
        }
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
        PushNotificationsPlugin.onNewToken(s);
    }
}
