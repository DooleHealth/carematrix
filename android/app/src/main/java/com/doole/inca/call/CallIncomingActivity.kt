package com.doole.inca.call

import android.app.Activity
import android.app.KeyguardManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.telecom.TelecomManager
import android.util.Log
import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import com.doole.inca.MainActivity
import com.doole.inca.R


class CallIncomingActivity : Activity() {
    lateinit var tm: TelecomManager
    private lateinit var callId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        tm = applicationContext.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
        setContentView(R.layout.incoming_call_activity)
        val call = CallConnectionService.activeCalls.entries.first().value
        val callerName = call.from
        callId = call.callId
        //val titleText = findViewById<TextView>(R.id.titleText)
        //titleText.text = "Llamada entrante de $callerName"
        // TODO improve this flags and use the keyguard helpers
        //val window = window
        //window.addFlags(WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD)
        //window.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED)
        //window.addFlags(WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON)
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    fun rejectCall(v: View) {
        sendAction(CallActionReceiver.ACTIONS.DECLINE)
    }

    fun answerCall(v: View) {
        tryDismissKeyguard()
        sendAction(CallActionReceiver.ACTIONS.ACCEPT)
    }

    private fun tryDismissKeyguard() {
        val myKM = this.getSystemService(KEYGUARD_SERVICE) as KeyguardManager
        try {
            myKM.requestDismissKeyguard(this, object : KeyguardManager.KeyguardDismissCallback() {
                override fun onDismissCancelled() {
                    super.onDismissCancelled()
                }

                override fun onDismissError() {
                    super.onDismissError()
                    Log.e("CallIncomingActivity", "Could not dismiss keyguard")
                }

                override fun onDismissSucceeded() {
                    super.onDismissSucceeded()
                }
            })
        } catch(e: Throwable) {
            // Well, we can do nothing about it...
            Log.e("CallIncomingActivity", "Error calling the KeyguardManager", e)
        }
    }

    private fun sendAction(a: CallActionReceiver.ACTIONS) {
        /*val intent = Intent(this, CallActionReceiver::class.java)
        intent.action = a.name
        intent.putExtra("callId", callId)
        applicationContext.sendBroadcast(intent)*/
        val sendIntent = Intent(this, MainActivity::class.java)
        sendIntent.action = a.name
        sendIntent.putExtra("callId", callId)
        sendIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        ContextCompat.startActivity(this, sendIntent, null)
        PendingIntent.getActivity(this, 0, sendIntent, PendingIntent.FLAG_MUTABLE).send()
    }
}