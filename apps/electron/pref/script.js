
const {
    ipcRenderer
} = require("electron");


// window ready 
window.addEventListener('DOMContentLoaded', () => {
    // Your code here
    const formElement = document.querySelector('form');
    const baseUrlInput = document.querySelector('#baseUrl');

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const baseUrl = baseUrlInput.value;
        console.log('baseUrl', baseUrl);
        ipcRenderer.invoke('setBaseUrl', baseUrl);
    })
});