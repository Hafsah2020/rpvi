  // Record quiz start time
  const quizStartTime = Date.now();

  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // in seconds

    const form = new FormData(this);
    const name = form.get('name');

    // ✅ Correct answers list (update for all your 20 questions)
    const correctAnswers = {
      q1: 'Abuja',
      q2: '4',
      // Add more: q3: 'Answer3', q4: 'Answer4', ..., q20: 'Answer20'
    };

    let score = 0;
    for (let key in correctAnswers) {
      if (form.get(key) === correctAnswers[key]) {
        score++;
      }
    }

    const data = {
      name: name,
      score: score,
      time: timeTaken
    };

    // 🌐 Send data to Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbz_aM2uHHptz4hO50xndOhC_NT83wNQ8ud5gL7bT892LrdUUWfUqeGMXcf_PaiEUUQ_/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // ✅ Feedback to user
    alert(`Thank you ${name}! You scored ${score}/20 in ${timeTaken} seconds.`);
  });

