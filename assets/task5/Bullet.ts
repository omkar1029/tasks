import Enemy from "./Enemy";
import Spawner from "./Spawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    spawner: Spawner = null;

    @property
    bulletSpeed: number = 10;

    private target: cc.Node = null;

    private direction: cc.Vec2 = null;

    index: number = 0;

    start() {
        this.target = this.spawner.enemies[this.index];
        this.direction = this.target.getPosition().subtract(this.node.getPosition()).normalize();
    }

    update(dt) {
        //this.node.setPosition(this.node.getPosition().add(this.direction.mul(this.bulletSpeed * dt)));

        this.node.getComponent(cc.RigidBody).linearVelocity =
            cc.v2(this.direction.x * this.bulletSpeed, this.direction.y * this.bulletSpeed);

        // destroying bullet with the help of distance 
        // if (this.target.active) {
        //     if (cc.Vec2.distance(this.node.getPosition(), this.target.getPosition()) < this.target.width / 2) {
        //         this.node.destroy();
        //         this.target.getComponent(Enemy).initializeDeath();
        //     }
        // } else {
        //     this.node.destroy();
        // }
    }

    onCollisionEnter(other, self) {
        console.log("BAMM!");
        other.node.getComponent(Enemy).initializeDeath();
        self.node.destroy();
    }
}
