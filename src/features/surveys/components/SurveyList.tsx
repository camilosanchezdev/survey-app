import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { SurveyListItem } from '../types';

const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 450px;
`;
const Description = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 350px;
`;
type SurveyListProps = {
  products: SurveyListItem[];
  total: number;
  changePage: (elements: number, rows: number) => void;
};
export const SurveyList = ({ products, total, changePage }: SurveyListProps) => {
  const [rows, setRows] = useState(5);
  const [first, setFirst] = useState(0);
  const navigate = useNavigate();
  const getSeverity = (statusId: number) => {
    switch (statusId) {
      case SurveyStatusEnum.ACTIVE:
        return 'success';

      case SurveyStatusEnum.DRAFT:
        return 'warning';

      case SurveyStatusEnum.COMPLETED:
        return 'info';

      case SurveyStatusEnum.DELETED:
        return 'danger';

      default:
        return null;
    }
  };
  const getStatusName = (statusId: number) => {
    switch (statusId) {
      case SurveyStatusEnum.ACTIVE:
        return 'Active';

      case SurveyStatusEnum.DRAFT:
        return 'Draft';

      case SurveyStatusEnum.COMPLETED:
        return 'Completed';

      case SurveyStatusEnum.DELETED:
        return 'Deleted';

      default:
        return null;
    }
  };
  const statusBodyTemplate = (survey: SurveyListItem) => {
    return <Tag value={getStatusName(survey.surveyStatusId)} severity={getSeverity(survey.surveyStatusId)}></Tag>;
  };
  const actionBodyTemplate = (survey: SurveyListItem) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button
        icon="pi pi-eye"
        rounded
        outlined
        onClick={() => navigate(`${PRIVATE_ROUTES.SURVEYS}/${survey.id}`)}
        tooltip="Details"
      />
      {survey.surveyStatusId === SurveyStatusEnum.ACTIVE && (
        <Button icon="pi pi-check" rounded outlined severity="success" onClick={() => {}} tooltip="Mark as completed" />
      )}
      {survey.surveyStatusId !== SurveyStatusEnum.DELETED && (
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {}} tooltip="Remove" />
      )}
    </div>
  );
  const dateFormatBodyTemplate = (survey: SurveyListItem) => dayjs(survey.createdAt).format('MM/DD/YYYY');
  const titleBodyTemplate = (survey: SurveyListItem) => <Title title={survey.title}>{survey.title}</Title>;
  const descriptionBodyTemplate = (survey: SurveyListItem) => (
    <Description title={survey.description}>{survey.description}</Description>
  );

  const onPageChange = (event: DataTableStateEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    changePage(event.first, event.rows);
  };

  if (products.length === 0) return <p>No surveys...</p>;
  return (
    <DataTable
      value={products}
      tableStyle={{ minWidth: '50rem' }}
      paginator
      rows={rows}
      rowsPerPageOptions={[5, 10, 25, 50]}
      onPage={onPageChange}
      totalRecords={total}
      first={first}
      lazy
    >
      <Column field="createdAt" header="Created" body={dateFormatBodyTemplate} style={{ width: '10%' }}></Column>
      <Column field="title" header="Title" style={{ width: '30%' }} body={titleBodyTemplate}></Column>
      <Column field="description" header="Description" style={{ width: '30%' }} body={descriptionBodyTemplate}></Column>
      <Column header="Status" body={statusBodyTemplate} style={{ width: '10%' }}></Column>
      <Column body={actionBodyTemplate} exportable={false} style={{ width: '20%' }}></Column>
    </DataTable>
  );
};
