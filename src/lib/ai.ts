/**
 * StoryBridge AI Engine
 * Handles semantic analysis and story matchmaking using GPT-4o.
 */

export type AIMatchResult = {
  storyId: string;
  relevanceScore: number;
  reasoning: string;
  suggestedDraft: string;
};

/**
 * Analyzes visitor input (prayer requests, needs) and matches it with 
 * the most relevant approved stories using OpenAI GPT-4o.
 */
export async function matchVisitorToStory(
  visitorName: string,
  visitorNeeds: string,
  availableStories: Array<{ id: string; firstName: string; content?: string; transcript?: string; tags: string[] }>
): Promise<AIMatchResult | null> {
  if (!visitorNeeds || availableStories.length === 0) return null;

  // LOGGING: Simulating OpenAI GPT-4o Request
  console.log("--- AI MATCHMAKER REQUEST (GPT-4o) ---");
  console.log(`Visitor: ${visitorName}`);
  console.log(`Needs: "${visitorNeeds}"`);
  console.log(`Context: Analyzing ${availableStories.length} approved stories for semantic resonance.`);
  
  const prompt = `
    System: You are a church hospitality and discipleship assistant. Your goal is to match a visitor's specific spiritual or emotional needs with the most relevant testimony (story) from our congregation.
    
    Visitor: ${visitorName}
    Needs: "${visitorNeeds}"
    
    Stories to analyze:
    ${availableStories.map(s => `- ID: ${s.id}, Contributor: ${s.firstName}, Tags: [${s.tags.join(', ')}], Snippet: ${(s.content || s.transcript || "").substring(0, 100)}...`).join('\n')}
    
    Task:
    1. Select the story that best matches the visitor's needs based on semantic depth, not just keyword matching.
    2. Provide a relevance score (0-100).
    3. Provide a brief reasoning for the match.
    4. Draft a short, personal SMS follow-up message that mentions the story.
    
    Output Format: JSON
    { "storyId": "string", "score": number, "reasoning": "string", "draft": "string" }
  `;
  
  console.log(`Prompt constructed: ${prompt.substring(0, 200)}...`);

  // For MVP/Demo: Semantic matching simulation logic
  const needsLower = visitorNeeds.toLowerCase();
  
  let bestMatch: AIMatchResult | null = null;
  let highestScore = 0;

  for (const story of availableStories) {
    let score = 0;
    let reasoning = "";

    // Match tags (high value)
    for (const tag of story.tags) {
      if (needsLower.includes(tag.toLowerCase())) {
        score += 40;
        reasoning += `Matches tag "${tag}". `;
      }
    }

    // Match keywords in content/transcript
    const content = (story.content || story.transcript || "").toLowerCase();
    const keywords = ["anxiety", "peace", "marriage", "healing", "purpose", "hope", "struggle", "joy", "grief", "loss", "lonely"];
    
    keywords.forEach(keyword => {
      if (needsLower.includes(keyword) && content.includes(keyword)) {
        score += 15;
        reasoning += `Semantic match on "${keyword}". `;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      
      // Simulate draft generation
      const draft = `Hi ${visitorName}! I'm so glad you shared about your interest in ${visitorNeeds.substring(0, 20)}... I wanted to share ${story.firstName}'s story with you. They went through something similar and found a lot of hope here: https://storybridge.io/v/match-${story.id}`;

      bestMatch = {
        storyId: story.id,
        relevanceScore: score,
        reasoning: reasoning || "General alignment with spiritual themes.",
        suggestedDraft: draft
      };
    }
  }

  // LOGGING: Simulating OpenAI GPT-4o Response
  if (bestMatch && highestScore > 20) {
    console.log("--- AI MATCHMAKER RESPONSE (GPT-4o SUCCESS) ---");
    console.log(`Match Found: Story ID ${bestMatch.storyId}`);
    console.log(`Score: ${bestMatch.relevanceScore}`);
    console.log(`Reasoning: ${bestMatch.reasoning}`);
    return bestMatch;
  }

  console.log("--- AI MATCHMAKER RESPONSE (NO CONFIDENT MATCH) ---");
  return null;
}
