import {validateInput} from './validation.js';

window.addEventListener('load', () => {
    const validationContainer: HTMLDivElement = <HTMLDivElement>document.querySelector('#validationContainer');
    const registrationForm: HTMLFormElement = <HTMLFormElement>document.querySelector("#registration_form");
    const password: HTMLInputElement = <HTMLInputElement>document.querySelector("#pass");
    const repeatPassword: HTMLInputElement = <HTMLInputElement>document.querySelector("#repeat_pass");

    registrationForm.onsubmit = async (event) => {
        event.preventDefault();
        const authFormData = new FormData(<HTMLFormElement>event.target);
        // TODO: change to FormData.getAll();
        // @ts-ignore
        const value = Object.fromEntries(authFormData.entries());

        // Validation
        const isFormValid = validateInput(registrationForm, ['login', 'pass', 'repeat_pass'], validationContainer);

        if (!isFormValid || !checkComparingPasswords()) {
            return;
        }

        await sendData(value);

    };

    function checkComparingPasswords() {

        const isPasswordsEquals = password.value?.trim() === repeatPassword.value?.trim();

        if (isPasswordsEquals) {
            password.setAttribute('aria-invalid', "false");
            repeatPassword.setAttribute('aria-invalid', "false");
        } else {
            password.setAttribute('aria-invalid', "true");
            repeatPassword.setAttribute('aria-invalid', "true");
            validationContainer.classList.add('invalid');
            validationContainer.innerText = `Fields 'password' and 'repeat password' dont much! `;
        }
        return isPasswordsEquals;
    }

    async function sendData(data) {
        let response = await fetch('/reg', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (response.status === 200 && responseText === 'registered') {
            validationContainer.classList.add('valid');
            validationContainer.innerText = responseText;
            setTimeout(async () => {
                const win: Window = window;
                win.location = '/auth.html';
            }, 500)
        } else {
            validationContainer.innerText = responseText;
            validationContainer.classList.add('invalid');
        }
    }
});
