var UpdateLog = [
    [
        "Beta 0.1.1",
        "Fixed auto buttons somehow always shown.",
        "Added Quality of Life stuff like a buy max upgrades button.",
        "Optimizations."
    ],
    [
        "Beta 0.1",
        "Revamped formula for offline progress calculation under 10 minutes.",
        "Added Stage 3."
    ],
    [
        "Older",
        "Added content to the game."
    ]
]

function UpdateOnLoad() {
    loadVue();
    readData();
    UpdateButtons();
}
function UpdateButtons() {
    for (var i = 0; i <= max_stage; i++) {
        if (StageUnlocked(i)) document.getElementById("button" + i).style = "display: flex;";
        else document.getElementById("button" + i).style = "display: none;";
    }
}
function SetTab(tab) {
    current_tab = tab;
    for (var i = 0; i <= max_stage; i++) {
        if (i == tab) document.getElementById("stage" + i).style = "display: flex;";
        else document.getElementById("stage" + i).style = "display: none;";
    }
}
function DisplaySaveOptions() { document.getElementById("saveoptions").className = "hoverwindow"; }
function HideSaveOptions() { document.getElementById("saveoptions").className = "hoverwindow-hidden"; }

function DisplayUpdateLog() { document.getElementById("updatelog").className = "hoverwindow"; RenderUpdateLog();}
function HideUpdateLog() { document.getElementById("updatelog").className = "hoverwindow-hidden"; }

function RenderUpdateLog() {
    var str="";
    for(var i=0; i<UpdateLog.length;i++){
        str+=(`<div style="font-size: 22px;"> ===== `+UpdateLog[i][0]+` ===== </div>`);
        str+=`<div style="height: 5px;"></div>`;
        for(var j=1; j<UpdateLog[i].length;j++){
            str+=(`<div style="font-size: 13px;"> - `+UpdateLog[i][j]+`</div>`);
        }
        str+=`<div style="height: 10px;"></div>`;
    }
    document.getElementById("udlog").innerHTML=str;
}

function render() {
    document.getElementById("dp").innerHTML = "Depth "+Player.depth;

    document.getElementById("spf").innerHTML = formatNumber(Player.stage1.spacefoam);
    document.getElementById("spf-side").innerHTML = formatNumber(Player.stage1.spacefoam) + " Space Foams";
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i).style.display = (Player.stage1.buildingsunlocked[i] ? "flex" : "none");
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "x").style.display = (Player.stage1.buildingsunlocked[i] ? "flex" : "none");
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "num").innerHTML = gets1BuildingName(i) + " : " + formatNumber(Player.stage1.buildings[i]) + (Player.stage1.buildings[i] == Player.stage1.buildingsbought[i] ? "" : " [" + formatNumber(Player.stage1.buildingsbought[i]) + "]");
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "prod").innerHTML = "Producing: " + formatNumber(s1prod(i));
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "buy").className = "purchasebutton" + (s1auto(i) ? "" : "-small") + ((currents1purchase(i).cost > Player.stage1.spacefoam) ? "-nafford" : "-afford");
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "buy").innerHTML = "Buy " + currents1purchase(i).num + " | Cost: " + formatNumber(currents1purchase(i).cost) + "";
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "auto").className = "purchasebutton" + (Player.stage1.auto[i] ? "-auto" : "-nauto") + (s1auto(i) ? "" : "-hidden"); 
    for (var i = 0; i < 5; i++)document.getElementById("s1" + i + "auto").innerHTML = "Auto " + (Player.stage1.auto[i] ? "ON" : "OFF");
    document.getElementById("s1bulk").innerHTML = (Player.buy == 0 ? "Buy 1" : (Player.buy == 1 ? "Buy 10" : "Buy Max"));
    document.getElementById("s3bulk").innerHTML = (Player.buy == 0 ? "Buy 1" : (Player.buy == 1 ? "Buy 10" : "Buy Max"));
    document.getElementById("s1upgradeeff").innerHTML =
        `<span style="color: gold;">Effect: </span>` +
        `<span>` + gets1UpgradeEffect(cur_idx) + `</span>`;
    for (var i = 0; i < s1upgradeName.length; i++) {
        if (Player.stage1.upgrades[i]) {
            document.getElementById("s1mask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("s1mask" + i).style.display = 'none'; // Hide the mask
        }
    }
    
    document.getElementById("pt").innerHTML = formatNumber(Player.stage2.plancktime);
    document.getElementById("pt-side").innerHTML = formatNumber(Player.stage2.plancktime) + " Planck Time";
    for (var i = 0; i < s2upgradeName.length; i++) {
        if (Player.stage2.upgrades[i] == Player_para.stage2.upgrade_max_level[i]) {
            document.getElementById("s2mask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("s2mask" + i).style.display = 'none'; // Hide the mask
        }
        if (Player.stage2.upgrades[i] < Player_para.stage2.upgrade_max_level[i] && Player.stage2.upgrades[i] > 0) {
            document.getElementById("s2maskxxx2" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("s2maskxxx2" + i).style.display = 'none'; // Hide the mask
        }
    }
    document.getElementById("s2upgradeeff").innerHTML =
    `<span style="color: gold;">Effect: </span>` +
    `<span>` + gets2UpgradeEffect(s2_cur_idx) + `</span>`;
    document.getElementById("texbuttontext").innerHTML=(
        s2abletoprestige()?
        "Prestige and get "+formatNumber(calcs2PrestigeGain()-Player.stage2.tex)+" Time Extensions!":
        "Prestige and get nothing!"
    );
    document.getElementById("texbutton").className=(
        s2abletoprestige()? "prestigebutton colorchange" : "prestigebutton"
    );
    document.getElementById("tex").innerHTML="You have "+formatNumber(Player.stage2.tex)+" Time Extensions, giving a "+formatNumber(calcs2prestigeeffect())+"x bonus to Planck Time production.";
    
    document.getElementById("mt").innerHTML = formatNumber(Player.stage3.mt);
    document.getElementById("mtps").innerHTML = formatNumber(s3prod());
    document.getElementById("mt-side").innerHTML = formatNumber(Player.stage3.mt) + " Relative Mass";
    for(var i=0;i<4;i++)document.getElementById("s3num"+(i+1)).innerHTML=""+formatNumber(Player.stage3.buildings[i]) + (Player.stage3.buildings[i] == Player.stage3.buildingsbought[i] ? "" : " [" + formatNumber(Player.stage3.buildingsbought[i]) + "]");
    for(var i=0;i<4;i++)document.getElementById("s3cost"+(i+1)).innerHTML="Buy " + currents3purchase(i).num + "<br>Cost: " + formatNumber(currents3purchase(i).cost) + " RM";
    for (var i = 0; i < s3upgradeName.length; i++) {
        if (Player.stage3.upgrades[i] == 1) {
            document.getElementById("s3mask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("s3mask" + i).style.display = 'none'; // Hide the mask
        }
    }
    for(var i=1;i<=max_stage;i++){
        if(Player.op>0.1)document.getElementById("op"+i).innerHTML="Offline time: "+Player.op.toFixed(0)+" seconds -> "+optickspeedmult().toFixed(1)+"x faster ticks";
        else document.getElementById("op"+i).innerHTML="";
    }
    for(var i=0;i<4;i++)document.getElementById("b"+(i+1)+"effect").innerHTML=s3getBuildingEff(i+1);
    if(s3prod()>0.01)document.getElementById("sc1").innerHTML="Particles are escaping. Mass production above 1 will be raised to ^0.5.";
    if(s3prod()>1e2)document.getElementById("sc2").innerHTML="Particles are escaping even more rapidly. Mass production above 1e4 will again be raised to ^0.5.";
    if(s3prod()>1e6)document.getElementById("sc3").innerHTML="Particles are escaping even more rapidly. Mass production above 1e8 will again be raised to ^0."+(Player.stage3.upgrades[14]?"875":"75")+".";
}

function renderonBuy() {
}

setInterval(function () {
    render();
    
    if (Player.timestamp == 0) Player.timestamp = Date.now() / 1000;
    else {
        var ts = Player.timestamp;
        Player.timestamp = Date.now() / 1000;
        Player.op += (Player.timestamp - ts - 0.05);
        if(Player.op>86400)Player.op=86400;
    }
    if(Player.op<600)Player.op -= (Math.pow(optickspeedmult(),1.5) - 1) / 20;
    else Player.op -= (Math.pow(optickspeedmult(),2) - 1) / 20;
}, 50);

//{ purchasebutton: true, nafford: currents1purchase(index).cost > Player.stage1.spacefoam }