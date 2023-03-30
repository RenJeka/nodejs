const getDataMongoDBBtn = document.querySelector('#getDataMongoDBBtn');
const insertDataMongoDBBtn = document.querySelector('#insertDataMongoDBBtn');
const deleteDataMongoDBBtn = document.querySelector('#deleteDataMongoDBBtn');
const getAllMSSQLDataBtn = document.querySelector('#getAllMSSQLDataBtn');
const containerOutput = document.querySelector('#containerOutput');

getDataMongoDBBtn.addEventListener('click', async () => {
    let response = await fetch('/getMongoData');
    const data = JSON.stringify(await response.json());
    containerOutput.innerHTML = data;
});

insertDataMongoDBBtn.addEventListener('click', async () => {
    let response = await fetch('/insertMongoData');
    const data = JSON.stringify(await response.json());
    containerOutput.innerHTML = data;
});


deleteDataMongoDBBtn.addEventListener('click', async () => {
    let response = await fetch('/deleteMongoData');
    const data = JSON.stringify(await response.json());
    containerOutput.innerHTML = data;
});

getAllMSSQLDataBtn.addEventListener('click', async () => {
    let response = await fetch('/getMSSQLData');
    const data = JSON.stringify(await response.json());
    containerOutput.innerHTML = data;
});
