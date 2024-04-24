const newParty = document.querySelector('.editParty');
newParty.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { id } = event.target;
  const status = document.querySelector('.status');
  let result;
  const {
    name: { value: name },
    location: { value: location },
    date: { value: date },
    time: { value: time },
  } = event.target;
  try {
    const response = await fetch(`/party/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, location, date, time,
      }),
    });
    result = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (result.success) {
    window.location.assign(`/party/${id}`)
  } else {
    status.innerText = 'Не удалось внести изменения, введены некорректные данные';
  }
});
