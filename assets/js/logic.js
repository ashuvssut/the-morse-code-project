//**********THE LOGIC: MAPPED************//
//  init()
//    ⬇ 
//    ⬇ 
//  asker()  ⬅⬅⬅⬅⬅
//    ⬇              ⬆
//    ⬇              ⬆ 
//   display the Visuals
//    ⬇              ⬆
//    ⬇              ⬆
//  judge()  ➡➡➡➡➡

let playButtonAnswer= document.querySelector('#play .answer');
let levelNumber= document.querySelector('#level-number');
let visualBoxText= document.querySelector('.visual-box pre');
const Logic = {
    morseCodes: {
        "_E": ".",
        "_T": "-",
        "_A": ".-",
        "_N": "-.",
        "_I": "..",
        "_M": "--",
        "_S": "...",
        "_O": "---",
        "_D": "-..",
        "_U": "..-",
        "_R": ".-.",
        "_K": "-.-",
        "_C": "-.-.",
        "_P": ".--.",
        "_B": "-...",
        "_G": "--.",
        "_W": ".--",
        "_L": ".-..",
        "_Q": "--.-",
        "_H": "....",
        "_F": "..-.",
        "_Y": "-.--",
        "_Z": "--..",
        "_V": "...-",
        "_X": "-..-",
        "_J": ".---",
        "_1": ".---",
        "_2": "..---",
        "_3": "...--",
        "_4": "....-",
        "_5": ".....",
        "_6": "_....",
        "_7": "--...",
        "_8": "---..",
        "_9": "----.",
        "_0": "-----",
        "_.": ".-.-.-",
        "_,": "--..--",
        "_?": "..--..",
        "_=": "-...-",
    },
    elements : {
        morseCodeRawKeysArray: null,
        morseCodeKeysArray: null,
        morseCodeValuesArray: null,
        levelTestKeysArray2by3: null,//Test elements with progress<100% stay here //probability of asking from this array = 2/3
        levelTestKeysArray1by3: null,//Test elements with progress=100% stay here //probability of asking from this array = 1/3
        //levelTestValuesArray: null,
        
        randomKey:null,
        
    },
    secondaryMessages : [
        `Incorrect,
        Try Again!`,
        `Correct!`
    ],

    judge(obj){
    },

    asker(){
        //ask from any one array
        const arraySelector = parseFloat((Math.random()*1).toString().slice(0,4)); //values <1 and upto two point decimal will be generated
        let index = null;
        if(arraySelector < 0.33){
            //ask from levelTestKeysArray1by3
            index = Math.floor(Math.random()*this.elements.levelTestKeysArray1by3.length) //pick any index between 0 to 'levelTestKeysArray1by3.length'
            this.elements.randomKey = this.elements.levelTestKeysArray1by3[index]
        }
        else{
            //ask from levelTestKeysArray2by3
            index = Math.floor(Math.random()*this.elements.levelTestKeysArray2by3.length)   //pick any element of index between 0 to 'levelTestKeysArray2by3.length'
            this.elements.randomKey = this.elements.levelTestKeysArray2by3[index]
        }
        // this.elements.playButtonAnswer.textContent = this.elements.morseCodeValuesArray[this.elements.morseCodeKeysArray.indexOf(this.elements.randomKey)]
        playButtonAnswer.textContent = this.elements.morseCodeValuesArray[index]
        visualBoxText.textContent = "?";
    },

    init() {    
        this.elements.morseCodeRawKeysArray = Object.keys(this.morseCodes); //["_E", "_T", "_A","_N",...]
        this.elements.morseCodeKeysArray = this.elements.morseCodeRawKeysArray.map(rawKey => {return rawKey.slice(1)}); //["E", "T", "A","N",...]

        this.elements.morseCodeValuesArray = Object.values(this.morseCodes); //[ ".", "-", ".-", "-.", ...]

        this.elements.levelTestKeysArray2by3 = this.elements.morseCodeKeysArray.slice(0, 2*levelNumber.textContent); // [ "E", "T" ] iff levelNumber==1
        this.elements.levelTestKeysArray1by3 = [this.elements.morseCodeKeysArray[0]];//["E"]
        // this.elements.levelTestValuesArray = this.elements.morseCodeValuesArray.slice(0, 2*levelNumber.textContent);
        this.asker();
    }
}
Logic.init();