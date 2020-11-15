/******************************************************************************
 * CXJ_MZ_CategorizeOptions.js                                                *
 ******************************************************************************
 * By G.A.M. Kertopermono, a.k.a. GaryCXJk                                    *
 ******************************************************************************
 * License: MIT                                                               *
 ******************************************************************************
 * Copyright (c) 2020, G.A.M. Kertopermono                                    *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING    *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER        *
 * DEALINGS IN THE SOFTWARE.                                                  *
 ******************************************************************************/

/*:
 * @target MZ
 * @plugindesc Categorizes the option menu.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * The options menu is pretty barebones, which isn't a bad thing, but it could
 * be a lot better, especially if you plan on adding a lot more extra
 * configuration options.
 *
 * This plugin actually makes the first step, by categorizing the options menu
 * and add some new features to this menu.
 *
 * ============================================================================
 * = Requirements                                                             =
 * ============================================================================
 *
 * This plugin requires the following plugins to work:
 *
 * * CXJ_MZ.CoreEssentials: ^1.3
 *
 * ============================================================================
 * = Placement                                                                =
 * ============================================================================
 *
 * Make sure to place this plugin below the plugins that this plugin requires,
 * but above plugins that rely on this plugin.
 *
 * ============================================================================
 * = Usage                                                                    =
 * ============================================================================
 *
 * This plugin is a complete overhaul of the Window_Options screen, and might
 * not be compatible with other plugins that alter this object. Nevertheless
 * attempts are made to keep compatibility as much as possible, which is why
 * the original Window_Options object is kept.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.0 (2020-11-01)
 * ----------------
 *
 * * Initial release
 *
 * ============================================================================
 * = Compatibility                                                            =
 * ============================================================================
 *
 * This plugin overwrites default functionality. Make sure you check whether or
 * not the plugin is compatible with other plugins by checking which functions
 * they overwrite. Below is the list of methods it overwrites:
 *
 * * Game_Interpreter.prototype.updateWaitMode
 * * Window_Base.prototype.convertEscapeCharacters
 * * Window_Base.prototype.processEscapeCharacter
 * * Window_Message.prototype.processEscapeCharacter
 *
 * ============================================================================
 * = License                                                                  =
 * ============================================================================
 *
 * Copyright (c) 2020, G.A.M. Kertopermono
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * ============================================================================
 *
 * @param volumeDisplay
 * @text Volume display
 * @desc How the volume options should be displayed.
 * @type select
 * @default numeric
 * @option Numeric
 * @value numeric
 * @option Slider
 * @value slider
 *
 */

(() => {

  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.CategorizeOptions = CXJ_MZ.CategorizeOptions || {};
  CXJ_MZ.CategorizeOptions.version = '1.0';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.CoreEssentials', '1.3')) {
    throw new Error('The correct version of CoreEssentials has not been loaded (required version: 1.3).');
  }

  const {
    CoreEssentials,
    CategorizeOptions,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_CategorizeOptions';

  /* ------------------------------------------------------------------------
   * - Private variables                                                    -
   * ------------------------------------------------------------------------
   */

  const categoryOptions = {};

  /* --------------------------------------------------------------------------
   * - Private functions                                                      -
   * -                                                                        -
   * - These are helper functions that aren't meant to be used outside the    -
   * - plugin.                                                                -
   * --------------------------------------------------------------------------
   */

  fromTextManager = (symbol) => TextManager[symbol];

  /* --------------------------------------------------------------------------
   * - Plugin methods                                                         -
   * --------------------------------------------------------------------------
   */

  CategorizeOptions.addOption = (name, symbol, options = {}) => {
    const {
      enabled = true,
      type = '',
      category = ''
    } = options;

    const data = {
      name,
      symbol,
      enabled,
      type,
    };

    categoryOptions[category] = categoryOptions[category] || [];
    categoryOptions[category].push(data);
  };

  const {
    addOption,
  } = CategorizeOptions;

  addOption('Gameplay', 'gameplay', { type: 'category' });
  addOption('Audio',    'audio',    { type: 'category' });

  addOption(fromTextManager, 'alwaysDash',      { type: 'boolean', category: 'gameplay' });
  addOption(fromTextManager, 'commandRemember', { type: 'boolean', category: 'gameplay' });
  addOption(fromTextManager, 'touchUI',         { type: 'boolean', category: 'gameplay' });

  addOption(fromTextManager, 'bgmVolume', { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'bgsVolume', { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'meVolume',  { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'seVolume',  { type: 'volume', category: 'audio' });

  (() => {
    const Window_OptionsOriginal = Window_Options;

    //-----------------------------------------------------------------------------
    // Window_OptionsExt
    //
    // The window for changing various settings on the options screen.

    class Window_OptionsExt extends Window_OptionsOriginal {
      initialize(rect) {
        this._commandType = {};
        this._category = '';
        super.initialize(rect);
      }

      addCategory(category = null) {
        const currentCategory = category !== null ? category : this._category;

        const categoryData = categoryOptions[currentCategory];

        categoryData.forEach((data) => {
          const {
            name,
            symbol,
            enabled,
            type,
          } = data;

          const label = typeof name === 'function' ? name(symbol) : name;

          this.addCommand(label, symbol, enabled, null, null, type);
        });
      }

      addCommand(name, symbol, enabled = true, ext = null, index = null, type = 'option') {
        super.addCommand(name, symbol, enabled, ext, index);
        this._commandType[symbol] = type;
      }

      addGeneralOptions() {
        this.addCategory('gameplay');
      }

      addVolumeOptions() {
        this.addCategory('audio');
      };

      isVolumeSymbol(symbol) {
        return this._commandType[symbol] === 'volume';
      }

      getConfigValue(symbol) {
        return CoreEssentials.findObject(symbol, ConfigManager);
      }

      setConfigValue(symbol, volume) {
        let rootObject = ConfigManager;
        let prop = symbol;
        if (symbol.includes('.')) {
          const symbolSegs = symbol.split('.');
          prop = symbolSegs.pop();
          rootObject = CoreEssentials.findObject(symbolSegs.join('.'), ConfigManager);
        }
        rootObject[prop] = volume;
      };
    }

    Window_OptionsExt.Original = Window_OptionsOriginal;

    Window_Options = Window_OptionsExt;
  })();
})();
