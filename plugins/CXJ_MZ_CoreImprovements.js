/******************************************************************************
 * CXJ_MZ_CoreImprovements.js                                                 *
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
 * @plugindesc Core plugin that adds small improvements.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * This plugin might not seem to do much, but it adds some small tweaks to RPG
 * Maker MZ that could improve the experience for both developers and players.
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
 * 1.0 (2020-10-19)
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
 * @param scriptEvent
 * @text Script event tweaks
 *
 * @param scriptEvent.combineMultipleScripts
 * @text Combine multiple script blocks
 * @desc Should the script blocks be interpreted as one block?
 * @parent scriptEvent
 * @type boolean
 * @on Combine
 * @off Don't combine
 * @default true
 *
 * @param scriptEvent.optimizeScriptExecution
 * @text Optimize script execution
 * @desc Should all script blocks be optimized into one function object?
 * @parent scriptEvent
 * @type boolean
 * @on Optimize
 * @off Don't optimize
 * @default true
 *
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.CoreImprovements = CXJ_MZ.CoreImprovements || {};
  CXJ_MZ.CoreImprovements.version = '1.0';

  if (!CXJ_MZ.CoreEssentials) {
    throw new Error('CoreEssentials has not been initialized. Make sure you load CoreEssentials before this plugin.');
  }

  const {
    CoreEssentials,
    CoreImprovements,
  } = CXJ_MZ;

  /* ------------------------------------------------------------------------
   * - Default parameters                                                   -
   * ------------------------------------------------------------------------
   */

  const parameters = CoreEssentials.getParameters('CXJ_MZ_CoreImprovements', {
    'scriptEvent.combineMultipleScripts': true,
    'scriptEvent.optimizeScriptExecution': true,
  }, {
    'scriptEvent.combineMultipleScripts': 'boolean',
    'scriptEvent.optimizeScriptExecution': 'boolean',
  });

  (() => {
    /* --------------------------------------------------------------------
     * - Game_Interpreter.prototype.command355 (Override)                 -
     * --------------------------------------------------------------------
     */

    /**
     * @method command355
     * @private
     */
    CoreEssentials.setNoConflict('Game_Interpreter.prototype.command355');
    Game_Interpreter.prototype.command355 = function() {
      const current = this.currentCommand();
      const optimize = parameters['scriptEvent.optimizeScriptExecution'];
      const combine = parameters['scriptEvent.combineMultipleScripts'];
      let script = `${current.parameters[0]}\n`;
      let count = 0;
      while (this.nextEventCode() === 655 || (
        combine &&
        this.nextEventCode() === 355 &&
        this.currentCommand().parameters[0].trim() !== '//!EOS'
      )) {
        this._index++;
        count++;
        script = `${script}${this.currentCommand().parameters[0]}\n`;
      }
      if (optimize) {
        if (current._reloader) {
          this._index+= current._reloader.count;
        } else {
          current._reloader = {
            count,
            func: new Function(script),
          };
        }
        current._reloader.func.call(this);
      } else {
        eval(script);
      }
    }
  })();
})();
