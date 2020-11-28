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
let visualBoxTextBox= document.querySelector('.visual-box pre');
const Logic = {
    morseCodes: {
        "_E": ". ",
        "_T": "- ",
        "_A": ". - ",
        "_N": "- . ",
        "_I": ". . ",
        "_M": "- - ",
        "_S": ". . . ",
        "_O": "- - - ",
        "_D": "- . . ",
        "_U": ". . - ",
        "_R": ". - . ",
        "_K": "- . - ",
        "_C": "- . - . ",
        "_P": ". - - . ",
        "_B": "- . . . ",
        "_G": "- - . ",
        "_W": ". - - ",
        "_L": ". - . . ",
        "_Q": "- - . - ",
        "_H": ". . . . ",
        "_F": ". . - . ",
        "_Y": "- . - - ",
        "_Z": "- - . . ",
        "_V": ". . . - ",
        "_X": "- . . - ",
        "_J": ". - - - ",
        "_1": ". - - - ",
        "_2": ". . - - - ",
        "_3": ". . . - - ",
        "_4": ". . . . - ",
        "_5": ". . . . . ",
        "_6": "- . . . . ",
        "_7": "- - . . . ",
        "_8": "- - - . . ",
        "_9": "- - - - . ",
        "_0": "- - - - - ",
        "_. ": ". - . - . - ",
        "_,": "- - . . - - ",
        "_?": ". . - - . . ",
        "_=": "- . . . - ",
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

    judge(obj) {//always called when a keyboard_key is being pressed
        let kbKeyAnswer = obj.querySelector('.answer');
        let progressBar = obj.querySelector('.progress-bar');
        let kbKeyWidth = document.querySelector('.keyboard__key').offsetWidth;
        if (kbKeyAnswer.textContent == playButtonAnswer.textContent) {
            //right answer => progress++ && Manipulate both TestKeysArrays accordingly && call asker()
            if (progressBar.offsetWidth < kbKeyWidth) {
                progressBar.style.width = (progressBar.offsetWidth + 0.2 * kbKeyWidth) + 'px'; //progress++
            }
            if (progressBar.offsetWidth > kbKeyWidth - 2) {
                let index = this.elements.levelTestKeysArray2by3.indexOf(obj.textContent.slice(0,1)) //select the index of the asked key
                if (index > -1) {//if that asked key exist in the levelTestKeysArray2by3 array
                    this.elements.levelTestKeysArray2by3.splice(index, 1); //remove key
                    this.elements.levelTestKeysArray1by3.push(obj.textContent.slice(0,1)); //add that key to the other array
                }
            }

            if (this.elements.levelTestKeysArray2by3.length === 0) {
                //CONGO LVL PASSED
                document.querySelector('.greetings').style.display = "block";
            }
            else {
                this.asker();   
            }
        } else {
            //wrong answer => progress- - && Manipulate both TestKeysArrays accordingly
            if (progressBar.offsetWidth > 0.2 *kbKeyWidth) {
                progressBar.style.width = (progressBar.offsetWidth - 0.2 * kbKeyWidth) + 'px';; //progress++
            }
            let index = this.elements.levelTestKeysArray1by3.indexOf(this.elements.randomKey); //select the index of the asked key
            if (index > -1) {//if that asked key exist in the levelTestKeysArray2by3 array
                this.elements.levelTestKeysArray1by3.splice(index, 1); //remove key
                this.elements.levelTestKeysArray2by3.push(this.elements.randomKey); //add that key to the other array
            }
        }
    },

    asker(){
        //ask from any one array
        const arraySelector = parseFloat((Math.random() * 1).toString().slice(0, 4)); //values <1 and upto two point decimal will be generated
        console.log(arraySelector);
        console.log(this.elements.levelTestKeysArray1by3);
        console.log(this.elements.levelTestKeysArray2by3);

        if(arraySelector < 0.33){
            //ask from levelTestKeysArray1by3
            let index = Math.floor(Math.random() * this.elements.levelTestKeysArray1by3.length);//pick any index between 0 to 'levelTestKeysArray1by3.length'
            this.elements.randomKey = this.elements.levelTestKeysArray1by3[index];
            console.log('asked from 1/3:' + this.elements.randomKey);
        }
        else{
            //ask from levelTestKeysArray2by3
            let index = Math.floor(Math.random() * this.elements.levelTestKeysArray2by3.length);  //pick any element of index between 0 to 'levelTestKeysArray2by3.length'
            this.elements.randomKey = this.elements.levelTestKeysArray2by3[index];
            console.log('asked from 2/3:' + this.elements.randomKey )
        }
        let index = this.elements.morseCodeKeysArray.indexOf(this.elements.randomKey); //find the index of the asked key in morseCodeKeysArray
        playButtonAnswer.textContent = this.elements.morseCodeValuesArray[index]//retrieve the key's value from morseCodeValuesArray
        visualBoxTextBox.textContent = "?";
        handlePlayPress(document.querySelector('#play'));
    },

    init() {    
        this.elements.morseCodeRawKeysArray = Object.keys(this.morseCodes); //["_E", "_T", "_A","_N",. . .]
        this.elements.morseCodeKeysArray = this.elements.morseCodeRawKeysArray.map(rawKey => {return rawKey.slice(1)}); //["E", "T", "A","N",. . .]

        this.elements.morseCodeValuesArray = Object.values(this.morseCodes); //[ ". ", "- ", ". - ", "- . ", . . .]

        this.elements.levelTestKeysArray2by3 = this.elements.morseCodeKeysArray.slice(0, 2*levelNumber.textContent); // [ "E", "T" ] iff levelNumber==1
        this.elements.levelTestKeysArray1by3 = ["E"];
        // this.elements.levelTestValuesArray = this.elements.morseCodeValuesArray.slice(0, 2*levelNumber.textContent);
        this.asker();
    }
}
Logic.init();