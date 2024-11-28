class Z3Scene extends Phaser.Scene {
    constructor(my) {
        super("z3scene");
        this.my = my;
    }

    init() {
        this.tileSize = 16;
        this.scaleFactor = 1.5;
        this.mapWidth = 40;
        this.mapHeight = 25;
    }

    getMapData() {
        const tileData = {
            tileTypes: {
                0: "normal ground",    // Ground but not walkable
                1: "normal ground",    // Ground but not walkable
                2: "normal ground",    // Ground but not walkable
                3: "tree",             // Tree
                4: "tree",             // Tree
                5: "tree",             // Tree
                6: "tree",             // Tree
                7: "tree",             // Tree
                8: "tree",             // Tree
                9: "tree",             // Tree
                10: "tree",            // Tree
                11: "tree",            // Tree
                12: "path",            // Walkable ground
                13: "path",            // Walkable ground
                14: "path",            // Walkable ground
                15: "tree",            // Tree
                16: "tree",            // Tree
                17: "tree",            // Tree
                18: "tree",            // Tree
                19: "tree",            // Tree
                20: "tree",            // Tree
                21: "tree",            // Tree
                22: "tree",            // Tree
                23: "tree",            // Tree
                24: "path",            // Walkable ground
                25: "path",            // Walkable ground
                26: "path",            // Walkable ground
                27: "tree",            // Tree
                28: "tree",            // Tree
                29: "tree",            // Tree
                30: "tree",            // Tree
                31: "tree",            // Tree
                32: "tree",            // Tree
                33: "tree",            // Tree
                34: "tree",            // Tree
                35: "tree",            // Tree
                36: "path",            // Walkable ground
                37: "path",            // Walkable ground
                38: "path",            // Walkable ground
                39: "path",            // Walkable ground
                40: "path",            // Walkable ground
                41: "path",            // Walkable ground
                42: "path",            // Walkable ground
                43: "path",            // Walkable ground
                44: "fence",           // Fence
                45: "fence",           // Fence
                46: "fence",           // Fence
                47: "fence",           // Fence
                48: "roof",            // Roof
                49: "roof",            // Roof
                50: "roof",            // Roof
                51: "roof",            // Roof
                52: "roof",            // Roof
                53: "roof",            // Roof
                54: "roof",            // Roof
                55: "roof",            // Roof
                56: "fence",           // Fence
                57: "fence with wheelbarrow", // Fence with special object
                58: "fence",           // Fence
                59: "fence",           // Fence
                60: "roof",            // Roof
                61: "roof",            // Roof
                62: "roof",            // Roof
                63: "roof",            // Roof
                64: "roof",            // Roof
                65: "roof",            // Roof
                66: "roof",            // Roof
                67: "roof",            // Roof
                68: "fence",           // Fence
                69: "fence",           // Fence
                70: "fence",           // Fence
                71: "fence",           // Fence
                72: "wall",            // Wall
                73: "wall",            // Wall
                74: "door",            // Door
                75: "wall",            // Wall
                76: "wall",            // Wall
                77: "wall",            // Wall
                78: "door",            // Door
                79: "wall",            // Wall
                80: "fence",           // Fence
                81: "fence",           // Fence
                82: "fence",           // Fence
                83: "sign",            // Sign
                84: "wall",            // Wall
                85: "door",            // Door
                86: "door",            // Door
                87: "door",            // Door
                88: "wall",            // Wall
                89: "door",            // Door
                90: "door",            // Door
                91: "door",            // Door
                92: "object",          // Generic object
                93: "object",          // Generic object
                94: "object",          // Generic object
                95: "object",          // Generic object
                96: "roof",            // Roof
                97: "roof",            // Roof
                98: "roof",            // Roof
                99: "wall",            // Wall
                100: "wall",           // Wall
                101: "wall",           // Wall
                102: "wall",           // Wall
                103: "object",         // Generic object
                104: "object",         // Generic object
                105: "object",         // Generic object
                106: "object",         // Generic object
                107: "object",         // Generic object
                108: "roof",           // Roof
                109: "roof",           // Roof
                110: "roof",           // Roof
                111: "wall",           // Wall
                112: "wall",           // Wall
                113: "wall",           // Wall
                114: "wall",           // Wall
                115: "object",         // Generic object
                116: "object",         // Generic object
                117: "object",         // Generic object
                118: "object",         // Generic object
                119: "object",         // Generic object
                120: "roof",           // Roof
                121: "roof",           // Roof
                122: "roof",           // Roof
                123: "door",           // Door
                124: "door",           // Door
                125: "wall",           // Wall
                126: "wall",           // Wall
                127: "object",         // Generic object
                128: "object",         // Generic object
                129: "object",         // Generic object
                130: "object",         // Generic object
                131: "object"          // Generic object
            },
            layers: {
                ground: this.groundLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index),
                trees: this.treesLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index),
                structures: this.structuresLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index),
            },
        };
        return tileData;
    }
    
    async generateConstraintsFromLLM(mapData, ruleDescription) {
        const prompt = `
        You are generating SMT-LIB constraints for a procedural tilemap system. Here is the current map data:
        
        Tile Types:
        ${JSON.stringify(mapData.tileTypes)}
        
        Ground Layer (2D array of tile IDs):
        ${JSON.stringify(mapData.layers.ground)}

        Trees Layer (2D array of tile IDs):
        ${JSON.stringify(mapData.layers.trees)}
        
        Structures Layer (2D array of tile IDs):
        ${JSON.stringify(mapData.layers.structures)}
        
        Generate SMT-LIB constraints that satisfy the following rules:
        ${ruleDescription} (update this part)
        
        Output only valid SMT-LIB constraints. Do not include any additional text, explanations, acknowledgments, or comments. Ensure the constraints are correctly formatted for direct parsing by Z3.
        `;
            // Print the prompt to the console
        console.log("Generated prompt for queryLLM:", prompt);
        // const constraints = await queryLLM(prompt);
        // return constraints;
    }

    async solveSMTLibConstraints(smtlibString, tileLayer) {
        const { Solver, Int, And, Or, Distinct, Not } = new this.my.Context("main");
        const solver = new Solver();

        try {
            solver.fromString(smtlibString);
        } catch (error) {
            console.error("Failed to parse LLM constraints:", error);
            return null;
        }

        // Collect valid positions dynamically
        const validPositions = [];
        while ((await solver.check()) === "sat") {
            const model = solver.model();

            // Extract all variables dynamically
            const position = {};
            model.decls().forEach((decl) => {
                const varName = decl.name(); // Get variable name
                const value = parseInt(model.eval(decl).asString()); // Get variable value
                position[varName] = value;
            });

            validPositions.push(position);

            // Add a constraint to exclude the current solution
            const exclusionConstraint = Object.keys(position).map((varName) =>
                Int.const(varName).eq(position[varName])
            );
            solver.add(Not(And(...exclusionConstraint))); // Exclude this solution
        }

        if (validPositions.length === 0) {
            console.warn("No valid positions found.");
            return null;
        }

        // console.log("Valid positions:", validPositions);

        // Return the first valid position for demonstration purposes
        return validPositions[Math.floor(Math.random() * validPositions.length)];
    }

    async create() {
        this.map = this.add.tilemap("three-farmhouses", this.tileSize, this.tileSize, this.mapHeight, this.mapWidth);

        // Add a tileset to the map
        this.tileset = this.map.addTilesetImage("kenney-tiny-town", "tilemap_tiles");

        // Create layers
        this.groundLayer = this.map.createLayer("Ground-n-Walkways", this.tileset, 0, 0);
        this.treesLayer = this.map.createLayer("Trees-n-Bushes", this.tileset, 0, 0);
        this.structuresLayer = this.map.createLayer("Houses-n-Fences", this.tileset, 0, 0);

        // Camera settings
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(this.scaleFactor);

        // call getMapData() to get the map data
        const mapData = this.getMapData();

        // call generateConstraintsFromLLM() to check query (debug)
        const ruleDescription = `no rule, test command');`;
        const constraints = await this.generateConstraintsFromLLM(mapData, ruleDescription);
        
    }
}

