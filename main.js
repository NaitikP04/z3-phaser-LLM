import './style.css'
import { init } from 'z3-solver';
import OpenAI from 'openai';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

const openai = new OpenAI({
  // add apiKey: "my api key here"
  dangerouslyAllowBrowser: true
});

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, Context : Context, openai: openai};

let config = {
  parent: 'app',
  type: Phaser.CANVAS,
  render: {
      pixelArt: true  // prevent pixel art from getting blurred when scaled
  },
  width: 960, //960
  height: 600, //600
  scene: {
    create: create,
  }
}

function create() {
  this.scene.add('Load', new Load(my), true); // Start the scene and pass myData
}

const game = new Phaser.Game(config);
