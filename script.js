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

// script.js

// Ensure GSAP and ScrollTrigger are loaded before using them
// This assumes you're still loading GSAP and ScrollTrigger via CDN in your HTML <head>
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
  // You might want to remove onEnterBack if you don't want it to pop up again on scroll up
  // onEnterBack: () => hideQuizPopup()
});

// --- Add any other GSAP animations or JS code here that you would have had ---
// Example for smooth scrolling for nav links (optional, as scroll-behavior: smooth handles basic scrolling)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
