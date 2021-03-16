import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { SchematicOptions } from './schema';

export default async function (host: Tree, schema: SchematicOptions) {
  await libraryGenerator(host, {
    name: `feature-${schema.name}`,
    directory: schema.directory,
    linter: 'tslint',
    tags: `type:feature, scope:${schema.directory}`,
  });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
