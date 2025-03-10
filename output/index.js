import path from "path";
import { MetaProvider } from "./provider.js";
export * from "./provider.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let metaProvider = null;
export class MetaPlugin {
    name = "@tsdiapi/meta";
    context;
    provider;
    config;
    globControllersPath = null;
    constructor(config) {
        this.config = { ...config };
        this.provider = new MetaProvider();
    }
    async onInit(ctx) {
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
        }
        catch (error) {
            ctx.logger.error("❌ META Plugin initialization failed.", error);
        }
    }
}
export function getMetaProvider() {
    if (!metaProvider) {
        throw new Error("❌ META Plugin is not initialized. Use createPlugin() first.");
    }
    return metaProvider;
}
export { MetaProvider };
export default function createPlugin(config) {
    return new MetaPlugin(config);
}
//# sourceMappingURL=index.js.map