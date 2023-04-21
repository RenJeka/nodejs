import { validateInput } from './validation.js';

interface AddItemFormElements {
    name: HTMLInputElement,
    description: HTMLInputElement,
    completed: HTMLInputElement,
}

window.addEventListener('load', () => {

    const errorContainer = document.querySelector('#errorMsg');
    const addItemForm: HTMLFormElement = <HTMLFormElement>document.querySelector("#add_item_form");
    addItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formElements: AddItemFormElements = <AddItemFormElements><unknown>addItemForm.elements;

        const isFormValid = validateInput(addItemForm, ['name'], errorContainer);

        if (!isFormValid) {
            return
        }

        const formData = {
            name: formElements.name?.value.trim(),
            description: formElements.description?.value.trim(),
            get completed() {
                return formElements.completed.checked ? 1 : 0
            }
        };

        const result = await fetch('/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (result.status === 201 && (await result.text()).toLowerCase() === 'success' ) {
            location.href = '/';
        }

    });

});
