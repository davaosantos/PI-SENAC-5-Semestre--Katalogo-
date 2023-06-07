import './Footer.css'
import './ResponsiveFooter.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
      <footer>
        <div className="footer">
          <div className="leftContent">
            <p>&copy; Copyright 2019 Stack. All Rights Reserved </p>
          </div>
  
          <div className="rightContent">
            <p><Link to="/privacy-policy">Privacy Policy</Link></p>
            <p><Link to="/terms-and-conditions">Terms and Conditions</Link></p>
          </div>
        </div>
      </footer>
    );
  };