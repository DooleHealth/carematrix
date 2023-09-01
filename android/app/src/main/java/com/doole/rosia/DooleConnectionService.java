package com.doole.rosia;

import android.os.Bundle;
import android.telecom.Connection;
import android.telecom.ConnectionRequest;
import android.telecom.ConnectionService;
import android.telecom.DisconnectCause;
import android.telecom.PhoneAccountHandle;
import android.telecom.TelecomManager;
import android.util.Log;


public class DooleConnectionService extends ConnectionService {
    public String app_name = "Rosia";
    private static String TAG = "DooleConnectionService";
    private static Connection conn;

    Connection mConnection;
    public static Connection getConnection() {
        return conn;
    }

    @Override
    public Connection onCreateIncomingConnection(PhoneAccountHandle connectionManagerPhoneAccount, ConnectionRequest request) {
        Log.i(TAG,"DOOLE onCreateIncomingConnection");

        Connection incomingCallConnection = createConnection(request);
        incomingCallConnection.setRinging();
        incomingCallConnection.setInitializing();
        incomingCallConnection.setConnectionProperties(Connection.PROPERTY_SELF_MANAGED);
        incomingCallConnection.setCallerDisplayName(app_name, TelecomManager.PRESENTATION_ALLOWED);

        Bundle extras = new Bundle();
        extras.putBoolean(Connection.EXTRA_ANSWERING_DROPS_FG_CALL, true);
        extras.putString(Connection.EXTRA_CALL_SUBJECT, app_name);
        incomingCallConnection.putExtras(extras);

        return incomingCallConnection;

    }

    @Override
    public Connection onCreateOutgoingConnection(PhoneAccountHandle connectionManagerPhoneAccount, ConnectionRequest request) {

        Log.i(TAG,"DOOLE onCreateOutgoingConnection");
        Connection outgoingCallConnection = createConnection(request);
        outgoingCallConnection.setDialing();

        return outgoingCallConnection;
    }

    private Connection createConnection(ConnectionRequest request) {
         mConnection = new Connection() {
            @Override
            public void onStateChanged(int state) {
                super.onStateChanged(state);
            }

            @Override
            public void onDisconnect() {
                super.onDisconnect();
                mConnection.setDisconnected(new DisconnectCause(DisconnectCause.CANCELED));
                mConnection.destroy();
            }

            @Override
            public void onSeparate() {
                super.onSeparate();
            }

            @Override
            public void onAbort() {
                super.onAbort();
                mConnection.setDisconnected(new DisconnectCause(DisconnectCause.CANCELED));
                mConnection.destroy();
            }

            @Override
            public void onHold() {
                super.onHold();
            }

            @Override
            public void onAnswer() {
                super.onAnswer();
                mConnection.setActive();


            }

            @Override
            public void onReject() {
                super.onReject();
                mConnection.setDisconnected(new DisconnectCause(DisconnectCause.CANCELED));
                mConnection.destroy();

            }
        };
        mConnection.setAddress(request.getAddress(), TelecomManager.PRESENTATION_ALLOWED);
        mConnection.setExtras(request.getExtras());
        return mConnection;
    }
}
