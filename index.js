"use strict";
const formData = {
    email: '',
    title: '',
    text: '',
    checkbox: false,
};
const formsListRef = document.querySelectorAll('form');
const emailRef = document.querySelector('#email');
const titleRef = document.querySelector('#title');
const textRef = document.querySelector('#text');
const checkboxRef = document.querySelector('#checkbox');
function handleSubmit(e) {
    e.preventDefault();
    formData.email = emailRef?.value;
    formData.title = titleRef?.value;
    formData.text = textRef?.value;
    formData.checkbox = checkboxRef.checked;
    validateFormData(formData) && checkFormData(formData);
}
formsListRef.forEach((elem) => elem.addEventListener('submit', handleSubmit));
function validateFormData(data) {
    if (Object.values(data).every((value) => typeof value === 'string' ? value.trim() : value)) {
        return true;
    }
    else {
        console.log('Please, complete all fields');
        return false;
    }
}
function checkFormData(data) {
    const { email } = data;
    const emails = ['example@gmail.com', 'example@ex.com', 'admin@gmail.com'];
    const isInclude = emails.some(e => e === email);
    if (isInclude) {
        console.log('This email is already exist');
    }
    else {
        console.log('Posting data...');
    }
}
