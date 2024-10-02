const monthMap = new Map([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9,"October"],
    [10, "November"],
    [11, "December"]
]);

const dayMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"]
])

function getMonthString(month) {
    return monthMap.get(month);
}

function getDayString(day) {
    return dayMap.get(day)
}

function get24HourTime(time) {
    let timeObj = new Date(time);
    let timeString = "";
    let hour = "";
    let timeOfDay = "";
    let minutes = "";

    if(12 - timeObj.getHours() < 0) {
        console.log("This is a PM time");
        let hourString = (timeObj.getHours() - 12);
        hour += hourString;
        timeOfDay = "PM";
    } else {
        console.log("This is a AM time");
        let hourString = timeObj.getHours();
        hour += hourString;
        timeOfDay = "AM";
    }

    minutes = timeObj.getMinutes();
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    timeString = hour + ":" + minutes + " " + timeOfDay

    return timeString
}
export {getMonthString, getDayString, get24HourTime}