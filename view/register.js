document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    try {
        const response = await fetch('http://localhost:5500/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});
