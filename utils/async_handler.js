const asyncHandler = (fn) => () => {
  return Promise.resolve(fn()).catch((error) => {
    console.log(error);
    response.render('error', { error });
  });
};

module.exports = asyncHandler;
