import { WebClient } from "@slack/web-api";
import config from "./config";

const SLACK_TOKEN = config.slack.token
const DEFAULT_CHANNEL = config.slack.defaultChannel

export class SlackHandler {
    slack: WebClient

    constructor() {
        this.slack = new WebClient(SLACK_TOKEN);
    }

    public sendMessage(message: string){
        this.slack.chat.postMessage({text: message, channel: DEFAULT_CHANNEL!})
    }
}