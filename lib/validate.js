export function registerValidate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (!/^[a-zA-Z\s]*$/i.test(values.name)) {
    errors.name = "Invalid Username";
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.studentNumber) {
    errors.studentNumber = 'Required';
  } else if (
    !/^(22)(00|10|1[123]|15[34]|16[49]|31|40|15)([0-9]{3,8})$/i.test(values.studentNumber) &&
    !/^(22)(00|10|1[123]|15[34]|16[49]|31|40|154)([0-9]{4,8})$/i.test(values.studentNumber)
  ) {
    errors.studentNumber = 'Invalid student number';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^\d{10}$/i.test(values.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  return errors;
}
