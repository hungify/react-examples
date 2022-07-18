import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #eafbff;
  background-image: linear-gradient(to bottom, #eafbff 0%, #eafbff 50%, #5290f9 50%, #5290f9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
`;

interface NavbarStyled {
  isOpen: boolean;
}
const Navbar = styled.nav<NavbarStyled>`
  width: ${({ isOpen }) => (isOpen ? '350px' : '80px')};

  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
  transition: width 0.6s linear;
  gap: 10px;
`;

interface MenuListStyled {
  isOpen: boolean;
}

const MenuList = styled.ul<MenuListStyled>`
  display: flex;
  width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  justify-content: space-between;
  transition: width 0.6s linear;
  height: 30px;
  align-items: center;
  li {
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  }
`;
const MenuItem = styled.li`
  opacity: 1;
  transition: transform 0.6s linear, opacity 0.6s linear;
`;
const MenuLink = styled(Link)`
  color: #000;
`;
interface ButtonStyled {
  isOpen: boolean;
}

const Button = styled.button<ButtonStyled>`
  background-color: #fff;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  height: 30px;
  width: 30px;

  span {
    background-color: #5290f9;
    height: 2px;
    width: 20px;
    position: absolute;
    top: 10px;
    left: 5px;
    transition: transform 0.6s linear;

    &:nth-child(1) {
      &.open {
        transform: rotate(-765deg) translateY(5.5px);
      }
    }
    &:nth-child(2) {
      top: auto;
      bottom: 10px;
      &.open {
        transform: rotate(765deg) translateY(-5.5px);
      }
    }
  }
`;

export default function AnimatedNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Navbar isOpen={isOpen}>
        <MenuList isOpen={isOpen}>
          <MenuItem>
            <MenuLink to="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/">Works</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/">About</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/">Contact</MenuLink>
          </MenuItem>
        </MenuList>
        <Button onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <span className={`${isOpen ? 'open' : ''}`}></span>
          <span className={`${isOpen ? 'open' : ''}`}></span>
        </Button>
      </Navbar>
    </Wrapper>
  );
}
