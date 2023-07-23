import { Sidebar as SidebarResponsive } from 'primereact/sidebar';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Breakpoints } from '@/utils/breakpoints';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  .sidebar {
    display: none;
    background: white;
    grid-column: span 3 / span 3;
    margin: 0 10px 0 0;
    box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
    @media ${Breakpoints.Tablet} {
      display: block;
    }
    @media ${Breakpoints.LaptopL} {
      grid-column: span 2 / span 2;
    }
  }
  .content {
    grid-column: span 12 / span 12;
    @media ${Breakpoints.Tablet} {
      grid-column: span 9 / span 9;
    }
    @media ${Breakpoints.LaptopL} {
      grid-column: span 10 / span 10;
    }

    background: #fafafa;
  }
`;

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Wrapper>
      <div className="sidebar">
        <SidebarResponsive visible={visible} onHide={() => setVisible(false)}>
          <Sidebar closeSidebar={() => setVisible(false)} />
        </SidebarResponsive>
        <Sidebar closeSidebar={() => setVisible(false)} />
      </div>
      <div className="content">
        {/* <Header>search something</Header> */}
        <Header openSidebar={() => setVisible(!visible)} />
        {children}
      </div>
    </Wrapper>
  );
};
