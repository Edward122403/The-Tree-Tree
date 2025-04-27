let modInfo = {
    name: "The Tree Tree",
    id: "treeTree",
    author: "Edward1224",
    pointsName: "Tree Points",
    modFiles: ["layers.js", "tree.js"],

    initialStartPoints: new Decimal(0),
    offlineLimit: 1, // In hours
};

let VERSION = {
    num: "0.0.1",
    name: "The First Tree",
};

let changelog = `<h1>Changelog:</h1><br><br>v0.0.1 - Starter Kit`;

let winText = `Congratulations! You've beaten all the trees... for now!`;

function getStartPoints() {
    return new Decimal(0);
}

function canGenPoints() {
    return false; // No passive Tree Points generation
}

function gainTreePoints(layer) {
    let gain = new Decimal(1);
    player.points = player.points.add(gain);
}

function isLayerVisible(layer) {
    if (!player[layer]) return false;
    if (layer === "tp") return true;
    if (player.currentSubtree && player.currentSubtree !== layer) return false;
    return player[layer].unlocked;
}
