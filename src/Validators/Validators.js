export const isEmail = (email) => {
  let regex = /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-.]+)@{[a-zA-Z0-9_\-.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
  return regex.test(email);
};

export const isUsername = (usernmae) => {
  let regex = /^([a-zA-Z ]+)*$/;
  if (!regex.test(usernmae)) return false;
  return usernmae.trim() !== "";
};

export const isPassword = (password) => {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const isDate = (birthday) => {
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= 16;
};

export const isGender = (gender) => {
  return gender === 'M' || gender === 'F' || gender === 'O';
};