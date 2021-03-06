const {ccclass, property} = cc._decorator;
import Target from "./Target";

@ccclass
export default class Thrower extends cc.Component {

    @property(Target)
    private target: Target = null;

    throw(){
        this.target.throw();
    }
}
