
const erroRequest = (res, codeStatus, status, message) => {
    return res.status(codeStatus).json({
        ok: status,
        msg: message
    });
}

module.exports = {
    erroRequest
}