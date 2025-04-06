document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let startTime = performance.timing.navigationStart;
  let endTime = new Date().getTime();
  let timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds

  const form = new FormData(this);
  const name = form.get('name');

  const correctAnswers = {
    q1: 'Abuja',
    q2: '4',
    // Add more like: q3: 'Answer', q4: 'Answer', ...
  };

  let score = 0;
  for (let q in correctAnswers) {
    if (form.get(q) === correctAnswers[q]) {
      score++;
    }
  }

  const data = {
    name: name,
    score: score,
    time: timeTaken
  };

  fetch('https://script.google.com/macros/s/AKfycbz_aM2uHHptz4hO50xndOhC_NT83wNQ8ud5gL7bT892LrdUUWfUqeGMXcf_PaiEUUQ_/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  alert(`Submitted! You scored ${score}/20 in ${timeTaken} seconds.`);
});