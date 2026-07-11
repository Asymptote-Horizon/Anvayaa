import os

import requests
import json


def get_llm_response(user_input):
    url = "https://openrouter.ai/api/v1/chat/completions"

    # Hardcoded API key (as requested)
    api_key = os.getenv("OPENROUTER_API_KEY")

    # Prefix text
    prefix = (
        "You are a helpful chatbot for AI powered learning platform Anvaya- "
        "a unified portal for all kinds of specially abled students. "
        "A user is asking to you the following- "
        "Reply in plain simple text only. "
        "Do not use markdown symbols like #, *, -, or backticks. "
        "Keep the answer short, clear, and friendly. Emojis are allowed. "
    )

    full_input = prefix + user_input

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-OpenRouter-Title": "Anvaya Test App",
    }

    payload = {
        "model": "liquid/lfm-2.5-1.2b-thinking:free",
        "messages": [
            {
                "role": "user",
                "content": full_input,
            }
        ],
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=30)

        # Raise error for bad status codes
        response.raise_for_status()

        result = response.json()

        # Extract model response
        return result["choices"][0]["message"]["content"]

    except Exception:
        print("OpenRouter Error:", repr(e))
        return None
