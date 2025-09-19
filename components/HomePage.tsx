'use client';

import { useState } from 'react';
import { Zap, Brain, Trophy, Users } from 'lucide-react';

interface HomePageProps {
  onStartQuiz: (name: string) => void;
}

export default function HomePage({ onStartQuiz }: HomePageProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartQuiz(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-600">
              BlockchainIQ
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Test your blockchain and cryptocurrency knowledge with our daily quiz challenge
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-in">
          <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-primary-100 rounded-xl w-fit mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Randomized Questions</h3>
            <p className="text-gray-600">15 unique randomized questions from our pool of 80+ blockchain topics</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-accent-100 rounded-xl w-fit mb-4">
              <Trophy className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Certificate</h3>
            <p className="text-gray-600">Score 80%+ to earn your downloadable BlockchainIQ certificate</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-primary-100 rounded-xl w-fit mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Results</h3>
            <p className="text-gray-600">Show off your blockchain expertise on social media</p>
          </div>
        </div>

        {/* Quiz Start Form */}
        <div className="max-w-md mx-auto animate-bounce-in">
          <div className="bg-white p-8 rounded-2xl border border-primary-100 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
                  Enter your name to start
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-colors"
                  placeholder="Your name"
                  required
                  maxLength={50}
                />
              </div>
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full bg-primary-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Start Quiz 🚀
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">Questions reset daily • No signup required • Free forever</p>
        </div>
      </div>
    </div>
  );
}