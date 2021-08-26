const { ccclass, property } = cc._decorator;

@ccclass
export default class Projectile extends cc.Component {

    targetPos: cc.Vec2 = cc.v2(0, -162);

    @property(cc.Vec2)
    dir: cc.Vec2 = cc.v2(1, 1);

    @property
    forceAmount: number = 50;

    @property
    initialVelocity: number = 200;

    @property
    projectileDuration: number = 4;

    @property
    launchAngle: number = 45;

    @property
    preferSmallAng: boolean = false;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }

    shoot() {
        // this.node.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(this.dir.x * this.forceAmount, this.dir.y * this.forceAmount),
        //     this.node.getPosition(),
        //     true);
        console.log("shoot");

        let distance = cc.Vec2.distance(this.node.getPosition(), cc.v2(this.targetPos.x, this.node.getPosition().y));
        console.log("distance: " + distance);

        let height = Math.abs(distance * Math.tan(this.launchAngle * (180 / Math.PI)) / 4);
        console.log('height: ' + height);

        let horizontalVelocity = distance / (/*this.projectileDuration **/ Math.cos(this.launchAngle));

        let verticalVelocity = ((height) + (0.5 * cc.director.getPhysicsManager().gravity.mag() /** this.projectileDuration * this.projectileDuration*/))
            / (/*this.projectileDuration **/ Math.sin(this.launchAngle * (180 / Math.PI)));

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(horizontalVelocity, verticalVelocity);

        console.log("velocity magnitude: " + this.node.getComponent(cc.RigidBody).linearVelocity.mag());
        console.log(this.node.getComponent(cc.RigidBody).linearVelocity.x, this.node.getComponent(cc.RigidBody).linearVelocity.y);
        console.log(this.targetPos.x, this.targetPos.y);

        // let velocity = this.Magnitude_ToReachXY_InGravity_AtAngle(this.targetPos.x, this.node.getPosition().y,
        //     cc.director.getPhysicsManager().gravity.mag(), this.launchAngle)

        // console.log("velocity: " + velocity);
        // console.log("gravity: " + cc.director.getPhysicsManager().gravity.mag());

        // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(velocity * Math.sin(this.launchAngle), velocity * Math.cos(this.launchAngle));
    }

    Magnitude_ToReachXY_InGravity_AtAngle(x: number, y: number, g: number, ang: number): number {
        let sin2Theta: number = Math.sin(2 * ang * (180 / Math.PI));
        let cosTheta: number = Math.cos(ang * (180 / Math.PI));
        let inner: number = (x * x * g) / ((x * sin2Theta) - (2 * y * cosTheta * cosTheta));
        if (inner < 0) {
            return Number.NaN;
        }
        let res = Math.sqrt(inner);
        return res;
    }

    Angle_ToReachXY_InGravity_AtMagnitude(x: number, y: number, g: number, mag: number): number {
        let innerSq: number = Math.pow(mag, 4) - g * (g * x * x + 2 * y * mag * mag);
        if (innerSq < 0) {
            return Number.NaN;
        }
        let innerATan: number;
        if (this.preferSmallAng) {
            innerATan = (mag * mag - Math.sqrt(innerSq)) / (g * x);
        }
        else {
            innerATan = (mag * mag + Math.sqrt(innerSq)) / (g * x);
        }

        let res: number = Math.atan(innerATan) * (180 / Math.PI);
        return res;
    }

    onCollisionEnter(other, self) {
        this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
    }
}

//horizontal_displacement = v * t * cos(theta)
//vertical_displacement = u * t * sin(theta) - ((1/2) * g * t * t)