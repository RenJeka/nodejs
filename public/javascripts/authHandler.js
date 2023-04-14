window.addEventListener('load', () => {
    const validationContainer = document.querySelector('#validationContainer');
    const loginForm = document.querySelector("#login_form");

    loginForm.onsubmit = async (event) => {
        event.preventDefault();
        const authFormData = new FormData(event.target);
        const value = Object.fromEntries(authFormData.entries());

        let response = await fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(value)
        });

        if (response.status === 200 && (await response.text()).toLowerCase() === 'logged') {
            validationContainer.classList = 'valid';
            validationContainer.innerText = 'Success!';
            location.href = '/';
        } else if (response.status === 401) {
            validationContainer.classList = 'invalid';
            validationContainer.innerText = 'Declined!';
        }

    };
});
