import {validateInput} from './validation.js';
window.addEventListener('load', () => {

    const errorContainer = document.querySelector('#errorMsg');
    const addItemForm = document.querySelector("#add_item_form");
    addItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const isFormValid = validateInput(addItemForm, ['name'], errorContainer);

        if (!isFormValid) {
            return
        }

        const formData = {
            name: addItemForm.elements.name?.value.trim(),
            description: addItemForm.elements.description?.value.trim(),
            get completed() {
                return addItemForm.elements.completed.checked ? 1 : 0
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
