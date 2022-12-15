import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifioncationRepository } from '@test/repositories/in-memory-notifications-repository';

import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notificatons', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotifioncationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
