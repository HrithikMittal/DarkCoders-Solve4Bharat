/*const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
*/
/*var request = new XMLHttpRequest();
request.open('POST', 'http://localhost:3000/addblock', true);
request.onclick = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

*/

 window.onload = function() {
 document.getElementById("Save").onclick = function fun() {
 var x = document.forms["myForm"]["Content"].value;
 // var Url = "http://localhost:3000/addblock";
 var xhr = new XMLHttpRequest();
 xhr.open('POST', Url, true);
 xhr.send(x);
 xhr.onreadystatechange = processRequest;
 function processRequest(e) {
 if (xhr.readyState == 4 && xhr.status == 200) {
 // alert(xhr.responseText.headers.Host);
 var response1 = JSON.parse(xhr.responseText);
 
 }
 }
 }
 }