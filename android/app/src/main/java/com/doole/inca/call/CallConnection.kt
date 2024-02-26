package com.doole.inca.call

import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.res.Resources
import android.os.Build
import android.telecom.Connection
import android.telecom.DisconnectCause
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.ProcessLifecycleOwner
import com.doole.inca.MainActivity
import com.doole.inca.R

const val INCOMING_CALL_NOTIFID = 1

class CallConnection(val delegate: CallConnectionService, val callId: String, val from: String): Connection() {

    fun getCallId() { callId }
    fun getFrom() { from }
    override fun onShowIncomingCallUi() {

        val ctx = delegate

        val appIsForeground = ProcessLifecycleOwner.get().lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)
        if(appIsForeground) {
            openIncomingCallActivity(ctx)
            return
        }

        // Create an intent which triggers your fullscreen incoming call user interface.
        val intent = Intent(Intent.ACTION_MAIN, null)
        intent.flags = Intent.FLAG_ACTIVITY_NO_USER_ACTION or Intent.FLAG_ACTIVITY_NEW_TASK
        intent.action = callId
        intent.setClass(ctx, CallIncomingActivity::class.java)
        intent.putExtra("callId", callId)
        val pendingIntent = PendingIntent.getActivity(ctx,1,  intent, PendingIntent.FLAG_MUTABLE)

        // Build the notification as an ongoing high priority item; this ensures it will show as
        // a heads up notification which slides down over top of the current content.
        val notification = NotificationCompat.Builder(ctx, CallCapacitor.CALL_NOTIFICATION_CHANNEL)
            .setOngoing(true)
            //.setPriority(Notification.PRIORITY_MAX) //Deprecated
            .setPriority(NotificationManager.IMPORTANCE_HIGH)
            // Set notification content intent to take user to fullscreen UI if user taps on the
            // notification body.
            .setContentIntent(pendingIntent)
            // Set full screen intent to trigger display of the fullscreen UI when the notification
            // manager deems it appropriate.
            .setFullScreenIntent(pendingIntent, true)
            .setSmallIcon(R.drawable.ic_stat_call)
            .setContentTitle(ctx.getString(R.string.incoming_call))
            .setContentText(ctx.getString(R.string.receive_call))
            .setShowWhen(false)
            // https://youtrack.jetbrains.com/issue/KT-4749?_ga=2.112688001.407694624.1573479899-370803150.1565276011
            .addAction(
                getCallAction(
                    ctx,
                    CallActionReceiver.ACTIONS.DECLINE.name,
                        ctx.getString(R.string.reject),
                    0xFFF44336u.toInt()
                )
            )
            .addAction(
                getCallAction(
                    ctx,
                    CallActionReceiver.ACTIONS.ACCEPT.name,
                        ctx.getString(R.string.open),
                    0xff00aa00u.toInt()
                )
            )
            .build()
        // Set notification as insistent to cause your ringtone to loop.
        notification.flags = notification.flags or Notification.FLAG_INSISTENT

        val notificationManager: NotificationManager = ctx.getSystemService(
            NotificationManager::class.java
        )
        try {
            // TODO reserve this notification id!
            notificationManager.notify(CallCapacitor.CALL_NOTIFICATION_CHANNEL, INCOMING_CALL_NOTIFID, notification)
            //ctx.startForegroundService(intent)
        } catch (e: Throwable) {
            Log.e("CallConnectionService", "Could not open call incoming notification", e)
            // Try to open activity at least
            openIncomingCallActivity(ctx)
        }
    }

    private fun openIncomingCallActivity(ctx: Context) {
        try {
            val intent = Intent(ctx, CallIncomingActivity::class.java)
            intent.flags =
                    Intent.FLAG_ACTIVITY_NO_USER_ACTION or Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
            intent.setClass(ctx, CallIncomingActivity::class.java)
            ctx.startActivity(intent)
        } catch (e: Throwable) {
            Log.e("CallConnectionService", "Could not open call incoming fullscreen activity", e)
        }
    }

    override fun onAnswer() {
        try {
            val startIntent = Intent(delegate, MainActivity::class.java)
            startIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            // TODO set signal to start call activity
            delegate.startActivity(startIntent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        setActive()
    }

    override fun onReject() {
        val cause = DisconnectCause(DisconnectCause.REJECTED)
        setDisconnected(cause)
        destroy()
    }

    override fun onAbort() {
        super.onAbort()
    }

    override fun onDisconnect() {
        val cause = DisconnectCause(DisconnectCause.LOCAL)
        setDisconnected(cause)
        destroy()
    }

    override fun onStateChanged(state: Int) {
        if (state != Connection.STATE_RINGING) {
            delegate.getSystemService(NotificationManager::class.java)
                .cancel(CallCapacitor.CALL_NOTIFICATION_CHANNEL, INCOMING_CALL_NOTIFID)
        }
        if(state == Connection.STATE_DISCONNECTED) {
            delegate.connectionEnded(this)
        }
        super.onStateChanged(state)
    }

    private fun getCallAction(
        ctx: Context,
        action: String,
        title: String,
        color: Int
    ): NotificationCompat.Action {
        val intent = Intent(ctx, CallActionReceiver::class.java)
        intent.action = action
        intent.putExtra("callId", callId)
        var titleText: CharSequence = title
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            titleText = SpannableString(title)
            titleText.setSpan(ForegroundColorSpan(color), 0, titleText.length, 0)
        }
        val pendingIntent = PendingIntent.getBroadcast(
            ctx,
            0,
            intent,
            PendingIntent.FLAG_MUTABLE or PendingIntent.FLAG_CANCEL_CURRENT
        )
        return NotificationCompat.Action.Builder(
            android.R.drawable.ic_menu_close_clear_cancel, titleText, pendingIntent
        ).build()
    }
}