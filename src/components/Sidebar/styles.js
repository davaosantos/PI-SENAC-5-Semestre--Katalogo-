import styled from 'styled-components';

export const Container = styled.div`
  background-color: 	#C0C0C0;
  position: fixed;
  z-index: 9999;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 400px;
  left: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .4s;

  > svg {
    position: fixed;
    color: #980122;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;