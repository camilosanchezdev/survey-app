import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 100%;
  padding: 10px;
  i {
    font-size: 1.5rem;
  }
  span {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 100%;
    left: 22px;
    top: 5px;
  }
  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  }
`;

export const NotificationBell = () => {
  return (
    <Wrapper>
      <i className="pi pi-bell" />
      <span />
    </Wrapper>
  );
};
