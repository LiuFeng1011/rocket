//游戏基础场景类，游戏所有场景继承此类，每个场景应该只有一个scene类
//scene类应该挂载在场景的canvas上
var BaseScene = cc.Class({
    extends: cc.Component,

    properties: {
        layerInstanceID:{ default:0, visible:false },
        //leyer列表，场景中所有的layer添加到这里 baselayer
        layerList:[],
        layersNode:{ default:null, visible:false },
        state:{ default:0, visible:false },
        canvas:{ default:null, visible:false },
        //是否在加载layer
        locastate:{ default:false, visible:false },
    },

    //layer参数队列 由于layer是异步加载 所以请求参数需要进行缓存
    loadLayerQueue:null,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadLayerQueue = [];
    },

    start () {
        this.canvas = this.node.getComponent(cc.Canvas);
        this.layersNode = new cc.Node('layers');

        var _widget = this.layersNode.addComponent(cc.Widget);
        _widget.isAlignTop = true;
        _widget.isAlignLeft = true;
        _widget.isAlignBottom = true;
        _widget.isAlignRight = true;

        _widget.top  = 0;
        _widget.bottom  = 0;
        _widget.left  = 0;
        _widget.right  = 0;
        
        this.layersNode.parent = this.node;
        this.init();
    },

    init(){},

    // update (dt) {},
    changeScene(scenename){
        if (this.state != 0 ) return;
        this.state = 1;
        cc.director.loadScene(scenename);
    },

    //向场景中添加一个layer
    addLayer(layername,params){
        var _layerdata = {};
        _layerdata.layername = layername;
        _layerdata.params = params;
        this.loadLayerQueue.push(_layerdata);

        this.loadLayer();
    },

    loadLayer(){
        //是否正在加载其他layer
        if(this.locastate) return;
        //是否还有待加载layer
        if(this.loadLayerQueue.length <= 0 ) return;
        
        var _layerdata = this.loadLayerQueue.pop();
        this.locastate = true;
        var self = this;
        cc.log("addlayer : " + _layerdata.layername);
        
        cc.loader.loadRes("Prefabs/Layers/"+_layerdata.layername, function (err, prefab) {
            var layer = cc.instantiate(prefab);

            self.addFin(layer,_layerdata.params);

            self.locastate = false;

            self.loadLayer();
        });
    },

    addFin(layer,params){
        this.layersNode.addChild(layer);
        var baseLayer = layer.getComponent("BaseLayer");
        if(baseLayer == null){
            cc.error("cant find BaseLayer : "+layer.name);
            return;
        }

        this.layerList.push(baseLayer);
        this.layerInstanceID = this.layerInstanceID + 1;
        baseLayer.layerid = this.layerInstanceID;
        baseLayer.scene = this;

        //node设置为激活状态
        layer.active = true;

        cc.log("layer add finished : " + layer.name);

        baseLayer.init(params);
    },
    //删除一个layer
    delLayer(layer){
        if(this.layerList.length <= 0){
            cc.log("no layer to delete!!");
            return;
        }

        for (var i = 0 ; i < this.layerList.length; i ++){
            if(layer.layerid == this.layerList[i].layerid){
                this.layerList[i]._close();
                this.layerList.splice(i,1);
                return;
            }
        }

    },
});
