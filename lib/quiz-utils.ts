import { questions, Question } from '@/data/questions';

// Function to shuffle options for a question and update correct answer index
function shuffleQuestionOptions(question: Question, seededRandom: () => number): Question {
  const originalCorrectAnswer = question.options[question.correctAnswer];
  const shuffledOptions = [...question.options];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  
  // Find the new index of the correct answer
  const newCorrectAnswerIndex = shuffledOptions.findIndex(option => option === originalCorrectAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswerIndex
  };
}

// Enhanced randomization with user session
export function getDailyQuestions(): Question[] {
  // Create a unique seed for each user session
  const sessionId = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now();
  const seed = (sessionId + timestamp).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create a seeded random function
  let seedValue = seed;
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };

  // Shuffle questions using seeded random
  const shuffledQuestions = [...questions];
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }

  // Shuffle options for each question to randomize correct answer positions
  const questionsWithShuffledOptions = shuffledQuestions.slice(0, 15).map(question => 
    shuffleQuestionOptions(question, seededRandom)
  );

  return questionsWithShuffledOptions;
}

export function calculateScore(answers: number[], questions: Question[]): number {
  const correct = answers.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);
  
  return Math.round((correct / questions.length) * 100);
}

export function shareOnTwitter(name: string, score: number) {
  const text = `I just scored ${score}% on BlockchainIQ! 🚀🎯 Earned my blockchain certificate! Test your knowledge at`;
  const url = window.location.origin;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank');
}

export function shareOnLinkedIn(name: string, score: number) {
  const url = window.location.origin;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedinUrl, '_blank');
}