import { Module } from '@nestjs/common';
import { NotificationGateway } from './notifications.geteway';

@Module({
  providers: [NotificationGateway],
})
export class NotificationModule {}
