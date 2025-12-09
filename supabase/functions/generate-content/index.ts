import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, topic, tone, length } = await req.json();
    
    console.log("Generating content (streaming):", { type, topic, tone, length });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompts: Record<string, string> = {
      'blog-post': `You are an expert blog writer. Create engaging, well-structured blog posts with clear headings, compelling introductions, and actionable conclusions. Use markdown formatting.`,
      'marketing-copy': `You are a professional copywriter. Create persuasive marketing copy that drives action, highlights benefits, and connects emotionally with the target audience.`,
      'social-media': `You are a social media expert. Create engaging, shareable social media content that captures attention quickly and encourages engagement.`,
      'email': `You are an email marketing specialist. Create compelling email content with strong subject lines, engaging body copy, and clear calls to action.`,
    };

    const lengthInstructions: Record<string, string> = {
      'short': 'Keep the content concise, around 150-300 words.',
      'medium': 'Create a moderately detailed piece, around 400-600 words.',
      'long': 'Create a comprehensive, detailed piece, around 800-1200 words.',
    };

    const toneInstructions: Record<string, string> = {
      'professional': 'Use a professional, authoritative tone.',
      'casual': 'Use a friendly, conversational tone.',
      'persuasive': 'Use a compelling, persuasive tone that drives action.',
      'informative': 'Use an educational, informative tone.',
    };

    const systemPrompt = systemPrompts[type] || systemPrompts['blog-post'];
    const userPrompt = `Create ${type.replace('-', ' ')} about: "${topic}"

${toneInstructions[tone] || toneInstructions['professional']}
${lengthInstructions[length] || lengthInstructions['medium']}

Make it engaging and valuable for the reader.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    console.log("Streaming response started");

    // Return the stream directly
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error("Error in generate-content function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
