# Able Chat Bot

Able is an AI-powered chatbot built using Flask for the backend and React (with Vite) for the frontend. It integrates OpenAI's GPT models for natural language processing and uses BeautifulSoup for web scraping. Tailwind CSS is used for styling, ensuring a modern and responsive UI.

## Features

- **AI-Powered Conversations**: Uses OpenAI's GPT models to generate responses.
- **FAQ Retrieval**: Uses scraped FAQ data from Able's website for context-aware responses.
- **Web Scraping**: Gathers real-time data using BeautifulSoup.
- **Modern UI**: Built with React and Vite for a fast and interactive frontend.
- **Tailwind CSS**: Ensures a sleek and mobile-friendly interface.
- **Flask Backend**: Handles API requests and integrates OpenAI.

## Tech Stack

- **Backend**: Flask (Python) with Flask-CORS
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT models)
- **Web Scraping**: BeautifulSoup
- **Data Storage**: JSON-based FAQ dataset

## Installation

### Prerequisites

- Python 3.8+
- Node.js 16+

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/able-bot.git
cd able-bot/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Run Flask server
flask run --host=127.0.0.1 --port=5000
#or
python backend.py
```

### Frontend Setup

```bash
cd able-bot/frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Usage

Once both backend and frontend are running, you can access the chatbot at `http://localhost:5173/`.

## API Endpoints

- `POST /get-answer` - Accepts a JSON request with a question and returns an AI-generated response using OpenAI's GPT model.

