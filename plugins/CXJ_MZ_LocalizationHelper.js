
(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.LocalizationHelper = CXJ_MZ.LocalizationHelper || {};
  CXJ_MZ.LocalizationHelper.version = '1.0';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.TextHelper', '1.0')) {
    throw new Error('TextHelper has not been initialized, or the correct version hasn\'t been loaded.');
  }

  const {
    CoreEssentials,
    TextHelper,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_LocalizationHelper';
})();
