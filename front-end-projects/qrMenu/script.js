const li = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const menu = document.querySelectorAll(".menu > div");
const menudiv = document.querySelector('.menu');

filterMenu(ul, li);

function filterMenu(ul, li) {
  const menu = document.querySelectorAll(".menu > div");
  // const menudiv = document.querySelector('.menu')

  ul.addEventListener('click', (e) => {
    const clickedLi = e.target;
    // clickedLi öğesi üzerinde checked sınıfını ekleyin
    if (clickedLi.tagName === 'LI'){
      clickedLi.classList.toggle('checked');

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
    br.innerHTML = `${(columns[4])}`

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

    const br2 = document.querySelectorAll('.br')

    let cart = 0;

    br2.forEach(a => {
      a.addEventListener('click', () => {
        cart +=1;
        const cartText = document.querySelector('span')
        cartText.innerHTML = `${cart}`

        thisCard = a.parentElement.parentElement.parentElement //Bu kısım bize card'ı veriyor.

        let photoUrl =  thisCard.children[0].children[0].src //fotoğraf linkini aldık.
        photoUrl = photoUrl.substring(21)
        // console.log(photoUrl.substring(21))

        
        console.log(thisCard.children[1].children[0].textContent) //ürün ismini aldık.
        console.log(thisCard.children[1].children[2].children[0].textContent) //ürün fiyatını aldık.

        body = document.querySelector('body');

        cartDiv = document.createElement('div');
        cartDiv.classList.add('cart');
        body.appendChild(cartDiv);

        sepetim = document.createElement('h4');
        sepetim.innerHTML = 'Sepetim';
        cartDiv.appendChild(sepetim);

        cartMetin = document.createElement('div');
        cartMetin.classList.add('cart-metin');
        cartDiv.appendChild(cartMetin);

        cartImg = document.createElement('img');
        cartImg.src = photoUrl
        cartMetin.appendChild(cartImg);
  
        cartUrunAd = document.createElement('p');
        cartUrunAd.classList.add('cart-urunAd');
        cartUrunAd.innerHTML= thisCard.children[1].children[0].textContent;
        cartMetin.appendChild(cartUrunAd);

        cartAdet = document.createElement('p');
        cartAdet.classList.add('cart-adet');
        cartAdet.innerHTML= cart
        cartMetin.appendChild(cartAdet);

        cartFiyat = document.createElement('p');
        cartAdet.classList.add('cart-fiyat');
        cartFiyat.innerHTML= thisCard.children[1].children[2].children[0].textContent;
        cartMetin.appendChild(cartFiyat);


        cartToplam = document.createElement('div');
        cartToplam.classList.add('cart-toplam');
        cartDiv.appendChild(cartToplam);

        cartI = document.createElement('i');
        cartI.classList.add('fa-cart-shopping', 'fa-solid');
        cartToplam.appendChild(cartI);

        pToplamUrun = document.createElement('p');
        pToplamUrun.classList.add('toplamUrun');
        pToplamUrun.innerHTML= `${cart} ürün`
        cartI.appendChild(pToplamUrun);

        pToplamFiyat = document.createElement('p');
        pToplamFiyat.classList.add('toplamFiyat');
        pToplamFiyat.innerHTML= thisCard.children[1].children[2].children[0].textContent;
        cartI.appendChild(pToplamFiyat);




        

        


      })
    })

    

    console.log(cart)


  })


})



