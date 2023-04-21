export function validateInput(htmlFormElement, inputsNameArr, errorContainer) {

    if (!htmlFormElement || htmlFormElement.elements.length === 0 || inputsNameArr?.length === 0) {
        return true;
    }
    const formElements = htmlFormElement.elements;

    let isFormValid = true;

    inputsNameArr.forEach((inputName) => {
        if (formElements[inputName].value.trim().length === 0) {
            formElements[inputName].setAttribute('aria-invalid', 'true');
            errorContainer.classList = 'invalid';
            errorContainer.innerText += `Please, fill ${inputName} field correctly! \n`;
            isFormValid = false;

        } else {
            formElements[inputName].setAttribute('aria-invalid', 'false');
        }
    })

    if (isFormValid) {
        errorContainer.classList = 'valid';
        errorContainer.innerText = '';
    }

    return isFormValid;
}
