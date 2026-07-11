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
        "model": "nvidia/nemotron-3-ultra-550b-a55b:free",
        "messages": [
            {
                "role": "user",
                "content": full_input,
            }
        ],
    }

    try:
        response = requests.post(
        url,
        headers=headers,
        json=payload,   # <-- use json= instead of data=json.dumps()
        timeout=30
    )

        if not response.ok:
        print("Status Code:", response.status_code)
        print("Response Body:", response.text)

        response.raise_for_status()

        result = response.json()
        return result["choices"][0]["message"]["content"]

    except Exception as e:
    print("OpenRouter Error:", repr(e))
    return None
