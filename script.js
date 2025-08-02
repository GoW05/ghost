document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('ghost-form');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const body = document.body;
    const submitBtn = quizForm.querySelector('button[type="submit"]');
    const totalQuestions = 6;

    // Spooky song list and index tracker
    const spookySongs = [
        'spooky1.mp3',
        'spooky2.mp3',
        'spooky3.mp3'
    ];
    let currentSongIndex = 0;
    let spookyAudio = null;

    // Disable submit initially
    submitBtn.disabled = true;

    // Enable submit only if all questions are answered
    const checkAllAnswered = () => {
        let answeredCount = 0;
        for (let i = 1; i <= totalQuestions; i++) {
            const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
            if (selected) answeredCount++;
        }
        submitBtn.disabled = answeredCount !== totalQuestions;
    };

    quizForm.addEventListener('change', checkAllAnswered);

    const handleSubmit = (e) => {
        e.preventDefault();

        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        body.classList.add('grayscale');

        // Cycle through songs
        const songToPlay = spookySongs[currentSongIndex];
        currentSongIndex = (currentSongIndex + 1) % spookySongs.length;

        if (spookyAudio) {
            spookyAudio.pause();
            spookyAudio.currentTime = 0;
        }

        spookyAudio = new Audio(songToPlay);
        spookyAudio.volume = 0.6;

        spookyAudio.play()
            .then(() => console.log("🎵 Playing:", songToPlay))
            .catch(err => console.error("❌ Audio play failed:", err));
    };

    const handleTryAgain = () => {
        quizForm.reset();
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        body.classList.remove('grayscale');

        if (spookyAudio) {
            spookyAudio.pause();
            spookyAudio.currentTime = 0;
            spookyAudio = null;
        }

        submitBtn.disabled = true;
    };

    quizForm.addEventListener('submit', handleSubmit);
    tryAgainBtn.addEventListener('click', handleTryAgain);
});
