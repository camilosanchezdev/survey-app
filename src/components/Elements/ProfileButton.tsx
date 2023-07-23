import { styled } from 'styled-components';
import profileIcon from '@/assets/img/profile.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  img {
    padding: 5px;
    width: 50px;
  }
  span {
    padding: 5px 20px;
    font-weight: bold;
  }
  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  }
`;

export const ProfileButton = () => {
  return (
    <Wrapper>
      <img src={profileIcon} alt="" />
      <span>Deni Ginting</span>
      <i className="pi pi-angle-down" />
    </Wrapper>
  );
};
