exports.success = (res, message, statusCode,results) => {
  res
    .status(statusCode)
    .send({ status: true, message, code: statusCode, results });
};

exports.error = (res, message, statusCode) => {

  const codes = [400, 401, 404, 403, 422, 500];

  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  res.status(statusCode).send({ status: false, message, code: statusCode });
};
