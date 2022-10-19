import styled, {css} from 'styled-components';
  
export const Nav = styled.nav`
  background: black;
  opacity: 0.7;
  border-radius: 25px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;

export const NavButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  cursor: pointer;

  ${props => props.primary && css`
    background: transparent;
    color: white;
    &:hover {
        background: palevioletred;
    }
  `}
`;

export const NavLink = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0em 0.25em;
  padding: 0.25em 1em;
  cursor: pointer;
  width: 250px;
  height: 50px;
  font-size: 2vw;
  font-family: monospace;
  text-align: left;

  ${props => props.primary && css`
    background: transparent;
    color: white;
    &:hover {
        background: palevioletred;
    }
  `}
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;