import type { AppContext, AppPlugin, Constructor } from "@tsdiapi/server";
import { MetaProvider } from "./provider.js";
export * from "./provider.js";
export type PluginOptions = {
    autoRegisterControllers?: boolean;
};
export declare class MetaPlugin implements AppPlugin {
    name: string;
    context: AppContext;
    provider: MetaProvider;
    config: PluginOptions;
    services?: Constructor<unknown>[];
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
    preReady(): Promise<void>;
}
export declare function getMetaProvider(): MetaProvider;
export { MetaProvider };
export default function createPlugin(config?: PluginOptions): MetaPlugin;
//# sourceMappingURL=index.d.ts.map