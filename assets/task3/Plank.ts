const { ccclass, property } = cc._decorator;

@ccclass
export default class Plank extends cc.Component {
    @property(cc.Prefab)
    mark: cc.Prefab = null;

    @property(cc.Prefab)
    refPos: cc.Prefab = null

    @property
    noOfMarks: number = 0;

    @property(cc.Node)
    markParent: cc.Node = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    allMarks: cc.Node[] = [];
    allRefPos: cc.Node[] = [];

    markAnchorOffset: number = 15;

    plankPos : cc.Vec2;

    onLoad() {
        this.addScale();
        this.plankPos = this.node.getPosition();
    }

    addScale() {
        for (let i = 1; i <= this.noOfMarks; i++) {
            var node = cc.instantiate(this.mark);
            node.parent = this.markParent;
            node.setPosition((this.markParent.width / (this.noOfMarks + 1)) * i - this.markParent.width / 2, this.markAnchorOffset);
            this.allMarks.push(node);
        }

        for (let i = 1; i <= this.noOfMarks; i++) {
            var node = cc.instantiate(this.refPos);
            node.parent = this.node;
            // let loc: cc.Vec2 = this.canvas.convertToNodeSpaceAR(cc.v2((this.node.width / (this.noOfMarks + 1)) * i - this.node.width / 2, this.node.height/2));
            node.setPosition((this.node.width / (this.noOfMarks + 1)) * i - this.node.width / 2, this.node.height/2);
            //console.log(loc.x,loc.y);
            this.allRefPos.push(node);
        }
    }

    lateUpdate() {
        // this.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(0, -5000), true);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
    }
}
