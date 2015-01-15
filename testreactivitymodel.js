if (Meteor.isClient) {

  Player = function(id){
    this._dep = new Tracker.Dependency();
    this.foo = 5;
    this.id = id;
  };

  Player.prototype.setFoo = function(val){
    this.foo = val;
    this._dep.depend();
  };

  Player.prototype.getFoo = function(){
    this._dep.changed();
    return this.foo;
  };


  //Singleton : pool of Player objects
  var ppoolinstance;
  PlayersPool = function(){
      if (ppoolinstance){
        return ppoolinstance;
      } else {
        ppoolinstance = this;
        this._players = {};
        this._dep = new Tracker.Dependency();
      }
  };

  //get Object from the pool by id
  PlayersPool.prototype.getPlayer = function(id){
    this._dep.depend();
    return this._players[id];
  };

  //add Object to the pool
  PlayersPool.prototype.setPlayer = function(player){
    if (player && player.id){
      this._players[player.id]= player;
      this._dep.changed();
    }
  };


  Tracker.autorun(function(){
    var ppool = new PlayersPool();
    var player = ppool.getPlayer(1);
    if (player){
      player.getFoo();
    }
    console.log("player 1 updated !");
  });


}
