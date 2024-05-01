package com.doole.inca.call

import android.content.Intent
import android.os.Handler
import android.telecom.DisconnectCause
import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin


@CapacitorPlugin(name = "CallCapacitor")
class CallCapacitorPlugin : Plugin() {
    private lateinit var implementation: CallCapacitor

    override fun load() {
        super.load()
        implementation = CallCapacitor(bridge.activity)
    }

    @PluginMethod
    fun receiveCall(call: PluginCall) {
        if (CallConnectionService.activeCalls.size > 0) {
            call.reject("You can't receive a call right now because you're already in a call")
        } else {
            val from = call.getString("from") ?: return call.reject("Missing from option")
            val callId = call.getString("callId") ?: return call.reject("Missing callId option")
            implementation.receiveCall(from, callId)
            call.resolve()
        }
    }

    @PluginMethod
    fun updateCallState(pc: PluginCall) {
        val state = pc.getString("state")
        val callId = pc.getString("callId") ?: return pc.reject("Missing callId")
        if(arrayOf("ended", "started").none { it == state}) {
            pc.reject("Invalid state")
            return
        }
        val call = CallConnectionService.activeCalls[callId] ?: return pc.reject("Call with callId is not active")
        if(state == "ended") {
            call.setDisconnected(DisconnectCause(DisconnectCause.CANCELED))
        }
        if(state == "started") {
            call.setActive()
        }
    }

    override fun handleOnNewIntent(data: Intent) {
        super.handleOnNewIntent(data)
        Log.d("CallCapacitorPlugin", "handleOnNewIntent")
        val bundle = data.extras
        if (bundle != null && bundle.containsKey("callId")) {
            val capAction = when(data.action) {
                CallActionReceiver.ACTIONS.DECLINE.name -> "end-call"
                CallActionReceiver.ACTIONS.ACCEPT.name -> "accept-call"
                CallActionReceiver.ACTIONS.DISCONNECTED.name -> "disconnected-call"
                else -> "error"
            }
            val dataObject = JSObject()
            for (key in bundle.keySet()) {
                val valueStr = bundle.getString(key)
                dataObject.put(key, valueStr)
            }
            Log.i("CallCapacitorPlugin", "notifyListeners $capAction")
            notifyListeners(capAction, dataObject, true)
        }
    }
}