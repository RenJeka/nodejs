export function validateInput(validatingInput, errorContainer) {
    if (validatingInput.value.trim().length === 0) {
        validatingInput.setAttribute('aria-invalid', 'true');
        errorContainer.classList = 'invalid';
        errorContainer.innerText = 'Please, fill all inputs!';
        return;
    }
    validatingInput.setAttribute('aria-invalid', 'false');
}
