var current_tab = -1;
const current_stage = [0,1,2,3,4]
const non_meta_stage = [1,2,3,4]

function DepthGoDownReq(){
    if (Player.depth == 1) {
        let flag = 1;
        for (var i = 0; i < Player.prestige.upgrades.length; i++)flag *= Player.prestige.upgrades[i];
        if (flag == 1) return true;
    }
    return false;
}
function DepthGoDown() {
    if(DepthGoDownReq()){
        Player.depth += 1;
        //Prestige();
        let auto = Player.stage1.auto;
        Player.stage1 = deepCopy(startPlayer.stage1);
        Player.stage2 = deepCopy(startPlayer.stage2);
        Player.stage3 = deepCopy(startPlayer.stage3);
        for(var i=0;i<auto.length;i++)Player.stage1.auto[i] = auto[i];
        Player.prestige.uni = 1;
        Player.prestige.uniresetcount = 0;
        UpdateButtons();
    }
}

function StageUnlocked(stage) {
    if(stage==0)return Player.stage3.upgrades[15] || Player.prestige.uniresetcount > 0; //to be changed
    if(stage==1)return true;
    if(stage==2)return Player.stage1.upgrades[15];
    if(stage==3)return Player.stage2.upgrades[22];
    if(stage==4)return Player.depth >= 2 && (Player.stage3.upgrades[15] && Player.prestige.upgrades2[0]) || Player.prestige.uniresetcount > 0;
    return false;
}

function DoOnRead(){
    if(Player.version==1 && Player.depth == 1)Player.stage4 = deepCopy(startPlayer.stage4);
}

/* --- Notation --- */

function formatNumber(num) {
    var sign = (num > 0 ? "" : "-");
    num = Math.abs(num);
    if (num >= 1e4) {
        // Format with 3 significant digits for numbers >= 1e6
        return sign + num.toExponential(3).replace('+', '');
    } else if (num < 1e4 && num >= 1e-3) {
        if(num==Math.floor(num))return Math.floor(num).toString(); // Integer
        // Format with 4 significant digits for numbers < 1e5 and >= 1e-5
        var str = Number(num.toPrecision(4)).toString();
        if (!str.includes('.') && str.length < 4){
            str += '.';
            str = str + '0'.repeat(5 - str.length);
        }
        return sign + str;  // Remove trailing zeros
    } else if (num < 1e-3 && num > 0) {
        // Format with 3 significant digits for numbers < 1e-5
        return sign + num.toExponential(3).replace('+', '');
    } else if (num === 0) {
        // Handle the case for zero
        return '0';
    }
}

/* --- Save --- */

// Merger

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // Return the value if obj is not an object
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item)); // Recursively copy arrays
    }

    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]); // Recursively copy properties
        }
    }
    return newObj;
}

function mergePlayer(savedPlayer) {
    let newPlayer = Object.assign({}, startPlayer);

    Object.assign(newPlayer, savedPlayer);

    if (savedPlayer.stage1) {
        newPlayer.stage1 = Object.assign({}, newPlayer.stage1, savedPlayer.stage1);
    } else {
        newPlayer.stage1 = Object.assign({}, startPlayer.stage1);
    }

    newPlayer.stage1 = Object.assign({}, startPlayer.stage1, newPlayer.stage1);

    if (savedPlayer.stage2) {
        newPlayer.stage2 = Object.assign({}, newPlayer.stage2, savedPlayer.stage2);
    } else {
        newPlayer.stage2 = Object.assign({}, startPlayer.stage2);
    }

    newPlayer.stage2 = Object.assign({}, startPlayer.stage2, newPlayer.stage2);

    if (savedPlayer.stage3) {
        newPlayer.stage3 = Object.assign({}, newPlayer.stage3, savedPlayer.stage3);
    } else {
        newPlayer.stage3 = Object.assign({}, startPlayer.stage3);
    }

    newPlayer.stage3 = Object.assign({}, startPlayer.stage3, newPlayer.stage3);

    if (savedPlayer.stage4) {
        newPlayer.stage4 = Object.assign({}, newPlayer.stage4, savedPlayer.stage4);
    } else {
        newPlayer.stage4 = Object.assign({}, startPlayer.stage4);
    }

    newPlayer.stage4 = Object.assign({}, startPlayer.stage4, newPlayer.stage4);

    if (savedPlayer.prestige) {
        newPlayer.prestige = Object.assign({}, newPlayer.prestige, savedPlayer.prestige);
    } else {
        newPlayer.prestige = Object.assign({}, startPlayer.prestige);
    }

    newPlayer.prestige = Object.assign({}, startPlayer.prestige, newPlayer.prestige);

    console.log("newPlayer: ", newPlayer);
    return newPlayer;
}

// Save function
function saveData() {
    const playerData = JSON.stringify(Player);
    const base64Data = btoa(playerData); // Encode to Base64
    localStorage.setItem('playerData', base64Data);
    // console.log("Saved Data! " + base64Data);
}

setInterval(function () {
    saveData();
}, 5000);

// Read function
function readData() {
    const base64Data = localStorage.getItem('playerData');
    if (base64Data) {
        const playerData = atob(base64Data); // Decode from Base64
        let savedPlayer = JSON.parse(playerData);
        if (savedPlayer) Player = mergePlayer(savedPlayer);
        DoOnRead();
    }
    console.log(Player);
}

// Wipe
function Wipe() {
    Player = startPlayer;
    saveData();
}

var Wp = 0;
setInterval(function () {
    if (Wp == 1) {
        Wp = 0;
        Wipe();
    }
}, 50);

function formatCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day} ${hours}_${minutes}_${seconds}`;
}

// Export to File function
function exportToFile() {
    const base64Data = localStorage.getItem('playerData');
    const blob = new Blob([base64Data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NullifiedDepthsSave ' + formatCurrentTime() + '.txt'; // Filename for the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
}

// Import from File function
function importFile() {
    document.getElementById('fileInput').click(); // Trigger the file input click
}

/* --- Debugger --- */

setInterval(function(){
    //console.log("Normal!");
},200);

// Listen for file input change
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result.split(',')[1]; // Extract Base64 part
            const base64Data = base64String;
            if (base64Data) {
                const playerData = atob(base64Data); // Decode from Base64
                let savedPlayer = JSON.parse(playerData);
                if (savedPlayer) Player = mergePlayer(savedPlayer);
            }
            console.log(Player);
            DoOnRead();
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});


// Export to Clipboard function
function exportToClipboard() {
    const base64Data = localStorage.getItem('playerData');
    navigator.clipboard.writeText(base64Data)
        .then(() => {
            alert('Player data copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Import from Clipboard function
function importFromClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            const base64Data = text;
            if (base64Data) {
                const playerData = atob(base64Data); // Decode from Base64
                savedPlayer = JSON.parse(playerData);
                if (savedPlayer) Player = mergePlayer(savedPlayer);
            }
            console.log(Player);
            DoOnRead();
            UpdateButtons();
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}

setInterval(function () {
    saveData();
}, 5000);

/* --- Hotkeys --- */

var ctrlHolding = 0, shiftHolding = 0;

// Event listener for keydown
document.addEventListener('keydown', function (event) {
    if (event.key === 'Control' || event.key === 'ControlLeft' || event.key === 'ControlRight') {
        ctrlHolding = 1; // Ctrl is pressed
        updateStatus();
    }
});

// Event listener for keyup
document.addEventListener('keyup', function (event) {
    if (event.key === 'Control' || event.key === 'ControlLeft' || event.key === 'ControlRight') {
        ctrlHolding = 0; // Ctrl is released
        updateStatus();
    }
});

// Event listener for keydown
document.addEventListener('keydown', function (event) {
    if (event.key === 'Shift' || event.key === 'ShiftLeft' || event.key === 'ShiftRight') {
        shiftHolding = 1; // Ctrl is pressed
        updateStatus();
    }
});

// Event listener for keyup
document.addEventListener('keyup', function (event) {
    if (event.key === 'Shift' || event.key === 'ShiftLeft' || event.key === 'ShiftRight') {
        shiftHolding = 0; // Ctrl is released
        updateStatus();
    }
});

function handleCtrlS(event) {
    // Check if the Ctrl key is pressed
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save action
        saveData();
        // Add your custom save logic here
    }
}

// Add the event listener for keydown
document.addEventListener('keydown', handleCtrlS);

/* --- Game Loop --- */

function optickspeedmult(){
    if(Player.op<0)return 1;
    else if(Player.op<600)return (1+(0.5+(600-Player.op)/800)*Math.pow(Player.op,0.4));
    return (1+0.5*Math.pow(Player.op,0.3));
}



/* --- Vue --- */

var app;

function loadVue() {
    app = new Vue({
        el: "#app",
        data: {
            Player
        },
        methods: {
            formatNumber,
            s1buildingscost,
            s1buildingscost_10,
            s1buildingscost_max,
            changeBuy,
            mergePlayer,
            saveData,
            readData,
            exportToFile,
            importFile,
            exportToClipboard,
            importFromClipboard,
            currents1purchase,
            purchases1buildings,
            s1prod,
            gets1BuildingImage,
            gets1BuildingName,
            gets1Buildingid0,
            gets1Buildingid,
            gets1Buildingid2,
            gets1Buildingid3,
            s1DoEveryCycle,
            hovers1upgrades,
            purchases1upgrades,
            s2DoEveryCycle,
            hovers2upgrades,
            purchases2upgrades,
            gets2UpgradeEffect,
            gets2Mask,
            gets2Mask2,
            tps,
            calcs2upgradecost
        }
    })
}
