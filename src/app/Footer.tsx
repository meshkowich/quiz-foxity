"use client";

import styled from "styled-components";
import BackgroundImg from "./assets/BG blue.webp";
import Image  from 'next/image';
import IgIcon from './assets/ig.webp';
import FbIcon from './assets/fb.webp';
import { usePathname } from "next/navigation";
import Logo from "./components/Logo";



const StyledFooter = styled.footer`
  background-image: url('${BackgroundImg.src}');
  color: #fff;
  padding-bottom: 16px ; 
`;

const FooterContent = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 32px 16px 0; 
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;
`;

const FooterLink = styled.a`  
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 768px) {    
    font-size: 16px;
    line-height: 24px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 50px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const Copyright = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {    
    font-size: 14px;
  }
`;

const currentYear = new Date().getFullYear();



const Footer = () => {  
  const pathname = usePathname();
  const isQuizFlow = pathname.startsWith('/quiz');
  if (isQuizFlow) return null;
  return (
    <StyledFooter>
      <FooterContent>
        <Logo isLight />        
        <FooterNav>
          <FooterLink href="/">FAQ</FooterLink>
          <FooterLink href="/">Privacy Policy</FooterLink>
          <FooterLink href="/">Terms of Services</FooterLink>
          <FooterLink href="/">Contact Us</FooterLink>
        </FooterNav>
        <SocialIcons>
          <SocialIcon href="https://facebook.com" target="_blank">
            <Image src={FbIcon} alt="Facebook" />
          </SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank">
            <Image src={IgIcon} alt="Instagram" />
          </SocialIcon>
        </SocialIcons>
      </FooterContent>
      <Copyright>Suniflow {currentYear} &copy; All rights reserved</Copyright>
    </StyledFooter>
  );
};

export default Footer;
