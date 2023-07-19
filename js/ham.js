// Define the event listener function
function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

// Add the event listener to the hamburger icon
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// Add event listeners to navigation links to close the menu when clicked
document.querySelectorAll('.menu li a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu').classList.remove('active');
        
        
    });
});

 export { toggleMenu };
  
  