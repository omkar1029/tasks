const { ccclass, property } = cc._decorator;

@ccclass
export default class Target extends cc.Component {

    @property(cc.Prefab)
    targetMark: cc.Prefab = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    private mark: cc.Node = null;

    @property(cc.Node)
    shootPoint: cc.Node = null;

    @property(cc.Prefab)
    ball: cc.Prefab = null;

    @property
    flightDuration: number = 2;

    initialVelocity: cc.Vec2 = null;

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Node)
    playerSprite: cc.Node = null;

    @property(cc.AnimationClip)
    throwSequence: cc.AnimationClip = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.mark = cc.instantiate(this.targetMark);
        this.mark.setParent(this.canvas);
        this.mark.active = false;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.mark.setPosition(loc2.x, this.shootPoint.y);
            this.mark.active = true;

            this.initialVelocity = this.calculateVelocity(this.mark.getPosition(), this.shootPoint.getPosition(), this.flightDuration);
            this.playerSprite.active = false;   
            this.anim.playAdditive();
        }, this);
    }

    throw() {
        //instantiate ball to shoot
        let bullet: cc.Node = cc.instantiate(this.ball);
        bullet.setParent(this.canvas);
        bullet.setPosition(this.shootPoint.getPosition());

        bullet.getComponent(cc.RigidBody).linearVelocity = this.initialVelocity;
    }

    calculateVelocity(target: cc.Vec2, origin: cc.Vec2, time: number): cc.Vec2 {

        //define distance x and y
        let distance: cc.Vec2 = target.sub(origin);
        let distanceX: cc.Vec2 = distance;
        distanceX.y = 0;

        //create a number that represent our distance
        let Sy: number = distance.y;
        let Sx: number = distanceX.mag();

        let Vx: number = Sx / time;
        let Vy: number = Sy / time + 0.5 * Math.abs(cc.director.getPhysicsManager().gravity.y * time);

        let result: cc.Vec2 = distanceX.normalize();
        result = cc.v2(result.x * Vx, result.y * Vx);
        result.y = Vy;

        return result;
    }
}
