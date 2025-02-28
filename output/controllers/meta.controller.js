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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaController = exports.RouteRequestParamsDTO = exports.SourceObjectDTO = exports.ListStringsDTO = void 0;
const index_1 = require("../index");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const routing_controllers_openapi_extra_1 = require("routing-controllers-openapi-extra");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ListStringsDTO {
    list;
}
exports.ListStringsDTO = ListStringsDTO;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ListStringsDTO.prototype, "list", void 0);
class SourceObjectDTO {
    source;
}
exports.SourceObjectDTO = SourceObjectDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SourceObjectDTO.prototype, "source", void 0);
class RouteRequestParamsDTO {
    route;
    method;
}
exports.RouteRequestParamsDTO = RouteRequestParamsDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RouteRequestParamsDTO.prototype, "route", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RouteRequestParamsDTO.prototype, "method", void 0);
let MetaController = class MetaController {
    meta;
    constructor() {
        this.meta = (0, index_1.getMetaProvider)();
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
exports.MetaController = MetaController;
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get API spec"),
    (0, routing_controllers_1.Get)("/api-spec"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getApiSpec", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get API source spec"),
    (0, routing_controllers_1.Get)("/api-source-spec"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getApiSourceSpec", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get all types from route"),
    (0, routing_controllers_1.Get)("/route-types"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.RouterTypeReferenceDTO, { isArray: true }),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllTypesFromRoute", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get input types from route"),
    (0, routing_controllers_1.Get)("/route-types/input"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.RouterTypeReferenceDTO),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getInputTypesFromRoute", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get output types from route"),
    (0, routing_controllers_1.Get)("/route-types/output"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.RouterTypeReferenceDTO, { isArray: true }),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getOutputTypesFromRoute", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get all available routes"),
    (0, routing_controllers_1.Get)("/routes"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.RouteMetadataDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllRoutes", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get all controllers"),
    (0, routing_controllers_1.Get)("/controllers"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.ControllersDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getControllers", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get route metadata"),
    (0, routing_controllers_1.Get)("/route"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.RouteMetadataDTO),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRoute", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get route metadata"),
    (0, routing_controllers_1.Get)("/route-source"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.SchemaDTO),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRouteSource", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get schema by name"),
    (0, routing_controllers_1.Get)("/schema/:name"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.SchemaDTO),
    __param(0, (0, routing_controllers_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getSchemaByName", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("List available DTOs"),
    (0, routing_controllers_1.Get)("/dtos"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(ListStringsDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "listAvailableDTOs", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get all schemas"),
    (0, routing_controllers_1.Get)("/schemas"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.ItemSchemaDTO, { isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getAllSchemas", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get source schema"),
    (0, routing_controllers_1.Get)("/source-schema"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(SourceObjectDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getSourceSchema", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get form fields by schema name"),
    (0, routing_controllers_1.Get)("/fields/:name"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.FormFieldDTO, { isArray: true }),
    __param(0, (0, routing_controllers_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getFormFields", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get response fields for a route"),
    (0, routing_controllers_1.Get)("/response-fields"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.FormFieldsDTO),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getResponseRouterFields", null);
__decorate([
    (0, routing_controllers_openapi_extra_1.Summary)("Get request fields for a route"),
    (0, routing_controllers_1.Get)("/request-fields"),
    (0, routing_controllers_openapi_extra_1.SuccessResponse)(index_1.FormFieldsDTO),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteRequestParamsDTO]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "getRequestRouterFields", null);
exports.MetaController = MetaController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["meta"],
    }),
    (0, routing_controllers_1.JsonController)("meta"),
    __metadata("design:paramtypes", [])
], MetaController);
//# sourceMappingURL=meta.controller.js.map