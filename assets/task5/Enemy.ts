const { ccclass, property } = cc._decorator;

import Spawner from "./Spawner";

@ccclass
export default class Enemy extends cc.Component {

    @property
    spawner: Spawner = null;

    anim: cc.Animation = null;

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
    }

    //destroy the enemy node when animation is finished
    die() {
        this.node.destroy();
        //delete this.spawner.enemies[0];//review this once later
        console.log("enemies remaining: " + this.spawner.enemies.length);
        console.log(this.node.name + " destroyed");
    }

    onCollisionEnter(other, self) {
        this.anim.playAdditive("enemy_death");//play death animation when hit by a bullet
        other.node.destroy();//destroy the bullet when it hits the enemy
    }
}
