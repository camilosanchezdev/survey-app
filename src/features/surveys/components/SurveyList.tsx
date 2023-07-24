import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { ISurveyListItem } from '../interfaces/survey-list-item.interface';

type SurveyListProps = {
  products: ISurveyListItem[];
};
export const SurveyList = ({ products }: SurveyListProps) => {
  const getSeverity = (statusId: number) => {
    switch (statusId) {
      case SurveyStatusEnum.ACTIVE:
        return 'success';

      case SurveyStatusEnum.COMPLETED:
        return 'warning';

      case SurveyStatusEnum.DELETED:
        return 'danger';

      default:
        return null;
    }
  };
  const statusBodyTemplate = (survey: ISurveyListItem) => {
    return <Tag value={survey.status.name} severity={getSeverity(survey.status.id)}></Tag>;
  };
  const actionBodyTemplate = (survey: ISurveyListItem) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button icon="pi pi-eye" rounded outlined onClick={() => {}} tooltip="Details" />
      {survey.status.id === SurveyStatusEnum.ACTIVE && (
        <Button icon="pi pi-check" rounded outlined severity="success" onClick={() => {}} tooltip="Mark as completed" />
      )}
      {survey.status.id !== SurveyStatusEnum.DELETED && (
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {}} tooltip="Remove" />
      )}
    </div>
  );
  return (
    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
      <Column field="createdAt" header="Created"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="description" header="Description"></Column>
      <Column header="Status" body={statusBodyTemplate}></Column>
      <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
    </DataTable>
  );
};
