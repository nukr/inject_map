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

  cards.each(function(i, elem) {
    outerArray[i] = $(this).children();
    
    temp = outerArray[i].each(function(j, elem) {
      innerArray[j] = $(this).text();
      
      if(j==1) {
        
        var tempForAddr = city+innerArray[j];

        geocoder.geocode( tempForAddr )
        .then(function(res) {
          console.log( i, tempForAddr, res[0].latitude, res[0].longitude, innerArray[j+1] );
        })
        .catch(function(err) {
          console.log(err);
        });

      }

    });
    
  });

  // Write file

  // fs.writeFile('fruits.html', $.html(), (err) => {
  //   if (err) throw err;
  //   console.log('It\'s saved!');
  // });

});
