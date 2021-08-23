const { ccclass, property } = cc._decorator;

import Enemy from "./Enemy";
import Spawner from "./Spawner";

@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(Spawner)
    spawner: Spawner = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    @property
    bulletSpeed: number = 1;

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

        let dir: cc.Vec2 = this.spawner.enemies[this.index].getPosition().subtract(this.node.getPosition()).normalize();

        this.node.lookAt(cc.v3(dir.x, dir.y, 0), cc.Vec3.FORWARD);

        console.log(this.spawner.enemies[0].getPosition().x, this.spawner.enemies[this.index].getPosition().y);

        let targetEnemy: cc.Node = this.spawner.enemies[this.index];

        this.schedule(() => {
            this.moveBullet(targetEnemy, currentBullet, dir)
        }, 0.01/*cc.director.getDeltaTime()*/)
    }

    moveBullet(target: cc.Node, bullet: cc.Node, dir: cc.Vec2) {
        bullet.setPosition(bullet.getPosition().add(dir.mul(this.bulletSpeed * cc.director.getDeltaTime())));

        // destroying bullet with the help of distance 
        if (cc.Vec2.distance(bullet.getPosition(), target.getPosition()) < target.width / 2) {
            this.unschedule(this.moveBullet);
            bullet.removeFromParent();
            // delete this.spawner.enemies[0];
            target.getComponent(Enemy).initializeDeath();
            this.index = Math.min(this.index + 1, this.spawner.enemies.length - 1);//index shouldn't exceed the length of array
        }
    }
}
