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

    start() {
        this.target = this.spawner.enemies[this.spawner.enemies.length - 1];
        this.direction = this.target.getPosition().subtract(this.node.getPosition()).normalize();
    }

    update(dt) {
        this.node.setPosition(this.node.getPosition().add(this.direction.mul(this.bulletSpeed * dt)));

        // destroying bullet with the help of distance 
        if (this.target.active) {
            if (cc.Vec2.distance(this.node.getPosition(), this.target.getPosition()) < this.target.width / 2) {
                this.node.destroy();
                this.target.getComponent(Enemy).initializeDeath();
            }
        }else{
            this.node.destroy();
        }
    }
}
