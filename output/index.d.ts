import type { AppContext, AppPlugin } from "@tsdiapi/server";
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
    globControllersPath: string | null;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export declare function getMetaProvider(): MetaProvider;
export { MetaProvider };
export default function createPlugin(config?: PluginOptions): MetaPlugin;
//# sourceMappingURL=index.d.ts.map