import React from 'react'
import { Container, Content } from './styles'
import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaRegSun, 
  FaUserAlt, 
  FaIdCardAlt, 
  FaRegFileAlt,
  FaGulp,
  FaRegCalendarAlt,
  FaChartBar,
  FaOpencart,
  FaDumpster,
  FaDumpsterFire,
  FaPrescriptionBottle,
  FaClipboardList,
  FaShoppingCart
} from 'react-icons/fa'

import styled from 'styled-components';

import SidebarItem from '../SidebarItem'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    
<Container sidebar={active}>
  <FaTimes onClick={closeSidebar} />  
  <Content>
    <StyledLink to="/">
      <SidebarItem Icon={FaHome} Text="Home" />
    </StyledLink>
    <StyledLink to="/cadastroProduto">
      <SidebarItem Icon={FaPrescriptionBottle} Text="Cadastro Produto" />
    </StyledLink>
    <StyledLink to="/cadastroEstab">
      <SidebarItem Icon={FaDumpsterFire} Text="Cadastro Estabelecimento" />
    </StyledLink>
    <StyledLink to="/listaEstabs">
      <SidebarItem Icon={FaDumpster} Text="Estabelecimentos" />
    </StyledLink>
    {/* <StyledLink to="/carrinho">
      <SidebarItem Icon={FaShoppingCart} Text="Carrinho" />
    </StyledLink> */}
    <StyledLink to="/listaProdutos">
      <SidebarItem Icon={FaClipboardList} Text="Lista de produtos" />
    </StyledLink>
    <StyledLink to="/relatorio">
      <SidebarItem Icon={FaRegFileAlt} Text="Relatório" />
    </StyledLink>
  </Content>
</Container>
  )
}

export default Sidebar