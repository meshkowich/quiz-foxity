"use client";

import styled from "styled-components";
import BackgroundImg from "./assets/BG blue.webp";
import Image  from 'next/image';
import SuniflowLogoLight from './assets/suniflow_logo_light.webp';



const StyledFooter = styled.footer`
  background-image: url('${BackgroundImg.src}');
  
  color: white;
  padding: 32px 16px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto; 
  
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  margin-bottom: 50px;
  

`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {    
    gap: 32px;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  

`;

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.7);
`;

const Footer = () => (
  <StyledFooter>
    <FooterContent>
      <FooterLogo>
        <Image
          src={SuniflowLogoLight}
          alt="Suniflow Logo"
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      </FooterLogo>
      <FooterNav>
        <FooterLink>FAQ</FooterLink>
        <FooterLink>Privacy Policy</FooterLink>
        <FooterLink>Terms of Services</FooterLink>
        <FooterLink>Contact Us</FooterLink>
      </FooterNav>
      <SocialIcons>
        <SocialIcon>📘</SocialIcon>
        <SocialIcon>📷</SocialIcon>
      </SocialIcons>
      <Copyright>Suniflow 2023 © All rights reserved</Copyright>
    </FooterContent>
  </StyledFooter>
);

export default Footer;
