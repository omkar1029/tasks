const {ccclass, property} = cc._decorator;

import Spawner from "./Spawner";

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(Spawner)
    spawner: Spawner = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    //added this to shoot button click event
    shoot(){
        //instantiate bullet at player location
        let node: cc.Node = cc.instantiate(this.bullet);
        node.setPosition(this.node.position);
        node.setParent(this.canvas);
        //let dir: cc.Vec2 = this.node.getPosition() as cc.Vec2 - this.spawner.enemies[0].getPosition() as cc.Vec2;
        //cc.v2(this.node.position.x, this.node.position.y)

        this.schedule(() => {
            this.moveBullet(node)
        })
    }

    moveBullet(bullet: cc.Node){
        
    }

    getNearestEnemy(){

    }
}
