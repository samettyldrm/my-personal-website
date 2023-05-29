console.log("gdfgjdfg");

// CSV dosyasının adı ve yolu
var csvFilePath = "./data.csv";

// CSV dosyasını okumak için XMLHttpRequest kullanma
var xhr = new XMLHttpRequest();
xhr.open("GET", csvFilePath, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var csvData = xhr.responseText;

    // CSV dosyasından satırları ayırma ve diziye aktarma
    var min = 1; // Minimum değer
    var max = 638; // Maksimum değer
    var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

    var lines = csvData.split("\n");
    turDe = lines[randomInt].split(";")[0];
    kelimeDe = lines[randomInt].split(";")[1];
    turTr = lines[randomInt].split(";")[2];
    kelimeTr = lines[randomInt].split(";")[3];

    document.querySelector("#turDe").innerHTML= turDe;
    document.querySelector("#kelimeDe").innerHTML= kelimeDe;
    document.querySelector("#turTr").innerHTML= "( " + turTr + " )";
    document.querySelector("#kelimeTr").innerHTML= kelimeTr;

    console.log(turDe, kelimeDe, turTr, kelimeTr);
  }
};
xhr.send();
