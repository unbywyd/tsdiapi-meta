import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { Expose, plainToInstance } from "class-transformer";
import { AppContext } from "@tsdiapi/server";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { getMetadataArgsStorage } from "routing-controllers";
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { OpenAPIObject, PathItemObject, ReferenceObject, RequestBodyObject, SchemaObject } from "openapi3-ts/dist/oas30";
import { IsEntity } from "routing-controllers-openapi-extra";
import { OperationObject } from "openapi3-ts/dist/oas31";

export type FormField = {
    format?: string; // Format (for numbers, dates, etc.)
    name: string; // Field name
    type: string; // Type (string, number, array, object, etc.)
    required: boolean; // Required field
    children?: FormField[]; // Nested fields (if object or array)
    referenceName?: string; // Referenced entity name (if any)
    referenceModel?: any; // Reference to entity (if any)
    [key: string]: any; // Additional properties
}
export type MethodType = keyof PathItemObject;

export class SchemaDTO {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @IsOptional()
    @IsString()
    format?: string;

    @Expose()
    @IsOptional()
    @IsString()
    type?: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    nullable?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    readOnly?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    writeOnly?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    deprecated?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    maxLength?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    minLength?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    maximum?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    minimum?: number;

    @Expose()
    @IsOptional()
    @IsString()
    pattern?: string;

    @Expose()
    @IsOptional()
    default?: any;

    @Expose()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    enum?: string[];

    @Expose()
    @IsOptional()
    @IsObject()
    items: any;

    @Expose()
    @IsOptional()
    @IsObject()
    properties?: any;

    @Expose()
    @IsOptional()
    @IsObject()
    additionalProperties?: any;
}

export class FormFieldDTO extends SchemaDTO {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsBoolean()
    required: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    referenceName?: string;

    @Expose()
    @IsOptional()
    referenceModel?: any;

    @Expose()
    @IsOptional()
    @IsEntity(() => FormFieldDTO, { each: true })
    children?: FormFieldDTO[];
}

export interface FormFields {
    type: "object" | "array";
    fields: FormField[];
}

export class FormFieldsDTO {
    @Expose()
    @IsString()
    type: string;

    @Expose()
    @IsEntity(() => FormFieldDTO, { each: true })
    fields: FormFieldDTO[];
}


export interface OpenApiResponse {
    description: string;
    content?: Record<string, any>;
}

export class ExtraRouteDTO {
    @Expose()
    @IsString()
    path: string;

    @Expose()
    @IsString()
    method: string;
}
export class ControllersDTO {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsEntity(() => ExtraRouteDTO, { each: true })
    routes: ExtraRouteDTO[];
}



export class ItemSchemaDTO {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsEntity(() => SchemaDTO)
    schema: SchemaDTO;
}


export type RouteMetadata = OperationObject & {
    path: string;
    method: string;
}

export class RouteMetadataDTO {
    @Expose()
    @IsString()
    path: string;

    @Expose()
    @IsString()
    method: string;

    @Expose()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @Expose()
    @IsOptional()
    @IsString()
    summary?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @IsOptional()
    @IsObject()
    externalDocs?: Record<string, any>;

    @Expose()
    @IsOptional()
    @IsString()
    operationId?: string;

    @Expose()
    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
    parameters?: Record<string, any>[];

    @Expose()
    @IsOptional()
    @IsObject()
    requestBody?: Record<string, any>;

    @Expose()
    @IsOptional()
    @IsObject()
    responses?: Record<string, any>;

    @Expose()
    @IsOptional()
    @IsObject()
    callbacks?: Record<string, any>;

    @Expose()
    @IsOptional()
    @IsBoolean()
    deprecated?: boolean;

    @Expose()
    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
    security?: Record<string, any>[];

    @Expose()
    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
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

export class RouterTypeReferenceDTO {
    @Expose()
    @IsString()
    type: string;

    @Expose()
    @IsString()
    ref: string;

    @Expose()
    @IsOptional()
    @IsString()
    statusCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    contentType?: string;

    @Expose()
    @IsOptional()
    @IsObject()
    model?: any;

    @Expose()
    @IsEntity(() => FormFieldsDTO)
    fields: FormFieldsDTO;
}

export function expandSchema(schema: any, definitions: Record<string, any>): any {
    if (!schema) return schema;

    if (schema.$ref) {
        const refName = schema.$ref.replace("#/components/schemas/", "");
        return expandSchema(definitions[refName], definitions);
    }

    if (schema.type === "array" && schema.items) {
        schema.items = expandSchema(schema.items, definitions);
    }

    if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            schema.properties[key] = expandSchema(schema.properties[key], definitions);
        });
    }

    return schema;
}

/**
 * The MetaProvider class is responsible for managing and providing metadata, 
 * such as OpenAPI specifications and JSON schemas, for the API.
 */
export class MetaProvider {
    private logger: AppContext["logger"];
    public schemas: Record<string, any>;
    public sourceSchemas: Record<string, any> = {};
    public apiSpec: OpenAPIObject | null = null;
    public sourceSpec: OpenAPIObject | null = null;
    context: AppContext;

    constructor() { }

    /**
     * Initializes the MetaProvider with the given application context.
     * @param context The application context containing configuration and logger.
     */
    init(context: AppContext) {
        this.context = context;
        this.logger = context.logger;
        this.buildSchemas();
    }

    /**
     * Builds the OpenAPI specification for the API.
     * @returns The generated OpenAPI specification object.
     */
    buildSchemas(): void {
        this.sourceSchemas = validationMetadatasToSchemas({ refPointerPrefix: "#/components/schemas/" });
        this.schemas = this.expandSchemas(this.sourceSchemas);
    }

    expandSchemas(schemas: Record<string, SchemaObject | ReferenceObject>): Record<string, SchemaObject> {
        /**
         * Рекурсивная функция, которая раскрывает ссылки ($ref).
         * Чтобы избежать зацикливания, храним множество `visitedRefs`.
         */
        function expandSchema(schema: SchemaObject | ReferenceObject, visitedRefs = new Set<string>()): SchemaObject {
            if (!schema) return {} as SchemaObject;

            // Если это ReferenceObject
            if ("$ref" in schema) {
                const refName = schema.$ref.replace("#/components/schemas/", "");
                const referencedSchema = schemas[refName];
                // Если не нашли по имени, возвращаем пустой объект
                if (!referencedSchema) return {} as SchemaObject;

                // Если уже в процессе раскрытия refName, значит цикл
                if (visitedRefs.has(refName)) {
                    // Возвращаем \"облегчённый\" объект (не раскрываем дальше)
                    return { type: "object", title: refName, description: "Circular reference" };
                }

                // Добавляем refName в visited, чтобы отследить повтор
                visitedRefs.add(refName);

                // Рекурсивно раскрываем
                const result = expandSchema(referencedSchema, visitedRefs);

                // Если хотите, можно удалять refName (тогда повторное обращение где-то ещё раскроется заново)
                // visitedRefs.delete(refName);

                return result;
            }

            const expanded: SchemaObject = { ...schema };

            // Если это массив – раскрываем items
            if (expanded.type === "array" && expanded.items) {
                expanded.items = expandSchema(expanded.items, visitedRefs);
            }

            // Если есть properties – раскрываем каждое
            if (expanded.properties) {
                const newProperties: Record<string, SchemaObject> = {};
                Object.entries(expanded.properties).forEach(([key, prop]) => {
                    newProperties[key] = expandSchema(prop, visitedRefs);
                });
                expanded.properties = newProperties;
            }

            return expanded;
        }

        // Обрабатываем все схемы
        const expandedSchemas: Record<string, SchemaObject> = {};

        Object.entries(schemas).forEach(([key, schema]) => {
            expandedSchemas[key] = expandSchema(schema);
        });

        return expandedSchemas;
    }


    buildApiSpec(): OpenAPIObject {
        this.buildSchemas();
        this.sourceSpec = routingControllersToSpec(
            getMetadataArgsStorage(),
            { routePrefix: this.context.config.apiPrefix },
            {
                components: { schemas: this.schemas },
                info: { title: "API Documentation", version: "1.0.0" }
            }
        );
        this.apiSpec = this.expandOpenAPISpec(this.sourceSpec);
        return this.apiSpec;
    }

    expandOpenAPISpec(spec: OpenAPIObject): OpenAPIObject {
        // Глубокая копия, чтобы не мутировать исходный объект
        const clonedSpec = JSON.parse(JSON.stringify(spec));

        if (!clonedSpec.components || !clonedSpec.components.schemas) {
            return clonedSpec;
        }

        // Локальная ссылка на все схемы
        const definitions = clonedSpec.components.schemas;

        /**
         * Рекурсивно раскрываем схему, отслеживая ссылки в множестве visitedRefs.
         */
        function expandSchema(schema: any, visitedRefs: Set<string>): any {
            if (!schema) return schema;

            if (schema.$ref) {
                const refName = schema.$ref.replace("#/components/schemas/", "");
                // Если в схемах нет такого определения, возвращаем как есть
                if (!definitions[refName]) {
                    return schema;
                }

                // Проверяем, не зашли ли мы уже в раскрытие этого ref
                if (visitedRefs.has(refName)) {
                    // Возвращаем \"облегчённый\" вариант вместо бесконечной рекурсии
                    return { type: "object", title: refName, description: "Circular reference" };
                }

                // Помечаем refName как посещённый
                visitedRefs.add(refName);

                // Рекурсивно раскрываем ссылочную схему
                const resolved = expandSchema(definitions[refName], visitedRefs);

                // Если хотите, можно \"разрешить\" повторное раскрытие в другом контексте:
                // visitedRefs.delete(refName);

                return resolved;
            }

            // Если schema.type === 'array'
            if (schema.type === "array" && schema.items) {
                schema.items = expandSchema(schema.items, visitedRefs);
            }

            // Если schema.properties
            if (schema.properties) {
                Object.keys(schema.properties).forEach((key) => {
                    schema.properties[key] = expandSchema(schema.properties[key], visitedRefs);
                });
            }

            return schema;
        }

        // Функция-обёртка для удобства
        function expandInOperation(schema: any) {
            // Можем на каждую операцию давать новый Set (чтобы раскрывалось заново) или общий Set
            const visited = new Set<string>();
            return expandSchema(schema, visited);
        }

        // 1. Сначала пробежимся по всем схемам в components.schemas, чтобы их раскрыть
        // (можно пропустить, если расширяете только при использовании в paths)
        Object.keys(definitions).forEach((schemaName) => {
            const visited = new Set<string>();
            definitions[schemaName] = expandSchema(definitions[schemaName], visited);
        });

        // 2. Раскрываем схемы, используемые в paths -> operations
        Object.values(clonedSpec.paths).forEach((methods: any) => {
            Object.values(methods).forEach((operation: any) => {
                // requestBody
                if (operation.requestBody?.content) {
                    Object.keys(operation.requestBody.content).forEach((contentType) => {
                        const bodySchema = operation.requestBody.content[contentType].schema;
                        if (bodySchema) {
                            operation.requestBody.content[contentType].schema = expandInOperation(bodySchema);
                        }
                    });
                }

                // responses
                if (operation.responses) {
                    Object.values(operation.responses).forEach((response: any) => {
                        if (response.content) {
                            Object.keys(response.content).forEach((contentType) => {
                                const respSchema = response.content[contentType].schema;
                                if (respSchema) {
                                    response.content[contentType].schema = expandInOperation(respSchema);
                                }
                            });
                        }
                    });
                }

                // parameters
                if (operation.parameters) {
                    operation.parameters = operation.parameters.map((param: any) => {
                        if (param.schema) {
                            param.schema = expandInOperation(param.schema);
                        }
                        return param;
                    });
                }

                // securitySchemes (на уровне операции)
                if (clonedSpec.components?.securitySchemes) {
                    Object.keys(clonedSpec.components.securitySchemes).forEach((schemeKey) => {
                        const secScheme = clonedSpec.components.securitySchemes[schemeKey];
                        if (secScheme?.schema) {
                            secScheme.schema = expandInOperation(secScheme.schema);
                        }
                    });
                }
            });
        });

        return clonedSpec;
    }

    getApiSpec(): OpenAPIObject {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return this.apiSpec;
    }

    getApiSourceSpec(): OpenAPIObject {
        if (!this.sourceSpec) {
            this.buildApiSpec();
        }
        return this.sourceSpec;
    }

    /**
     * Retrieves all routes defined in the API.
     * @returns An array of route metadata objects.
     */
    getAllRoutes(): RouteMetadata[] {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }

        return Object.entries(this.apiSpec.paths || {}).flatMap(([path, methods]) =>
            Object.entries(methods).map(([method, operation]) => {
                const op = operation as OperationObject;
                return {
                    path,
                    method: method.toUpperCase(),
                    ...op
                };
            })
        );
    }

    /**
     * Retrieves all controllers and their routes.
     * @returns An array of objects containing controller names and their routes.
     */
    getControllers(): ControllersDTO[] {
        const storage = getMetadataArgsStorage();
        return storage.controllers.map(controller => ({
            name: controller.target.name,
            routes: storage.actions
                .filter(action => action.target === controller.target)
                .map(action => ({
                    method: action.type.toUpperCase(),
                    path: "string" === typeof action.route ? action.route : action.route.toString()
                }))
        }));
    }

    getAllTypesFromRoute(routeName: string, method?: string, onlyType?: 'input' | 'output'): RouterTypeReference[] {
        const types: RouterTypeReference[] = [];

        const routeMeta = this.getSourceRoute(routeName, method);

        if (!routeMeta) return types;

        const routes = Array.isArray(routeMeta) ? routeMeta : [routeMeta];

        routes.forEach(_route => {
            const requestBody = _route.requestBody as unknown as RequestBodyObject;
            if (requestBody?.content && (!onlyType || onlyType === 'input')) {
                Object.entries(requestBody.content).forEach(([contentType, content]) => {
                    const schema = content?.schema as ReferenceObject;
                    if (schema?.$ref) {
                        const refName = schema.$ref.replace('#/components/schemas/', '');
                        const model = this.getSchemaByName(refName);
                        const fields = model ? this.convertSchemaToFormFields(model) : [];
                        types.push({
                            type: 'input', fields: {
                                fields,
                                type: model.type === 'object' ? 'object' : 'array'
                            }, ref: refName, contentType, model: model
                        });

                    }
                });
            }
            const responses = _route.responses as Record<string, OpenApiResponse>;
            if (responses && (!onlyType || onlyType === 'output')) {
                Object.entries(responses).forEach(([statusCode, response]) => {
                    if (response.content) {
                        Object.entries(response.content).forEach(([contentType, content]) => {
                            if (content.schema && content.schema.$ref) {
                                const refName = content.schema.$ref.replace('#/components/schemas/', '');
                                const model = this.getSchemaByName(refName);
                                const fields = model ? this.convertSchemaToFormFields(model) : [];

                                types.push({
                                    type: 'output', model,
                                    fields: {
                                        fields,
                                        type: content.schema.type === 'object' ? 'object' : 'array'
                                    },
                                    ref: refName, statusCode, contentType
                                });
                            }
                        });
                    }
                });
            }
        });

        return types;
    }
    /**
     * Retrieves route metadata for a given route and optional HTTP method.
     *
     * @param route - The route path to search for.
     * @param method - Optional HTTP method to filter the route by (e.g., 'GET', 'POST').
     * @returns The route metadata for the specified route and method, or an array of route metadata if no method is specified, or null if no matching route is found.
     */
    getSourceRoute(_route: string, method?: string): RouteMetadata | RouteMetadata[] | null {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const route = _route.replace(/^\/+|\/+$/g, "");

        // Create a map of "normalized path" -> "original path"
        const routeMap = new Map<string, string>();
        Object.keys(this.sourceSpec.paths || {}).forEach((key) => {
            const normalizedKey = key.replace(/^\/+|\/+$/g, ""); // Remove trailing `/`
            routeMap.set(normalizedKey, key);
        });

        // Find the longest matching route
        const matchedRoute = Array.from(routeMap.keys())
            .filter((key) => key.includes(route)) // Filter by match
            .sort((a, b) => b.length - a.length)[0]; // Take the longest

        if (!matchedRoute) {
            return null;
        }

        // Get the original path (with `/` if it was there)
        const originalRoute = routeMap.get(matchedRoute)!;
        const routeMethods = this.sourceSpec.paths[originalRoute] || {};

        if (method) {
            const normalizedMethod = method.toLowerCase() as MethodType;
            const operation = routeMethods[normalizedMethod] as OperationObject;

            return operation
                ? {
                    path: originalRoute,
                    method: method.toUpperCase(),
                    ...operation
                }
                : null;
        }
        return Object.entries(routeMethods).map(([method, operation]) => ({
            path: matchedRoute,
            method: method.toUpperCase(),
            ...(operation as OperationObject || {})
        }));
    }

    getRoute(_route: string, method?: string): RouteMetadata | RouteMetadata[] | null {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const route = _route.replace(/^\/+|\/+$/g, "");

        // Create a map of "normalized path" -> "original path"
        const routeMap = new Map<string, string>();
        Object.keys(this.apiSpec.paths || {}).forEach((key) => {
            const normalizedKey = key.replace(/^\/+|\/+$/g, ""); // Remove trailing `/`
            routeMap.set(normalizedKey, key);
        });

        // Find the longest matching route
        const matchedRoute = Array.from(routeMap.keys())
            .filter((key) => key.includes(route)) // Filter by match
            .sort((a, b) => b.length - a.length)[0]; // Take the longest

        if (!matchedRoute) {
            return null;
        }

        // Get the original path (with `/` if it was there)
        const originalRoute = routeMap.get(matchedRoute)!;
        const routeMethods = this.apiSpec.paths[originalRoute] || {};

        if (method) {
            const normalizedMethod = method.toLowerCase() as MethodType;
            const operation = routeMethods[normalizedMethod] as OperationObject;

            return operation
                ? {
                    path: originalRoute,
                    method: method.toUpperCase(),
                    ...operation
                }
                : null;
        }
        return Object.entries(routeMethods).map(([method, operation]) => ({
            path: matchedRoute,
            method: method.toUpperCase(),
            ...(operation as OperationObject || {})
        }));
    }

    /**
     * Retrieves the JSON Schema for the given DTO class name.
     * @param name The name of the DTO class.
     * @returns The JSON Schema object for the specified DTO class, or null if not found.
     */
    getSchemaByName(name: string): any {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const schema = this.schemas[name];
        if (!schema) {
            this.logger.warn(`⚠ Schema for ${name} not found.`);
            return null;
        }
        return schema;
    }

    /**
     * Retrieves the JSON Schema for the given DTO class.
     * @param dtoClass The DTO class.
     * @returns The JSON Schema object for the specified DTO class.
     */
    getSchemaByClass(dtoClass: new () => any): any {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return this.getSchemaByName(dtoClass.name);
    }

    /**
     * Validates and transforms JSON data into a DTO object.
     * @param dtoClass The DTO class.
     * @param rawData The input data.
     * @returns The transformed DTO object, or null if validation fails.
     */
    validateAndTransform<T>(dtoClass: new () => T, rawData: any): T | null {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const schema = this.getSchemaByName(dtoClass.name);
        if (!schema) return null;

        try {
            return plainToInstance(dtoClass, rawData);
        } catch (error) {
            this.logger.error(`❌ Failed to transform data into ${dtoClass.name}:`, error);
            return null;
        }
    }

    /**
     * Retrieves a list of all registered DTOs.
     * @returns An array of strings representing the names of all registered DTOs.
     */
    listAvailableDTOs(): string[] {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return Object.keys(this.schemas);
    }

    /**
     * Returns all available JSON Schemas.
     * @returns An object containing all JSON Schemas.
     */
    getAllSchemas(): ItemSchemaDTO[] {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const schemas = this.schemas;
        const results = [];
        for (const key in schemas) {
            results.push({ name: key, schema: schemas[key] });
        }
        return results;
    }
    sourceSchema: Record<string, any>;
    getSourceSchema(): Record<string, any> {
        if (!this.sourceSchema) {
            this.sourceSchema = validationMetadatasToSchemas()
        }
        return this.sourceSchema;
    }



    /**
     * Преобразует JSON Schema в массив полей формы.
     * @param schema JSON Schema объекта
     * @param requiredFields Список обязательных полей
     * @returns Массив объектов формата FormField
     */
    // Полный пример функции convertSchemaToFormFields,
    // обрабатывающей объект, массивы, формат "binary", вложенные структуры, @reference.

    convertSchemaToFormFields(schema: SchemaObject): FormField[] {
        if (!schema) {
            return [];
        }

        // Если верхний уровень – массив
        if (schema.type === "array" && schema.items) {
            // Создаём одно поле массива
            const field: FormField = {
                ...schema,
                name: "items",
                type: "array",
                required: false, // т.к. это "top-level" поле, без контекста родительских полей
                children: [],
                format: schema.format || undefined,
            };

            // Если items это массив схем (редкий случай)
            if (Array.isArray(schema.items)) {
                // Обрабатываем первую схему
                field.children = this.convertSchemaToFormFields(schema.items[0] as SchemaObject);
            } else {
                const itemsSchema = schema.items as SchemaObject;
                // Если объект
                if (itemsSchema.type === "object" && itemsSchema.properties) {
                    field.children = this.convertSchemaToFormFields(itemsSchema);
                    // Если это строка + формат binary
                } else if (itemsSchema.type === "string" && itemsSchema.format === "binary") {
                    field.children = [{
                        name: "file",
                        type: "file",
                        required: false,
                        format: "binary",
                    }];
                    // Если это массив
                } else if (itemsSchema.type === "array") {
                    field.children = this.convertSchemaToFormFields(itemsSchema);
                }
            }
            return [field];
        }

        // Если это не массив, проверяем объект
        if (schema.type !== "object" || !schema.properties) {
            // Если не объект, просто выходим (нет свойств)
            return [];
        }

        // Список обязательных полей
        const requiredFields = new Set(schema.required || []);

        return Object.entries(schema.properties).map(([key, propSchema]) => {
            const value = propSchema as any;
            // Создаём поле
            const isBinary = value.format === "binary";
            const field: FormField = {
                ...propSchema,
                name: key,
                type: isBinary ? 'file' : value.type || "string", // По умолчанию считаем string
                required: requiredFields.has(key),
            };

            // Проверяем @reference
            if (value.description && value.description.includes("@reference")) {
                const match = value.description.match(/@reference\s+(\w+)/);
                if (match) {
                    field.referenceName = match[1];
                }
            }

            // Рекурсивно обрабатываем вложенные объекты / массивы
            if (value.type === "object" && value.properties) {
                field.children = this.convertSchemaToFormFields(value);
            } else if (value.type === "array" && value.items) {
                // Создаём массив детей
                if (Array.isArray(value.items)) {
                    // Если items – массив схем, обрабатываем первую
                    field.children = this.convertSchemaToFormFields(value.items[0] as SchemaObject);
                } else {
                    const itemsSchema = value.items as SchemaObject;
                    // Если объект
                    if (itemsSchema.type === "object" && itemsSchema.properties) {
                        field.children = this.convertSchemaToFormFields(itemsSchema);
                        // Если это строка + формат binary
                    } else if (itemsSchema.type === "string" && itemsSchema.format === "binary") {
                        field.children = [{
                            name: "file",
                            type: "file",
                            required: false,
                        }];
                        // Если это массив
                    } else if (itemsSchema.type === "array") {
                        field.children = this.convertSchemaToFormFields(itemsSchema);
                    } else {
                        field.children = [];
                    }
                }
                // Само поле – это массив
                field.type = "array";
            }

            return field;
        });
    }



    getFormFields(name: string): FormField[] {
        const schema = this.getSchemaByName(name);
        if (!schema) {
            this.logger.warn(`⚠ Schema for ${name} not found.`);
            return [];
        }

        return this.convertSchemaToFormFields(schema);
    }

    getResponseRouterFields(route: string, method?: string): FormFields {
        const routeMeta = this.getRoute(route, method);
        if (!routeMeta) {
            if (method) {
                this.logger.warn(`⚠ Route ${method.toUpperCase()} ${route} not found.`);
            } else {
                this.logger.warn(`⚠ Route ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;
        const responses = _route.responses;
        if (!responses) {
            if (method) {
                this.logger.warn(`⚠ Responses for ${method.toUpperCase()} ${route} not found.`);
            } else {
                this.logger.warn(`⚠ Responses for ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }

        if (!responses["200"] || !responses["200"].content) {
            return { type: 'object', fields: [] };
        }

        const jsonResponse = responses["200"].content["application/json"];

        if (!jsonResponse || !jsonResponse.schema) {
            return { type: 'object', fields: [] };
        }
        const results = this.convertSchemaToFormFields(jsonResponse.schema);
        if (jsonResponse.schema.type === 'object') {
            return { type: 'object', fields: results };
        } else {
            return { type: 'array', fields: results };
        }
    }

    getRequestRouterFields(route: string, method: string = 'POST'): FormFields {
        const routeMeta = this.getRoute(route, method);

        if (!routeMeta) {
            if (method) {
                this.logger.warn(`⚠ Route ${method.toUpperCase()} ${route} not found.`);
            } else {
                this.logger.warn(`⚠ Route ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;

        const requestBody = _route.requestBody as RequestBodyObject;
        if (!requestBody || !requestBody.content) {
            if (method) {
                this.logger.warn(`⚠ Request body for ${method.toUpperCase()} ${route} not found.`);
            } else {
                this.logger.warn(`⚠ Request body for ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }

        const content = requestBody.content["application/json"] || requestBody.content["application/x-www-form-urlencoded"] || requestBody.content["multipart/form-data"];
        if (!content || !content.schema) {
            this.logger.warn(`⚠ JSON schema for ${method.toUpperCase()} ${route} not found.`);
            return { type: 'object', fields: [] };
        }
        const schema = (content as any).schema;
        if (!schema) {
            return { type: 'object', fields: [] };
        }
        const results = this.convertSchemaToFormFields(schema);
        if (schema.type === 'object') {
            return { type: 'object', fields: results };
        } else {
            return { type: 'array', fields: results };
        }
    }


}
