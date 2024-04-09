document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    try {
        const response = await fetch('http://localhost:5500/api/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
