import { validateInput } from './validation.js';
window.addEventListener('load', () => {
    const validationContainer: HTMLDivElement = <HTMLDivElement>document.querySelector('#validationContainer');
    const loginForm: HTMLFormElement  = <HTMLFormElement>document.querySelector("#login_form");

    loginForm.onsubmit = async (event) => {
        event.preventDefault();
        const authFormData: FormData = <FormData>new FormData(<HTMLFormElement>event.target);
        // TODO: change to FormData.getAll();
        // @ts-ignore
        const value = Object.fromEntries(authFormData.entries());

        const isFormValid = validateInput(loginForm, ['login', 'pass'], validationContainer);

        if (!isFormValid) {
            return
        }

        let response = await fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(value),
        });

        if (response.status === 200 && (await response.text()).toLowerCase() === 'logged') {
            validationContainer.classList.add('valid');
            validationContainer.innerText = 'Success!';
            location.href = '/';
        } else if (response.status === 401) {
            validationContainer.classList.add('invalid');
            validationContainer.innerText = 'Declined!';
        }

    };
});
