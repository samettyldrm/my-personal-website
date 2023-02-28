
//Close butonu oluşturma ve listelere ekleme
var myNodelist = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

//Close butonuna tıklayınca li'ler'in displayleri kapatılacak.
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

//Tıklanılan li etiketlerinin classlist'ine checked ekle.
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);



  var toggle = document.querySelector('#mode');

  toggle.addEventListener('click', function() {
    var on = toggle.classList.toggle('on');
    document.querySelector('.fa-toggle-on').style.display = on ? 'inline-block' : 'none';
    document.querySelector('.fa-toggle-off').style.display = on ? 'none' : 'inline-block';
  });



//Alert kapat fonksiyonu

function alertClose() {
    document.getElementById("alert").style.display = "none";
}

// Ekle butonuna tıklayınca yeni bir li elementi ekle


// function yeniElement() {
//     var faSolid = document.querySelector(".fa-solid");
//     var faRegular = document.querySelector(".fa-regular");
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("myInput").value;
//     var t = document.createTextNode(inputValue);
//     var alert = document.getElementById("alert")
//     li.appendChild(t);
//     if (inputValue === '') {
//         alert.style.display = "flex";
//         // alert("Bi şeyler yazmalısın dostum!");
//     } else {
//         document.getElementById("myUl").appendChild(li);
//         // document.getElementById("myUl").append(faSolid)
//         // document.getElementById("myUl").append(faRegular)
//     }
//     document.getElementById("myInput").value = "";

//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);

//     for (i = 0; i < close.length; i++) {
//         close[i].onclick = function () {
//             var div = this.parentElement;
//             div.style.display = "none";
//         }
//     }
// }

function yeniElement() {
    var faCircle = document.createElement("i");
    faCircle.classList.add("fa-solid", "fa-circle-check");
    var faCheck = document.createElement("i");
    faCheck.classList.add("fa-regular", "fa-circle");

    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(" " + inputValue);
    var alert = document.getElementById("alert");
    li.appendChild(faCircle);
    li.appendChild(faCheck);
    li.appendChild(t);
    if (inputValue === '') {
        alert.style.display = "flex";
        // alert("Bi şeyler yazmalısın dostum!");
    } else {
        document.getElementById("myUl").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}


//Enter tuşu ile input'u YeniElement()e yönlendir

var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    yeniElement();
  }
});


function toggleDarkMode() {
    var bodyClass = document.querySelector(".bodyClass");
    bodyClass.classList.toggle("darkMode");
  }
  
  var toggleButton = document.getElementById("mode");
  toggleButton.addEventListener("click", toggleDarkMode);
  


//KAYDETME

// Formu seçin
var form = document.querySelector('bodyClass');

// LocalStorage'da kaydedilen verileri yükleyin
if (localStorage.getItem('formValues')) {
  form.innerHTML = localStorage.getItem('formValues');
}

// Form alanlarında değişiklik olduğunda verileri kaydedin
form.addEventListener('change', function() {
  localStorage.setItem('formValues', form.innerHTML);
});

// Formu gönderildiğinde kaydedilen verileri silin
form.addEventListener('submit', function() {
  localStorage.removeItem('formValues');
});
