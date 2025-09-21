function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://your-domain.com';
  
  return Response.json({
    "accountAssociation": {
      "header": "",
      "payload": "",
      "signature": ""
    },
    "baseBuilder": {
      "allowedAddresses": ["0x5f32eEfD9d8cb924e865706CA221af0B6fEeeADB"] // Add your Base Account address here
    },
    "miniapp": {
      "version": "1",
      "name": "BlockchainIQ",
      "homeUrl": URL,
      "iconUrl": `${URL}/icon.png`,
      "splashImageUrl": `${URL}/splash.png`,
      "splashBackgroundColor": "#22c55e",
      "webhookUrl": `${URL}/api/webhook`,
      "subtitle": "Master crypto knowledge",
      "description": "Ultimate blockchain and cryptocurrency quiz platform. Test your knowledge with 15 randomized questions from 80+ topics and earn your exclusive NFT-style certificate!",
      "screenshotUrls": [
        `${URL}/screenshot1.png`,
        `${URL}/screenshot2.png`,
        `${URL}/screenshot3.png`
      ],
      "primaryCategory": "education",
      "tags": ["blockchain", "cryptocurrency", "quiz", "education", "nft"],
      "heroImageUrl": `${URL}/hero.png`,
      "tagline": "Test your blockchain expertise",
      "ogTitle": "BlockchainIQ Quiz Platform",
      "ogDescription": "Challenge yourself with randomized blockchain questions and earn your NFT certificate!",
      "ogImageUrl": `${URL}/og-image.png`,
      "buttonTitle": "Start Quiz Challenge", // Added: Missing button title
      "noindex": false
      "castShareUrl": `${URL}/share` // Added: Share URL for cast sharing
    }
  });
}