// CSV dosyasının adı ve yolu
var csvFilePath = "./data.csv";

var min = 1; // Minimum değer
var max = 638; // Maksimum değer
var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

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

    document.querySelector("#turDe").innerHTML = turDe;
    document.querySelector("#kelimeDe").innerHTML = kelimeDe;
    document.querySelector("#turTr").innerHTML = "( " + turTr + " )";
    document.querySelector("#kelimeTr").innerHTML = kelimeTr;

    console.log(turDe, kelimeDe, turTr, kelimeTr);

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

    // Örnek metni okut
    okuMetni(kelimeDe);

    // Almanca metni okutmak için konuşma fonksiyonu
    function okuMetniTr(metin) {
      const konusmaTr = new SpeechSynthesisUtterance();
      konusmaTr.lang = "tr-TR"; // Almanca dil kodu
      konusmaTr.text = metin;

      // Konuşma seslendiricisi seçimi (opsiyonel)
      const seslendirici = window.speechSynthesis
        .getVoices()
        .find((voice) => voice.lang === "tr-TR");
      if (seslendirici) {
        konusmaTr.voice = seslendirici;
      }

      // Konuşmayı başlat
      speechSynthesis.speak(konusmaTr);
    }

    // Örnek metni okut
    okuMetniTr(kelimeTr);
  }
};
xhr.send();
}

listen();
