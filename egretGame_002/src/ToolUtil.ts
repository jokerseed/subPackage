class ToolUtil {
    public static getLoadSub(name: string, succ: Function, fail: Function, cb: Object) {
        return new Promise((resolve, reject) => {
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
            })
        })
    }
}