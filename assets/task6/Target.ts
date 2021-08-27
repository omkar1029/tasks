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

    @property
    groundY: number = -162;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.mark = cc.instantiate(this.targetMark);
        this.mark.setParent(this.canvas);
        this.mark.active = false;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            //this.mark.setPosition(loc2.x, this.shootPoint.y);//for calculateVelocityPlayerLevelTarget
            this.mark.setPosition(loc2.x, this.groundY);//for calculateVelocityGroundLevelTarget
            this.mark.active = true;

            //this.initialVelocity = this.calculateVelocityPlayerLevelTarget(this.mark.getPosition(), this.shootPoint.getPosition(), this.flightDuration);
            this.initialVelocity = this.calculateVelocityGroundLevelTarget(this.mark.getPosition(), this.shootPoint.getPosition(), this.flightDuration);
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

    calculateVelocityPlayerLevelTarget(target: cc.Vec2, origin: cc.Vec2, time: number): cc.Vec2 {

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

    calculateVelocityGroundLevelTarget(target: cc.Vec2, origin: cc.Vec2, time: number): cc.Vec2 {
        // let R: number = this.mark.getPosition().x - this.shootPoint.getPosition().x;
        let R: number = target.x - this.shootPoint.getPosition().x;
        // let H: number = this.shootPoint.getPosition().y - this.groundY;
        let H: number = origin.y - this.groundY;

        let Vx: number = R / time;
        let Vy: number = (0.5 * Math.abs(cc.director.getPhysicsManager().gravity.y * time * time) - H) / time;

        let Vo = cc.v2(Vx, Vy);
        return Vo;
    }
}
