import { TabPanel, TabView } from 'primereact/tabview';
import { useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Navbar } from '@/components/Layout/Navbar';
import { SurveyList } from '../components/SurveyList';
import { SurveyListTab } from '../enums/survey-list-tab.enum';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { ISurveyListItem } from '../interfaces/survey-list-item.interface';

const Wrapper = styled.section`
  min-height: 100vh;
  margin: 3px 0;
`;

const Content = styled.div`
  margin: 0 10px;
`;

const mockData = [
  {
    id: 1,
    title: 'some survey',
    description: 'test description',
    createdAt: '2023-07-23',
    status: {
      id: SurveyStatusEnum.ACTIVE,
      name: 'Active',
    },
  },
  {
    id: 2,
    title: 'some survey',
    description: 'test description',
    createdAt: '2023-07-24',
    status: {
      id: SurveyStatusEnum.COMPLETED,
      name: 'Completed',
    },
  },
  {
    id: 3,
    title: 'some survey',
    description: 'test description',
    createdAt: '2023-07-24',
    status: {
      id: SurveyStatusEnum.DELETED,
      name: 'Deleted',
    },
  },
];

export const Surveys = () => {
  const [products, setProducts] = useState<ISurveyListItem[]>(mockData);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onTabChange = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case SurveyListTab.ALL:
        setProducts(mockData);
        break;
      case SurveyListTab.ACTIVE:
        setProducts(mockData.filter((survey) => survey.status.id === SurveyStatusEnum.ACTIVE));
        break;
      case SurveyListTab.COMPLETED:
        setProducts(mockData.filter((survey) => survey.status.id === SurveyStatusEnum.COMPLETED));
        break;
      case SurveyListTab.DELETED:
        setProducts(mockData.filter((survey) => survey.status.id === SurveyStatusEnum.DELETED));
        break;
      default:
        break;
    }
  };
  return (
    <Wrapper>
      <Navbar title="Surveys" icon="pi pi-file" />
      <Content>
        <div className="" style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
          <Button icon="pi pi-plus" label="Add item" />
        </div>
        <TabView onTabChange={(e) => onTabChange(e.index)} activeIndex={activeIndex}>
          <TabPanel header="All">
            <SurveyList products={products} />
          </TabPanel>
          <TabPanel header="Active">
            <SurveyList products={products} />
          </TabPanel>
          <TabPanel header="Completed">
            <SurveyList products={products} />
          </TabPanel>
          <TabPanel header="Deleted">
            <SurveyList products={products} />
          </TabPanel>
        </TabView>
      </Content>
    </Wrapper>
  );
};
