import styled from 'styled-components';
import { Navbar } from '@/components/Layout/Navbar';

const Wrapper = styled.section`
  min-height: 100vh;
  margin: 3px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 10px;
  .row-1 {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-rows: minmax(340px, 1fr);
    gap: 20px;
    .sales-overview {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 6 / span 6;
      background-color: white;
    }
    .purchase-overview {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 6 / span 6;
      background-color: white;
    }
  }
  .row-2 {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-rows: minmax(340px, 1fr);
    gap: 20px;
    .inventory-summary {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 4 / span 4;
      background-color: white;
    }
    .product-details {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 4 / span 4;
      background-color: white;
    }
    .nro-users {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 4 / span 4;
      background-color: white;
    }
  }
  .row-3 {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-rows: minmax(340px, 1fr);
    gap: 20px;
    .sales-and-purchase {
      border-radius: 20px;
      padding: 20px;
      grid-column: span 12 / span 12;
      background-color: white;
    }
  }
`;

export const Dashboard = () => {
  return (
    <Wrapper>
      <Navbar title="Dashboard" icon="pi pi-th-large" />
      <Content>
        <div className="row-1">
          <div className="sales-overview"></div>
          <div className="purchase-overview"></div>
        </div>
        <div className="row-2">
          <div className="inventory-summary"></div>
          <div className="product-details"></div>
          <div className="nro-users"></div>
        </div>
        <div className="row-3">
          <div className="sales-and-purchase"></div>
        </div>
      </Content>
    </Wrapper>
  );
};
