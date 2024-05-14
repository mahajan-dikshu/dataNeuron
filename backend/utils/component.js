// responseUtil.js
exports.success = (res, statusCode, message,data) => {
    res.status(statusCode).json({ success: true, message,data });
};

exports.error = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, error: message });
};
