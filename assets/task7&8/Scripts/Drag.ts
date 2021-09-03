const {ccclass, property} = cc._decorator;

@ccclass
export default class Drag extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    imagesLayout: cc.Node = null;

    initialPos: cc.Vec2 = null;

    offset: cc.Vec2 = null;

    onLoad(){
        this.saveInitialPos();

        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {

            this.node.setParent(this.canvas);
            this.node.opacity = 100;

            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.offset = (this.node.getPosition().subtract(loc2));

        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.node.setPosition(loc2.add(this.offset));
            //this.node.setPosition(loc2);

            this.node.opacity = 100;
        }, this)

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.setParent(this.imagesLayout);
            this.node.setPosition(this.node.getPosition().x, this.yPos);

            this.node.opacity = 255;
        }, this)
    }

    saveInitialPos(){
        this.xPos = this.node.getPosition().x;
        this.yPos = this.node.getPosition().y;
    }
}
