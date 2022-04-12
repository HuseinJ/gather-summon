import * as dotenv from "dotenv";

dotenv.config();

const {
    GATHER_SPACE_ID,
    GATHER_API_KEY,
    GATHER_SUMMON_ROOM,
    SLACK_TOKEN,
    SLACK_DEFAULT_CHANNEL,
    SUMMON_MESSAGE
  } = process.env;

  console.log(GATHER_SUMMON_ROOM)

export default {
    gather: {
        apiKey: GATHER_API_KEY,
        spaceId: GATHER_SPACE_ID,
        summonRoom: GATHER_SUMMON_ROOM?.split(","),
    },
    slack: {
        token: SLACK_TOKEN,
        defaultChannel: SLACK_DEFAULT_CHANNEL
    },
    summon: {
        message: SUMMON_MESSAGE
    }
}