const ResponseApiHandler = require('../utils/ResponseApiHandler');

exports.getPublicInfo = (req, res) => {
    return ResponseApiHandler.success(res, 'This is a public route.');
};
