window.addEventListener('load', () => {
    const validationContainer = document.querySelector('#validationContainer');
    const loginForm = document.querySelector("#login_form");

    loginForm.onsubmit = async (event) => {
        event.preventDefault();
        const authFormData = new FormData(event.target);
        const value = Object.fromEntries(authFormData.entries());

        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(value)
        });

        if (response.status === 200) {
            validationContainer.classList = 'valid';
            validationContainer.innerText = 'Success!';
            setTimeout(async () => {
                const responseText = await response.text()
                document.open();
                document.write(responseText)
            }, 1000)
        } else if (response.status === 401) {
            validationContainer.classList = 'invalid';
            validationContainer.innerText = 'Declined!';
        }

    };
});
