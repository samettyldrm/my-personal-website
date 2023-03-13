const li = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const menu = document.querySelectorAll(".menu > div");

ul.addEventListener('click', (e) =>{
    const clickedLi = e.target;
    // clickedLi öğesi üzerinde checked sınıfını ekleyin
    clickedLi.classList.toggle('checked');
    console.log(clickedLi.textContent)
    menu.forEach(a=>{
        text = clickedLi.textContent;
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
});

// function control() {

//     li.forEach(a =>{
//         if (a.className === "checked"){
//             const text = a.textContent.trim().toLowerCase();
//             menu.forEach(elem => {
//                 if (elem.classList.contains(text)){
//                     elem.style.display = "auto";
//                 } else {
//                     elem.style.display = "none";
//                 }
//             });
//         } 
//     });
// }


// control();

function fiyatBilgisi(){
    
}