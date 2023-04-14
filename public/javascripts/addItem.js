window.addEventListener('load', () => {

    const errorContainer = document.querySelector('#errorMsg');
    const addItemForm = document.querySelector("#add_item_form");
    addItemForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formElements = event.target?.elements;

        // Form validation
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
