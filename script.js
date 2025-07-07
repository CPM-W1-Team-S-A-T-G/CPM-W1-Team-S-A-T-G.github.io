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
