import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

function parseCorsOrigins(raw?: string): string | string[] {
    const value = (raw || "http://localhost:3000").trim();
    if (value.includes(",")) {
        return value
            .split(",")
            .map((origin) => origin.trim())
            .filter(Boolean);
    }
    return value;
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Turniket Backend API")
        .setDescription("The Turniket Backend API description")
        .setVersion("1.0")
        .addTag("turniket")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const corsOrigin = parseCorsOrigins(
        process.env.CORS_ORIGIN || process.env.FRONTEND_URL
    );

    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });

    const port = Number(process.env.PORT || 8090);
    await app.listen(port, "0.0.0.0");
}
bootstrap();
