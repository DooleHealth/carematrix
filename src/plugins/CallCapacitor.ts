import { PluginListenerHandle, registerPlugin } from '@capacitor/core';

interface CallCapacitorPlugin {
    receiveCall(options: { from: string }): Promise<{ accepted: boolean }>;
    updateCallState(options: {state: 'ended' | 'started', callId: string}): Promise<void>,
    addListener(
        eventName: 'accept-call' | 'end-call',
        listenerFunc: (data: {callId: string}) => void,
      ): Promise<PluginListenerHandle> & PluginListenerHandle
}

export const CallCapacitor = registerPlugin<CallCapacitorPlugin>('CallCapacitor');
