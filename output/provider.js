import { Type } from '@sinclair/typebox';
import { getAllSchemas, metaRouteSchemaStorage } from "@tsdiapi/server";
export const SchemaDTO = Type.Object({
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    format: Type.Optional(Type.String()),
    type: Type.Optional(Type.String()),
    nullable: Type.Optional(Type.Boolean()),
    readOnly: Type.Optional(Type.Boolean()),
    writeOnly: Type.Optional(Type.Boolean()),
    deprecated: Type.Optional(Type.Boolean()),
    maxLength: Type.Optional(Type.Number()),
    minLength: Type.Optional(Type.Number()),
    maximum: Type.Optional(Type.Number()),
    minimum: Type.Optional(Type.Number()),
    pattern: Type.Optional(Type.String()),
    default: Type.Optional(Type.Any()),
    enum: Type.Optional(Type.Array(Type.String())),
    items: Type.Optional(Type.Any()),
    properties: Type.Optional(Type.Record(Type.String(), Type.Any())),
    additionalProperties: Type.Optional(Type.Any()),
});
export const ApiSchemaSourceDTO = Type.Object({
    source: Type.Unknown({
        default: {},
    }),
});
export const FormFieldsDTO = Type.Object({
    type: Type.String(),
    fields: Type.Array(Type.Any()),
});
export const FormFieldDTO = Type.Intersect([
    SchemaDTO,
    Type.Object({
        name: Type.String(),
        required: Type.Boolean(),
        referenceName: Type.Optional(Type.String()),
        children: Type.Optional(Type.Array(Type.Any())),
    })
]);
export const FormFieldListDTO = Type.Object({
    fields: Type.Array(FormFieldDTO),
});
export const ExtraRouteDTO = Type.Object({
    path: Type.String(),
    method: Type.String(),
});
export const ItemSchemaDTO = Type.Object({
    name: Type.String(),
    schema: SchemaDTO,
});
export const RouteMetadataDTO = Type.Object({
    path: Type.String(),
    method: Type.String(),
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Any()),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Any())),
    requestBody: Type.Optional(Type.Any()),
    responses: Type.Optional(Type.Any()),
    callbacks: Type.Optional(Type.Any()),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Any())),
    servers: Type.Optional(Type.Array(Type.Any())),
});
export const RoutesMetadataDTO = Type.Object({
    routes: Type.Array(RouteMetadataDTO),
});
export const SchemaTypeDTO = Type.Object({
    type: Type.Union([
        Type.Literal('params'),
        Type.Literal('query'),
        Type.Literal('body'),
        Type.Literal('headers'),
        Type.Literal('response'),
    ]),
    statusCode: Type.Optional(Type.String()),
    id: Type.Optional(Type.String()),
    schema: Type.Any(),
    fields: Type.Array(FormFieldDTO),
});
export class MetaProvider {
    logger;
    apiSpec = null;
    fastifyInstance = null;
    context;
    constructor() { }
    init(context) {
        this.context = context;
        this.logger = context.fastify.log;
        this.fastifyInstance = context.fastify;
    }
    async generateFieldsFromSchema(schema) {
        if ("object" !== typeof schema) {
            this.logger.warn("Schema is not an object");
            return [];
        }
        const schemaObject = schema;
        const fields = this.convertSchemaToFormFields(schemaObject);
        return fields;
    }
    async buildApiSpec() {
        if (!this.fastifyInstance) {
            throw new Error("Fastify instance not available");
        }
        this.apiSpec = this.fastifyInstance.swagger();
        return this.apiSpec;
    }
    async getApiSpec() {
        if (!this.apiSpec) {
            await this.buildApiSpec();
        }
        return this.apiSpec;
    }
    async getAllRoutes() {
        const spec = await this.getApiSpec();
        return Object.entries(spec.paths || {}).flatMap(([path, methods]) => Object.entries(methods).map(([method, operation]) => ({
            path,
            method: method.toUpperCase(),
            ...operation
        })));
    }
    async getAllTypesFromRoute(routeName, method, schemaType) {
        const normalizedRoute = routeName.replace(/^\/+|\/+$/g, "").replace(/^\//, "").replace(/\/$/, "");
        const routes = metaRouteSchemaStorage.getAll();
        const routeFound = routes.find((route) => {
            const routePath = route.route.replace(/^\/+|\/+$/g, "").replace(/^\//, "").replace(/\/$/, "");
            return routePath.includes(normalizedRoute) && (route.method === method || !method);
        });
        if (!routeFound)
            return [];
        return routeFound.meta.filter(el => {
            if (schemaType) {
                return el.type === schemaType;
            }
            return el;
        }).map((meta) => {
            const schema = meta.schema;
            const fields = this.convertSchemaToFormFields(schema);
            return {
                type: meta.type,
                id: meta.id,
                statusCode: meta.statusCode ? meta.statusCode.toString() : undefined,
                schema: schema,
                fields: fields
            };
        });
    }
    async getRoute(route, method) {
        const spec = await this.getApiSpec();
        const normalizedRoute = route.replace(/^\/+|\/+$/g, "");
        const routeMap = new Map();
        Object.keys(spec.paths || {}).forEach(key => {
            const normalizedKey = key.replace(/^\/+|\/+$/g, "");
            routeMap.set(normalizedKey, key);
        });
        const matchedRoute = Array.from(routeMap.keys())
            .filter(key => key.includes(normalizedRoute))
            .sort((a, b) => b.length - a.length)[0];
        if (!matchedRoute)
            return null;
        const originalRoute = routeMap.get(matchedRoute);
        const routeMethods = spec.paths[originalRoute] || {};
        if (method) {
            const normalizedMethod = method.toLowerCase();
            const operation = routeMethods[normalizedMethod];
            return operation ? {
                path: originalRoute,
                method: method.toUpperCase(),
                ...operation
            } : null;
        }
        return Object.entries(routeMethods).map(([method, operation]) => ({
            path: matchedRoute,
            method: method.toUpperCase(),
            ...(operation || {})
        }));
    }
    getSchemaByName(name) {
        const result = getAllSchemas().find((schema) => {
            if (schema.id === name) {
                return schema.schema;
            }
        }) || null;
        return result;
    }
    getSchemaByType(type) {
        return JSON.parse(JSON.stringify(type));
    }
    listAvailableSchemas() {
        return getAllSchemas().filter((schema) => schema.id).map((schema) => schema.id);
    }
    getAllSchemas() {
        const schemas = getAllSchemas().filter((schema) => schema.id);
        return schemas.map((schema) => ({
            name: schema.id,
            schema: schema.schema
        }));
    }
    convertSchemaToFormFields(schema, fieldName = '', // имя поля (ключ свойства или 'items' для массива)
    isRequired = false) {
        if (!schema)
            return [];
        if (schema.type === 'array') {
            const arrayField = {
                name: fieldName || 'items',
                type: 'array',
                required: isRequired,
                children: [],
                title: schema.title,
                description: schema.description,
                format: schema.format,
                readOnly: schema.readOnly,
                writeOnly: schema.writeOnly,
                deprecated: schema.deprecated,
                maxLength: schema.maxLength,
                minLength: schema.minLength,
                maximum: schema.maximum,
                minimum: schema.minimum,
                pattern: schema.pattern,
                default: schema.default,
                enum: schema.enum
            };
            if (schema.items) {
                if (Array.isArray(schema.items) && schema.items.length > 0) {
                    arrayField.children = this.convertSchemaToFormFields(schema.items[0], '', false);
                }
                else {
                    arrayField.children = this.convertSchemaToFormFields(schema.items, '', false);
                }
            }
            return [arrayField];
        }
        if (schema.type === 'object' && schema.properties) {
            const requiredSet = new Set(schema.required || []);
            const fields = [];
            for (const [propName, propSchema] of Object.entries(schema.properties)) {
                const subRequired = requiredSet.has(propName);
                if ('$ref' in propSchema) {
                    const refName = propSchema.$ref.replace("#/components/schemas/", "");
                    const resolvedSchema = this.getSchemaByName(refName);
                    if (resolvedSchema) {
                        fields.push(...this.convertSchemaToFormFields(resolvedSchema, propName, subRequired));
                    }
                }
                else {
                    fields.push(...this.convertSchemaToFormFields(propSchema, propName, subRequired));
                }
            }
            return fields;
        }
        const isBinary = schema.format === 'binary';
        const { title, description, format, type, readOnly, writeOnly, deprecated, maxLength, minLength, maximum, minimum, pattern, default: defaultValue, enum: enumValues } = schema;
        const field = {
            name: fieldName,
            type: isBinary ? 'file' : (type ?? 'string'),
            required: isRequired,
            title,
            description,
            format,
            readOnly,
            writeOnly,
            deprecated,
            maxLength,
            minLength,
            maximum,
            minimum,
            pattern,
            default: defaultValue,
            enum: enumValues
        };
        if (schema.description?.includes('@reference')) {
            const match = schema.description.match(/@reference\s+(\w+)/);
            if (match) {
                field.referenceName = match[1];
            }
        }
        return [field];
    }
    getFormFields(name) {
        const schema = this.getSchemaByName(name);
        return schema ? this.convertSchemaToFormFields(schema) : [];
    }
    async getResponseRouterFields(route, method) {
        const routeMeta = await this.getRoute(route, method);
        if (!routeMeta)
            return { type: 'object', fields: [] };
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;
        const responses = _route.responses;
        if (!responses)
            return { type: 'object', fields: [] };
        const jsonResponse = responses["200"]?.content?.["application/json"];
        if (!jsonResponse?.schema)
            return { type: 'object', fields: [] };
        const results = this.convertSchemaToFormFields(jsonResponse.schema);
        return {
            type: jsonResponse.schema.type === 'object' ? 'object' : 'array',
            fields: results
        };
    }
    async getRequestRouterFields(route, method = 'POST') {
        const routeMeta = await this.getRoute(route, method);
        if (!routeMeta)
            return { type: 'object', fields: [] };
        const _route = Array.isArray(routeMeta) ? routeMeta[0] : routeMeta;
        const requestBody = _route.requestBody;
        if (!requestBody?.content)
            return { type: 'object', fields: [] };
        const content = requestBody.content["application/json"] ||
            requestBody.content["application/x-www-form-urlencoded"] ||
            requestBody.content["multipart/form-data"];
        if (!content?.schema)
            return { type: 'object', fields: [] };
        let schema;
        if ("$ref" in content.schema) {
            const refName = content.schema.$ref.replace("#/components/schemas/", "");
            schema = this.getSchemaByName(refName);
            if (!schema)
                return { type: 'object', fields: [] };
        }
        else {
            schema = content.schema;
        }
        const results = this.convertSchemaToFormFields(schema);
        return {
            type: schema.type === 'object' ? 'object' : 'array',
            fields: results
        };
    }
}
//# sourceMappingURL=provider.js.map