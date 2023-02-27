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


// function yeniElement() {
//     var li = document.createElement("li"); // yeni bir li öğesi oluştur
//     var input = document.getElementById("myInput"); // input alanından değeri al
//     var text = document.createTextNode(input.value); // input değerini yeni bir text düğümüne dönüştür
//     li.appendChild(text); // text düğümünü li öğesine ekle
//     if (input.value === '') { // eğer input boş ise uyarı göster ve ekleme yapma
//       alertOpen();
//     } else { // input dolu ise ekleme yap ve inputu temizle
//       document.getElementById("myUl").appendChild(li);
//       input.value = "";
//     }
//   }
  






