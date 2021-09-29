const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fse = require('fs-extra')

const app = express()

const url = 'https://www.theguardian.com/uk'

// axios(url)
//     .then(res => {
//         const html = res.data
//         const $ = cheerio.load(html)
//         const articles = []

//         $('.fc-item__title', html).each(function() {
//             const title = $(this).text()
//             const url = $(this).find('a').attr('href')

//             articles.push({
//                 title,
//                 url
//             })
//         })
//         console.log(articles)
//         articles.forEach(article => {
//             fse.appendFile('articles.txt', JSON.stringify(article) + ' \n', (err) => {
//                 if(err) {
//                     console.log(err)
//                 } else {
//                     console.log("success")
//                 }
//             })
//         })
//     })
//     .catch(err => console.log(err))


const ans = async () => {
    const res = await axios(url)
    const html = res.data
    const $ = cheerio.load(html)
    const articles = []

    $('.fc-item__title', html).each(function() {
        const title = $(this).text()
        const url = $(this).find('a').attr('href')

        articles.push({
            title,
            url
        })
    })
    // console.log(articles)

    articles.forEach(article => {
        fse.appendFile('articles.txt', JSON.stringify(article) + ' \n', (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log("success")
            }
        })
    })

    console.log("The server will automatically close in 5 secs");
}
ans()

setTimeout((function() {
    return process.exit(1);
}), 10000);

    
app.listen(PORT, () => console.log(`server has started on ${PORT}`))


