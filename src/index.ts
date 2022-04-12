import { GameHandler } from "./gather"
import { SlackHandler } from './slack'

import config from "./config";
import { PlayerActivelySpeaks } from "@gathertown/gather-game-client";
import { ServerClientEventContext } from "@gathertown/gather-game-client/dist/src/GameEventContexts";

console.log("Starting Gather Bot :)");

let gameHandler = new GameHandler();
let slackHandler = new SlackHandler();


gameHandler.setSummoningFunction((player: PlayerActivelySpeaks, context: ServerClientEventContext) => {
    console.log(player, context);
    slackHandler.sendMessage('By: ' + context.player?.name + " : " + config.summon.message) 
})