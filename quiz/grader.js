let time = 0;
const timerEl = document.getElementById('timer');

// Start timer
const timer = setInterval(() => {
  time++;
  timerEl.textContent = `Time: ${time}s`;
}, 1000);

// Handle form submission
document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();
  clearInterval(timer); // stop timer

  const form = new FormData(this);
  const name = form.get('name');

  // ✅ Correct answers
  const correctAnswers = {
    q1: 'Abuja',
    q2: '4',
    // Add q3 - q20 here
  };

  let score = 0;
  for (let q in correctAnswers) {
    const answer = form.get(q);
    if (answer && answer.toLowerCase() === correctAnswers[q].toLowerCase()) {
      score++;
    }
  }

  const data = {
    name,
    score,
    time
  };

  // ✅ Replace with your actual deployed Apps Script Web App URL
  fetch('https://script.google.com/macros/s/AKfycbz_aM2uHHptz4hO50xndOhC_NT83wNQ8ud5gL7bT892LrdUUWfUqeGMXcf_PaiEUUQ_/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  alert(`Thank you, ${name}! You scored ${score}/20 in ${time} seconds.`);
  this.reset(); // optional
});
