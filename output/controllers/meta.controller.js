import { Type } from "@sinclair/typebox";
import { ApiSchemaSourceDTO, FormFieldDTO, getMetaProvider, RoutesMetadataDTO, ItemSchemaDTO, RouteMetadataDTO, SchemaTypeDTO, SchemaDTO, } from "../index.js";
const RouteRequestParamsSchema = Type.Object({
    route: Type.String(),
    method: Type.Optional(Type.String()),
});
export default async function registerMetaRoutes({ useRoute, fastify }) {
    let schemas = null;
    const getSchemas = () => {
        if (!schemas) {
            schemas = fastify.getSchemas();
        }
        return schemas;
    };
    const meta = getMetaProvider();
    useRoute("meta")
        .get("/swagger/schemas-list")
        .summary("List available schemas for swagger")
        .code(200, Type.Array(Type.String()))
        .handler(() => {
        const list = Object.keys(getSchemas());
        return { status: 200, data: list };
    })
        .build();
    useRoute("meta")
        .get("/swagger/schemas/:name")
        .summary("Get schema by name for swagger")
        .params(Type.Object({ name: Type.String() }))
        .code(200, Type.Any())
        .handler(async (req) => {
        const schema = getSchemas()[req.params.name];
        return { status: 200, data: schema };
    })
        .build();
    useRoute("meta")
        .get("/swagger/schemas/:name/fields")
        .summary('Get fields by schemas')
        .params(Type.Object({ name: Type.String() }))
        .code(200, Type.Array(FormFieldDTO))
        .code(400, Type.Object({
        message: Type.String()
    }))
        .handler(async (req) => {
        const schema = getSchemas()[req.params.name];
        if (!schema) {
            return { status: 400, data: { message: 'Schema not found' } };
        }
        const data = await meta.generateFieldsFromSchema(schema);
        return { status: 200, data: data };
    })
        .build();
    useRoute("meta")
        .get("/api-spec")
        .summary("Get API spec")
        .code(200, ApiSchemaSourceDTO)
        .handler(async () => {
        const data = await meta.getApiSpec();
        return { status: 200, data: { source: data } };
    })
        .build();
    useRoute("meta")
        .get("/routes")
        .summary("Get all available routes")
        .code(200, RoutesMetadataDTO)
        .handler(async () => {
        const data = await meta.getAllRoutes();
        return {
            status: 200,
            data: {
                routes: data
            }
        };
    })
        .build();
    useRoute("meta")
        .get("/routes-list")
        .summary("Get all available routes")
        .code(200, Type.Array(Type.Object({
        path: Type.String(),
        method: Type.String(),
    })))
        .handler(async () => {
        const data = await meta.getAllRoutes();
        return {
            status: 200,
            data
        };
    })
        .build();
    useRoute("meta")
        .get("/route-types")
        .summary("Get all types from route")
        .query(RouteRequestParamsSchema)
        .code(200, Type.Array(SchemaTypeDTO))
        .handler(async (req) => {
        const data = await meta.getAllTypesFromRoute(req.query.route, req.query.method);
        return {
            status: 200,
            data: data
        };
    })
        .build();
    useRoute("meta")
        .get("/route-types/:type")
        .summary("Get input types from route")
        .query(RouteRequestParamsSchema)
        .params(Type.Object({ type: Type.String() }))
        .code(200, Type.Array(SchemaTypeDTO))
        .handler(async (req) => {
        const data = await meta.getAllTypesFromRoute(req.query.route, req.query.method, req.params.type);
        return { status: 200, data };
    })
        .build();
    useRoute("meta")
        .get("/route")
        .summary("Get route metadata")
        .query(RouteRequestParamsSchema)
        .code(200, RouteMetadataDTO)
        .handler(async (req) => {
        const data = await meta.getRoute(req.query.route, req.query.method);
        return { status: 200, data: Array.isArray(data) ? data[0] : data };
    })
        .build();
    useRoute("meta")
        .get("/schema/:name")
        .summary("Get schema by name")
        .params(Type.Object({ name: Type.String() }))
        .code(200, SchemaDTO)
        .handler(async (req) => {
        const data = await meta.getSchemaByName(req.params.name);
        return { status: 200, data };
    })
        .build();
    useRoute("meta")
        .get("/schemas-list")
        .summary("List available DTOs")
        .code(200, Type.Array(Type.String()))
        .handler(() => {
        const list = meta.listAvailableSchemas();
        return { status: 200, data: list };
    })
        .build();
    useRoute("meta")
        .get("/schemas")
        .summary("Get all schemas")
        .code(200, Type.Array(ItemSchemaDTO))
        .handler(async () => {
        const data = await meta.getAllSchemas();
        return { status: 200, data: data };
    })
        .build();
    useRoute("meta")
        .post("/fields")
        .summary("Generate Fields from schema")
        .body(Type.Object({
        schema: Type.Any({
            default: {}
        }),
    }))
        .code(200, Type.Array(FormFieldDTO))
        .handler(async (req) => {
        const data = await meta.generateFieldsFromSchema(req.body.schema);
        return { status: 200, data };
    })
        .build();
}
//# sourceMappingURL=meta.controller.js.map