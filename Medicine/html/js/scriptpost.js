 window.onload = function() {
 document.getElementById("Save").onclick = function fun() {
 // var x = document.forms["myForm"]["Content"].value;
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