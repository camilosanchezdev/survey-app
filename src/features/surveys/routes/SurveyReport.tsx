import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { PieChart } from '@/components/Elements/PieChart';
import { Navbar } from '@/components/Layout/Navbar';
import { useSurveyReport } from '../api/getSurveyReport';

const Wrapper = styled.section`
  margin: 3px 0;
`;
const Content = styled.div`
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
  margin: 0 0 20px 0;
`;
const Actions = styled.div`
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
  margin: 20px 0;
  button {
    height: 40px;
    width: 120px;
  }
`;

export const SurveyReport = () => {
  const params = useParams();
  const { data, isLoading } = useSurveyReport({ surveyId: Number(params?.id) });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Wrapper>
      <Navbar title="Survey Report" icon="pi pi-file" navigation />
      <Content>
        <Header>
          <Title>{data.title}</Title>
          <p>{data.totalResponses === 0 ? 'No answers yet' : `${data.totalResponses} responses`}</p>
        </Header>

        {data.totalResponses > 0 ? (
          <>
            <Form>
              {data.surveyQuestions.map((item, key) => (
                <FormControl key={`${key}-${item.id}`}>
                  <h3>{`${key + 1}. ${item.name}`}</h3>
                  <PieChart data={item.surveyAnswers.map((res) => ({ id: res.name, value: res.total }))} />
                </FormControl>
              ))}
            </Form>
            <Actions>
              <Button label="Download Report - PDF" severity="danger" type="button" icon="pi pi-file-pdf" />
              <Button label="Download Data - CSV" severity="success" type="button" icon="pi pi-file-excel" />
            </Actions>
          </>
        ) : null}
      </Content>
    </Wrapper>
  );
};
