var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ToolUtil = (function () {
    function ToolUtil() {
    }
    ToolUtil.getLoadSub = function (name, succ, fail, cb) {
        return new Promise(function (resolve, reject) {
            platform.loadsubpackage({
                name: name,
                success: function (res) {
                    // console.log("加载成功", res);
                    succ.call(cb);
                    resolve();
                },
                fail: function (res) {
                    // console.log("加载失败", res);
                    fail.call(cb);
                    resolve();
                }
            });
        });
    };
    return ToolUtil;
}());
__reflect(ToolUtil.prototype, "ToolUtil");
//# sourceMappingURL=ToolUtil.js.map