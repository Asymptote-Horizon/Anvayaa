import os
import requests


def get_llm_response(user_input):
    url = "https://openrouter.ai/api/v1/chat/completions"

    # Read API key from environment
    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        print("ERROR: OPENROUTER_API_KEY is not set.")
        return None

    # System prompt
    prefix = (
        "You are a helpful chatbot for AI powered learning platform Anvaya - "
        "a unified portal for all kinds of specially abled students. "
        "A user is asking you the following. "
        "Reply in plain simple text only. "
        "Do not use markdown symbols like #, *, -, or backticks. "
        "Keep the answer short, clear, and friendly. Emojis are allowed.\n\n"
    )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        # Uncomment after deployment if you want
        # "HTTP-Referer": "https://your-vercel-app.vercel.app",
        "X-OpenRouter-Title": "Anvaya",
    }

    payload = {
        "model": "liquid/lfm-2.5-1.2b-thinking:free",
        "messages": [
            {
                "role": "user",
                "content": prefix + user_input,
            }
        ],
    }

    try:
        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=30,
        )

        print(f"OpenRouter Status: {response.status_code}")

        if not response.ok:
            print("Response Body:")
            print(response.text)
            response.raise_for_status()

        result = response.json()

        if (
            "choices" not in result
            or len(result["choices"]) == 0
            or "message" not in result["choices"][0]
        ):
            print("Unexpected OpenRouter response:")
            print(result)
            return None

        return result["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")

        if hasattr(e, "response") and e.response is not None:
            print("Status Code:", e.response.status_code)
            print("Response Body:")
            print(e.response.text)

        return None

    except Exception as e:
        print("Unexpected Error:", repr(e))
        return None
