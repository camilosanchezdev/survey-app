import { Link, NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '@/assets/img/logo.png';
import { logoutAction } from '@/features/auth';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { Breakpoints } from '@/utils/breakpoints';
import storage from '@/utils/storage';
import { Button } from '../Elements/Button';
import { NotificationBell } from '../Elements/NotificationBell';
import { ProfileButton } from '../Elements/ProfileButton';

const Wrapper = styled.aside`
  height: 100%;
  position: relative;
`;
const Menu = styled.div`
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  @media ${Breakpoints.Tablet} {
    display: none;
  }
`;
const Logo = styled.div`
  display: none;
  padding: 20px 40px;
  border-bottom: 2px solid #f0f0f0;
  margin: 0 0 20px 0;
  @media ${Breakpoints.Tablet} {
    display: flex;
  }
  img {
    width: 100%;
  }
`;
const CustomLink = styled.li`
  list-style: none;
  a {
    cursor: pointer;
    display: flex;
    border: 0;
    background: transparent;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 20px;
    color: #888888;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border-left: 5px solid white;
    &:hover,
    &.active {
      color: #455ca7;
      background: #f0f6fc;
      border-left: 5px solid #455ca7;
    }
  }
`;
const MainMenu = styled.div``;

const Logout = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

type SidebarProps = {
  closeSidebar: () => void;
};
export const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    storage.clearToken();
  };
  return (
    <Wrapper>
      <Menu>
        <div className="bell">
          <NotificationBell />
        </div>
        <div className="profile">
          <ProfileButton />
        </div>
      </Menu>
      <Logo>
        <Link to={PRIVATE_ROUTES.DASHBOARD}>
          <img src={logo} alt="" />
        </Link>
      </Logo>
      <MainMenu>
        <ul>
          <CustomLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to={PRIVATE_ROUTES.DASHBOARD}
              title="Dashboard"
              end
              onClick={() => closeSidebar()}
            >
              <i className="pi pi-th-large"></i> Dashboard
            </NavLink>
          </CustomLink>
          <CustomLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to={PRIVATE_ROUTES.SURVEYS}
              title="Surveys"
              onClick={() => closeSidebar()}
            >
              <i className="pi pi-file"></i> Surveys
            </NavLink>
          </CustomLink>
        </ul>
        <Logout>
          <Button icon="pi pi-sign-out" label="Logout" onClick={() => handleLogout()} />
        </Logout>
      </MainMenu>
    </Wrapper>
  );
};
