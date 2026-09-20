const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends a headline to the backend for verification.
 * Only ever reads `prediction` and `confidence` off the response —
 * any other fields the API might return are ignored.
 *
 * @param {string} title
 * @returns {Promise<{ prediction: "TRUE" | "FAKE", confidence: number }>}
 */
export async function verifyNews(title) {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL is not set. Add it to a .env file before running the app."
    );
  }

  let response;
  try {
    response = await fetch(`${API_URL}/news/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  } catch (networkError) {
    throw new Error("NETWORK_ERROR");
  }

  if (!response.ok) {
    throw new Error("API_ERROR");
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error("INVALID_RESPONSE");
  }

  const prediction = data?.prediction;
  const confidence = data?.confidence;

  const isValidPrediction = prediction === "TRUE" || prediction === "FAKE";
  const isValidConfidence = typeof confidence === "number" && !Number.isNaN(confidence);

  if (!isValidPrediction || !isValidConfidence) {
    throw new Error("INVALID_RESPONSE");
  }

  return { prediction, confidence };
}
