export default function(errors, key) {
  return {
    helperText: errors && errors[key] ? errors[key].message : "",
    error: !!(errors && errors[key])
  };
}
