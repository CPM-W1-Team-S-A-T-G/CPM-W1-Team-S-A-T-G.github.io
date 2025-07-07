document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

// Ensure GSAP and ScrollTrigger are loaded before using them
gsap.registerPlugin(ScrollTrigger);

// --- Pop-up Quiz Logic ---
const quizPopup = document.getElementById('quizPopup');
const startQuizButton = document.getElementById('startQuizButton');
const closeQuizButton = document.getElementById('closeQuizButton');
const infoSection = document.getElementById('info');

// Function to show the quiz pop-up
function showQuizPopup() {
  quizPopup.style.display = 'flex'; // Show the overlay
}

// Function to hide the quiz pop-up
function hideQuizPopup() {
  quizPopup.style.display = 'none'; // Hide the overlay
}

// Event listener for starting the quiz (you'd link this to your actual quiz logic)
startQuizButton.addEventListener('click', () => {
  alert('Quiz started! (You would redirect to a quiz page or load quiz questions here)');
  hideQuizPopup(); // Hide the pop-up after starting
  // Potentially add logic to prevent the pop-up from reappearing on subsequent scrolls
  // ScrollTrigger.getById("quizTrigger").kill(); // If you want to disable the trigger after one show
});

// Event listener to close the pop-up
closeQuizButton.addEventListener('click', hideQuizPopup);

// Trigger the pop-up when the user scrolls to the end of the #info section
ScrollTrigger.create({
  trigger: infoSection,
  start: "bottom bottom", // When the bottom of the info section hits the bottom of the viewport
  onEnter: () => {
    showQuizPopup();
  },
  id: "quizTrigger" // Assign an ID if you want to control this trigger later (e.g., kill it)
  // onEnterBack: () => hideQuizPopup() // Uncomment if you want it to hide when scrolling back up
});

// --- Your existing GSAP animations or other script.js content would go here ---
// Example from your original CSS animation:
// This animation is purely CSS, but if you wanted to control it with GSAP:
// gsap.from(".intro-bg", {
//   scale: 0.5,
//   opacity: 0,
//   duration: 4,
//   ease: "power2.out"
// });

// Example for smooth scrolling when clicking nav links (optional, as scroll-behavior: smooth handles basic scrolling)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
