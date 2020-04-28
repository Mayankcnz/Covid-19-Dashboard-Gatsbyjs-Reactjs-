import React from "react";
import { Link } from "gatsby";

import Container from "components/Container";

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>Covid-19 DashBoard</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li></li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;

//<Link to="/page-2/">Page 2</Link>
