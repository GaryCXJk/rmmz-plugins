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
 * the original Window_Options object is kept. The same goes for Scene_Options.
 * Instead, two new classes have been created, Window_OptionsExt and
 * Scene_OptionsExt, which are both accessible from CXJ_MZ.CategorizeOptions.
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
 * * Window_Options (full replacement)
 * * Scene_Options (full replacement)
 * * Scene_Title.prototype.commandOptions
 * * Scene_Menu.prototype.commandOptions
 * * AudioManager.updateBufferParameters
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
 * @param booleanWrap
 * @text Wrap boolean options
 * @desc Boolean options always switch regardless of the direction pressed.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param booleanDisplay
 * @text Boolean display
 * @desc How the boolean options should be displayed.
 * @type select
 * @default toggle
 * @option Toggle
 * @value toggle
 * @option Side-by-side
 * @value sbs
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
 * @param volumeStepSize
 * @text Volume step size
 * @type select
 * @default 20
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 10
 * @value 10
 * @option 20
 * @value 20
 * @option 25
 * @value 25
 *
 * @param volumeSlider
 * @text Volume slider
 *
 * @param volumeSlider.width
 * @text Slider width
 * @type number
 * @default 120
 *
 * @param volumeSlider.height
 * @text Slider height
 * @type number
 * @default 24
 *
 * @param volumeSlider.outlineColor
 * @text Outline color
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"0.6","systemColor":"-1"}
 *
 * @param volumeSlider.backgroundColor
 * @text Background color
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"32","green":"32","blue":"32","opacity":"0.5","systemColor":"-1"}
 *
 * @param volumeSlider.fillColor
 * @text Fill color
 * @type struct<Color>
 * @parent volumeSlider
 * @default {"red":"0","green":"0","blue":"0","opacity":"1","systemColor":"12"}
 *
 * @param text
 * @text Text
 *
 * @param text.categoryGameplay
 * @text Category: Gameplay
 * @type string
 * @default Gameplay
 * @parent text
 *
 * @param text.categoryAudio
 * @text Category: Audio
 * @type string
 * @default Audio
 * @parent text
 *
 * @param text.optionOn
 * @text Option: ON
 * @type string
 * @default ON
 * @parent text
 *
 * @param text.optionOff
 * @text Option: OFF
 * @type string
 * @default OFF
 * @parent text
 *
 * @param text.audioMasterVolume
 * @text Audio: Master Volume
 * @type string
 * @default Master Volume
 * @parent text
 *
 */
/*~struct~Color:
 * @param red
 * @text Red
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param green
 * @text Green
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param blue
 * @text Blue
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 1
 *
 * @param systemColor
 * @text System color
 * @desc If set to a positive integer, use the window system color instead.
 * @type number
 * @default -1
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

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.CoreEssentials', '1.3.1')) {
    throw new Error('The correct version of CoreEssentials has not been loaded (required version: 1.3.1).');
  }

  const {
    CoreEssentials,
    CategorizeOptions,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_CategorizeOptions';

  /* ------------------------------------------------------------------------
   * - Default parameters                                                   -
   * ------------------------------------------------------------------------
   */

  // The Color struct is defined here to make it easier to reuse during
  // parameter conversion.
  const colorStruct = {
    red: 'number',
    green: 'number',
    blue: 'number',
    opacity: 'number',
    systemColor: 'number',
  };

  const parameters = CoreEssentials.getParameters(pluginName, {
    booleanWrap: false,
    booleanDisplay: 'toggle',
    volumeDisplay: 'numeric',
    volumeStepSize: 20,
    'volumeSlider.width': 120,
    'volumeSlider.height': 120,
    'volumeSlider.outlineColor': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 0.6,
      systemColor: -1,
    },
    'volumeSlider.backgroundColor': {
      red: 32,
      green: 32,
      blue: 32,
      opacity: 0.5,
      systemColor: -1,
    },
    'volumeSlider.fillColor': {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
      systemColor: 12,
    },
    'text.categoryGameplay': 'Gameplay',
    'text.categoryAudio': 'Audio',
    'text.optionOn': 'ON',
    'text.optionOff': 'OFF',
    'text.audioMasterVolume': 'Master Volume',
  }, {
    booleanWrap: 'boolean',
    booleanDisplay: 'text',
    volumeDisplay: 'text',
    volumeStepSize: 'number',
    'volumeSlider.width': 'number',
    'volumeSlider.height': 'number',
    'volumeSlider.outlineColor': ['object', colorStruct],
    'volumeSlider.backgroundColor': ['object', colorStruct],
    'volumeSlider.fillColor': ['object', colorStruct],
    'text.categoryGameplay': 'text',
    'text.categoryAudio': 'text',
    'text.optionOn': 'text',
    'text.optionOff': 'text',
    'text.audioMasterVolume': 'text',
  });

  /* ------------------------------------------------------------------------
   * - Private variables                                                    -
   * ------------------------------------------------------------------------
   */

  const categoryOptions = {};
  const typeCallbacks = {};

  /* --------------------------------------------------------------------------
   * - Private functions                                                      -
   * -                                                                        -
   * - These are helper functions that aren't meant to be used outside the    -
   * - plugin.                                                                -
   * --------------------------------------------------------------------------
   */

  fromTextManager = (symbol) => TextManager[symbol];

  getText = (key) => parameters[`text.${key}`] || '';

  colorToRgba = (color) => (
      color.systemColor > -1
      ? ColorManager.textColor(color.systemColor)
      : `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity})`
    );

  /* --------------------------------------------------------------------------
   * - Plugin methods                                                         -
   * --------------------------------------------------------------------------
   */

  /**
   *
   * @param {string|function} name - The label. Can be a function that returns
   * a string.
   * @param {string} symbol - The symbol name.
   * @param {object} options - Extra options.
   */
  CategorizeOptions.addOption = (name, symbol, options = {}) => {
    const {
      enabled = true,
      ext = null,
      type = '',
      category = '',
      index = null,
    } = options;

    const data = {
      name,
      symbol,
      enabled,
      ext,
      type,
    };

    categoryOptions[category] = categoryOptions[category] || [];

    if (index === null || Number.isNaN(+index)) {
      categoryOptions[category].push(data);
    } else if (index === 0) {
      categoryOptions[category].unshift(data);
    } else {
      categoryOptions[category].splice(index, 0, data);
    }
  };

  CategorizeOptions.addItemCallbacks = (type, callbacks) => {
    typeCallbacks[type] = {
      ...(typeCallbacks[type] || {}),
      ...callbacks,
    };
  }

  CategorizeOptions.getItemCallbacks = (type, callbackType = null) => {
    if (!typeCallbacks[type]) {
      return null;
    }
    const callbacks = typeCallbacks[type];

    if (!callbackType) {
      return callbacks;
    }

    return callbacks[callbackType] || null;
  }

  const {
    addOption,
    addItemCallbacks,
    getItemCallbacks,
  } = CategorizeOptions;

  addOption(getText.bind(null, 'categoryGameplay'), 'gameplay', { type: 'category' });
  addOption(getText.bind(null, 'categoryAudio'),    'audio',    { type: 'category' });

  addOption(fromTextManager, 'alwaysDash',      { type: 'boolean', category: 'gameplay' });
  addOption(fromTextManager, 'commandRemember', { type: 'boolean', category: 'gameplay' });
  addOption(fromTextManager, 'touchUI',         { type: 'boolean', category: 'gameplay' });

  addOption(getText.bind(null, 'audioMasterVolume'), 'masterVolume', { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'bgmVolume', { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'bgsVolume', { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'meVolume',  { type: 'volume', category: 'audio' });
  addOption(fromTextManager, 'seVolume',  { type: 'volume', category: 'audio' });

  addItemCallbacks('category', {
    render: function(index) {
      const rect = this.itemLineRect(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'left');
    },
    ok: function(index) {
      const symbol = this.commandSymbol(index);
      this.setCategory(symbol);
      this.playOkSound();
    }
  });

  addItemCallbacks('boolean', {
    render: function(index) {
      const title = this.commandName(index);
      const rect = this.itemLineRect(index);
      const display = parameters.booleanDisplay;
      let statusWidth = this.statusWidth();
      const optionOn = getText('optionOn');
      const optionOff = getText('optionOff');
      if (display === 'sbs') {
        statusWidth = 4 * this.itemPadding()
          + this.contents.measureTextWidth(optionOn)
          + this.contents.measureTextWidth(optionOff);
      }
      const titleWidth = rect.width - statusWidth;
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(title, rect.x, rect.y, titleWidth, "left");
      if (display === 'sbs') {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        const onWidth = this.contents.measureTextWidth(optionOn);
        const offWidth = this.contents.measureTextWidth(optionOff);
        this.changePaintOpacity(value);
        this.drawText(optionOn, rect.x + titleWidth + this.itemPadding() * 2, rect.y, onWidth, "right");
        this.changePaintOpacity(!value);
        this.drawText(optionOff, rect.x + titleWidth + this.itemPadding() * 4 + onWidth, rect.y, offWidth, "right");
      } else {
        const status = this.statusText(index);
        this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right");
      }
    },
    change: function(index, forward) {
      const symbol = this.commandSymbol(index);
      let value = forward;
      if (parameters.booleanWrap) {
        value = !this.getConfigValue(symbol);
      }
      this.changeValue(symbol, value);
    }
  });

  addItemCallbacks('volume', {
    render: function(index) {
      const title = this.commandName(index);
      const rect = this.itemLineRect(index);
      const display = parameters.volumeDisplay;
      const sliderWidth = parameters['volumeSlider.width'];
      const sliderHeight = parameters['volumeSlider.height'];
      let statusWidth = this.statusWidth();
      if (display === 'slider') {
        statusWidth = 2 * this.itemPadding() + sliderWidth;
      }
      const titleWidth = rect.width - statusWidth;
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(title, rect.x, rect.y, titleWidth, "left");
      if (display === 'slider') {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        const sliderOutline = colorToRgba(parameters['volumeSlider.outlineColor']);
        const sliderBg = colorToRgba(parameters['volumeSlider.backgroundColor']);
        const sliderFill = colorToRgba(parameters['volumeSlider.fillColor']);
        const volumeFill = Math.round((value / 100) * sliderWidth);
        const sliderX = rect.x + titleWidth + 2 * this.itemPadding();
        const sliderY = rect.y + (rect.height - sliderHeight) / 2;
        if (value > 0) {
          this.contents.fillRect(sliderX, sliderY, volumeFill, sliderHeight, sliderFill);
        }
        if (value < 100) {
          this.contents.fillRect(sliderX + volumeFill, sliderY, sliderWidth - volumeFill, sliderHeight, sliderBg);
        }
        this.contentsBack.strokeRect(sliderX, sliderY, sliderWidth, sliderHeight, sliderOutline);
      } else {
        const status = this.statusText(index);
        this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right");
      }
    }
  });

  (() => {
    //-----------------------------------------------------------------------------
    // Window_OptionsExt
    //
    // The window for changing various settings on the options screen.

    class Window_OptionsExt extends Window_Options {
      initialize(category = '', parent = null) {
        this._commandType = {};
        this._category = category;
        this._parent = parent ? [ parent ] : [];
        const rect = this.getWindowRect();
        super.initialize(rect);
      }

      getWindowRect() {
        const options = categoryOptions[this._category];
        let windowHeight = $gameSystem.windowPadding() * 2;
        options.forEach((option) => {
          const getSize = getItemCallbacks(option.type, 'getSize');

          if (getSize) {
            windowHeight+= getSize.call(this, option);
          } else {
            windowHeight+= this.itemHeight();
          }
        });

        const windowWidth = 400;
        const windowX = (Graphics.boxWidth - windowWidth) / 2;
        const windowY = (Graphics.boxHeight - windowHeight) / 2;
        return new Rectangle(windowX, windowY, windowWidth, windowHeight);
      }

      addCategory(category = null) {
        const currentCategory = category !== null ? category : this._category;

        const categoryData = categoryOptions[currentCategory];

        categoryData.forEach((data) => {
          const {
            name,
            symbol,
            enabled,
            ext,
            type,
          } = data;

          const label = typeof name === 'function' ? name(symbol) : name;

          this.addCommand(label, symbol, enabled, ext, null, type);
        });
      }

      hasParentCategory() {
        return !!this._parent.length;
      }

      popCategory() {
        const parent = this._parent.pop();
        this._category = parent[0];
        this.refreshCategory();
        this.select(parent[1]);
      }

      setCategory(category) {
        this._parent.push([this._category, this.index()]);
        this._category = category;
        this.refreshCategory();
      }

      refreshCategory() {
        const rect = this.getWindowRect();
        this.move(rect.x, rect.y, rect.width, rect.height);
        this.createContents();
        this.refresh();
      }

      addCommand(name, symbol, enabled = true, ext = null, index = null, type = 'option') {
        super.addCommand(name, symbol, enabled, ext, index);
        this._commandType[symbol] = type;
      }

      makeCommandList() {
        this.addCategory();
      }

      addGeneralOptions() {
        this.addCategory('gameplay');
      }

      addVolumeOptions() {
        this.addCategory('audio');
      };

      commandType(index) {
        const symbol = this.commandSymbol(index);
        return this._commandType[symbol];
      }

      commandCallbacks(index, callbackType = null) {
        const type = this.commandType(index);
        return getItemCallbacks(type, callbackType);
      }

      isVolumeSymbol(symbol) {
        return this._commandType[symbol] === 'volume';
      }

      drawItem(index) {
        const renderCallback = this.commandCallbacks(index, 'render');

        if (renderCallback) {
          renderCallback.call(this, index);
        } else {
          super.drawItem(index);
        }
      }

      processOk() {
        const index = this.index();

        const okCallback = this.commandCallbacks(index, 'ok');

        if (okCallback) {
          okCallback.call(this, index);
        } else {
          super.processOk();
        }
      }

      cursorRight() {
        if (!this.cursorItemChange(true)) {
          super.cursorRight();
        }
      }

      cursorLeft() {
        if (!this.cursorItemChange(false)) {
          super.cursorLeft();
        }
      }

      cursorItemChange(forward) {
        const index = this.index();

        const changeCallback = this.commandCallbacks(index, 'change');

        if (changeCallback) {
          changeCallback.call(this, index, forward);
          return true;
        }
        return false;
      }

      booleanStatusText(value) {
        return getText(value ? 'optionOn' : 'optionOff');
      }

      volumeOffset() {
        return parameters.volumeStepSize || 20;
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

    CategorizeOptions.Window_OptionsExt = Window_OptionsExt;

    //-----------------------------------------------------------------------------
    // Scene_OptionsExt
    //
    // The scene class of the options screen.

    class Scene_OptionsExt extends Scene_Options {
      createOptionsWindow() {
        this._optionsWindow = new Window_OptionsExt();
        this._optionsWindow.setHandler("cancel", this.onCancel.bind(this));
        this.addWindow(this._optionsWindow);
      }

      onCancel() {
        if (this._optionsWindow.hasParentCategory()) {
          this._optionsWindow.popCategory();
          this._optionsWindow.activate();
        } else {
          this.popScene();
        }
      }
    }

    CategorizeOptions.Scene_OptionsExt = Scene_OptionsExt;

    Scene_Title.prototype.commandOptions = function() {
      this._commandWindow.close();
      SceneManager.push(Scene_OptionsExt);
    };

    Scene_Menu.prototype.commandOptions = function() {
      SceneManager.push(Scene_OptionsExt);
    };

    AudioManager._masterVolume = 100;

    Object.defineProperty(AudioManager, "masterVolume", {
      get: function() {
          return this._masterVolume;
      },
      set: function(value) {
          this._masterVolume = value;
          this.updateBgmParameters(this._currentBgm);
          this.updateBgsParameters(this._currentBgs);
          this.updateMeParameters(this._currentMe);
      },
      configurable: true
    });

    CoreEssentials.registerFunctionExtension('AudioManager.updateBufferParameters', function(buffer, _configVolume, audio) {
      if (buffer && audio) {
        buffer.volume*= (this._masterVolume / 100);
      }
    });

    /* --------------------------------------------------------------------
     * - ConfigManager.masterVolume (New)                                 -
     * --------------------------------------------------------------------
     */
    CoreEssentials.addConfig('masterVolume', 'volume', {
      get: function() {
          return AudioManager.masterVolume;
      },
      set: function(value) {
        AudioManager.masterVolume = value;
      },
    });
  })();
})();
