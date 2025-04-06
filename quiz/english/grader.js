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
      q1: 'Abuja',
      q2: '4',
      q3: '1',
      q4: '32',
      q5: '4',
      q6: '2',
      q7: '7',
      q8: '0.75',
      q9: '64',
      q10: '1/2',
      q11: '100',
      q12: '1000',
      q13: '16',
      q14: '35',
      q15: '0.25',
      q16: '16',
      q17: '2',
      q18: '45',
      q19: '50',
      q20: '3',
      q21: '0.5',
      q22: '50',
      q23: '35',
      q24: '64',
      q25: '9',
      q26: '4',
      q27: '0.2',
      q28: '45',
      q29: '128',
      q30: '128',
      q31: '16',
      q32: '16',
      q33: '5',
      q34: '1/4',
      q35: '2',
      q36: '9',
      q37: '2/3',
      q38: '16',
      q39: '1/2',
      q40: '0.75',
      q41: '32',
      q42: '50',
      q43: '2',
      q44: '3',
      q45: '21',
      q46: '128',
      q47: '0.875',
      q48: '144',
      q49: '60',
      q50: '1/2'
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
