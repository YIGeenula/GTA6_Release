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
});