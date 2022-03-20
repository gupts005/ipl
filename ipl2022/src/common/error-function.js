
export function getErrorMessage(ex){
  let msg = '';
  const e = ex;
  if (e) {
      if (ex.status === 500 || ex.status === 0 || ex.response.status === 500 || ex.response.status === 0) {
          msg = 'Sorry the server is down! please contact the admin';
      } else {
          msg = e.response.data.message;
      }
  }
  return msg;
}