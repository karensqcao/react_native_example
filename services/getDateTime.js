// handle date digit
function dealDateDigits(date) {
    const date_str = `${date}`;
    if(date_str.length === 2) return date;
    return `0${date}`;
}

// handle time digit
function dealTimeDigits(time) {
    const time_str = `${time}`;
    if(time_str.length === 2) return time;
    return `0${time}`
}

// return current Date and time
export async function getDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var result = `${year}-${dealDateDigits(month)}-${dealDateDigits(day)}` + 
    " " + 
    `${dealTimeDigits(hours)}:${dealTimeDigits(minutes)}:${dealTimeDigits(seconds)}`;
    global.last_handshake_date_time = result;
    return result;
}