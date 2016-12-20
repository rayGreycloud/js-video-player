// Grab video player elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay() {
  // Use ternary operator to set method
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  // Another ternary to set play button appearance
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // Grab skip interval and convert to number
  const interval = parseFloat(this.dataset.skip);
  // Add it to current time index
  video.currentTime += interval;
}

function handleRangeUpdate() {
  // change volume or playback rate when slider moved
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(event);
}

// Hook up event listeners
// Toggle play function when video clicked
video.addEventListener('click', togglePlay);
// Toggle play button to match video status
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// Update progress bar
video.addEventListener('timeupdate', handleProgress);
// Toggle play function when play button clicked
toggle.addEventListener('click', togglePlay);
// Trigger skip function when either skip button clicked
skipButtons.forEach(button => button.addEventListener('click', skip));
// Trigger volume or playback rate change when range changed
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// Trigger volume or playback rate change when mouse moves range slider
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
//
progress.addEventListener('click', scrub);
