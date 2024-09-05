document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const button = document.getElementById('new-quote');

    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Get busy living or get busy dying.", author: "Stephen King" },
        { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" }
    ];

    const fetchQuoteFromAPI = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            return { text: data.content, author: data.author };
        } catch (error) {
            console.error('Error fetching quote:', error);
            return null;
        }
    };

    const getRandomQuote = async () => {
        if (Math.random() > 0.5) {
            // Fetch quote from API 50% of the time
            const apiQuote = await fetchQuoteFromAPI();
            if (apiQuote) {
                return apiQuote;
            }
        }
        // Otherwise, return a random quote from the local array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    const displayQuote = async () => {
        const { text, author } = await getRandomQuote();
        quoteElement.textContent = `"${text}"`;
        authorElement.textContent = `- ${author}`;
    };

    button.addEventListener('click', displayQuote);

    // Display an initial quote
    displayQuote();
});
