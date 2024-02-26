package com.doole.inca.call

import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telecom.DisconnectCause
import android.util.Log
import androidx.core.content.ContextCompat.startActivity
import com.doole.inca.MainActivity


class CallActionReceiver: BroadcastReceiver() {
    override fun onReceive(context: Context, received: Intent) {
        val callId = received.extras?.getString("callId") ?: throw Error("Missing callId when calling CallActionReceiver")
        Log.d("CallActionReceiver", "Received action " + received.action + " callId " + callId)
        if (ACTIONS.DECLINE.name == received.action || ACTIONS.ACCEPT.name == received.action) {
            val sendIntent = Intent(context, MainActivity::class.java)
            sendIntent.action = received.action
            sendIntent.putExtra("callId", callId)
            sendIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            startActivity(context, sendIntent, null)
            PendingIntent.getActivity(context, 0, sendIntent, PendingIntent.FLAG_MUTABLE).send()
        } else {
            // Open incoming activity
            val intent = Intent(context, CallIncomingActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            intent.putExtra("callId", callId)
            PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_MUTABLE).send()
        }
    }

        enum class ACTIONS {
            DECLINE, ACCEPT,
        }

}
