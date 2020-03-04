const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://thecandydatabase.com/category/spicy/'

axios
  .get(url)
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
