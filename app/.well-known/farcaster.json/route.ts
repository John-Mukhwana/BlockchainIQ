function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;
  
  return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjExOTYwNjAsInR5cGUiOm51bGwsImtleSI6IjB4NWYzMmVFZkQ5ZDhjYjkyNGU4NjU3MDZDQTIyMWFmMEI2ZkVlZUFEQiJ9",
      "payload": "eyJkb21haW4iOiJibG9ja2NoYWluLWlxLnZlcmNlbC5hcHAifQ",
      "signature": "MHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEyYjdhMzY0ODQ4YzE4MWIwMzQ2MTg4YWQwMDE3MmNlZjk3N2NjMjUyMmI2MTY2MjgzNDkxNzA0NzUxYTZlOWY1NWQ0MGNlMDI0ODg5ZDc0YjkzYjNkYzA5ZDk3MTNjODA0ZjU1NmE1MjcyZDg2NWFkOTM1NTc0OTAzNmU4NWRmZTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjVmMTk4MDg2YjJkYjE3MjU2NzMxYmM0NTY2NzNiOTZiY2VmMjNmNTFkMWZiYWNkZDdjNDM3OWVmNjU0NjU1NzJmMWQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOGE3YjIyNzQ3OTcwNjUyMjNhMjI3NzY1NjI2MTc1NzQ2ODZlMmU2NzY1NzQyMjJjMjI2MzY4NjE2YzZjNjU2ZTY3NjUyMjNhMjIzNTZhNDgzNDRmMzE1MTM4NTA2NTQ4NGYzNTc0NmI3MDVmNjQ1MjMzNWE3MTUzNmM2MzZiNmY2NzUyMzA0NDMxNzM3MzYyNDE1MTU3NzQ0MzQxNWY2MzIyMmMyMjZmNzI2OTY3Njk2ZTIyM2EyMjY4NzQ3NDcwNzMzYTJmMmY2YjY1Nzk3MzJlNjM2ZjY5NmU2MjYxNzM2NTJlNjM2ZjZkMjIyYzIyNjM3MjZmNzM3MzRmNzI2OTY3Njk2ZTIyM2E2NjYxNmM3MzY1N2QwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA"
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
      "description": "Ultimate blockchain and cryptocurrency quiz platform. Test your knowledge with 15 randomized questions from 80 plus topics and earn your exclusive certificate",
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
      "ogDescription": "Challenge yourself with randomized blockchain questions and earn your certificate",
      "ogImageUrl": `${URL}/og-image.png`,
      "noindex": false
    }
  });
}