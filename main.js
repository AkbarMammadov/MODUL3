const url = 'https://api.exchangerate.host/latest';

let currentCurr = 'RUB', exchangeCurr = 'USD'
let currVal = 1;

const inpleft = document.querySelector('.i1');
const inpRight = document.querySelector('.i12');

const currLeft = document.querySelector('.bilmedim');
const currRight = document.querySelector('.kubik');

const btnsLeft = document.querySelector('.duymeb').children;
for (let i = 0; i < btnsLeft.length; i++) {
    btnsLeft[i].addEventListener('click', changeCurrentCurrency);
}

const btnsRight = document.querySelector('.duymeb1').children;
for (let i = 0; i < btnsRight.length; i++) {
    btnsRight[i].addEventListener('click', changeExchangeCurrency);
}

async function loadCurrency(a, b) {
    if (a === b) return 1;
    const query = `?base=${a}&symbols=${b};`
    const res = await fetch(url + query);
    const data = await res.json();
    return data.rates[b];
}

function getdata(c, e, l, r) {
    loadCurrency(c, e)
        .then(data => {
            currVal = data.toFixed(4);
            const val = parseFloat(l.value);
            r.value = (val * currVal).toFixed(4);
            currLeft.innerText = `1 ${c} = ${currVal} ${e}`;
            const excVal = (1 / currVal).toFixed(4);
            currRight.innerText = `1${e} = ${excVal} ${c}`;
        })
        .catch(e => alert('Network error: error while getting data'));
}

function changeCurrentCurrency(e) {
    const btn = e.target;
    for (let i = 0; i < btnsLeft.length; i++) {
        btnsLeft[i].classList.remove('b-active');
    }
    btn.classList.add('b-active');
    currentCurr = btn.innerText.toUpperCase();
    getdata(currentCurr, exchangeCurr, inpleft, inpRight);
}

function changeExchangeCurrency(e) {
    const btn = e.target;
    for (let i = 0; i < btnsRight.length; i++) {
        btnsRight[i].classList.remove('b-active');
    }
    btn.classList.add('b-active');
    exchangeCurr = btn.innerText.toUpperCase();
    getdata(currentCurr, exchangeCurr, inpleft, inpRight);
}

inpleft.addEventListener('input', (e) => {
    if (e.target.value === '') {
        e.target.value = 0;
    }
    e.target.value = e.target.value.replaceAll(',', ',');
    getdata(currentCurr, exchangeCurr, inpleft, inpRight);
});

inpRight.addEventListener('input', (e) => {
    if (e.target.value === '') {
        e.target.value === 0;
    }
    e.target.value = e.target.value.replaceAll(',', '.');
    getdata(exchangeCurr, currentCurr, inpRight, inpleft);
});

inpleft.addEventListener('keydown', acceptNumber);
inpRight.addEventListener('keydown', acceptNumber);

function acceptNumber(e) {
    if (!((e.key === 'Backspace') || (e.key === 'Delete') ||
        (('0' <= e.key) && (e.key <= '9')) ||
        (e.key === '.') || (e.key === ',')
    )) {

        e.preventDefault();
    }
    if ((e.key === ',') || (e.key === ',')) {
        if (e.target.value.indexOf(',') >= 0) {
            e.preventDefault();
        }
    }
}

getdata(currentCurr, exchangeCurr, inpleft, inpRight);
