import { ItemSchemaDTO, ControllersDTO, FormFieldDTO, FormFieldsDTO, getMetaProvider, MetaProvider, RouteMetadataDTO, RouterTypeReferenceDTO, SchemaDTO } from "@tsdiapi/meta";

import {
    Get,
    JsonController,
    Param,
    QueryParams
} from "routing-controllers";
import { Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { SuccessResponse, Summary } from '@tsdiapi/server';
import { IsObject, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class ListStringsDTO {
    @IsString({ each: true })
    list: string[];
}
export class SourceObjectDTO {
    @IsObject()
    @Expose()
    source: Record<string, any>;
}
export class RouteRequestParamsDTO {
    @IsString()
    @Expose()
    route: string;

    @IsOptional()
    @IsString()
    @Expose()
    method?: string;
}

@Service()
@OpenAPI({
    tags: ["{{kebabcase}}"],
})
@JsonController("{{kebabcase}}")
export class MetaController {
    meta: MetaProvider;
    constructor() {
        this.meta = getMetaProvider();
    }

    @Summary("Get API spec")
    @Get("/api-spec")
    @SuccessResponse(SourceObjectDTO)
    async getApiSpec() {
        const data = this.meta.getApiSpec();
        return {
            source: data,
        }
    }

    @Summary("Get API source spec")
    @Get("/api-source-spec")
    @SuccessResponse(SourceObjectDTO)
    async getApiSourceSpec() {
        return {
            source: this.meta.getApiSourceSpec()
        }
    }

    @Summary("Get all types from route")
    @Get("/route-types")
    @SuccessResponse(RouterTypeReferenceDTO, { isArray: true })
    async getAllTypesFromRoute(
        @QueryParams() data: RouteRequestParamsDTO
    ) {
        return this.meta.getAllTypesFromRoute(data.route, data.method);
    }

    @Summary("Get input types from route")
    @Get("/route-types/input")
    @SuccessResponse(RouterTypeReferenceDTO)
    async getInputTypesFromRoute(
        @QueryParams() data: RouteRequestParamsDTO
    ) {
        const types = this.meta.getAllTypesFromRoute(data.route, data.method, 'input');
        if (types?.length) {
            return types[0];
        } else {
            return {};
        }
    }

    @Summary("Get output types from route")
    @Get("/route-types/output")
    @SuccessResponse(RouterTypeReferenceDTO, { isArray: true })
    async getOutputTypesFromRoute(
        @QueryParams() data: RouteRequestParamsDTO
    ) {
        return this.meta.getAllTypesFromRoute(data.route, data.method, 'output');
    }

    @Summary("Get all available routes")
    @Get("/routes")
    @SuccessResponse(RouteMetadataDTO, { isArray: true })
    async getAllRoutes() {
        return this.meta.getAllRoutes();
    }

    @Summary("Get all controllers")
    @Get("/controllers")
    @SuccessResponse(ControllersDTO, { isArray: true })
    async getControllers() {
        return this.meta.getControllers();
    }

    @Summary("Get route metadata")
    @Get("/route")
    @SuccessResponse(RouteMetadataDTO)
    async getRoute(@QueryParams() data: RouteRequestParamsDTO) {
        return this.meta.getRoute(data.route, data.method);
    }

    @Summary("Get route metadata")
    @Get("/route-source")
    @SuccessResponse(SchemaDTO)
    async getRouteSource(@QueryParams() data: RouteRequestParamsDTO) {
        return this.meta.getSourceRoute(data.route, data.method);
    }

    @Summary("Get schema by name")
    @Get("/schema/:name")
    @SuccessResponse(SchemaDTO)
    async getSchemaByName(@Param('name') name: string) {
        return this.meta.getSchemaByName(name);
    }

    @Summary("List available DTOs")
    @Get("/dtos")
    @SuccessResponse(ListStringsDTO)
    async listAvailableDTOs() {
        const result = this.meta.listAvailableDTOs();
        return { list: result || [] };
    }

    @Summary("Get all schemas")
    @Get("/schemas")
    @SuccessResponse(ItemSchemaDTO, { isArray: true })
    async getAllSchemas() {
        return this.meta.getAllSchemas();
    }

    @Summary("Get source schema")
    @Get("/source-schema")
    @SuccessResponse(SourceObjectDTO)
    async getSourceSchema() {
        return {
            source: this.meta.getSourceSchema()
        }
    }

    @Summary("Get form fields by schema name")
    @Get("/fields/:name")
    @SuccessResponse(FormFieldDTO, { isArray: true })
    async getFormFields(@Param('name') name: string) {
        return this.meta.getFormFields(name);
    }

    @Summary("Get response fields for a route")
    @Get("/response-fields")
    @SuccessResponse(FormFieldsDTO)
    async getResponseRouterFields(@QueryParams() data: RouteRequestParamsDTO) {
        return this.meta.getResponseRouterFields(data.route, data.method);
    }

    @Summary("Get request fields for a route")
    @Get("/request-fields")
    @SuccessResponse(FormFieldsDTO)
    async getRequestRouterFields(@QueryParams() data: RouteRequestParamsDTO) {
        return this.meta.getRequestRouterFields(data.route, data.method);
    }
}
