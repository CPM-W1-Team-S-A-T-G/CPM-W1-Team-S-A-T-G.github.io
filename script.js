// script.js

// Ensure GSAP and ScrollTrigger are loaded before using them
gsap.registerPlugin(ScrollTrigger);

// --- Active Navigation Link Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    // For a single-page layout with anchor links, the 'currentPath' logic
    // needs to be adjusted if you want to highlight based on scroll position.
    // However, for initial load, if a link directly matches the URL hash,
    // you could use window.location.hash.
    // For continuous scroll, consider using ScrollTrigger to add/remove 'active' class.

    // If you're only using this to highlight based on the initial URL (e.g., if you had 'index.html#history'),
    // this specific part of the code might be less relevant for a full-page scroll site.
    // For anchor links, the 'active' class is often managed by scroll position.
    // Let's keep the original structure for now, but note it might not dynamically
    // update as you scroll unless paired with ScrollTrigger.
    const currentHash = window.location.hash; // Get the hash from the URL, e.g., #history

    navLinks.forEach(link => {
        // If the link's href matches the current hash, make it active
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        } else {
            // Remove active class from others
            link.classList.remove('active');
        }
    });

    // You could also add ScrollTrigger logic here to make navigation links active
    // based on which section is currently in view. Example for #home:
    ScrollTrigger.create({
        trigger: "#home",
        start: "top center",
        end: "bottom center",
        onEnter: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }),
        onLeaveBack: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home') {
                link.classList.remove('active');
            }
        }),
        // Add a unique ID if you need to control this trigger later
        id: "homeNav"
    });
    // Repeat similar ScrollTrigger blocks for #history, #algorithm, #info
    ScrollTrigger.create({
        trigger: "#history",
        start: "top center",
        end: "bottom center",
        onEnter: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#history') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }),
        onLeaveBack: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#history') {
                link.classList.remove('active');
            }
        }),
        id: "historyNav"
    });
    ScrollTrigger.create({
        trigger: "#algorithm",
        start: "top center",
        end: "bottom center",
        onEnter: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#algorithm') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }),
        onLeaveBack: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#algorithm') {
                link.classList.remove('active');
            }
        }),
        id: "algorithmNav"
    });
    ScrollTrigger.create({
        trigger: "#info",
        start: "top center",
        end: "bottom center", // Ensure this covers the section well enough before quiz pops up
        onEnter: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#info') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }),
        onLeaveBack: () => navLinks.forEach(link => {
            if (link.getAttribute('href') === '#info') {
                link.classList.remove('active');
            }
        }),
        id: "infoNav"
    });
});


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

// --- Smooth Scrolling for Nav Links ---
// This part is placed outside DOMContentLoaded because it relies on event listeners
// that will be set up once the elements are available, which they are when the script runs.
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Use GSAP for smooth scrolling for consistency with other animations
        gsap.to(window, {
            duration: 1, // Scroll duration
            scrollTo: {
                y: this.getAttribute('href'), // Target element by its ID
                offsetY: 80 // Offset for fixed header (adjust if your header height changes)
            },
            ease: "power2.inOut" // Smooth easing
        });
    });
});
