package com.doole.inca.call

import android.app.PendingIntent
import android.content.Intent
import android.graphics.drawable.Icon
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.telecom.Connection
import android.telecom.ConnectionRequest
import android.telecom.ConnectionService
import android.telecom.DisconnectCause
import android.telecom.PhoneAccountHandle
import android.telecom.StatusHints
import android.telecom.TelecomManager
import android.telecom.VideoProfile
import android.util.Log
import androidx.core.content.ContextCompat
import com.doole.inca.MainActivity


class CallConnectionService: ConnectionService() {

    companion object {
        val activeCalls = HashMap<String, CallConnection>()
    }

    override fun onCreateIncomingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle,
        request: ConnectionRequest
    ): Connection {
        val from = request.extras.getString("from") ?: "--"
        val callId = request.extras.getString("callId") ?: throw Error("Missing callId when creating incomming connection")
        val connection = CallConnection(this, callId, from)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            connection.connectionProperties = Connection.PROPERTY_SELF_MANAGED
        }
        connection.setAddress(
            Uri.parse(from),
            TelecomManager.PRESENTATION_ALLOWED
        )
        connection.setCallerDisplayName(from, TelecomManager.PRESENTATION_ALLOWED)
        val icon: Icon? = null
        if (icon != null) {
            val statusHints = StatusHints("" as CharSequence, icon, Bundle())
            connection.statusHints = statusHints
        }
        connection.connectionProperties = Connection.PROPERTY_SELF_MANAGED
        connection.videoState = VideoProfile.STATE_BIDIRECTIONAL
        connection.setRinging()
        if(activeCalls.containsKey(callId)) {
            Log.e("CallConnectionService", "(replacing) Call with id was already ringing! $callId")
            activeCalls[callId]!!.setDisconnected(DisconnectCause(DisconnectCause.ERROR))
        }
        activeCalls[callId] = connection
        return connection
    }

    override fun onCreateOutgoingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle,
        request: ConnectionRequest
    ): Connection {
        throw NotImplementedError("Outgoing calls out of scope for this plugin for now")
    }

    fun connectionEnded(c: CallConnection) {
        val sendIntent = Intent(this, MainActivity::class.java)
        sendIntent.action = CallActionReceiver.ACTIONS.DISCONNECTED.name
        sendIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        ContextCompat.startActivity(this, sendIntent, null)
        PendingIntent.getActivity(this, 0, sendIntent, PendingIntent.FLAG_MUTABLE).send()
        activeCalls.remove(c.callId)
    }

}