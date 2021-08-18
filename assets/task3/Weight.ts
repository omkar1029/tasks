const { ccclass, property } = cc._decorator;
import Plank from "./Plank";

@ccclass
export default class Weight extends cc.Component {


    @property(cc.Node)
    plankNode: cc.Node = null;

    originalPosition: cc.Vec2 = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    offset: cc.Vec2 = cc.v2(0, 0);

    onLoad() {
        this.originalPosition = this.node.getPosition();

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;

            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.offset = (this.node.getPosition().subtract(loc2));
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            this.showNearestMark();

            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);
            this.node.setPosition(loc2.add(this.offset));
            this.plankNode.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
        }, this)

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.plankNode.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;

            if (this.node.position.x > -(this.plankNode.width / 2) &&
                this.node.position.x < (this.plankNode.width / 2)) {
                this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                this.setWeightPosition();
            } else {
                //move weight to its original location.
                this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
                this.node.setPosition(this.originalPosition);
            }
        }, this)
    }

    setWeightPosition() {

        let plank: Plank = this.plankNode.getComponent(Plank);

        this.node.angle = this.plankNode.angle;

        let nearestDist: number = Infinity;
        let nearestPosition: cc.Vec2 = null;
        let nearestNode: cc.Node = null;

        for (let i = 0; i < plank.allRefPos.length; i++) {

            let element: cc.Node = plank.allRefPos[i];

            if (cc.Vec2.distance(this.node, element) < nearestDist) {

                //let loc: cc.Vec2 = this.canvas.convertToNodeSpaceAR(element.getPosition());
                //let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

                //console.log(loc.x, loc.y);

                nearestPosition = element.getPosition();
                //nearestPosition = loc;
                nearestDist = cc.Vec2.distance(this.node, element);
                nearestNode = element;
            }
        }

        //let duration: number = 1;

        // nearestNode.color = cc.Color.GREEN;
        //this.scheduleOnce(() => nearestNode.color = cc.Color.WHITE, duration)

        this.node.setPosition(nearestPosition.x, nearestPosition.y);//add some value to y to instantiate it above the desired location 
    }

    showNearestMark() {
        let plank: Plank = this.plankNode.getComponent(Plank);

        let nearestDist: number = Infinity;
        let nearestPosition: cc.Vec2 = null;
        let nearestNode: cc.Node = null;

        for (let i = 0; i < plank.allMarks.length; i++) {

            let element: cc.Node = plank.allMarks[i];

            if (cc.Vec2.distance(this.node, element) < nearestDist) {
                nearestPosition = element.getPosition();
                nearestDist = cc.Vec2.distance(this.node, element);
                nearestNode = element;
            }
        }

        for (let i = 0; i < plank.allMarks.length; i++) {

            plank.allMarks[i].color = cc.Color.WHITE;
        }

        nearestNode.color = cc.Color.GREEN;
    }

    update() {
        this.getComponent(cc.RigidBody).linearVelocity.x = 0;
    }
}
