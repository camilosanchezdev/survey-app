import styled from 'styled-components';
import logo from '@/assets/img/logo.png';
import { Breakpoints } from '@/utils/breakpoints';
import { Button } from '../Elements/Button';
import { NotificationBell } from '../Elements/NotificationBell';
import { ProfileButton } from '../Elements/ProfileButton';
import { InputField } from '../Form/InputField';

const Wrapper = styled.header`
  height: 90px;
  display: grid;
  padding: 0 20px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  background: #fdfdfd;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.05);
  .logo {
    position: relative;
    grid-column: span 12 / span 12;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      padding: 0 0 5px 0;
      width: 200px;
    }
    @media ${Breakpoints.Tablet} {
      display: none;
    }
  }
  .search {
    display: none;
    @media ${Breakpoints.Tablet} {
      display: flex;
    }
    grid-column: span 8 / span 8;
    align-items: center;
    input {
      background: #f7f7f7;
      border-radius: 20px;
    }
  }
  .menu {
    display: none;
    @media ${Breakpoints.Tablet} {
      display: flex;
    }
    grid-column: span 4 / span 4;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
  }
`;

const MenuSidebar = styled.div`
  position: absolute;
  left: 0;
`;

type HeaderProps = {
  openSidebar: () => void;
};
export const Header = ({ openSidebar }: HeaderProps) => {
  return (
    <Wrapper>
      <div className="logo">
        <MenuSidebar>
          <Button icon="pi pi-align-justify" severity="secondary" size="small" onClick={() => openSidebar()} />
        </MenuSidebar>
        <img src={logo} alt="" />
      </div>
      <div className="search">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputField id="search" register={null} placeholder="Search anything..." />
        </span>
      </div>
      <div className="menu">
        <div className="bell">
          <NotificationBell />
        </div>
        <div className="profile">
          <ProfileButton />
        </div>
      </div>
    </Wrapper>
  );
};
