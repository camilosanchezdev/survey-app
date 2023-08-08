import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { ConfirmDialogCustom } from '@/components/Elements/ConfirmDialogCustom';
import { Checkbox } from '@/components/Form/Checkbox';
import { RadioButton } from '@/components/Form/RadioButton';
import { Navbar } from '@/components/Layout/Navbar';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useSurvey } from '../api/getSurvey';
import { useMarkSurveyAsActivated } from '../api/markSurveyAsActivated';
import { useMarkSurveyAsCompleted } from '../api/markSurveyAsCompleted';
import { useMarkSurveyAsDeleted } from '../api/markSurveyAsDeleted';
import { ShareSurveyModal } from '../components/ShareSurveyModal';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { SurveyType } from '../types/survey.type';

const Wrapper = styled.section`
  margin: 3px 0;
`;
const Content = styled.div`
  position: relative;
  min-height: calc(100vh - 205px);
  background-color: white;
  margin: 0 20px 20px 20px;
  padding: 40px;
  border-radius: 20px;
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Actions = styled.div`
  position: absolute;
  bottom: 0;
  margin: 40px 0;
  display: flex;
  gap: 20px;
  button {
    width: 250px;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  justify-content: center;
  margin: 20px 0 0 0;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 0 20px 0;
  button {
    height: 40px;
    width: 120px;
  }
`;
const MenuActions = styled.div`
  display: flex;
  gap: 10px;
`;

const SurveyStatus = styled.div``;

export const SurveyDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { control } = useForm();
  const markSurveyAsDeletedMutation = useMarkSurveyAsDeleted();
  const markSurveyAsActivatedMutation = useMarkSurveyAsActivated();
  const markSurveyAsCompletedMutation = useMarkSurveyAsCompleted();
  const surveyQuery = useSurvey({ surveyId: Number(params?.id) });

  const [survey, setSurvey] = useState<SurveyType>();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [changeSurveyStatus, setChangeSurveyStatus] = useState<number>();

  const refetchSurvey = async () => {
    const { data } = await surveyQuery.refetch();
    if (data) setSurvey(data);
  };

  const handleNotification = (success: boolean, successMessage: string) => {
    if (success) {
      dispatch(displayNotification({ severity: 'success', summary: 'Success', detail: successMessage }));
      refetchSurvey();
    } else {
      dispatch(displayNotification({ severity: 'error', summary: 'Error', detail: 'Something goes wrong' }));
    }
  };

  const handleResetActionModal = () => {
    setConfirmDialog(false);
    setChangeSurveyStatus(undefined);
  };
  const handleOpenActionModal = (statusId: number) => {
    setChangeSurveyStatus(statusId);
    setConfirmDialog(true);
  };
  const handleMarkAsRemoved = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsDeletedMutation.mutateAsync({
      surveyId: Number(params?.id),
    });
    handleNotification(res.success, 'Survey removed successfully');
  };
  const handleMarkAsActivated = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsActivatedMutation.mutateAsync({
      surveyId: Number(params?.id),
    });
    handleNotification(res.success, 'Survey activated successfully');
  };
  const handleMarkAsCompleted = async (result: boolean) => {
    handleResetActionModal();
    if (!result) return;
    const res = await markSurveyAsCompletedMutation.mutateAsync({
      surveyId: Number(params?.id),
    });
    handleNotification(res.success, 'Survey completed successfully');
  };

  useEffect(() => {
    if (surveyQuery.data) {
      setSurvey(surveyQuery.data);
    }
  }, [surveyQuery]);
  return (
    <Wrapper>
      <Navbar title="Survey Detail" icon="pi pi-file" navigation />
      {survey ? (
        <Content>
          <Header>
            <Menu>
              <MenuActions>
                <Button
                  label="Report"
                  type="button"
                  icon="pi pi-chart-bar"
                  onClick={() => navigate('/app/surveys/3/report')}
                />
                {survey.surveyStatusId === SurveyStatusEnum.ACTIVE ? (
                  <Button
                    label="Share"
                    severity="info"
                    type="button"
                    icon="pi pi-send"
                    onClick={() => setShareModal(true)}
                  />
                ) : null}
              </MenuActions>
              <SurveyStatus>
                {survey.surveyStatusId === SurveyStatusEnum.ACTIVE ? (
                  <Button label="Active" severity="success" type="button" outlined disabled />
                ) : null}
                {survey.surveyStatusId === SurveyStatusEnum.DRAFT ? (
                  <Button label="Disabled" severity="warning" type="button" outlined disabled />
                ) : null}
                {survey.surveyStatusId === SurveyStatusEnum.COMPLETED ? (
                  <Button label="Completed" severity="info" type="button" outlined disabled />
                ) : null}
                {survey.surveyStatusId === SurveyStatusEnum.DELETED ? (
                  <Button label="Deleted" severity="danger" type="button" outlined disabled />
                ) : null}
              </SurveyStatus>
            </Menu>
            <Title>{survey.title}</Title>
            <Description>{survey.description}</Description>
          </Header>

          <Form>
            {survey.surveyQuestions?.map((item, key) => (
              <FormControl key={`${key}-${item.id}`}>
                <h3>{`${key + 1}. ${item.name}`}</h3>
                {item.multiple
                  ? item.surveyAnswers?.map((answer) => (
                      <Checkbox
                        id={String(answer.id)}
                        key={answer.id}
                        label={answer.name}
                        name={answer.name}
                        control={control}
                        required={false}
                      />
                    ))
                  : item.surveyAnswers?.map((answer) => (
                      <RadioButton
                        key={answer.id}
                        value={answer.name}
                        label={answer.name}
                        name={item.name}
                        control={control}
                        required={false}
                      />
                    ))}
              </FormControl>
            ))}
          </Form>
          <Actions>
            {survey.surveyStatusId === SurveyStatusEnum.DRAFT ? (
              <Button
                label="Mark as Active"
                severity="success"
                type="button"
                icon="pi pi-send"
                outlined
                onClick={() => handleOpenActionModal(SurveyStatusEnum.ACTIVE)}
              />
            ) : null}
            {survey.surveyStatusId === SurveyStatusEnum.ACTIVE ? (
              <Button
                label="Mark as Completed"
                severity="info"
                type="button"
                icon="pi pi-check"
                outlined
                onClick={() => handleOpenActionModal(SurveyStatusEnum.COMPLETED)}
              />
            ) : null}

            {survey.surveyStatusId !== SurveyStatusEnum.DELETED ? (
              <Button
                label="Mark as Deleted"
                severity="danger"
                type="button"
                icon="pi pi-trash"
                outlined
                onClick={() => handleOpenActionModal(SurveyStatusEnum.DELETED)}
              />
            ) : null}
          </Actions>
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

          <ShareSurveyModal
            publicLink={survey.publicLink}
            visible={shareModal}
            closeModal={() => setShareModal(false)}
          />
        </Content>
      ) : null}
    </Wrapper>
  );
};
