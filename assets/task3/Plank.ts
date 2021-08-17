const {ccclass, property} = cc._decorator;

@ccclass
export default class Plank extends cc.Component {
    @property(cc.Prefab)
    mark: cc.Prefab = null;

    @property
    noOfMarks: number = 0;

    @property(cc.Node)
    markParent : cc.Node = null;

    allMarks: cc.Node[] = [];

    onLoad(){
        this.addScale();
    }

    addScale(){
        for(let i = 1; i <= this.noOfMarks; i++){
            var node = cc.instantiate(this.mark);
            node.parent = this.markParent;
            node.setPosition((this.markParent.width/(this.noOfMarks + 1)) * i - this.markParent.width/2, 0 );
            this.allMarks.push(node);
        }
    }
}
