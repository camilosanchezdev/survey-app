import { TabPanel, TabView } from 'primereact/tabview';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Navbar } from '@/components/Layout/Navbar';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { useSurveys } from '../api/getSurveys';
import { SurveyList } from '../components/SurveyList';
import { SurveyListTab } from '../enums/survey-list-tab.enum';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { SurveyListItem } from '../types';

const Wrapper = styled.section`
  min-height: 100vh;
  margin: 3px 0;
`;

const Content = styled.div`
  margin: 0 10px;
`;

export const Surveys = () => {
  const [filterStatusId, setFilterStatusId] = useState(0);
  const [take, setTake] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const surveysQuery = useSurveys({ take, skip, surveyStatusId: filterStatusId });

  const navigate = useNavigate();
  const [products, setProducts] = useState<SurveyListItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onTabChange = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case SurveyListTab.ALL:
        setFilterStatusId(0);
        // setProducts(mockData);
        break;
      case SurveyListTab.ACTIVE:
        setFilterStatusId(SurveyStatusEnum.ACTIVE);
        break;
      case SurveyListTab.DRAFT:
        setFilterStatusId(SurveyStatusEnum.DRAFT);
        break;
      case SurveyListTab.COMPLETED:
        setFilterStatusId(SurveyStatusEnum.COMPLETED);
        break;
      case SurveyListTab.DELETED:
        setFilterStatusId(SurveyStatusEnum.DELETED);
        break;
      default:
        break;
    }
  };

  const surveysQueryRefetch = useCallback(async () => {
    const { data } = await surveysQuery.refetch();
    if (data) {
      setProducts(data.data);
      setTotalRecords(data.totalRecords);
    }
  }, []);
  useEffect(() => {
    surveysQueryRefetch();
  }, [filterStatusId, skip, take, surveysQueryRefetch]);
  const handleChangePage = (elements: number, rows: number) => {
    setSkip(elements);
    setTake(rows);
  };
  return (
    <Wrapper>
      <Navbar title="Surveys" icon="pi pi-file" />
      <Content>
        <div className="" style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
          <Button icon="pi pi-plus" label="Add item" onClick={() => navigate(PRIVATE_ROUTES.NEW_SURVEY)} />
        </div>
        <TabView onTabChange={(e) => onTabChange(e.index)} activeIndex={activeIndex}>
          <TabPanel header="All">
            <SurveyList products={products} changePage={handleChangePage} total={totalRecords} />
          </TabPanel>
          <TabPanel header="Active">
            <SurveyList products={products} changePage={handleChangePage} total={totalRecords} />
          </TabPanel>
          <TabPanel header="Draft">
            <SurveyList products={products} changePage={handleChangePage} total={totalRecords} />
          </TabPanel>
          <TabPanel header="Completed">
            <SurveyList products={products} changePage={handleChangePage} total={totalRecords} />
          </TabPanel>
          <TabPanel header="Deleted">
            <SurveyList products={products} changePage={handleChangePage} total={totalRecords} />
          </TabPanel>
        </TabView>
      </Content>
    </Wrapper>
  );
};
