//---------------------------// BAŞLANGIÇ //---------------------------//

var input = document.querySelector('#myInput');
var alert = document.getElementById("alert");
var taskList = document.getElementById("taskList");
var myList = document.getElementsByTagName("li");
var bodyClass = document.querySelector(".bodyClass");
let value = localStorage.getItem("darkModeOn");
let items;

loadItems();
addChecked();
eventListeners();
controlMode();
// updateChecked();

function eventListeners() {
  // delete an item
  taskList.addEventListener('click', deleteItem);
  taskList.addEventListener('click', editItem);
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

  var editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-marker"
  // li.appendChild(editIcon);

  // "span" etiketi oluştur ve "li" etiketine ekle
  var span = document.createElement("SPAN");
  var icon = document.createElement("i");
  icon.className = "fas fa-times";
  span.appendChild(icon);
  
  li.appendChild(span);
  if (true) { }
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
    control();
  }

}

// value değeri checked olanları listele
// let checkedKeys = [];



let checkedKeys = [];

function updateChecked() {
  checkedKeys = [];

  for (let i = 0; i < localStorage.length; i++) {
    items = localStorage.getItem("items")
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (value === "checked") {
      checkedKeys.push(key)
      for (let i = 0; i < taskList.childElementCount; i++) {
        const checkedItem = taskList.children[i].textContent
        if (checkedKeys.includes(checkedItem)) {
          taskList.children[i].classList.add('checked');
        }
      }
    }
  }
}

// checkedKeys dizisini başka bir değişkene atayarak dışarıda kullanma
updateChecked();
const myCheckedKeys = checkedKeys;

// Enter ile YeniElement()'e giriş.
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    yeniElement();
  }
});

updateChecked();

function editItem(e){
  if (e.target.className === 'fa-solid fa-marker'){
    console.log("fa solid aktif")
  }
}

function deleteItem(e) {
  if (e.target.className === 'fas fa-times') {
    deletedItem = e.target.parentElement.parentElement;

    updateChecked();
    const myCheckedKeys = checkedKeys;

    if (myCheckedKeys.includes(deletedItem.textContent)) {
      localStorage.removeItem(deletedItem.textContent)

    }

    deletedItem.remove();
    control()

    // delete item from LS
    deleteItemFromLS(e.target.parentElement.parentElement.textContent)
  }

  e.preventDefault()
}



// Task List'de li etiketine tıklayınca checked ekle.
function addChecked() {
taskList.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    // Bu kısımda checked etiketi LocalStorage'e de kaydediliyor. 
    const taskText = ev.target.textContent;
    const isTaskChecked = localStorage.getItem(taskText) === "checked";
    if (isTaskChecked) {
      localStorage.removeItem(taskText);
    } else {
      localStorage.setItem(taskText, "checked");
    }
    updateChecked();

  } else if (ev.target.tagName === 'SPAN') {
    ev.target.parentElement.classList.toggle('checked');
    const taskText = ev.target.parentElement.textContent;
    const isTaskChecked = localStorage.getItem(taskText) === "checked";
    if (isTaskChecked) {
      localStorage.removeItem(taskText);
    } else {
      localStorage.setItem(taskText, "checked");
    }
    updateChecked();
  }
}, false);
}



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


