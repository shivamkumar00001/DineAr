// middlewares/catchAsyncError.js

/**
 * Wraps an async function and catches any errors, passing them to Express error handler
 * @param {Function} fn - Async controller function (req, res, next)
 * @returns {Function} - Wrapped function with (req, res, next)
 */
export const catchAsyncError = (fn) => {
  return (req, res, next) => {
    // Execute the async function and catch errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
