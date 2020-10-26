/******************************************************************************
 * CXJ_MZ_CoreEssentials.js                                                   *
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
 * @plugindesc Core plugin for all other CXJ_MZ scripts.
 * @author G.A.M. Kertopermono
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * This plugin in itself doesn't do a lot, as it mainly adds common code for
 * other plugins to use. This is script is required for all CXJ_MZ scripts to
 * work properly.
 *
 * ============================================================================
 * = Placement                                                                =
 * ============================================================================
 *
 * Make sure to place this plugin as high as possible, but possibly below any
 * other core plugins by other creators (unless specified otherwise by the
 * plugin), as this plugin might contain compatibility code for other plugins.
 *
 * ============================================================================
 * = Usage                                                                    =
 * ============================================================================
 *
 * This plugin is mainly here to add common code for other CXJ_MZ plugins.
 * However, if you want to use this core plugin as the basis for your own
 * project, an explanation for each function will be provided.
 *
 * Know that because this plugin is MIT licensed, you're free to use (parts of)
 * the code in your own plugins.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.deepMerge(target = {}, ...args)
 *
 * This allows you to deep merge two objects into one. Note that this works
 * differently from the spread operator, as that would result in a shallow merge,
 * meaning, objects within an object won't properly get merged.
 *
 * Example:
 *
 *    const obj1 = {
 *      title: 'Object 1',
 *      attributes: {
 *        color: 'red',
 *      },
 *    };
 *
 *    const obj2 = {
 *      title: 'Object 2',
 *      attributes: {
 *        size: 10,
 *      },
 *    };
 *
 *    const obj3 = {
 *      ...obj1,
 *      ...obj2,
 *      title: 'Object 3',
 *    };
 *
 *    const obj4 = CXJ_MZ.CoreEssentials.deepMerge({}, obj1, obj2, {title: 'Object 4'});
 *
 *
 * In this example, obj3's attributes attribute will only contain size: 10, while obj4
 * will have both color: 'red' and size: 10.
 *
 * Arguments:
 *
 * {object} target  - (optional) The target object.
 * {...object} args - (optional) One or more objects.
 *
 * Returns:
 *
 * The target object. Note that the target object will be altered, so if you want to
 * avoid this, make sure to use an empty object as the target object, as in the
 * example.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.copyObject(obj)
 *
 * This copies an object.
 *
 * It essentially is equivalent to CXJ_MZ.CoreEssentials.deepMerge({}, obj) in that it
 * makes a deep copy of the object.
 *
 * Arguments:
 *
 * {object} obj - The object to copy.
 *
 * Returns:
 *
 * A copy of the object.
 *
 * ---
 *
 * CXJ_MZ.CoreEsentials.findObject(strObj, root = window)
 *
 * A helper function to help you find an object from a string. This is primarily used
 * to find a global object, or an object that's attached to the window object, however,
 * it also allows you to find an object inside another object. In most cases you won't
 * need this helper function, but there are smaller cases where it is needed.
 *
 * Arguments:
 *
 * {string} objStr - A string that points to an object.
 * {object} root   - (optional) The root object.
 *
 * Returns:
 *
 * The requested object.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.isVersion(pluginId, minVersion = null, maxVersion = null)
 *
 * This allows you to check whether a plugin exists, and, optionally, whether the
 * plugin is the right version.
 *
 * The plugin ID is basically a string that points to the object which contains a
 * version attribute, for example, "CXJ_MZ.CoreEssentials" for the CoreEssentials
 * plugin.
 *
 * Arguments:
 *
 * {string} pluginId   - The object that stores the version.
 * {string} minVersion - (optional) The minimum required version.
 * {string} maxVersion - (optional) The maximum required version.
 *
 * Returns:
 *
 * True if the plugin exists and fulfills the version condition, otherwise false.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.simplifyUrl(url)
 *
 * This function simplifies an URL.
 *
 * Technically this isn't entirely needed, as browsers can handle relative URLs just fine.
 * What this does is it processes single and double dots in a URL, with the exception of
 * ones at the beginning of the URL.
 *
 * Example:
 *
 *     console.log(CXJ_MZ.CoreEssentials.simplifyUrl('./img/system/../doodads/./bed.png');
 *     // Returns: ./img/doodads/bed.png
 *
 * Arguments:
 *
 * {string} url - A URL.
 *
 * Returns:
 *
 * A simplified URL.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.setNoConflict(objStr, boundObject = null, storageObject = CXJ_MZ.noConflict)
 *
 * A helper function that keeps an unaltered copy of an object or function.
 *
 * This is mainly useful for when you're overwriting code but still want to keep
 * an unaltered copy of the function or method. This copy will be stored in
 * CXJ_MZ.noConflict.
 *
 * You can also bind an object to a function, if the requested object is a
 * function.
 *
 * Note that this will only store the object once, so if there are multiple calls
 * on the same object, the object will only be stored the first time. You can circumvent
 * this by storing the object in a different storage object.
 *
 * If the object has been altered after being stored first and you want the altered
 * object, the method will return the object as it is now.
 *
 * Example:
 *
 *     CXJ_MZ.CoreEssentials.setNoConflict('PluginManager.parameters', PluginManager);
 *
 * In this example, PluginManager is bound to the parameters method, so that you don't
 * need to use the call method in the future.
 *
 * Arguments:
 *
 * {string} objStr        - The object that needs to be stored in noConflict.
 * {object} boundObject   - (optional) An object that needs to be bound to the function
 *                          (if the object is a function).
 * {object} storageObject - (optional) An object to store the object in.
 *
 * Returns:
 *
 * The requested object as it is now, or null if the object could not be found.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.getNoConflict(objStr, fallbackObject = new Function, storageObject = CXJ_MZ.noConflict)
 *
 * This allows you to retrieve an object or function stored in the noConflict object,
 * or, if you have defined a different storage object, in that object instead.
 *
 * Example:
 *
 *     CXJ_MZ.CoreEssentials.setNoConflict('PluginManager.parameters', PluginManager);
 *     const pmParameters = CXJ_MZ.CoreEssentials.getNoConflict('PluginManager.parameters');
 *     const parameters = pmParameters('CXJ_MZ_CoreEssentials');
 *
 * Arguments:
 *
 * {string} objStr         - The object that needs to be retrieved.
 * {object} fallbackObject - (optional) A fallback object in case the object can't be found.
 * {object} storageObject  - (optional) An object the object is stored in.
 *
 * Returns:
 *
 * The original object, or the fallback object in case it's not found.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.registerFunctionExtension(objStr, callback, prepend = false)
 *
 * Whenever you simply want to execute code before or after the original code
 * has finished, you can use this function to extend the function. The advantage
 * of this helper function is that it prevents the execution stack from getting
 * too stacked. This is especially problematic if you have multiple plugins extending
 * the same code.
 *
 * Arguments:
 *
 * {string} objStr     - The object that needs to be expanded on.
 * {function} callback - The callback to add to the method.
 * {boolean} prepend   - (optional) Whether you want to execute the code before the original.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.processParameters(params, dataTypes)
 *
 * This allows you to process parameters according to certain data rules.
 *
 * The data type rules are stored in an object, using the same structure as
 * parameters. For each parameter, you define the data type, for example, boolean,
 * number or note. In the case of arrays and objects, you need to define an array,
 * with the first item being the type. For arrays, the second item is the data
 * type for each item in the array, for objects, you define the data structure in
 * an object.
 *
 * Valid types are:
 *
 * * text
 * * number
 * * boolean
 * * note
 * * literal
 * * function
 * * array
 * * object
 *
 * The note and literal types are practically the same, the destinction is mostly
 * made to make the code look more clear. Notes are basically just long strings,
 * while literals are keywords like null, true and false.
 *
 * Any invalid type will default back to text.
 *
 * Example:
 *
 *     CXJ_MZ.CoreEssentials.processParameters(params, {
 *       isActive: 'boolean',
 *       gridWidth: 'number',
 *       runCode: 'function,
 *       nameList: ['array', 'text'],
 *       menu: ['object', {
 *         bgColor: 'text',
 *         textColor: 'text',
 *       }],
 *       vehicles: ['array', 'object', {
 *         spriteName: 'text',
 *         spriteNo: 'number',
 *       }],
 *       creditsText: 'note',
 *     });
 *
 * Arguments:
 *
 * {object} params    - The input parameters.
 * {object} dataTypes - The data type rules.
 *
 * Returns:
 *
 * An object containing every parameter, parsed according to the data type rules.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.getParameters(pluginName, defaultParameters = {},
 *                                         dataTypes = {})
 *
 * Retrieves the current plugin's parameters, or falls back to a default set of
 * parameters. It will also automatically parse the data according to a given set
 * of data type rules, if provided. For more information about data type rules,
 * refer to CXJ_MZ.CoreEssentials.processParameters.
 *
 * This will go through several methods to retrieve the parameters, and in theory
 * should work even if the current file is renamed.
 *
 * Arguments:
 *
 * {string} pluginName        - The name of the plugin.
 * {object} defaultParameters - (optional) The default parameters.
 * {object} dataTypes         - (optional) The data type rules.
 *
 * Returns:
 *
 * An object containing every parameter, or defaultParameters if it can't find
 * it.
 *
 * ---
 *
 * CXJ_MZ.CoreEssentials.addConfig(configKey, configType = 'object',
 *                                     properties = {})
 *
 * This allows you to easily add new configuration settings which will be saved
 * with the other configuration settings.
 *
 * Arguments:
 *
 * {string} configKey   - The configuration settings key.
 * {object} configType  - (optional) The configuration settings type. The
 *                        configuration type can either be flag, volume, object
 *                        or a user defined type. This argument essentially tries
 *                        to call a class method corresponding with the
 *                        configType, bydefault these will either be readFlag or
 *                        readVolume. If it can't find a read method, it defaults
 *                        to object.
 * {object} properties  - (optional) Extra properties for the configuration setting.
 *                        These properties are:
 *     {function} get   - A getter.
 *     {function} set   - A setter.
 *     {*} defaultValue - A default value.
 *
 *                        If a getter and setter are missing, it will default
 *                        to storing and reading the value to / from the
 *                        ConfigManager object.
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
 * * ConfigManager.makeData
 * * ConfigManager.applyData
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
 */

(() => {
  window.CXJ_MZ = window.CXJ_MZ || {};
  const {
    CXJ_MZ
  } = window;
  CXJ_MZ.CoreEssentials = CXJ_MZ.CoreEssentials || {};
  CXJ_MZ.CoreEssentials.version = '1.0';
  CXJ_MZ.noConflict = CXJ_MZ.noConflict || {};

  const {
    CoreEssentials,
  } = CXJ_MZ;

  /* ------------------------------------------------------------------------
    * - PRIVATE VARIABLES                                                    -
    * ------------------------------------------------------------------------
    */
  const configSettings = {};
  const registeredFunctionExtensions = {};

  /* --------------------------------------------------------------------------
   * - PRIVATE FUNCTIONS                                                      -
   * -                                                                        -
   * - These are helper functions that aren't meant to be used outside the    -
   * - plugin.                                                                -
   * --------------------------------------------------------------------------
   */

  /**
   * Checks plugin content.
   *
   * @param {object} parameters - The set of parameters to check.
   * @return Whether the plugin parameters are set or not.
   */
  const checkPluginContent = parameters => Object.keys(parameters).length && parameters.constructor === Object;

  /**
   * Checks whether the object is a plain object.
   *
   * @param {object} obj - The object to check.
   * @return {boolean} A boolean that says whether or not the object is a plain object.
   */
  const isPlainObject = (obj) => {
    if (!obj || obj.toString() !== '[object Object]') {
      return false;
    }

    const prototype = Object.getPrototypeOf(obj);

    if (!prototype) {
      return true;
    }

    return Object.prototype.hasOwnProperty.call(prototype, 'constructor')
      && typeof prototype.constructor === 'function'
      && prototype.constructor.toString() === Object.toString();
  };

  /**
   * Merges objects into one target object.
   *
   * @param {object} target - The target object.
   * @param {...object} args - One or more objects.
   * @return {object} The target object.
   */
  const copyObjects = (target = {}, ...args) => {
    // Creates a new variable with target as value, to avoid potential eslint issues
    const newTarget = target;

    // Iterates through each argument to merge with the target
    args.forEach((arg) => {
      // If current argument is empty, skip
      if (arg === null) {
        return;
      }
      // Iterates through each key of the current object
      Object.keys(arg).forEach((key) => {
        const src = arg[key];

        // If the source and target are the same, skip
        if (src === target) {
          return;
        }

        // If the source is undefined, skip
        if (typeof src === 'undefined') {
          return;
        }

        // If the source is an array, make a copy of the array
        if (Array.isArray(src)) {
          newTarget[key] = copyArray(src);
        // If the source is a plain object...
        } else if (isPlainObject(src)) {
          // If the original is an object as well, use that to merge with, otherwise make an empty object
          newTarget[key] = newTarget[key] && isPlainObject(newTarget[key]) ? newTarget[key] : {};
          copyObjects(newTarget[key], src);
        // Otherwise, just set the value
        } else {
          newTarget[key] = src;
        }
      });
    });
    return newTarget;
  };

  /**
   * Copies an array.
   *
   * The copy of the array will have all its item deep copied.
   *
   * @param {array} original - The array to copy.
   * @return {array} A copy of the array.
   */
  const copyArray = (original) => {
    const copy = [];
    original.forEach((value) => {
      if (Array.isArray(value)) {
        copy.push(copyArray(value));
      } else if (isPlainObject.value) {
        copy.push(copyObjects({}, value));
      } else {
        copy.push(value);
      }
    });
    return copy;
  };

  const objStrToObj = (objStr, root = window) => {
    const objStrParts = objStr.split('.');
    let currentObject = root;
    while (objStrParts.length && currentObject) {
      const part = objStrParts.shift();
      currentObject = currentObject[part];
    }

    return currentObject;
  }

  const parseDataType = (value, dataType) => {
    const baseType = Array.isArray(dataType) ? dataType[0] : dataType;

    switch (baseType) {
      case 'boolean':
        return value === 'true';
      case 'number':
        return +value;
      case 'array':
        const arrayValue = JSON.parse(value);
        for (let idx = 0; idx < arrayValue.length; idx++) {
          arrayValue[idx] = parseDataType(arrayValue[idx], dataType.slice(1));
        }
        return arrayValue;
      case 'object':
        const objectValue = JSON.parse(value);
        if (dataType.length > 1 && typeof dataType[1] === 'object' && typeof objectValue === 'object') {
          Object.keys(dataType[1]).forEach((key) => {
            if (!objectValue[key]) {
              return;
            }
            objectValue[key] = parseDataType(objectValue[key], dataType[1][key]);
          });
        }
        return objectValue;
      case 'note':
      case 'literal':
        return JSON.parse(value);
      case 'function':
        return new Function(JSON.parse(value));
      default:
        return value;
    }
  };

  const processParameters = (params, dataTypes) => {
    const processedParams = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (dataTypes[key] && typeof value === 'string') {
        const dataType = dataTypes[key];
        processedParams[key] = parseDataType(value, dataType);
      } else if (!dataTypes[key]) {
        processedParams[key] = value;
      }
    });
    return processedParams;
  };

  const parseParams = (params, defaultParams, dataTypes) => {
    const processedParams = processParameters(params, dataTypes);
    return copyObjects({}, defaultParams, processedParams);
  };

  /* --------------------------------------------------------------------------
   * - Plugin methods                                                         -
   * --------------------------------------------------------------------------
   */

  /**
   * Merges objects into one target object.
   *
   * @param {object} target - The target object.
   * @param {...object} args - One or more objects.
   * @return {object} The target object.
   */
  CoreEssentials.deepMerge = copyObjects;

  /**
   * Deep copies an object.
   *
   * This is equivalent to CXJ_MZ.CoreEssentials.deepMerge({}, obj);
   *
   * @param {object} obj - The object to copy.
   * @return {object} A copy of the object.
   */
  CoreEssentials.copyObject = obj => copyObjects({}, obj);

  /**
   * Copies an array.
   *
   * The copy of the array will have all its item deep copied.
   *
   * @param {array} original - The array to copy.
   * @return {array} A copy of the array.
   */
  CoreEssentials.copyArray = copyArray;

  /**
   * Tries to find an object using a string.
   *
   * This helper function helps you find an object without the use of the
   * eval function, by iterating through a root object, by default the window
   * object.
   *
   * @param {string} objStr - A string that points to an object.
   * @param {objecct} root - (optional) A root object. Defaults to window.
   * @return {object} The requested object.
   */
  CoreEssentials.findObject = objStrToObj;

  /**
   * Checks the version of a plugin.
   * @param {string} pluginId - The plugin identifier.
   * @param {string} minVersion - The minimum version.
   * @param {string} maxVersion - The maximum version.
   * @return {boolean} Whether the plugin exists and if it's the right version.
   */
  CoreEssentials.isVersion = (pluginId, minVersion = null, maxVersion = null) => {
    let pluginVersion = null;

    /*
    First, let's make sure that the pluginId isn't just a version number.
    This is so that one can directly input the version number of a plugin, in case the
    automatic detection doesn't work properly. This also works if the version is prefixed
    with a 'v'.
    */
    if (/^v?\d+(\.\d+)*$/.test(pluginId.toString())) {
      pluginVersion = pluginId.toString().replace(/^v/, '');
    // In any other case we'll assume the plugin ID points to the object of the same name
    } else {
      const currentObject = objStrToObj(pluginId);

      if (currentObject && currentObject !== window && currentObject.version) {
        pluginVersion = currentObject.version.toString();
      }
    }
    // If no plugin version can be found, the plugin probably doesn't exist / isn't loaded
    if (!pluginVersion) {
      return false;
    }
    // Return true when no minimum version is provided (maximum version is ignored)
    if (!minVersion) {
      return true;
    }
    const currentArr = pluginVersion.split('.');
    const minArr = minVersion.toString().split('.');
    const maxArr = maxVersion ? maxVersion.toString().split('.') : null;

    const maxVerLen = Math.max(currentArr.length, minArr.length, maxArr ? maxArr.length : 0);

    for (let idx = 0; idx < maxVerLen; idx++) {
      const curNum = currentArr[idx] || 0;
      const minNum = minArr[idx] || 0;

      if (+curNum < +minNum) {
        return false;
      }
      if (maxArr) {
        const maxNum = maxArr[idx] || 0;
        if (+curNum > +maxNum) {
          return false;
        }
      }
    }
    return true;
  };

  /**
   * Simplifies URLs.
   *
   * Technically this isn't entirely needed, but just in case you would need it. What this
   * does is it processes single and double dots in a URL, with the exception of ones at the
   * beginning of the URL.
   *
   * Example:
   *
   *     console.log(CXJ_MZ.CoreEssentials.simplifyUrl('./img/system/../doodads/./bed.png');
   *     // Returns: ./img/doodads/bed.png
   *
   * @param {string} url - Input URL.
   * @return {string} The simplified URL.
   */
  CoreEssentials.simplifyUrl = (url) => {
    const urlSegments = url.split('/');
    for (let idx = ['', '.'].includes(urlSegments[0]) ? 1 : 0; idx < urlSegments.length; idx++) {
      if (urlSegments[idx] === '.') {
        urlSegments.splice(idx, 1);
        idx = Math.max(0, idx - 2);
      } else if (idx + 1 < urlSegments.length && urlSegments[idx + 1] === '..') {
        urlSegments.splice(idx, 2);
        idx = Math.max(0, idx - 2);
      }
    }
    return urlSegments.join('/');
  };

  /**
   * Allows you to keep an unaltered version of an object or function.
   *
   * This helper allows you to alter certain functionality without completely getting rid of
   * the original code.
   *
   * @param {string} objStr - The object that needs to be stored in noConflict.
   * @param {object} boundObject - An object that needs to be bound to the function (if
   * the object is a function).
   * @param {object} storageObject - An object to store the object in.
   * @return {object} The requested object as it is now, or null if the object could not be found.
   */
  CoreEssentials.setNoConflict = (objStr, boundObject = null, storageObject = CXJ_MZ.noConflict) => {
    const obj = objStrToObj(objStr);

    if (!obj || obj === window) {
      return null;
    }

    const retObj = boundObject && typeof obj === 'function' ? obj.bind(boundObject) : obj;

    if (!storageObject[objStr]) {
      storageObject[objStr] = retObj;
    }

    return retObj;
  }

  /**
   * Retrieves an original copy of a stored object or function.
   *
   * @param {string} objStr - The object that needs to be retrieved.
   * @param {object} fallbackObject - A fallback object in case the object can't be found.
   * @param {object} storageObject - An object the object is stored in.
   * @returns {object} The original object, or the fallback object in case it's not found.
   */
  CoreEssentials.getNoConflict = (objStr, fallbackObject = new Function, storageObject = CXJ_MZ.noConflict) => storageObject[objStr] || fallbackObject;

  /**
   * Allows you to extend a method.
   *
   * @param {string} objStr - The object that needs to be expanded on.
   * @param {function} callback - The callback to add to the method.
   * @param {boolean} prepend - Whether you want to execute the code before the original.
   */
  CoreEssentials.registerFunctionExtension = (objStr, callback, prepend = false) => {
    if (!registeredFunctionExtensions[objStr]) {
      const objSegments = objStr.split('.');
      const objMethod = objSegments.pop();
      const objParent = objStrToObj(objSegments.join('.'));
      const boundObj = objSegments.slice(-1)[0] === 'prototype' ? null : objParent;
      const origMethod = CoreEssentials.setNoConflict(objStr, boundObj);
      if (!origMethod || typeof origMethod !== 'function') {
        return;
      }
      objParent[objMethod] = function(...args) {
        registeredFunctionExtensions[objStr].prepend.forEach((prependMethod) => {
          prependMethod.call(boundObj || this, ...args);
        });

        if (boundObj) {
          origMethod(...args);
        } else {
          origMethod.call(this, ...args);
        }

        registeredFunctionExtensions[objStr].append.forEach((appendMethod) => {
          appendMethod.call(boundObj || this, ...args);
        });
      }
      registeredFunctionExtensions[objStr] = {
        prepend: [],
        append: [],
      };
    }
    registeredFunctionExtensions[objStr][prepend ? 'prepend' : 'append'].push(callback);
  }

  /**
   * Processes parameters according to certain data rules.
   *
   * The data parse rules are stored in an object, using the same structure as parameters.
   * For each parameter, you define the data type, for example, boolean, number or note.
   * In the case of arrays and objects, you need to define an array, with the first item being
   * the type. For arrays, the second item is the data type for each item in the array, for objects,
   * you define the data structure in an object.
   *
   * @param {object} params - Input parameters.
   * @param {object} dataTypes - Data type rules.
   * @return {object} The parsed parameters.
   */
  CoreEssentials.processParameters = processParameters;

  /**
   * Gets the current script's parameters.
   * When the script's name is renamed, it tries various fallbacks before
   * defaulting to the default parameters given.
   *
   * @param {string} pluginName - The name of the plugin.
   * @param {object} defaultParams - Default parameter values.
   * @param {object} dataTypes - Data type rules.
   * @return {object} The requested parameters, parsed according to the data type rules.
   */
  const pmParameters = CoreEssentials.setNoConflict('PluginManager.parameters', PluginManager);
  CoreEssentials.getParameters = (pluginName, defaultParams = {}, dataTypes = {}) => {
    let parameters = pmParameters(pluginName);
    if(checkPluginContent(parameters)) {
      return parseParams(parameters, defaultParams, dataTypes);
    }

    // Use currentScript
    if(document.currentScript) {
      // Retrieves the current script's name, then only takes the part after /plugins/, finally removes the .js extension
      const scriptName = document.currentScript.src.split(/\/plugins\//).slice(-1)[0].replace(/\.js$/, '');
      parameters = pmParameters(scriptName);
      return parseParams(parameters, defaultParams, dataTypes);
    }

    // Iterate through each defined script
    for(let idx = 0; idx < $plugins.length; idx++) {
      const currentPlugin = $plugins[idx];
      const params = currentPlugin.parameters;

      // If the description contains the plugin name, this is the guy
      if(currentPlugin.description.indexOf('<' + pluginName + '>') > -1) {
        return parseParams(params, defaultParams, dataTypes);
      }

      /*
      Check each parameter of the plugin, if all are present in the
      defaultParams parameter, this is the script
      */
      let hasFound = true;
      if(defaultParams) {
          Object.keys(defaultParams).every((key) => {
            if (Object.property.hasOwnProperty.call(params, key)) {
              hasFound = false;
              return false;
            }
            return true;
          });
      }
      if(hasFound) {
        return parseParams(params, defaultParams, dataTypes);
      }
    }

    // Return the default parameters
    return defaultParams;
  };

  /**
   * Sets configuration rules, for settings that should be stored.
   *
   * @param {string} configKey - The configuration key.
   * @param {string} configType - The type of configuration.
   * @param {object} properties - Extra properties for the configuration setting.
   * @param {function} properties.get - The getter.
   * @param {function} properties.set - The setter.
   * @param {*} properties.defaultValue - A default value.
   */
  CoreEssentials.addConfig = (configKey, configType = 'object', properties = {}) => {
    if (!properties.get && !properties.set) {
      ConfigManager[configKey] = properties.defaultValue || null;
    } else {
      Object.defineProperty(ConfigManager, configKey, {
        get: properties.get,
        set: properties.set,
        configurable: true,
      });
    }
    configSettings[configKey] = {
      type: configType,
    };
    if (properties.defaultValue) {
      configSettings[configKey].defaultValue = properties.defaultValue;
    }
  };

  (() => {
    /* --------------------------------------------------------------------
     * - ConfigManager.makeData (Override)                                -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method makeData
     * @private
     */
    const cfgMakeData = CoreEssentials.setNoConflict('ConfigManager.makeData', ConfigManager);
    ConfigManager.makeData = function() {
      const config = cfgMakeData();
      Object.keys(configSettings).forEach((key) => {
        config[key] = this[key];
      });
      return config;
    };

    /* --------------------------------------------------------------------
     * - ConfigManager.applyData (Override)                               -
     * --------------------------------------------------------------------
     */

    /**
     * @static
     * @method makeData
     * @param config
     * @private
     */
    const cfgApplyData = CoreEssentials.setNoConflict('ConfigManager.applyData', ConfigManager);
    ConfigManager.applyData = function(config) {
      cfgApplyData(config);
      Object.keys(configSettings).forEach((key) => {
        const {
          type: configType,
          defaultValue = null,
        } = configSettings[key];
        const method = `read${configType.charAt(0).toUpperCase()}${configType.slice(1)}`;
        if (this[method]) {
          this[key] = this[method](config, key, defaultValue);
        } else {
          this[key] = config[key];
        }
      });
    };
  })();
})();
