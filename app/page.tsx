'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import QuizPage from '@/components/QuizPage';
import ResultPage from '@/components/ResultPage';
import { getDailyQuestions, calculateScore } from '@/lib/quiz-utils';
import type { Question } from '@/data/questions';

type AppState = 'home' | 'quiz' | 'result';

export default function Home() {
  const [state, setState] = useState<AppState>('home');
  const [userName, setUserName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleStartQuiz = (name: string) => {
    setUserName(name);
    const dailyQuestions = getDailyQuestions();
    setQuestions(dailyQuestions);
    setAnswers(new Array(15).fill(-1)); // Updated to 15 questions
    setState('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = calculateScore(newAnswers, questions);
      setScore(finalScore);
      setState('result');
    }
  };

  const handleRestart = () => {
    setState('home');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setUserName('');
    setQuestions([]);
  };

  return (
    <main className="min-h-screen">
      {state === 'home' && <HomePage onStartQuiz={handleStartQuiz} />}
      {state === 'quiz' && (
        <QuizPage
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion]}
        />
      )}
      {state === 'result' && (
        <ResultPage
          userName={userName}
          score={score}
          onRestart={handleRestart}
          questions={questions}
          answers={answers}
        />
      )}
    </main>
  );
}