
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

//Alert kapat fonksiyonu

function alertClose() {
    document.getElementById("alert").style.display = "none";
}

// Ekle butonuna tıklayınca yeni bir li elementi ekle

function yeniElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    var alert = document.getElementById("alert")
    li.appendChild(t);
    if (inputValue === '') {
        alert.style.display = "flex";
        // alert("Bi şeyler yazmalısın dostum!");
    } else {
        var liTag = document.getElementsByTagName("li")
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


//Eğer li etiketlerinin hepsinin display'i none ise p etiketinin displayini block yap.

var ul = document.querySelector("ul");
var list = ul.getElementsByTagName("li");
var bos = document.getElementById("bos");
// alert(list.length)

// alert(list.length)
var i;
noneCount = 0;
for (i= 0; i<list.length; i++){
    if (list[i].style.display == "none"){
        // alert(list[i])
        noneCount++;
    }
}

// alert(noneCount)

if (noneCount==0){
    bos.style.display= "none";
}else {
    bos.style.display= "block";
}

// alert(noneCount)




