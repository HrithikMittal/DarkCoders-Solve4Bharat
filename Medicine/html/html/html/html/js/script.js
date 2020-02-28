/*const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
*/

var request = require('request');
request('http://localhost:3000/find',function(error,response,body){
    if(!error && response.statusCode == 200){
        var info = JSON.parse(body)
    }
})
console.log(info);

//var request = new XMLHttpRequest();
//var hey=request.open('POST', 'http://localhost:3000/find', true);
//
//console.log(hey);
//request.open('GET', 'http://localhost:3000/find', true);
//request.onload = function () {
//
//  // Begin accessing JSON data here
//  var data = JSON.parse(this.response);
//  if (request.status >= 200 && request.status < 400) {
//    data.forEach(movie => {
//      const card = document.createElement('div');
//      card.setAttribute('class', 'card');
//
//      const p = document.createElement('p');
//      movie.description = movie.description.substring(0, 300);
//      p.textContent = `${movie.description}...`;
//
//      container.appendChild(card);
//      card.appendChild(p);
//    });
//  } else {
//    const errorMessage = document.createElement('marquee');
//    errorMessage.textContent = `Gah, it's not working!`;
//    app.appendChild(errorMessage);
//  }
//}
//
//request.send();