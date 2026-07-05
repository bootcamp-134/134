import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { AppModule } from "./app.module";

const requireFromCurrentFile = createRequire(__filename);

const swaggerAssetRoutes = [
  {
    contentType: "text/css",
    filePath: requireFromCurrentFile.resolve("swagger-ui-dist/swagger-ui.css"),
    route: "/api/docs/swagger-ui.css",
  },
  {
    contentType: "application/javascript",
    filePath: requireFromCurrentFile.resolve(
      "swagger-ui-dist/swagger-ui-bundle.js",
    ),
    route: "/api/docs/swagger-ui-bundle.js",
  },
  {
    contentType: "application/javascript",
    filePath: requireFromCurrentFile.resolve(
      "swagger-ui-dist/swagger-ui-standalone-preset.js",
    ),
    route: "/api/docs/swagger-ui-standalone-preset.js",
  },
  {
    contentType: "image/png",
    filePath: requireFromCurrentFile.resolve(
      "swagger-ui-dist/favicon-16x16.png",
    ),
    route: "/api/docs/favicon-16x16.png",
  },
  {
    contentType: "image/png",
    filePath: requireFromCurrentFile.resolve(
      "swagger-ui-dist/favicon-32x32.png",
    ),
    route: "/api/docs/favicon-32x32.png",
  },
] as const;

type StaticAssetResponse = {
  type: (contentType: string) => StaticAssetResponse;
  send: (body: Buffer) => unknown;
};

function getCorsOrigin() {
  const corsOrigin = process.env.CORS_ORIGIN;

  if (!corsOrigin) {
    return true;
  }

  return corsOrigin.split(",").map((origin) => origin.trim());
}

function registerSwaggerAssetRoutes(app: INestApplication) {
  const httpAdapter = app.getHttpAdapter();

  for (const asset of swaggerAssetRoutes) {
    httpAdapter.get(
      asset.route,
      (_request: unknown, response: StaticAssetResponse) => {
        response.type(asset.contentType);
        return response.send(readFileSync(asset.filePath));
      },
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: getCorsOrigin(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (process.env.SWAGGER_ENABLED !== "false") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Bereket AI Backend API")
      .setDescription(
        "Mobile onboarding, recipe recommendation, recipe chat, feed, and achievements API.",
      )
      .setVersion("0.1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    registerSwaggerAssetRoutes(app);
    SwaggerModule.setup("api/docs", app, document);
  }

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
