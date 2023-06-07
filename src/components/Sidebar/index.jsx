import React, { useContext } from 'react';
import { Container, Content } from './styles';
import {
  FaTimes,
  FaHome,
  FaRegFileAlt,
  FaPrescriptionBottle,
  FaDumpsterFire,
  FaDumpster,
  FaClipboardList,
} from 'react-icons/fa';
import styled from 'styled-components';
import SidebarItem from '../SidebarItem';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Sidebar = ({ active }) => {
  const { profile } = useContext(UserContext);

  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <StyledLink to="/novidades">
          <SidebarItem Icon={FaHome} Text="Home" />
        </StyledLink>
        {profile === 'vendedor' && (
          <>
            <StyledLink to="/listaEstabs">
              <SidebarItem Icon={FaDumpster} Text="Estabelecimentos" />
            </StyledLink>
            <StyledLink to="/listaProdutos">
              <SidebarItem Icon={FaClipboardList} Text="Catálogo" />
            </StyledLink>
            <StyledLink to="/relatorio">
              <SidebarItem Icon={FaRegFileAlt} Text="Relatório" />
            </StyledLink>
          </>
        )}
        {profile === 'administrador' && (
          <>
            <StyledLink to="/cadastroProduto">
              <SidebarItem Icon={FaPrescriptionBottle} Text="Cadastro Produto" />
            </StyledLink>
            <StyledLink to="/cadastroEstab">
              <SidebarItem Icon={FaDumpsterFire} Text="Cadastro Estabelecimento" />
            </StyledLink>
            <StyledLink to="/listaEstabs">
              <SidebarItem Icon={FaDumpster} Text="Estabelecimentos" />
            </StyledLink>
            <StyledLink to="/listaProdutos">
              <SidebarItem Icon={FaClipboardList} Text="Catálogo" />
            </StyledLink>
            <StyledLink to="/relatorio">
              <SidebarItem Icon={FaRegFileAlt} Text="Relatório" />
            </StyledLink>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Sidebar;
