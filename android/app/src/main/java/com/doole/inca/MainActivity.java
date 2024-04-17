package com.doole.inca;

import android.os.Bundle;

import com.doole.inca.call.CallCapacitorPlugin;
import com.doole.inca.pushnotifications.PushNotificationsPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(CallCapacitorPlugin.class);
        registerPlugin(PushNotificationsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
