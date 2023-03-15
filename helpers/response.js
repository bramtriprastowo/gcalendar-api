const response = (res, statusCode, status, message, data) => {
    let statusName = "";

    if(statusCode >= 200 && statusCode < 300) {
      statusName = "success";
    } else if(statusCode >= 400 && statusCode < 500) {
      statusName = "client error";
    } else if(statusCode >= 500 && statusCode < 600) {
      statusName = "server error";
      console.log(data);
    } else {
      statusName = status
    }

    const result = {
      status: statusName,
      message,
      data,
    };

    res.status(statusCode).json(result);
}

module.exports = {response}