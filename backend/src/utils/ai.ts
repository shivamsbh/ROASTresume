import axios from "axios";

// OpenRouter-only implementation
// Env:
// - OPENROUTER_API_KEY: required (https://openrouter.ai/api/v1)
// - AI_BASE_URL: optional override (default https://openrouter.ai/api/v1)
// - AI_MODEL: optional (default deepseek/deepseek-chat:free)
// - OPENROUTER_SITE_URL: optional header for OpenRouter (HTTP-Referer)
// - OPENROUTER_APP_TITLE: optional header for OpenRouter (X-Title)
export async function generateRoast(content: string): Promise<string | undefined> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY in environment");
  }

  const baseURL = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  const model = process.env.AI_MODEL || "deepseek/deepseek-chat-v3-0324:free";

  try {
    const response = await axios.post(
      `${baseURL}/chat/completions`,
      {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a professional roaster and stand-up comic. Your sole task is to roast resumes provided to you. Respond only with humorous and creative roast content relevant to the resume's details. Do not provide explanations, feedback, or any non-roast content. Keep the roast medium-sized so an average person doesn't spend more than a minute reading it. Keep the roast level very high and stick your context to the resume content only.",
          },
          { role: "user", content: "Here is the resume, roast this: " + content },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
          "X-Title": process.env.OPENROUTER_APP_TITLE || "Roast My Resume",
        },
        timeout: 60_000,
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;
    return reply || undefined;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const providerMessage =
        (err.response?.data as any)?.error?.message ||
        (typeof err.response?.data === "string" ? err.response?.data : undefined);

      if (status === 401) {
        throw new Error("OpenRouter authentication failed (401): invalid API key");
      }
      if (status === 402) {
        throw new Error(
          `OpenRouter billing/access issue (402): ${providerMessage || "insufficient credit or model not accessible"}`
        );
      }
      if (status === 404) {
        const currentModel = process.env.AI_MODEL || "deepseek/deepseek-chat:free";
        throw new Error(
          `OpenRouter model not found (404) for '${currentModel}'. Set AI_MODEL in backend/.env to an available model for your key (e.g., 'deepseek/deepseek-chat-v3-0324:free' or 'deepseek/deepseek-chat'). See https://openrouter.ai/api/v1/models`
        );
      }
      throw new Error(
        `OpenRouter API error (${status ?? "network"}): ${providerMessage || err.message}`
      );
    }
    throw err;
  }
}
