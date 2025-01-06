const startPlayer = {
    depth: 1,
    buy: 0,
    stage1: {
        spacefoam: 10,
        buildings: [0, 0, 0, 0, 0],
        buildingsunlocked: [1, 0, 0, 0, 0],
        buildingsbought: [0, 0, 0, 0, 0],
        upgrades: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        auto: [0,0,0,0,0]
    },
    stage2: {
        plancktime: 0,
        upgrades: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        tex: 0,
        tsitex: 0
    },
    stage3: {
        mt: 1e-9,
        buildings: [0,0,0,0],
        buildingsbought: [0,0,0,0],
        auto: [0,0,0,0],
        upgrades: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        auto: [0,0,0,0]
    },
    stage4: {
        mo: 0,
        upgrades: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        mult: 0,
        stored_mult: 0,
        auto: 0
    },
    prestige: {
        uni: 0,
        upgrades: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        upgrades2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        uniresetcount: 0,
        timespent: 0,
        fastestrate: 0
    },
    timestamp: 0,
    op: 0,
    version: 2
};
const Player_para = {
    stage1: {
        upgrade_cost: [1.5e2, 6e2, 2.5e3, 8e3, 5e4, 3e6, 4e7, 2e8, 6e8, 1e12, 1e13, 1e15, 1e21, 1e35, 1e39, 1e48, 1e10, 1e20, 1e30, 1e40],
        buildingsbasecost: [10, 1000, 1e7, 1e13, 1e15],
        buildingscostinflation: [1.1, 1.15, 1.2, 1.3, 1.4]
    },
    stage2: {
        upgrade_cost: [1,10,100,1e3,1e5,1e7,1e7,1e15,1e8,1e9,1e10,1e11,1e15,1e17,1e12,1e21,1e16,1e17,1e18,1e19,1e27,1e31,6.9e69,1e35],
        upgrade_max_level: [10,10,10,10,3,1,3,1,10,10,10,10,5,1,42,3,10,10,10,10,5,1,1,35],
        upgrade_cost_scaling: [10,10,10,10,1000,1,1000,1,100,100,100,100,69,1,6,1e8,1e4,1e4,1e4,1e4,420,1,1,10]
    },
    stage3: {
        upgrade_cost: [1e-8,1e-7,1e-6,1e-5,2e-4,5e-2,2e6,1e9,2e-7,2e-6,2e-5,6e-4,2e-3,1e11,1e15,6.022e26],
        buildingsbasecost:[1e-9,6e-4,1,1],
        buildingscostinflation:[1.2,10,3,100]
    },
    stage4: {
        upgrade_cost: [0,100,6e3,2e5,1e2,1e5,1e8,1e11,1e6,2e9,1e11,1e20,1e14,1e17,1e20,1e23]
    },
    prestige: {
        upgrade_cost: [1,2,2,2,3,3,3,17,2,16,96,10,40,15,128,71],
        upgrade_cost2: [1,2e2,1e2,1e2,1e2,1e2,8e2,3.2e3,2e3,3e2,6e2,1.2e3,2.4e3,1e3,2e3,4e3,8e3,1e100,1e100,1e100,1e100,1e100,1e100,1e4,5e4]
    }
};
const s1upgradeName = new Array("I", "II", "III", "1st Dimension", "Spacial Combination", "IV", "V", "2nd Dimension", "Spacial Rearrangement", "VI", "3rd Dimension", "4th Dimension", "Euler's Theorem", "Fractals", "Spacial Concatenation", "Timelapse", "Auto 1", "Auto 2", "Auto 3", "Auto 4");
const s1upgradeEffect = new Array(
    "x3 Space Foam Gain.",
    "x3 Space Foam Gain.",
    "x3 Space Foam Gain.",
    "Unlock a new structure.",
    "Dots in space can be connected with each other. x1.02 Space Foam gain for each bought Dot.",
    "x3 Lines production.",
    "x3 Lines production.",
    "Unlock a new structure.",
    "Lines in space can be rearranged in some way. x1.02 Lines production for each bought Line.",
    "x3 Planes production.",
    "Unlock a new structure.",
    "Unlock a new structure.",
    "Euler's Theorem makes all structures produce 0.2% faster for each bought structure!",
    "Fractals are formed within Tesseracts. Bought Tesseracts produces itself at a reduced rate (^0.5).",
    "Loops allow space to continue. All structures are boosted by Space Foams ^0.005.",
    "Space is now large enough to allow time. Unlock the next Stage.",
    "Automatically make Dots.",
    "Automatically make Lines.",
    "Automatically make Planes.",
    "Automatically make Cubes and Tesseracts."
);
const s1images = new Array(
    "./pic/s1upgrade1.jpg",
    "./pic/s1upgrade2.jpg",
    "./pic/s1upgrade3.jpg",
    "./pic/s1upgrade4.jpg",
    "./pic/s1upgrade5.jpg",
    "./pic/s1upgrade6.jpg",
    "./pic/s1upgrade7.jpg",
    "./pic/s1upgrade8.jpg",
    "./pic/s1upgrade9.jpg",
    "./pic/s1upgrade10.jpg",
    "./pic/s1upgrade11.jpg",
    "./pic/s1upgrade12.jpg",
    "./pic/s1upgrade13.jpg",
    "./pic/s1upgrade14.jpg",
    "./pic/s1upgrade15.jpg",
    "./pic/s1upgrade16.jpg",
    "./pic/s1upgrade17.jpg",
    "./pic/s1upgrade18.jpg",
    "./pic/s1upgrade19.jpg",
    "./pic/s1upgrade20.jpg"
)
const s2upgradeName = new Array("I","II","III","IV","Time Smoothing I","Time Lengthening I","Better Extensions","Continuum","V","VI","VII","VIII","Time Smoothing II","Time Lengthening II","An Upgrade","Temporal Amplifier","IX","X","XI","XII","Time Smoothing III","Time Lengthening III","New Stage","Infinite Ascent");
const s2upgradeEffect = new Array(
    "Multiply your Planck Time gain by x1.55 per level!",
    "Multiply your Planck Time gain by x1.55 per level!",
    "Multiply your Planck Time gain by x1.55 per level!",
    "Multiply your Planck Time gain by x1.55 per level!",
    "Increases Planck Time production based on time spent this reset.",
    "You gain a bit more Time Extensions.",
    "Time Extensions effect is slightly improved.",
    "Extension gain is raised to ^1.35. (^0.7 if less than 1)",
    "Multiply your Planck Time gain by x1.5 per level!",
    "Multiply your Planck Time gain by x1.5 per level!",
    "Multiply your Planck Time gain by x1.5 per level!",
    "Multiply your Planck Time gain by x1.5 per level!",
    "Increases Planck Time production based on time spent this reset again.",
    "You gain a bit more Time Extensions again.",
    "Multiply your Planck Time gain by x1.075 per level! A small gift from the developer!",
    "First 4 columns of upgrades' base +1.03.",
    "Multiply your Planck Time gain by x1.45 per level!",
    "Multiply your Planck Time gain by x1.45 per level!",
    "Multiply your Planck Time gain by x1.45 per level!",
    "Multiply your Planck Time gain by x1.45 per level!",
    "Increases Planck Time production based on time spent this reset again.",
    "x2 Time Extension Gain. Simple.",
    "Unlock the next stage.",
    "x5 Planck Time Production per level."
);
const s2images = new Array(
    "./pic/s2upgrade1.jpg",
    "./pic/s2upgrade2.jpg",
    "./pic/s2upgrade3.jpg",
    "./pic/s2upgrade4.jpg",
    "./pic/s2upgrade5.jpg",
    "./pic/s2upgrade6.jpg",
    "./pic/s2upgrade7.jpg",
    "./pic/s2upgrade8.jpg",
    "./pic/s2upgrade9.jpg",
    "./pic/s2upgrade10.jpg",
    "./pic/s2upgrade11.jpg",
    "./pic/s2upgrade12.jpg",
    "./pic/s2upgrade13.jpg",
    "./pic/s2upgrade14.jpg",
    "./pic/s2upgrade15.jpg",
    "./pic/s2upgrade16.jpg",
    "./pic/s2upgrade17.jpg",
    "./pic/s2upgrade18.jpg",
    "./pic/s2upgrade19.jpg",
    "./pic/s2upgrade20.jpg",
    "./pic/s2upgrade21.jpg",
    "./pic/s2upgrade22.jpg",
    "./pic/s2upgrade23.jpg",
    "./pic/s2upgrade24.jpg"
)
const s3upgradeName = new Array("---->","--->","-->","->","Better Electrons","Effective Neutrinos","Effective Protons","Ions","--->?","Nice.","High-energy environments","Beta+ Reaction","Electron Capture","Neutron Cluster","Stable molecules","New Stage");
const s3upgradeEffect = new Array(
    "Neutrinos can pierce through most matter. Your Mass gain is affected by your Neutrinos (^0.5).",
    "Mass gain is affected by Neutrinos even more. (+^0.4, capped at 1e4 of them.)",
    "Mass gain is affected by Neutrinos even more. (+^0.3, capped at 1e4 of them.)",
    "Mass gain is affected by Neutrinos even more. (+^0.2, capped at 1e4 of them.)",
    "Mass gain is affected by your Mass. (This will not give debuffs!) (^0.08)",
    "Adds Electron effect base based on your Neutrinos.",
    "Proton effect affects electrons and neutrons at a reduced rate.",
    "Multiple electrons can now affect each other. Electron effect becomes softcapped at 100 instead of hardcapped.",
    "Surprise! You probably didn't notice this. Upgrade 1x1 effect +69%.",
    "Another surprise. Mass gain +69%.",
    "Neutrinos collide with nucleons more. x1.025 Mass gain per bought Neutrino.",
    "Through Beta+ Reactions, Electrons produce Neutrinos slowly.",
    "More neutrinos means more electrons to be captured. Neutrinos boosts electron production slightly.",
    "Neutrons give boosts to Mass gain, ignoring the softcap.",
    "Slightly reduce the 3rd mass hardcap. (0.75 -> 0.875)",
    "Congratulations on reaching a kilogram! Unlock the next stage."
);
const s3images = new Array(
    "./pic/s3upgrade1.jpg",
    "./pic/s3upgrade2.jpg",
    "./pic/s3upgrade3.jpg",
    "./pic/s3upgrade4.jpg",
    "./pic/s3upgrade5.jpg",
    "./pic/s3upgrade6.jpg",
    "./pic/s3upgrade7.jpg",
    "./pic/s3upgrade8.jpg",
    "./pic/s3upgrade9.jpg",
    "./pic/s3upgrade10.jpg",
    "./pic/s3upgrade11.jpg",
    "./pic/s3upgrade12.jpg",
    "./pic/s3upgrade13.jpg",
    "./pic/s3upgrade14.jpg",
    "./pic/s3upgrade15.jpg",
    "./pic/s3upgrade16.jpg"
)
const s4upgradeName = new Array("Synthesis","Molecular instability","Reaction Space","Self-catalyst","Reactivity I","Reactivity II","Reactivity III","Reactivity IV","Electrolysis","Nice.","High-energy environments","Beta+ Reaction","Electron Capture","Neutron Cluster","Stable molecules","New Stage");
const s4upgradeEffect = new Array(
    "Gain Molecules based on your current Mass.",
    "Gain more Molecules based on your current Planck Time. (only takes effect after 1e60 Planck Time)",
    "Gain more Molecules based on your current Space Foams. (only takes effect after 1e60 Space Foams)",
    "Gain more Molecules based on your current Molecules.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "Multiply Mass gain based on current molecules.",
    "Gain more Molecules based on your current Planck Time. (only takes effect after 1e65 Planck Time)",
    "Gain more Molecules based on your current Space Foams. (only takes effect after 1e65 Space Foams)",
    "Gain more Molecules based on your current Molecules, again.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages.",
    "1.3x boost on every resource from the first 4 stages, unaffected by softcaps from stages."
);
const s4images = new Array(
    "./pic/s4upgrade1.jpg",
    "./pic/s4upgrade2.jpg",
    "./pic/s4upgrade3.jpg",
    "./pic/s4upgrade4.jpg",
    "./pic/s4upgrade5.jpg",
    "./pic/s4upgrade6.jpg",
    "./pic/s4upgrade7.jpg",
    "./pic/s4upgrade8.jpg",
    "./pic/s4upgrade9.jpg",
    "./pic/s4upgrade10.jpg",
    "./pic/s4upgrade11.jpg",
    "./pic/s4upgrade12.jpg",
    "./pic/s4upgrade13.jpg",
    "./pic/s4upgrade14.jpg",
    "./pic/s4upgrade15.jpg",
    "./pic/s4upgrade16.jpg"
)
const prupgradeEffect = new Array(
    "x2 gain on everything, ignoring any in-stage softcaps.",
    "x1.5 all structures' production in Space and x1.8 Space Foams Gain.",
    "x2.3 Planck Time Gain.",
    "x2.4 Relative Mass Gain. (This boost is less affected by softcaps.)",
    "x1.5 all structures' production in Space and x2.3 Space Foams Gain.",
    "x2.3 Planck Time Gain.",
    "x2.4 Relative Mass Gain. (This boost is less affected by softcaps.)",
    "Get 1% of Time Extensions on prestige every real second.",
    "Gain 2 extra base Universes every reset.",
    "Gain 2 extra base Universes every reset.",
    "Gain 2 extra base Universes every reset.",
    "x2 Universes Gain.",
    "x2 Universes Gain.",
    "x2 gain on everything, ignoring any in-stage softcaps.",
    "Stage unlock upgrades are marginally cheaper.",
    "Prestige Upgrade 1x8 is 3 times faster."
);
const primages = new Array(
    "./pic/prupgrade1.jpg",
    "./pic/prupgrade2.jpg",
    "./pic/prupgrade3.jpg",
    "./pic/prupgrade4.jpg",
    "./pic/prupgrade5.jpg",
    "./pic/prupgrade6.jpg",
    "./pic/prupgrade7.jpg",
    "./pic/prupgrade8.jpg",
    "./pic/prupgrade9.jpg",
    "./pic/prupgrade10.jpg",
    "./pic/prupgrade11.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade1.jpg",
    "./pic/prupgrade15.jpg",
    "./pic/prupgrade16.jpg"
)
const pr2upgradeEffect = new Array(
    "You have enough particles to make some molecules. Unlock a new stage.",
    "x2 gain on everything, ignoring any in-stage softcaps.",
    "x3 Space Foam Gain.",
    "x2.3 Planck Time Gain.",
    "x2.7 Relative Mass Gain.",
    "x3 Molecules Gain.",
    "x2 Universe Gain.",
    "x2 Universe Gain.",
    "Unlock automation for Multipliers in Chemical stage.",
    "Unlock automation for Subatomic stage.",
    "Buying structures only consumes half as much resource.",
    "Automatically store 1% of your Multipliers every second.",
    "Add 0.05 to base Universe gain per OoM of Space Foams.",
    "Add 0.05 to base Universe gain per OoM of Planck Time.",
    "Add 0.15 to base Universe gain per OoM of Relative Mass.",
    "Add 0.4 to base Universe gain per OoM of Molecules.",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "Stored Multipliers multiply Universe gain at a reduced rate. (x1.1 per Stored Mult.)",
    "Passively produce universes at 25% of your fastest rate."
);
const pr2images = new Array(
    "./pic/prupgrade1.jpg",
    "./pic/prupgrade2.jpg",
    "./pic/prupgrade3.jpg",
    "./pic/prupgrade4.jpg",
    "./pic/prupgrade5.jpg",
    "./pic/prupgrade6.jpg",
    "./pic/prupgrade7.jpg",
    "./pic/prupgrade8.jpg",
    "./pic/prupgrade9.jpg",
    "./pic/prupgrade10.jpg",
    "./pic/prupgrade11.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade1.jpg",
    "./pic/prupgrade15.jpg",
    "./pic/prupgrade16.jpg",
    "./pic/prupgrade9.jpg",
    "./pic/prupgrade10.jpg",
    "./pic/prupgrade11.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade12.jpg",
    "./pic/prupgrade1.jpg",
    "./pic/prupgrade15.jpg",
    "./pic/prupgrade16.jpg"
)
const s1rows = [0, 1, 2, 3];
const s2rows = [0, 1, 2, 3];
const s3rows = [0, 1, 2];
const s4rows = [0, 1, 2];
const prrows = [0, 1, 2];
const pr2rows = [0, 1, 2, 3];

// Log the startPlayer object to the console
console.log("startPlayer:", startPlayer);
console.log("startPlayer.buy:", startPlayer.buy);

var Player = startPlayer;

function s1buildingscost(idx) {
    let info = {
        cost: Player_para.stage1.buildingsbasecost[idx] * Math.pow(Player_para.stage1.buildingscostinflation[idx], Player.stage1.buildingsbought[idx]),
        num: 1
    }
    return info;
}
function s1buildingscost_10(idx) {
    var tot = 0;
    for (var i = 0; i < 10; i++)tot += Player_para.stage1.buildingsbasecost[idx] * Math.pow(Player_para.stage1.buildingscostinflation[idx], Player.stage1.buildingsbought[idx] + i);
    let info = {
        cost: tot,
        num: 10
    }
    return info;
}
function s1buildingscost_max(idx) {
    let tot = 0, i = 0;
    for (; ; i++) {
        tot += Player_para.stage1.buildingsbasecost[idx] * Math.pow(Player_para.stage1.buildingscostinflation[idx], Player.stage1.buildingsbought[idx] + i);
        if (tot > Player.stage1.spacefoam) { tot -= Player_para.stage1.buildingsbasecost[idx] * Math.pow(Player_para.stage1.buildingscostinflation[idx], Player.stage1.buildingsbought[idx] + i); break; }
    }
    if (i == 0) return s1buildingscost(idx);
    let info = {
        cost: tot,
        num: i
    }
    return info;
}
function gets1BuildingName(idx) {
    var name = new Array("Dots", "Lines", "Planes", "Cubes", "Tesseracts");
    return name[idx];
}
function gets1Buildingid0(idx) { return "s1" + idx; }
function gets1Buildingid1(idx) { return "s1" + idx + "x"; }
function gets1Buildingid(idx) { return "s1" + idx + "num"; }
function gets1Buildingid2(idx) { return "s1" + idx + "prod"; }
function gets1Buildingid3(idx) { return "s1" + idx + "buy"; }
function gets1Buildingid4(idx) { return "s1" + idx + "auto"; }
function getMask(idx) { return "s1mask" + idx; }
function gets1BuildingImage(idx) {
    var name = new Array("dot.jpg", "line.jpg", "plane.jpg", "cube.jpg", "tesseract.jpg");
    return name[idx];
}
function changeBuy() {
    Player.buy++;
    Player.buy %= 3;
    Player.stage1.np++;
}
function swapauto(idx){
    Player.stage1.auto[idx]=1-Player.stage1.auto[idx];
}
function currents1purchase(idx) {
    if (ctrlHolding || shiftHolding) {
        if (ctrlHolding) return s1buildingscost_10(idx);
        else return s1buildingscost_max(idx);
    }
    if (Player.buy == 2) return s1buildingscost_max(idx);
    else if (Player.buy == 1) return s1buildingscost_10(idx);
    else return s1buildingscost(idx);
}
function purchases1buildings(idx) {
    // console.log(currents1purchase(idx));
    let csp = currents1purchase(idx);
    if (Player.stage1.spacefoam >= csp.cost) {
        Player.stage1.spacefoam -= csp.cost * (Player.prestige.upgrades2[10]?0.5:1);
        Player.stage1.buildings[idx] += csp.num;
        Player.stage1.buildingsbought[idx] += csp.num;
    }
    //app.$forceUpdate();
}
function s1prod(idx) {
    let prod = new Array(0, 0, 0, 0, 0);
    var totalb = 0;
    for (var i = 0; i < 5; i++)totalb += Player.stage1.buildingsbought[i];
    for (var i = 0; i < 5; i++)prod[i] = Player.stage1.buildings[i] * 1.00001;
    // app.$forceUpdate();
    if (Player.stage1.upgrades[0]) prod[0] *= 3;
    if (Player.stage1.upgrades[1]) prod[0] *= 3;
    if (Player.stage1.upgrades[2]) prod[0] *= 3;
    if(Player.prestige.upgrades[0])prod[0] *= 2;
    if(Player.prestige.upgrades[13])prod[0] *= 2;
    if(Player.prestige.upgrades[1])prod[0] *= 1.8;
    if(Player.prestige.upgrades[1])for(var i=0;i<5;i++)prod[i]*=1.5;
    if(Player.prestige.upgrades[4])prod[0] *= 2.3;
    if(Player.prestige.upgrades[4])for(var i=0;i<5;i++)prod[i]*=1.5;
    if(Player.prestige.upgrades2[1])prod[0] *= 2;
    if(Player.prestige.upgrades2[2])prod[0] *= 3;
    if (Player.stage1.upgrades[4]) prod[0] *= Math.pow(1.02, Player.stage1.buildingsbought[0]);
    if (Player.stage1.upgrades[5]) prod[1] *= 3;
    if (Player.stage1.upgrades[6]) prod[1] *= 3;
    if (Player.stage1.upgrades[8]) prod[1] *= Math.pow(1.02, Player.stage1.buildingsbought[1]);
    if (Player.stage1.upgrades[9]) prod[2] *= 3;
    if (Player.stage1.upgrades[12]) {
        for (var i = 0; i < 5; i++)prod[i] *= Math.pow(1.002, totalb);
    }
    if (Player.stage1.upgrades[14]) {
        for (var i = 0; i < 5; i++)prod[i] *= Math.pow(Player.stage1.spacefoam,0.005);
    }
    if(Player.stage4.upgrades[4]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[5]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[6]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[7]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[12]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[13]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[14]) prod[0] *= 1.3;
    if(Player.stage4.upgrades[15]) prod[0] *= 1.3;
    if(Player.depth >= 2)prod[0] *= Math.pow(1+Player.stage2.plancktime, 0.125);
    if(Player.depth >= 2)prod[0] = Math.pow(prod[0], 0.9);
    if(Player.depth >= 2)prod[0] *= 0.08;
    return prod[idx];
}
function s1DoEveryCycle() {
    for (var i = 3; i >= 0; i--)Player.stage1.buildings[i] += s1prod(i + 1) / 20 * optickspeedmult();
    Player.stage1.spacefoam += s1prod(0) / 20 * optickspeedmult();
    if (Player.stage1.upgrades[13]) Player.stage1.buildings[4] += Math.pow(s1prod(4), 0.5) / 20 * optickspeedmult();
    if (Player.stage1.upgrades[3]) Player.stage1.buildingsunlocked[1] = 1;
    if (Player.stage1.upgrades[7]) Player.stage1.buildingsunlocked[2] = 1;
    if (Player.stage1.upgrades[10]) Player.stage1.buildingsunlocked[3] = 1;
    if (Player.stage1.upgrades[11]) Player.stage1.buildingsunlocked[4] = 1;

    for(var i=0;i<5;i++)if(Player.stage1.auto[i] && s1auto(i))purchases1buildings(i);
}

function calcs1upgradecost(idx){
    let cost = Player_para.stage1.upgrade_cost[idx];
    if(idx==15 && Player.prestige.upgrades[14]) cost = Math.pow(cost, 0.3);
    return cost;
}
function purchases1upgrades(idx) {
    if (Player.stage1.spacefoam >= calcs1upgradecost(idx) && Player.stage1.upgrades[idx] == 0) {
        Player.stage1.spacefoam -= calcs1upgradecost(idx);
        Player.stage1.upgrades[idx] = 1;
    }
    hovers1upgrades(idx);
    UpdateButtons();
}
function gets1UpgradeEffect(idx) {
    var totalb = 0;
    for (var i = 0; i < 5; i++)totalb += Player.stage1.buildingsbought[i];
    if (idx == -1) return "Hover over an upgrade to see its effect!";
    if (idx == 0) return "3.00x";
    if (idx == 1) return "3.00x";
    if (idx == 2) return "3.00x";
    if (idx == 3) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 4) return formatNumber(Math.pow(1.02, Player.stage1.buildingsbought[0])) + "x";
    if (idx == 5) return "3.00x";
    if (idx == 6) return "3.00x";
    if (idx == 7) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 8) return formatNumber(Math.pow(1.02, Player.stage1.buildingsbought[1])) + "x";
    if (idx == 9) return "3.00x";
    if (idx == 10) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 11) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 12) return formatNumber(Math.pow(1.002, totalb)) + "x";
    if (idx == 13) return formatNumber(Math.pow(s1prod(4), 0.5)) + "/s";
    if (idx == 14) return formatNumber(Math.pow(Player.stage1.spacefoam,0.005)) + "x";
    if (idx == 15) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 16) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 17) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 18) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if (idx == 19) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    return "";
}
function s1auto(idx){
    if(idx==0&&Player.stage1.upgrades[16])return true;
    if(idx==1&&Player.stage1.upgrades[17])return true;
    if(idx==2&&Player.stage1.upgrades[18])return true;
    if(idx==3&&Player.stage1.upgrades[19])return true;
    if(idx==4&&Player.stage1.upgrades[19])return true;
    return false;
}
function s1BuyMaxUpgrades(){
    for(var i=0;i<Player.stage1.upgrades.length;i++)purchases1upgrades(i);
}
var cur_idx = -1;
function hovers1upgrades(idx) {
    cur_idx = idx;
    document.getElementById("s1upgradename").innerHTML =
        `<span style="color: gold;">Name: </span>` +
        `<span> [` + (1 + Math.floor(idx / 8)) + `x` + (1 + (idx % 8)) + `] </span>` +
        `<span>` + s1upgradeName[idx] + `</span> || ` +
        ((Player.stage1.upgrades[idx]) ?
            `<span style="color: green;">Bought!</span>` :
            `<span style="color: red;">Not Bought!</span>`);
    document.getElementById("s1upgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + s1upgradeEffect[idx] + `</span>`;
    document.getElementById("s1upgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcs1upgradecost(idx)) + ` Space Foams</span>`;
    document.getElementById("s1upgradeeff").innerHTML =
        `<span style="color: gold;">Effect: </span>` +
        `<span>` + gets1UpgradeEffect(idx) + `</span>`;
}
function s1upgradereset() {
    var tmp = Player.stage1.upgrades;
    Player.stage1 = { ...startPlayer.stage1 };
    Player.stage1.upgrades = tmp;
}

setInterval(function () {
    if(StageUnlocked(1))s1DoEveryCycle();
}, 50);



/* --- Stage2 --- */


function gets2Mask(idx) { return "s2mask" + idx; }
function gets2Mask2(idx) { return "s2maskxxx2" + idx; }
function calcs2upgradecost(idx){
    let cost =  Player_para.stage2.upgrade_cost[idx]*Math.pow(Player_para.stage2.upgrade_cost_scaling[idx],Player.stage2.upgrades[idx]);
    if(idx == 22 && Player.prestige.upgrades[14]) cost = Math.pow(cost, 0.25);
    return cost;
}
function purchases2upgrades(idx) {
    if (Player.stage2.plancktime >= calcs2upgradecost(idx) && Player.stage2.upgrades[idx] < Player_para.stage2.upgrade_max_level[idx]) {
        Player.stage2.plancktime -= calcs2upgradecost(idx);
        Player.stage2.upgrades[idx] += 1;
    }
    hovers2upgrades(idx);
    UpdateButtons();
}
function gets2UpgradeEffect(idx) {
    if (idx == -1) return "Hover over an upgrade to see its effect!";
    if(idx==0)return (Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==1)return (Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==2)return (Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==3)return (Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==4)return formatNumber(Math.pow(Player.stage2.tsitex+1,0.18*Player.stage2.upgrades[idx]))+"x";
    if(idx==5)return "1.5x";
    if(idx==6)return "^"+(1+0.125*Player.stage2.upgrades[idx]);
    if(idx==7)return "^1.35 (^0.7 if less than 1)";
    if(idx==8)return (Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==9)return (Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==10)return (Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==11)return (Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==12)return formatNumber(Math.pow(Player.stage2.tsitex+1,0.1*Player.stage2.upgrades[idx]))+"x";
    if(idx==13)return "1.2x";
    if(idx==14)return (Math.pow(1.075,Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==15)return "+"+(0.03*Player.stage2.upgrades[idx]);
    if(idx==16)return (Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==17)return (Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==18)return (Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==19)return (Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[idx]).toFixed(2))+"x";
    if(idx==20)return formatNumber(Math.pow(Player.stage2.tsitex+1,0.1*Player.stage2.upgrades[idx]))+"x";
    if(idx==21)return "2x";
    if (idx == 22) return (Player.stage1.upgrades[idx] ? "UNLOCKED" : "NOT YET UNLOCKED");
    if(idx==23)return formatNumber(Math.pow(5,Player.stage2.upgrades[idx]))+"x";
    return "";
}
var s2_cur_idx = -1;
function hovers2upgrades(idx) {
    s2_cur_idx = idx;
    document.getElementById("s2upgradename").innerHTML =
        `<span style="color: gold;">Name: </span>` +
        `<span> [` + (1 + Math.floor(idx / 8)) + `x` + (1 + (idx % 8)) + `] </span>` +
        `<span>` + s2upgradeName[idx] + `</span> || Level ` +
        (Player.stage2.upgrades[idx]) + " / " + Player_para.stage2.upgrade_max_level[idx];
    document.getElementById("s2upgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + s2upgradeEffect[idx] + `</span>`;
    document.getElementById("s2upgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcs2upgradecost(idx)) + ` Planck Time</span>`;
    document.getElementById("s2upgradeeff").innerHTML =
        `<span style="color: gold;">Effect: </span>` +
        `<span>` + gets2UpgradeEffect(idx) + `</span>`;
}

function s2BuyMaxUpgrades(){
    for(var i=0;i<Player.stage2.upgrades.length;i++)for(var j=0;j<Player_para.stage2.upgrade_max_level[i];j++)purchases2upgrades(i);
}
function calcs2PrestigeGain(){
    var tmp=Player.stage2.plancktime+1;
    tmp=Math.log10(tmp);
    tmp/=20;
    if(Player.stage2.upgrades[5])tmp*=1.5;
    if(Player.stage2.upgrades[13])tmp*=1.2;
    if(Player.stage2.upgrades[21])tmp*=2;
    if(Player.stage2.upgrades[7]){
        if(tmp<1)tmp=Math.pow(tmp,0.7);
        else tmp=Math.pow(tmp,1.35);
    }
    return tmp;
}
function s2abletoprestige(){return calcs2PrestigeGain()>Player.stage2.tex;}
function s2Prestige(){
    if(s2abletoprestige()){
        Player.stage2.tex=calcs2PrestigeGain();
        Player.stage2.plancktime=0;
        var tmp=(Player.stage2.upgrades[22]);
        for(var i=0;i<23;i++)Player.stage2.upgrades[i]=0;
        Player.stage2.upgrades[22]=tmp;
        Player.stage2.tsitex=0;
    }
}
function calcs2prestigeeffect(){
    return Math.pow((Player.stage2.tex+1),7*(1+0.125*Player.stage2.upgrades[6]));
}

function tps(){
    var prod=1;
    prod*=calcs2prestigeeffect();
    prod*=Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[0]);
    prod*=Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[1]);
    prod*=Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[2]);
    prod*=Math.pow(1.55+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[3]);
    prod*=Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[8]);
    prod*=Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[9]);
    prod*=Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[10]);
    prod*=Math.pow(1.5+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[11]);
    prod*=Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[16]);
    prod*=Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[17]);
    prod*=Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[18]);
    prod*=Math.pow(1.45+0.03*Player.stage2.upgrades[15],Player.stage2.upgrades[19]);
    prod*=Math.pow(1.075,Player.stage2.upgrades[14]);
    prod*=Math.pow(5,Player.stage2.upgrades[23]);
    if(Player.prestige.upgrades[0])prod*=2;
    if(Player.prestige.upgrades[13])prod*=2;
    if(Player.prestige.upgrades[2])prod*=2.3;
    if(Player.prestige.upgrades[5])prod*=2.3;
    if(Player.prestige.upgrades2[1])prod *= 2;
    if(Player.prestige.upgrades2[3])prod *= 2.2;
    prod*=Math.pow(Player.stage2.tsitex+1,0.18*Player.stage2.upgrades[4]+0.1*Player.stage2.upgrades[12]+0.1*Player.stage2.upgrades[20]);
    if(Player.stage4.upgrades[4]) prod *= 1.3;
    if(Player.stage4.upgrades[5]) prod *= 1.3;
    if(Player.stage4.upgrades[6]) prod *= 1.3;
    if(Player.stage4.upgrades[7]) prod *= 1.3;
    if(Player.stage4.upgrades[12]) prod *= 1.3;
    if(Player.stage4.upgrades[13]) prod *= 1.3;
    if(Player.stage4.upgrades[14]) prod *= 1.3;
    if(Player.stage4.upgrades[15]) prod *= 1.3;
    if(Player.depth >= 2)prod *= Math.pow(1+1e9*Player.stage3.mt, 0.15);
    if(Player.depth >= 2)prod = Math.pow(prod, 0.9);
    if(Player.depth >= 2)prod *= 0.2;
    return prod;
}

function s2DoEveryCycle(){
    Player.stage2.tsitex+=0.05;
    Player.stage2.plancktime+=tps()/20*optickspeedmult();
    if(Player.prestige.upgrades[7]) Player.stage2.tex += Math.max(0, (calcs2PrestigeGain()-Player.stage2.tex)/2000);
    if(Player.prestige.upgrades[15]) Player.stage2.tex += Math.max(0, (calcs2PrestigeGain()-Player.stage2.tex)/1000);
}

setInterval(function () {
    if(StageUnlocked(2))s2DoEveryCycle();
}, 50);



/* --- Stage3 --- */


function s3buildingseffective(idx){
    var a = Player.stage3.buildings;
    return a[idx];
}

function s3buildingscost(idx) {
    let info = {
        cost: Player_para.stage3.buildingsbasecost[idx] * Math.pow(Player_para.stage3.buildingscostinflation[idx], Player.stage3.buildingsbought[idx]),
        num: 1
    }
    return info;
}
function s3buildingscost_10(idx) {
    var tot = 0;
    for (var i = 0; i < 10; i++)tot += Player_para.stage3.buildingsbasecost[idx] * Math.pow(Player_para.stage3.buildingscostinflation[idx], Player.stage3.buildingsbought[idx] + i);
    let info = {
        cost: tot,
        num: 10
    }
    return info;
}
function s3buildingscost_max(idx) {
    var tot = 0, i = 0;
    for (; ; i++) {
        tot += Player_para.stage3.buildingsbasecost[idx] * Math.pow(Player_para.stage3.buildingscostinflation[idx], Player.stage3.buildingsbought[idx] + i);
        if (tot > Player.stage3.mt) { tot -= Player_para.stage3.buildingsbasecost[idx] * Math.pow(Player_para.stage3.buildingscostinflation[idx], Player.stage3.buildingsbought[idx] + i); break; }
    }
    if (i == 0) return s3buildingscost(idx);
    let info = {
        cost: tot,
        num: i
    }
    return info;
}
function currents3purchase(idx) {
    if (ctrlHolding || shiftHolding) {
        if (ctrlHolding) return s3buildingscost_10(idx);
        else return s3buildingscost_max(idx);
    }
    if (Player.buy == 2) return s3buildingscost_max(idx);
    else if (Player.buy == 1) return s3buildingscost_10(idx);
    else return s3buildingscost(idx);
}
function purchases3buildings(idx) {
    //console.log(currents3purchase(idx));
    let csp = currents3purchase(idx);
    if (Player.stage3.mt >= csp.cost) {
        Player.stage3.mt -= csp.cost * (Player.prestige.upgrades2[10]?0.5:1);
        Player.stage3.buildings[idx]+=csp.num;
        Player.stage3.buildingsbought[idx] += csp.num;
    }
    //app.$forceUpdate();
}
function s3swapauto(idx){
    Player.stage3.auto[idx]=1-Player.stage3.auto[idx];
}
function s3BuyMaxUpgrades(){
    for(var i=0;i<Player.stage3.upgrades.length;i++)purchases3upgrades(i);
}

function gets3Mask(idx) { return "s3mask" + idx; }
function calcs3upgradecost(idx){
    let cost = Player_para.stage3.upgrade_cost[idx];
    if(idx==15 && Player.prestige.upgrades[14]) cost = 1e-9*Math.pow(cost*1e9, 0.4);
    return cost;
}
function purchases3upgrades(idx) {
    if (Player.stage3.mt >= calcs3upgradecost(idx) && Player.stage3.upgrades[idx] ==0) {
        Player.stage3.mt -= calcs3upgradecost(idx);
        Player.stage3.upgrades[idx] += 1;
    }
    hovers3upgrades(idx);
    UpdateButtons();
}
var s3_cur_idx = -1;
function hovers3upgrades(idx) {
    s3_cur_idx = idx;
    document.getElementById("s3upgradename").innerHTML =
        `<span style="color: gold;">Name: </span>` +
        `<span> [` + (1 + Math.floor(idx / 8)) + `x` + (1 + (idx % 8)) + `] </span>` +
        `<span>` + s3upgradeName[idx] + `</span> || ` +
        ((Player.stage3.upgrades[idx]) ?
            `<span style="color: green;">Bought!</span>` :
            `<span style="color: red;">Not Bought!</span>`);
    document.getElementById("s3upgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + s3upgradeEffect[idx] + `</span>`;
    document.getElementById("s3upgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcs3upgradecost(idx)) + ` Relative Mass</span>`;
}
function s3getBuildingEff(idx){
    if(idx==1){
        var a=1,str="";
        var effb0=Math.min(1e4,Player.stage3.buildings[0]+1);
        if(Player.stage3.upgrades[0])a*=Math.pow(Player.stage3.buildings[0]+1,0.5);
        if(Player.stage3.upgrades[8])a*=Math.pow(Player.stage3.buildings[0]+1,0.345);
        if(Player.stage3.upgrades[1])a*=Math.pow(effb0,0.4);
        if(Player.stage3.upgrades[2])a*=Math.pow(effb0,0.3);
        if(Player.stage3.upgrades[3])a*=Math.pow(effb0,0.2);
        if(Player.stage3.upgrades[10])a*=Math.pow(1.025,Player.stage3.buildingsbought[0]);
        if(a>1e50)a=1e50;
        if(a>1)str+="Mass Gain x"+formatNumber(a)+(a>=1e50?" (Capped) ":"")+"<br>";
        if(Player.stage3.upgrades[12])str+="Electron production x"+formatNumber(Math.pow(1+Player.stage3.buildings[0],0.4))+"<br>";
        if(Player.stage3.upgrades[5])str+="Electron effect base +"+formatNumber(0.5*Math.log10(1+Math.min(Player.stage3.buildingsbought[0],999999)))+(Player.stage3.buildingsbought[0]>999999?" Capped":"")+"<br>";
        return str;
    }
    if(idx==2){
        var b=1,str="";
        var q=Math.pow(2+0.5*Math.log10(1+Math.min(Player.stage3.buildingsbought[0],999999))*Player.stage3.upgrades[5],Player.stage3.buildingsbought[1]);
        if((!Player.stage3.upgrades[7])&&q>69)q=69;
        else if(q>100)q=100*Math.pow(q/100,0.3);
        str+="Mass Gain x"+formatNumber(q)+(q==69?" (Capped) ":"")+"<br>";
        b=((Player.stage3.buildings[1]*(Player.stage3.buildingsbought[1])))/50;
        if(Player.stage3.upgrades[12])b*=(Math.pow(1+Player.stage3.buildings[0],0.4));
        if(Player.stage3.upgrades[11])str+="Produces "+formatNumber(b)+" Neutrinos per second.<br>";
        return str;
    }
    if(idx==3){
        var c=1,str="";
        c=(Math.pow(3,Player.stage3.buildings[2])-1)/50;
        str+="Produces "+formatNumber(c)+" Electrons per second.<br>";
        if(Player.stage3.upgrades[13])str+="Mass gain x"+formatNumber(Math.pow(1.4,Math.max(Player.stage3.buildingsbought[2]-20,0)))+" (unaffected by softcap)<br>"
        return str;
    }
    if(idx==4){
        var str="";
        var q=Math.pow(3,Player.stage3.buildings[3]);
        str+="Mass Gain x"+formatNumber(q)+"<br>";
        if(Player.stage3.upgrades[6])str+="Neutron Production x"+formatNumber(Math.pow(q,0.25))+"<br>";
        if(Player.stage3.upgrades[6])str+="Electron Production x"+formatNumber(Math.pow(q,0.5))+"<br>";
        return str;
    }
    return "None!";
}
function s3prod(){
    var prod=1e-9;
    var effb0=Math.min(1e4,Player.stage3.buildings[0]+1);
    var a=1;
    if(Player.stage3.upgrades[0])a*=Math.pow(Player.stage3.buildings[0]+1,0.5);
    if(Player.stage3.upgrades[1])a*=Math.pow(effb0,0.4);
    if(Player.stage3.upgrades[2])a*=Math.pow(effb0,0.3);
    if(Player.stage3.upgrades[3])a*=Math.pow(effb0,0.2);
    if(Player.stage3.upgrades[4])prod*=Math.pow((1+Player.stage3.mt*1e9),0.08);
    if(Player.stage3.upgrades[8])a*=Math.pow(Player.stage3.buildings[0]+1,0.345);
    if(Player.stage3.upgrades[9])prod*=1.69;
    if(Player.stage3.upgrades[10])a*=Math.pow(1.025,Player.stage3.buildingsbought[0]);
    if(a>=1e50)a=1e50;
    prod*=a;
    if(Player.stage3.upgrades[12])prod*=Math.pow(1+Player.stage3.buildings[0],0.4);
    var q=Math.pow(2+0.5*Math.log10(1+Math.min(Player.stage3.buildingsbought[0],999999))*Player.stage3.upgrades[5],Player.stage3.buildingsbought[1]);
    if((!Player.stage3.upgrades[7])&&q>69)q=69;
    else if(q>100)q=100*Math.pow(q/100,0.3);
    prod*=q;
    prod*=(Math.pow(3,Player.stage3.buildings[3]));
    if(prod>1)prod=Math.pow(prod,0.5);
    if(prod>1e4)prod=100*Math.pow(prod,0.5);
    if(Player.prestige.upgrades[3])prod*=2.4;
    if(Player.prestige.upgrades[6])prod*=2.4;
    if(Player.prestige.upgrades2[1])prod *= 2;
    if(Player.prestige.upgrades2[4])prod *= 2.7;
    if(prod>1e8){
        if(Player.stage3.upgrades[14])prod=10*Math.pow(prod,0.875);
        else prod=100*Math.pow(prod,0.75);
    }
    if(Player.prestige.upgrades[0])prod*=2;
    if(Player.prestige.upgrades[13])prod*=2;
    if(Player.stage3.upgrades[13])prod*=Math.pow(1.4,Math.max(Player.stage3.buildingsbought[2]-20,0));
    if(Player.stage4.upgrades[4]) prod *= 1.3;
    if(Player.stage4.upgrades[5]) prod *= 1.3;
    if(Player.stage4.upgrades[6]) prod *= 1.3;
    if(Player.stage4.upgrades[7]) prod *= 1.3;
    if(Player.stage4.upgrades[12]) prod *= 1.3;
    if(Player.stage4.upgrades[13]) prod *= 1.3;
    if(Player.stage4.upgrades[14]) prod *= 1.3;
    if(Player.stage4.upgrades[15]) prod *= 1.3;
    if(Player.stage4.upgrades[8])prod*=Math.pow(Player.stage4.mo+1, 0.25);
    if(Player.depth >= 2)prod = 1e-9*Math.pow(prod*1e9, 0.9);
    if(Player.depth >= 2)prod *= 0.08;
    return prod;
}

function s3DoEveryCycle(){
    Player.stage3.mt+=s3prod()/20*optickspeedmult();
    if(Player.stage3.upgrades[11])Player.stage3.buildings[0]+=(Math.pow(Math.pow(3,Player.stage3.buildings[3]),0.5*Player.stage3.upgrades[6]))*(Player.stage3.buildings[1]*(Player.stage3.buildingsbought[1]))*(Math.pow(1+Player.stage3.buildings[0],0.4*Player.stage3.upgrades[12]))/1000/**optickspeedmult()*/;
    Player.stage3.buildings[1]+=(Math.pow(3,Player.stage3.buildings[2])-1)*(Math.pow(Math.pow(3,Player.stage3.buildings[3]),0.25*Player.stage3.upgrades[6]))/1000*optickspeedmult();
    for(var i=0;i<4;i++)if(Player.stage3.auto[i])purchases3buildings(i);
}

setInterval(function () {
    if(StageUnlocked(3))s3DoEveryCycle();
}, 50);

/* --- Stage 4 --- */

function MultCost(){
    return Math.pow(10,12+Player.stage4.mult);
}
function BuyMult(){
    if(Player.stage4.mo >= MultCost()){
        Player.stage4.mo -= MultCost();
        Player.stage4.mult += 1;
    }
}
function StoreMult(){
    if(Player.stage4.stored_mult<Player.stage4.mult){
        Player.stage4.stored_mult=Player.stage4.mult;
        Player.stage4.mo = 0;
        Player.stage4.mult = 0;
        for(let i=0;i<Player.stage4.upgrades.length;i++)Player.stage4.upgrades[i]=0;
    }
}
function s4SwapAuto(){
    Player.stage4.auto = 1 - Player.stage4.auto;
}

function s4BuyMaxUpgrades(){
    for(var i=0;i<Player.stage4.upgrades.length;i++)purchases4upgrades(i);
}
function gets4Mask(idx) { return "s4mask" + idx; }
function calcs4upgradecost(idx){
    let cost = Player_para.stage4.upgrade_cost[idx];
    return cost;
}
function purchases4upgrades(idx) {
    if (Player.stage4.mo >= calcs4upgradecost(idx) && Player.stage4.upgrades[idx] ==0) {
        Player.stage4.mo -= calcs4upgradecost(idx);
        Player.stage4.upgrades[idx] += 1;
    }
    hovers4upgrades(idx);
    UpdateButtons();
}
function gets4UpgradeEffect(idx) {
    if (idx == -1) return "Hover over an upgrade to see its effect!";
    if (idx == 0) return formatNumber(Math.max(0, Math.log10(1e-5 + Player.stage3.mt))) + "/s";
    if (idx == 1) return formatNumber(Math.pow(Math.max(1, Math.log10(1+Player.stage2.plancktime)-59),2.5)) + "x";
    if (idx == 2) return formatNumber(Math.pow(Math.max(1, Math.log10(1+Player.stage1.spacefoam)-59),2.5)) + "x";
    if (idx == 3) return formatNumber(Math.pow(1+Player.stage4.mo, 0.1)) + "x";
    if (idx == 4) return "1.30x";
    if (idx == 5) return "1.30x";
    if (idx == 6) return "1.30x";
    if (idx == 7) return "1.30x";
    if (idx == 8) return formatNumber(Math.pow(Player.stage4.mo+1, 0.25)) + "x";
    if (idx == 9) return formatNumber(Math.pow(Math.max(1, Math.log10(1+Player.stage2.plancktime)-64),2.5)) + "x";
    if (idx == 10) return formatNumber(Math.pow(Math.max(1, Math.log10(1+Player.stage1.spacefoam)-64),2.5)) + "x";
    if (idx == 11) return formatNumber(Math.pow(1+Player.stage4.mo, 0.1)) + "x";
    if (idx == 12) return "1.30x";
    if (idx == 13) return "1.30x";
    if (idx == 14) return "1.30x";
    if (idx == 15) return "1.30x";
    return "";
}
var s4_cur_idx = -1;
function hovers4upgrades(idx) {
    s4_cur_idx = idx;
    document.getElementById("s4upgradename").innerHTML =
        `<span style="color: gold;">Name: </span>` +
        `<span> [` + (1 + Math.floor(idx / 8)) + `x` + (1 + (idx % 8)) + `] </span>` +
        `<span>` + s4upgradeName[idx] + `</span> || ` +
        ((Player.stage4.upgrades[idx]) ?
            `<span style="color: green;">Bought!</span>` :
            `<span style="color: red;">Not Bought!</span>`);
    document.getElementById("s4upgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + s4upgradeEffect[idx] + `</span>`;
    document.getElementById("s4upgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcs4upgradecost(idx)) + ` Molecules</span>`;
    document.getElementById("s4upgradeeff").innerHTML =
        `<span style="color: gold;">Effect: </span>` +
        `<span>` + gets4UpgradeEffect(idx) + `</span>`;
}
function s4prod(){
    let prod = 0;
    if(Player.stage4.upgrades[0]) prod = Math.max(1, Math.log10(1e-5 + Player.stage3.mt));
    if(Player.stage4.upgrades[1]) prod *= Math.pow(Math.max(1, Math.log10(1+Player.stage2.plancktime)-59),2.5);
    if(Player.stage4.upgrades[2]) prod *= Math.pow(Math.max(1, Math.log10(1+Player.stage1.spacefoam)-59),2.5);
    if(Player.stage4.upgrades[3]) prod *= Math.pow(1+Player.stage4.mo, 0.1);
    if(Player.stage4.upgrades[9]) prod *= Math.pow(Math.max(1, Math.log10(1+Player.stage2.plancktime)-64),2.5);
    if(Player.stage4.upgrades[10]) prod *= Math.pow(Math.max(1, Math.log10(1+Player.stage1.spacefoam)-64),2.5);
    if(Player.stage4.upgrades[11]) prod *= Math.pow(1+Player.stage4.mo, 0.1);
    if(Player.stage4.upgrades[4]) prod *= 1.3;
    if(Player.stage4.upgrades[5]) prod *= 1.3;
    if(Player.stage4.upgrades[6]) prod *= 1.3;
    if(Player.stage4.upgrades[7]) prod *= 1.3;
    if(Player.stage4.upgrades[12]) prod *= 1.3;
    if(Player.stage4.upgrades[13]) prod *= 1.3;
    if(Player.stage4.upgrades[14]) prod *= 1.3;
    if(Player.stage4.upgrades[15]) prod *= 1.3;
    if(Player.prestige.upgrades2[1])prod *= 2;
    if(Player.prestige.upgrades2[5])prod *= 3;
    prod *= Math.pow(2,Player.stage4.mult);
    prod *= Math.pow(1.6,Player.stage4.stored_mult);
    return prod;
}

function s4DoEveryCycle(){
    Player.stage4.mo+=s4prod()/20*optickspeedmult();
    if(Player.stage4.auto){
        while(Player.stage4.mo >= MultCost()){
            Player.stage4.mo -= MultCost();
            Player.stage4.mult += 1;
        }
    }
    if(Player.prestige.upgrades2[11]) Player.stage4.stored_mult += 0.0005 * Math.max(0,(Player.stage4.mult - Player.stage4.stored_mult));
}

setInterval(function () {
    if(StageUnlocked(4))s4DoEveryCycle();
}, 50);


/* --- Prestige --- */


function resetPlayer(){
    for(var i=0;i<5;i++)Player.stage1.buildings[i]=0;
    for(var i=0;i<5;i++)Player.stage1.buildingsunlocked[i]=0;
    Player.stage1.buildingsunlocked[0]=1;
    for(var i=0;i<5;i++)Player.stage1.buildingsbought[i]=0;
    for(var i=0;i<20;i++)Player.stage1.upgrades[i]=0;
    Player.stage1.spacefoam=10;
    Player.stage2.plancktime=0;
    Player.stage2.tex=0;
    Player.stage2.tsitex=0;
    for(var i=0;i<24;i++)Player.stage2.upgrades[i]=0;
    Player.stage3.mt=1e-9;
    for(var i=0;i<4;i++)Player.stage3.buildings[i]=0;
    for(var i=0;i<4;i++)Player.stage3.buildingsbought[i]=0;
    for(var i=0;i<16;i++)Player.stage3.upgrades[i]=0;
    for(var i=0;i<16;i++)Player.stage4.upgrades[i]=0;
    Player.stage4.mo=0;
    Player.stage4.mult=0;
    Player.stage4.stored_mult=0;
}
function UniReq(){
    if(Player.depth == 2) return 6.02e32;
    else return 6.02e26;
}
function AbleToUni() {
    if(!Player.prestige.upgrades[14] && Player.depth == 1) return Player.stage3.upgrades[15];
    else return (Player.stage3.mt >= UniReq());
}
function UniGain(){
    var gain = 5;
    if(Player.prestige.upgrades[8]) gain += 2;
    if(Player.prestige.upgrades[9]) gain += 2;
    if(Player.prestige.upgrades[10]) gain += 2;
    if(Player.prestige.upgrades2[12]) gain += 0.05*Math.log(1+Player.stage1.spacefoam);
    if(Player.prestige.upgrades2[13]) gain += 0.05*Math.log(1+Player.stage2.plancktime);
    if(Player.prestige.upgrades2[14]) gain += Math.max(0,0.15*Math.log(1+Player.stage3.mt));
    if(Player.prestige.upgrades2[15]) gain += 0.4*Math.log(1+Player.stage4.mo);
    if(Player.prestige.upgrades[11]) gain *= 2;
    if(Player.prestige.upgrades[12]) gain *= 2;
    if(Player.prestige.upgrades2[6]) gain *= 2;
    if(Player.prestige.upgrades2[7]) gain *= 2;
    if(Player.prestige.upgrades2[22]) gain *= Math.pow(1.1, Player.stage4.stored_mult);
    if(Player.depth >= 2) gain *= 10;
    return gain;
}

function Prestige(){
    if(!AbleToUni())return;
    Player.prestige.fastestrate = Math.max(Player.prestige.fastestrate, UniGain()/Player.prestige.timespent);
    Player.prestige.uni += UniGain();
    Player.prestige.timespent = 0;
    Player.prestige.uniresetcount += 1;
    resetPlayer();
    UpdateButtons();
}
function getprMask(idx) { return "prmask" + idx; }
function calcprupgradecost(idx){
    return Player_para.prestige.upgrade_cost[idx];
}
function purchaseprupgrades(idx) {
    if (Player.prestige.uni >= calcprupgradecost(idx) && Player.prestige.upgrades[idx] ==0) {
        Player.prestige.uni -= calcprupgradecost(idx);
        Player.prestige.upgrades[idx] += 1;
    }
    hoverprupgrades(idx);
    UpdateButtons();
}
var pr_cur_idx = -1;
function hoverprupgrades(idx) {
    pr_cur_idx = idx;
    document.getElementById("prupgradename").innerHTML =
        ((Player.prestige.upgrades[idx]) ?
            `<span style="color: green;">Bought!</span>` :
            `<span style="color: red;">Not Bought!</span>`);
    document.getElementById("prupgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + prupgradeEffect[idx] + `</span>`;
    document.getElementById("prupgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcprupgradecost(idx)) + ` Universes</span>`;
}
function getpr2Mask(idx) { return "pr2mask" + idx; }
function calcpr2upgradecost(idx){
    return Player_para.prestige.upgrade_cost2[idx];
}
function purchasepr2upgrades(idx) {
    if (Player.prestige.uni >= calcpr2upgradecost(idx) && Player.prestige.upgrades2[idx] ==0) {
        Player.prestige.uni -= calcpr2upgradecost(idx);
        Player.prestige.upgrades2[idx] += 1;
    }
    hoverpr2upgrades(idx);
    UpdateButtons();
}
var pr2_cur_idx = -1;
function hoverpr2upgrades(idx) {
    pr2_cur_idx = idx;
    document.getElementById("prupgradename").innerHTML =
        ((Player.prestige.upgrades2[idx]) ?
            `<span style="color: green;">Bought!</span>` :
            `<span style="color: red;">Not Bought!</span>`);
    document.getElementById("prupgradedesc").innerHTML =
        `<span style="color: gold;">Desc: </span>` +
        `<span>` + pr2upgradeEffect[idx] + `</span>`;
    document.getElementById("prupgradecost").innerHTML =
        `<span style="color: gold;">Cost: </span>` +
        `<span>` + formatNumber(calcpr2upgradecost(idx)) + ` Universes</span>`;
}
setInterval(function(){
    if(Player.prestige.upgrades2[23]) Player.prestige.uni += Player.prestige.fastestrate / 80;
    Player.prestige.timespent += 0.05;
},50);