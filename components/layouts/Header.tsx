import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Container from "./Container";

const NavBar = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
`;

const StyledLogo = styled.div`
  position: relative;
  min-width: 200px;
  height: auto;
`;

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <Container>
        <NavBar>
          <StyledLogo>
            {/* <Image
            src='/images/dotd-logo.png'
            alt='Logo for Drink of the Day featuring multiple cocktails'
            fill
          /> */}
            <h1>Drink of the Day</h1>
          </StyledLogo>
          <ul>
            <li>
              <a href='#home'>Home</a>
            </li>
            <li>
              <a href='#about'>About</a>
            </li>
            <li>
              <a href='#services'>Services</a>
            </li>
            <li>
              <a href='#contact'>Contact</a>
            </li>
          </ul>
        </NavBar>
      </Container>
    </header>
  );
};

export default Header;
