import type { AppContext, AppPlugin, Constructor } from "@tsdiapi/server";
import { MetaProvider } from "./provider.js";
export * from "./provider.js";
import registerMetaRoutes from "./controllers/meta.controller.js";

let metaProvider: MetaProvider | null = null;

export type PluginOptions = {
    autoRegisterControllers?: boolean;
}

export class MetaPlugin implements AppPlugin {
    name = "@tsdiapi/meta";
    context: AppContext;
    provider: MetaProvider;
    config: PluginOptions;
    services?: Constructor<unknown>[];
    constructor(config?: PluginOptions) {
        this.config = { ...config };
        this.provider = new MetaProvider();
    }

    async onInit(ctx: AppContext) {
        const logger = ctx.fastify.log;
        if (metaProvider) {
            logger.warn("🚨 META Plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const projectConfig = ctx.projectConfig;
        this.config.autoRegisterControllers = projectConfig.get('META_AUTO_REGISTER_CONTROLLERS', this.config.autoRegisterControllers) as boolean;

        try {
            this.provider.init(ctx);
            metaProvider = this.provider;
            logger.info("✅ META Plugin initialized.");
        } catch (error) {
            logger.error("❌ META Plugin initialization failed.", error);
        }
    }
    async preReady() {
        if (this.config.autoRegisterControllers) {
            await registerMetaRoutes(this.context);
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

export default function createPlugin(config?: PluginOptions): MetaPlugin {
    return new MetaPlugin(config);
}
