const monthNamesEn = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const dateObject = new Date() //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)
const date = dateObject.getDate()
const month = dateObject.getMonth()
const today = `${monthNamesEn[month]}_${date}`

const show = document.querySelector('.results')
const monthSelc = document.querySelector('#month')
const dateSelc = document.querySelector('#date')
const form = document.querySelector('form')
const resultDate = document.querySelector('#result-date')

let htmlContent = ''
for (i of monthNamesEn) {
  htmlContent = `
  <option>${i}</option>
  `
  monthSelc.innerHTML += htmlContent
}
for (let i = 1; i <= 31; i++) {
  htmlContent =
    `<option>${i}</option>
  `
  dateSelc.innerHTML += htmlContent
}


function display(target) {
  axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=${target}&format=json`)
    .then(function (response) {
      let content = response.data.parse.text["*"]
      let sliceIndex = 'Events\">edit</a><span class=\"mw-editsection-bracket\">]</span></span></h2>\n'
      let start = content.indexOf(sliceIndex)
      // console.log(a.length)
      let end = content.indexOf('\n<h2', start)
      let events = content.slice(start + sliceIndex.length, end)
      show.innerHTML = events
      resultDate.innerHTML = target

    })
    .catch(function (error) { console.log(error); });
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  chosen = `${monthSelc.value}_${dateSelc.value}`
  console.log(chosen)
  display(chosen)
})

display(today)