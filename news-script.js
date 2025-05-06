document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle (similar to main script but specific for news page)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Animate news articles on scroll
    const newsArticles = document.querySelectorAll('.news-article');
    const featuredNews = document.querySelector('.news-featured');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        // Animate featured news
        if (featuredNews && isInViewport(featuredNews)) {
            featuredNews.classList.add('animate');
        }
        
        // Animate news articles
        newsArticles.forEach(article => {
            if (isInViewport(article)) {
                article.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Add animation classes to news-styles.css
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .news-featured, .news-article {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .news-featured.animate, .news-article.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .news-article {
            transition-delay: calc(var(--article-index, 0) * 0.1s);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Set delay for each article
    newsArticles.forEach((article, index) => {
        article.style.setProperty('--article-index', index + 1);
    });
});