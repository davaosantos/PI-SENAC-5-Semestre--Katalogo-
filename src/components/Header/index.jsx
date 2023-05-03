import React, { useState } from 'react'

import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { IoLogOutOutline } from "react-icons/io5";
import Sidebar from '../Sidebar'
import { NavLink } from 'react-router-dom';
import {Container} from './styles';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSiderbar = () => setSidebar(!sidebar);

  return (
    <Container>
      <FaBars onClick={showSiderbar} />
  
      <NavLink className="logout" to="/login"><IoLogOutOutline/></NavLink>
        
      {sidebar && <Sidebar active={setSidebar} />}
    </Container>
  );
};

export default Header;