import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { MetaProvider } from "./provider";
export * from "./provider";

let metaProvider: MetaProvider | null = null;

export class MetaPlugin implements AppPlugin {
    name = "tsdiapi-meta";
    context: AppContext;
    provider: MetaProvider;

    constructor() {
        this.provider = new MetaProvider();
    }

    async onInit(ctx: AppContext) {
        if (metaProvider) {
            ctx.logger.warn("🚨 META Plugin is already initialized. Skipping re-initialization.");
            return;
        }

        this.context = ctx;
        try {
            this.provider.init(ctx);
            metaProvider = this.provider;

            ctx.logger.info("✅ META Plugin initialized.");
        } catch (error) {
            ctx.logger.error("❌ META Plugin initialization failed.", error);
        }
    }
}

export function getMetaProvider(): MetaProvider {
    if (!metaProvider) {
        throw new Error("❌ META Plugin is not initialized. Use createPlugin() first.");
    }
    return metaProvider;
}

export { MetaProvider };

export default function createPlugin() {
    return new MetaPlugin();
}
