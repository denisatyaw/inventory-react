class ResponseApiHandler {
    static success(res, message, data = null) {
      return res.status(200).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static created(res, message, data = null) {
      return res.status(201).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static error(res, message, error = null, statusCode = 500) {
      return res.status(statusCode).json({
        status: 'error',
        message,
        error,
      });
    }
  
    static notFound(res, message) {
      return res.status(404).json({
        status: 'error',
        message,
      });
    }
  
    static unauthorized(res, message) {
      return res.status(401).json({
        status: 'error',
        message,
      });
    }
}
  
module.exports = ResponseApiHandler;
  