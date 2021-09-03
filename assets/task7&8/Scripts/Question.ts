const { ccclass, property } = cc._decorator;

import { House } from "./Houses"
import Option from "./Option";
import GameManager from "./GameManager";

@ccclass
export default class Question extends cc.Component {

    @property({ type: cc.AudioClip })
    private audioClips: cc.AudioClip[] = [];

    @property({ tooltip: "Igloo = 1, \nWoodHouse = 2,\nMudHouse = 3,\nHut = 4,\nTreeHouse = 5,\nBoatHouse = 6,\nBuilding = 7" })
    answer: House = null;

    @property(Option)
    options: Option[] = [];

    @property
    private firstDialogue: string = '0';

    @property
    private secondDialogue: string = '0';

    @property(cc.Label)
    correctLabel: cc.Label = null;

    @property(cc.Label)
    resultLabel: cc.Label = null;

    label: cc.Label = null;

    lastAudioId: number = null;
    // clipIndex: number = 0;
    // audioId: number;

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Node)
    tryAgain: cc.Node = null;

    @property(cc.Node)
    next: cc.Node = null;

    @property(cc.Node)
    character: cc.Node = null;

    init(label: cc.Label) {
        this.label = label;

        for (let i = 0; i < this.options.length; i++) {
            this.options[i].init(label, this.correctLabel, this.resultLabel, this.answer, this);
        }

        //setting character as active here because it will be inactive when its animation is activated.
        this.character.active = true;
    }

    playQuestionSequence() {
        this.playFirstDialogue();
        this.scheduleOnce(this.playSecondDialogue, cc.audioEngine.getDuration(this.lastAudioId) + 0.5);

        //let audioId = cc.audioEngine.playEffect(this.audioClips[0], false);

        // for (let i = 0; i < this.audioClips.length; i++) {
        //     console.log(i);
        //     this.scheduleOnce(this.playAudio,  cc.audioEngine.getDuration(this.audioId));
        //     this.clipIndex = i;
        // }
    }

    private playFirstDialogue() {
        this.lastAudioId = cc.audioEngine.playEffect(this.audioClips[0], false);
        this.label.string = this.firstDialogue;
    }

    private playSecondDialogue() {
        this.lastAudioId = cc.audioEngine.playEffect(this.audioClips[1], false);
        this.label.string = this.secondDialogue;
        this.scheduleOnce(this.showOptions, cc.audioEngine.getDuration(this.lastAudioId));
    }

    private showOptions() {
        this.anim.playAdditive('showOptions');
        this.options.forEach(option => {
            option.node.getComponent(cc.Sprite).enabled = true;
        });
    }

    //called in Option class when an option is released/selected.
    private hideOptions() {
        this.anim.playAdditive('hideOptions');
    }

    // private playAudio(clip: cc.AudioClip){
    //     this.audioId = cc.audioEngine.playEffect(this.audioClips[this.clipIndex], false);
    // }

    //when try again is clicked
    resetScreen() {
        this.options.forEach(option => {
            option.house.active = false;
            option.node.setPosition(option.initialPos);
            //disable try again
            //disable/hide result
        });
        this.character.active = true;
        this.tryAgain.active = false;
        this.correctLabel.node.active = false;
        this.resultLabel.node.active = false;
        this.playSecondDialogue();
    }
}
