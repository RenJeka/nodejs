window.addEventListener('load', () => {
    const errorContainer = document.querySelector('#errorMsg');
    const editItemForm = document.querySelector("#edit_item_form");
    editItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formElements = event.target?.elements;

        const itemId = formElements.itemId.value;

        //Form validation
        if (formElements.name.value.trim().length === 0) {
            formElements.name.setAttribute('aria-invalid', 'true');
            errorContainer.classList = 'invalid';
            errorContainer.innerText = 'Please, fill all inputs!';
            return;
        }
        formElements.name.setAttribute('aria-invalid', 'false');

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
