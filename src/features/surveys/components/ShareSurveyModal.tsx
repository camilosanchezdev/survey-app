import { Dialog } from 'primereact/dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/Elements/Button';
import { InputField } from '@/components/Form/InputField';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useAppDispatch } from '@/hooks/typedReduxHooks';

interface IFormInput {
  publicLink: string;
}

type ShareSurveyProps = {
  publicLink: string;
  visible: boolean;
  closeModal: () => void;
};
export const ShareSurveyModal = ({ visible, publicLink, closeModal }: ShareSurveyProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      publicLink,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    navigator.clipboard.writeText(form.publicLink);
    dispatch(displayNotification({ severity: 'info', summary: 'Copied', detail: 'Link copied successfully' }));
  };
  return (
    <Dialog header="Public Link" visible={visible} style={{ width: '25vw' }} onHide={() => closeModal()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-inputgroup">
          <InputField id="question" register={register('publicLink', { required: false })} color="black" disabled />
          <Button icon="pi pi-copy" tooltip="Copy Link" type="submit" />
        </div>
      </form>
    </Dialog>
  );
};
