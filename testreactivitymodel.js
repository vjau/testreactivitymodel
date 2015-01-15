if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });


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
      }
  };

  //get Object from the pool by id
  PlayersPool.prototype.getPlayer = function(id){
    return this._players[id];
  };

  //add Object to the pool
  PlayersPool.prototype.setPlayer = function(player){
    if (player && player.id){
      this._players[player.id]= player;
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


