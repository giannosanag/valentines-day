"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Σ'αγαπώ όσο δεν φαντάζεσαι..!";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");

  document.body.classList.add("animated-background");
  const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.play();


// Start the beat-synced animation
const beatInterval = 581; // 581 ms between beats for 103 BPM
setInterval(() => {
  document.body.classList.add("beat");
  setTimeout(() => {
    document.body.classList.remove("beat");
  }, 100); // Remove the class after 100 ms for a quick pulse

  // Trigger the jumping effect on the cat image
  catImg.style.animation = "none"; // Reset the animation
  void catImg.offsetWidth; // Trigger reflow to restart the animation
  catImg.style.animation = "jump 0.6s ease-in-out"; // Apply the jumping animation
}, beatInterval);
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
      "Οχι",
      "Φαντάζομαι καταλάθος πάτησες όχι. Δες αυτό και σκέψου..",
      "Μα κοίτα ωραίοι που είμαστε..",
      "Ακόμα και αν κάνω αυτή τη φάτσα;",
      "Θα κάνω και μάσκες αν θες.",
      "Αν πατήσεις εδώ θα πάθω κάτι πολύ κακό.",
  ];

  const messageIndex = Math.min(noCount, messages.length );
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
