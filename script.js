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

// --- Your existing script.js content (if any) would go here ---
// For example, if you have other GSAP animations or interactive elements:
// gsap.from("h1", { duration: 1, y: 100, opacity: 0 });
// ScrollTrigger.create({
//   trigger: "#history",
//   start: "top center",
//   animation: gsap.to("#history h2", { opacity: 1, y: 0 }),
//   toggleActions: "play none none reverse"
// });
