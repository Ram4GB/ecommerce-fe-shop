/*
res = {
  errors: [
    {
      location: "body"
      msg: "Must be the same as password."
      param: "password2"
      value: "gfdsgfsd"
    }, {
      ....
    },
    ...
  ],
  success: false
}
 */

export default function generateErrorsSignupForm(res, key) {
  const notNull = !!res;
  const foundErr = notNull && res.errors ? res.errors.find(e => e.param === key) : null;

  return {
    helperText: notNull && foundErr ? foundErr.msg : "",
    error: !!(notNull && foundErr)
  };
}
