// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle menu animation
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    const bars = mobileMenu.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Sticky Navigation Bar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate Statistics Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // Duration in milliseconds
        const step = target / (duration / 16); // Update every 16ms for smooth animation
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = target;
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }
    
    // Intersection Observer to trigger counter animation when visible
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Form Submission Handling
    const volunteerForm = document.getElementById('volunteerForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const successModal = document.getElementById('successModal');
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-btn');
    
    // Function to show the success modal
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('show');
        }
    }
    
    // Function to hide the success modal
    function hideSuccessModal() {
        if (successModal) {
            successModal.classList.remove('show');
        }
    }
    
    // Add event listeners to close modal buttons
    if (closeModalButtons.length > 0) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', hideSuccessModal);
        });
    }
    
    // Allow clicking outside the modal to close it
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideSuccessModal();
            }
        });
    }
    
    // Volunteer form submission
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server here
            // For this example, we'll just show the success modal
            showSuccessModal();
            
            // Reset the form
            this.reset();
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server here
            // For this example, we'll just show the success modal
            showSuccessModal();
            
            // Reset the form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the target scroll position
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Scroll to the target position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations for sections as they come into view
    const revealElements = document.querySelectorAll('.section-padding');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(element);
        });
        
        // Add a class to apply the animation
        document.addEventListener('scroll', function() {
            revealElements.forEach(element => {
                if (element.classList.contains('revealed')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }, { passive: true });
    }
});