"use client";

import styled from "styled-components";
import UpTo from "./components/UpTo";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PromoBar = styled.div`
  background: #00095C;
  color: white;
  padding: 8px 16px;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 12px 24px;
    display: flex;
    justify-content: center;
    
  }
`;

const PromoText = styled.div`
  font-weight: bold;
  font-size: 12px;  
  
  @media (min-width: 768px) {
    font-size: 14px;
    
  }
`;


const HorizontalLine = styled.hr`
  border: 0;
  height: 1px;
  background: #fff;
  margin: 10px auto;
  width: 325px;
    @media (min-width: 768px) {
      display: none;
    }
`;


const PromoDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 10px;
  
  @media (min-width: 768px) {
    font-size: 12px;
    gap: 24px;
    margin-left: 24px;
  }
`;

const CountDown = styled.span`
  background: #ffd700;
  color: #1a237e;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;

  @media (min-width: 768px) {
    order: 1;
  }
`;

const PromoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    border-left: 1px solid #fff;
    padding-left: 24px;
  }

`;

const Header = () => (
  <StyledHeader>
    <PromoBar>
      <PromoText>EXCLUSIVE WINTER SALE <UpTo>up to</UpTo> 60% OFF!</PromoText>
      <HorizontalLine />
      <PromoDetails>
        <CountDown>23:59:54</CountDown>
        <PromoItem>🚚 FREE SHIPPING</PromoItem>
        <PromoItem>📋 DETOX GUIDE INCLUDED</PromoItem>
      </PromoDetails>
    </PromoBar>
  </StyledHeader>
);

export default Header;
