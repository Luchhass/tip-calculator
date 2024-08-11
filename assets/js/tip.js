let hesapTutari = document.querySelector('.bill');
let bahsisButonu = document.querySelectorAll('.select_tip');
let toplamSonuc = document.querySelector('.total');
let hesapSifirlama = document.querySelector('.reset');
let kacKisi = document.querySelector('.people');
let kisiBasiBahsis = document.querySelector('.tip_amount');
let ozelBahsis = document.querySelector('.custom_tip');
let kisiHatasi = document.querySelector('.people_error');

// SELECT TİP BUTTONS

function handleTipClick() {
    let bahsisTutari = (Number(hesapTutari.value) / 100) * parseInt(this.innerText);
    sonuc = bahsisTutari + Number(hesapTutari.value);
    toplamSonuc.innerText = '$' + sonuc;

    kisiBasiBahsis.innerText = '$' + Number(sonuc / Number(kacKisi.value));


    if (kacKisi.value == '' || kacKisi.value == null) {
        kacKisi.style.border = '2px solid #E17052';
        kisiHatasi.innerText = 'Can’t be zero';
        kisiHatasi.style.color = '#E17052'
    } else {
        kacKisi.style.border = 'transparent';
        kisiHatasi.innerText = 'transparent';
        kisiHatasi.style.color = 'transparent'
    }

}

for(let i = 0; i < bahsisButonu.length; i++) {
    bahsisButonu[i].addEventListener('click', handleTipClick);
}


// CUSTOM TİP BUTTON

function handleCustomTipClick() {
    let bahsisTutari = (Number(hesapTutari.value) / 100) * (Number(ozelBahsis.value));
    sonuc = bahsisTutari + Number(hesapTutari.value);
    toplamSonuc.innerText = '$' + sonuc;

    kisiBasiBahsis.innerText = '$' + Number(bahsisTutari / Number(kacKisi.value));
}


ozelBahsis.addEventListener('keyup', handleCustomTipClick);

// RESET BUTTON

function handleResetClick() {
    hesapTutari.value = '';
    kacKisi.value = '';
    toplamSonuc.innerText = '$0.00';
    kisiBasiBahsis.innerText = '$0.00';
    sonuc = 0;
}

hesapSifirlama.addEventListener('click', handleResetClick);
