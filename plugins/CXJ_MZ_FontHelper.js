/******************************************************************************
 * CXJ_MZ_FontHelper.js                                                       *
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
 * @plugindesc Adds various helper functions to add and use fonts.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * While it isn't hard to add new fonts, RPG Maker MZ does have the FontManager
 * to handle fonts, this plugin is made to make it easier add fonts, and to
 * switch fonts whenever you want.
 *
 * ============================================================================
 * = Requirements                                                             =
 * ============================================================================
 *
 * This plugin requires the following plugins to work:
 *
 * * CXJ_MZ.CoreEssentials: ^1.0
 * * CXJ_MZ.TextHelper: ^1.0
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
 * @param events
 * @text Events
 *
 * @param events.resetAfterEvent
 * @text Reset font after event
 * @desc Whether to reset the font after the event finished running.
 * @parent events
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param fonts
 * @text Fonts
 * @desc You can add fonts through this parameter.
 * @type struct<FontData>[]
 *
 * @command setFontFace
 * @text Set font face
 * @desc Sets a new font to use.
 *
 * @arg fontFace
 * @type string
 * @text Font face
 * @desc The name of the font to use.
 *       Use rmmz-mainfont for main font, rmmz-numberfont for number font.
 */
/*~struct~FontData:
 * @param fontFace
 * @text Font face
 * @type text
 *
 * @param filename
 * @text Font filename
 * @type text
 *
 * @param fallback
 * @text Font fallback
 * @type text
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.FontHelper = CXJ_MZ.FontHelper || {};
  CXJ_MZ.FontHelper.version = '1.0';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.TextHelper', '1.0')) {
    throw new Error('TextHelper has not been initialized, or the correct version hasn\'t been loaded.');
  }

  const {
    CoreEssentials,
    TextHelper,
    FontHelper,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_FontHelper';

  /* ------------------------------------------------------------------------
   * - Plugin commands                                                      -
   * ------------------------------------------------------------------------
   */

  PluginManager.registerCommand(pluginName, "setFontFace", (args) => {
    const { fontFace } = args;
    let newFontFace = fontFace;
    if (fontFace === 'rmmz-mainfont' || FontManager._state[fontFace] !== 'loaded') {
      newFontFace = null;
    }
    $gameSystem.overrideFont(newFontFace);
  });

  /* ------------------------------------------------------------------------
   * - Default parameters                                                   -
   * ------------------------------------------------------------------------
   */

  const parameters = CoreEssentials.getParameters(pluginName, {
    'events.resetAfterEvent': true,
    fonts: [],
  }, {
    'events.resetAfterEvent': 'boolean',
    fonts: ['array', 'object', {
      fontFace: 'text',
      filename: 'text',
      fallback: 'text',
    }],
  });

  /* ------------------------------------------------------------------------
   * - PRIVATE VARIABLES                                                    -
   * ------------------------------------------------------------------------
   */

  const fontFallbacks = {};

  /* --------------------------------------------------------------------------
   * - Plugin methods                                                         -
   * --------------------------------------------------------------------------
   */

  /**
   * Adds a font with fallback.
   *
   * @param {string} fontFace - The name of the font.
   * @param {string} filename - The font file name.
   * @param {string} fallback - The fallback font.
   */
  FontHelper.loadFont = (fontFace, filename, fallback = null) => {
    if (fontFace === 'rmmz-mainfont' || fontFace === 'rmmz-numberfont' || FontManager._state[fontFace]) {
      continue;
    }

    FontManager.load(fontFace, filename);
    fontFallbacks[fontFace] = fallback;
  }

  (() => {
    CoreEssentials.registerFunctionExtension('Game_System.prototype.initialize', function() {
      this._fontOverride = null;
    });

    const mainFontFace = CoreEssentials.setNoConflict('Game_System.prototype.mainFontFace');
    Game_System.prototype.mainFontFace = function() {
      let override = '';
      if (this._fontOverride) {
        override = `${this._fontOverride}, `;
        if (fontFallback[this._fontOverride]) {
          override = `${override}${fontFallback[this._fontOverride]}, `;
        }
      }
      return `${override}${mainFontFace.call(this)}`;
    }

    Game_System.prototype.overrideFont = function(fontFace) {
      this._fontOverride = fontFace;
    }

    CoreEssentials.registerFunctionExtension('Game_Interpreter.prototype.clear', function() {
      if (parameters['events.resetAfterEvent']) {
        this._origFontOverride = $gameSystem._fontOverride;
      }
    });

    CoreEssentials.registerFunctionExtension('Game_Interpreter.prototype.terminate', function() {
      if (parameters['events.resetAfterEvent']) {
        $gameSystem.overrideFont(this._origFontOverride);
      }
    });

    CoreEssentials.registerFunctionExtension('Scene_Boot.prototype.loadGameFonts', function() {
      if (parameters.fonts && parameters.fonts.length) {
        parameters.fonts.forEach((fontData) => {
          const {
            fontFace,
            filename,
            fallback,
          } = fontData;

          FontHelper.loadFont(fontFace, filename, fallback);
        });
      }
    });
  })();
})();
