import { Tree, formatFiles, installPackagesTask, updateJson } from '@nrwl/devkit';

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

  await formatFiles(host);

}
