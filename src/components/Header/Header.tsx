import * as React from 'react';
import styled from "styled-components"

const StyledHeader = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  margin: 10px 0;
  right: 50px;
  background: ${props => props.theme.base['6']};
  padding: 10px;
  border-radius: 5px; 
  z-index: 10000;
  font-weight: 500;
  font-size: 1.25rem;
  text-decoration: none;
  color:#000;
  height: 40px;
`

export const Header = ({children}) => (
  <StyledHeader>Hybi-Galaxy</StyledHeader>
)