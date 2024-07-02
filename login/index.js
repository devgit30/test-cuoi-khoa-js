import users from '../users.js';
import posts from '../posts.js';

const lstUser = users;
const lstPost = posts;
let itemUser = {};
const home = document.getElementById('home');
const contentTable = document.getElementById('content_table');

const email = document.getElementById('email');
const pass = document.getElementById('pass');
const error = document.getElementById('error');
const login = document.getElementById('login');
const container = document.getElementById('Container');

const btnSignUp = document.getElementById('btn_sign_up');
const signUpConteiner = document.querySelector('.login-container');

const signUpEmail = document.getElementById('signup_email');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const signupPassword = document.getElementById('signup_password');
const btnCreate = document.getElementById('btn_create');
const signErrorEmail = document.getElementById('sign_error_email');
const errorEmpty = document.getElementById('error_empty');

login.onclick = () => {
    if (checkEmptyInput()) {
        error.innerText = 'Vui lòng nhập đầy đủ đầu vào';
        error.style.color = 'red';
        return;
    }

    if (checkValueComplated()) {
        error.innerText = 'Vui lòng nhập đúng thông tin';
        error.style.color = 'red';
        return;
    }

    container.style.display = 'none';
    contentTable.style.display = 'flex';
    home.innerText = `hello ${itemUser?.first_name} ${itemUser?.last_name}`;
    initTable(itemUser)
}

function checkEmptyInput() {
    if (email.value.trim() === '' || pass.value.trim() === '') {
        return true
    }

    return false
}

function checkValueComplated() {
    const checkEmail = lstUser.find(item => item.email === email.value.trim());
    const checkPass = lstUser.find(item => item.password === pass.value.trim());
    if (!checkEmail && !checkPass) {
        return true
    }
    itemUser = { ...checkEmail }
    return false
}

// handle sign up 

btnSignUp.onclick = () => {
    container.style.display = 'none';
    signUpConteiner.style.display = '';
    contentTable.style.display = 'none';
    home.style.display = 'none';
}

signUpEmail.onchange = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpEmail.value)) {
        signErrorEmail.innerText = 'Vui lòng nhập đúng định dạng Email';
        signErrorEmail.style.color = 'red';
    } else {
        signErrorEmail.innerText = '';
        signErrorEmail.style.color = '';
    }
}

function checkEmptyValueSignup() {
    if (signUpEmail.value === '' || firstName.value === '' || lastName.value === '' || signupPassword.value === '') {
        return true;
    }
    return false;
}

btnCreate.onclick = () => {
    const checkUser = lstUser.filter(item => item.first_name == firstName.value && item.last_name === lastName.value);
    if (checkEmptyValueSignup()) {
        errorEmpty.innerText = 'Vui lòng nhập đầy đủ thông tin';
        errorEmpty.style.color = 'red';
        return
    } else {
        errorEmpty.innerText = '';
        errorEmpty.style.color = '';
    }

    if (checkUser.length !== 0) {
        errorEmpty.innerText = 'User đã tồn tại';
        errorEmpty.style.color = 'red';
    } else {
        errorEmpty.innerText = '';
        errorEmpty.style.color = '';
        lstUser.push({
            id: lstUser.length + 1,
            first_name: firstName.value,
            last_name: lastName.value,
            email: signUpEmail.value
        })
        alert('Thêm mới thành công');
    }
}

// handle table 

let itemView = {};

let body_table = document.getElementById('body_table');
let content_view = document.getElementById('content_view');
let content = document.getElementById('content');
function initTable(user) {
    const newPost = lstPost.filter(item => item.user_id === user.id);
    for (let i = 0; i < newPost.length; i++) {
        body_table.innerHTML += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${lstPost[i].title}</td>
            <td>${lstPost[i].created_at}</td>
            <td>${lstPost[i].updated_at}</td>
            <td><button type="button" class="btn btn-primary" onclick="onViewDetail(lstPost[${i}])">View</button></td>
        </tr>`;
    }
};


function onViewDetail(item) {
    content_view.style.display = '';
    itemView = { ...item };
    content.innerHTML = `<div><strong>Xem chi tiết</strong></div>
                    <div>
                        <span>ID:</span><span style="padding-left: 5px">${itemView.user_id}</span>
                    </div>
                    <div>
                        <span>Tiêu đề:</span><span style="padding-left: 5px">${itemView.title}</span>
                    </div>
                    <div>
                        <span>Nội dung:</span><span>${itemView.content}</span>
                    </div>
                    <div style="display: flex;">
                        <span>Ảnh:</span><span style="padding-left: 5px"><img height="100" width="100"
                                src="${itemView.image}" alt="" srcset=""></span>
                    </div>
                    <div>
                        <span>Ngày tạo:</span><span style="padding-left: 5px">${itemView.created_at}</span>
                    </div>
                    <div>
                        <span>Ngày cập nhật:</span><span style="padding-left: 5px">${itemView.updated_at}</span>
                    </div>`
}

window.onViewDetail = onViewDetail;
window.lstPost = lstPost; 