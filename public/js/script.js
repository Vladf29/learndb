'use strict'
const form = document.forms[0];
const body = document.body;
body.setAttribute('data-state', 'def');

let storage = {};

const resetSet = () => {
    for (const k of form.elements) {
        k.value = '';
    }
    storage = {};
    body.setAttribute('data-state', 'def');
}
const downloadUsers = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/users');
    xhr.send();

    xhr.onload = function () {
        if (this.status === 200) {
            const table = document.querySelector('table tbody');
            const data = JSON.parse(this.response);
            let tr = '';
            data.forEach((item) => {
                let tri = '<tr>';
                let template = ``;
                for (const key in item) {
                    template += `<td>${item[key]}</td>`;
                }
                template +=
                    `<td><a href='#' data-action='delete' class='js-ma'>delete</a> <span>/</span> <a href='#' data-action='edit' class='js-ma'>edit</a></td>`;
                tri += template + '</tr>';
                tr += tri;
            });
            table.innerHTML = tr;
        } else {
            console.log(this.response);
        }
    }
}
const sendUsers = function () {

    let data = {};

    const xhr = new XMLHttpRequest();

    switch (body.getAttribute('data-state')) {
        case 'edit':
            data.new = {
                name: form.elements['nameUser'].value,
                age: form.elements['ageUser'].value
            };
            data.old = storage;
            xhr.open('PUT', '/api/users')
            break;

        default:
            data.name = form.elements['nameUser'].value;
            data.age = form.elements['ageUser'].value;
            xhr.open('POST', '/api/users')
            break;
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
        if (this.status === 200) {
            downloadUsers();
            resetSet();
        } else {
            console.log(this.response);
        }
    }
}
const deleteUser = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(storage));
    storage = {};

    xhr.onload = function () {
        if (this.status === 200)
            downloadUsers();
        else console.log(this.response);
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendUsers();
});
form.addEventListener('reset', resetSet);

document.querySelector('table').addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (!target.hasAttribute('data-action')) return;

    const tr = target.closest('tr');
    storage.name = tr.children[1].textContent;
    storage.age = tr.children[2].textContent;

    if (target.getAttribute('data-action') === 'delete') {
        deleteUser();
    } else if (target.getAttribute('data-action') === 'edit') {
        form.elements['nameUser'].value = storage.name;
        form.elements['ageUser'].value = storage.age;
        body.setAttribute('data-state', target.getAttribute('data-action'));

    }
});

downloadUsers();