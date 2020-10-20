// horloge icone OFF and On : 
let horloge       = document.getElementById("timeIcone");
let horlogeOff    = document.getElementById("timeOff");
let songTime      = document.getElementById("songTime");

horloge.addEventListener("click", () =>{  
    horloge.style.display = "none";
    horlogeOff.style.display = "block";
    songTime.volume = 0;

})
horlogeOff.addEventListener("click", () => {
    horlogeOff.style.display = "none";
    horloge.style.display    = "block";
    songTime.volume = 1;
})


let input         = document.querySelector('#prix');
let formulaire    = document.querySelector('#formulaire');
let error         = document.querySelector('small');
let bouton        = document.querySelector('#bouton');
var chrono        = document.querySelector('#chronomêtre');
let label         = document.querySelector('label');
let coups         = 0;
let nombreChoisi;
let interval;

error.style.display = "none";


let nombreAleatoire = Math.floor(Math.random() * 1001);

formulaire.addEventListener('submit', (event) => {
    event.preventDefault();
    

    if(isNaN(input.value)|| input.value == ""){
        input.style.borderColor = "red";
        songTime.pause();
    }
    else{
        
        coups++;
        input.style.borderColor = "blue";
        nombreChoisi = input.value;
        input.value = "";
        verifier(nombreChoisi);
        

    }
});

input.addEventListener('keyup', () => {
    if(isNaN(input.value)){
        error.style.display = "inline";
    }
    else{
        error.style.display = "none";
    }
});

let verifier = (nombre) =>{

    let instruction = document.createElement('div');

    if(nombre < nombreAleatoire){
        instruction.textContent = `*   ${coups}   (   ${nombre}  ) c'est plus !`;
        instruction.className = "instruction plus";
    }
     else if(nombre > nombreAleatoire){

        instruction.textContent = `*   ${coups}   (  ${nombre} ) C'est moins`;
        instruction.className = "instruction moins";

    }
    else{
        chrono.value = "Gagné !"
        clearInterval(interval);
        instruction.textContent = `*  ${coups}  (  ${nombre}  ) Félicitation  vous avez trouvé le juste prix !`;      
        songTime.pause();
        instruction.className = "instruction fini !";
        input.disabled = true;
    }
    document.querySelector("#instructions").prepend(instruction);
};

bouton.addEventListener("click", () => {
    songTime.play();
    if(isNaN(input.value) || input.value == ""){

    chrono.textContent = "";
}
    else if(input.value == nombreAleatoire){
    chrono.value = "gagné !";
    songTime.pause();
    
}
   else{
    interval = setInterval(compte, 10);
    
}
});


let minisecode = 0;
let seconde = 0;
let minute = 0;
let compte = () =>{
      
    chrono.value = minute + " : " + seconde + " : " + minisecode;
    minisecode++;
    if(minisecode == 100){
        minisecode = 0;
        seconde++;
    }
    if(seconde == 60){
        seconde = 0;
        minute++;
    }
    if(minute == 5){
        chrono.value = "Perdu !";
        songTime.pause();
        input.disabled = true;
        label.textContent = " Perdu ! réessayez !"
        clearInterval(interval);
        instruction.textContent = "vous avez depassez le temps autorisé !, reessayez";
        instruction.className = "instruction arret";
        input.disabled = true;
         
    }

}