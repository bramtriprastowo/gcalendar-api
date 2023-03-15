const addStatus = (arrayObj) => {
    if (arrayObj.length > 0){
        for(let i = 0; i < arrayObj.length; i++){
            if(new Date() < arrayObj[i].time_start) {
                arrayObj[i].status = "Belum Dilaksanakan"
            } else if(new Date() > arrayObj[i].time_end) {
                arrayObj[i].status = "Telah Dilaksanakan"
            } else if (new Date() >=  arrayObj[i].time_start && new Date() <=  arrayObj[i].time_end) {
                arrayObj[i].status = "Sedang Dilaksanakan"
            }
        }
    }
}

module.exports = {addStatus}