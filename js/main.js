var game;
game = new Phaser.Game(550, 650, Phaser.AUTO, 'main-content');
game.state.add('MainScreen',MainScreen); //Main Screen State
game.state.add('Play',PlayScreen); //Play Screen State
game.state.add('PlayLoad',PlayLoad); //Play Screen Load State
game.state.add('Direct Translate',DirectTranslate); //Direct Translation Screen State
game.state.add('Leader Board',LeaderBoard); //Leader Board Screen State
game.state.add('BootState',BootState);

game.state.start('BootState');
