"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProvider = exports.RouterTypeReferenceDTO = exports.RouteMetadataDTO = exports.ItemSchemaDTO = exports.ControllersDTO = exports.ExtraRouteDTO = exports.FormFieldsDTO = exports.FormFieldDTO = exports.SchemaDTO = void 0;
exports.expandSchema = expandSchema;
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const class_transformer_1 = require("class-transformer");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const server_1 = require("@tsdiapi/server");
class SchemaDTO {
    title;
    description;
    format;
    type;
    nullable;
    readOnly;
    writeOnly;
    deprecated;
    maxLength;
    minLength;
    maximum;
    minimum;
    pattern;
    default;
    enum;
    items;
    properties;
    additionalProperties;
}
exports.SchemaDTO = SchemaDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchemaDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchemaDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchemaDTO.prototype, "format", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchemaDTO.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchemaDTO.prototype, "nullable", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchemaDTO.prototype, "readOnly", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchemaDTO.prototype, "writeOnly", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchemaDTO.prototype, "deprecated", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SchemaDTO.prototype, "maxLength", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SchemaDTO.prototype, "minLength", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SchemaDTO.prototype, "maximum", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SchemaDTO.prototype, "minimum", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchemaDTO.prototype, "pattern", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SchemaDTO.prototype, "default", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SchemaDTO.prototype, "enum", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SchemaDTO.prototype, "items", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SchemaDTO.prototype, "properties", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SchemaDTO.prototype, "additionalProperties", void 0);
class FormFieldDTO extends SchemaDTO {
    name;
    required;
    referenceName;
    referenceModel;
    children;
}
exports.FormFieldDTO = FormFieldDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FormFieldDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FormFieldDTO.prototype, "required", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FormFieldDTO.prototype, "referenceName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], FormFieldDTO.prototype, "referenceModel", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, server_1.IsEntity)(() => FormFieldDTO, { each: true }),
    __metadata("design:type", Array)
], FormFieldDTO.prototype, "children", void 0);
class FormFieldsDTO {
    type;
    fields;
}
exports.FormFieldsDTO = FormFieldsDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FormFieldsDTO.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, server_1.IsEntity)(() => FormFieldDTO, { each: true }),
    __metadata("design:type", Array)
], FormFieldsDTO.prototype, "fields", void 0);
class ExtraRouteDTO {
    path;
    method;
}
exports.ExtraRouteDTO = ExtraRouteDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExtraRouteDTO.prototype, "path", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExtraRouteDTO.prototype, "method", void 0);
class ControllersDTO {
    name;
    routes;
}
exports.ControllersDTO = ControllersDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ControllersDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, server_1.IsEntity)(() => ExtraRouteDTO, { each: true }),
    __metadata("design:type", Array)
], ControllersDTO.prototype, "routes", void 0);
class ItemSchemaDTO {
    name;
    schema;
}
exports.ItemSchemaDTO = ItemSchemaDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemSchemaDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, server_1.IsEntity)(() => SchemaDTO),
    __metadata("design:type", SchemaDTO)
], ItemSchemaDTO.prototype, "schema", void 0);
class RouteMetadataDTO {
    path;
    method;
    tags;
    summary;
    description;
    externalDocs;
    operationId;
    parameters;
    requestBody;
    responses;
    callbacks;
    deprecated;
    security;
    servers;
}
exports.RouteMetadataDTO = RouteMetadataDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteMetadataDTO.prototype, "path", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteMetadataDTO.prototype, "method", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RouteMetadataDTO.prototype, "tags", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteMetadataDTO.prototype, "summary", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteMetadataDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RouteMetadataDTO.prototype, "externalDocs", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteMetadataDTO.prototype, "operationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], RouteMetadataDTO.prototype, "parameters", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RouteMetadataDTO.prototype, "requestBody", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RouteMetadataDTO.prototype, "responses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RouteMetadataDTO.prototype, "callbacks", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RouteMetadataDTO.prototype, "deprecated", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], RouteMetadataDTO.prototype, "security", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], RouteMetadataDTO.prototype, "servers", void 0);
class RouterTypeReferenceDTO {
    type;
    ref;
    statusCode;
    contentType;
    model;
    fields;
}
exports.RouterTypeReferenceDTO = RouterTypeReferenceDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouterTypeReferenceDTO.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouterTypeReferenceDTO.prototype, "ref", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouterTypeReferenceDTO.prototype, "statusCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouterTypeReferenceDTO.prototype, "contentType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RouterTypeReferenceDTO.prototype, "model", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, server_1.IsEntity)(() => FormFieldsDTO),
    __metadata("design:type", FormFieldsDTO)
], RouterTypeReferenceDTO.prototype, "fields", void 0);
function expandSchema(schema, definitions) {
    if (!schema)
        return schema;
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
class MetaProvider {
    logger;
    schemas;
    sourceSchemas = {};
    apiSpec = null;
    sourceSpec = null;
    context;
    constructor() { }
    /**
     * Initializes the MetaProvider with the given application context.
     * @param context The application context containing configuration and logger.
     */
    init(context) {
        this.context = context;
        this.logger = context.logger;
        this.buildSchemas();
    }
    /**
     * Builds the OpenAPI specification for the API.
     * @returns The generated OpenAPI specification object.
     */
    buildSchemas() {
        this.sourceSchemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({ refPointerPrefix: "#/components/schemas/" });
        this.schemas = this.expandSchemas(this.sourceSchemas);
    }
    expandSchemas(schemas) {
        /**
         * Рекурсивная функция, которая раскрывает ссылки ($ref).
         * Чтобы избежать зацикливания, храним множество `visitedRefs`.
         */
        function expandSchema(schema, visitedRefs = new Set()) {
            if (!schema)
                return {};
            // Если это ReferenceObject
            if ("$ref" in schema) {
                const refName = schema.$ref.replace("#/components/schemas/", "");
                const referencedSchema = schemas[refName];
                // Если не нашли по имени, возвращаем пустой объект
                if (!referencedSchema)
                    return {};
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
            const expanded = { ...schema };
            // Если это массив – раскрываем items
            if (expanded.type === "array" && expanded.items) {
                expanded.items = expandSchema(expanded.items, visitedRefs);
            }
            // Если есть properties – раскрываем каждое
            if (expanded.properties) {
                const newProperties = {};
                Object.entries(expanded.properties).forEach(([key, prop]) => {
                    newProperties[key] = expandSchema(prop, visitedRefs);
                });
                expanded.properties = newProperties;
            }
            return expanded;
        }
        // Обрабатываем все схемы
        const expandedSchemas = {};
        Object.entries(schemas).forEach(([key, schema]) => {
            expandedSchemas[key] = expandSchema(schema);
        });
        return expandedSchemas;
    }
    buildApiSpec() {
        this.buildSchemas();
        this.sourceSpec = (0, routing_controllers_openapi_1.routingControllersToSpec)((0, routing_controllers_1.getMetadataArgsStorage)(), { routePrefix: this.context.config.apiPrefix }, {
            components: { schemas: this.schemas },
            info: { title: "API Documentation", version: "1.0.0" }
        });
        this.apiSpec = this.expandOpenAPISpec(this.sourceSpec);
        return this.apiSpec;
    }
    expandOpenAPISpec(spec) {
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
        function expandSchema(schema, visitedRefs) {
            if (!schema)
                return schema;
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
        function expandInOperation(schema) {
            // Можем на каждую операцию давать новый Set (чтобы раскрывалось заново) или общий Set
            const visited = new Set();
            return expandSchema(schema, visited);
        }
        // 1. Сначала пробежимся по всем схемам в components.schemas, чтобы их раскрыть
        // (можно пропустить, если расширяете только при использовании в paths)
        Object.keys(definitions).forEach((schemaName) => {
            const visited = new Set();
            definitions[schemaName] = expandSchema(definitions[schemaName], visited);
        });
        // 2. Раскрываем схемы, используемые в paths -> operations
        Object.values(clonedSpec.paths).forEach((methods) => {
            Object.values(methods).forEach((operation) => {
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
                    Object.values(operation.responses).forEach((response) => {
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
                    operation.parameters = operation.parameters.map((param) => {
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
    getApiSpec() {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return this.apiSpec;
    }
    getApiSourceSpec() {
        if (!this.sourceSpec) {
            this.buildApiSpec();
        }
        return this.sourceSpec;
    }
    /**
     * Retrieves all routes defined in the API.
     * @returns An array of route metadata objects.
     */
    getAllRoutes() {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return Object.entries(this.apiSpec.paths || {}).flatMap(([path, methods]) => Object.entries(methods).map(([method, operation]) => {
            const op = operation;
            return {
                path,
                method: method.toUpperCase(),
                ...op
            };
        }));
    }
    /**
     * Retrieves all controllers and their routes.
     * @returns An array of objects containing controller names and their routes.
     */
    getControllers() {
        const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
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
    getAllTypesFromRoute(routeName, method, onlyType) {
        const types = [];
        const routeMeta = this.getSourceRoute(routeName, method);
        if (!routeMeta)
            return types;
        const routes = Array.isArray(routeMeta) ? routeMeta : [routeMeta];
        routes.forEach(_route => {
            const requestBody = _route.requestBody;
            if (requestBody?.content && (!onlyType || onlyType === 'input')) {
                Object.entries(requestBody.content).forEach(([contentType, content]) => {
                    const schema = content?.schema;
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
            const responses = _route.responses;
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
    getSourceRoute(_route, method) {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const route = _route.replace(/^\/+|\/+$/g, "");
        // Create a map of "normalized path" -> "original path"
        const routeMap = new Map();
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
        const originalRoute = routeMap.get(matchedRoute);
        const routeMethods = this.sourceSpec.paths[originalRoute] || {};
        if (method) {
            const normalizedMethod = method.toLowerCase();
            const operation = routeMethods[normalizedMethod];
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
            ...(operation || {})
        }));
    }
    getRoute(_route, method) {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const route = _route.replace(/^\/+|\/+$/g, "");
        // Create a map of "normalized path" -> "original path"
        const routeMap = new Map();
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
        const originalRoute = routeMap.get(matchedRoute);
        const routeMethods = this.apiSpec.paths[originalRoute] || {};
        if (method) {
            const normalizedMethod = method.toLowerCase();
            const operation = routeMethods[normalizedMethod];
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
            ...(operation || {})
        }));
    }
    /**
     * Retrieves the JSON Schema for the given DTO class name.
     * @param name The name of the DTO class.
     * @returns The JSON Schema object for the specified DTO class, or null if not found.
     */
    getSchemaByName(name) {
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
    getSchemaByClass(dtoClass) {
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
    validateAndTransform(dtoClass, rawData) {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        const schema = this.getSchemaByName(dtoClass.name);
        if (!schema)
            return null;
        try {
            return (0, class_transformer_1.plainToInstance)(dtoClass, rawData);
        }
        catch (error) {
            this.logger.error(`❌ Failed to transform data into ${dtoClass.name}:`, error);
            return null;
        }
    }
    /**
     * Retrieves a list of all registered DTOs.
     * @returns An array of strings representing the names of all registered DTOs.
     */
    listAvailableDTOs() {
        if (!this.apiSpec) {
            this.buildApiSpec();
        }
        return Object.keys(this.schemas);
    }
    /**
     * Returns all available JSON Schemas.
     * @returns An object containing all JSON Schemas.
     */
    getAllSchemas() {
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
    sourceSchema;
    getSourceSchema() {
        if (!this.sourceSchema) {
            this.sourceSchema = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)();
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
    convertSchemaToFormFields(schema) {
        if (!schema) {
            return [];
        }
        // Если верхний уровень – массив
        if (schema.type === "array" && schema.items) {
            // Создаём одно поле массива
            const field = {
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
                field.children = this.convertSchemaToFormFields(schema.items[0]);
            }
            else {
                const itemsSchema = schema.items;
                // Если объект
                if (itemsSchema.type === "object" && itemsSchema.properties) {
                    field.children = this.convertSchemaToFormFields(itemsSchema);
                    // Если это строка + формат binary
                }
                else if (itemsSchema.type === "string" && itemsSchema.format === "binary") {
                    field.children = [{
                            name: "file",
                            type: "file",
                            required: false,
                            format: "binary",
                        }];
                    // Если это массив
                }
                else if (itemsSchema.type === "array") {
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
            const value = propSchema;
            // Создаём поле
            const isBinary = value.format === "binary";
            const field = {
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
            }
            else if (value.type === "array" && value.items) {
                // Создаём массив детей
                if (Array.isArray(value.items)) {
                    // Если items – массив схем, обрабатываем первую
                    field.children = this.convertSchemaToFormFields(value.items[0]);
                }
                else {
                    const itemsSchema = value.items;
                    // Если объект
                    if (itemsSchema.type === "object" && itemsSchema.properties) {
                        field.children = this.convertSchemaToFormFields(itemsSchema);
                        // Если это строка + формат binary
                    }
                    else if (itemsSchema.type === "string" && itemsSchema.format === "binary") {
                        field.children = [{
                                name: "file",
                                type: "file",
                                required: false,
                            }];
                        // Если это массив
                    }
                    else if (itemsSchema.type === "array") {
                        field.children = this.convertSchemaToFormFields(itemsSchema);
                    }
                    else {
                        field.children = [];
                    }
                }
                // Само поле – это массив
                field.type = "array";
            }
            return field;
        });
    }
    getFormFields(name) {
        const schema = this.getSchemaByName(name);
        if (!schema) {
            this.logger.warn(`⚠ Schema for ${name} not found.`);
            return [];
        }
        return this.convertSchemaToFormFields(schema);
    }
    getResponseRouterFields(route, method) {
        const routeMeta = this.getRoute(route, method);
        if (!routeMeta) {
            if (method) {
                this.logger.warn(`⚠ Route ${method.toUpperCase()} ${route} not found.`);
            }
            else {
                this.logger.warn(`⚠ Route ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;
        const responses = _route.responses;
        if (!responses) {
            if (method) {
                this.logger.warn(`⚠ Responses for ${method.toUpperCase()} ${route} not found.`);
            }
            else {
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
        }
        else {
            return { type: 'array', fields: results };
        }
    }
    getRequestRouterFields(route, method = 'POST') {
        const routeMeta = this.getRoute(route, method);
        if (!routeMeta) {
            if (method) {
                this.logger.warn(`⚠ Route ${method.toUpperCase()} ${route} not found.`);
            }
            else {
                this.logger.warn(`⚠ Route ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;
        const requestBody = _route.requestBody;
        if (!requestBody || !requestBody.content) {
            if (method) {
                this.logger.warn(`⚠ Request body for ${method.toUpperCase()} ${route} not found.`);
            }
            else {
                this.logger.warn(`⚠ Request body for ${route} not found.`);
            }
            return { type: 'object', fields: [] };
        }
        const content = requestBody.content["application/json"] || requestBody.content["application/x-www-form-urlencoded"] || requestBody.content["multipart/form-data"];
        if (!content || !content.schema) {
            this.logger.warn(`⚠ JSON schema for ${method.toUpperCase()} ${route} not found.`);
            return { type: 'object', fields: [] };
        }
        const schema = content.schema;
        if (!schema) {
            return { type: 'object', fields: [] };
        }
        const results = this.convertSchemaToFormFields(schema);
        if (schema.type === 'object') {
            return { type: 'object', fields: results };
        }
        else {
            return { type: 'array', fields: results };
        }
    }
}
exports.MetaProvider = MetaProvider;
//# sourceMappingURL=provider.js.map