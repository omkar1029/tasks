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

    //added this to shoot button click event
    shoot() {
        //instantiate bullet at player location
        let currentBullet: cc.Node = cc.instantiate(this.bullet);
        currentBullet.setPosition(this.node.position);
        currentBullet.setParent(this.canvas);

        currentBullet.getComponent(Bullet).spawner = this.spawner;

        //change players rotation towards target
        let vec1 = this.spawner.enemies[this.spawner.enemies.length - 1].getPosition();
        let vec2 = this.node.getPosition();

        let diff = {'x' : vec1.x - vec2.x, 'y': vec1.y - vec2.y};
        let angle = Math.atan2(diff.y, diff.x);
        this.node.angle = angle*180/Math.PI - 90;
    }
}
