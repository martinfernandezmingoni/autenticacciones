document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logOut');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
        
        const url = '/auth/logout'
        
        fetch(url, {
        method: 'GET',
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        });
    }
  });