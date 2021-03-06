import pluginInit from './plugin_init';

export default async function (kbnServer, server, config) {

  if (!config.get('plugins.initialize')) {
    server.log(['info'], 'Plugin initialization disabled.');
    return [];
  }

  const { plugins } = kbnServer;

  // extend plugin apis with additional context
  plugins.getPluginApis().forEach(api => {

    Object.defineProperty(api, 'uiExports', {
      value: kbnServer.uiExports
    });

  });

  await pluginInit(plugins);
}
