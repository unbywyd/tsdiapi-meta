import { AppContext } from "@tsdiapi/server";
import { OpenAPIObject, PathItemObject, ReferenceObject, SchemaObject } from "openapi3-ts/dist/oas30";
import { OperationObject } from "openapi3-ts/dist/oas31";
export type FormField = {
    format?: string;
    name: string;
    type: string;
    required: boolean;
    children?: FormField[];
    referenceName?: string;
    referenceModel?: any;
    [key: string]: any;
};
export type MethodType = keyof PathItemObject;
export declare class SchemaDTO {
    title?: string;
    description?: string;
    format?: string;
    type?: string;
    nullable?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    deprecated?: boolean;
    maxLength?: number;
    minLength?: number;
    maximum?: number;
    minimum?: number;
    pattern?: string;
    default?: any;
    enum?: string[];
    items: any;
    properties?: any;
    additionalProperties?: any;
}
export declare class FormFieldDTO extends SchemaDTO {
    name: string;
    required: boolean;
    referenceName?: string;
    referenceModel?: any;
    children?: FormFieldDTO[];
}
export interface FormFields {
    type: "object" | "array";
    fields: FormField[];
}
export declare class FormFieldsDTO {
    type: string;
    fields: FormFieldDTO[];
}
export interface OpenApiResponse {
    description: string;
    content?: Record<string, any>;
}
export declare class ExtraRouteDTO {
    path: string;
    method: string;
}
export declare class ControllersDTO {
    name: string;
    routes: ExtraRouteDTO[];
}
export declare class ItemSchemaDTO {
    name: string;
    schema: SchemaDTO;
}
export type RouteMetadata = OperationObject & {
    path: string;
    method: string;
};
export declare class RouteMetadataDTO {
    path: string;
    method: string;
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: Record<string, any>;
    operationId?: string;
    parameters?: Record<string, any>[];
    requestBody?: Record<string, any>;
    responses?: Record<string, any>;
    callbacks?: Record<string, any>;
    deprecated?: boolean;
    security?: Record<string, any>[];
    servers?: Record<string, any>[];
}
export interface RouterTypeReference {
    type: 'input' | 'output';
    ref: string;
    statusCode?: string;
    contentType?: string;
    model?: any;
    fields?: FormFields;
}
export declare class RouterTypeReferenceDTO {
    type: string;
    ref: string;
    statusCode?: string;
    contentType?: string;
    model?: any;
    fields: FormFieldsDTO;
}
export declare function expandSchema(schema: any, definitions: Record<string, any>): any;
/**
 * The MetaProvider class is responsible for managing and providing metadata,
 * such as OpenAPI specifications and JSON schemas, for the API.
 */
export declare class MetaProvider {
    private logger;
    schemas: Record<string, any>;
    sourceSchemas: Record<string, any>;
    apiSpec: OpenAPIObject | null;
    sourceSpec: OpenAPIObject | null;
    context: AppContext;
    constructor();
    /**
     * Initializes the MetaProvider with the given application context.
     * @param context The application context containing configuration and logger.
     */
    init(context: AppContext): void;
    /**
     * Builds the OpenAPI specification for the API.
     * @returns The generated OpenAPI specification object.
     */
    buildSchemas(): void;
    expandSchemas(schemas: Record<string, SchemaObject | ReferenceObject>): Record<string, SchemaObject>;
    buildApiSpec(): OpenAPIObject;
    expandOpenAPISpec(spec: OpenAPIObject): OpenAPIObject;
    getApiSpec(): OpenAPIObject;
    getApiSourceSpec(): OpenAPIObject;
    /**
     * Retrieves all routes defined in the API.
     * @returns An array of route metadata objects.
     */
    getAllRoutes(): RouteMetadata[];
    /**
     * Retrieves all controllers and their routes.
     * @returns An array of objects containing controller names and their routes.
     */
    getControllers(): ControllersDTO[];
    getAllTypesFromRoute(routeName: string, method?: string, onlyType?: 'input' | 'output'): RouterTypeReference[];
    /**
     * Retrieves route metadata for a given route and optional HTTP method.
     *
     * @param route - The route path to search for.
     * @param method - Optional HTTP method to filter the route by (e.g., 'GET', 'POST').
     * @returns The route metadata for the specified route and method, or an array of route metadata if no method is specified, or null if no matching route is found.
     */
    getSourceRoute(_route: string, method?: string): RouteMetadata | RouteMetadata[] | null;
    getRoute(_route: string, method?: string): RouteMetadata | RouteMetadata[] | null;
    /**
     * Retrieves the JSON Schema for the given DTO class name.
     * @param name The name of the DTO class.
     * @returns The JSON Schema object for the specified DTO class, or null if not found.
     */
    getSchemaByName(name: string): any;
    /**
     * Retrieves the JSON Schema for the given DTO class.
     * @param dtoClass The DTO class.
     * @returns The JSON Schema object for the specified DTO class.
     */
    getSchemaByClass(dtoClass: new () => any): any;
    /**
     * Validates and transforms JSON data into a DTO object.
     * @param dtoClass The DTO class.
     * @param rawData The input data.
     * @returns The transformed DTO object, or null if validation fails.
     */
    validateAndTransform<T>(dtoClass: new () => T, rawData: any): T | null;
    /**
     * Retrieves a list of all registered DTOs.
     * @returns An array of strings representing the names of all registered DTOs.
     */
    listAvailableDTOs(): string[];
    /**
     * Returns all available JSON Schemas.
     * @returns An object containing all JSON Schemas.
     */
    getAllSchemas(): ItemSchemaDTO[];
    sourceSchema: Record<string, any>;
    getSourceSchema(): Record<string, any>;
    /**
     * Преобразует JSON Schema в массив полей формы.
     * @param schema JSON Schema объекта
     * @param requiredFields Список обязательных полей
     * @returns Массив объектов формата FormField
     */
    convertSchemaToFormFields(schema: SchemaObject): FormField[];
    getFormFields(name: string): FormField[];
    getResponseRouterFields(route: string, method?: string): FormFields;
    getRequestRouterFields(route: string, method?: string): FormFields;
}
//# sourceMappingURL=provider.d.ts.map