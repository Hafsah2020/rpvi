<script>
  // Store the start time when the page loads
  const quizStartTime = Date.now();

  // Wait for form submission
  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Calculate time taken
    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // in seconds

    const form = new FormData(this);
    const name = form.get('name');

    // Define correct answers (update all 20!)
    const correctAnswers = {
      q1: 'Abuja',
      q2: '4',
      // q3: 'CorrectAnswer',
      // ...
    };

    // Calculate score
    let score = 0;
    for (let key in correctAnswers) {
      if (form.get(key) && form.get(key).toLowerCase() === correctAnswers[key].toLowerCase()) {
        score++;
      }
    }

    // Prepare data
    const data = {
      name: name,
      score: score,
      time: timeTaken
    };

    // Send to Google Sheets Web App
    fetch('https://script.google.com/macros/s/AKfycbz_aM2uHHptz4hO50xndOhC_NT83wNQ8ud5gL7bT892LrdUUWfUqeGMXcf_PaiEUUQ_/exec', {
      method: 'POST',
      mode: 'no-cors', // Prevents CORS errors
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Give feedback
    alert(`Thank you, ${name}! You scored ${score}/20 in ${timeTaken} seconds.`);
    this.reset(); // Optional: clear form after submission
  });
</script>
