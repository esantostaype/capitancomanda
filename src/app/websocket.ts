import { io, Socket } from 'socket.io-client';

let socket: Socket | undefined;

export const connectWebSocket = () => {
  if (!socket) {
    socket = io('ws://localhost:3000'); // Reemplaza con la URL correcta de tu servidor WebSocket

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('orderCreated', (order: any) => {
      console.log('Order created:', order);
      // Emitir un evento personalizado para actualizar el estado global
      const event = new CustomEvent('orderCreated', { detail: order });
      window.dispatchEvent(event);
    });
  }
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
};
