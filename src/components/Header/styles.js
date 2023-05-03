import styled from 'styled-components';
import { FaBars, FaHome } from 'react-icons/fa';

export const Container = styled.div`
  height: 100px;
  display: flex;
  background-color: #980122; 
  box-shadow: 0 0 20px 3px;
  margin-bottom:20px;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 50px;
    height: 100%;
    cursor: pointer;
  }

  .logout svg {
    color: white;
    width: 30px;
    height: 30px;
  }

  
`;