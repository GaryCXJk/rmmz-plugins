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
 * ---------------
 * Data management
 * ---------------
 *
 * The data management tweaks are primarily for stand-alone games, as web
 * storage always goes through the browser storage.
 *
 * Save location
 * -------------
 *
 * By default, RPG Maker MZ games store the save file in the application
 * path. This tweak allows you to store it in the data path instead. In
 * NW.js, this path depends on the OS. This also comes with the caveat
 * that you do need to modify the application name in the package.json.
 *
 * There's an additional option that uses the root folder of the data
 * path, since the data path actually directs to a folder within the
 * main folder, for example, on Windows, this path would be
 * %localappdata%/<app-name>/User Data/Default. This extra option would
 * reduce it to %localappdata%/<app-name>. Do note that the regular
 * data path is safer to use, and you're more certain your OS won't
 * reject it.
 *
 * Finally, you can save your saves in the home folder. Files will be stored
 * in a subfolder with the application name.
 *
 * Save folder
 * -----------
 *
 * The default save folder is 'save', which will automatically be made in
 * the save location folder.
 *
 * Save file extension
 * -------------------
 *
 * RPG Maker MZ picks the "rmmzsave" extension as the file extension of
 * choice for save games. However, you might want to change this for your
 * game if you so choose.
 *
 * Configuration settings file name
 * --------------------------------
 *
 * By default, the configuration file is config.rmmzsave, or, if the save
 * file extension has been edited, that extension will be used. However,
 * with this setting, you can define your own config file name. Make sure
 * you however add the extension manually. Leave empty if you want to
 * use the default.
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
 * * StoreManager.fsMkdir
 * * StorageManager.fileDirectoryPath
 * * StorageManager.filePath
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
 * @param dataManagement
 * @text Data management
 *
 * @param dataManagement.saveLocation
 * @text Save location
 * @desc Where the save data should be saved.
 * @parent dataManagement
 * @type select
 * @default app
 * @option Application path
 * @value app
 * @option Data path
 * @value dataPath
 * @option Data path root
 * @value dataPathRoot
 *
 * @param dataManagement.saveFolder
 * @text Save folder
 * @type text
 * @default save
 *
 * @param dataManagement.saveExtension
 * @text Save file extension
 * @type text
 * @default rmmzsave
 *
 * @param dataManagement.configFile
 * @text Configuration settings file name
 * @desc The game settings will be stored and read here.
 * Leave empty for default (config.<Save file extension>).
 * @type text
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
    'dataManagement.saveLocation': 'app',
    'dataManagement.saveFolder': 'save',
    'dataManagement.saveExtension': 'rmmzsave',
    'dataManagement.configFile': '',
    'scriptEvent.combineMultipleScripts': true,
    'scriptEvent.optimizeScriptExecution': true,
  }, {
    'dataManagement.saveLocation': 'text',
    'dataManagement.saveFolder': 'text',
    'dataManagement.saveExtension': 'text',
    'dataManagement.configFile': 'text',
    'scriptEvent.combineMultipleScripts': 'boolean',
    'scriptEvent.optimizeScriptExecution': 'boolean',
  });

  (() => {

    /* --------------------------------------------------------------------
     * - StoreManager.fsMkdir (Override)                                  -
     * --------------------------------------------------------------------
     */

    CoreEssentials.setNoConflict('StoreManager.fsMkdir');
    StorageManager.fsMkdir = function(path) {
      const fs = require('fs');
      if (!fs.existsSync(path)) {
        // Ensures that folders are created recursively.
        fs.mkdirSync(path, {
          recursive: true,
        });
      }
    };

    /* --------------------------------------------------------------------
     * - StorageManager.fileDirectoryPath (Override)                      -
     * --------------------------------------------------------------------
     */

    CoreEssentials.setNoConflict('StorageManager.fileDirectoryPath');
    StorageManager.fileDirectoryPath = function() {
      const path = require('path');
      const os = require('os');
      let base = '';
      const saveLocation = parameters['dataManagement.saveLocation'];
      // We'll need to make sure there's a trailing slash in the path name.
      const saveFolder = parameters['dataManagement.saveFolder'].replace(/[\\\/]*$/, '/');
      const appName = nw.App.manifest.name;
      switch (saveLocation) {
        case 'dataPath':
          base = nw.App.basePath;
          break;
        case 'dataPathRoot':
          base = nw.App.basePath;
          base = base.slice(0, base.indexOf(appName) + appName.length);
          break;
        case 'home':
          base = path.join(os.homedir(), appName);
        case 'app':
        default:
          base = global.__dirname;
          break;
      }
      return path.join(base, saveFolder);
    };

    /* --------------------------------------------------------------------
     * - StorageManager.filePath (Override)                               -
     * --------------------------------------------------------------------
     */

    CoreEssentials.setNoConflict('StorageManager.filePath');
    StorageManager.filePath = function(saveName) {
      const dir = this.fileDirectoryPath();
      const ext = parameters['dataManagement.saveExtension'].replace(/^\.*/, '.');
      const saveFile = parameters[`dataManagement.${saveName}File`] || `${saveName}${ext}`;
      return `${dir}${saveFile}`;
    };

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
