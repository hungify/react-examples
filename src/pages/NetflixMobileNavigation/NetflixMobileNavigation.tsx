import netflix from '~/assets/logo/netflix.png';
import { useState } from 'react';
import { GoThreeBars } from 'react-icons/go';
import styled, { css } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Button = styled.button`
  cursor: pointer;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ButtonOpen = styled(Button)`
  position: fixed;
  border: none;
  top: 60px;
  left: 16px;
`;

const HeaderNavbar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 150px;
`;

const Text = styled.p`
  padding: 16px 0;
  text-transform: uppercase;
`;

interface NavbarStyled {
  showNav: boolean;
}

const Nav = css<NavbarStyled>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  transform: ${({ showNav }) => {
    return showNav ? 'translateX(0)' : 'translateX(-100%)';
  }};
`;

const NavBlack = styled.div`
  ${Nav};
  background-color: rgb(34, 31, 31);
  width: 60%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.4s;
`;

const NavRed = styled.div`
  background-color: rgb(229, 9, 20);
  width: 95%;
  transition-delay: 0.2s;
  ${Nav};
`;

const NavWhite = styled.div`
  background-color: #fff;
  width: 95%;
  padding: 40px;
  transition-delay: 0s;
  ${Nav};
`;

const ButtonClose = styled(Button)`
  opacity: 0.3;
`;

const MenuList = styled.ul`
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 20px 0;
  ul {
    padding-left: 20px;
  }
`;
const MenuItemLink = styled(Link)`
  color: rgb(34, 31, 31);
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
`;

export default function NetflixMobileNavigation() {
  const [showNav, setShowNav] = useState(false);

  const handleShowNavbar = () => {
    setShowNav(!showNav);
  };

  return (
    <Wrapper>
      <ButtonOpen onClick={handleShowNavbar}>
        <GoThreeBars />
      </ButtonOpen>
      <Img src={netflix} alt='netflix' />
      <Text>Mobile Navigation</Text>
      <NavBlack showNav={showNav}>
        <NavRed showNav={showNav}>
          <NavWhite showNav={showNav}>
            <HeaderNavbar>
              <ButtonClose onClick={() => setShowNav(false)}>
                <FaTimes />
              </ButtonClose>
              <Img src={netflix} alt='netflix' />
            </HeaderNavbar>

            <MenuList>
              <MenuItem>
                <MenuItemLink to='/'>Teams</MenuItemLink>
              </MenuItem>
              <MenuItem>
                <MenuItemLink to='/'>Locations</MenuItemLink>
              </MenuItem>

              <MenuItem>
                <MenuItemLink to='/'>Live at netflix</MenuItemLink>
                <MenuList>
                  <MenuItem>
                    <MenuItemLink to='/'>NETFLIX CULTURE MEMO</MenuItemLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuItemLink to='/'>WORK LIFE BALANCE</MenuItemLink>
                  </MenuItem>

                  <MenuItem>
                    <MenuItemLink to='/'>INCLUSION & DIVERSITY</MenuItemLink>
                  </MenuItem>

                  <MenuItem>
                    <MenuItemLink to='/'>Blog</MenuItemLink>
                  </MenuItem>
                </MenuList>
              </MenuItem>
            </MenuList>
          </NavWhite>
        </NavRed>
      </NavBlack>
    </Wrapper>
  );
}
