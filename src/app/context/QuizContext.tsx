'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type Gender = 'female' | 'male' | null;
export type MeasurementUnit = 'imperial' | 'metric';
export type MoodLevel = 'not-great' | 'could-be-improved' | 'doing-okay' | 'feeling-good' | 'absolutely-fantastic' | null;

export type QuizState = {
  gender: Gender;
  mood: MoodLevel;
  symptoms: string[];
  measurementUnit: MeasurementUnit;
  age: number | null;
  heightFeet: number | null;
  heightInches: number | null;
  heightCm: number | null;
  weight: number | null;
  desiredWeight: number | null;
  email: string | null;
  answers: Record<string, unknown>;
};

const initialQuiz: QuizState = {
  gender: null,
  mood: null,
  symptoms: [],
  measurementUnit: 'imperial',
  age: null,
  heightFeet: null,
  heightInches: null,
  heightCm: null,
  weight: null,
  desiredWeight: null,
  email: null,
  answers: {},
};

type QuizContextValue = {
  quiz: QuizState;
  setGender: (g: Gender) => void;
  setMood: (m: MoodLevel) => void;
  toggleSymptom: (symptom: string) => void;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  setAge: (age: number | null) => void;
  setHeightFeet: (feet: number | null) => void;
  setHeightInches: (inches: number | null) => void;
  setHeightCm: (cm: number | null) => void;
  setWeight: (weight: number | null) => void;
  setDesiredWeight: (weight: number | null) => void;
  setEmail: (email: string | null) => void;
  setAnswer: <T = unknown>(key: string, value: T) => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quiz, setQuiz] = useState<QuizState>(initialQuiz);

  const value = useMemo<QuizContextValue>(() => ({
    quiz,
    setGender: (g) => setQuiz((q) => ({ ...q, gender: g })),
    setMood: (m) => setQuiz((q) => ({ ...q, mood: m })),
    toggleSymptom: (symptom) =>
      setQuiz((q) => ({
        ...q,
        symptoms: q.symptoms.includes(symptom)
          ? q.symptoms.filter((s) => s !== symptom)
          : [...q.symptoms, symptom],
      })),
    setMeasurementUnit: (unit) => setQuiz((q) => ({ ...q, measurementUnit: unit })),
    setAge: (age) => setQuiz((q) => ({ ...q, age })),
    setHeightFeet: (feet) => setQuiz((q) => ({ ...q, heightFeet: feet })),
    setHeightInches: (inches) => setQuiz((q) => ({ ...q, heightInches: inches })),
    setHeightCm: (cm) => setQuiz((q) => ({ ...q, heightCm: cm })),
    setWeight: (weight) => setQuiz((q) => ({ ...q, weight })),
    setDesiredWeight: (weight) => setQuiz((q) => ({ ...q, desiredWeight: weight })),
    setEmail: (email) => setQuiz((q) => ({ ...q, email })),
    setAnswer: (key, value) =>
      setQuiz((q) => ({ ...q, answers: { ...q.answers, [key]: value } })),
    resetQuiz: () => setQuiz(initialQuiz),
  }), [quiz]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within <QuizProvider>');
  return ctx;
}
