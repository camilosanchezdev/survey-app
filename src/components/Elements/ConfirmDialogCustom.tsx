import { ConfirmDialog } from 'primereact/confirmdialog';

type ConfirmDialogCustomProps = {
  openModal: boolean;
  title: string;
  subtitle: string;
  icon: string;
  closeDialog: (result: boolean) => void;
};
export const ConfirmDialogCustom = ({ openModal, title, subtitle, icon, closeDialog }: ConfirmDialogCustomProps) => {
  return (
    <ConfirmDialog
      header={title}
      message={subtitle}
      visible={openModal}
      draggable={false}
      style={{ width: '25vw' }}
      icon={icon}
      accept={() => closeDialog(true)}
      reject={() => closeDialog(false)}
    />
  );
};
