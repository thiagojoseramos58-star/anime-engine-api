export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_output_tokens: 500
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.output_text || "Sem resposta",
      debug: data
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro na API",
      details: error.message
    });
  }
}
