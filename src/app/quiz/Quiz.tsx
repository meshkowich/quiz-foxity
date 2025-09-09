'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/app/context/QuizContext';
import BackgroundImage from '../assets/BG yellow.webp';
import Logo from '../components/Logo';
import BlurredGraph from '../assets/blurredGraph.webp';
import Image from 'next/image';

const QuizWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  
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

const QuizContainer = styled.div`  
  width: 100%;
  max-width: 1220px;
  text-align: center;
`;

const QuizHeader = styled.div<{ $centerJustify: boolean }>`
  display: flex;
  justify-content: ${props => props.$centerJustify ? 'center' : 'space-between'};
  align-items: center;
  margin-bottom: 50px;
`;

const StepIndicator = styled.div`
  font-size: 16px;
  color: #1a237e;
  font-weight: 600;  
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
  max-width: 400px;
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
  font-weight: 600;
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
  max-width: 400px;
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
  font-weight: 600;
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
  gap: 25px;  
  border-radius: 8px;
  padding: 4px;
  width: 100%;
  max-width: 400px;
  justify-content: space-between;
  
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 32px;
  border: none;
  border-bottom: 2px solid;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  width: 100%;

  &:hover {
    color: #333A7D;
    border-color: #333A7D;
  }
  
  ${props => props.$active ? `    
    color: #00095C;
    border-color: #00095C;
  ` : `    
    color: #A8B0F8;
    border-color: #A8B0F8;
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

const ShorterInput = styled(Input)`
    width: 100%;
`;

const Unit = styled.span`
  color: #1a237e;
  font-weight: 500;
  margin-left: 8px;
`;

const ContinueButton = styled.button`
  background: #FFCF00;
  color: #00095C;
  width: 100%;
  max-width: 400px;
  border: none;
  padding: 16px 48px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFAA2B;
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

const HiddenSubmit = styled.input`
  display: none;
`;

const ErrorMessage = styled(StepText)`
  color: #E32855;
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
  const hiddenSubmitRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');


  const totalSteps = 4;

  const submitResults = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(quiz),
      });
      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.errorMessage);
      }
      router.push('/results');
    } catch (error) {
      const err = error as Error;
      setShowError(true);
      setErrorText(err.message || 'Something went wrong. Please try again.');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      hiddenSubmitRef.current?.click();
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
    <QuizWrapper>
      <QuizContainer>
        <QuizHeader $centerJustify={currentStep === 4}>
          <Logo />
          {currentStep !== 4 && (
            <StepIndicator>
              {currentStep} of 3
            </StepIndicator>
          )}
        </QuizHeader>
        <StepContent>
          {currentStep === 1 && (
            <>
              <StepTitle>How are you feeling today? Let us know where you&apos;re at!</StepTitle>
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
            </>
          )}

          {currentStep === 2 && (
            <>
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
            </>
          )}

          {currentStep === 3 && (
            <>
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
                      <ShorterInput 
                        type="number" 
                        placeholder="Height"
                        value={quiz.heightFeet || ''}
                        onChange={(e) => setHeightFeet(e.target.value ? parseInt(e.target.value) : null)}
                      />
                      <Unit>ft</Unit>
                    </FormField>
                    <FormField>
                      <ShorterInput 
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
            </>
          )}

          {currentStep === 4 && (
            <StepContent>
              <Image src={BlurredGraph} alt="Graph" />
              <StepTitle>Enter your e-mail</StepTitle>
              <FormContainer>
                <FormRow>
                  <FormField>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      submitResults();
                    }}>
                      <Input 
                        type="email"
                        id="email_input"
                        required
                        pattern="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
                        placeholder="email@email.com"
                        value={quiz.email || ''}
                        onChange={(e) => setEmail(e.target.value || null)}
                      />
                      <HiddenSubmit type="submit" ref={hiddenSubmitRef} />
                    </form>
                  </FormField>
                </FormRow>
                <StepText>We do respect your privacy.</StepText>
                {showError && (
                  <ErrorMessage>
                    {errorText}
                  </ErrorMessage>
                )}
              </FormContainer>            
            </StepContent>
          )}

          {currentStep !== 1 && (
            <ContinueButton onClick={nextStep}>
              CONTINUE
            </ContinueButton>
          )}

          {currentStep !== 4 && (
            <BackButton onClick={prevStep}>
              ← GO BACK
            </BackButton>
          )}
        </StepContent>
      </QuizContainer>
    </QuizWrapper>
  );
};

export default Quiz;
