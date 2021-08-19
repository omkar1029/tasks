const {ccclass, property} = cc._decorator;

@ccclass
export default class SliderSelection extends cc.Component {

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Node)
    sliderHandle: cc.Node = null;

    @property(cc.Node)
    toggles: cc.Node[] = [];

    noOfToggles:number = 4;

    onLoad(){
        this.sliderHandle.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.showClosestToggle();
        }, this)
    }

    showClosestToggle(){
        for (let i = 0; i < this.toggles.length; i++) {
            if(this.slider.progress < (i+1)/this.noOfToggles && this.slider.progress > (i/this.noOfToggles)){
                this.toggles[i].getComponent(cc.Toggle).isChecked = true;
            }
        }
    }
}