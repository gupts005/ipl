
export const userData = JSON.parse(localStorage.getItem('loginState'));
export const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};
