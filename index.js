const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fse = require('fs-extra')

const app = express()

// const url = 'https://www.goodreads.com/quotes'
const url = 'https://www.imdb.com/india/top-rated-indian-movies/'

const scrape = async () => {
    const res = await axios(url)
    const html = res.data
    const $ = cheerio.load(html)
    // console.log(html)
    const movies = []
    $('.lister-list > tr').each((index, element) => {
        const title = $(element).find('.titleColumn').children().first().text().trim()
        const rating = $(element).find('.ratingColumn').children().first().text()
        movies[index] = {title, rating}
    })
    let counter = 0;
    movies.forEach(movie => {
        fse.appendFile('movies.txt', JSON.stringify(movie) + ' \n')
        counter++;
        if(movies.length == counter){
            console.log("Exported to txt file")
        }
    })

    console.log("The server will automatically close in 5 secs.");
}
scrape()

setTimeout((function() {
    return process.exit(1);
}), 10000);

    
app.listen(PORT, () => console.log(`server has started on ${PORT}`))


