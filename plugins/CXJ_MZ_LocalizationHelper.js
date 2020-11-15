/******************************************************************************
 * CXJ_MZ_TextHelper.js                                                       *
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
 * @plugindesc Adds various helper functions to create text strings.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * Adding new text commands can be a hassle, and sometimes you just want to
 * add simple text commands without needing to create new plugins. Or you just
 * want to make it easier for yourself to add new text commands. This plugin
 * can help you with that.
 *
 * This plugin is meant for both plugin developers as well as developers of
 * RPG Maker games.
 *
 * ============================================================================
 * = Requirements                                                             =
 * ============================================================================
 *
 * This plugin requires the following plugins to work:
 *
 * * CXJ_MZ.CoreEssentials: ^1.0
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
 * CXJ_MZ.TextHelper.addWaitMode(waitMode, callback)
 *
 * Wait modes allow you to pause an event until certain actions have completed.
 * An example is the built-in message wait mode, which waits until the message
 * box is done displaying.
 *
 * In order to let the wait mode know you're done, it checks whether it should
 * still wait. In this case, the callback has to return a boolean, where true
 * means it should still be waiting, and false means it's done waiting.
 *
 * Arguments:
 *
 * {string} waitMode   - The name of the wait mode.
 * {function} callback - A callback function. Must return a boolean.
 *
 * ---
 *
 * CXJ_MZ.TextHelper.addMessageCode(code, callback, type, escapeBrackets = null,
 *                                      location = 'base')
 *
 * Message codes can be added through this method. For the large part it's
 * fairly straightforward. The code is a regular expression string, this will
 * later be converted to a regular expression object, primarily because depending
 * on the chosen type, the full regular expression changes. It will also be
 * pre-processed to replace certain strings with a regular expression:
 *
 * :any  - (.+?)             - Any character string.
 * :num  - (-?\d+(?:\.\d+)?) - A number.
 * :unum - (\d+(?:\.\d+)?)   - A positive number.
 * :int  - (-?\d+)           - An integer.
 * :uint - (\d+)             - A positive integer.
 * :id   - (\w+)             - Any alphanumerical character or an underscore.
 *
 * There are two types of message codes, convert and process. The convert codes
 * essentially replaces the codes before it gets rendered, and process replaces
 * the codes on render. Essentially it depends whether the code is being used
 * in Window_Base.prototype.convertEscapeCharacters or in
 * Window_Base.prototype.processEscapeCharacter.
 *
 * For example, if you simply want to display the current date, the name of
 * the first party member, or the amount of money you have, these codes are
 * being used during convert. If you want to display an image icon, or you
 * want to change the text color, these codes are being used during process.
 *
 * The escape brackets option has priority over the global settings, meaning a
 * plugin developer can enforce whether the brackets and parentheses are escaped
 * or not.
 *
 * Location allows you to only set the code to a certain window. By default, only
 * base (Window_Base) and message (Window_Message) are supported, but essentially
 * all windows are supported, so long as the object uses the Window_ prefix, as
 * the location is determined by the class name / object prototype constructor.
 *
 * Note that with process callbacks, the first argument is always the text state.
 *
 * Arguments:
 *
 * {string} code            - The code, as a regular expression string.
 * {function} callback      - A callback function. Must return a string for convert,
 *                            or a boolean for process.
 * {string} type            - Either convert or process.
 * {boolean} escapeBrackets - (optional) Whether to escape brackets and
 *                            parentheses or not.
 * {string} location        - (optional) Allows you to limit where the code can be
 *                            used. Use "base" to make it available everywhere.
 *
 * -----------------
 * Plugin parameters
 * -----------------
 *
 * Escape brackets and parentheses
 * -------------------------------
 *
 * Just like how you'd normally add message codes, the codes you define using
 * this plugin requires the use of regular expressions. This also means that
 * square brackets and parentheses need to be escaped. If you are absolutely
 * certain that your own codes don't already escape brackets, you can enable
 * this.
 *
 * Message codes
 * -------------
 *
 * If you don't want to write your own plugin to add message codes, you can
 * create them through this parameter. Do note that message codes added
 * through here will get run first, followed by those added by other plugins,
 * and finally the built-in message codes.
 *
 * Note that with process callbacks, the first argument is always the text state.
 * This parameter will automatically be defined as textState.
 *
 * Each entry has the following options:
 *
 * Code                            - The message code used. This is a regular
 *                                   expression, without a leading backslash.
 * Callback                        - The callback function. This should return
 *                                   the string that replaces the original
 *                                   code in case the code is run during the
 *                                   convert phase.
 * Type                            - The type of message code. Either convert
 *                                   or process.
 * Parameter names                 - The name of the parameters. These can be
 *                                   used in the callback.
 * Escape brackets and parentheses - Whether square brackets and parentheses
 *                                   should be escaped or not.
 * Valid code location             - The window where the code is valid.
 * Other location                  - When "Valid code location" is "Other",
 *                                   this field is used.
 *
 * Wait modes
 * ----------
 *
 * You can create your own wait modes with parameters on top of creating them
 * programmatically. There aren't a lot of instances where you would actually
 * need to do this, as it's primarily for plugin developers, but just in case
 * you do need to create your own wait mode, this gives you the option.
 *
 * Note that you shouldn't overwrite the existing wait modes or wait modes
 * added by other plugins, unless you know what you're doing. These are:
 *
 * * message
 * * transfer
 * * scroll
 * * route
 * * animation
 * * balloon
 * * action
 * * gather
 * * video
 * * image
 *
 * Each entry has the following options:
 *
 * Wait mode - The name of the wait mode.
 * Callback  - The callback function. This should return true if it's still
 *             waiting, and false if it's done.
 *
 * ---------------
 * Plugin commands
 * ---------------
 *
 * Set wait mode
 * -------------
 *
 * This allows you to manually set a wait mode. This is mostly useful if you
 * either have a custom wait mode, or a plugin requires you to manually set
 * the current wait mode.
 *
 * Arguments:
 *
 * Wait mode - The name of the wait mode.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.0.1 (2020-11-10)
 * ------------------
 *
 * * Replaced instances of windowName with the property windowName
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
 * @param languages
 * @text Languages
 * @desc You can add available languages through this parameter.
 * @type struct<Language>[]
 * @default [{"language":"English","code":"en"}]
 *
 * @param defaultLanguage
 * @text Default language
 * @desc Use the language code defined in the "Languages" parameter.
 * @default en
 *
 * @param localizationFolder
 * @text Localization folder
 * @desc Where the localization files are located.
 * @default data/localization
 *
 */
/*~struct~Language:
 * @param language
 * @text Language
 * @type text
 *
 * @param code
 * @text Language code
 * @desc Will be used for the file name and localization string.
 * @type text
 */
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

  if (!CXJ_MZ.CoreEssentials.isVersion('CXJ_MZ.CoreEssentials', '1.2')) {
    throw new Error('The correct version of CoreEssentials has not been loaded (required version: 1.2).');
  }

  CXJ_MZ.CoreEssentials.checkDependencies({
    'CXJ_MZ.TextHelper': '1.0.1',
  }, true);

  const {
    CoreEssentials,
    TextHelper,
  } = CXJ_MZ;

  const pluginName = 'CXJ_MZ_LocalizationHelper';


})();
