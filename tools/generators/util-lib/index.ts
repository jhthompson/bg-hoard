import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { SchematicOptions } from './schema';

export default async function (host: Tree, schema: SchematicOptions) {
  await libraryGenerator(host, {
    name: `util-${schema.name}`,
    directory: schema.directory,
    linter: 'tslint',
    tags: `type:util, scope:${schema.directory}`,
  });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
