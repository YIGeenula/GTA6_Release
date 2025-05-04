document.addEventListener('DOMContentLoaded', function() {
    // Set the release date: May 26, 2026, at 00:00 (midnight)
    const releaseDate = new Date('May 26, 2026 00:00:00').getTime();
    
    // Update the countdown every second
    const countdown = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the time remaining
        const timeRemaining = releaseDate - now;
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // If the countdown is over, display a message
        if (timeRemaining < 0) {
            clearInterval(countdown);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Optional: Add a message when countdown is over
            const container = document.querySelector('.container');
            const releaseMessage = document.createElement('h2');
            releaseMessage.textContent = 'GTA 6 has been released!';
            releaseMessage.style.marginTop = '30px';
            releaseMessage.style.color = '#ff3b00';
            container.appendChild(releaseMessage);
        }
    }, 1000);
    
    // Function to format time (add leading zero if needed)
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Mobile Menu Toggle
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
    
    // Add scroll event listener to update active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Adding offset for better UX
        
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the corresponding link
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // ===== CUSTOMIZE FUNCTIONALITY =====
    
    // YouTube trailer video ID (GTA 6 Trailer)
    const trailerVideoId = 'QdBZY2fkU-0';
    let youtubePlayer = null;
    
    // Elements
    const customizeBtn = document.getElementById('customize-btn');
    const customizePanel = document.getElementById('customize-panel');
    const toggleTrailerBtn = document.getElementById('toggle-trailer');
    const toggleMuteBtn = document.getElementById('toggle-mute');
    const toggleContentBtn = document.getElementById('toggle-content');
    const trailerContainer = document.getElementById('trailer-container');
    const heroSection = document.querySelector('.hero-section');
    
    // Toggle customize panel
    customizeBtn.addEventListener('click', function() {
        customizePanel.classList.toggle('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!customizePanel.contains(event.target) && event.target !== customizeBtn && !customizeBtn.contains(event.target)) {
            customizePanel.classList.remove('active');
        }
    });

    // Add mobile detection function
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    document.documentElement.requestFullscreen()
    .catch(err => console.log('Fullscreen failed:', err));
    
    // 1. Switch to GTA 6 Trailer
    toggleTrailerBtn.addEventListener('click', function() {
    const isShowingTrailer = trailerContainer.classList.contains('active');
        
        if (!isShowingTrailer) {
            // For mobile devices
        if (isMobile()) {
            // Lock orientation to landscape if supported
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {});
            }
            
            // Force fullscreen view
            document.documentElement.requestFullscreen().catch(() => {});
            trailerContainer.classList.add('mobile-fullscreen');
        }
            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Switch to trailer
            loadYouTubeTrailer();
            trailerContainer.classList.add('active');
            document.documentElement.classList.add('no-scroll');
            toggleTrailerBtn.innerHTML = '<i class="fas fa-image"></i> Switch to Background';
            toggleTrailerBtn.classList.add('active');
            toggleMuteBtn.disabled = false;
        } else {
            // For mobile devices
        if (isMobile()) {
            // Unlock orientation
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
            
            // Exit fullscreen
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            trailerContainer.classList.remove('mobile-fullscreen');
        }
            // Switch back to background image
            if (youtubePlayer) {
                youtubePlayer.destroy();
                youtubePlayer = null;
            }
            trailerContainer.classList.remove('active');
            trailerContainer.innerHTML = '';
            document.documentElement.classList.remove('no-scroll');
            toggleTrailerBtn.innerHTML = '<i class="fas fa-film"></i> Switch to GTA 6 Trailer';
            toggleTrailerBtn.classList.remove('active');
            toggleMuteBtn.disabled = true;
            toggleMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute Trailer';
            toggleMuteBtn.classList.remove('active');
        }
    });
    
    // 2. Mute/Unmute Trailer Audio
    toggleMuteBtn.addEventListener('click', function() {
        if (youtubePlayer) {
            const isMuted = toggleMuteBtn.classList.contains('active');
            
            if (isMuted) {
                // Unmute
                youtubePlayer.unMute();
                toggleMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute Trailer';
                toggleMuteBtn.classList.remove('active');
            } else {
                // Mute
                youtubePlayer.mute();
                toggleMuteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Unmute Trailer';
                toggleMuteBtn.classList.add('active');
            }
        }
    });
    
    // 3. Hide/Show Text and Countdown
    toggleContentBtn.addEventListener('click', function() {
        heroSection.classList.toggle('hide-content');
        
        if (heroSection.classList.contains('hide-content')) {
            toggleContentBtn.innerHTML = '<i class="fas fa-eye"></i> Show Text & Countdown';
            toggleContentBtn.classList.add('active');
        } else {
            toggleContentBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Text & Countdown';
            toggleContentBtn.classList.remove('active');
        }
    });
    
    // Load YouTube API and create player
    function loadYouTubeTrailer() {
        // If YouTube API is not loaded yet
        if (!window.YT) {
            // Create YouTube script tag
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            // Set up callback for when API is ready
            window.onYouTubeIframeAPIReady = function() {
                createYouTubePlayer();
            };
        } else {
            // If API is already loaded
            createYouTubePlayer();
        }
    }
    
    // Create YouTube player
    function createYouTubePlayer() {
        // Clear container first
        trailerContainer.innerHTML = '<div id="youtube-player"></div>';
        
        youtubePlayer = new YT.Player('youtube-player', {
            videoId: trailerVideoId,
            playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            loop: 1,
            playlist: trailerVideoId,
            rel: 0,
            showinfo: 0,
            playsinline: 0, // Force fullscreen playback on iOS
            fs: 1 // Show fullscreen button
            },
            events: {
                onReady: function(event) {
                    event.target.playVideo();
                    // Mobile-specific initialization
                    if (isMobile()) {
                        event.target.setPlaybackQuality('hd1080');
                    }
                }
            }
        });
    }
});