const li = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const menu = document.querySelectorAll(".menu > div");
const menudiv = document.querySelector('.menu');
const cartIcon = document.querySelector("#cartIcon");
const navbar = document.querySelector('.navbar')

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
    img.src = `/front-end-projects/qrMenu/images/menu/${columns[1]}-min.webp`
    img.width = img.width / 10;
    img.height = img.height / 10;
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

    fiyat.appendChild(br);

    metin.appendChild(urunAd);
    metin.appendChild(urunDetay);
    metin.appendChild(fiyat);
    br.appendChild(shopIcon);

    menudiv.appendChild(card);
    card.appendChild(gorsel);
    gorsel.appendChild(img);
    card.appendChild(metin);
  })
  control();
  filterMenu(ul, li);

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
        this.toplamFiyat -= urun.fiyat * urun.stok;
        this.toplamAdet -= urun.stok;
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

    urunEkle(ad, detay, fiyat, stok, url, id) {
      let urunIndex = this.urunler.findIndex(urun => urun.id === id);
      // let urunAdet = this.urunler.findIndex(urun => urun.stok === stok);
      if (urunIndex !== -1) {
        this.urunler[urunIndex].stok += stok;
      } else {
        this.urunler.push({
          ad,
          detay,
          fiyat,
          stok,
          url,
          id
        });
      }

      this.toplamFiyat += fiyat * stok;
      this.toplamAdet += 1;
    }
  }

  const br2 = document.querySelectorAll('.br')
  const sepet = new Sepet();
  // let cart = 0;
  br2.forEach(a => {

    a.addEventListener('click', () => {
      body = document.querySelector('body');
      sepeteEklendi = document.querySelector('.sepeteEklendi');
      sepeteEklendi = document.createElement('div');
      sepeteEklendi.innerHTML = 'Ürününüz sepete eklendi!';
      sepeteEklendi.classList.add('sepeteEklendi');
      body.appendChild(sepeteEklendi);

      setTimeout(function () {
        sepeteEklendi.remove();
      }, 6000);

      // sepet.toplamAdet += 1;
      const cartText = document.querySelector('span')


      thisCard = a.parentElement.parentElement.parentElement //Bu kısım bize card'ı veriyor.

      let photoUrl = thisCard.children[0].children[0].src //fotoğraf linkini aldık.
      yeniUrunAd = thisCard.children[1].children[0].textContent;
      yeniUrunDetay = thisCard.children[1].children[1].textContent;
      yeniUrunFiyat = parseFloat(thisCard.children[1].children[2].children[0].textContent);
      yeniUrunId = yeniUrunAd + "_" + yeniUrunDetay


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


      sepet.urunEkle(yeniUrunAd, yeniUrunDetay, yeniUrunFiyat, 1, photoUrl, yeniUrunId);
      cartText.innerHTML = `${sepet.toplamAdet}`;


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

        cartKapat = document.createElement('i');
        cartKapat.classList.add('fa-solid', 'fa-xmark');

        cartUrunDetay = document.createElement('p');
        cartUrunDetay.classList.add('cart-urunDetay');
        cartUrunDetay.innerHTML = urun.detay;
        cartUrunAd.appendChild(cartUrunDetay);
        cartMetin.appendChild(cartKapat);

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
      pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
      cartI.appendChild(pToplamUrun);

      pToplamFiyat = document.createElement('p');
      pToplamFiyat.classList.add('toplamFiyat');
      pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
      cartI.appendChild(pToplamFiyat);

      siparisVer = document.createElement('button');
      siparisVer.id = 'siparisVer';
      siparisVer.type = 'submit'
      siparisVer.innerHTML = 'Sipariş Ver';
      cartI.appendChild(siparisVer);

      siparisVer.addEventListener('click', () => {
        console.log(siparisVer.parentElement.parentElement.parentElement);
        console.log(sepet.urunler.forEach((urun) => {
          // console.log(urun.ad, urun.detay, urun.stok, urun.fiyat, urun.stok*urun.fiyat);
          const metin = `${urun.ad} - ${urun.detay} - ${urun.stok, urun.fiyat} - Toplam Fiyat: ${urun.stok * urun.fiyat} - Sepet Toplam: ${sepet.toplamFiyat}`;
          console.log(metin);

        }))
      })


      // cartMetin = document.querySelector('.cart-metin');
      function cartControl() {
        console.log(pToplamUrun)
        if (pToplamUrun.innerHTML === '0 ürün') {
          cartDiv.innerHTML = '<div class= "bosNot" >Sepet şu an boş. Hadi bir ürün ekle!</div>'

        }
      }

      faPlus = document.querySelectorAll('.fa-plus');
      faPlus.forEach(a => {
        a.addEventListener('click', () => {
          tiklanilanDiv = a.parentElement.parentElement.innerHTML.split('<p class')[0]
          tiklanilanDetay = a.parentElement.parentElement.children[0].innerHTML
          const urunId = tiklanilanDiv + "_" + tiklanilanDetay;
          const sepetUrun = sepet.urunler.find(urun => urun.id === urunId);
          if (sepetUrun) {
            sepetUrun.stok += 1;
            a.parentElement.children[1].innerHTML = sepetUrun.stok;
            a.parentElement.parentElement.parentElement.children[3].innerHTML = `${sepetUrun.fiyat * sepetUrun.stok} ₺`
            sepet.toplamFiyat += sepetUrun.fiyat;
            sepet.toplamAdet += 1;
            pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
            pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
            cartText.innerHTML = `${sepet.toplamAdet}`
            cartControl();
          }
        })
      });

      faMinus = document.querySelectorAll('.fa-minus');
      faMinus.forEach(a => {
        a.addEventListener('click', () => {
          tiklanilanDiv = a.parentElement.parentElement.innerHTML.split('<p class')[0]
          tiklanilanDetay = a.parentElement.parentElement.children[0].innerHTML
          const urunId = tiklanilanDiv + "_" + tiklanilanDetay;
          const sepetUrun = sepet.urunler.find(urun => urun.id === urunId);
          if (sepetUrun) {
            if (sepetUrun.stok > 1) {
              sepetUrun.stok -= 1;
              a.parentElement.children[1].innerHTML = sepetUrun.stok;
              a.parentElement.parentElement.parentElement.children[3].innerHTML = `${sepetUrun.fiyat * sepetUrun.stok} ₺`
              sepet.toplamFiyat -= sepetUrun.fiyat;
              sepet.toplamAdet -= 1;
              pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
              pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
              cartText.innerHTML = `${sepet.toplamAdet}`
              cartControl();
            }

          }
        })
      });

      faXmark = document.querySelectorAll('.fa-xmark');
      faXmark.forEach(a => {

        a.addEventListener('click', () => {
          tiklanilanDiv = a.parentElement.children[1].innerHTML.split('<p class')[0]
          tiklanilanDetay = a.parentElement.children[1].children[0].innerHTML
          const urunId = tiklanilanDiv + "_" + tiklanilanDetay;
          const sepetUrun = sepet.urunler.find(urun => urun.id === urunId);
          if (sepetUrun) {
            let urununSepettekiAdeti = sepetUrun.stok; //2
            sepetUrun.stok = 0; // stok sıfır yapılır
            sepet.urunCikar(sepetUrun); // ürünü sepetten çıkar
            sepet.toplamFiyat -= sepetUrun.fiyat * urununSepettekiAdeti;
            sepet.toplamAdet -= urununSepettekiAdeti;
            pToplamFiyat.innerHTML = `${sepet.toplamFiyat} ₺`
            pToplamUrun.innerHTML = `${sepet.toplamAdet} ürün`
            cartText.innerHTML = `${sepet.toplamAdet}`
            a.parentElement.remove();
            console.log(pToplamFiyat)
            cartControl()
          }
        })
      });

    })
  })
})

cartDiv = document.querySelector('.cart');

cartIcon.addEventListener('click', () => {
  if (cartDiv) {
    cartDiv.classList.toggle('open');
  } else {
    body = document.querySelector('body');
    cartDiv = document.createElement('div');
    cartDiv.classList.add('cart');
    cartDiv.innerHTML = '<div class= "bosNot" >Sepet şu an boş. Hadi bir ürün ekle!</div>'
    body.appendChild(cartDiv);

  }
})

mobileMenu = document.querySelector('#mobileMenu');

mobileMenu.addEventListener('click', () => {
  navbar.classList.toggle('openMenu');
  mobileMenu.classList.toggle('fa-xmark')

})







