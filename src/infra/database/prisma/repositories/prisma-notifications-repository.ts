import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { NotificationRepository } from '../../../../application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}
  async create(notificaion: Notification): Promise<void> {
    await this.prismaService.notifications.create({
      data: {
        id: notificaion.id,
        category: notificaion.category,
        content: notificaion.content.value,
        recipientId: notificaion.recipientId,
        readAt: notificaion.readAt,
        createdAt: notificaion.createdAt,
      },
    });
  }
}
