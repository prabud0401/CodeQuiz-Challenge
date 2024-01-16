document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const questionsContainer = document.getElementById("questions");
    const choicesContainer = document.getElementById("choices");
    const feedbackContainer = document.getElementById("feedback");
    const timerElement = document.getElementById("time");
    let currentIndex = 0;
    let timeLeft = 60;
    let timerInterval;
    let userScore = 0;
  
    function startQuiz() {
      startButton.classList.add("hide");
      questionsContainer.classList.remove("hide");
      displayQuestion();
      startTimer();
    }
  
    function displayQuestion() {
      const currentQuestion = questions[currentIndex];
      document.getElementById("question-title").textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";
  
      currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => checkAnswer(choice, currentQuestion.correctAnswer));
        choicesContainer.appendChild(choiceButton);
      });
    }
  
    function checkAnswer(userAnswer, correctAnswer) {
      if (userAnswer === correctAnswer) {
        feedbackContainer.textContent = "Correct!";
        userScore += 10;
      } else {
        feedbackContainer.textContent = "Incorrect!";
        timeLeft -= 10;
      }
  
      currentIndex++;
      if (currentIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  
    function startTimer() {
      timerInterval = setInterval(() => {
        timerElement.textContent = timeLeft;
        timeLeft--;
  
        if (timeLeft < 0) {
          clearInterval(timerInterval);
          endQuiz();
        }
      }, 1000);
    }
  
    function endQuiz() {
      questionsContainer.classList.add("hide");
      document.getElementById("end-screen").classList.remove("hide");
      document.getElementById("final-score").textContent = userScore;
      clearInterval(timerInterval);
    }
  
    document.getElementById("submit").addEventListener("click", saveScore);
  
    function saveScore() {
      const initialsInput = document.getElementById("initials").value;
  
      if (initialsInput !== "") {
        const newScore = { initials: initialsInput, score: userScore };
  
        
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newScore),
        })
          .then((response) => response.json())
          .then((data) => {
            
            console.log("Score saved:", data);
            
            window.location.href = "../../highscores.html";
          })
          .catch((error) => {
            console.error("Error saving score:", error);
          });
      } else {
        alert("Please enter your initials.");
      }
    }
  
    startButton.addEventListener("click", startQuiz);
  });
  