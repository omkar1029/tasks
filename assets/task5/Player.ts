const { ccclass, property } = cc._decorator;

import Bullet from "./Bullet";
import Spawner from "./Spawner";

@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab)
    private bullet: cc.Prefab = null;

    @property(Spawner)
    private spawner: Spawner = null;

    @property(cc.Node)
    private canvas: cc.Node = null;

    private shootCounter: number = 9;

    @property(cc.Label)
    private finalMessage: cc.Label = null;


    onLoad() {
        this.shootCounter = this.spawner.enemies.length - 1;
    }

    //added this to shoot button click event
    shoot() {
        if (this.shootCounter >= 0) {
            //instantiate bullet at player location
            let currentBullet: cc.Node = cc.instantiate(this.bullet);
            currentBullet.setPosition(this.node.position);
            currentBullet.setParent(this.canvas);

            currentBullet.getComponent(Bullet).spawner = this.spawner;
            currentBullet.getComponent(Bullet).index = this.shootCounter;

            //change players rotation towards target
            let vec1 = this.spawner.enemies[this.shootCounter].getPosition();
            let vec2 = this.node.getPosition();

            let diff = { 'x': vec1.x - vec2.x, 'y': vec1.y - vec2.y };
            let angle = Math.atan2(diff.y, diff.x);
            this.node.angle = angle * 180 / Math.PI - 90;

            this.shootCounter--;

            if (this.shootCounter < 0) {
                console.log("CONGRATULATIONS!");
                this.finalMessage.node.active = true;
                this.finalMessage.string = "CONGRATULATIONS!";
            }
        }
    }
}
