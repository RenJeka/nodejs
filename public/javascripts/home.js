window.addEventListener('load', () => {
    const editBtns = document.querySelectorAll('table > tbody > tr .table-btn_edit');
    const removeBtns = document.querySelectorAll('table > tbody > tr .table-btn_remove');

    for (const editBtn of editBtns) {
        editBtn.addEventListener('click', async (event) => {
            const itemId = event.target.dataset.itemId;
            await fetch(`/edit/${itemId}`, {
                method: 'GET'
            });
            location.href = '/edit/' + itemId;
        });
    }

    for (const removeBtn of removeBtns) {
        removeBtn.addEventListener('click', async (event) => {
            const itemId = event.target.dataset.itemId;
            const result = await fetch(`/edit/${itemId}`, {
                method: 'DELETE'
            });

            if ((result.status === 200 || result.status === 204) && (await result.text()).toLowerCase() === 'deleted') {
                location.reload()
            }
        });
    }
});


