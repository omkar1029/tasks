import Keypad from "./Keypad";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Key extends cc.Component {

    @property(cc.Label)
    textBox: cc.Label = null;

    @property
    keyValue: string = '0';

    btn: cc.Button;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btn = this.getComponent(cc.Button);

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
        clickEventHandler.component = "Key";// This is the code file name
        clickEventHandler.handler = "onKeyPress";
        clickEventHandler.customEventData = "foobar";

        this.btn.clickEvents.push(clickEventHandler);

        //alternate way
        //this.node.on('click', this.onClick, this);
    }

    //alternate way
    // onClick(_button: cc.Button) {
    //     if (this.textBox.string != null) {
    //         this.textBox.string += this.keyValue;
    //         return;
    //     }
    //     this.textBox.string = this.keyValue;
    // }

    onKeyPress() {
        if (this.textBox.string != null) {
            this.textBox.string += this.keyValue;
            return;
        }
        this.textBox.string = this.keyValue;
    }
}
