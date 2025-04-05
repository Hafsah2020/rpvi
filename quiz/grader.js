let time = 0;
const timerEl = document.getElementById('timer');

const timer = setInterval(() => {
  time++;
  timerEl.textContent = `Time: ${time}s`;
}, 1000);

document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();
  clearInterval(timer);

  const form = new FormData(this);
  const name = form.get('name');

  const correctAnswers = {
    q1: 'Abuja',
    // ... fill in for q2 - q20
  };

  let score = 0;
  for (let key in correctAnswers) {
    if (form.get(key) === correctAnswers[key]) {
      score++;
    }
  }

  const payload = {
    name,
    score,
    time
  };

  fetch('https://script.google.com/macros/s/AKfycbz_aM2uHHptz4hO50xndOhC_NT83wNQ8ud5gL7bT892LrdUUWfUqeGMXcf_PaiEUUQ_/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  alert(`Submitted! You scored ${score}/20 in ${time} seconds.`);
});
