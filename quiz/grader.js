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
        q1: '7',
        q2: '53',
        q3: '234',
        q4: '14',
        q5: '100000',
        q6: '3',
        q7: '3',
        q8: '32',
        q9: '3',
        q10: '-3',
        q11: '128',
        q12: '729',
        q13: '1/25',
        q14: '1',
        q15: '27',
        q16: '1/2',
        q17: '1/3',
        q18: '2/5',
        q19: '1/6',
        q20: '1/13',
          q21: '11/8',  // 3/4 + 5/8 = 6/8 + 5/8 = 11/8
          q22: '1/9',   // 7/9 - 2/3 = 7/9 - 6/9 = 1/9
          q23: '40',    // (5/8) × 64 = 40
          q24: '6/5',   // (3/4) × (8/5) = 24/20 = 6/5
          q25: '0.7',   // 7/10 = 0.7
          q26: '3/4',   // 0.75 = 3/4
          q27: '0.24',  // 0.6 × 0.4 = 0.24
          q28: '9/16',  // Assuming the intended value is 0.5625 (which is 9/16)
          q29: '0.5',   // 0.2 + 0.3 = 0.5
          q30: '2.5',   // 0.5 ÷ 0.2 = 2.5
          q31: '30',    // 20% of 150 = 30
          q32: '230',   // 200 increased by 15% = 200 + 30 = 230
          q33: '20%',   // Percentage change from 50 to 60 = ((60-50)/50)*100% = 20%
          q34: '300',   // 75% of 400 = 300
          q35: '2^2',   // (2^5 × 2^3) ÷ 2^6 = 2^(5+3-6) = 2^2
          q36: '5/6',   // (2/3) × (5/4) = 10/12 = 5/6 (Note: None of the provided options match 5/6)
          q37: '17/8',  // 2.125 = 17/8
          q38: '144',   // 2^4 × 3^2 = 16 × 9 = 144
          q39: '3',     // log₅ 125 = 3
          q40: '20'  ,   // 2.5% of 800 = 0.025 × 800 = 20
            q41: '1/2',
            q42: '7/6',
            q43: '30',
            q44: '11',
            q45: '1/2',
            q46: '128',
            q47: '4',
            q48: '1/9',
            q49: '3/13',
            q50: '7/10',
            q51: '50',
            q52: '0.6',
            q53: '1',
            q54: '80%',
            q55: '3',
            q56: '2^8',
            q57: '1/8',
            q58: '0.75',
            q59: '27',
            q60: '20',
            q61: '1/2',
q62: '2',
q63: '3',
q64: '2.5 × 10<sup>1</sup>',
q65: '0.625',
q66: '15/24',
q67: '1/125',
q68: '20%',
q69: '0',
q70: '1/2',
q71: '7/6',
q72: '1',
q73: '1/6',
q74: '5 × 10<sup>1</sup>',
q75: '25',
q76: '81',
q77: '1/2',
q78: '3',
q79: '2',
q80: '32',
q81: '3',
q82: '3<sup>3</sup>',
q83: '4<sup>-1</sup>',
q84: '2',
q85: '2/10',
q86: '4',
q87: '6',
q88: '2/3',
q89: '5 × 10<sup>-1</sup>',
q90: '1',
q91: '10',
q92: '3/5',
q93: '7',
q94: '2',
q95: '5',
q96: '4',
q97: '2 × 10<sup>3</sup>',
q98: '3/2',
q99: '3 × 10<sup>-2</sup>',
q100: '8'
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
