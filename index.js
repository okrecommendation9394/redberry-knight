'use strict';
const inputGroup = document.querySelectorAll('.input_group');
const rectangleTwo = document.querySelector('.rectangle2');
const progress = document.getElementById('progressId');
const progressSteps = document.querySelectorAll('.progress_step')
const backBtns = document.querySelectorAll(".back");
const nextBtns = document.querySelectorAll('.next');
const sections = document.querySelectorAll('.section');
const personalBtn = document.getElementById('personalBtn');
const radioBtns = document.querySelectorAll('input[name="yes_no_buttons"]')
const firstName = document.getElementById('firstName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const nameCheck = document.createElement('img');
nameCheck.classList.add('checkmark');
const checkMarks = document.querySelectorAll('.checkmark')
nameCheck.src = "/images/greencheckmark.png";
nameCheck.alt = 'checkmark';
const emailCheck = nameCheck.cloneNode(true);
const phoneCheck = nameCheck.cloneNode(true);
const dateCheck = nameCheck.cloneNode(true);

const popup = document.createElement('div');
popup.classList.add('popup');
popup.innerHTML=`
<div class="first_line">
<img src="images/redvector.png">
<div class='err'></div>
<div class="popupBtn">X</div>
</div>
<div class="second_line"></div>
`
let steps = 0;
function isEmpty(){
    if(firstName.value.length < 2 || email.value == "" || email.value.endsWith('@redberry.ge')==false || phone.value.length != 9 || isNaN(phone.value)==true || date.value == ""){
        personalBtn.disabled = true;
    }else if(firstName.value.length >= 2 && email.value != '' && email.value.endsWith('@redberry.ge')==true &&  phone.value.length == 9 && isNaN(phone.value)==false && date.value != ""){
        personalBtn.disabled = false;
    }
}
firstName.addEventListener('keyup', ()=>{
    if(firstName.value.length<2){
        rectangleTwo.appendChild(popup);
        nameCheck.style.display='none'
        popup.style.display='flex';
        document.querySelector('.err').innerText = "Invalid Name";
        document.querySelector('.second_line').innerText = "Name must contain at least 2 symbols"
        document.querySelector('.popupBtn').addEventListener('click', ()=>{
            popup.style.display='none';
        })   
    }else{
        inputGroup[0].appendChild(nameCheck);
        nameCheck.style.display='block'
    }
})
phone.addEventListener('keyup', ()=>{
    if(phone.value.length!=9 && isNaN(phone.value)==true){
        rectangleTwo.appendChild(popup);
        phoneCheck.style.display='none'
        popup.style.display='flex';
        document.querySelector('.err').innerText = "Invalid Phone number";
        document.querySelector('.second_line').innerText = "Phone number must contain 9 symbols"
        document.querySelector('.popupBtn').addEventListener('click', ()=>{
            popup.style.display='none';
         })
    }else{
        inputGroup[2].appendChild(phoneCheck);
        phoneCheck.style.display='block'
    }
})
email.addEventListener('keyup', ()=>{
    if(email.value.endsWith('@redberry.ge')==false){
        rectangleTwo.appendChild(popup);
        emailCheck.style.display='none'
        popup.style.display='flex';
        document.querySelector('.err').innerText = "Invalid Email";
        document.querySelector('.second_line').innerText = "Please enter valid email address"
        document.querySelector('.popupBtn').addEventListener('click', ()=>{
            popup.style.display='none';
         })
    }else{
        inputGroup[1].appendChild(emailCheck);
        emailCheck.style.display='block'
    }
})
date.addEventListener('keyup', ()=>{
    if(date.value == ""){
        dateCheck.style.display = 'none'
    }else{
        inputGroup[3].appendChild(dateCheck);
        dateCheck.style.display='block'
    }
})
personalBtn.addEventListener('click', ()=>{
    /*if(personalBtn.hasAttribute(disabled)){
        let popup = document.createElement('div');
        popup.id="popup";
        popup.innerHTML = `
        <div class="first_column">
        <img src="images/redvector.png">
        <div>Invalid email</div>
        <div class="close_btn">X</div>
        </div>
        <div class="second_column">Please enter valid email address</div>
        `
        rectangleTwo.appendChild(popup);
    }*/
})
nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
            steps++;
        increaseSteps();
        })
});

backBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        steps--;
        decreaseSteps();
    })
})

function increaseSteps(){
    sections[steps].classList.add("section_active");
    sections[steps-1].classList.remove('section_active');
    updateProgressBar();
}
function decreaseSteps(){
    sections[steps].classList.add('section_active');
    sections[steps+1].classList.remove('section_active');
}

function updateProgressBar(){
    if(steps>1){
        progressSteps[2].classList.add('finished');
    }else{
        progressSteps[2].classList.remove('finished');
    }
}

firstName.addEventListener('blur', onInputBlur);
email.addEventListener('blur', onInputBlur);
phone.addEventListener('blur', onInputBlur);
date.addEventListener('blur', onInputBlur);

const inputs = document.querySelectorAll('.input_text');

function onInputBlur(event){
   if(event.target && event.target.value){
        console.log('filled');
       event.target.classList.add('input_filled');
    }else {
        event.target.classList.remove('input_filled');
    }
}
//dropdown menu
const wrapper = document.querySelector('.wrapper');
const wrapperTwo = document.querySelector('.wrapper_two');
const title = document.querySelector('.title');
const titleTwo = document.querySelector('.title2');
const titleAfter = window.getComputedStyle(title, '::after');
const icons = document.querySelectorAll('.icon');
const iconsTwo = document.querySelectorAll('.icon2');
const titleImg = document.querySelector('.player_img');


wrapper.addEventListener("click", (ev) => {
       let el = ev.target.parentElement;
       if(el == wrapper || el.parentElement == wrapper){
        wrapper.classList.toggle('dropdown_active');
       }
})
icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        title.innerHTML = icon.innerHTML;
    })
})
wrapperTwo.addEventListener("click", (ev) => {
    let elem = ev.target.parentElement;
    if(elem == wrapperTwo || elem.parentElement == wrapperTwo){
     wrapperTwo.classList.toggle('dropdown2_active');
    }
})
iconsTwo.forEach((iconTwo) => {
    iconTwo.addEventListener('click', () => {
        titleTwo.innerHTML = iconTwo.innerHTML;
    })
})

const magnusCarlsen = document.getElementById('magnus');
const nonaGafrindashvili = document.getElementById('nona');
const bobbyFisher = document.getElementById('bobby');
const mikhailTal = document.getElementById('mikhail');

let playerIds = [];

const request = fetch('https://chess-tournament-api.devtest.ge/api/grandmasters')
.then((response) => response.json())
.then((data) => {
    const magnus = renderPlayer(data[3]);
    magnusCarlsen.appendChild(magnus);
   
   const nona = renderPlayer(data[0]);
   nonaGafrindashvili.appendChild(nona);

   const mikhail = renderPlayer(data[1]);
   mikhailTal.appendChild(mikhail);
   bobbyFisher.appendChild(renderPlayer(data[2]));

   data.forEach((player) => {
    playerIds.push(player['id']);
   })
})
.catch(err => {
    console.log(`${err} ERROR`);
})
function renderPlayer(data){
   const player = document.createElement('div');
   player.classList.add('players');
   const name = document.createElement('div');
   name.classList.add('player_name');
   name.innerHTML = `${data['name']}`;
   player.appendChild(name);
   const image = document.createElement('img');
   image.src = `${data['image']}`;
   image.classList.add('player_img');
   player.appendChild(image);
    return player;
}
//making json from user input
const addInput = () => {
    let selectedRadioBtn;
    for(const radioBtn of radioBtns){
        if(radioBtn.checked){
            selectedRadioBtn = radioBtn.value;
            break;
        }
    }
    let selectedPlayer;
    if(document.querySelector('.title2').innerHTML.localeCompare("Magnus Carlsen")){
        selectedPlayer = 3;
    }else if(document.querySelector('.title2').innerHTML.localeCompare('Nona Gafrindashvili')){
        selectedPlayer = 0;
    }else if(document.querySelector('.title2').innerHTML.localeCompare('Mikhail Tal')){
        selectedPlayer = 1;
    }else if(document.querySelector('.title2').innerHTML.localeCompare('Bobby Fisher')){
        selectedPlayer = 2;
    }
    let participated = false;
    if(selectedRadioBtn == 'yes') {participated=true;}
    let experience = document.querySelector('.title').innerHTML.toLowerCase()
    let user = {
        "name": firstName.value,
        "email": email.value,
        "phone": phone.value,
        "date_of_birth": date.value,
        "experience_level": experience,
        "already_participated": participated,
        "character_id": selectedPlayer
    }
    document.querySelector("form").reset();
    
    localStorage.setItem('MyUser', JSON.stringify(user));


    fetch("https://chess-tournament-api.devtest.ge/api/register", {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true},
        mode: 'cors', 
        body: JSON.stringify(user)
      }).then(res => res.json())
      .then(json => console.log(json))
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('complete').addEventListener('click', addInput);
})

