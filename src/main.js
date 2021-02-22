import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.setViewEngine({
    engine: {
      marko: require('marko'),
    },
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
