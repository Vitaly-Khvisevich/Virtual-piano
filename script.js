const divs = document.querySelectorAll('.piano-key');
const buttons = document.querySelectorAll('button');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const main_div= document.querySelector('.piano');
const piano_keydown_keys ={68:'c', 82:'c♯', 70:'d', 84:'d♯', 71:'e', 72:'f', 85:'f♯', 74:'g', 73:'g♯', 75:'a', 79:'a♯', 76:'b'};

buttons.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        if(event.target.innerHTML=='Letters'){
            event.target.classList.add("btn-active");
            notes.classList.remove("btn-active");
            console.log(main_div);
            for(i=0; i<divs.length; i++){
                divs[i].classList.add("piano-key-letter");
            }
          
        }
        else if (event.target.innerHTML=='Notes'){
            event.target.classList.add("btn-active");
            letters.classList.remove("btn-active");
            for(i=0; i<divs.length; i++){
                divs[i].classList.remove("piano-key-letter");
            }
            
        }
        else if (event.target.classList.value=='fullscreen openfullscreen'){
            document['fullscreenElement'] ? document['exitFullscreen']() : document['documentElement']['requestFullscreen']();   
        }
    })
}) 

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

function start_sound(event){
    const url = './assets/audio/' +event.target.dataset.note +'.mp3';
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playAudio(url);
    
}

function stop_sound(event){
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function div_mousedown_over(event){
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    const url = './assets/audio/' +event.target.dataset.note +'.mp3';
    playAudio(url);
    divs.forEach((elem) => {
        elem.addEventListener('mouseover', start_sound);
        elem.addEventListener('mouseout', stop_sound);
    }
    )
}
function div_mouseout_over(){
    divs.forEach((elem) => {
        elem.classList.remove('piano-key-active', 'piano-key-active-pseudo');
        elem.removeEventListener('mouseover', start_sound);
        elem.removeEventListener('mouseout', stop_sound);
    }
    )
}
main_div.addEventListener('mousedown', div_mousedown_over),

document.addEventListener('mouseup', div_mouseout_over)

function keydown(){    
    for (j=0; j<divs.length; j++){
        if(piano_keydown_keys[event.keyCode]==undefined){}
        else{
        if (divs[j].dataset.note===piano_keydown_keys[event.keyCode]){
            if(divs[j].classList.contains('piano-key-active')){}
            else{
            divs[j].classList.add('piano-key-active', 'piano-key-active-pseudo');
            const url = './assets/audio/' +piano_keydown_keys[event.keyCode]+'.mp3';
            playAudio(url);
            }
        }
    }   
    } 
}  

function keyup(){
    for (j=0; j<divs.length; j++){
        if(piano_keydown_keys[event.keyCode]==undefined){}
        else{
        if (divs[j].dataset.note===piano_keydown_keys[event.keyCode]){
            divs[j].classList.remove('piano-key-active', 'piano-key-active-pseudo');
        }
        } 
}
}   
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);