// ✅ Dummy Quiz Questions
const questions = [
    { question: "What is 2 + 2?", options: ["2", "3", "4", "5"], correct: "4" },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Mars", "Mercury", "Venus"], correct: "Mercury" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Mark Twain", "Harper Lee", "Ernest Hemingway", "J.K. Rowling"], correct: "Harper Lee" }
];

let currentQuestionIndex = 0;
const studentAnswers = {};

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
        }

        optionsDiv.appendChild(button);
    });

    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
    document.getElementById("next-btn").textContent = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

// ✅ Function to Select an Answer
function selectAnswer(answer) {
    studentAnswers[currentQuestionIndex] = answer;
    loadQuestion(); // Reload question to show selection
}

// ✅ Next Question
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        document.getElementById("submit-btn").style.display = "block";
    }
});

// ✅ Previous Question
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

// ✅ Submit Answers (Just Logs to Console for Now)
document.getElementById("submit-btn").addEventListener("click", () => {
    console.log("Student Answers:", studentAnswers);
    document.getElementById("status-message").textContent = "✅ Answers saved (not stored in a database).";
});

// ✅ Load First Question
loadQuestion();