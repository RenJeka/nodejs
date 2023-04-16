import {validateInput} from './validation.js';

window.addEventListener('load', () => {
    const errorContainer = document.querySelector('#errorMsg');
    const editItemForm = document.querySelector("#edit_item_form");
    editItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const itemId = editItemForm.elements.itemId?.value;

        const isFormValid = validateInput(editItemForm, ['name'], errorContainer);

        if (!isFormValid) {
            return
        }

        const formData = {
            name: editItemForm.elements.name?.value.trim(),
            description: editItemForm.elements.description?.value.trim(),
            get completed() {
                return editItemForm.elements.completed.checked ? 1 : 0
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
