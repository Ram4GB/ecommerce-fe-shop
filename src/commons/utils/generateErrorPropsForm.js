import * as _ from "lodash";

export default function(errors, key, errorsAPI, setError) {
  if (errorsAPI && _.isArray(errorsAPI)) {
    errorsAPI.map(error => {
      return setError(error.param, "", error.msg);
    });
  }
  return {
    helperText: errors && errors[key] ? errors[key].message : "",
    error: !!(errors && errors[key])
  };
}
