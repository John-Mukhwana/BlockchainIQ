'use client';

import { useState } from 'react';
import { Trophy, RotateCcw, Share2, Download, Twitter, Linkedin } from 'lucide-react';
import SuccessCard from './SuccessCard';
import { shareOnTwitter, shareOnLinkedIn } from '@/lib/quiz-utils';
import type { Question } from '@/data/questions';

interface ResultPageProps {
  userName: string;
  score: number;
  onRestart: () => void;
  questions: Question[];
  answers: number[];
}

export default function ResultPage({ userName, score, onRestart, questions, answers }: ResultPageProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const passed = score >= 80;
  const correctAnswers = answers.filter((answer, index) => answer === questions[index]?.correctAnswer).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl">
        {/* Success Card for Pass */}
        {passed && (
          <div className="mb-4 sm:mb-6 md:mb-8 animate-bounce-in">
            <SuccessCard userName={userName} score={score} />
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-primary-100 shadow-xl p-4 sm:p-6 md:p-8 animate-fade-in mx-2 sm:mx-0">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mx-auto mb-4 sm:mb-6 ${
              passed ? 'bg-primary-500' : 'bg-accent-500'
            }`}>
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">
              <span className={passed ? 'text-primary-500' : 'text-accent-500'}>
                {score}%
              </span>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-2">
              You answered {correctAnswers} out of {questions.length} questions correctly
            </p>

            {passed ? (
              <div className="bg-primary-50 border border-primary-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 mx-2 sm:mx-0">
                <p className="text-primary-800 text-base sm:text-lg font-medium px-2 sm:px-0">
                  🎉 Outstanding, {userName}! You're a certified Blockchain Expert!
                </p>
                <p className="text-primary-600 mt-2 text-sm sm:text-base px-2 sm:px-0">
                  Your exclusive NFT-style certificate is ready! Share your blockchain mastery with the world!
                </p>
              </div>
            ) : (
              <div className="bg-accent-50 border border-accent-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 mx-2 sm:mx-0">
                <p className="text-accent-800 text-base sm:text-lg font-medium px-2 sm:px-0">
                  Great effort, {userName}! Keep learning and challenge yourself again.
                </p>
                <p className="text-accent-600 mt-2 text-sm sm:text-base px-2 sm:px-0">
                  Score 80% or higher to earn your exclusive BlockchainIQ NFT certificate. You're on the right path!
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-primary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-primary-600 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Take New Challenge</span>
              <span className="sm:hidden">New Challenge</span>
            </button>

            {passed && (
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-accent-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-accent-600 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Share Achievement</span>
                  <span className="sm:hidden">Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:left-0 sm:right-auto sm:w-48 bg-white rounded-lg sm:rounded-xl shadow-xl border border-gray-200 p-2 z-10 animate-fade-in">
                    <button
                      onClick={() => {
                        shareOnTwitter(userName, score);
                        setShowShareMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => {
                        shareOnLinkedIn(userName, score);
                        setShowShareMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                      <span>Share on LinkedIn</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Review Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Question Review</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'border-primary-200 bg-primary-50' : 'border-accent-200 bg-accent-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        isCorrect ? 'bg-primary-500 text-white' : 'bg-accent-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                        <div className="text-sm">
                          <p className={`${isCorrect ? 'text-primary-700' : 'text-accent-700'}`}>
                            Your answer: {question.options[userAnswer] || 'No answer'}
                          </p>
                          {!isCorrect && (
                            <p className="text-primary-700 mt-1">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={`text-2xl ${isCorrect ? 'text-primary-500' : 'text-accent-500'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">Challenge yourself again with new randomized questions!</p>
        </div>
      </div>
    </div>
  );
}