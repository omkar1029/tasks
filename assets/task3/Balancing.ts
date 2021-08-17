const {ccclass, property} = cc._decorator;

@ccclass
export default class Balancing extends cc.Component {
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }
}
