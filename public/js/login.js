const addUserForm = document.querySelector('#logForm');

addUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(addUserForm);
  const res = Object.fromEntries(data);

  if (!res.email || !res.password) {
    const errMsg = document.querySelector('.logErrMsg');
    errMsg.innerText = 'Вы ввели не все данные!';
  } else {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (response.ok) {
        setTimeout(() => {
          window.location.href = '/';
        }, 200);
      } else {
        const errMsg = document.querySelector('.logErrMsg');
        errMsg.innerText = result.err;
      }
    } catch (error) {
      console.log('Ошибка авторизации!', error);
      alert('Ошибка авторизации!');
    }
  }
});
