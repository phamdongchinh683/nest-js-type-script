import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
 imports: [
  GraphQLModule.forRoot<ApolloDriverConfig>({
   driver: ApolloDriver,
   playground: true,
   autoSchemaFile: true,
   typePaths: ['./**/*.graphql'],
   definitions: {
    path: join(process.cwd(), 'src/graphql/generated/graphql.ts'),
    outputAs: 'class',
   },
  }),
 ],
 exports: [GraphQLModule],
})
export class GraphQLConfigModule { }
