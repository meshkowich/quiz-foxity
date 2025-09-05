// app/components/Results.tsx
'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/app/context/QuizContext';
import Image  from 'next/image';
import SuniflowLogo from '../assets/suniflow_logo.webp';

const StaticSVGChart = styled.svg`
  width: 100%;
  height: 100px;
  overflow: visible;
  margin-top: 10px;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 110px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fff4e6 0%, #ffffff 60%);
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 50px;
  max-width: 175px;
  margin: 0;
`;

const SeeProductButton = styled.button`
  background: #ffd700;
  color: #1a237e;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffed4e;
    transform: translateY(-1px);
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 32px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const IntroSection = styled.div`
  margin: auto;
  @media (max-width: 767px) {
    order: 2;
  }
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1a237e;
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 24px;
  
  @media (max-width: 767px) {
    order: 1;
  }
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #1a237e;
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
  color: #9cb4d8;
  margin-bottom: 8px;
`;

const WeightValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1a237e;
`;

const Arrow = styled.div`
  font-size: 24px;
  color: #ffd700;
  font-weight: bold;
`;

const SummarySection = styled.div`
  @media (min-width: 768px) {
    grid-column: 1 / -1;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #1a237e;
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
  background: #1a237e;
  color: white;
  border-radius: 20px;
  padding: 24px;
  
  @media (min-width: 600px) {
    grid-row: 1 / 3;
  }
`;

const InfoCard = styled.div`
  background: #1a237e;
  color: white;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
`;

const CardLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 12px;
  opacity: 0.8;
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
  height: 8px;
  background: linear-gradient(to right, #4caf50 0%, #4caf50 33%, #ff9800 33%, #ff9800 66%, #f44336 66%);
  border-radius: 4px;
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
  width: 4px;
  height: 16px;
  background: white;
  border-radius: 2px;
`;

const BMILabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  opacity: 0.8;
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
    <ResultsContainer>      
      <HeaderSection>
        <LogoContainer>
          <Image
            src={SuniflowLogo}
            alt="Suniflow Logo"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </LogoContainer>
        <SeeProductButton onClick={() => router.push('/')}>
          SEE THE PRODUCT
        </SeeProductButton>
      </HeaderSection>

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
              <WeightValue>79 kg</WeightValue>
            </WeightPoint>
            <Arrow>→</Arrow>
            <WeightPoint>
              <WeightLabel>SEP 2025</WeightLabel>
              <WeightValue>69 kg</WeightValue>
            </WeightPoint>
          </WeightComparison>

          <ChartContainer>
            <StaticSVGChart viewBox="">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(138, 43, 226, 0.4)" />
                  <stop offset="100%" stopColor="rgba(138, 43, 226, 0.05)" />
                </linearGradient>
              </defs>

              <path
                d="M 30 25 Q 90 35, 150 50 Q 210 65, 270 75"
                fill="none"
                stroke="#8A2BE2"
                strokeWidth="2"
              />
             
              <path
                d="M 30 25 Q 90 35, 150 50 Q 210 65, 270 75 L 270 85 L 30 85 Z"
                fill="url(#chartGradient)"
              />

              <g>
                <circle cx="30" cy="25" r="4" fill="white" stroke="#1a237e" strokeWidth="2" />
                <text x="30" y="15" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a237e">
                  -4 kg
                </text>
              </g>

              <g>
                <circle cx="90" cy="35" r="4" fill="white" stroke="#1a237e" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a237e">
                  -3 kg
                </text>
              </g>

              <g>
                <circle cx="150" cy="50" r="4" fill="white" stroke="#1a237e" strokeWidth="2" />
                <text x="150" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a237e">
                  -2 kg
                </text>
              </g>

              <g>
                <circle cx="210" cy="65" r="4" fill="white" stroke="#1a237e" strokeWidth="2" />
                <text x="210" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a237e">
                  -2 kg
                </text>
              </g>

              <g>
                <circle cx="270" cy="75" r="4" fill="white" stroke="#1a237e" strokeWidth="2" />
              </g>
            </StaticSVGChart>
          </ChartContainer>
        </WeightEstimateCard>

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
              <CardLabel>HEIGHT {calculations.heightUnit}</CardLabel>
              <CardValue>{calculations.heightDisplay}</CardValue>
            </InfoCard>

            <InfoCard>
              <CardLabel>WEIGHT {calculations.weightUnit.toUpperCase()}</CardLabel>
              <CardValue>{calculations.displayWeight || '—'}</CardValue>
            </InfoCard>
          </SummaryGrid>
        </SummarySection>
      </MainContent>
    </ResultsContainer>
  );
};

export default Results;
