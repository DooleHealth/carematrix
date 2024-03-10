package com.doole.inca.call

import android.Manifest
import android.app.Activity
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.ComponentName
import android.content.Context
import android.content.pm.PackageManager
import android.media.AudioAttributes
import android.media.RingtoneManager
import android.os.Build
import android.os.Bundle
import android.telecom.Connection
import android.telecom.DisconnectCause
import android.telecom.PhoneAccount
import android.telecom.PhoneAccountHandle
import android.telecom.TelecomManager
import android.telecom.VideoProfile
import androidx.core.content.ContextCompat.getSystemService


class CallCapacitor(private val context: Context) {
    private val tm: TelecomManager
    private val handle: PhoneAccountHandle

    companion object {
        const val CALL_NOTIFICATION_CHANNEL = "NOTIF_INCOMING_CALL"
    }

    init {
        createIncomingCallNotificationChannel()
        val appContext = context.applicationContext
        tm = appContext.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
        val componentName =  ComponentName(appContext, CallConnectionService::class.java)
        handle = PhoneAccountHandle(componentName, "VoIP")

        lateinit var phoneAccount: PhoneAccount
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            phoneAccount = PhoneAccount.Builder(handle, "User")
                .setCapabilities(PhoneAccount.CAPABILITY_SELF_MANAGED)
                .build()
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            phoneAccount = PhoneAccount.Builder(handle, "User")
                .setCapabilities(PhoneAccount.CAPABILITY_CALL_SUBJECT)
                .build()
        }
        tm.registerPhoneAccount(phoneAccount)
    }

    fun receiveCall(from: String, callId: String) {
        if (getApplicationContext().checkSelfPermission(Manifest.permission.MANAGE_OWN_CALLS) == PackageManager.PERMISSION_GRANTED) {
            val callInfo = Bundle()
            callInfo.putParcelable(TelecomManager.EXTRA_PHONE_ACCOUNT_HANDLE, handle)
            callInfo.putString("from", from)
            callInfo.putString("callId", callId)
            callInfo.putInt(TelecomManager.EXTRA_INCOMING_VIDEO_STATE, VideoProfile.STATE_BIDIRECTIONAL)
            val isCallPermitted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                tm.isIncomingCallPermitted(handle)
            } else {
                true
            }
            tm.addNewIncomingCall(handle, callInfo)
        }
    }

    fun cancelCall(from: String, callId: String) {
        CallConnectionService.activeCalls[callId]?.let {
            it.setDisconnected(DisconnectCause(DisconnectCause.CANCELED))
        }
    }

    private fun getApplicationContext(): Context {
        return context.applicationContext
    }

    private fun createIncomingCallNotificationChannel() {
        val channel = NotificationChannel(
            CALL_NOTIFICATION_CHANNEL, "Incoming Calls",
            NotificationManager.IMPORTANCE_HIGH
        )

        // We'll use the default system ringtone for our incoming call notification channel.  You can
        // use your own audio resource here.
        val ringtoneUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE)
        channel.setSound(
            ringtoneUri,
            AudioAttributes.Builder() // Setting the AudioAttributes is important as it identifies the purpose of your
                // notification sound.
                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build()
        )

        val mgr: NotificationManager? = getSystemService(
            getApplicationContext(),
            NotificationManager::class.java
        )
        mgr!!.createNotificationChannel(channel)
    }

}