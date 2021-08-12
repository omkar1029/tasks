
const {ccclass, property} = cc._decorator;

@ccclass
export default class Keypad extends cc.Component {

    @property(cc.Label)
    textBox: cc.Label = null;

    @property(cc.Node)
    keypad: cc.Node = null;

    enteredstring : string = null;

    deletePrevNumber(){
        if(this.textBox.string != null){
            this.textBox.string = this.textBox.string.slice(0,-1);
        }
    }

    submit(){
        this.keypad.active = false;
    }
}
