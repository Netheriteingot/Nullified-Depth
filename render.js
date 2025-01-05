var UpdateLog = [
    [
        "Beta 0.3.1",
        "More depth 2 content.",
        "Bug fixes, sorry for the inconvenience",
        "Some great QoL stuff!"
    ],
    [
        "Beta 0.3",
        "Added the Depth reset!",
        "Rebalanced parts of early game."
    ],
    [
        "Beta 0.2",
        "Added a new prestige layer.",
        "Serious bug fixes."
    ],
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
var CurrentDepthEffect = [
    "",
    " None ",
    ` - Unlocks a new stage <br>
                            - 10x Universes gain <br>
                            - Unlocks 3 new rows of Prestige upgrades <br>
                            <span style="color: #ffaaaa;"> - Nerfs to production (see each stage for effect)</span><br>
                            <span style="color: #ffaaaa;"> - Universe reset requirement x1e6 </span><br>
                            - Upgrades that unlock other stages are cheaper <br>
                            - All currency except Space foams gain a new effect `
]
var NextDepthEffect = [
    "",
    ` - Unlocks a new stage <br>
                            - 10x Universes gain <br>
                            - Unlocks 3 new rows of Prestige upgrades <br>
                            <span style="color: #ffaaaa;"> - Nerfs to production (see each stage for effect)</span><br>
                            <span style="color: #ffaaaa;"> - Universe reset requirement x1e6 </span><br>
                            - Upgrades that unlock other stages are cheaper <br>
                            - All currency except Space foams gain a new effect `,
    `To Be Continued`
]
function DepthEffect(dp, st){
    if(dp==1)return ""
    if(dp==2){
        if(st==1)return "This stage production is nerfed to /12.5 ^0.9";
        if(st==2)return "This stage production is nerfed to /5 ^0.9 <br> Your Planck Time multiplies Space Foams' gain by "+(formatNumber(Math.pow(1+Player.stage2.plancktime, 0.125)))+"x";
        if(st==3)return "This stage production is nerfed to /12.5 ^0.9 <br> Your Mass multiplies Planck Time's gain by "+(formatNumber(Math.pow(1+1e9*Player.stage3.mt, 0.15)))+"x";
        if(st==4){
            if(Player.stage4.upgrades[8]) return "Your Molecules multiplies Mass gain by "+(formatNumber(Math.pow(Player.stage4.mo+1, 0.25)))+"x";
            else return "";
        }
    }
    return "";
}

function UpdateOnLoad() {
    loadVue();
    readData();
    UpdateButtons();
}
function UpdateButtons() {
    for (const i of current_stage) {
        if (StageUnlocked(i)) document.getElementById("button" + i).style = "display: flex;";
        else document.getElementById("button" + i).style = "display: none;";
    }
}
function SetTab(tab) {
    current_tab = tab;
    for (const i of current_stage) {
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
    document.getElementById("currentdeptheffect").innerHTML = CurrentDepthEffect[Player.depth];
    document.getElementById("nextdeptheffect").innerHTML = NextDepthEffect[Player.depth];
    for(const i of non_meta_stage)document.getElementById("deffect"+i).innerHTML=DepthEffect(Player.depth, i);

    if(Player.depth >= 2)document.getElementById("pu2").style="display: flex;";

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
        s2abletoprestige()? "prestigebutton-colorchange" : "prestigebutton"
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
    for(var i=0;i<4;i++){
        var s3autoclass = "";
        if(Player.prestige.upgrades2[9]){
            s3autoclass = "smallpurchasebutton";
            s3autoclass += (Player.stage3.auto[i]?"-auto":"-nauto");
        }
        else s3autoclass = "purchasebutton-auto-hidden";
        document.getElementById("s3auto"+i).className = s3autoclass;
        document.getElementById("s3auto"+i).innerHTML = (Player.stage3.auto[i]?"Auto ON":"Auto OFF");
    }
    for(var i=0;i<4;i++)document.getElementById("b"+(i+1)+"effect").innerHTML=s3getBuildingEff(i+1);
    if(s3prod()>0.01)document.getElementById("sc1").innerHTML="Particles are escaping. Mass production above 1 will be raised to ^0.5.";
    if(s3prod()>1e2)document.getElementById("sc2").innerHTML="Particles are escaping even more rapidly. Mass production above 1e4 will again be raised to ^0.5.";
    if(s3prod()>1e6)document.getElementById("sc3").innerHTML="Particles are escaping even more rapidly. Mass production above 1e8 will again be raised to ^0."+(Player.stage3.upgrades[14]?"875":"75")+".";
    
    document.getElementById("mo").innerHTML = formatNumber(Player.stage4.mo);
    document.getElementById("mops").innerHTML = formatNumber(s4prod());
    document.getElementById("mo-side").innerHTML = formatNumber(Player.stage4.mo) + " Molecules";
    document.getElementById("s4buy").className = "fixedpurchasebutton"+(Player.stage4.mo>=MultCost()?"-afford":"-nafford");
    document.getElementById("s4store").className = "fixedpurchasebutton"+(Player.stage4.mult>Player.stage4.stored_mult?"-afford":"-nafford");
    document.getElementById("s4buy").innerHTML = "Buy | "+formatNumber(MultCost())+" Molecules";
    if(Player.prestige.upgrades2[8])document.getElementById("s4auto").className="fixedpurchasebutton"+(Player.stage4.auto?"-auto":"-nauto");
    else document.getElementById("s4auto").className="purchasebutton-auto-hidden";
    document.getElementById("s4mult").innerHTML=""+formatNumber(Math.pow(2,Player.stage4.mult))+"x";
    document.getElementById("s4storedmult").innerHTML=""+formatNumber(Math.pow(1.6,Player.stage4.stored_mult))+"x";
    for (var i = 0; i < s4upgradeName.length; i++) {
        if (Player.stage4.upgrades[i] == 1) {
            document.getElementById("s4mask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("s4mask" + i).style.display = 'none'; // Hide the mask
        }
    }
    document.getElementById("s4upgradeeff").innerHTML =
    `<span style="color: gold;">Effect: </span>` +
    `<span>` + gets4UpgradeEffect(s4_cur_idx) + `</span>`;
    
    for(const i of non_meta_stage){
        if(Player.op>0.1)document.getElementById("op"+i).innerHTML="Offline time: "+Player.op.toFixed(0)+" seconds -> "+optickspeedmult().toFixed(1)+"x faster ticks";
        else document.getElementById("op"+i).innerHTML="";
    }

    
    document.getElementById("uni").innerHTML = formatNumber(Player.prestige.uni);
    document.getElementById("uniresettext").innerHTML=(
        AbleToUni()?
        "Reset previous progress for "+formatNumber(UniGain())+" Universes!":
        "Reach "+formatNumber(UniReq())+" Relative Mass to reset!"
    );
    document.getElementById("unireset").className=(
        AbleToUni()? "prestigebutton-colorchange" : "prestigebutton"
    );
    for (var i = 0; i < Player.prestige.upgrades.length; i++) {
        if (Player.prestige.upgrades[i] == 1) {
            document.getElementById("prmask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("prmask" + i).style.display = 'none'; // Hide the mask
        }
    }
    for (var i = 0; i < Player.prestige.upgrades2.length; i++) {
        if (Player.prestige.upgrades2[i] == 1) {
            document.getElementById("pr2mask" + i).style.display = 'block'; // Show the mask
        } else {
            document.getElementById("pr2mask" + i).style.display = 'none'; // Hide the mask
        }
    }
    document.getElementById("depthbuttontext").innerHTML=(
        DepthGoDownReq()?
        "Go down to the next Depth and do a universe reset!":
        "You cannot go down to the next Depth!"
    );
    document.getElementById("depthbutton").className=(
        DepthGoDownReq()? "prestigebutton-colorchange" : "prestigebutton"
    );
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