import { TSchema, Static } from '@sinclair/typebox';
import { AppContext, SchemaType } from "@tsdiapi/server";
import { OpenAPIObject, PathItemObject, SchemaObject, OperationObject } from "openapi3-ts/oas31";
export type MethodType = keyof PathItemObject;
export declare const SchemaDTO: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    nullable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    readOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    writeOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    maxLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    minLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    maximum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    minimum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    pattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    default: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    enum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    items: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
    additionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
export declare const ApiSchemaSourceDTO: import("@sinclair/typebox").TObject<{
    source: import("@sinclair/typebox").TUnknown;
}>;
export declare const FormFieldsDTO: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TString;
    fields: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
}>;
export type FormFieldsType = Static<typeof FormFieldsDTO>;
export declare const FormFieldDTO: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    nullable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    readOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    writeOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    maxLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    minLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    maximum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    minimum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    pattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    default: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    enum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    items: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
    additionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>, import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    required: import("@sinclair/typebox").TBoolean;
    referenceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
}>]>;
export type FormField = Static<typeof FormFieldDTO>;
export declare const FormFieldListDTO: import("@sinclair/typebox").TObject<{
    fields: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nullable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        readOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        writeOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        maxLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        maximum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minimum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        pattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        default: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        enum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        items: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
        additionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>, import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
        required: import("@sinclair/typebox").TBoolean;
        referenceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    }>]>>;
}>;
export interface OpenApiResponse {
    description: string;
    content?: Record<string, any>;
}
export declare const ExtraRouteDTO: import("@sinclair/typebox").TObject<{
    path: import("@sinclair/typebox").TString;
    method: import("@sinclair/typebox").TString;
}>;
export type ExtraRouteDTOType = Static<typeof ExtraRouteDTO>;
export declare const ItemSchemaDTO: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    schema: import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nullable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        readOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        writeOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        maxLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        maximum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minimum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        pattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        default: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        enum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        items: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
        additionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>;
}>;
export type ItemSchemaDTOType = Static<typeof ItemSchemaDTO>;
export type RouteMetadata = OperationObject & {
    path: string;
    method: string;
};
export declare const RouteMetadataDTO: import("@sinclair/typebox").TObject<{
    path: import("@sinclair/typebox").TString;
    method: import("@sinclair/typebox").TString;
    tags: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    summary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    externalDocs: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    operationId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    parameters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    requestBody: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    responses: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    callbacks: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    security: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    servers: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
}>;
export type RouteMetadataType = Static<typeof RouteMetadataDTO>;
export declare const RoutesMetadataDTO: import("@sinclair/typebox").TObject<{
    routes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        path: import("@sinclair/typebox").TString;
        method: import("@sinclair/typebox").TString;
        tags: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        summary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        externalDocs: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        operationId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        parameters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
        requestBody: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        responses: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        callbacks: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        security: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
        servers: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    }>>;
}>;
export type RoutesMetadataType = Static<typeof RoutesMetadataDTO>;
export declare const SchemaTypeDTO: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"params">, import("@sinclair/typebox").TLiteral<"query">, import("@sinclair/typebox").TLiteral<"body">, import("@sinclair/typebox").TLiteral<"headers">, import("@sinclair/typebox").TLiteral<"response">]>;
    statusCode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    schema: import("@sinclair/typebox").TAny;
    fields: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nullable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        readOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        writeOnly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        deprecated: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        maxLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minLength: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        maximum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        minimum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        pattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        default: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        enum: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        items: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>>;
        additionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>, import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
        required: import("@sinclair/typebox").TBoolean;
        referenceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    }>]>>;
}>;
export type SchemaTypeDTOType = Static<typeof SchemaTypeDTO>;
export declare class MetaProvider {
    private logger;
    apiSpec: OpenAPIObject | null;
    private fastifyInstance;
    context: AppContext;
    constructor();
    init(context: AppContext): void;
    generateFieldsFromSchema(schema: unknown): Promise<FormField[]>;
    buildApiSpec(): Promise<OpenAPIObject>;
    getApiSpec(): Promise<OpenAPIObject>;
    getAllRoutes(): Promise<RouteMetadata[]>;
    getAllTypesFromRoute(routeName: string, method?: string, schemaType?: SchemaType): Promise<SchemaTypeDTOType[]>;
    getRoute(route: string, method?: string): Promise<RouteMetadata | RouteMetadata[] | null>;
    getSchemaByName(name: string): any;
    getSchemaByType<T extends TSchema>(type: T): any;
    listAvailableSchemas(): string[];
    getAllSchemas(): ItemSchemaDTOType[];
    convertSchemaToFormFields(schema: SchemaObject, fieldName?: string, // имя поля (ключ свойства или 'items' для массива)
    isRequired?: boolean): FormField[];
    getFormFields(name: string): FormField[];
    getResponseRouterFields(route: string, method?: string): Promise<FormFieldsType>;
    getRequestRouterFields(route: string, method?: string): Promise<FormFieldsType>;
}
//# sourceMappingURL=provider.d.ts.map