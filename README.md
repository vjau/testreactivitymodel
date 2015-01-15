# testreactivitymodel

Steps to reproduce:
In the console:
```js
var ppool = new PlayersPool();
var player = new Player(1);
ppool.setPlayer(player); // register player in Players Pool
var player2 = ppool.getPlayer(1) // same instance than player, it works !
player2.setFoo(10);
//at this point, the autorun should be retriggered and should show "player 1 updated !"
```
