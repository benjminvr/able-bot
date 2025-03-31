export const fetchChatbotResponse = async (userInput) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });
  
      if (!response.ok) throw new Error("Failed to fetch response");
  
      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, I'm having trouble right now.";
    }
  };
  