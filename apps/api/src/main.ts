import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Turniket Backend API')
        .setDescription('The Turniket Backend API description')
        .setVersion('1.0')
        .addTag('turniket')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    await app.listen(8090);
}
bootstrap();
