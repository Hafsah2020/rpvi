window.addEventListener('load', function () {
  let startTime = new Date().getTime(); // Start time when the page loads
  let timerInterval; // Variable to store the timer interval

  // Function to update the timer display
  function updateTimer() {
    let currentTime = new Date().getTime();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    // Format time in minutes:seconds
    document.getElementById('timer').textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Start the timer as soon as the page loads
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second

  // When the form is submitted, stop the timer
  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Calculate total time taken when quiz is submitted
    const endTime = new Date().getTime();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // time in seconds

    const form = new FormData(this);
    const name = form.get('name');

    const correctAnswers = {
      q1: '2 m',
      q2: '200 m/s',
      q3: '4 m',
      q4: '20 Hz',
      q5: '2 m',
      q6: '0.005 s',
      q7: 'Mechanical wave',
      q8: 'Particles move perpendicular to wave direction',
      q9: 'Light wave',
      q10: 'Amplitude',
      q11: '5 m',
      q12: '4 Hz',
      q13: '340 m/s',
      q14: '3 m',
      q15: '100 Hz',
      q16: '300 m/s',
      q17: 'Hertz',
      q18: 'Electromagnetic',
      q19: 'Amplitude',
      q20: 'Sound wave',
      q21: '0.02 m',
      q22: '20 Hz',
      q23: '0.5 m',
      q24: '12 rad/s',
      q25: 'Negative x-direction',
      q26: '2 m/s',
      q27: '3 rad/m',
      q28: '0.1 s',
      q29: '0.5 m/s',
      q30: '2 m/s',
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

    // Stop the timer when the quiz is submitted
    clearInterval(timerInterval);

    // Fetch request to post the data
    fetch('https://script.google.com/macros/s/AKfycbwanIUIjmsosfOivdSc0ckboS_ATITSWY-gTbHUMnmaYEKlYuE0NGS3Wy-C0uEOlbkvFA/exec', {
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
});
