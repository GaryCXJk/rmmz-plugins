/******************************************************************************
 * CXJ_MZ_InputExtender.js                                                    *
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
 * @plugindesc Improves and extends input.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 *
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
 * This plugin features various tweaks:
 *
 * -------------------
 * Script event tweaks
 * -------------------
 *
 * There are two tweaks for the script events. Both tweaks are enabled by
 * default, but can be disabled if needed.
 *
 * Combine multiple script blocks
 * ------------------------------
 *
 * This allows you to place multiple script events after each other and make
 * them function as if they're one larger script. If you do need to add a
 * break between two script blocks, make sure to place the following at the
 * end of the script block:
 *
 *     //!EOS
 *
 * This makes sure the next script block won't be part of the current script.
 *
 * Optimize script execution
 * -------------------------
 *
 * By default, JavaScript's eval function is used. Aside from potential
 * security issues, eval is considered to be slow. Further more, each time
 * the script block is being encountered, it has to re-read every line to be
 * evaluated.
 *
 * What this does is it stores the script in the first command block as a
 * Function object, which is considered a lot faster.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.0 (2020-10-26)
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
 * * Game_Interpreter.prototype.command355
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
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.InputExtender = CXJ_MZ.InputExtender || {};
  CXJ_MZ.InputExtender.version = '1.0';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  const {
    CoreEssentials,
    InputExtender,
  } = CXJ_MZ;

  /* ------------------------------------------------------------------------
   * - PRIVATE VARIABLES                                                    -
   * ------------------------------------------------------------------------
   */

  // These keys should prevent default behavior.
  const preventDefaultCodes = [
    'backspace',
    'tab',
    'pageup',
    'pagedown',
    'arrowleft',
    'arrowup',
    'arrowright',
    'arrowdown',
  ];

  // These keys should use the event.code property instead.
  const keysUseCode = [
    'numpad0',
    'numpad1',
    'numpad2',
    'numpad3',
    'numpad4',
    'numpad5',
    'numpad6',
    'numpad7',
    'numpad8',
    'numpad9',
    'numpaddecimal',
  ];

  /* ------------------------------------------------------------------------
   * - PLUGIN PROPERTIES                                                    -
   * ------------------------------------------------------------------------
   */

  InputExtender.defaultMapping = {
    key: {
      ok: ['enter', ' ', 'z'],
      escape: ['escape', 'insert', 'x', 'numpad0'],
      shift: ['shift'],
      pageup: ['pageup', 'q', 'numpad9'],
      pagedown: ['pagedown', 'w', 'numpad3'],
      up: ['arrowup', 'numpad8'],
      down: ['arrowdown', 'numpad2'],
      left: ['arrowleft', 'numpad4'],
      right: ['arrowright', 'numpad6'],
      control: ['control', 'alt'],
      tab: ['tab'],
      debug: ['f9'],
    },
    gamepad: {
      ok: [0],
      cancel: [1],
      shift: [2],
      menu: [3],
      pageup: [4],
      pagedown: [5],
      up: [12],
      down: [13],
      left: [14],
      right: [15],
    },
  };

  /* ------------------------------------------------------------------------
   * - Plugin methods                                                       -
   * ------------------------------------------------------------------------
   */

  /**
   * Resets the key mapping and gamepad mapping
   */
  InputExtender.resetInputMaps = () => {
    Input.resetInputMaps();
  }

  (() => {

    /* --------------------------------------------------------------------
     * - Graphics._onKeyDown (Override)                                   -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method _onKeyDown
     * @param {KeyboardEvent} event
     * @private
     */
    CoreEssentials.setNoConflict('Graphics._onKeyDown', Graphics);
    Graphics._onKeyDown = function(event) {
      if (!event.ctrlKey && !event.altKey) {
        switch (event.key.toLowerCase()) {
        case 'f2':   // F2
          event.preventDefault();
          this._switchFPSMeter();
          break;
        case 'f3':   // F3
          event.preventDefault();
          this._switchStretchMode();
          break;
        case 'f4':   // F4
          event.preventDefault();
          this._switchFullScreen();
          break;
        }
      }
    };

    /* --------------------------------------------------------------------
     * - Input.inputMapper (New)                                          -
     * --------------------------------------------------------------------
     */

    /**
     * A hash table to map actions to keys.
     *
     * @static
     * @property inputMapper
     * @type Object
     */
    Input.inputMapper = {};

    /* --------------------------------------------------------------------
     * - Input.initialize (Override)                                      -
     * --------------------------------------------------------------------
     */

    /**
     * Initializes the input system.
     *
     * @static
     * @method initialize
     */
    CoreEssentials.registerFunctionExtension('Input.initialize', function() {
      this.inputMapper = CoreEssentials.deepMerge({}, InputExtender.defaultMapping, this.inputMapper);
      this.resetInputMaps();
  });

    /* --------------------------------------------------------------------
     * - Input.resetInputMaps (New)                                       -
     * --------------------------------------------------------------------
     */

    /**
      * Resets the key mapping and gamepad mapping.
      *
      * @static
      * @method resetInputMaps
      */
    Input.resetInputMaps = function() {
      this.keyMapper = {};
      this.gamepadMapper = {};

      Object.keys(this.inputMapper).forEach((type) => {
        const typeValues = this.inputMapper[type];

        Object.keys(typeValues).forEach((input) => {
          typeValues[input].forEach((key) => {
            this[type + 'Mapper'][key] = input;
          });
        });
      });
    };

    /* --------------------------------------------------------------------
     * - Input._onKeyDown (Override)                                      -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method _onKeyDown
     * @param {KeyboardEvent} event
     * @private
     */
    CoreEssentials.setNoConflict('Input._onKeyDown', Input);
    Input._onKeyDown = function(event) {
      // Retrieves the actual key pressed
      const key = this._getRealKey(event);
      // Prevents the default behaviour on certain keys
      if (this._shouldPreventDefault(key)) {
        event.preventDefault();
      }
      if (key === 'numlock') {
        this.clear();
      }
      const buttonName = this.keyMapper[key];
      if (buttonName) {
        this._currentState[buttonName] = true;
      }
    }

    /* --------------------------------------------------------------------
     * - Input._shouldPreventDefault (Override)                           -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method _shouldPreventDefault
     * @param {String} code
     * @private
     */
    CoreEssentials.setNoConflict('Input._shouldPreventDefault');
    Input._shouldPreventDefault = function(code) {
      return preventDefaultCodes.includes(code);
    };

    /* --------------------------------------------------------------------
     * - Input._onKeyUp (Override)                                        -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method _onKeyUp
     * @param {KeyboardEvent} event
     * @private
     */
    CoreEssentials.setNoConflict('Input._onKeyUp', Input);
    Input._onKeyUp = function(event) {
      const key = this._getRealKey(event);
      const buttonName = this.keyMapper[key];
      if (buttonName) {
          this._currentState[buttonName] = false;
      }
    };

    /* --------------------------------------------------------------------
     * - Input._getRealKey (New)                                          -
     * --------------------------------------------------------------------
     */

    /**
     * Gets the real key.
     *
     * @static
     * @method _getRealKey
     * @param {KeyboardEvent} event
     * @private
     */
    Input._getRealKey = function(event) {
      const code = event.code.toLowerCase();
      if (keysUseCode.includes(code)) {
        return code;
      }
      return event.key.toLowerCase();
    }.bind(Input);

    /* --------------------------------------------------------------------
     * - ConfigManager.inputMapper (New)                                  -
     * --------------------------------------------------------------------
     */
    CoreEssentials.addConfig('inputMapper', 'object', {
      get: function() {
          return Input.inputMapper;
      },
      set: function(value) {
        Input.inputMapper = CoreEssentials.deepMerge({}, InputExtender.defaultMapping, value);
        Input.resetInputMaps();
      },
    });
  })();
})();
