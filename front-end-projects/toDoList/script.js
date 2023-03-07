var input = document.getElementById('myInput');
var alert = document.getElementById("alert");
var taskList = document.getElementById("taskList");
var close = document.getElementsByClassName("close");
var myList = document.getElementsByTagName("li");

//yeniElement() fonksiyonu


//CLOSE SİMGESİ EKLE

//Tüm "li" etiketlerini al

var i;
for (i = 0; i < myList.length; i++) {
  var span = document.createElement("SPAN")
  span.className = "close";
  var icon = document.createElement("i");
  icon.className = "fas fa-times";
  span.appendChild(icon);
  myList[i].appendChild(span);
}

// Item Oluştur

function createItem(){
  var faCircle = document.createElement("i");
  faCircle.classList.add("fa-solid", "fa-circle-check");
  var faCheck = document.createElement("i");
  faCheck.classList.add("fa-regular", "fa-circle");

  var li = document.createElement("li"); 
  var t = document.createTextNode(" " + input.value);
  li.appendChild(faCircle);
  li.appendChild(faCheck);
  li.appendChild(t);

  if (input.value === '') {
    input.style.pointerEvents= "none"
    input.style.userSelect= "none"
    alert.style.display = "flex";
  } else {
    // taskList'e li etiketini ekle.
    taskList.appendChild(li);
  }

  // "myInput" alanının içeriğini temizle
  input.value = "";

  // "span" etiketi oluştur ve "li" etiketine ekle
  var span = document.createElement("SPAN");
  var icon = document.createElement("i");
  icon.className = "fas fa-times";
  span.className = "close";
  span.appendChild(icon);
  li.appendChild(span);
}


function yeniElement() {
  createItem()
  control()
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      control()
      input.style.pointerEvents= "auto"
      input.style.userSelect= "auto"
    }
  }
  
}


  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      yeniElement();
    }
  });

//Close butonuna tıklayınca li'ler'in displayleri kapatılacak.
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
    control()
    
  }

}

// Task List'de li etiketine tıklayınca checked ekle.

// var listItems = document.querySelectorAll('#taskList li');

// for (var i = 0; i < listItems.length; i++) {
//   listItems[i].addEventListener('click', function() {
//     this.classList.toggle('checked');
//     console.log(this.classList)
//   });
// }

taskList.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);







// Toggle
var toggle = document.querySelector('#mode');

toggle.addEventListener('click', function () {
  var on = toggle.classList.toggle('sun');
  document.querySelector('.fa-sun').style.display = on ? 'inline-block' : 'none';
  document.querySelector('.fa-moon').style.display = on ? 'none' : 'inline-block';
});



//Alert kapat fonksiyonu
function alertClose() {
  document.getElementById("alert").style.display = "none";
  input.style.pointerEvents= "auto"
  input.style.userSelect= "auto"
  
}

//darkMode fonksiyonu
function toggleDarkMode() {
  var bodyClass = document.querySelector(".bodyClass");
  bodyClass.classList.toggle("darkMode");
}

//ToggleButton
var toggleButton = document.getElementById("mode");
toggleButton.addEventListener("click", toggleDarkMode);


function control(){
  var li = document.querySelectorAll("li");
  var bos = document.getElementById("bos");
  var allNone = true;
  
  for (var i = 0; i < li.length; i++) {
    if (li[i].style.display !== "none") {
      allNone = false;
      break;
    }
  }
  
  if (allNone) {
    bos.style.display = "block";
  } else {
    bos.style.display = "none";
  }

}







