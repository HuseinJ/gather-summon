# gather-summon

Simple proof of concept for a bot which interacts with gather.town and slack api

---

## Idea: 

https://www.youtube.com/watch?v=3J7AmojLGrs

A user can defina a room in gather.town. When a player enters the room and says the name of the person he/she wants to summon three times (img 1) - a slack message will be triggered to a defined slack channel (img 2).

![img 1 - Gather summoning booth](/img/gather-summon-booth.png)
![img 2 - Slack Message](/img/slack-message.png)

---

## Usage:

create a .env File with the given template (.env.example) and put in your tokens for gather and slack. Then simply run with:

 ```yarn build```
 ```yarn start```
