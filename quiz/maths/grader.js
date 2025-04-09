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
      q1: 'C',     // Sine is positive in 2nd quadrant
      q2: 'C',     // Cosine is positive in 4th quadrant
      q3: 'B',     // All trig ratios positive in 1st quadrant
      q4: 'A',     // Tan is positive in 3rd quadrant
      q5: 'B',     // Cos 60° = 0.5 (positive)
      q6: 'C',     // Cos 120° = -0.5
      q7: 'A',     // Sin 150° = 0.5
      q8: 'B',     // Quadrant II is 90° - 180°
      q9: 'B',     // Tan is positive in Quadrant III
      q10: 'A',    // Cos 90° = 0
      q11: 'B',    // Sin 270° = -1
      q12: 'C',    // Cosine is positive in IV
      q13: 'C',    // Cos is negative in III
      q14: 'C',    // Sin is positive in II
      q15: 'B',    // Cos 360° = 1 (positive)
      q16: 'B',    // Sin 180° = 0
      q17: 'B',    // 135° lies in II
      q18: 'B',    // 225° lies in III
      q19: 'A',    // Sin is positive in II
      q20: 'B',    // Tan is positive in III
      q21: 'C',    // Only tan positive in III
      q22: 'A',    // All positive in I
      q23: 'B',    // Cos is positive in IV
      q24: 'C',    // Tan 225° = 1
      q25: 'B',    // Sin is positive in II
    q26: 'A',   // Cosine is negative in II
    q27: 'C',   // Tan 315° = -1 (lies in IV)
    q28: 'B',   // Sin is negative in IV
    q29: 'C',   // Cos 90° = 0
    q30: 'C',   // All positive in I
    q31: 'A',   // 120° lies in II
    q32: 'C',   // Cosine is positive in IV
    q33: 'C',   // Sine is positive in II
    q34: 'A',   // 300° lies in IV
    q35: 'C',   // Sin 270° = -1
    q36: 'B',   // Cos is negative in II
    q37: 'C',   // Tan is negative in IV
    q38: 'C',   // Cos 180° = -1
    q39: 'B',   // Sine is negative in III
    q40: 'A',   // Tan 135° = -1
    q41: 'C',   // All positive in I
    q42: 'B',   // Cos is positive in IV
    q43: 'C',   // Sin is negative in IV
    q44: 'A',   // Tan is positive in III
    q45: 'C',   // Sin is positive in II
    q46: 'C',   // Cos is negative in II
    q47: 'A',   // 225° lies in III
    q48: 'B',   // Tan 315° = -1
    q49: 'C',   // All positive in I
    q50: 'C'    // Cos is positive in IV
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
});
