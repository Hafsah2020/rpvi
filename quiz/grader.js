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

  // Fetch request to post the data
  fetch('https://script.google.com/macros/s/AKfycbzCuQPqI8KIfI0o1drjKviSvTY2DjbSTW8enNSrUgJeJmDQ9k7WNifWt69MSVzxBV-w/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => {
    // Redirect to another page after the fetch request is completed
    window.location.href = `results.html?name=${encodeURIComponent(name)}&score=${score}&time=${timeTaken}`;
  }).catch((error) => {
    console.error('Error:', error);
  });
});
