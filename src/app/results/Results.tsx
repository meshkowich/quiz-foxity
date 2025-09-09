// app/components/Results.tsx
'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/app/context/QuizContext';
import Logo from '../components/Logo';
import Image from 'next/image';
import Chart from '../assets/chart.webp';
import BackgroundImage from '../assets/BG yellow.webp';


const ChartContainer = styled.div`  
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ResultsWrapper = styled.div`
  min-height: 100vh;  
  padding: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const SeeProductButton = styled.button`
  background: #FFCF00;
  color: #00095C;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFAA2B;
    transform: translateY(-2px);
  }
`;

const ResultsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const MainContent = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 32px;
  padding: 24px;
  display: grid;
  gap: 32px;
  z-index: 5;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
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
    border-radius: 24px;    
  }
`;

const IntroSection = styled.div`
  margin: auto;  
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #00095C;
  line-height: 1.2;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const WeightEstimateCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;  
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #00095C;
  text-align: center;
  margin-bottom: 24px;
`;

const WeightComparison = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const WeightPoint = styled.div`
  text-align: center;
`;

const WeightLabel = styled.div`
  font-size: 12px;
  color: #A8B0F8;
  margin-bottom: 8px;
`;

const WeightValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #00095C;
`;

const Arrow = styled.div`
  font-size: 24px;
  color: #ffd700;
  font-weight: bold;
`;

const SummarySection = styled.div`
  margin-bottom: 32px;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #00095C;
  text-align: center;
  margin-bottom: 32px;
`;

const SummaryGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  
  @media (min-width: 600px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

const BMICard = styled.div`
  background: #00095C;
  color: #fff;
  border-radius: 20px;
  padding: 24px;
  
  @media (min-width: 600px) {
    grid-row: 1 / 3;
  }
`;

const InfoCard = styled.div`
  background: #00095C;
  color: #fff;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
`;

const CardLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const BMIValue = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const BMIBar = styled.div`
  position: relative;
  height: 40px;
  background: linear-gradient(to right, #4BD4A9 0%, #4BD4A9 33%, #EF809B 33%, #EF809B 66%, #E32855 66%);
  border-radius: 50px;
  margin-bottom: 12px;
`;

const BMIProgress = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.$position}%;
  transform: translate(-50%, -50%);
`;

const BMIMarker = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.$position}%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 48px;
  background: white;
  border-radius: 50px;
  border: 2px solid #00095C;
`;

const BMILabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Results = () => {
  const router = useRouter();
  const { quiz } = useQuiz();

  const calculations = useMemo(() => {
    let heightInMeters = 0;
    let weightInKg = quiz.weight || 0;
    let desiredWeightInKg = quiz.desiredWeight || 0;

    // Convert height to meters
    if (quiz.measurementUnit === 'imperial') {
      const totalInches = (quiz.heightFeet || 0) * 12 + (quiz.heightInches || 0);
      heightInMeters = totalInches * 0.0254;
      // Convert weight from lbs to kg if imperial
      weightInKg = weightInKg * 0.453592;
      desiredWeightInKg = desiredWeightInKg * 0.453592;
    } else {
      heightInMeters = (quiz.heightCm || 0) / 100;
    }

    const bmi = heightInMeters > 0 && weightInKg > 0 ? weightInKg / (heightInMeters * heightInMeters) : 0;

    // BMI categories
    let bmiCategory = 'Normal weight';
    let bmiPosition = 50; // percentage for progress bar

    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiPosition = 20;
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Normal weight';
      bmiPosition = 40;
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
      bmiPosition = 70;
    } else if (bmi >= 30) {
      bmiCategory = 'Obesity';
      bmiPosition = 90;
    }

    return {
      bmi: bmi.toFixed(2),
      bmiCategory,
      bmiPosition,
      currentWeight: Math.round(weightInKg),
      desiredWeight: Math.round(desiredWeightInKg),
      weightLoss: Math.round(weightInKg - desiredWeightInKg),
      displayWeight: quiz.measurementUnit === 'imperial' ? quiz.weight : Math.round(weightInKg),
      displayDesiredWeight: quiz.measurementUnit === 'imperial' ? quiz.desiredWeight : Math.round(desiredWeightInKg),
      heightDisplay: quiz.measurementUnit === 'imperial' ?
        `${quiz.heightFeet || 0}'${quiz.heightInches || 0}"` :
        `${quiz.heightCm || 0}`,
      weightUnit: quiz.measurementUnit === 'imperial' ? 'lb' : 'kg',
      heightUnit: quiz.measurementUnit === 'imperial' ? '' : 'cm'
    };
  }, [quiz]);

  return (
    <ResultsWrapper>      
      <HeaderSection>
        <Logo />
        <SeeProductButton onClick={() => router.push('/')}>
          SEE THE PRODUCT
        </SeeProductButton>
      </HeaderSection>

      <ResultsContainer>
        <MainContent>
          <IntroSection>
            <MainTitle>See how Suniflow can improve your life</MainTitle>
            <Description>
              Experience better overall health. Discover how Suniflow can assist you in your personal journey below.
            </Description>
          </IntroSection>

          <WeightEstimateCard>
            <ChartTitle>Weight estimate</ChartTitle>
            <WeightComparison>
              <WeightPoint>
                <WeightLabel>FEB 2025</WeightLabel>
                <WeightValue>
                  {`${calculations.displayWeight || '—'} ${calculations.weightUnit}`}
                </WeightValue>
              </WeightPoint>
              <Arrow>→</Arrow>
              <WeightPoint>
                <WeightLabel>SEP 2025</WeightLabel>
                <WeightValue>
                  {`${calculations.displayDesiredWeight || '—'} ${calculations.weightUnit}`}
                </WeightValue>
              </WeightPoint>
            </WeightComparison>

            <ChartContainer>
              <Image src={Chart} alt="Graph" />
            </ChartContainer>
          </WeightEstimateCard>
        </MainContent>

        <SummarySection>
          <SummaryTitle>Your personal summary</SummaryTitle>

          <SummaryGrid>
            <BMICard>
              <CardLabel>YOUR BMI</CardLabel>
              <BMIValue>{calculations.bmi}</BMIValue>
              <BMIBar>
                <BMIProgress $position={calculations.bmiPosition} />
                <BMIMarker $position={calculations.bmiPosition} />
              </BMIBar>
              <BMILabels>
                <span>Normal weight</span>
                <span>Overweight</span>
                <span>Obesity</span>
              </BMILabels>
            </BMICard>

            <InfoCard>
              <CardLabel>AGE</CardLabel>
              <CardValue>{quiz.age || '—'}</CardValue>
            </InfoCard>

            <InfoCard>
              <CardLabel>GENDER</CardLabel>
              <CardValue>{quiz.gender ? quiz.gender.charAt(0).toUpperCase() + quiz.gender.slice(1) : '—'}</CardValue>
            </InfoCard>

            <InfoCard>
              <CardLabel>HEIGHT {calculations.heightUnit.toUpperCase()}</CardLabel>
              <CardValue>{calculations.heightDisplay}</CardValue>
            </InfoCard>

            <InfoCard>
              <CardLabel>WEIGHT {calculations.weightUnit.toUpperCase()}</CardLabel>
              <CardValue>{calculations.displayWeight || '—'}</CardValue>
            </InfoCard>
          </SummaryGrid>
        </SummarySection>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
