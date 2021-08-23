import Enemy from "./Enemy";
import Player from "./Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Spawner extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property
    noOfEnemies: number = 10;

    @property(cc.Node)
    player: cc.Node = null;

    enemies: cc.Node[] = [];

    minX: number = -100;
    maxX: number = 100;
    minY: number = -50;
    maxY: number = 50;

    @property 
    minXPadding: number = 50;
    @property 
    maxXPadding: number = 50;
    @property 
    minYPadding: number = 200;
    @property 
    maxYPadding: number = 50;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.minX = -this.node.width / 2 + this.minXPadding;
        this.maxX = this.node.width / 2 - this.maxXPadding;
        this.minY = -this.node.height / 2 + this.minYPadding;
        this.maxY = this.node.height / 2 - this.maxYPadding;

        this.spawnEnemies();
        this.sortEnemies();
    }

    spawnEnemies() {
        for (let i = 0; i < this.noOfEnemies; i++) {
            let node: cc.Node = cc.instantiate(this.enemy);

            node.setParent(this.canvas);

            node.setPosition(Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX),
                Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY));

            this.enemies.push(node);
        }
    }

    sortEnemies() {
        let tempJ = 0;
        
        for (let i = 0; i < this.enemies.length; i++) {
            let nearestDist = Infinity;
            for (let j = i; j < this.enemies.length; j++) {
                let dist: number = cc.Vec2.distance(this.player, this.enemies[j]);
                if ( dist < nearestDist) {
                    nearestDist = dist;
                    tempJ = j;
                }
            }
            let tempNode = this.enemies[i];
            this.enemies[i] = this.enemies[tempJ];
            this.enemies[tempJ] = tempNode;

            this.enemies[i].getComponent(Enemy).enemyIndex = i;
        }
    }
}
