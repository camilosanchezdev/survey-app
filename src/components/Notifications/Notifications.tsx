import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const Notifications = () => {
  const toast = useRef<Toast>(null);
  //   const displayError = () => {
  //     toast.current?.show({ severity: 'error', summary: 'Error', detail: 'You must add at least two answers' });
  //   };

  return <Toast ref={toast} />;
};
