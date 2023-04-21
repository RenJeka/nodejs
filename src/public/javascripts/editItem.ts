import {validateInput} from './validation.js';

interface AddEditFormElements {
    itemId: HTMLInputElement,
    name: HTMLInputElement,
    description: HTMLInputElement,
    completed: HTMLInputElement,
}

window.addEventListener('load', () => {
    const errorContainer = document.querySelector('#errorMsg');
    const editItemForm: HTMLFormElement = <HTMLFormElement>document.querySelector("#edit_item_form");
    editItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formElements: AddEditFormElements = <AddEditFormElements><unknown>editItemForm.elements;

        const itemId = formElements.itemId?.value;

        const isFormValid = validateInput(editItemForm, ['name'], errorContainer);

        if (!isFormValid) {
            return
        }

        const formData = {
            name: formElements.name?.value.trim(),
            description: formElements.description?.value.trim(),
            get completed() {
                return formElements.completed.checked ? 1 : 0
            },
            id: itemId
        };

        const result = await fetch(`/edit/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if ((result.status === 200 || result.status === 204) && (await result.text()).toLowerCase() === 'updated') {
            location.href = '/';
        }

    });
});
