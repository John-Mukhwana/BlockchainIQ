'use client';

// Add copy protection
import { useEffect } from 'react';
import { useState } from 'react';
import { ChevronRight, Clock, HelpCircle } from 'lucide-react';
import type { Question } from '@/data/questions';

interface QuizPageProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer: number;
}

export default function QuizPage({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  selectedAnswer,
}: QuizPageProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [tempSelected, setTempSelected] = useState(-1);

  // Copy protection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'a' || e.key === 'A' || e.key === 'c' || e.key === 'C'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Add CSS to prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    setTempSelected(index);
    setShowFeedback(true);
    
    // Show feedback for 1.5 seconds, then proceed
    setTimeout(() => {
      onAnswer(index);
      setShowFeedback(false);
      setTempSelected(-1);
    }, 1500);
  };

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  const getOptionClassName = (index: number) => {
    let baseClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ";
    
    if (!showFeedback) {
      return baseClass + "border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer";
    }
    
    if (index === question.correctAnswer) {
      return baseClass + "border-primary-500 bg-primary-100 text-primary-800 cursor-default";
    } else if (index === tempSelected && index !== question.correctAnswer) {
      return baseClass + "border-accent-500 bg-accent-100 text-accent-800 cursor-default";
    } else {
      return baseClass + "border-gray-200 bg-gray-50 text-gray-500 cursor-default";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header with Progress */}
        <div className="bg-white rounded-2xl border border-primary-100 shadow-xl p-8 animate-fade-in select-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <HelpCircle className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-lg font-semibold text-gray-700">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Blockchain Challenge</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
              {question.question}
            </h2>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                {question.category}
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={getOptionClassName(index)}
                disabled={showFeedback}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      showFeedback && index === question.correctAnswer
                        ? 'bg-primary-500 text-white'
                        : showFeedback && index === tempSelected && index !== question.correctAnswer
                        ? 'bg-accent-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                  {!showFeedback && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  {showFeedback && index === question.correctAnswer && (
                    <span className="text-primary-600 font-semibold">✓ Correct</span>
                  )}
                  {showFeedback && index === tempSelected && index !== question.correctAnswer && (
                    <span className="text-accent-600 font-semibold">✗ Incorrect</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className="mt-6 p-4 rounded-xl animate-fade-in">
              {tempSelected === question.correctAnswer ? (
                <div className="flex items-center gap-3 text-primary-700">
                  <div className="p-1 bg-primary-500 rounded-full">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Great job! Moving to next question...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-accent-700">
                  <div className="p-1 bg-accent-500 rounded-full">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Not quite right. Moving to next question...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}