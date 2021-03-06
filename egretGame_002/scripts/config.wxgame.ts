/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
import { SubPackagePlugin } from './wxgame/subpackage';

//是否使用微信分离插件
const useWxPlugin: boolean = false;
const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "egret-library"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(useWxPlugin),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "resource/config",
                                "includes": [
                                    "resource/config/game.js"
                                ]
                            }
                        ]
                    })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "egret-library"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(useWxPlugin),
                    new UglifyPlugin([
                        // 使用 EUI 项目，要压缩皮肤文件，可以开启这个压缩配置
                        // {
                        //     sources: ["resource/default.thm.js"],
                        //     target: "default.thm.min.js"
                        // },
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        }
                    ]),
                    // new ManifestPlugin({ output: 'manifest.js', useWxPlugin: useWxPlugin })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "resource/config",
                                "includes": [
                                    "resource/config/game.js"
                                ]
                            }, {
                                root: "resource/config2",
                                "includes": [
                                    "resource/config/game.js"
                                ]
                            }
                        ]
                    })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
