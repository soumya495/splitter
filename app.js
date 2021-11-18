const billInput = document.querySelector('.bill-input');
const tipBtns = document.querySelectorAll('.input-grid button');
const customTipInput = document.querySelector('.custom-tip-input');
const peopleInput = document.querySelector('.people-input');
const tipAmtDisp = document.querySelector('.tip-disp');
const totalAmtDisp = document.querySelector('.total-disp');
const resetBtn = document.querySelector('.reset');
let billVal=0, tipVal=0, peopleVal=0;
let TIP, TOTAL;

billInput.addEventListener('input', function(e){
    billVal = e.target.value;
    if(billVal < 0){
        document.querySelector('.bill-error').style.opacity = 1;
        document.querySelector('.bill-error').innerText = "Can't be Negative";
        billInput.style.outline = '2px solid tomato';
    }
    else{
        document.querySelector('.bill-error').style.opacity = 0;
        billInput.style.outline = '';
        if(!(tipAmtDisp.textContent=='0.00' && totalAmtDisp.textContent == '0.00' && peopleVal == 0)){
            activateReset();
            changeDisp();   
        }
    }
})

tipBtns.forEach(btn => {
    btn.addEventListener('click', function(){
        customTipInput.value = '';
        tipBtns.forEach(bt => bt.classList.remove('clicked'));
        btn.classList.add('clicked');
        tipVal = btn.innerHTML.substring(0, btn.innerHTML.length-1);
        if(!(tipAmtDisp.textContent=='0.00' && totalAmtDisp.textContent == '0.00' && peopleVal == 0)){
            activateReset();
            changeDisp();   
        }
    })
})

customTipInput.addEventListener('input', function(e){
    tipBtns.forEach(btn => btn.classList.remove('clicked'));
    tipVal = e.target.value;
    if(tipVal < 0){
        customTipInput.style.outline = '2px solid tomato';
    }
    else{
        customTipInput.style.outline = '';
        if(!(tipAmtDisp.textContent=='0.00' && totalAmtDisp.textContent == '0.00' && peopleVal == 0)){
            activateReset();
            changeDisp();   
        }
    }
})

peopleInput.addEventListener('input', function(e){
    peopleVal = e.target.value;
    if(peopleVal == 0){
        document.querySelector('.people-error').style.opacity = 1;
        document.querySelector('.people-error').innerText = "Can't be Zero";
        peopleInput.style.outline = '2px solid tomato';
    }
    else if(peopleVal < 0){
        document.querySelector('.people-error').style.opacity = 1;
        document.querySelector('.people-error').innerText = "Can't be Negative";
        peopleInput.style.outline = '2px solid tomato';
    }
    else{
        peopleInput.style.outline = '';
        if(!billVal) billVal = 0;
        if(!tipVal) tipVal = 0;
        document.querySelector('.people-error').style.opacity = 0;
        activateReset();
        changeDisp();
    }
})

resetBtn.addEventListener('click', function(){
    billInput.value = '';
    tipBtns.forEach(btn => btn.classList.contains('clicked') ? btn.classList.remove('clicked') : '');
    customTipInput.value = '';
    peopleInput.value = '';
    tipAmtDisp.innerText = '0.00';
    totalAmtDisp.innerText = '0.00';
    billVal=0, tipVal=0, peopleVal=0;
    resetBtn.classList.remove('reset-active');
})

function changeDisp(){
    TIP = (Number(tipVal) * (Number(billVal)/100));
    TOTAL = TIP + Number(billVal);
    tipAmtDisp.textContent = (TIP/Number(peopleVal)).toFixed(2);
    totalAmtDisp.textContent = (TOTAL/Number(peopleVal)).toFixed(2);
}

function activateReset(){
    resetBtn.classList.add('reset-active');   
}