import throttle from "lodash.throttle";
const STORAGE_KEY = 'feedback-form-state';

const refs =
{
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(saveData, 500));
refs.email.addEventListener('input', throttle(saveData, 500));


populateInput();

function populateInput() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        const { email, message } = JSON.parse(savedMessage);
        refs.email.value = email || '';
        refs.textarea.value = message || '';
    }
}

function saveData() {
    const state = {
        email: refs.email.value,
        message: refs.textarea.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        elements: { email, message },
    } = evt.currentTarget;

    if (email.value === '' || message.value === '') {
        return alert('Заповніть всі поля, будь ласка!');
    }

    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);



}





