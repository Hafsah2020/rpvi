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

    answers = {
      q1: "B",  // Lekki, Lagos
      q2: "B",  // Mr. Bepo
      q3: "C",  // Headmaster
      q4: "B",  // He humorously imitated characters from "The Village Headmaster"
      q5: "D",  // All of the above
      q6 : "A",  // Ikogosi Warm Springs
      q7: "B",  //Idumota Market
      q8: "C",  // By engaging in dialogue and demonstrating the benefits of his reforms
      q9: "C",  // Skeptical and resistant to change
      q10: "C",  // Progressive educational reforms and dedication
    q11: "C",  // is
    q12: "A",  // was
    q13: "D",  // is
    q14: "C",  // is
    q15: "C",  // has
    q16: "B",  // She ran fast and he walked slowly.
    q17: "C",  // He jumped.
    q18: "C",  // Complex
    q19: "B",  // Who is at the door?
    q20: "A",  // Please close the door.
    q21: "B",  // start
    q22: "B",  // selfish
    q23: "B",  // old
    q24: "B",  // departure
    q25: "A"   // joyful
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
