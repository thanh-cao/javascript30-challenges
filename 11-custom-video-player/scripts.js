/* variable declaration */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const togglePlayButton = player.querySelector('.player__button.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlayVideo() {
    video.paused ? (video.play(), togglePlayButton.textContent = '||') : (video.pause(), togglePlayButton.textContent = '►');
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function handleRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percentProgress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentProgress}%`;
}

function scrub(e) {
    // find where on the progress bar is being clicked by checking click's offsetX. From there we can calculate where the click is in relation to video's duration
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

togglePlayButton.addEventListener('click', togglePlayVideo);
video.addEventListener('click', togglePlayVideo);
video.addEventListener('timeupdate', updateProgress);
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
})

ranges.forEach(range => {
    range.addEventListener('change', handleRange);
})
ranges.forEach(range => {
    range.addEventListener('mousemove', handleRange);
})

// scrub begins when mouse is down and changes as mouse moves and stops when mouse is up
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);