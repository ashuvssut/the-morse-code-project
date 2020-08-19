const Keyboard = {//Keyboard Object to hold all elements related to it to make the keyboard work. e.g.functions
    
    //OBJECTS
    elements:{//Keyboard elements Object.(contains all the stuff that are required to structure the DOM of keyboard)
        main: null,//main keyboard container
        keysContainer: null, //for keys container (keyboard)
        keys:[] //keys array for the buttons of the keyboard keys
    },//we have to generate these above elements we will setup the values inside init()

    eventHandlers:{//event-handler for keyboard 
        onInput:null,
    },

    // properties:{//represent current state of the keyboard
    //     health: "",
    // },

    //FUNCTIONS
    init(){//this runs to initialize the keyboard 
        //Create Keyboard Elements
        this.elements.main = document.createElement("div");//'this' keyword refers to parent object(Keyboard)
        this.elements.keysContainer = document.createElement("div");
        this.elements.keysContainer.appendChild(this._createKeys());

        //Setup Keyboard elements
        this.elements.main.classList.add("keyboard-div")
        this.elements.keysContainer.classList.add("keyboard");

        //Setup link between all div and then Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.getElementById("keyboard").appendChild(this.elements.main)//indicates to section and addS main as child
        
    },

    _createKeys(){//(private function) creates all keys which will be appended to keysContainer
        const fragment = document.createDocumentFragment();//document fragment are virtual elements that can be used to append to other elements.reference--<https://www.youtube.com/watch?v=aUzCq-uabhw>
        
        //CREATE KEYS WITH THEIR innerHTML AND PROGRESS-BAR
        const keyLayout =[//array to store layout(no line breaks included) and then create button elements by looping
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
            "A", "S", "D", "F", "G", "H", "J", "K", "L", "eq",
            "Z", "X", "C", "V", "B", "N", "M", "com", "dot", "q", 
        ]

        const morseValues=[//array to store codes(no line breaks included) and then create button elements by looping
            ". - - - -", ". . - - - ", ". . . - - ", ". . . . - ", ". . . . . ", "- . . . . ", "- - . . . ", "- - - . . ", "- - - - . ", "- - - - - ",
            "- - . - ", ". - - ", ". ", ". - . ", "- ", "- . - - ", ". . - ", ". . ", "- - - ", ". - - . ", 
            ". - ", ". . . ", "- . . ", ". . - . ", "- - . ", ". . . . ", ". - - - ", "- . - ", ". - . . ", "- . . . - ",
            "- - . . ", "- . . - ", "- . - . ", ". . . - ", "- . . . ", "- . ", "- - ", "- - . . - - ", ". - . - . - ", ". . - - . . ", 
        ]

        //generating those keyboard layout HTML elements (including line breaks). These keys will be appended to "fragment"
        keyLayout.forEach((key, index) => {//for each key generate the element below
            const keyElement = document.createElement("button");
            keyElement.classList.add("keyboard__key")
            keyElement.setAttribute("type", "button");
            keyElement.setAttribute("onclick", "Logic.judge(this);");
            //insert values in all keys / set value to keyElements' innerHTML 
            let forbiddenElement = ["eq", "com", "dot", "q"].indexOf(key);//returns -1 if any of these elements is not found in this array>>>["eq", "com", "dot", "q"] (this array only contains forbidden-elements)
            //forbiddenElement variable stores only indexes or -1 value.
            if(forbiddenElement !== -1){// if forbidden element found then execute this if statement
                switch(key){
                    case "eq": keyElement.innerHTML = "="; break;
                    case "com": keyElement.innerHTML = ","; break;
                    case "dot": keyElement.innerHTML = "."; break;
                    case "q": keyElement.innerHTML = "?"; break;
                }
            } else{
                keyElement.innerHTML = key;
            }

            //>>> KEY SUB_DIV
            //The keys are set. Now add the answer div after adding a line-break
            const breakElement1= document.createElement("br");
            keyElement.appendChild(breakElement1);

            //GET THOSE KEYS THEIR MORSE-VALUE
            const answerDiv = document.createElement("div");
            answerDiv.classList.add("answer");
            keyElement.appendChild(answerDiv);
            answerDiv.innerHTML = morseValues[index];//assigning those key to its respective morse-code
            
            //>>> KEY SUB_DIV
            //The answer-div is set. Now add the progress bar
            const breakElement2= document.createElement("br");
            keyElement.appendChild(breakElement2);
            
            //Add progress bar with default CSS class
            const progressBar = document.createElement("div");
            progressBar.classList.add("progress-bar");
            keyElement.appendChild(progressBar);

            //Add progress-bar custom CSS width class
            progressBar.classList.add(`width-${key}`);
        
            let foundEndElement = ["0", "P", "eq", "q"].indexOf(key);//returns -1 if any of these elements is not found in this array (this array only contains end-elements)
            let insertLineBreak = (foundEndElement !== -1); //insertLineBreak stores boolean value
            
            //Add eventListener to key
            keyElement.addEventListener("click", () => {
                this._triggerEvent("oninput");
            });

            //the key is given active properties. Now append to "fragment". 
            fragment.appendChild(keyElement);

            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"))
                
            }
        });        
    
        //Now, all keys are appended to fragment. Time to return fragment.
        return fragment
    },

    _triggerEvent(handlerName){
        console.log("Event Triggered! Event Name: "+handlerName);
    },

};

window.addEventListener("DOMContentLoaded", function(){//only fire-up the below code when the DOM is loaded
    Keyboard.init();
});

// ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----",
// "--.-", ".--", ".", ".-.", "-", "-.--", "..-", "..", "---", ".--.", 
// ".-", "...", "-..", "..-.", "--.", "....", ".---", "-.-", ".-..", "-...-",
// "--..", "-..-", "-.-.", "...-", "-...", "-.", "--", "--..--", ".-.-.-", "..--..", zz