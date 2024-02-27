import { Engine } from 'excalibur';
import { Player } from './player';

const game = new Engine({
    width: 800,
    height: 800
});

game.add(new Player)

game.start();