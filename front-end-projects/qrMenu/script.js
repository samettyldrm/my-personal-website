const li = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const menu = document.querySelectorAll(".menu > div");
const menudiv = document.querySelector('.menu');
const cartIcon = document.querySelector("#cartIcon")
// const cart = document.getElementsByClassName('.cart')

filterMenu(ul, li);

function filterMenu(ul, li) {
  const menu = document.querySelectorAll(".menu > div");
  // const menudiv = document.querySelector('.menu')

  ul.addEventListener('click', (e) => {
    const clickedLi = e.target;
    // clickedLi öğesi üzerinde checked sınıfını ekleyin
    if (clickedLi.tagName === 'LI') {
      clickedLi.classList.add('checked');

      menu.forEach(a => {
        const text = clickedLi.textContent;

        if (a.className.includes(text)) {
          a.style.display = "block";
        } else {
          a.style.display = "none";
        }
      })
      control();

      // diğer tüm li öğelerinin checked sınıfını kaldırın
      li.forEach((liItem) => {
        if (liItem !== clickedLi && liItem.classList.contains('checked')) {
          liItem.classList.remove('checked');
        }
      });
    }

  });
}

function control() {
  const checkedLi = document.querySelector('.checked');
  const menu = document.querySelectorAll('.menu > div')
  if (checkedLi) {
    const text = checkedLi.textContent;
    menu.forEach(a => {
      if (a.className.includes(text)) {
        // console.log(a.className)
        a.style.display = "block";
      }
      else if ('TÜMÜ'.includes(text)) {
        a.style.display = 'block'
      } else {
        a.style.display = "none";
      }

    });
  } else {
    menu.forEach(a => {
      a.style.display = "none";
    });
  }
}



async function getData() {
  const response = await fetch('data.csv', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8'
    }
  });
  const data = await response.text();
  return data;
}

getData().then(data => {
  const rows = data.split('\n'); // Satırları ayır
  rows.forEach(row => {
    const columns = row.split(';');

    //CARD

    const card = document.createElement('div');
    card.classList.add('card', `${columns[0]}`);

    //GÖRSEL

    const gorsel = document.createElement('div');
    gorsel.classList.add('gorsel');
    const img = document.createElement('img');
    img.src = `/front-end-projects/qrMenu/images/menu/${columns[1]}-min.jpg`
    img.loading = 'lazy'

    //METİN

    const metin = document.createElement('div');
    metin.classList.add('metin');

    const urunAd = document.createElement('p');
    urunAd.classList.add('urunAd');
    urunAd.appendChild(document.createTextNode(columns[2]));

    const urunDetay = document.createElement('p');
    urunDetay.classList.add('urunDetay');
    urunDetay.appendChild(document.createTextNode(columns[3]));

    const fiyat = document.createElement('div');
    fiyat.classList.add('fiyat');

    const br = document.createElement('p');
    br.classList.add('br');
    br.innerHTML = `${(columns[4])} ₺ `

    const shopIcon = document.createElement('i');
    shopIcon.classList.add('fa-solid', 'fa-cart-shopping');
    // shopIcon.innerHTML = ' Sepete Ekle';



    fiyat.appendChild(br);
    // fiyat.appendChild(br2);
    // fiyat.appendChild(br3);

    metin.appendChild(urunAd);
    metin.appendChild(urunDetay);
    metin.appendChild(fiyat);
    br.appendChild(shopIcon);

    menudiv.appendChild(card);
    card.appendChild(gorsel);
    gorsel.appendChild(img);
    card.appendChild(metin);
    control();
    filterMenu(ul, li);
  })

  ///SEPET

  class Sepet {
    constructor() {
      this.urunler = []; // sepetin içindeki ürünlerin listesi
      this.toplamFiyat = 0; // sepetin toplam fiyatı
      this.toplamAdet = 0;
    }


    urunCikar(urun) {
      // sepetten bir ürün çıkarma
      const index = this.urunler.indexOf(urun);
      if (index !== -1) {
        this.urunler.splice(index, 1);
        this.toplamFiyat -= urun.fiyat;
      }
    }

    urunSayisi() {
      // sepetin içindeki ürün sayısı
      return this.urunler.length;
    }

    sepetBos() {
      // sepetin boş olup olmadığını kontrol etme
      return this.urunler.length === 0;
    }

    sepetiBosalt() {
      // sepeti tamamen boşaltma
      this.urunler = [];
      this.toplamFiyat = 0;
    }

    urunEkle(ad, fiyat, stok, url) {
      let urunIndex = this.urunler.findIndex(urun => urun.ad === ad);
      if (urunIndex !== -1) {
        this.urunler[urunIndex].stok += stok;
      } else {
        this.urunler.push({
          ad,
          fiyat,
          stok,
          url
        });
      }

      this.toplamFiyat += fiyat * stok;
      this.toplamAdet += 1;
    }
  }

  const br2 = document.querySelectorAll('.br')
  const sepet = new Sepet();
  let cart = 0;
  br2.forEach(a => {
    a.addEventListener('click', () => {
      cart += 1;
      const cartText = document.querySelector('span')
      cartText.innerHTML = `${cart}`

      thisCard = a.parentElement.parentElement.parentElement //Bu kısım bize card'ı veriyor.

      let photoUrl = thisCard.children[0].children[0].src //fotoğraf linkini aldık.

      // photoUrl = photoUrl.substring(21)
      // console.log(photoUrl)
      yeniUrunAd = thisCard.children[1].children[0].textContent;
      yeniUrunFiyat = parseFloat(thisCard.children[1].children[2].children[0].textContent);
      // yeniUrunAdet = 2


      body = document.querySelector('body');
      cartDiv = document.querySelector('.cart')

      if (!cartDiv) {
        body = document.querySelector('body');
        cartDiv = document.createElement('div');
        cartDiv.classList.add('cart');
        body.appendChild(cartDiv);
        sepetim = document.createElement('h4');
        sepetim.innerHTML = 'Sepetim';
        cartDiv.appendChild(sepetim);
      } else {
        cartDiv.innerHTML = ''; // önce içeriği boşaltın
        sepetim = document.createElement('h4');
        sepetim.innerHTML = 'Sepetim'; // yeni içeriği ayarlayın
        cartDiv.appendChild(sepetim);
      }


      sepet.urunEkle(yeniUrunAd, yeniUrunFiyat, 1, photoUrl);
      // console.log(sepet.urunler)
      sepet.urunler.forEach((urun) => {

        cartMetin = document.createElement('div');
        cartMetin.classList.add('cart-metin');
        cartDiv.appendChild(cartMetin);

        cartImg = document.createElement('img');
        cartImg.src = urun.url;
        cartMetin.appendChild(cartImg);

        cartUrunAd = document.createElement('p');
        cartUrunAd.classList.add('cart-urunAd');
        cartUrunAd.innerHTML = urun.ad;
        cartMetin.appendChild(cartUrunAd);

        cartEksi = document.createElement('i');
        cartEksi.classList.add('fa-solid', 'fa-minus');
        cartArti = document.createElement('i');
        cartArti.classList.add('fa-solid', 'fa-plus');
        cartAdet = document.createElement('p');
        cartAdet.classList.add('cart-adet');
        cartAdet.innerHTML += urun.stok;

        cartAdetSpan = document.createElement('span');
        cartAdetSpan.appendChild(cartEksi);
        cartAdetSpan.appendChild(cartAdet);
        cartAdetSpan.appendChild(cartArti);

        cartUrunAd.appendChild(cartAdetSpan);

        cartFiyat = document.createElement('p');
        cartFiyat.classList.add('cart-fiyat');
        cartFiyat.innerHTML = `${urun.fiyat * urun.stok} ₺`
        cartMetin.appendChild(cartFiyat);

      })

      cartToplam = document.createElement('div');
      cartToplam.classList.add('cart-toplam');
      cartDiv.appendChild(cartToplam);

      cartI = document.createElement('i');
      cartI.classList.add('fa-cart-shopping', 'fa-solid');
      cartToplam.appendChild(cartI);

      pToplamUrun = document.createElement('p');
      pToplamUrun.classList.add('toplamUrun');
      // console.log(sepet.urunSayisi())
      pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
      cartI.appendChild(pToplamUrun);

      pToplamFiyat = document.createElement('p');
      pToplamFiyat.classList.add('toplamFiyat');
      pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
      cartI.appendChild(pToplamFiyat);

      faPlus = document.querySelectorAll('.fa-plus');
      faPlus.forEach(a => {
        a.addEventListener('click', () => {
          tiklanilanDiv = a.parentElement.parentElement.innerHTML.split('<span>')[0]
          const sepetUrun = sepet.urunler.find(urun => urun.ad === tiklanilanDiv);
          if (sepetUrun) {
            sepetUrun.stok += 1;
            a.parentElement.children[1].innerHTML = sepetUrun.stok;
            a.parentElement.parentElement.parentElement.children[2].innerHTML = `${sepetUrun.fiyat * sepetUrun.stok} ₺`
            sepet.toplamFiyat += sepetUrun.fiyat;
            sepet.toplamAdet += 1;
            pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
            pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
          }
        })
      });

      faMinus = document.querySelectorAll('.fa-minus');
      faMinus.forEach(a => {
        a.addEventListener('click', () => {
          tiklanilanDiv = a.parentElement.parentElement.innerHTML.split('<span>')[0]
          const sepetUrun = sepet.urunler.find(urun => urun.ad === tiklanilanDiv);
          if (sepetUrun) {
            if (sepetUrun.stok>1){
              sepetUrun.stok -= 1;
              a.parentElement.children[1].innerHTML = sepetUrun.stok;
              a.parentElement.parentElement.parentElement.children[2].innerHTML = `${sepetUrun.fiyat * sepetUrun.stok} ₺`
              sepet.toplamFiyat -= sepetUrun.fiyat;
              sepet.toplamAdet -= 1;
              pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
              pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
            }
            
          }
        })
      });


      // faPlus.addEventListener('click', () => {
      //   console.log(faPlus)
      // })

      // cartArti.addEventListener('click', () => {
      //   console.log(cartArti)
      //   sepet.urun.stok += 1;
      //   cartAdet.innerHTML = urun.stok;
      //   cartFiyat.innerHTML = `${urun.fiyat * urun.stok} ₺` 
      //   sepet.toplamFiyat += urun.fiyat;
      //   sepet.toplamAdet += 1;
      //   pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
      //   pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
      // })

      // cartEksi.addEventListener('click', () => {
      //   if (urun.stok>1){
      //     sepet.urun.stok -= 1;
      //   cartAdet.innerHTML = urun.stok;
      //   cartUrunAd.appendChild(cartAdetSpan);
      //   cartFiyat.innerHTML = `${urun.fiyat * urun.stok} ₺` 
      //   sepet.toplamFiyat -= urun.fiyat;
      //   sepet.toplamAdet -= 1;
      //   pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
      //   pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
      //   }})

    })
  })
})

cartIcon.addEventListener('click', () => {
  cartDiv.classList.toggle('open');
})


