// app/components/Quiz.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/app/context/QuizContext';

const QuizContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fff4e6 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const QuizCard = styled.div`
  background: transparent;
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const StepIndicator = styled.div`
  font-size: 16px;
  color: #1a237e;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: right;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const StepTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #1a237e;
  line-height: 1.2;
  margin: 0;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const StepText = styled.p`
  font-size: 16px;
  color: #1a237e;
  line-height: 24px;  
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

const MoodOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: ${props => props.$selected ? '#e3f2fd' : 'rgba(255,255,255,0.8)'};
  border: 2px solid ${props => props.$selected ? '#1a237e' : 'transparent'};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #1a237e;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.9);
    border-color: #1a237e;
  }
`;

const Arrow = styled.span`
  font-size: 18px;
  color: #1a237e;
`;

const SymptomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

const SymptomOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: ${props => props.$selected ? '#e3f2fd' : 'rgba(255,255,255,0.8)'};
  border: 2px solid ${props => props.$selected ? '#1a237e' : 'rgba(26,35,126,0.2)'};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #1a237e;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    background: rgba(255,255,255,0.9);
    border-color: #1a237e;
  }
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #1a237e;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$checked ? '#1a237e' : 'transparent'};
  color: white;
  font-size: 12px;
  flex-shrink: 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 2px;
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
  padding: 4px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 32px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$active ? `
    background: #1a237e;
    color: white;
  ` : `
    background: transparent;
    color: #1a237e;
  `}
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.8);
  border-radius: 25px;
  padding: 0 20px;
  flex: 1;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  padding: 16px 0;
  font-size: 16px;
  color: #1a237e;
  flex: 1;
  outline: none;
  
  &::placeholder {
    color: #9cb4d8;
  }
`;

const Unit = styled.span`
  color: #1a237e;
  font-weight: 500;
  margin-left: 8px;
`;

const ContinueButton = styled.button`
  background: #ffd700;
  color: #1a237e;
  border: none;
  padding: 16px 48px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffed4e;
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background: transparent;
  color: #1a237e;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const {
    quiz,
    setMood,
    toggleSymptom,
    setMeasurementUnit,
    setAge,
    setHeightFeet,
    setHeightInches,
    setHeightCm,
    setWeight,
    setDesiredWeight,
    setEmail
  } = useQuiz();

  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed, navigate to results
      router.push('/results');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleMoodSelect = (mood: any) => {
    setMood(mood);
    setTimeout(nextStep, 300); // Auto-advance after selection
  };

  const symptoms = [
    'Mood Swings',
    'Gut discomfort',
    'Anxiety or stress',
    'Low energy',
    'None'
  ];

  const moodOptions = [
    { value: 'not-great', label: 'Not great at all' },
    { value: 'could-be-improved', label: 'Could be improved' },
    { value: 'doing-okay', label: 'Doing okay' },
    { value: 'feeling-good', label: 'Feeling good' },
    { value: 'absolutely-fantastic', label: 'Absolutely fantastic!' }
  ];

  return (
    <QuizContainer>
      <QuizCard>
        <StepIndicator>
          {currentStep} of 3
        </StepIndicator>

        {currentStep === 1 && (
          <StepContent>
            <StepTitle>How are you feeling today? Let us know where you're at!</StepTitle>
            <OptionsContainer>
              {moodOptions.map((option) => (
                <MoodOption
                  key={option.value}
                  onClick={() => handleMoodSelect(option.value as any)}
                  $selected={quiz.mood === option.value}
                >
                  <span>{option.label}</span>
                  <Arrow>→</Arrow>
                </MoodOption>
              ))}
            </OptionsContainer>
            {currentStep > 1 && (
              <BackButton onClick={prevStep}>
                ← GO BACK
              </BackButton>
            )}
          </StepContent>
        )}

        {currentStep === 2 && (
          <StepContent>
            <StepTitle>Do you relate to any of these symptoms?</StepTitle>
            <SymptomsContainer>
              {symptoms.map((symptom) => (
                <SymptomOption
                  key={symptom}
                  $selected={quiz.symptoms.includes(symptom)}
                  onClick={() => toggleSymptom(symptom)}
                >
                  <Checkbox $checked={quiz.symptoms.includes(symptom)}>
                    {quiz.symptoms.includes(symptom) && '✓'}
                  </Checkbox>
                  <span>{symptom}</span>
                </SymptomOption>
              ))}
            </SymptomsContainer>
            <ContinueButton onClick={nextStep}>
              CONTINUE
            </ContinueButton>
            <BackButton onClick={prevStep}>
              ← GO BACK
            </BackButton>
          </StepContent>
        )}

        {currentStep === 3 && (
          <StepContent>
            <StepTitle>To receive your summary, please enter your measurements.</StepTitle>
            
            <TabContainer>
              <Tab 
                $active={quiz.measurementUnit === 'imperial'}
                onClick={() => setMeasurementUnit('imperial')}
              >
                IMPERIAL
              </Tab>
              <Tab 
                $active={quiz.measurementUnit === 'metric'}
                onClick={() => setMeasurementUnit('metric')}
              >
                METRIC
              </Tab>
            </TabContainer>

            <FormContainer>
              <FormRow>
                <FormField>
                  <Input 
                    type="number" 
                    placeholder="Age"
                    value={quiz.age || ''}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : null)}
                  />
                  <Unit>years</Unit>
                </FormField>
              </FormRow>

              {quiz.measurementUnit === 'imperial' ? (
                <FormRow>
                  <FormField>
                    <Input 
                      type="number" 
                      placeholder="Height"
                      value={quiz.heightFeet || ''}
                      onChange={(e) => setHeightFeet(e.target.value ? parseInt(e.target.value) : null)}
                    />
                    <Unit>ft</Unit>
                  </FormField>
                  <FormField>
                    <Input 
                      type="number" 
                      placeholder="In"
                      value={quiz.heightInches || ''}
                      onChange={(e) => setHeightInches(e.target.value ? parseInt(e.target.value) : null)}
                    />
                    <Unit>in</Unit>
                  </FormField>
                </FormRow>
              ) : (
                <FormRow>
                  <FormField>
                    <Input 
                      type="number" 
                      placeholder="Height"
                      value={quiz.heightCm || ''}
                      onChange={(e) => setHeightCm(e.target.value ? parseInt(e.target.value) : null)}
                    />
                    <Unit>cm</Unit>
                  </FormField>
                </FormRow>
              )}

              <FormRow>
                <FormField>
                  <Input 
                    type="number" 
                    placeholder="Weight"
                    value={quiz.weight || ''}
                    onChange={(e) => setWeight(e.target.value ? parseInt(e.target.value) : null)}
                  />
                  <Unit>{quiz.measurementUnit === 'imperial' ? 'lb' : 'kg'}</Unit>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField>
                  <Input 
                    type="number" 
                    placeholder="Desired weight"
                    value={quiz.desiredWeight || ''}
                    onChange={(e) => setDesiredWeight(e.target.value ? parseInt(e.target.value) : null)}
                  />
                  <Unit>{quiz.measurementUnit === 'imperial' ? 'lb' : 'kg'}</Unit>
                </FormField>
              </FormRow>
            </FormContainer>

            <ContinueButton onClick={nextStep}>
              CONTINUE
            </ContinueButton>
            <BackButton onClick={prevStep}>
              ← GO BACK
            </BackButton>
          </StepContent>
        )}

        {currentStep === 4 && (
          <StepContent>
            <StepTitle>Enter your email</StepTitle>
            <FormContainer>
              <FormRow>
                <FormField>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    value={quiz.email || ''}
                    onChange={(e) => setEmail(e.target.value || null)}
                  />
                </FormField>
              </FormRow>
              <StepText>We do respect your privacy.</StepText>
            </FormContainer>
            <ContinueButton onClick={nextStep}>
              CONTINUE
            </ContinueButton>
            <BackButton onClick={prevStep}>
              ← GO BACK
            </BackButton>
          </StepContent>
        )}
      </QuizCard>
    </QuizContainer>
  );
};

export default Quiz;
