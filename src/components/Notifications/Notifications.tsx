import { Toast } from 'primereact/toast';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { notificationsSelector } from './notificationSelector';
import { clearNotification } from './notificationSlice';

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const { showNotification, severity, summary, detail } = notificationsSelector();
  const toast = useRef<Toast>(null);

  const displayNotification = useCallback(() => {
    toast.current?.show({ severity, summary, detail });
    setTimeout(() => dispatch(clearNotification()), 500);
  }, [severity, summary, detail, dispatch]);

  useEffect(() => {
    if (showNotification) {
      displayNotification();
    }
  }, [showNotification, displayNotification]);

  return <Toast ref={toast} />;
};
