// https://lothecode.github.io/ajax/RonWebData/artworks.json


(function () {
  const BASE_URL = '/artworks.json'
  const data = []
  const dataPanel = document.querySelector('#data-panel')

  axios.get(BASE_URL)
    .then((response) => {
      data.push(...response.data.artworks)
      displayDataList(data)
    })
    .catch((err) => console.log(err))

  function displayDataList(data) {
    let htmlContent = ''
    for (let i = 0; i < data.length; i++) {
      htmlContent += `
      <div class="col">
        <div class="card border-0 border-round">
          <button type="button" class="btn p-0 border-0 btn-modal" data-toggle="modal" data-target="#v1" data-id="${data[i].id}">
            <img src="${data[i].image_url}" class="card-img-top" alt="Card image">
            <div class="card-body bg-dark text-right title">${data[i].title}</div>
          </button>
        </div>
      </div>
      `
    }
    dataPanel.innerHTML = htmlContent
  }

  function showMovie(id) {

    const modalTitle = document.getElementById('show-title')
    const modalImage = document.getElementById('show-image')
    const modalDate = document.getElementById('show-date')
    const modalSize = document.getElementById('show-size')
    const modalDescription = document.getElementById('show-description')
    const index = id - 1

    modalTitle.textContent = data[index].title
    modalImage.innerHTML = `<img src="${data[index].image_url}" class="card-img-top" alt="Card image">`
    modalDate.textContent = `Date : ${data[index].release_date}`
    modalSize.textContent = `Size : ${data[index].size}`
    modalDescription.textContent = `${data[index].description}`

  }

  dataPanel.addEventListener('click', (event) => {
    const trigger = event.target.parentElement
    showMovie(trigger.dataset.id)
  })

})()