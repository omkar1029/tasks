const { ccclass, property } = cc._decorator;

import { House } from "./Houses"
import Question from "./Question";

@ccclass
export default class Option extends cc.Component {

    @property(cc.Node)
    private canvas: cc.Node = null;

    @property(cc.Node)
    house: cc.Node = null;

    @property
    private message: string = '0';

    @property({ type: cc.AudioClip })
    private resultClip: cc.AudioClip = null;

    initialPos: cc.Vec2 = null;

    private offset: cc.Vec2 = null;

    private yAboveOptions: number = -190;

    private label: cc.Label = null;

    @property({ tooltip: "Igloo = 1, \nWoodHouse = 2,\nMudHouse = 3,\nHut = 4,\nTreeHouse = 5,\nBoatHouse = 6,\nBuilding = 7" })
    private houseType: House = null;

    private answer: House = null

    private resultLabel: cc.Label = null;

    private correctLabel: cc.Label = null;

    private question: Question = null;

    @property
    private correctString: string = '0';

    private resultAudioId: number = 0;

    @property(cc.Node)
    character: cc.Node = null

    init(label: cc.Label, correctLabel: cc.Label, resultLabel: cc.Label, answer: House, question: Question) {
        this.label = label;
        this.correctLabel = correctLabel;
        this.resultLabel = resultLabel;
        this.question = question;
        this.answer = answer;
    }

    onLoad() {
        this.saveInitialPos();

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {

            this.node.opacity = 100;

            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.offset = (this.node.getPosition().subtract(loc2));

        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            this.node.setPosition(loc2.add(this.offset));

            this.node.opacity = 100;
        }, this)

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {

            let loc: cc.Vec2 = event.getLocation();
            let loc2: cc.Vec2 = this.canvas.convertToNodeSpaceAR(loc);

            if (loc2.y > this.yAboveOptions) {
                this.node.getComponent(cc.Sprite).enabled = false;

                //Show the house in scene.
                this.house.active = true;
                this.character.getComponent(cc.Animation).playAdditive();
                this.question.character.active = false;

                //show result of this option and play dialogue
                this.resultLabel.node.active = true;
                this.resultLabel.string = this.message;
                this.correctLabel.node.active = true;

                this.resultAudioId = cc.audioEngine.playEffect(this.resultClip, false);
                this.setUpResult();

                //hide options animation
                this.question.hideOptions();
            } else {
                this.node.setPosition(this.initialPos);
            }

            this.node.opacity = 255;
        }, this)
    }

    private saveInitialPos() {
        this.initialPos = this.node.getPosition();
    }

    private setUpResult() {
        this.correctLabel.string = this.correctString;

        if (this.houseType != this.answer) {
            this.correctLabel.node.color = cc.Color.RED;
            this.question.tryAgain.active = true;
            this.question.character.active = false;
        } else {
            this.correctLabel.node.color = cc.Color.GREEN;
            this.question.next.active = true;
        }
    }
}
