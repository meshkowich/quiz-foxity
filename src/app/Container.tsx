"use client";

import styled from "styled-components";

const StyledContainer = styled.div`
  // min-height: 100vh;
  // background: linear-gradient(180deg, #fff4e6 0%, #ffffff 100%);
  // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => (
  <StyledContainer>
    {children}
  </StyledContainer>);

export default Container;