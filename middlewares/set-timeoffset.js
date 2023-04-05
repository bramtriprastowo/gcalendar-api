const setTimeoffset = () => {
    let date = new Date().getTimezoneOffset() / 60;
    let timezone = "";
    if (date <= 0) {
        if (date % 1 !== 0) {
            timezone = `+${Math.floor(Math.abs(date))}:30`
        } else {
            timezone = `+${Math.abs(date)}:00`
        }
    } else if (date > 0) {
        if (date % 1 !== 0) {
            timezone = `-${Math.floor(date)}:30`
        } else {
            timezone = `-${date}:00`
        }
    }
    return timezone;
}

module.exports = {setTimeoffset}

