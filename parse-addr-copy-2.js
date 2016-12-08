var fs = require('fs');
var cheerio = require('cheerio')

var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder();

var cityEngName = 'keelung';

console.log("File Name is:", cityEngName);

var city;
  

var cards;

var outerArray = [];
var temp;
var innerArray = [];


fs.readFile('stores-single-city-keelung.html', 'utf8', (err, data) => {
  if (err) throw err;
  // load html
  $ = cheerio.load(data);
  city = $('.blog-title').text();

  cards = $('.city-card');

  var counter = 0
  var cardsSize = cards.length

  cards.each(function(i, card) {
    var addr = $(this).find('div').eq(1).text()

    // create closure
    ;(function (order, card) {
      geocoder.geocode(addr, function (err, data) {
        // 這個結果不會照順序回來但是我不在乎
        // 因為我知道這個 request 在 cards 中的原本的順序
        console.log("formatted addr: %s\n order: %d\n", data[0].formattedAddress, order)
        console.log($('.city-card').eq(order).find('div').eq(1).text())
        $('.city-card').eq(order).find('div').eq(1).text(data[0].formattedAddress)
        counter++
        if (cardsSize === counter) {
          console.log('done')
          // render ...
          // console.log($.html())
        }
      })
    })(i, card)
  });
});
