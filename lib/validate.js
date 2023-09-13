export function registerValidate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (!/^[a-zA-Z\s]*$/i.test(values.username)) {
    errors.username = "Invalid Username";
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.studentNumber) {
    errors.studentNumber = 'Required';
  } else if (!/^(22|21)(00|10|1[123]|15[34]|16[49]|31|40|15)([0-9]{3})$/i.test(values.studentNumber)) {
    errors.studentNumber = 'Invalid student number';
  }

  return errors;
}
