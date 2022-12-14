import { InMemoryNotifioncationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotifioncationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notificaion',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
