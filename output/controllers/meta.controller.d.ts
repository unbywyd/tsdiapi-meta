import { ItemSchemaDTO, ControllersDTO, MetaProvider } from "../index.js";
export declare class ListStringsDTO {
    list: string[];
}
export declare class SourceObjectDTO {
    source: Record<string, any>;
}
export declare class RouteRequestParamsDTO {
    route: string;
    method?: string;
}
export declare class MetaController {
    meta: MetaProvider;
    constructor();
    getApiSpec(): Promise<{
        source: Record<string, any>;
    }>;
    getApiSourceSpec(): Promise<{
        source: Record<string, any>;
    }>;
    getAllTypesFromRoute(data: RouteRequestParamsDTO): Promise<import("../provider.js").RouterTypeReference[]>;
    getInputTypesFromRoute(data: RouteRequestParamsDTO): Promise<{}>;
    getOutputTypesFromRoute(data: RouteRequestParamsDTO): Promise<import("../provider.js").RouterTypeReference[]>;
    getAllRoutes(): Promise<import("../provider.js").RouteMetadata[]>;
    getControllers(): Promise<ControllersDTO[]>;
    getRoute(data: RouteRequestParamsDTO): Promise<import("../provider.js").RouteMetadata | import("../provider.js").RouteMetadata[]>;
    getRouteSource(data: RouteRequestParamsDTO): Promise<import("../provider.js").RouteMetadata | import("../provider.js").RouteMetadata[]>;
    getSchemaByName(name: string): Promise<any>;
    listAvailableDTOs(): Promise<{
        list: string[];
    }>;
    getAllSchemas(): Promise<ItemSchemaDTO[]>;
    getSourceSchema(): Promise<{
        source: Record<string, any>;
    }>;
    getFormFields(name: string): Promise<import("../provider.js").FormField[]>;
    getResponseRouterFields(data: RouteRequestParamsDTO): Promise<import("../provider.js").FormFields>;
    getRequestRouterFields(data: RouteRequestParamsDTO): Promise<import("../provider.js").FormFields>;
}
//# sourceMappingURL=meta.controller.d.ts.map