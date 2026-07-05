import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const swaggerUiVersion = "5.32.8";

type HtmlResponse = {
  type: (contentType: string) => StaticAssetResponse;
  send: (body: string) => unknown;
};

type StaticAssetResponse = {
  send: (body: string) => unknown;
};

function getCorsOrigin() {
  const corsOrigin = process.env.CORS_ORIGIN;

  if (!corsOrigin) {
    return true;
  }

  return corsOrigin.split(",").map((origin) => origin.trim());
}

function createSwaggerHtml() {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bereket AI Backend API</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@${swaggerUiVersion}/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${swaggerUiVersion}/swagger-ui-bundle.js" crossorigin></script>
    <script src="https://unpkg.com/swagger-ui-dist@${swaggerUiVersion}/swagger-ui-standalone-preset.js" crossorigin></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "/api/docs-json",
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "StandaloneLayout"
        });
      };
    </script>
  </body>
</html>`;
}

function registerSwaggerPage(app: INestApplication) {
  const httpAdapter = app.getHttpAdapter();

  httpAdapter.get("/api/docs", (_request: unknown, response: HtmlResponse) => {
    response.type("text/html");
    return response.send(createSwaggerHtml());
  });
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
    SwaggerModule.setup("api/docs", app, document, {
      raw: ["json"],
      ui: false,
    });
    registerSwaggerPage(app);
  }

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
