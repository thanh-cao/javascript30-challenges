function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if (!audio) return;  // Stop the function from running at all
    key.classList.add('playing');
    audio.currentTime = 0;  // Rewind the audio from the start every time audio is called to play
    audio.play();
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;  // If property is not 'transform', the function will skip it.
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
window.addEventListener('keydown', playSound);

for (let key of keys) {
    key.addEventListener('transitionend', removeTransition);
}
// Simpler way instead of loop through keys is to use forEach()
// keys.forEach(key => key.addEventListener('transitionend', removeTransition));