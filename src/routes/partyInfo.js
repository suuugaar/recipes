const deleteBtn = document.querySelector('.deleteBtn');
const editBtn = document.querySelector('.editBtn');


deleteBtn.addEventListener('click', async (event) => {
  try {
    const id = event.target.name;
    console.log(id);
    const response = await fetch(`/party/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      window.location.assign('/');
      // element.previousSibling.style.display = 'block';
      // element.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
  }
});

editBtn.addEventListener('click', async (event) => {
  const id = event.target.name;
  window.location.assign(
    `/party/edit/${id}`,
  );
});
