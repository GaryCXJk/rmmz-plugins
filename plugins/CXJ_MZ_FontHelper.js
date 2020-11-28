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
 * * CXJ_MZ.CoreEssentials: ^1.2
 * * CXJ_MZ.TextHelper: ^1.0.1
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
 * -----------------
 * Plugin developers
 * -----------------
 *
 * CXJ_MZ.FontHelper.loadFont(fontFace, filename, fallback = null)
 *
 * This allows you to load a font. It basically just calls FontManager.load,
 * however, it also stores the fallback font for the current font face. If the
 * font already has been loaded previously, it will ignore the font loading.
 *
 * Arguments:
 *
 * {string} fontFace - The name of the font.
 * {string} filename - The font file name.
 * {string} fallback - The fallback font.
 *
 * ---
 *
 * CXJ_MZ.FontHelper.fontLoaded(fontFace)
 *
 * If you want to check whether a font has been loaded in, you can use this
 * helper function.
 *
 * Arguments:
 *
 * {string} fontFace - The name of the font.
 *
 * Returns:
 *
 * True if the font has already been loaded, false if it hasn't.
 *
 * -------------
 * Message codes
 * -------------
 *
 * \font[font-face]
 *
 * You can switch the font on-the-fly, while displaying a message. Leave the
 * font face out to revert back to the default font. The font will automatically
 * revert back to the default at the end of the message.
 *
 * Arguments:
 *
 * font-face - The name of the font to use.
 *
 * -----------------
 * Plugin parameters
 * -----------------
 *
 * Reset font after event
 * ----------------------
 *
 * By default, after the event ends execution, the font will reset to the
 * default font. However, you can opt to disable this functionality. Do note
 * that this will affect all message windows, including the menu windows.
 *
 * Fonts
 * -----
 *
 * This parameter adds an easy way to add new fonts. This is the primary way
 * to add new fonts, and the most direct one. You can immediately use these
 * fonts without any hassle.
 *
 * Each entry has the following options:
 *
 * Font face     - The name of the font.
 * Font filename - The font file name.
 * Font fallback - The fallback font.
 * Font aliases  - Allows you to add aliases for the font.
 *
 * As a side note, aliasing fonts acts pretty much the same as defining
 * multiple instances of a font with the same file name. This will just
 * simplify the process.
 *
 * ---------------
 * Plugin commands
 * ---------------
 *
 * Set font face
 * -------------
 *
 * With this command, you can change the font. This is either for the entire
 * duration of the event or until the font is changed again, depending on the
 * parameter settings.
 *
 * Arguments:
 *
 * Font face - The name of the font to use.
 *
 * -------------
 * Special fonts
 * -------------
 *
 * New fonts have been added that have special properties. They only appear
 * at certain places. The names of these fonts follow a certain pattern.
 *
 * rmmz-windowfont-<window name> - Sets the font of a specific window.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.1.2 (2020-11-23)
 * ------------------
 *
 * * Added: Easier way to define a font multiple times through font aliases.
 * * Fixed: Overriding fonts through event commands wouldn't work if you
 *   already have overridden the font through the font family.
 *
 * 1.1.1 (2020-11-23)
 * ------------------
 *
 * * Fixed: font[] code wouldn't properly register.
 * * Fixed: font[] wouldn't switch back to the window specific font.
 * * Fixed: font[:any] wouldn't switch to the proper font correctly.
 *
 * 1.1 (2020-11-10)
 * ----------------
 *
 * * Each window can now have their own font
 * * Added FontHelper.fontLoaded, a helper function to check if a font has
 *   been loaded.
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
 * * Game_System.prototype.initialize
 * * Game_System.prototype.mainFontFace
 * * Game_Interpreter.prototype.clear
 * * Game_Interpreter.prototype.terminate
 * * Scene_Boot.prototype.loadGameFonts
 * * Window_Base.prototype.resetFontSettings
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
 *
 * @param aliases
 * @text Font aliases
 * @desc Allows you to alias a font.
 * @type text[]
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.FontHelper = CXJ_MZ.FontHelper || {};
  CXJ_MZ.FontHelper.version = '1.1.2';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.CoreEssentials', '1.2')) {
    throw new Error('The correct version of CoreEssentials has not been loaded (required version: 1.2).');
  }

  CXJ_MZ.CoreEssentials.checkDependencies({
    'CXJ_MZ.TextHelper': '1.0.1',
  }, true);

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

  /**
   * Sets the main font face.
   *
   * @param {args} - Arguments.
   * @param {args.fontFace} - The font face.
   */
  PluginManager.registerCommand(pluginName, "setFontFace", (args) => {
    const { fontFace } = args;
    let newFontFace = fontFace;
    // If the font face is rmmz-mainfont (the default main font) or it hasn't been
    // loaded yet, set to null (the default main font).
    if (fontFace === 'rmmz-mainfont' || !FontHelper.fontLoaded(fontFace)) {
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
      alias: ['array', 'text'],
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
    // If the font is either rmmz-mainfont, rmmz-numberfont or a previously defined font,
    // skip loading the font.
    if (fontFace === 'rmmz-mainfont' || fontFace === 'rmmz-numberfont' || FontManager._states[fontFace]) {
      return;
    }

    // Loads the font, and stores the fallback for the current font.
    FontManager.load(fontFace, filename);
    fontFallbacks[fontFace] = fallback;
  }

  FontHelper.fontLoaded = (fontFace) => FontManager._states[fontFace] === 'loaded';

  /* --------------------------------------------------------------------------
   * - Message codes                                                          -
   * --------------------------------------------------------------------------
   */

  // If no font has been specified, default to the default font.
  TextHelper.addMessageCode('font\\[\\]', function() {
    let fontSet = false;
    if (!$gameSystem.hasFontOverride()) {
      const fontName = `rmmz-windowfont-${this.windowName}`;
      const windowFont = $gameSystem.getFontFace(fontName, true);
      if (FontHelper.fontLoaded(fontName) && windowFont) {
        this.contents.fontFace = windowFont;
        fontSet = true;
      }
    }
    if (!fontSet) {
      this.contents.fontFace = $gameSystem.mainFontFace();
    }
  }, 'process', false);

  // Otherwise load the font.
  TextHelper.addMessageCode('font[:any]', function(_textState, fontFace) {
    const realFontFace = fontFace === 'rmmz-mainfont' ? null : fontFace;
    this.contents.fontFace = $gameSystem.getFontFace(realFontFace);
  }, 'process', true);

  (() => {

    /* --------------------------------------------------------------------
     * - Game_System.prototype.initialize (Override)                      -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Game_System.prototype.initialize', function() {
      this._fontOverride = null;
    });

    /* --------------------------------------------------------------------
     * - Game_System.prototype.mainFontFace (Override)                    -
     * --------------------------------------------------------------------
     */

    const mainFontFace = CoreEssentials.setNoConflict('Game_System.prototype.mainFontFace');
    Game_System.prototype.mainFontFace = function() {
      return this.getFontFace(this._fontOverride);
    }

    /* --------------------------------------------------------------------
     * - Game_System.prototype.getFontFace (New)                          -
     * --------------------------------------------------------------------
     */

    Game_System.prototype.getFontFace = function(fontFace, overrideOnly = false) {
      let override = '';
      if (fontFace) {
        override = `${fontFace}`;
        if (fontFallbacks[fontFace]) {
          override = `${override}, ${fontFallbacks[fontFace]}`;
        }
      }
      if (overrideOnly) {
        return override;
      }
      return `${override ? `${override}, ` : ''}${mainFontFace.call(this)}`;
    }

    /* --------------------------------------------------------------------
     * - Game_System.prototype.overrideFont (New)                         -
     * --------------------------------------------------------------------
     */

    Game_System.prototype.overrideFont = function(fontFace) {
      this._fontOverride = fontFace;
    }

    /* --------------------------------------------------------------------
     * - Game_System.prototype.hasFontOverride (New)                      -
     * --------------------------------------------------------------------
     */

    Game_System.prototype.hasFontOverride = function() {
      return this._fontOverride !== null;
    }

    /* --------------------------------------------------------------------
     * - Game_Interpreter.prototype.clear (Override)                      -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Game_Interpreter.prototype.clear', function() {
      if (parameters['events.resetAfterEvent']) {
        this._origFontOverride = $gameSystem._fontOverride;
      }
    });

    /* --------------------------------------------------------------------
     * - Game_Interpreter.prototype.terminate (Override)                  -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Game_Interpreter.prototype.terminate', function() {
      if (parameters['events.resetAfterEvent']) {
        $gameSystem.overrideFont(this._origFontOverride);
      }
    });

    /* --------------------------------------------------------------------
     * - Scene_Boot.prototype.loadGameFonts (Override)                    -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Scene_Boot.prototype.loadGameFonts', function() {
      if (parameters.fonts && parameters.fonts.length) {
        parameters.fonts.forEach((fontData) => {
          const {
            fontFace,
            filename,
            fallback,
            aliases = [],
          } = fontData;

          FontHelper.loadFont(fontFace, filename, fallback);

          if (aliases.length) {
            aliases.forEach((alias) => {
              FontHelper.loadFont(alias, filename, fallback);
            });
          }
        });
      }
    });

    /* --------------------------------------------------------------------
     * - Window_Base.prototype.resetFontSettings (Override)               -
     * --------------------------------------------------------------------
     */

    CoreEssentials.registerFunctionExtension('Window_Base.prototype.resetFontSettings', function() {
      if (!$gameSystem.hasFontOverride()) {
        const fontName = `rmmz-windowfont-${this.windowName}`;
        const windowFont = $gameSystem.getFontFace(fontName, true);
        if (FontHelper.fontLoaded(fontName) && windowFont) {
          this.contents.fontFace = windowFont;
        }
      }
    });
  })();
})();
