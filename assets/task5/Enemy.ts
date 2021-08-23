const { ccclass, property } = cc._decorator;

import Spawner from "./Spawner";

@ccclass
export default class Enemy extends cc.Component {

    spawner: Spawner = null;

    anim: cc.Animation = null;

    enemyIndex: number = 0;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
    }

    //destroy the enemy node when animation is finished
    die() {
        //this.spawner.enemies.pop();
        //this.node.destroy();
        //console.log("enemies remaining: " + this.spawner.enemies.length);
        console.log(this.node.name + " destroyed");
    }

    initializeDeath() {
        this.anim.playAdditive("enemy_death");//play death animation when hit by a bullet
    }
}
