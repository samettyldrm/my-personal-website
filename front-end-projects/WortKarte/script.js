//info

function showInfo() {
  document.querySelector("#info").style.right = "1rem";
}

function closeInfo() {
  document.querySelector("#info").style.right = "-100rem";
}

//update

function update() {
  // CSV dosyasının adı ve yolu
  var csvFilePath = "./data.csv";

  var min = 1; // Minimum değer
  var max = 3273; // Maksimum değer
  var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

  //listen

  function listen() {
    // CSV dosyasını okumak için XMLHttpRequest kullanma
    var xhr = new XMLHttpRequest();
    xhr.open("GET", csvFilePath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var csvData = xhr.responseText;

        // CSV dosyasından satırları ayırma ve diziye aktarma

        var lines = csvData.split("\n");
        turDe = lines[randomInt].split(";")[0];
        kelimeDe = lines[randomInt].split(";")[1];
        turTr = lines[randomInt].split(";")[2];
        kelimeTr = lines[randomInt].split(";")[3];
        niveau = lines[randomInt].split(";")[4];

        document.querySelector("#turDe").innerHTML = turDe;
        document.querySelector("#kelimeDe").innerHTML = kelimeDe;
        document.querySelector("#turTr").innerHTML = "( " + turTr + " )";
        document.querySelector("#kelimeTr").innerHTML = kelimeTr;
        // document.querySelector("#kelimeTr").innerHTML = "Anlamını görmek için mouse ile üzerine gel."
        document.querySelector("#niveau").innerHTML = niveau;

        document.querySelector("#kelimeTr").addEventListener("mouseover", function() {
          document.querySelector("#kelimeTr").innerHTML=kelimeTr
          // document.querySelector("#kelimeTr").style.fontSize= "100%";
          // okuMetniTr(kelimeTr);
        })

        

        // Almanca metni okutmak için konuşma fonksiyonu
        function okuMetni(metin) {
          const konusma = new SpeechSynthesisUtterance();
          konusma.lang = "de-DE"; // Almanca dil kodu
          konusma.text = metin;

          // Konuşma seslendiricisi seçimi (opsiyonel)
          const seslendirici = window.speechSynthesis
            .getVoices()
            .find((voice) => voice.lang === "de-DE");
          if (seslendirici) {
            konusma.voice = seslendirici;
          }

          // Konuşmayı başlat
          speechSynthesis.speak(konusma);
        }

        document.querySelector("#dinle").onclick = function () {
          okuMetni(kelimeDe);
        };

        // İlgili div öğesini seçin (div'in id'sini veya başka bir seçiciyi kullanın)

        // Örnek metni okut
        // okuMetni(kelimeDe);

        // // Türkçe  metni okutmak için konuşma fonksiyonu
        // function okuMetniTr(metin) {
        //   const konusmaTr = new SpeechSynthesisUtterance();
        //   konusmaTr.lang = "tr-TR"; // Almanca dil kodu
        //   konusmaTr.text = metin;

        //   // Konuşma seslendiricisi seçimi (opsiyonel)
        //   const seslendirici = window.speechSynthesis
        //     .getVoices()
        //     .find((voice) => voice.lang === "tr-TR");
        //   if (seslendirici) {
        //     konusmaTr.voice = seslendirici;
        //   }

        //   // Konuşmayı başlat
        //   speechSynthesis.speak(konusmaTr);
        // }

        function TestModeOn() {
          var testModeBody = document.querySelector("body").classList;
          var htmlElement = document.querySelector("html");
          var kelimeTrDiv = document.querySelector("#kelimeTr")

          if (testModeBody.contains("on")) {
            console.log("mode: On");
            
            htmlElement.style.backgroundColor = "#fc5a5a"
            htmlElement.style.backgroundImage = "linear-gradient(45deg, #f5745d 0%, #8d2c2c 100%)";
            document.querySelector("#testMode").innerHTML = "Test modunu kapat!"
            document.querySelector("#wortkarte").innerHTML = '<i class="fa-solid fa-diamond"></i> Wortkarte - Test Modu Aktif <i class="fa-solid fa-square-check"></i>'
            document.querySelector("#kelimeTr").innerHTML = "Anlamını görmek için mouse ile üzerine gel."
            
            kelimeTrDiv.style.color = "#fc5a5a"
            kelimeTrDiv.style.cursor = "pointer"
            kelimeTrDiv.addEventListener("mouseover", function() {
              kelimeTrDiv.innerHTML=kelimeTr
            kelimeTrDiv.addEventListener("mouseout", function() {
                kelimeTrDiv.innerHTML = "Anlamını görmek için mouse ile üzerine gel."
              
              })
            
              
            })

          } else {
            console.log("mode: Off")

            kelimeTrDiv.style.color = "#6696ef"
            htmlElement.style.backgroundColor = "#8BC6EC"
            htmlElement.style.backgroundImage = "linear-gradient(90deg, #8BC6EC 0%, #393fa6 100%)";
            document.querySelector("#testMode").innerHTML = "Test modunu aç!"
            document.querySelector("#wortkarte").innerHTML = '<i class="fa-solid fa-diamond"></i> Wortkarte'
            kelimeTrDiv.innerHTML = kelimeTr
            kelimeTrDiv.style.cursor = "auto"

            kelimeTrDiv.addEventListener("mouseover", function() {
              document.querySelector("#kelimeTr").innerHTML=kelimeTr
            kelimeTrDiv.addEventListener("mouseout", function() {
                kelimeTrDiv.innerHTML = kelimeTr
              
              })
            
              
            })
            
          }
        }

        TestModeOn();

        //TestModeOn

        document.querySelector("#testMode").onclick = function () {
          document.querySelector("body").classList.toggle("on");
          var htmlElement = document.querySelector("body");
            htmlElement.style.backgroundColor = "black"
          TestModeOn();
        };
      }
    };
    xhr.send();
  }

  listen();
}

update();
