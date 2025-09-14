document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('header nav a');

    // --- Set initial state ---
    // On page load, explicitly set the "Home" link as active.
    const homeLink = document.querySelector('header nav a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active-link');
    }

    // --- Active Nav Link on Scroll ---
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.4 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Keyboard Scroll Navigation (Simplified) ---
    // With a "Home" link, we no longer need a special case.
    const sectionOrder = Array.from(sections).map(section => section.id);
    
    document.addEventListener('keydown', (e) => {
        const activeLink = document.querySelector('header nav a.active-link');
        if (!activeLink) return;

        const currentId = activeLink.getAttribute('href').substring(1);
        const currentIndex = sectionOrder.indexOf(currentId);
        
        if (currentIndex === -1) return;

        let nextIndex = -1;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (currentIndex < sectionOrder.length - 1) {
                nextIndex = currentIndex + 1;
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                nextIndex = currentIndex - 1;
            }
        }

        if (nextIndex !== -1) {
            e.preventDefault(); 
            const nextSectionId = sectionOrder[nextIndex];
            const nextSection = document.getElementById(nextSectionId);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});