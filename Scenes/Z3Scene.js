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

    getMapData(printAscii = false, printNormal = false) {
        // Convert a flat array to a 2D array
        function reshapeTo2DArray(flatArray, width, height) {
            const reshaped = [];
            for (let i = 0; i < height; i++) {
                reshaped.push(flatArray.slice(i * width, (i + 1) * width));
            }
            return reshaped;
        }
    
        const groundLayer = this.groundLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index);
        const treesLayer = this.treesLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index);
        const structuresLayer = this.structuresLayer.getTilesWithin(0, 0, this.mapWidth, this.mapHeight).map(tile => tile.index);
    
        const ground2D = reshapeTo2DArray(groundLayer, this.mapWidth, this.mapHeight);
        const trees2D = reshapeTo2DArray(treesLayer, this.mapWidth, this.mapHeight);
        const structures2D = reshapeTo2DArray(structuresLayer, this.mapWidth, this.mapHeight);
    
        const tileTypes = {
            1: "normal ground",
            2: "normal ground",
            3: "normal ground with flowers",
            4: "big yellow tree top",
            5: "big green tree top",
            6: "green bush",
            7: "tree bunch varition 1 green top left",
            8: "tree bunch varition 2 green top",
            9: "tree bunch varition 1 green top right",
            10: "tree bunch varition 1 yellow top left",
            11: "tree bunch varition 2 yellow top",
            12: "tree bunch varition 1 yellow top right",
            13: "path",
            14: "path",
            15: "path",
            16: "big yellow tree bottom",
            17: "big green tree top",
            18: "small plant",
            19: "tree bunch varition 2 green left",
            20: "tree bunch varition 2 green middle",
            21: "tree bunch varition 2 green right",
            22: "tree bunch varition 2 yellow left",
            23: "tree bunch varition 2 yellow middle",
            24: "tree bunch varition 2 yellow right",
            25: "path",
            26: "path",
            27: "path",
            28: "small yellow tree whole",
            29: "small green tree whole",
            30: "mushroom",
            31: "tree bunch varition 1 green bottom left",
            32: "tree bunch varition 2 green bottom",
            33: "tree bunch varition 1 green bottom right",
            34: "tree bunch varition 1 yellow bottom left",
            35: "tree bunch varition 2 yellow bottom",
            36: "tree bunch varition 1 yellow bottom right",
            37: "path",
            38: "path",
            39: "path",
            40: "path",
            41: "path",
            42: "path",
            43: "path",
            44: "path",
            45: "fence",
            46: "fence",
            47: "fence",
            48: "fence",
            49: "roof",
            50: "roof",
            51: "roof",
            52: "chimney",
            53: "roof",
            54: "roof",
            55: "roof",
            56: "chimney",
            57: "fence",
            58: "wheelbarrow",
            59: "fence",
            60: "fence",
            61: "roof",
            62: "roof",
            63: "roof",
            64: "roof",
            65: "roof",
            66: "roof",
            67: "roof",
            68: "roof",
            69: "fence",
            70: "fence",
            71: "fence",
            72: "fence",
            73: "wall",
            74: "wall",
            75: "door",
            76: "wall",
            77: "wall",
            78: "wall",
            79: "door",
            80: "wall",
            81: "fence",
            82: "fence",
            83: "fence",
            84: "sign",
            85: "wall",
            86: "door",
            87: "door",
            88: "door",
            89: "wall",
            90: "door",
            91: "door",
            92: "door",
            93: "well top",
            94: "coin",
            95: "beehive",
            96: "target object",
            97: "roof",
            98: "roof",
            99: "roof",
            100: "wall",
            101: "wall",
            102: "wall",
            103: "wall",
            104: "object",
            105: "well bottom",
            106: "bomb",
            107: "log",
            108: "empty bag",
            109: "roof",
            110: "roof",
            111: "roof",
            112: "wall",
            113: "wall",
            114: "wall",
            115: "wall",
            116: "pickaxe",
            117: "rake",
            118: "key",
            119: "bow",
            120: "arrow",
            121: "roof",
            122: "roof",
            123: "roof",
            124: "door",
            125: "door",
            126: "wall",
            127: "wall",
            128: "axe",
            129: "shovel",
            130: "scythe",
            131: "empty bucket",
            132: "water bucket"
        };
    
        const tileSymbols = {
            // Ground
            "normal ground": ".",
            "normal ground with flowers": ":",
            
            // Trees and plants
            "big yellow tree top": "Y",
            "big yellow tree bottom": "y",
            "big green tree top": "G",   // both occurrences of "big green tree top"
            "small plant": "'",
            "green bush": "b",
            "small yellow tree whole": "y",
            "small green tree whole": "f",
            "mushroom": "m",
        
            // Tree bunch variations (all condensed to 't')
            "tree bunch varition 1 green top left": "t",
            "tree bunch varition 2 green top": "t",
            "tree bunch varition 1 green top right": "t",
            "tree bunch varition 1 yellow top left": "t",
            "tree bunch varition 2 yellow top": "t",
            "tree bunch varition 1 yellow top right": "t",
            "tree bunch varition 2 green left": "t",
            "tree bunch varition 2 green middle": "t",
            "tree bunch varition 2 green right": "t",
            "tree bunch varition 2 yellow left": "t",
            "tree bunch varition 2 yellow middle": "t",
            "tree bunch varition 2 yellow right": "t",
            "tree bunch varition 1 green bottom left": "t",
            "tree bunch varition 2 green bottom": "t",
            "tree bunch varition 1 green bottom right": "t",
            "tree bunch varition 1 yellow bottom left": "t",
            "tree bunch varition 2 yellow bottom": "t",
            "tree bunch varition 1 yellow bottom right": "t",
        
            // Paths
            "path": "P",
        
            // Fences
            "fence": "F",
        
            // Roofs and chimneys
            "roof": "^",
            "chimney": "C",
        
            // Walls and doors
            "wall": "#",
            "door": "D",
        
            // Objects and items
            "wheelbarrow": "W",
            "sign": "S",
            "well top": "T",
            "coin": "$",
            "beehive": "B",
            "target object": "X",
            "well bottom": "w",
            "bomb": "*",
            "log": "L",
            "empty bag": "E",
            "pickaxe": "p",
            "rake": "r",
            "key": "k",
            "bow": ">",
            "arrow": "-",
            "axe": "x",
            "shovel": "v",
            "scythe": "h",
            "empty bucket": "U",
            "water bucket": "u",
            "object": "O",
        
            // Unknown or unhandled
            "unknown": "?"
        };        
    
        // Combine layers into a single 2D array and map tile IDs to types
        const finalMap = [];
        for (let y = 0; y < this.mapHeight; y++) {
            const row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                // Priority: structures > trees > ground
                const structureTile = structures2D[y][x];
                const treeTile = trees2D[y][x];
                const groundTile = ground2D[y][x];
    
                let tileID = -1;
                if (structureTile !== -1) {
                    tileID = structureTile; // Use structure tile if present
                } else if (treeTile !== -1) {
                    tileID = treeTile; // Use tree tile if present
                } else {
                    tileID = groundTile; // Default to ground tile
                }
    
                const tileType = tileTypes[tileID] || "unknown";
                row.push(tileType);
            }
            finalMap.push(row);
        }
    
        // Create ASCII representation
        const asciiRows = finalMap.map(row => row.map(tileType => tileSymbols[tileType] || '?').join(''));
    
        // Print the chosen format(s)
        if (printNormal) {
            console.log("Normal (Descriptive) Map Data:");
            console.log(finalMap);
        }
    
        if (printAscii) {
            console.log("ASCII Visualization:");
            asciiRows.forEach(line => console.log(line));
        }
    
        return { tileSymbols, tileTypes, finalMap, asciiRows };
    }
    
    
    async generateConstraintsFromLLM(mapData, ruleDescription) {    
        const prompt = `
            Below is an ASCII representation of a procedural tilemap. Each symbol represents a specific type of tile or object. The most important thing is their position on the map. 
            The map is a 2D grid where each cell represents a tile or object. The following symbols are used to represent different types of tiles and objects:

            Legend:
            "normal ground": ".",
            "normal ground with flowers": ":",
            
            // Trees and plants
            "big yellow tree top": "Y",
            "big yellow tree bottom": "y",
            "big green tree top": "G",   // both occurrences of "big green tree top"
            "small plant": "'",
            "green bush": "b",
            "small yellow tree whole": "y",
            "small green tree whole": "f",
            "mushroom": "m",
        
            // Tree bunch variations (all condensed to 't')
            "tree bunch varition 1 green top left": "t",
            "tree bunch varition 2 green top": "t",
            "tree bunch varition 1 green top right": "t",
            "tree bunch varition 1 yellow top left": "t",
            "tree bunch varition 2 yellow top": "t",
            "tree bunch varition 1 yellow top right": "t",
            "tree bunch varition 2 green left": "t",
            "tree bunch varition 2 green middle": "t",
            "tree bunch varition 2 green right": "t",
            "tree bunch varition 2 yellow left": "t",
            "tree bunch varition 2 yellow middle": "t",
            "tree bunch varition 2 yellow right": "t",
            "tree bunch varition 1 green bottom left": "t",
            "tree bunch varition 2 green bottom": "t",
            "tree bunch varition 1 green bottom right": "t",
            "tree bunch varition 1 yellow bottom left": "t",
            "tree bunch varition 2 yellow bottom": "t",
            "tree bunch varition 1 yellow bottom right": "t",
        
            // Paths
            "path": "P",
        
            // Fences
            "fence": "F",
        
            // Roofs and chimneys
            "roof": "^",
            "chimney": "C",
        
            // Walls and doors
            "wall": "#",
            "door": "D",
        
            // Objects and items
            "wheelbarrow": "W",
            "sign": "S",
            "well top": "T",
            "coin": "$",
            "beehive": "B",
            "target object": "X",
            "well bottom": "w",
            "bomb": "*",
            "log": "L",
            "empty bag": "E",
            "pickaxe": "p",
            "rake": "r",
            "key": "k",
            "bow": ">",
            "arrow": "-",
            "axe": "x",
            "shovel": "v",
            "scythe": "h",
            "empty bucket": "U",
            "water bucket": "u",
            "object": "O",
        
            // Unknown or unhandled
            "unknown": "?"

            Current Map:
            ${mapData.asciiRows.join("\n")}

            Task:
            ${ruleDescription}

            Output:
            Return only the modified ASCII map. Ensure the format matches the original map with any changes you implemented (same width, height, and structure). Do not include explanations or additional text.

        `;
        // Print the prompt to the console
        // console.log("Generated prompt for queryLLM:", prompt);
        // const constraints = await queryLLM(prompt);
        return prompt;
    }

    // Function to query the LLM
    async queryLLM(prompt) {
        
        const generationConfig = {
            temperature: 0.5,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = this.my.model.startChat({
            generationConfig,
            history: [
            ],
          });
        
          const result = await chatSession.sendMessage(prompt);
          return result.response.text();
    }
    
    compareMaps(currentMap, newMap) {
        const changes = [];
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const currentTile = currentMap[y][x];
                const newTile = newMap[y][x];
                if (currentTile !== newTile) {
                    changes.push({ x, y, newTile });
                }
            }
        }
        return changes;
    }

    /**
     * Helper: Invert tileSymbols to map from ASCII char to tileType.
     */
    invertTileSymbols(tileSymbols) {
        const asciiToType = {};
        for (const [type, ascii] of Object.entries(tileSymbols)) {
            asciiToType[ascii] = type;
        }
        return asciiToType;
    }

    /**
     * Helper: Create a mapping from tileType to a list of tileIDs that represent it.
     */
    createTypeToTileIDs(tileTypes) {
        const typeToIDs = {};
        for (const [id, type] of Object.entries(tileTypes)) {
            if (!typeToIDs[type]) {
                typeToIDs[type] = [];
            }
            typeToIDs[type].push(parseInt(id));
        }
        return typeToIDs;
    }

    /**
     * Decide which layer to place the tile on, based on the tileType.
     * This logic is heuristic; feel free to adjust as needed.
     */
    chooseLayerForTile(tileType) {
        // Examples:
        // Structures: walls, doors, fences, roofs, chimneys, signs, objects
        // Trees: tree, bush, mushroom, plant-related
        // Otherwise: ground

        const structuresKeywords = ["wall", "door", "roof", "chimney", "sign", "fence", "object", "well", "bomb", "log", "coin", "beehive", "target", "bucket", "bow", "arrow", "pickaxe", "rake", "axe", "scythe", "shovel"];
        const treesKeywords = ["tree", "bush", "mushroom", "plant", "flower"];

        const lowerType = tileType.toLowerCase();

        if (structuresKeywords.some(kw => lowerType.includes(kw))) {
            return this.structuresLayer;
        } else if (treesKeywords.some(kw => lowerType.includes(kw))) {
            return this.treesLayer;
        } else {
            // default to ground layer
            return this.groundLayer;
        }
    }

    /**
     * Apply map changes to the tilemap.
     * @param {Array} changes - array of {x, y, newTile} objects, where newTile is the ASCII char.
     * @param {Object} tileSymbols - mapping of tileType -> ASCII
     */
    applyMapChanges(changes, tileSymbols) {
        // Get the current tile data
        const { tileTypes, finalMap } = this.getMapData(false, false);

        // Invert tileSymbols to get ASCII -> tileType
        const asciiToType = this.invertTileSymbols(tileSymbols);

        // Create a reverse lookup from tileType to tileIDs
        const typeToIDs = this.createTypeToTileIDs(tileTypes);

        for (const change of changes) {
            const { x, y, newTile } = change;

            // Get tileType from ASCII
            const tileType = asciiToType[newTile] || "unknown";

            if (tileType === "unknown") {
                console.warn(`Unknown tile type for ASCII char "${newTile}" at (${x}, ${y}). Skipping.`);
                continue;
            }

            // Find a suitable tileID for this tileType
            const possibleIDs = typeToIDs[tileType];
            if (!possibleIDs || possibleIDs.length === 0) {
                console.warn(`No tileID found for tileType "${tileType}" at (${x}, ${y}). Skipping.`);
                continue;
            }

            // For simplicity, pick the first available tileID
            const chosenTileID = possibleIDs[0];

            // Choose which layer to place the tile on
            const chosenLayer = this.chooseLayerForTile(tileType);

            // Set the tile at the position
            chosenLayer.putTileAt(chosenTileID, x, y);
        }
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

        const graphics = this.add.graphics();
        const tileSize = this.tileSize;
    
        // Draw grid lines
        graphics.lineStyle(1, 0xaaaaaa, 0.5); // Light gray grid
        for (let x = 0; x <= this.mapWidth; x++) {
            graphics.moveTo(x * tileSize , 0);
            graphics.lineTo(x * tileSize , this.map.heightInPixels);
        }
        for (let y = 0; y <= this.mapHeight; y++) {
            graphics.moveTo(0, y * tileSize );
            graphics.lineTo(this.map.widthInPixels, y * tileSize );
        }
        graphics.strokePath();
    
        // Add axis labels
        for (let x = 0; x < this.mapWidth; x++) {
            const labelX = x * tileSize  + tileSize / 2;
            this.add.text(labelX, 5, `${x}`, { // Adjust Y position to make labels visible
                font: "10px Arial",
                color: "#ffffff",
                backgroundColor: "#000000",
            }).setOrigin(0.5);
        }
        for (let y = 0; y < this.mapHeight; y++) {
            const labelY = y * tileSize  + tileSize / 2;
            this.add.text(5, labelY, `${y}`, { // Adjust X position to make labels visible
                font: "10px Arial",
                color: "#ffffff",
                backgroundColor: "#000000",
            }).setOrigin(0.5);
        }

        // call getMapData() to get the map data
        const mapData = this.getMapData(false, false);

        // call generateConstraintsFromLLM() to check query (debug)
        const ruleDescription = 
            `Add 1 more chimney on the house to the top right. Do not modify any other part of the map that doesnt need to be modified, you can replace tiles.`;
        
        const prompt = await this.generateConstraintsFromLLM(mapData, ruleDescription);
        
        console.log("Generated prompt for queryLLM:", prompt); //uncomment to show the prompt
        
        const { asciiRows: currentAsciiMap, tileSymbols } = this.getMapData(false, false);

        const newAsciiMapString = await this.queryLLM(prompt);
        const newAsciiMap = newAsciiMapString.split("\n").map(row => row.split(""));

        const changes = this.compareMaps(currentAsciiMap, newAsciiMap);
        console.log("Map Changes:", changes);

        //print the ascii version of the new map
        console.log("New Map:");
        newAsciiMap.forEach(line => console.log(line.join("")));
        

        this.applyMapChanges(changes, tileSymbols);
    }
}

