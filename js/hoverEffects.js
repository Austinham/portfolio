// Function to show project info on hover
export function showProjectInfo() {
    const projectInfo = document.querySelector('.project-info');
    projectInfo.style.display = 'flex';
  }
  
  // Function to hide project info on mouseleave
  export function hideProjectInfo() {
    const projectInfo = document.querySelector('.project-info');
    projectInfo.style.display = 'none';
  }
