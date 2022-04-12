import config from "./config";
import { Game, PlayerActivelySpeaks } from "@gathertown/gather-game-client";
import { ServerClientEventContext } from "@gathertown/gather-game-client/dist/src/GameEventContexts";
global.WebSocket = require("isomorphic-ws");

const API_KEY = config.gather.apiKey;
const SPACE_ID = config.gather.spaceId;

export class GameHandler {
    gather: Game;
    playerActivationMap: Map<String, number>;
    summoningFunction: Function;

    constructor() {
       this.gather = this.initGather();
       this.playerActivationMap = new Map();
       this.summoningFunction = (data: PlayerActivelySpeaks, context: ServerClientEventContext) => console.log(context.player?.name + " - is summoning the PO :O")

       this.gather.subscribeToEvent("playerActivelySpeaks", (data, context) => this.summoningSubscription(data,context));
    }

    public setSummoningFunction = (summon: Function) => {
        this.summoningFunction = summon
    }

    private initGather = (): Game => {
        // create the game object, giving it your API key in this weird way
        // @ts-ignore
        const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: API_KEY }));
        // this is the line that actually connects to the server and starts initializing stuff
        
        game.connect();
        console.log(`Connected to Gather!`);
        game.subscribeToConnection((connected) => console.log("connected?", connected));
    
        return game;
    }

    private summoningSubscription = (data: any, context: any) => {
        if(this.playerIsInSummoningBooth(context.player?.x, context.player?.y)){
            const playerId = context.playerId + ""
            if(data.playerActivelySpeaks.activelySpeaking == 0){
                return;
            }
            if(playerId === ""){
                return;
            }
            
            if(!this.playerActivationMap.has(playerId)){
                this.playerActivationMap.set(playerId, 1)
            }
            
            if(this.playerActivationMap.get(playerId) && this.playerActivationMap?.get(playerId)! >= 3){
                this.summoningFunction(data, context);
                this.playerActivationMap.set(playerId, 1)
            }else{
                this.playerActivationMap.set(playerId, this.playerActivationMap.get(playerId)! + 1)
            }
        }
    }

    private playerIsInSummoningBooth = (posX: number|undefined, posY: number | undefined): Boolean => {
        const area = config.gather.summonRoom

        if(!area || !posY || !posX){
            return false;
        }
        
        if(parseInt(area[0]) <= posX && parseInt(area[2]) >= posX){
            if(parseInt(area[1]) <= posY && parseInt(area[3]) >= posY){
                return true;
            }
        }

        return false;
    }
}




