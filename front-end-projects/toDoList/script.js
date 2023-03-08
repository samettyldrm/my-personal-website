//---------------------------// BAŞLANGIÇ //---------------------------//

var input = document.querySelector('#myInput');
var alert = document.getElementById("alert");
var taskList = document.getElementById("taskList");
var close = document.getElementsByClassName("close");
var myList = document.getElementsByTagName("li");
var bodyClass = document.querySelector(".bodyClass");
let items;

loadItems();
// localStorage.clear();
eventListeners();


function eventListeners() {
  // delete an item
  taskList.addEventListener('click', deleteItem);
}
//---------------------------// BAŞLANGIÇ //---------------------------//

//---------------------------// Local Storage Start //---------------------------//

// Item'ları yükle.
function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

// Local Storage'den item getir.
function getItemsFromLS() {
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

// Local Storage'ye gönder.
function setItemToLS(text) {
  items = getItemsFromLS();
  console.log(input.value)
  items.push(text);
  localStorage.setItem('items', JSON.stringify(items));
}

// Local Storage'dan item sil

function deleteItemFromLS(text) {
  items = getItemsFromLS();
  var index = items.indexOf(text);
  if (index !== -1) {
    items.splice(index, 1);
  }
  localStorage.setItem('items', JSON.stringify(items));
}


//---------------------------// Local Storage End //---------------------------//

//CLOSE SİMGESİ EKLE

//Tüm "li" etiketlerini al

//---------------------------// ITEM EKLE - SİL //---------------------------//

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
function createItem(text) {
  var faCircle = document.createElement("i");
  faCircle.classList.add("fa-solid", "fa-circle-check");
  var faCheck = document.createElement("i");
  faCheck.classList.add("fa-regular", "fa-circle");
  const p = document.createElement("span");
  const li = document.createElement("li");
  li.appendChild(faCircle);
  li.appendChild(faCheck);
  p.appendChild(document.createTextNode(text));
  li.appendChild(p)
  taskList.appendChild(li);

  // "span" etiketi oluştur ve "li" etiketine ekle
  var span = document.createElement("SPAN");
  var icon = document.createElement("i");
  icon.className = "fas fa-times";
  span.className = "close";
  span.appendChild(icon);
  li.appendChild(span);
}

// yeniElement() fonksiyonu
function yeniElement() {
  if (input.value === '') {
    input.style.pointerEvents = "none"
    input.style.userSelect = "none"
    alert.style.display = "flex";
  } else {
    createItem(input.value);
    setItemToLS(input.value);
    input.value = "";
    control()
  }

}

// Enter ile YeniElement()'e giriş.
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    yeniElement();
  }
});

var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    // var div = this.parentElement;
    // div.style.display = "none";
    deleteItem(e)

  }

}


function deleteItem(e) {
  if (e.target.className === 'fas fa-times') {
    if (confirm("Gerçekten silmek mi istiyorsun?")) {
      e.target.parentElement.parentElement.remove();
      console.log(e.target.parentElement)
      control()

      // delete item from LS
      deleteItemFromLS(e.target.parentElement.parentElement.textContent)
      console.log(e.target.parentElement.parentElement.textContent)
    }
  }

  e.preventDefault()
}


// Task List'de li etiketine tıklayınca checked ekle.

taskList.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');

  } else if (ev.target.tagName === 'SPAN') {
    ev.target.parentElement.classList.toggle('checked');
  }
}, false);

//---------------------------// ITEM EKLE - SİL //---------------------------//

//---------------------------// ALARM //---------------------------//

//Alert kapat fonksiyonu
function alertClose() {
  document.getElementById("alert").style.display = "none";
  input.style.pointerEvents = "auto"
  input.style.userSelect = "auto"
}

//---------------------------// ALARM //---------------------------//

//---------------------------// Dark Mode - Toggle //---------------------------//

// Önce local storage'daki mevcut değeri alın
let value = localStorage.getItem("darkModeOn");

//darkMode fonksiyonu
function toggleDarkMode() {
  bodyClass.classList.toggle("darkMode");
// Değer true ise false, false ise true olarak değiştirin
value = value === "true" ? "false" : "true";
// Değiştirilmiş değeri local storage'a kaydedin
localStorage.setItem("darkModeOn", value);
}

if (value==="true"){
  bodyClass.classList.add("darkMode")
} else {
  bodyClass.classList.remove("darkMode")
}

// Toggle
var toggle = document.querySelector('#mode');
toggle.addEventListener('click', function () {
  var on = toggle.classList.toggle('sun');
  document.querySelector('.fa-sun').style.display = on ? 'inline-block' : 'none';
  document.querySelector('.fa-moon').style.display = on ? 'none' : 'inline-block';
  }
);

//---------------------------// Dark Mode - Toggle //---------------------------//

//---------------------------// Control //---------------------------//

function control() {
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

//---------------------------// Control //---------------------------//





