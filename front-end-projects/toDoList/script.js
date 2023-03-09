//---------------------------// BAŞLANGIÇ //---------------------------//

var input = document.querySelector('#myInput');
var alert = document.getElementById("alert");
var taskList = document.getElementById("taskList");
var close = document.getElementsByClassName("close");
var myList = document.getElementsByTagName("li");
var bodyClass = document.querySelector(".bodyClass");
let value = localStorage.getItem("darkModeOn");
let items;

loadItems();
// localStorage.clear();
eventListeners();
controlMode();
updateChecked();




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
    // Bu kısımda checked etiketi LocalStorage'e de kaydediliyor. 
    const taskText = ev.target.textContent;
    const isTaskChecked = localStorage.getItem(taskText) === "checked";
    if (isTaskChecked) {
      localStorage.setItem(taskText, "");
    } else {
      localStorage.setItem(taskText, "checked");
    }
    checkedGuncelle()

  } else if (ev.target.tagName === 'SPAN') {
    ev.target.parentElement.classList.toggle('checked');
    const taskText = ev.target.parentElement.textContent;
    const isTaskChecked = localStorage.getItem(taskText) === "checked";
    if (isTaskChecked) {
      localStorage.setItem(taskText, "");
    } else {
      localStorage.setItem(taskText, "checked");
    }
    checkedGuncelle()
  }
}, false);


function updateChecked() {
for (let i = 0; i < localStorage.length; i++) {
  checkedKeys = []
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
 
  if (value === "checked"){
    checkedKeys.push(key)
    for(let i=0 ; i<taskList.childElementCount; i++){
      const checkedItem = taskList.children[i].textContent
      if (checkedKeys.includes(checkedItem)) {
        taskList.children[i].classList.add('checked');
        console.log(taskList.children[i])
        console.log(checkedKeys)
      } 
    }
  }
  }
}

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



//darkMode fonksiyonu
function toggleDarkMode() {
  bodyClass.classList.toggle("darkMode");
  value = value === "true" ? "false" : "true";
  localStorage.setItem("darkModeOn", value);
  controlMode();
}

function controlMode() {
  if (value === "true") {
    bodyClass.classList.add("darkMode");
    document.querySelector("#mode .fa-sun").style.display = "inline-block"
    document.querySelector("#mode .fa-moon").style.display = "none"
  } else {
    bodyClass.classList.remove("darkMode");
    document.querySelector("#mode .fa-sun").style.display = "none"
    document.querySelector("#mode .fa-moon").style.display = "inline-block"
  }
}


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





