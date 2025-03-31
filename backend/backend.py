from flask_cors import CORS
from openai import OpenAI
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import json
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

CORS(app, resources={
     r"/get-answer": {"origins": "http://localhost:5173", "supports_credentials": True}})

# Load the FAQ data (scraped from Able's website)
faq_file_path = os.path.join(os.path.dirname(
    __file__), "../data/able_faqs.json")
try:
    with open(faq_file_path, "r", encoding="utf-8") as f:
        faqs = json.load(f)
        if not faqs:
            print("FAQ file is empty.")
except FileNotFoundError:
    print(f"FAQ data file not found at {faq_file_path}!")
    faqs = []
except json.JSONDecodeError:
    print("Failed to parse FAQ data!")
    faqs = []

# Convert the scraped FAQ content into a format suitable for LLM context
def retrieve_relevant_faqs(user_question):
    # Dummy implementation; we could compute embeddings and perform a similarity search, etc.
    return [f"Q: {faq['question']}\nA: {faq['answer']}" for faq in faqs]


def get_llm_response(user_question):
    """Generate a response using a refined prompt with retrieval and few-shot examples."""
    try:
        if not faqs:
            return "Sorry, no FAQ data available to generate an answer."

        # Retrieve sample FAQ snippets
        relevant_faqs = retrieve_relevant_faqs(user_question)
        retrieved_context = "\n".join(relevant_faqs)

        prompt = (
            "You are a knowledgeable and conversational assistant focused only on the company Able. "
            "Answer questions with clear, concise, and professional responses, ensuring the information is relevant to Able. "
            "If a user asks about something unrelated, politely steer the conversation back to Able. "
            "Use **bold**, *italic*, numbered or bulleted lists, and proper formatting where appropriate to make the answers easy to read. "
            "If the user asks about the founder, provide information about the CEO instead, without mentioning the founder. "
            "Always answer confidently and directly, providing the most relevant and accurate information. "
            "Do not mention anything about the availability of information, nor indicate that certain details are missing. "
            "Stay focused on what you know and always provide fact-based answers using only the available FAQ information. "
            "Never speculate or introduce information not found in the provided content. "
            "Use markdown style to enhance clarity."
            "Relevant Information:\n"
            f"{retrieved_context}\n\n"
            f"Now answer this question clearly and concisely, using only the available information:\nQ: {user_question}\n"
        )
               
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo", 
            store=True,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        answer = completion.choices[0].message.content.strip()
        return answer
    except Exception as e:
        return f"Error generating response: {str(e)}"


@app.route("/get-answer", methods=["POST"])
def get_chatbot_answer():
    data = request.get_json()
    user_question = data.get("question")

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    answer = get_llm_response(user_question)

    if not answer:
        return jsonify({"error": "No answer found"}), 400

    response = jsonify({"answer": answer})

    return response


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
