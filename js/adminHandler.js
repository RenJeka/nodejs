const getDataBtn = document.querySelector('#getDataBtn');
const containerOutput = document.querySelector('#containerOutput');

getDataBtn.addEventListener('click', async () => {
    console.log('getDataBtn clicked!');

    let response = await fetch('/getDBData');
    const data = JSON.stringify(await response.json());
    containerOutput.innerHTML = data;
});
