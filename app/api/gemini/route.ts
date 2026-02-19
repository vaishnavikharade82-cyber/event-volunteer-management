export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `Write a professional event description for: ${prompt}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500 }
      );
    }

    const text = data.choices?.[0]?.message?.content || "No response";

    return new Response(JSON.stringify({ text }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}