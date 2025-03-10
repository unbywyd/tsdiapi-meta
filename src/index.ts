import path from "path";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { MetaProvider } from "./provider.js";
export * from "./provider.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let metaProvider: MetaProvider | null = null;

export type PluginOptions = {
    autoRegisterControllers?: boolean;
}

export class MetaPlugin implements AppPlugin {
    name = "@tsdiapi/meta";
    context: AppContext;
    provider: MetaProvider;
    config: PluginOptions;
    globControllersPath: string | null = null;
    constructor(config?: PluginOptions) {
        this.config = { ...config };
        this.provider = new MetaProvider();
    }

    async onInit(ctx: AppContext) {
        if (metaProvider) {
            ctx.logger.warn("🚨 META Plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const appConfig = this.context.config.appConfig || {};
        this.config.autoRegisterControllers = appConfig?.autoRegisterControllers || appConfig['META_AUTO_REGISTER_CONTROLLERS'] || this.config.autoRegisterControllers;
        if (this.config.autoRegisterControllers) {
            this.globControllersPath = path.join(__dirname, '../') + path.normalize("output/controllers/**/*.controller{.ts,.js}");
        }
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

export default function createPlugin(config?: PluginOptions): MetaPlugin {
    return new MetaPlugin(config);
}
