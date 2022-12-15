import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifioncationRepository } from '@test/repositories/in-memory-notifications-repository';

import { CountRecipientNotification } from './count-recipient-notifications';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients notificatons', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotifioncationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
