const { ccclass, property } = cc._decorator;

import Bullet from "./Bullet";
import Enemy from "./Enemy";
import Spawner from "./Spawner";

@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab)
    private bullet: cc.Prefab = null;

    @property(Spawner)
    private spawner: Spawner = null;

    @property(cc.Node)
    private canvas: cc.Node = null;

    @property
    private bulletSpeed: number = 1;

    index: number = 0;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    //added this to shoot button click event
    shoot() {
        //instantiate bullet at player location
        let currentBullet: cc.Node = cc.instantiate(this.bullet);
        currentBullet.setPosition(this.node.position);
        currentBullet.setParent(this.canvas);

        let dir: cc.Vec2 = this.spawner.enemies[this.spawner.enemies.length - 1].getPosition().subtract(this.node.getPosition()).normalize();
        currentBullet.getComponent(Bullet).spawner = this.spawner;

        //change players rotation towards target
        this.node.lookAt(cc.v3(dir.x, dir.y, 0), cc.Vec3.FORWARD);
    }
}
