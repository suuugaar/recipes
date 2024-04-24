const addUserForm = document.querySelector('#regForm');

addUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(addUserForm);
  const res = Object.fromEntries(data);

  if (!res.email || !res.login || !res.password) {
    const errMsg = document.querySelector('.regErrMsg');
    errMsg.innerText = 'Вы ввели не все данные!';
  } else {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.regDone) {
        setTimeout(() => {
          window.location.href = '/';
        }, 200);
      }
      if (result.err) {
        const errMsg = document.querySelector('.regErrMsg');
        errMsg.innerText = result.err;
      }
    } catch (error) {
      console.log('Ошибка регистрации', error);
      alert('Ошибка регистрации');
    }
  }
});
