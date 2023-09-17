'use client';

import { useSessionUserQuery } from '~/core/managers/queryClient/queries/useSessionUserQuery';
import { notificationService } from '~/core/services/NotificationService';

export function User() {
  const sessionUser = useSessionUserQuery({
    errorNotification: notificationService.createNotification(
      'error',
      'Error message 1',
    ),
  });

  return <pre>{JSON.stringify(sessionUser.data, null, 2)}</pre>;
}
