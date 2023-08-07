import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ConfirmDialogCustom } from '@/components/Elements/ConfirmDialogCustom';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { useMarkSurveyAsActivated } from '../api/markSurveyAsActivated';
import { useMarkSurveyAsCompleted } from '../api/markSurveyAsCompleted';
import { useMarkSurveyAsDeleted } from '../api/markSurveyAsDeleted';
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
  refetchRecords: () => void;
};
export const SurveyList = ({ products, total, changePage, refetchRecords }: SurveyListProps) => {
  const dispatch = useAppDispatch();
  const markSurveyAsDeletedMutation = useMarkSurveyAsDeleted();
  const markSurveyAsActivatedMutation = useMarkSurveyAsActivated();
  const markSurveyAsCompletedMutation = useMarkSurveyAsCompleted();

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [rows, setRows] = useState(5);
  const [surveySelected, setSurveySelected] = useState<number>();
  const [changeSurveyStatus, setChangeSurveyStatus] = useState<number>();
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
        severity="secondary"
        outlined
        onClick={() => navigate(`${PRIVATE_ROUTES.SURVEYS}/${survey.id}`)}
        tooltip="Details"
      />
      {survey.surveyStatusId === SurveyStatusEnum.ACTIVE && (
        <Button
          icon="pi pi-check"
          rounded
          outlined
          severity="success"
          onClick={() => handleChangeStatus(SurveyStatusEnum.COMPLETED, Number(survey.id))}
          tooltip="Mark as completed"
        />
      )}

      {survey.surveyStatusId === SurveyStatusEnum.DRAFT && (
        <Button
          icon="pi pi-send"
          rounded
          outlined
          onClick={() => handleChangeStatus(SurveyStatusEnum.ACTIVE, Number(survey.id))}
          tooltip="Mark as activated"
        />
      )}
      {survey.surveyStatusId !== SurveyStatusEnum.DELETED && (
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleChangeStatus(SurveyStatusEnum.DELETED, Number(survey.id))}
          tooltip="Remove"
        />
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
  const handleChangeStatus = (statusId: number, surveyId: number) => {
    setSurveySelected(surveyId);
    setConfirmDialog(true);
    setChangeSurveyStatus(statusId);
  };

  const handleNotification = (success: boolean, successMessage: string) => {
    if (success) {
      dispatch(displayNotification({ severity: 'success', summary: 'Success', detail: successMessage }));
      refetchRecords();
    } else {
      dispatch(displayNotification({ severity: 'error', summary: 'Error', detail: 'Something goes wrong' }));
    }
  };
  const handleResetActionModal = () => {
    setConfirmDialog(false);
    setChangeSurveyStatus(undefined);
    setSurveySelected(undefined);
  };

  const handleMarkAsRemoved = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsDeletedMutation.mutateAsync({
      surveyId: Number(surveySelected),
    });
    handleNotification(res.success, 'Survey removed successfully');
  };
  const handleMarkAsActivated = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsActivatedMutation.mutateAsync({
      surveyId: Number(surveySelected),
    });
    handleNotification(res.success, 'Survey activated successfully');
  };
  const handleMarkAsCompleted = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsCompletedMutation.mutateAsync({
      surveyId: Number(surveySelected),
    });
    handleNotification(res.success, 'Survey completed successfully');
  };

  if (products.length === 0) return <p>No surveys...</p>;
  return (
    <>
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
        <Column
          field="description"
          header="Description"
          style={{ width: '30%' }}
          body={descriptionBodyTemplate}
        ></Column>
        <Column header="Status" body={statusBodyTemplate} style={{ width: '10%' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ width: '20%' }}></Column>
      </DataTable>

      {confirmDialog && changeSurveyStatus === SurveyStatusEnum.DELETED ? (
        <ConfirmDialogCustom
          title="Remove Survey"
          subtitle="Do you want to remove this survey?"
          icon="pi pi-trash"
          openModal={confirmDialog}
          closeDialog={(data) => handleMarkAsRemoved(data)}
        />
      ) : null}
      {confirmDialog && changeSurveyStatus === SurveyStatusEnum.ACTIVE ? (
        <ConfirmDialogCustom
          title="Mark Survey as activated"
          subtitle="Do you want to mark this survey as activated?"
          icon="pi pi-send"
          openModal={confirmDialog}
          closeDialog={(data) => handleMarkAsActivated(data)}
        />
      ) : null}
      {confirmDialog && changeSurveyStatus === SurveyStatusEnum.COMPLETED ? (
        <ConfirmDialogCustom
          title="Mark Survey as completed"
          subtitle="Do you want to mark this survey as completed?"
          icon="pi pi-check"
          openModal={confirmDialog}
          closeDialog={(data) => handleMarkAsCompleted(data)}
        />
      ) : null}
    </>
  );
};
