'use client';

import { useRef, useState } from 'react';
import { Download, Trophy, Award, Sparkles, Gem, Crown, Share2, Copy } from 'lucide-react';
import { sdk } from '@farcaster/miniapp-sdk';

interface SuccessCardProps {
  userName: string;
  score: number;
}

export default function SuccessCard({ userName, score }: SuccessCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');

  const generateCertificateImage = async (): Promise<string | null> => {
    if (!cardRef.current) return;

    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size for NFT-style certificate
      canvas.width = 1000;
      canvas.height = 1000;

      // Create complex NFT-style gradient background
      const gradient = ctx.createRadialGradient(500, 500, 0, 500, 500, 500);
      gradient.addColorStop(0, '#1a1a2e'); // Dark center
      gradient.addColorStop(0.3, '#16213e'); // Dark blue
      gradient.addColorStop(0.6, '#0f3460'); // Medium blue
      gradient.addColorStop(0.8, '#22c55e'); // Primary green
      gradient.addColorStop(1, '#4ade80'); // Light green
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add geometric NFT-style patterns
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.3;
      
      // Draw hexagonal pattern
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const x = 100 + i * 100;
          const y = 100 + j * 100;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const angle = (k * Math.PI) / 3;
            const px = x + 30 * Math.cos(angle);
            const py = y + 30 * Math.sin(angle);
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      
      ctx.globalAlpha = 1;

      // Add main decorative border with glow effect
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 12;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 20;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
      
      // Inner border
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.strokeRect(90, 90, canvas.width - 180, canvas.height - 180);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Set text properties
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';

      // Main Title with glow
      ctx.font = 'bold 64px Arial';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 15;
      ctx.fillText('BlockchainIQ', canvas.width / 2, 200);
      
      // Subtitle
      ctx.font = 'bold 36px Arial';
      ctx.shadowBlur = 8;
      ctx.fillText('NFT CERTIFICATE', canvas.width / 2, 260);
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Achievement badge
      ctx.font = '28px Arial';
      ctx.fillText('🏆 BLOCKCHAIN EXPERT 🏆', canvas.width / 2, 340);

      // Name
      ctx.font = 'bold 48px Arial';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fillText(userName, canvas.width / 2, 420);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Achievement text
      ctx.font = '24px Arial';
      ctx.fillText('has mastered advanced blockchain concepts', canvas.width / 2, 480);
      ctx.fillText('and demonstrated exceptional crypto knowledge', canvas.width / 2, 520);

      // Score
      ctx.font = 'bold 72px Arial';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 15;
      ctx.fillText(`${score}%`, canvas.width / 2, 620);
      
      ctx.font = 'bold 32px Arial';
      ctx.shadowBlur = 8;
      ctx.fillText('MASTERY ACHIEVED', canvas.width / 2, 670);
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Date
      ctx.font = '20px Arial';
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      ctx.fillText(`Certified on ${today}`, canvas.width / 2, 750);

      // Unique ID
      const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();
      ctx.font = '16px Arial';
      ctx.fillText(`Certificate ID: BIQ-${uniqueId}`, canvas.width / 2, 800);
      
      // Footer
      ctx.font = 'bold 24px Arial';
      ctx.fillText('BlockchainIQ', canvas.width / 2, 880);
      
      // Add decorative elements
      ctx.font = '40px Arial';
      ctx.fillText('⚡', 200, 200);
      ctx.fillText('🚀', canvas.width - 200, 200);
      ctx.fillText('💎', 200, canvas.width - 200);
      ctx.fillText('🎯', canvas.width - 200, canvas.width - 200);

      // Return data URL for further processing
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generating NFT certificate:', error);
      return null;
    }
  };

  const downloadAsImage = async () => {
    setDownloadStatus('generating');
    
    try {
      const dataURL = await generateCertificateImage();
      if (!dataURL) {
        setDownloadStatus('error');
        return;
      }

      // Check if we're in a MiniApp context
      try {
        const context = await sdk.context;
        
        if (context && typeof window !== 'undefined') {
          // We're in a MiniApp - use alternative methods
          
          // Method 1: Try Web Share API (works on mobile)
          if (navigator.share) {
            try {
              // Convert data URL to blob for sharing
              const response = await fetch(dataURL);
              const blob = await response.blob();
              const file = new File([blob], `BlockchainIQ_Certificate_${userName.replace(/\s+/g, '_')}.png`, { 
                type: 'image/png' 
              });
              
              await navigator.share({
                title: 'My BlockchainIQ Certificate',
                text: `I scored ${score}% on BlockchainIQ! 🏆`,
                files: [file]
              });
              
              setDownloadStatus('success');
              return;
            } catch (shareError) {
              console.log('Share failed, trying alternative methods');
            }
          }

          // Method 2: Copy to clipboard
          if (navigator.clipboard && navigator.clipboard.write) {
            try {
              const response = await fetch(dataURL);
              const blob = await response.blob();
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              
              alert('✅ Certificate copied to clipboard! You can paste it in any app.');
              setDownloadStatus('success');
              return;
            } catch (clipboardError) {
              console.log('Clipboard failed, using fallback');
            }
          }

          // Method 3: Open in new window/tab
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head><title>BlockchainIQ Certificate</title></head>
                <body style="margin:0;padding:20px;background:#000;text-align:center;">
                  <img src="${dataURL}" style="max-width:100%;height:auto;border-radius:10px;" />
                  <p style="color:white;margin-top:20px;">Long press the image to save it to your device</p>
                </body>
              </html>
            `);
            newWindow.document.close();
            setDownloadStatus('success');
            return;
          }
        }
      } catch (miniAppError) {
        console.log('Not in MiniApp context, using traditional download');
      }

      // Fallback: Traditional download (for regular browsers)
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BlockchainIQ-Certificate-${userName.replace(/\s+/g, '_')}-${score}%.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadStatus('success');
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
    }
    
    // Reset status after 3 seconds
    setTimeout(() => setDownloadStatus('idle'), 3000);
  };

  const shareText = async () => {
    try {
      const shareData = {
        title: 'BlockchainIQ Certificate',
        text: `🏆 I just scored ${score}% on BlockchainIQ! Test your blockchain knowledge: `,
        url: window.location.origin
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const text = `${shareData.text}${shareData.url}`;
        await navigator.clipboard.writeText(text);
        alert('✅ Share text copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="relative">
      {/* Downloadable Card */}
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-primary-500 p-8 rounded-3xl shadow-2xl text-white text-center relative overflow-hidden border-4 border-primary-400"
      >
        {/* NFT-style Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary-300 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-2 border-accent-300 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-4 left-8 w-8 h-8 border-2 border-primary-300 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-8 right-4 w-20 h-20 border-2 border-accent-300 rounded-full animate-pulse delay-300"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary-400 transform rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-accent-400 transform rotate-45 animate-spin" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-white transform rotate-45 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/6 w-5 h-5 bg-primary-300 transform rotate-45 animate-bounce delay-150"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-2xl shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              BlockchainIQ
            </h2>
            <div className="p-3 bg-gradient-to-r from-accent-400 to-primary-400 rounded-2xl shadow-lg">
              <Gem className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Certificate Title */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-300 animate-pulse" />
              <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-primary-300 animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
              NFT CERTIFICATE
            </h3>
            <p className="text-xl font-semibold text-primary-200">🏆 BLOCKCHAIN EXPERT 🏆</p>
          </div>

          {/* Name */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent drop-shadow-lg">
              {userName}
            </h1>
            <div className="w-48 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full shadow-lg"></div>
          </div>

          {/* Achievement */}
          <div className="mb-6">
            <p className="text-lg mb-4 text-primary-100">has mastered advanced blockchain concepts with</p>
            <div className="relative mb-4">
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-accent-300 via-white to-primary-300 bg-clip-text text-transparent drop-shadow-2xl">
                {score}%
              </div>
              <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-white/10 blur-sm">
                {score}%
              </div>
            </div>
            <p className="text-xl font-semibold text-accent-200">MASTERY ACHIEVED</p>
          </div>

          {/* Date */}
          <div className="text-primary-200 mb-4">
            <p>{new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="text-sm mt-1">Certificate ID: BIQ-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>

          {/* Congratulatory Message */}
          <div className="mt-6 p-6 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-2xl border border-primary-400/50 backdrop-blur-sm">
            <p className="text-xl font-bold">🎉 Outstanding Achievement! 🎉</p>
            <p className="text-lg mt-2">⚡ Blockchain Expert Certified 💎</p>
          </div>
        </div>
      </div>

      {/* Download & Share Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={downloadAsImage}
          disabled={downloadStatus === 'generating'}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
            downloadStatus === 'generating'
              ? 'bg-gray-400 cursor-not-allowed'
              : downloadStatus === 'success'
              ? 'bg-green-500 hover:bg-green-600'
              : downloadStatus === 'error'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700'
          } text-white`}
        >
          {downloadStatus === 'generating' ? (
            <>
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : downloadStatus === 'success' ? (
            <>
              <Trophy className="w-5 h-5" />
              Saved!
            </>
          ) : downloadStatus === 'error' ? (
            <>
              <Download className="w-5 h-5" />
              Try Again
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Save Certificate
            </>
          )}
        </button>
        
        <button
          onClick={shareText}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <Share2 className="w-5 h-5" />
          Share Achievement
        </button>
      </div>
      
      {/* Help Text for MiniApp Users */}
      <div className="text-center mt-4 text-sm text-gray-600">
        <p>📱 On mobile? Try long-pressing the image above to save it!</p>
      </div>
    </div>
  );
}