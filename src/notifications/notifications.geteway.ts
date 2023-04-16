import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @SubscribeMessage('NOTIFICATION')
  handleNotification(@ConnectedSocket() socket: Socket): void {
    socket.broadcast.emit('NOTIFICATION', true);
  }
}
