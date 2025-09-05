"use client";

import styled from 'styled-components';
import Image  from 'next/image';
import HeroImage from './assets/short-hero-collage-desktop@2x.webp';
import SuniflowLogo from './assets/suniflow_logo.webp';
import BackgroundImage from './assets/BG yellow.webp';
import Button from './components/Button';
import UpTo from './components/UpTo';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/app/context/QuizContext';

const MainContentBack = styled.main`
  max-width: 1400px;
  margin: 20px auto 0 auto;
  border-radius: 48px;
  max-height: 800px;
`;

const MainContent = styled.main`
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  z-index: 5;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  
    gap: 48px;
    align-items: center;
  }

  &:before {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${BackgroundImage.src}');
    background-size: cover;
    opacity: 0.2;
    z-index: -1;
    border-radius: 48px;
    
  }
`;

const ContentSection = styled.div`
  order: 2;
  
  @media (min-width: 768px) {
    order: 1;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 50px;
  max-width: 175px;
  margin: 100px auto 80px auto;
  @media (min-width: 768px) {
    margin: 100px 0 50px 80px;
  }
`;

const TextContent = styled.div`
  max-width: 500px;
  margin: 0 25px 25px;
  @media (min-width: 768px) {
    margin: 0 0 100px 80px;
  }
`;

const MainHeading = styled.h1`
  font-size: 24px;
  font-weight: semibold;
  color: #00095C;
  margin-bottom: 16px;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 48px;
    margin-bottom: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #00095C;
  line-height: 24px;
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

const GenderSection = styled.div`
  margin-bottom: 32px;
`;

const GenderLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #00095C;
  margin-bottom: 16px;
  
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

const GenderButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

interface GenderButtonProps {
  $yellow?: boolean;
}

const GenderButton = styled(Button)<GenderButtonProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 56px;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  font-size: 14px;  
  color: #00095C;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$yellow ? `
    background: #ffcf00;    
  ` : `
    background: #ffaa2b;    
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  @media (min-width: 768px) {
    font-size: 16px;    
  }  
`;

const GenderIcon = styled.span``;

const SaleUnderButtons = styled.div`
  position: relative;
  background: #00095C;
  color: #fff;
  text-align: center;  
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    font-size: 14px;
  }
  
  &:before, &:after {
    content: '';
    position: absolute;
    transform: translateX(-50%);
    top: -14px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #00095C;
  }
  &:before {    
    left: calc(25% + 6px);
  }
  &:after {    
    left: calc(75% + 6px);    
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  order: 2;
  display: flex;
  justify-content: center;
  align-items: center;  
  max-width: 600px;

`;

const Features = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 80px;
  background: white;
  
  @media (min-width: 768px) {
    gap: 64px;    
  }
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FeatureText = styled.span`
  font-size: 14px;
  color: #00095C;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Landing = () => {
  const router = useRouter();
  const { quiz, setGender } = useQuiz();

  const select = (g: 'female' | 'male') => {
    setGender(g);
    router.push('/quiz');
  };
  return (
    <>
      <MainContentBack>
        <MainContent>
          <ContentSection>
            <LogoContainer>
              <Image
                src={SuniflowLogo}
                alt="Suniflow Logo"
                style={{ maxWidth: '100%', height: 'auto' }} 
              />
            </LogoContainer>

            <TextContent>
              <MainHeading>
                Emotional cravings or mood swings?
              </MainHeading>
              <Description>
                Curb your emotional cravings, reduce mood swings, and promote serotonin
                balance. Take a quiz to see how Suniflow can help you.
              </Description>

              <GenderSection>
                <GenderLabel>Start by selecting your gender:</GenderLabel>
                <GenderButtons>
                  <GenderButton $yellow onClick={() => select('female')} aria-pressed={quiz.gender === 'female'}>
                    <GenderIcon>♀</GenderIcon>
                    FEMALE
                  </GenderButton>
                  <GenderButton onClick={() => select('male')} aria-pressed={quiz.gender === 'male'}>
                    <GenderIcon>♂</GenderIcon>
                    MALE
                  </GenderButton>
                </GenderButtons>
              </GenderSection>

              <SaleUnderButtons>
                ❄️ WINTER SALE <UpTo>up to</UpTo> 60% OFF!
              </SaleUnderButtons>
            </TextContent>
          </ContentSection>

          <ImageContainer>
            <Image
              src={HeroImage}
              alt="Customer testimonial"
              style={{ position: 'absolute', maxWidth: '100%', height: 'auto', top: 0 }} 
            />
          </ImageContainer>
        </MainContent>

      </MainContentBack>

      <Features>
        <Feature>
          <FeatureIcon>🌾</FeatureIcon>
          <FeatureText>Gluten-free</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>🌱</FeatureIcon>
          <FeatureText>Vegan</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>🧬</FeatureIcon>
          <FeatureText>Non-GMO</FeatureText>
        </Feature>
      </Features>
    </>
  );
};

export default Landing;
