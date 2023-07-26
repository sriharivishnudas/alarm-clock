//Fetching the tags of all Time Display Elements
let currentSecond = document.querySelector('.current-second');
let nextSecond = document.querySelector('.next-second');
let currentMinute = document.querySelector('.current-minute');
let nextMinute = document.querySelector('.next-minute');
let currentHour = document.querySelector('.current-hour');
let nextHour = document.querySelector('.next-hour');
let ampmToggle = document.querySelector('.am-pm')

let button = document.getElementById('set-alarm');
let list = document.getElementById('list');

//Alarm List Array
let alarm_list = []

//Function to Add Zero in front of Number strings lesser than or equal to 9
function addZero(n) {
    if (parseInt(n) <= 9) {
        n = '0' + String(parseInt(n));
    }
    return n;
}

//Time Animation Functions
function animateSeconds() {
    var today = new Date();
    var seconds = today.getSeconds();
    if (parseInt(seconds) <= 9) {
        seconds = '0' + String(seconds)
    }
    nextSecond.innerHTML = String(seconds);
    nextSecond.classList.add("animate");
    if (String(seconds) == '00') {
        animateMinutes();
    }
    setTimeout(function () {
        currentSecond.innerHTML = String(seconds);
        nextSecond.classList.remove('animate');
    }, 500)
}

function animateMinutes() {
    var today = new Date();
    var minutes = today.getMinutes();
    if (parseInt(minutes) <= 9) {
        minutes = '0' + String(minutes)
    }
    nextMinute.innerHTML = String(minutes);
    nextMinute.classList.add("animate");
    if (String(minutes) == '00') {
        animateHours();
    }
    setTimeout(function () {
        currentMinute.innerHTML = String(minutes);
        nextMinute.classList.remove('animate');
    }, 500)
}

function animateHours() {
    var today = new Date();
    var hours = today.getHours();
    if (parseInt(hours) > 12) {
        hours = hours - 12;
        ampmToggle.innerHTML = "PM";
    }
    else {
        ampmToggle.innerHTML = "AM";
    }
    if (parseInt(hours) <= 9) {
        hours = '0' + String(hours)
    }
    nextHour.innerHTML = String(hours);
    nextHour.classList.add("animate");
    setTimeout(function () {
        currentHour.innerHTML = String(hours);
        nextHour.classList.remove('animate');
    }, 500)
}

//Displaying the alarm in DOM

function addAlarmToDOM(alarm) {
    const li = document.createElement('li');
    li.innerHTML = ` <span> ${alarm}</span > <button class="delete" type="button" data-id="${alarm}">Delete Alarm</button>`;

    list.append(li);
}

//Function to refresh the list if array is added or removed
function renderList() {
    list.innerHTML = '';
    for (let i = 0; i < alarm_list.length; i++) {
        addAlarmToDOM(alarm_list[i]);
    }
}


//Function to Capture Alarm time entered by the user
function getAlarmTime() {
    let setHour = document.getElementById("setHour").value;
    setHour = addZero(setHour);
    let setMinute = document.getElementById("setMinute").value;
    setMinute = addZero(setMinute);
    let setSecond = document.getElementById("setSecond").value;
    setSecond = addZero(setSecond);
    if (setHour == '' || parseInt(setHour) > 12) {
        alert('Please Enter Valid Value');
        return;
    }
    if (setMinute == '' || parseInt(setMinute) > 60) {
        alert('Please Enter Valid Value');
        return;
    }
    if (setSecond == '' || parseInt(setSecond) > 60) {
        alert('Please Enter Valid Value');
        return;
    }
    let ampm = document.getElementById("am-pm-toggle").value;
    let time = String(setHour) + ':' + String(setMinute) + ":" + String(setSecond) + ' ' + ampm;
    console.log(time);
    alarm_list.push(time);
    console.log(alarm_list);
    renderList();
}

//Function to Alert the user 
function alertAlarm() {
    var today = new Date();
    var hour = today.getHours();
    if (parseInt(hour) > 12) {
        hour = String(parseInt(hour) - 12)
    }
    var now = String(addZero(hour) + ':' + addZero(today.getMinutes()) + ':' + addZero(today.getSeconds()) + ' ' + ampmToggle.innerHTML);
    for (i = 0; i < alarm_list.length; i++) {
        console.log(now);
        console.log(alarm_list[i]);
        if (alarm_list[i] == now) {
            console.log('Inside');
            alert('Time is ' + now);
        }
    }
}

//Function to Delete the Alarm
function deleteAlarm(alarm) {
    const newAlarmList = alarm_list.filter(function (i) {
        return i != alarm;
    })
    alarm_list = newAlarmList;
    renderList();
}

//Delegate Event Function for Click
function delegateEvent(e) {
    const target = e.target;
    if (target.className == 'delete') {
        console.log('Inside class');
        const id = target.dataset.id;
        console.log(id);
        deleteAlarm(id);
    }
}

//Setting Interval Function for Time Animation Function
var interval_second = setInterval(animateSeconds, 1000);
animateMinutes();
animateHours();

button.addEventListener('click', getAlarmTime);
document.addEventListener('click', delegateEvent)



var interval_alert = setInterval(alertAlarm, 1000)

