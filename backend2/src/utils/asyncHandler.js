// asyncHandler is a higher-order function that takes your route handler as input
const asyncHandler = (requestHandler) => {
  
  // It returns a new function that Express will actually use as the route handler
  return (req, res, next) => {
    
    // We call the original requestHandler with req, res, next
    // Promise.resolve() ensures that if requestHandler returns a Promise (which async functions do),
    // it will handle both success and failure cases.
    Promise.resolve(requestHandler(req, res, next))
    
      // If the promise gets rejected (i.e., an error occurs inside requestHandler),
      // catch the error and pass it to Express's error handling middleware using next(err).
      .catch((err) => next(err));
  };
};


export { asyncHandler };

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) =>async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
