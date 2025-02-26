import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { MetaProvider } from "./provider";
export * from "./provider";
export declare class MetaPlugin implements AppPlugin {
    name: string;
    context: AppContext;
    provider: MetaProvider;
    constructor();
    onInit(ctx: AppContext): Promise<void>;
}
export declare function getMetaProvider(): MetaProvider;
export { MetaProvider };
export default function createPlugin(): MetaPlugin;
//# sourceMappingURL=index.d.ts.map