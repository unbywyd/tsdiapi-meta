"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProvider = exports.MetaPlugin = void 0;
exports.getMetaProvider = getMetaProvider;
exports.default = createPlugin;
require("reflect-metadata");
const provider_1 = require("./provider");
Object.defineProperty(exports, "MetaProvider", { enumerable: true, get: function () { return provider_1.MetaProvider; } });
const path_1 = __importDefault(require("path"));
__exportStar(require("./provider"), exports);
let metaProvider = null;
class MetaPlugin {
    name = "@tsdiapi/meta";
    context;
    provider;
    config;
    globControllersPath = null;
    constructor(config) {
        this.config = { ...config };
        this.provider = new provider_1.MetaProvider();
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
            this.globControllersPath = path_1.default.join(__dirname, '../') + path_1.default.normalize("output/controllers/**/*.controller{.ts,.js}");
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
exports.MetaPlugin = MetaPlugin;
function getMetaProvider() {
    if (!metaProvider) {
        throw new Error("❌ META Plugin is not initialized. Use createPlugin() first.");
    }
    return metaProvider;
}
function createPlugin(config) {
    return new MetaPlugin(config);
}
//# sourceMappingURL=index.js.map