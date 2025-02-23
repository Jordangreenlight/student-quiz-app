// ✅ Dummy Quiz Questions
const questions = [
    { question: "What is 2 + 2?", options: ["2", "3", "4", "5"], correct: "4" },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Mars", "Mercury", "Venus"], correct: "Mercury" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Mark Twain", "Harper Lee", "Ernest Hemingway", "J.K. Rowling"], correct: "Harper Lee" }
];

let currentQuestionIndex = 0;
const studentAnswers = {};  // Stores answers
const confidenceRatings = {}; // Stores confidence ratings

// ✅ Function to Load a Question
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = questionData.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // Clear previous options

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        button.classList.add("option-btn");

        // Highlight selected answer if exists
        if (studentAnswers[currentQuestionIndex] === option) {
            button.style.backgroundColor = "lightblue";
            document.getElementById("confidence-container").style.display = "block"; // Show confidence rating
        }

        optionsDiv.appendChild(button);
    });

    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
    document.getElementById("next-btn").textContent = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";

    loadConfidenceRating();
}

// ✅ Function to Select an Answer
function selectAnswer(answer) {
    studentAnswers[currentQuestionIndex] = answer;
    document.getElementById("confidence-container").style.display = "block"; // Show confidence rating after answer selection
    loadQuestion();
}

// ✅ Function to Load Confidence Rating UI
function loadConfidenceRating() {
    const starsContainer = document.getElementById("stars");
    starsContainer.innerHTML = ""; // Clear existing stars

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.classList.add("star");

        // Highlight stars if selected
        if (confidenceRatings[currentQuestionIndex] >= i) {
            star.classList.add("selected");
        }

        // Click event for selecting confidence
        star.onclick = () => setConfidence(i);

        starsContainer.appendChild(star);
    }
}

// ✅ Function to Set Confidence Rating
function setConfidence(level) {
    confidenceRatings[currentQuestionIndex] = level;
    loadConfidenceRating(); // Update UI
}

// ✅ Next Question
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        document.getElementById("confidence-container").style.display = "none"; // Hide until next answer
        loadQuestion();
    } else {
        document.getElementById("submit-btn").style.display = "block";
    }
});

// ✅ Previous Question
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        document.getElementById("confidence-container").style.display = "none"; // Hide until answer selected
        loadQuestion();
    }
});

// ✅ Submit Answers (Logs to Console for Now)
document.getElementById("submit-btn").addEventListener("click", () => {
    console.log("Student Answers:", studentAnswers);
    console.log("Confidence Ratings:", confidenceRatings);
    document.getElementById("status-message").textContent = "✅ Answers & Confidence Ratings saved (not stored in a database).";
});

// ✅ Load First Question
loadQuestion();