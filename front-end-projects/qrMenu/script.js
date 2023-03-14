const li = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const menu = document.querySelectorAll(".menu > div");
const menudiv = document.querySelector('.menu')
filterMenu(ul,li);
function filterMenu(ul, li) {
    const menu = document.querySelectorAll(".menu > div");
    const menudiv = document.querySelector('.menu')
  
    ul.addEventListener('click', (e) => {
      const clickedLi = e.target;
      // clickedLi öğesi üzerinde checked sınıfını ekleyin
      clickedLi.classList.toggle('checked');
  
      menu.forEach(a => {
        const text = clickedLi.textContent;

        if (a.className.includes(text)) {
          a.style.display = "block";
        } else {
          a.style.display = "none";
        }
      })
  
      // diğer tüm li öğelerinin checked sınıfını kaldırın
      li.forEach((liItem) => {
        if (liItem !== clickedLi && liItem.classList.contains('checked')) {
          liItem.classList.remove('checked');
        }
      });
    });
  }
  

function control(){
    const clickedLi = e.target;
    // clickedLi öğesi üzerinde checked sınıfını ekleyin
    clickedLi.classList.toggle('checked');
    menu.forEach(a=>{
        const text = clickedLi.textContent;

        if (a.className.includes(text)){
            a.style.display = "block";
        } else{
            a.style.display= "none";
        }
    })

    // diğer tüm li öğelerinin checked sınıfını kaldırın
    li.forEach((liItem) => {
        if (liItem !== clickedLi && liItem.classList.contains('checked')) {
            liItem.classList.remove('checked');
        }
    });
}

fetch('data.csv', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8'
    }
  })
  
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n'); // Satırları ayır
    rows.forEach(row=>{
        const columns = row.split(';');

        //CARD

        const card = document.createElement('div');
        card.classList.add('card', `${columns[0]}`);

        //GÖRSEL

        const gorsel = document.createElement('div');
        gorsel.classList.add('gorsel');
        const img = document.createElement('img');
        img.src= `/front-end-projects/qrMenu/images/menu/${columns[1]}.jpg`

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

        const br1 = document.createElement('p');
        br1.classList.add('br');
        // text2 = "<p>Fiyat:</p>"
        // br1.appendChild(document.createTextNode(columns[4]));
        // br1.appendChild(text2);
        br1.innerHTML = `Fiyat: ${(columns[4])}`

        // const br2 = document.createElement('p');
        // br2.classList.add('br');
        // br2.appendChild(document.createTextNode(columns[5]));

        // const br3 = document.createElement('p');
        // br3.classList.add('br');
        // br3.appendChild(document.createTextNode(columns[6]));

        fiyat.appendChild(br1);
        // fiyat.appendChild(br2);
        // fiyat.appendChild(br3);

        metin.appendChild(urunAd);
        metin.appendChild(urunDetay);
        metin.appendChild(fiyat);

        menudiv.appendChild(card);
        card.appendChild(gorsel);
        gorsel.appendChild(img);
        card.appendChild(metin);

        filterMenu(ul,li);

   
    })
        
  });


  


  
  
 