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

let playButtonAnswer = document.querySelector('#play .answer');
let levelNumber = document.querySelector('#level-number');
let visualBoxTextBox = document.querySelector('.visual-box pre');
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
    elements: {
        morseCodeRawKeysArray: null,
        morseCodeKeysArray: null,
        morseCodeValuesArray: null,
        levelTestKeysArray2by3: null,//Test elements with progress<100% stay here //probability of asking from this array = 2/3
        levelTestKeysArray1by3: new Set(),//Test elements with progress=100% stay here //probability of asking from this array = 1/3
        randomKey: null,
        firstRun1: true,
        firstRun2: true,

        helpOn: true,
    },

    helpInit() {
        document.querySelectorAll('.answer').forEach(ansDiv => {
            ansDiv.classList.remove('hidden');
        });
    },

    lvlChange(choice) {
        let currentLvl = parseInt(document.getElementById('level-number').textContent);
        let newLvlNum;
        if (choice === -1 && currentLvl > 1) {
            newLvlNum = --currentLvl;
        }
        if (choice === 1 && currentLvl < 20) {
            newLvlNum = ++currentLvl;
        }
        if (newLvlNum !== undefined) {
            document.getElementById('level-number').textContent = newLvlNum;
            document.getElementById('first-element').textContent = this.elements.morseCodeKeysArray[2 * newLvlNum - 2];
            document.getElementById('second-element').textContent = this.elements.morseCodeKeysArray[2 * newLvlNum - 1];
            this.init();
        }

    },

    judge(obj) {//always called when a keyboard_key is being pressed
        document.querySelector('.play').classList.add("hide-tooltip");

        if (!(this.elements.helpOn && this.elements.firstRun2)) {
            document.querySelectorAll('.answer').forEach(ansDiv => {
                ansDiv.classList.add('hidden');
            });
            this.elements.helpOn = false;
        }

        //judging starts here
        let kbKeyAnswer = obj.querySelector('.answer');
        let progressBar = obj.querySelector('.progress-bar');
        let kbKeyWidth = document.querySelector('.keyboard__key').offsetWidth;
        if (kbKeyAnswer.textContent == playButtonAnswer.textContent) {
            //right answer => progress++ && Manipulate both TestKeysArrays accordingly && call asker()
            visualBoxTextBox.textContent = "Correct!";
            if (progressBar.offsetWidth < kbKeyWidth) {
                progressBar.style.width = (progressBar.offsetWidth + 0.2 * kbKeyWidth) + 'px'; //progress++
            }
            if (progressBar.offsetWidth > kbKeyWidth - 2) {
                let index = this.elements.levelTestKeysArray2by3.indexOf(obj.textContent.slice(0, 1)) //select the index of the asked key
                if (index > -1) {//if that asked key exist in the levelTestKeysArray2by3 array
                    this.elements.levelTestKeysArray2by3.splice(index, 1); //remove key
                    this.elements.levelTestKeysArray1by3.add(obj.textContent.slice(0, 1)); //add that key to the other array
                }
            }

            if (this.elements.levelTestKeysArray2by3.length === 0) {
                //CONGO LVL PASSED
                document.getElementById("audio_win").play();
                document.querySelector('.greetings').classList.toggle('close');
                Logic.init();
            }
            else {
                this.asker();
            }
        } else {
            //wrong answer => progress- - && Manipulate both TestKeysArrays accordingly
            visualBoxTextBox.textContent = "Incorrect :( Try Again!";
            document.getElementById("audio_wrong").play();
            setTimeout(() => {
                visualBoxTextBox.textContent = "?";
            }, 1000);

            if (progressBar.offsetWidth > 0.2 * kbKeyWidth) {
                progressBar.style.width = (progressBar.offsetWidth - 0.2 * kbKeyWidth) + 'px'; //progress++
            }
            let hasKey = this.elements.levelTestKeysArray1by3.has(this.elements.randomKey); //if set has the asked key or not
            if (hasKey) {//if that asked key exist in the levelTestKeysArray2by3 array
                this.elements.levelTestKeysArray1by3 = new Set([...this.elements.levelTestKeysArray1by3.splice(index, 1)]); //remove key
                this.elements.levelTestKeysArray2by3.push(this.elements.randomKey); //add that key to the other array
            }
        }
    },

    asker() {

        if (this.elements.firstRun1) {
            this.elements.randomKey = document.getElementById("first-element").textContent;
            let index = this.elements.morseCodeKeysArray.indexOf(this.elements.randomKey); //find the index of the asked key in morseCodeKeysArray
            playButtonAnswer.textContent = this.elements.morseCodeValuesArray[index]//retrieve the key's value from morseCodeValuesArray
            visualBoxTextBox.textContent = this.elements.randomKey;
            handlePlayPress(document.querySelector('#play'));
            this.elements.firstRun1 = false;
        }
        else if (this.elements.firstRun2) {
            this.elements.randomKey = document.getElementById("second-element").textContent;
            let index = this.elements.morseCodeKeysArray.indexOf(this.elements.randomKey); //find the index of the asked key in morseCodeKeysArray
            playButtonAnswer.textContent = this.elements.morseCodeValuesArray[index]//retrieve the key's value from morseCodeValuesArray
            visualBoxTextBox.textContent = this.elements.randomKey;
            handlePlayPress(document.querySelector('#play'));
            this.elements.firstRun2 = false;
        }
        else {
            //ask from any one array
            const arraySelector = parseFloat((Math.random() * 1).toString().slice(0, 4)); //values <1 and upto two point decimal will be generated
            console.log(arraySelector);
            console.log(this.elements.levelTestKeysArray1by3);
            console.log(this.elements.levelTestKeysArray2by3);

            if (arraySelector < 0.33) {
                //ask from levelTestKeysArray1by3
                let index = Math.floor(Math.random() * this.elements.levelTestKeysArray1by3.size);//pick any index between 0 to 'levelTestKeysArray1by3.length'
                this.elements.randomKey = [...this.elements.levelTestKeysArray1by3][index];//[...set] makes an array out of the set. here we selected the key at Index=index from the newly made set
                console.log('asked from 1/3:' + this.elements.randomKey);
            }
            else {
                //ask from levelTestKeysArray2by3
                let index = Math.floor(Math.random() * this.elements.levelTestKeysArray2by3.length);  //pick any element of index between 0 to 'levelTestKeysArray2by3.length'
                this.elements.randomKey = this.elements.levelTestKeysArray2by3[index];
                console.log('asked from 2/3:' + this.elements.randomKey)
            }
            let index = this.elements.morseCodeKeysArray.indexOf(this.elements.randomKey); //find the index of the asked key in morseCodeKeysArray
            playButtonAnswer.textContent = this.elements.morseCodeValuesArray[index]//retrieve the key's value from morseCodeValuesArray
            setTimeout(() => {
                visualBoxTextBox.textContent = "?";
            }, 1000);
            handlePlayPress(document.querySelector('#play'));
        }
    },

    init() {
        this.helpInit();
        document.querySelectorAll('.progress-bar').forEach(progressBar => {
            progressBar.style.width = "0"
        });

        this.elements.firstRun1 = true;
        this.elements.firstRun2 = true;

        this.elements.morseCodeRawKeysArray = Object.keys(this.morseCodes); //["_E", "_T", "_A","_N",. . .]
        this.elements.morseCodeKeysArray = this.elements.morseCodeRawKeysArray.map(rawKey => { return rawKey.slice(1) }); //["E", "T", "A","N",. . .]

        this.elements.morseCodeValuesArray = Object.values(this.morseCodes); //[ ". ", "- ", ". - ", "- . ", . . .]

        this.elements.levelTestKeysArray2by3 = this.elements.morseCodeKeysArray.slice(0, 2 * levelNumber.textContent); // [ "E", "T" ] iff levelNumber==1
        this.elements.levelTestKeysArray1by3 = new Set(["E"]);
        // this.elements.levelTestValuesArray = this.elements.morseCodeValuesArray.slice(0, 2*levelNumber.textContent);
        this.asker();
    }
}
Logic.init();