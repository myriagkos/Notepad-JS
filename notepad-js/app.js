let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName  = document.getElementById("fontName");
let fontSizeRef  = document.getElementById("fontSize");
let writingArea  = document.getElementById("text-input");
let linkButton  = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");

// List of fontlist
let fontlist = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive"
];

//Initial Settings
const initializer = () => {
    //function calls for highlighting buttons
    //no highlights for link,unlink,lists, undo,redo,since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButton, true);

    //create options for font names 
    fontlist.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontSize allows only till 7
    for ( let i=1; i<=7 ; i++) {
        let option = document.createElement("option");
        option.value= i;
        option.innerHTML= i;
        fontSizeRef.appendChild(option);
    }

    //deafault size
    fontSizeRef.value = 3;
};

//main logic
const modifyText = (command , defaultUi , value ) => {
    //execCommand executes command on selected text 
    document.execCommand(command , defaultUi, value);
};

//For basic operations which dont need value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false,null);
    });
});

//options that require value parameter (e.g colors , fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id , false, button.value);
    });
});

//link 
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //link has http then pass directly else add https
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false , userLink);
    } else {
        userLink="https://" + userLink;
        modifyText(linkButton.id , false , userLink);
    }
});

//highlight clicked button 
const highlighter = (className , needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () =>{
            //needs removal = true means only one button should be highlighted and the rest not
            if (needsRemoval) {
                let alreadyActive = false;

                //if currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }

                //remove highlight from other buttons
                highlightRemover(className);
                if (!alreadyActive) {
                    //highlight clicked button 
                    button.classList.add("active");
                }
            }else {
                //if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

const highlightRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();