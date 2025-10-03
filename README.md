# 🚀 BlockchainIQ - Master Blockchain & Crypto Knowledge

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Farcaster](https://img.shields.io/badge/Farcaster-MiniApp-purple?style=flat-square)](https://docs.farcaster.xyz/)
[![Base](https://img.shields.io/badge/Base-MiniApp-blue?style=flat-square)](https://base.org/)

**The ultimate blockchain and cryptocurrency quiz platform designed as a Farcaster/Base Mini App. Test your knowledge, earn NFT-style certificates, and prove your blockchain expertise!**

## 🎯 What is BlockchainIQ?

BlockchainIQ is an interactive quiz platform that challenges users with comprehensive blockchain and cryptocurrency questions. Built as a Mini App for the Farcaster and Base ecosystems, it provides a seamless, social-native experience for learning and validating blockchain knowledge.

### ✨ Key Features

- **📚 Comprehensive Question Bank**: 80+ carefully curated questions covering all aspects of blockchain technology
- **🎲 Randomized Daily Challenges**: 15 questions randomly selected each day for fresh experiences
- **🏆 NFT-Style Certificates**: Earn beautiful, downloadable certificates for scores of 80% or higher
- **📱 Mobile-First Design**: Optimized for mobile browsers and Mini App environments
- **🔄 Smart Answer Shuffling**: Randomized option positions to prevent pattern guessing
- **🎨 Responsive UI**: Beautiful, modern interface that works across all devices
- **🚀 Social Sharing**: Share achievements on Twitter, LinkedIn, and other platforms
- **⚡ Real-time Scoring**: Instant feedback and performance tracking

## 🧠 Knowledge Areas Covered

The quiz tests knowledge across multiple blockchain domains:

- **Blockchain Fundamentals**: Core concepts, consensus mechanisms, cryptography
- **Cryptocurrencies**: Bitcoin, Ethereum, altcoins, tokenomics
- **DeFi (Decentralized Finance)**: Protocols, yield farming, liquidity pools
- **NFTs & Digital Assets**: Non-fungible tokens, marketplaces, use cases
- **Smart Contracts**: Development, security, best practices
- **Layer 2 Solutions**: Scaling solutions, rollups, sidechains
- **Governance & DAOs**: Decentralized governance, voting mechanisms
- **Security & Best Practices**: Wallet security, common attacks, safety measures

## 🏗️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### Mini App Integration
- **@farcaster/miniapp-sdk**: Farcaster Mini App functionality
- **@coinbase/onchainkit**: Base blockchain integration
- **Wagmi**: Ethereum library for React

### Features
- **HTML5 Canvas**: Dynamic NFT certificate generation
- **Web Share API**: Native mobile sharing capabilities
- **Clipboard API**: Copy-to-clipboard functionality
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/John-Mukhwana/BlockchainIQ.git
   cd BlockchainIQ
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_URL=https://your-domain.com
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

1. **Enter Your Name**: Start by entering your name to personalize your experience
2. **Take the Challenge**: Answer 15 randomized questions from our question bank
3. **Get Instant Feedback**: See your score immediately after completion
4. **Earn Your Certificate**: Score 80% or higher to unlock your NFT-style certificate
5. **Share Your Achievement**: Download your certificate or share your success on social media
6. **Challenge Friends**: Share the app and compete with others!

## 📱 Mini App Features

### Farcaster Integration
- **Frame Metadata**: Rich embeds when shared in Farcaster
- **Launch Button**: One-click launch from social feeds
- **Social Context**: Seamless integration with Farcaster identity

### Base App Integration
- **Manifest Configuration**: Proper Mini App discovery and metadata
- **Account Association**: Verified app ownership
- **Optimized Performance**: Fast loading and smooth interactions

### Mobile Optimizations
- **Touch-Friendly UI**: Large buttons and proper touch targets
- **Responsive Typography**: Readable text at all screen sizes
- **Efficient Sharing**: Multiple sharing options for different platforms

## 🏆 Certificate System

### Earning Criteria
- **Minimum Score**: 80% (12 out of 15 questions correct)
- **Unique Design**: Each certificate includes a unique ID
- **Date Stamped**: Certificates show the completion date

### Certificate Features
- **NFT-Style Design**: Beautiful, professional certificate design
- **High Resolution**: 1000x1000px canvas-generated images
- **Downloadable**: Save directly to device
- **Shareable**: Multiple sharing options available

## 🔧 Development

### Project Structure
```
├── app/                          # Next.js App Router
│   ├── .well-known/             # Mini App manifest
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main app page
├── components/                   # React components
│   ├── HomePage.tsx             # Landing page
│   ├── QuizPage.tsx             # Quiz interface
│   ├── ResultPage.tsx           # Results display
│   ├── SuccessCard.tsx          # Certificate component
│   └── ui/                      # UI components
├── data/                        # Static data
│   └── questions.ts             # Question bank
├── lib/                         # Utilities
│   ├── quiz-utils.ts            # Quiz logic
│   └── utils.ts                 # General utilities
└── public/                      # Static assets
```

### Key Components

- **HomePage**: User onboarding and name input
- **QuizPage**: Question display and answer selection
- **ResultPage**: Score display and sharing options
- **SuccessCard**: NFT certificate generation and download

### Adding Questions
Questions are stored in `data/questions.ts`. Each question includes:
```typescript
{
  id: number,
  question: string,
  options: string[],
  correctAnswer: number,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard'
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Digital Ocean Apps
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Add new questions, improve UI, fix bugs
4. **Test thoroughly**: Ensure all features work correctly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes and their benefits

### Contribution Ideas
- Add new questions to expand the knowledge base
- Improve mobile responsiveness
- Add new certificate designs
- Implement user authentication
- Add question categories and filtering
- Create admin panel for question management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Farcaster Team**: For the excellent Mini App SDK
- **Base Team**: For the blockchain infrastructure and tools
- **Vercel**: For the hosting platform
- **Community**: For feedback and contributions

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/John-Mukhwana/BlockchainIQ/issues)
- **Twitter**: [@cypherpulse0](https://twitter.com/cypherpulse0)


---

**Ready to test your blockchain knowledge? 🚀**

[**🎯 Start Quiz Challenge →**](https://blockchain-iq.vercel.app)

---

*Built with ❤️ for the blockchain community*