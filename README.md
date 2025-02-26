# **TSDIAPI Meta Plugin**

A **TSDIAPI** plugin for **automatic OpenAPI metadata generation**, **schema validation**, and **extended route information extraction**.

---

## 📌 About

The **TSDIAPI Meta Plugin** extends the **TSDIAPI framework** by providing powerful tools to dynamically generate OpenAPI metadata, validate schemas, and extract route information. This plugin is designed for developers who need structured API metadata, automated validation, and enhanced introspection of API routes.

🔗 **TSDIAPI CLI:** [@tsdiapi/cli](https://www.npmjs.com/package/@tsdiapi/cli)

---

## 📦 Installation

Install the plugin using the **TSDIAPI CLI**:

```bash
tsdiapi plugins add meta
```

Then, register the plugin in your **TSDIAPI** project:

```typescript
import { createApp } from "@tsdiapi/server";
import createPlugin from "@tsdiapi/meta";

createApp({
  plugins: [createPlugin()],
});
```

---

## 🚀 Features

- 📄 **Automatic OpenAPI Spec Generation** – Generates OpenAPI documentation based on your defined routes and controllers.
- ✅ **Schema Validation** – Provides runtime validation of request/response data based on class-validator decorators.
- 🔍 **Route Metadata Extraction** – Fetch details about available routes, input/output schemas, and API controllers.
- 📋 **Form Field Processing** – Converts JSON Schema into structured form field representations.
- 🏗 **Seamless Integration** – Works with existing **TSDIAPI** projects without additional configuration.

---

## 🔧 Configuration

The plugin does not require additional configuration. Simply install and use it!

```typescript
createPlugin();
```

## 📌 How to Use

Once installed, the plugin automatically provides API metadata functionality. The main entry points are the **MetaProvider** and the **MetaController**, which expose useful methods.

### **Using the MetaProvider**

```typescript
import { getMetaProvider } from "@tsdiapi/meta";

const meta = getMetaProvider();

// Retrieve OpenAPI specification
const apiSpec = meta.getApiSpec();

// Get all available routes
const routes = meta.getAllRoutes();
```

### **MetaController (Automatic API Endpoints)**

The plugin also provides a built-in **MetaController** that exposes various endpoints for retrieving metadata:

Here is the table in Markdown format:

# API Endpoints for MetaController

| HTTP Method | Endpoint              | Description                                                 |
| ----------- | --------------------- | ----------------------------------------------------------- |
| GET         | `/api-spec`           | Retrieves the full OpenAPI specification of the API.        |
| GET         | `/api-source-spec`    | Retrieves the raw OpenAPI specification before processing.  |
| GET         | `/route-types`        | Gets all input and output types for a specified route.      |
| GET         | `/route-types/input`  | Gets the input type schema for a specified route.           |
| GET         | `/route-types/output` | Gets the output type schema for a specified route.          |
| GET         | `/routes`             | Retrieves all registered API routes.                        |
| GET         | `/controllers`        | Retrieves all registered controllers and their routes.      |
| GET         | `/route`              | Retrieves metadata for a specified route.                   |
| GET         | `/route-source`       | Retrieves raw metadata for a specified route.               |
| GET         | `/schema/:name`       | Retrieves the schema definition for a specified DTO.        |
| GET         | `/dtos`               | Lists all available DTOs.                                   |
| GET         | `/schemas`            | Retrieves all registered schemas.                           |
| GET         | `/source-schema`      | Retrieves the raw JSON schema definitions.                  |
| GET         | `/fields/:name`       | Retrieves form fields extracted from a specified schema.    |
| GET         | `/response-fields`    | Retrieves response field definitions for a specified route. |
| GET         | `/request-fields`     | Retrieves request field definitions for a specified route.  |

---

## 📑 Example: Generate a Controller

This plugin provides a **generator** to create a new controller in your API. To generate a controller:

```bash
tsdiapi generate meta
```

This command will create a new controller in your project.

✅ **After generating the controller, you can immediately use it in your API!**

---

## 👨‍💻 Contributing

Contributions are welcome! If you have ideas for improvements, feel free to open a pull request.

**Author:** unbywyd  
📧 **Contact:** unbywyd@gmail.com

🚀 Happy coding with **TSDIAPI**! 🎉
