package com.doole.inca.call

import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Person
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.Resources
import android.graphics.drawable.Icon
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

class CallConnection(private val delegate: CallConnectionService, val callId: String, private val from: String): Connection() {

    fun getCallId() { callId }
    fun getFrom() { from }
    override fun onShowIncomingCallUi() {

        val ctx = delegate

        val appIsForeground = ProcessLifecycleOwner.get().lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)
        if(appIsForeground) {
            openIncomingCallActivity(ctx)
        }

        // Create an intent which triggers your fullscreen incoming call user interface.
        val intent = Intent(Intent.ACTION_MAIN, null)
        intent.flags = Intent.FLAG_ACTIVITY_NO_USER_ACTION or Intent.FLAG_ACTIVITY_NEW_TASK
        intent.action = callId
        intent.setClass(ctx, CallIncomingActivity::class.java)
        intent.putExtra("callId", callId)
        val pendingIntent = PendingIntent.getActivity(ctx,1,  intent, PendingIntent.FLAG_MUTABLE)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            // Creating a notification with Notification.CallStyle
            val icon = Icon.createWithResource(ctx, R.mipmap.ic_launcher_round)  //R.drawable.ic_stat_call
            val caller = Person.Builder()
                // Caller icon
                .setIcon(icon)
                // Caller name
                .setName(ctx.getString(com.doole.plugin.R.string.text_incoming_call))
                .setImportant(true)
                .build()

            val answerIntent = getCallPendingIntent(
                ctx,
                com.doole.plugin.call.CallActionReceiver.ACTIONS.ACCEPT.name,
                ctx.getString(com.doole.plugin.R.string.reject),
                0xFFF44336u.toInt()
            )

            val declineIntent = getCallPendingIntent(
                ctx,
                com.doole.plugin.call.CallActionReceiver.ACTIONS.DECLINE.name,
                ctx.getString(com.doole.plugin.R.string.reject),
                0xFFF44336u.toInt()
            )
            // Creating the call notification style
            val notificationStyle = Notification.CallStyle.forIncomingCall(caller, declineIntent, answerIntent)
            val notification = Notification.Builder(ctx, com.doole.plugin.call.CallCapacitor.CALL_NOTIFICATION_CHANNEL)
                .setSmallIcon(com.doole.plugin.R.drawable.ic_stat_call)
                .setContentTitle(ctx.getString(com.doole.plugin.R.string.incoming_call))
                .setContentText(ctx.getString(com.doole.plugin.R.string.receive_call))
                .setStyle(notificationStyle)
                // Intent that will be called for when tapping on the notification
                .setContentIntent(pendingIntent)
                .setFullScreenIntent(pendingIntent, true)
                .setOngoing(true)
                // notification category that describes this Notification. May be used by the system for ranking and filtering
                .setCategory(Notification.CATEGORY_CALL)
                .build()

            // Set notification as insistent to cause your ringtone to loop.
            notification.flags = notification.flags or Notification.FLAG_INSISTENT

            val notificationManager: NotificationManager = ctx.getSystemService(
                NotificationManager::class.java
            )
            try {
                // TODO reserve this notification id!
                notificationManager.notify(
                    com.doole.plugin.call.CallCapacitor.CALL_NOTIFICATION_CHANNEL,
                    com.doole.plugin.call.INCOMING_CALL_NOTIFID, notification)
                //ctx.startForegroundService(intent)
            } catch (e: Throwable) {
                Log.e("CallConnectionService", "Could not open call incoming notification", e)
                // Try to open activity at least
                openIncomingCallActivity(ctx)
            }
        }else{

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

    }

    private fun openIncomingCallActivity(ctx: Context) {
        try {
            val intent = Intent(ctx, CallIncomingActivity::class.java)
            intent.flags =
                Intent.FLAG_ACTIVITY_NO_USER_ACTION or Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
            intent.action = callId
            intent.setClass(ctx, CallIncomingActivity::class.java)
            intent.putExtra("callId", callId)
            intent.putExtra("ring", true)
            ctx.startActivity(intent)
        } catch (e: Throwable) {
            Log.e("CallConnectionService", "Could not open call incoming fullscreen activity", e)
        }
    }

    override fun onAnswer() {
        try {
            //val startIntent = delegate.packageManager.getLaunchIntentForPackage(delegate.packageName)
            //    ?: throw Error("Missing intent for package " + delegate.packageName)
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


    private fun getCallPendingIntent(
        ctx: Context,
        action: String,
        title: String,
        color: Int
    ): PendingIntent {
        val intent = Intent(ctx, com.doole.plugin.call.CallActionReceiver::class.java)
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
        return pendingIntent
    }


    private fun getResource(ctx: Context): Int {
        try {
            val manager: PackageManager = ctx.packageManager
            val resources = manager.getResourcesForApplication("com.doole.inca")
            val resId =
                resources.getIdentifier("ic_launcher_round", "mipmap", "com.doole.doole")

            return resId
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            return 0
        }

    }
}