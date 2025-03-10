var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ItemSchemaDTO, ControllersDTO, FormFieldDTO, FormFieldsDTO, getMetaProvider, RouteMetadataDTO, RouterTypeReferenceDTO, SchemaDTO } from "../index.js";
import { Get, JsonController, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { SuccessResponse, Summary } from '@tsdiapi/server';
import { IsObject, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
export class ListStringsDTO {
    list;
}
__decorate([
    IsString({ each: true }),
    __metadata("design:type", Array)
], ListStringsDTO.prototype, "list", void 0);
export class SourceObjectDTO {
    source;
}
__decorate([
    IsObject(),
    Expose(),
    __metadata("design:type", Object)
], SourceObjectDTO.prototype, "source", void 0);
export class RouteRequestParamsDTO {
    route;
    method;
}
__decorate([
    IsString(),
    Expose(),
    __metadata("design:type", String)
], RouteRequestParamsDTO.prototype, "route", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Expose(),
    __metadata("design:type", String)
], RouteRequestParamsDTO.prototype, "method", void 0);
let MetaController = class MetaController {
    meta;
    constructor() {
        this.meta = getMetaProvider();
    }
    async getApiSpec() {
        const data = this.meta.getApiSpec();
        return {
            source: data,
        };
    }
    async getApiSourceSpec() {
        return {
            source: this.meta.getApiSourceSpec()
        };
    }
    async getAllTypesFromRoute(data) {
        return this.meta.getAllTypesFromRoute(data.route, data.method);
    }
    async getInputTypesFromRoute(data) {
        const types = this.meta.getAllTypesFromRoute(data.route, data.method, 'input');
        if (types?.length) {
            return types[0];
        }
        else {
            return {};
        }
    }
    async getOutputTypesFromRoute(data) {
        return this.meta.getAllTypesFromRoute(data.route, data.method, 'output');
    }
    async getAllRoutes() {
        return this.meta.getAllRoutes();
    }
    async getControllers() {
        return this.meta.getControllers();
    }
    async getRoute(data) {
        return this.meta.getRoute(data.route, data.method);
    }
    async getRouteSource(data) {
        return this.meta.getSourceRoute(data.route, data.method);
    }
    async getSchemaByName(name) {
        return this.meta.getSchemaByName(name);
    }
    async listAvailableDTOs() {
        const result = this.meta.listAvailableDTOs();
        return { list: result || [] };
    }
    async getAllSchemas() {
        return this.meta.getAllSchemas();
    }
    async getSourceSchema() {
        return {
            source: this.meta.getSourceSchema()
        };
    }
    async getFormFields(name) {
        return this.meta.getFormFields(name);
    }
    async getResponseRouterFields(data) {
        return this.meta.getResponseRouterFields(data.route, data.method);
    }
    async getRequestRouterFields(data) {
        return this.meta.getRequestRouterFields(data.route, data.method);
    }
};
__decorate([
    Summary("Get API spec"),
    Get("/api-spec"),
    SuccessResponse(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getApiSpec", null);
__decorate([
    Summary("Get API source spec"),
    Get("/api-source-spec"),
    SuccessResponse(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getApiSourceSpec", null);
__decorate([
    Summary("Get all types from route"),
    Get("/route-types"),
    SuccessResponse(RouterTypeReferenceDTO, { isArray: true }),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllTypesFromRoute", null);
__decorate([
    Summary("Get input types from route"),
    Get("/route-types/input"),
    SuccessResponse(RouterTypeReferenceDTO),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getInputTypesFromRoute", null);
__decorate([
    Summary("Get output types from route"),
    Get("/route-types/output"),
    SuccessResponse(RouterTypeReferenceDTO, { isArray: true }),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getOutputTypesFromRoute", null);
__decorate([
    Summary("Get all available routes"),
    Get("/routes"),
    SuccessResponse(RouteMetadataDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllRoutes", null);
__decorate([
    Summary("Get all controllers"),
    Get("/controllers"),
    SuccessResponse(ControllersDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getControllers", null);
__decorate([
    Summary("Get route metadata"),
    Get("/route"),
    SuccessResponse(RouteMetadataDTO),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRoute", null);
__decorate([
    Summary("Get route metadata"),
    Get("/route-source"),
    SuccessResponse(SchemaDTO),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRouteSource", null);
__decorate([
    Summary("Get schema by name"),
    Get("/schema/:name"),
    SuccessResponse(SchemaDTO),
    __param(0, Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getSchemaByName", null);
__decorate([
    Summary("List available DTOs"),
    Get("/dtos"),
    SuccessResponse(ListStringsDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "listAvailableDTOs", null);
__decorate([
    Summary("Get all schemas"),
    Get("/schemas"),
    SuccessResponse(ItemSchemaDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllSchemas", null);
__decorate([
    Summary("Get source schema"),
    Get("/source-schema"),
    SuccessResponse(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getSourceSchema", null);
__decorate([
    Summary("Get form fields by schema name"),
    Get("/fields/:name"),
    SuccessResponse(FormFieldDTO, { isArray: true }),
    __param(0, Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getFormFields", null);
__decorate([
    Summary("Get response fields for a route"),
    Get("/response-fields"),
    SuccessResponse(FormFieldsDTO),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getResponseRouterFields", null);
__decorate([
    Summary("Get request fields for a route"),
    Get("/request-fields"),
    SuccessResponse(FormFieldsDTO),
    __param(0, QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRequestRouterFields", null);
MetaController = __decorate([
    Service(),
    OpenAPI({
        tags: ["meta"],
    }),
    JsonController("meta"),
    __metadata("design:paramtypes", [])
], MetaController);
export { MetaController };
//# sourceMappingURL=meta.controller.js.map