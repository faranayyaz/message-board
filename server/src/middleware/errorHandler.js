export default function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set HTTP status code
  const statusCode = err.statusCode || 500;

  // Send response
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    // Optionally include stack trace in development environment
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
