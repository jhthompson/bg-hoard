import { Tree, formatFiles, installPackagesTask, updateJson } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

function sortObjectKeys(obj: any) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}

export default async function (host: Tree, schema: any) {
  updateJson(host, 'workspace.json', (json) => {
    json.version++;
    json.projects = sortObjectKeys(json.projects);

    return json;
  });

  updateJson(host, 'nx.json', (json) => {
    json.projects = sortObjectKeys(json.projects);

    return json;
  });

  await libraryGenerator(host, { name: schema.name });
  
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
