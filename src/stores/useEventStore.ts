import { create } from 'zustand';
import Echo from 'laravel-echo';
import axios from 'axios';
import Pusher from 'pusher-js';
import { getTokenCookies } from '@/lib/tokenCookies';

// Extend the Window type to include Pusher
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

// Define the Zustand store state and actions
interface EchoState {
  echo: Echo<any> | null;
  connected: boolean;
  initializeEcho: () => Promise<void>;
  disconnect: () => void;
  sendData: (channel: string, event: string, data: any) => Promise<void>;
  subscribeToChannel: (
    channel: string,
    event: string,
    callback: (data: any) => void
  ) => Promise<void>;
  subscribeToPublicChannel: (
    channel: string,
    event: string,
    callback: (data: any) => void
  ) => Promise<void>;
  connectPresense : ()=>void;
  leavePresense : ()=>void;
  session_login : ()=>void;
  session_logout : ()=>void;
}

// Zustand store
export const useEventStore = create<EchoState>((set, get) => ({
  echo: null,
  connected: false,

  // Initialize Echo
  initializeEcho: async () => {
    if (typeof window === 'undefined') return;

    if (!window.Pusher) {
      // @ts-ignore
      window.Pusher = Pusher;
    }

    const { sessionToken } = await getTokenCookies();

    const echo = new Echo({
      broadcaster: 'reverb',
      key: 'local',
      wsHost: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      wsPort: process.env.NEXT_PUBLIC_WEBSOCKET_PORT,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
      cluster: 'sg1',
      enableLogging: true,
      authorizer: (channel: any, options: any) => ({
        authorize: async (socketId: string, callback: Function) => {
          try {
            const response = await axios.post(
              `http://${process.env.NEXT_PUBLIC_WEBSOCKET_URL}:8000/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                withCredentials: true,
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${sessionToken}`,
                },
              }
            );
            callback(false, response.data);
            console.log('is stuck here ???', response);
          } catch (error) {
            console.error('Echo authorization error:', error);
            callback(true, error);
          }
        },
      }),
    });

    // Add listener for Echo connection state
    // echo.connector.pusher.connection.bind('disconnected', () => {
    //   console.log('WebSocket disconnected');
    //   set({ connected: false });
    // });
    // if (!echo) {
    //   console.warn('Echo is not initialized');
    //   return;
    // }
    // echo.join('presence.session');
    
    // console.log('Echo initialized:', echo.connector.pusher?.connection?.state);
    // setTimeout(()=>{
    //   console.log('start leaving');
    //   if (!echo) {
    //     console.warn('Echo is not initialized for leave');
    //     return;
    //   }
    //   // echo.leave('presence.session');
    //   echo.connector.pusher.disconnect();
    // },5000)

    set({ echo, connected: true });
  },

  // Disconnect Echo
  disconnect: () => {
    const { echo } = get();
    if (echo) {
      echo.disconnect();
      set({ connected: false });
      console.log('Echo disconnected');
    }
  },

  // Send data to backend
  sendData: async (channel: string, event: string, data: any) => {
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }

    try {
      echo.channel('session-login-channel')
        .listen('SessionLoginEvent', (e : any) => {
          console.log('Received session login data:', e);
      });
      console.log(`Sent data to ${channel}:${event}`, data);
  
    } catch (err) {
      console.error('Failed to send data via Echo:', err);
    }
  },

  // Subscribe to private channel
  subscribeToChannel: async (
    channel: string,
    event: string,
    callback: (data: any) => void
  ) => {
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }

    try {
      echo.connector.pusher.send_event(
        'user.session.login',           // <- same as broadcastAs
        { user_id: 1 },               // <- same shape as broadcastWith
        'session-login-channel'        // <- same as broadcastOn
      );
      console.log(`Subscribed to private ${channel}:${event}`);
    } catch (err) {
      console.error('Subscription failed:', err);
    }
  },

  // Subscribe to public channel
  subscribeToPublicChannel: async (
    channel: string,
    event: string,
    callback: (data: any) => void
  ) => {
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }

    try {
      echo.channel(channel).listen(event, callback);
      console.log(`Subscribed to public ${channel}:${event}`);
    } catch (err) {
      console.error('Subscription to public channel failed:', err);
    }
  },

  connectPresense : async()=>{
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }
    echo.join('presence.session');
  },
  leavePresense: async()=>{
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized for leave');
      return;
    }
    echo.leave('presence.session');
  },
  session_login : async()=>{
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }
    console.log("login trigger");
    echo.join('session_login');
  },
  session_logout : async()=>{
    const { echo } = get();
    if (!echo) {
      console.warn('Echo is not initialized');
      return;
    }
    echo.join('session_logout');
  }
}));
