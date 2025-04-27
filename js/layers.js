addLayer("tp", {
    name: "Tree Points",
    symbol: "TP",
    position: 0,
    startData() { return { unlocked: true, points: new Decimal(0) }},
    color: "#00FF00",
    resource: "Tree Points",
    type: "none",
    row: "side",
    layerShown() { return true },
    tabFormat: [
        "main-display",
        "resource-display",
        "blank",
        ["upgrades", [[1, 2, 3]]]
    ],
    upgrades: {
        1: {
            title: "Boost Tree Growth",
            description: "Earlier trees grow faster.",
            cost: new Decimal(3),
            unlocked() { return true },
        },
        2: {
            title: "Unlock New Trees",
            description: "Unlocks new branches.",
            cost: new Decimal(5),
            unlocked() { return true },
        },
        3: {
            title: "Legacy Synergy",
            description: "Finished trees buff unfinished trees.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("tp", 2) },
        },
    },
});

addLayer("root", {
    name: "World Tree",
    symbol: "WT",
    position: 0,
    startData() { return { unlocked: true, treeCompleted: false }},
    color: "#006400",
    row: 0,
    layerShown() { return !player.currentSubtree },
    tabFormat: [
        "main-display",
        "blank",
        ["clickables", [["root", 11], ["root", 12]]]
    ],
    clickables: {
        11: {
            display() { return "Enter Tree 1"; },
            canClick() { return true; },
            onClick() { player.currentSubtree = "tree1"; },
        },
        12: {
            display() { return "Enter Tree 2"; },
            canClick() { return hasUpgrade("tp", 2); },
            onClick() { player.currentSubtree = "tree2"; },
        },
    },
});

addLayer("tree1", {
    name: "First Sapling",
    symbol: "T1",
    position: 0,
    startData() { return { unlocked: true, points: new Decimal(0), treeCompleted: false }},
    color: "#32CD32",
    resource: "Saplings",
    baseResource: "points",
    baseAmount() { return player.points; },
    type: "normal",
    exponent: 0.5,
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    row: 1,
    layerShown() { return player.currentSubtree === "tree1"; },
    tabFormat: [
        "main-display",
        "resource-display",
        "blank",
        ["buyables", [[1]]],
        ["clickables", [["tree1", 11]]],
    ],
    buyables: {
        1: {
            cost(x) { return new Decimal(5).mul(x || 1); },
            effect(x) { return Decimal.pow(2, x || 0); },
            title: "Grow More Branches",
            display() { return `Double sapling gain. Bought: ${getBuyableAmount("tree1", 1)}`; },
            canAfford() { return player.tree1.points.gte(this.cost()); },
            buy() {
                player.tree1.points = player.tree1.points.sub(this.cost());
                setBuyableAmount("tree1", 1, getBuyableAmount("tree1", 1).add(1));
            },
        },
    },
    clickables: {
        11: {
            display() { return player.tree1.points.gte(100) ? "Complete Tree" : "Reach 100 Saplings to Finish"; },
            canClick() { return player.tree1.points.gte(100); },
            onClick() {
                player.tree1.treeCompleted = true;
                player.currentSubtree = null;
                gainTreePoints("tree1");
            },
        },
    },
});

addLayer("tree2", {
    name: "Second Sapling",
    symbol: "T2",
    position: 1,
    startData() { return { unlocked: true, points: new Decimal(0), treeCompleted: false }},
    color: "#8FBC8F",
    resource: "Twigs",
    baseResource: "points",
    baseAmount() { return player.points; },
    type: "normal",
    exponent: 0.5,
    gainMult() { return new Decimal(1); },
    gainExp() { return new Decimal(1); },
    row: 1,
    layerShown() { return player.currentSubtree === "tree2"; },
    tabFormat: [
        "main-display",
        "resource-display",
        "blank",
        ["buyables", [[1]]],
        ["clickables", [["tree2", 11]]],
    ],
    buyables: {
        1: {
            cost(x) { return new Decimal(10).mul(x || 1); },
            effect(x) { return Decimal.pow(1.5, x || 0); },
            title: "Thicker Branches",
            display() { return `Multiply twig gain. Bought: ${getBuyableAmount("tree2", 1)}`; },
            canAfford() { return player.tree2.points.gte(this.cost()); },
            buy() {
                player.tree2.points = player.tree2.points.sub(this.cost());
                setBuyableAmount("tree2", 1, getBuyableAmount("tree2", 1).add(1));
            },
        },
    },
    clickables: {
        11: {
            display() { return player.tree2.points.gte(150) ? "Complete Tree" : "Reach 150 Twigs to Finish"; },
            canClick() { return player.tree2.points.gte(150); },
            onClick() {
                player.tree2.treeCompleted = true;
                player.currentSubtree = null;
                gainTreePoints("tree2");
            },
        },
    },
});
