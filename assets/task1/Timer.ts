
const {ccclass, property} = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    blinkSprite: cc.Node = null;
    
    @property duration: number = 20;
    @property maxDuration: number = 20;
    @property blinkDuration: number = 0.5;

    onLoad () {
        this.startTimer();
    }

    startTimer(){
        this.schedule(this.updateTimer, 1);
    }

    updateTimer(){
        this.label.string = this.duration.toString();
        this.duration -= 1;

        if(this.duration < 5){
            this.blinkSprite.active = true;
            this.scheduleOnce(this.blinkTimer, this.blinkDuration);
        }

        if(this.duration < 0){
            this.unschedule(this.updateTimer)
        }
    }

    resetTimer(){
        this.duration = this.maxDuration;
        this.label.string = this.duration.toString();
        this.startTimer();
    }

    blinkTimer(){
        this.blinkSprite.active = false;
    }
}