/******************************************************************************
 * CXJ_MZ_FilteredLayer.js                                                    *
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
 * @plugindesc Allows you to add filters to a layer.
 * @author G.A.M. Kertopermono
 * @url https://area91.garycxjk.com/rmmz/plugins/core/core-essentials
 *
 * @help
 * ============================================================================
 * = About                                                                    =
 * ============================================================================
 *
 * This is a special kind of plugin, as it basically does nothing by itself.
 * However, in the background, it allows you to attach filters to layers, and
 * potentially even do other stuff you normally couldn't do with the default
 * layers.
 *
 * This plugin is basically only useful for plugin developers, or as a
 * dependency for plugins.
 *
 * ============================================================================
 * = Placement                                                                =
 * ============================================================================
 *
 * Make sure to place this plugin as high as possible, but possibly below any
 * plugin that alters the Tilemap.Layer object, unless the plugin has written
 * compatibility code for this plugin.
 *
 * ============================================================================
 * = Usage                                                                    =
 * ============================================================================
 *
 * Essentially nothing really changes about your game, unless you've changed
 * the Tilemap.Layer object prototype, in which case you'll need to write
 * hooks to these properties. You can essentially do this by either extending
 * the new Tilemap.Layer object or completely copying the code from this
 * plugin.
 *
 * What the new Tilemap.Layer object does is it wraps the original
 * Tilemap.Layer object in this new object, which essentially is just a
 * PIXI.Container which forwards certain methods to the original object's
 * methods. As PIXI.Container objects can use filters and every child gets
 * affected by filters applied to said container object, you can basically
 * just apply the filter on the container.
 *
 * The new Tilemap.Layer object has a read-only property called
 * isLayerContainer, which will tell you whether the layer is a vanilla layer
 * or the modified layer object. This is especially helpful if you decide
 * to merge the code of this plugin into your own project.
 *
 * If you still need to access the original Layer object, you can do so with
 * Tilemap.Layer.Content.
 *
 * ============================================================================
 * = Changelog                                                                =
 * ============================================================================
 *
 * 1.0 (2020-10-26)
 * ----------------
 *
 * * Initial release.
 *
 * ============================================================================
 * = Compatibility                                                            =
 * ============================================================================
 *
 * This plugin overwrites default functionality. Make sure you check whether or
 * not the plugin is compatible with other plugins by checking which functions
 * they overwrite. Below is the list of methods it overwrites:
 *
 * * Tilemap.Layer
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
  CXJ_MZ.FilteredLayer = CXJ_MZ.FilteredLayer || {};
  CXJ_MZ.FilteredLayer.version = '1.0';

  // Store the original Layer object prototype.
  const LayerContent = Tilemap.Layer;

  // Create a new Layer class that will replace the original.
  class Layer extends PIXI.Container {
    constructor() {
      super();

      // We'll create a dummy object, so that the layer container has a size.
      const dummy = new PIXI.Graphics();
      this._layerContent = new LayerContent();

      dummy.drawRect(0, 0, Graphics.width, Graphics.height);

      this.addChild(dummy);
      this.addChild(this._layerContent);
    }

    addRect(setNumber, sx, sy, dx, dy, w, h) {
      this._layerContent.addRect(setNumber, sx, sy, dx, dy, w, h);
    }

    clear() {
      this._layerContent.clear();
    }

    setBitmaps(bitmaps) {
      this._layerContent.setBitmaps(bitmaps);
    }

    get isTileContainer() {
      return true;
    }

    get x() {
      return this._layerContent.x;
    }

    set x(value) {
      this._layerContent.x = value;
    }

    get y() {
      return this._layerContent.y;
    }

    set y(value) {
      this._layerContent.y = value;
    }

    get z() {
      return this._layerContent.z;
    }

    set z(value) {
      this._layerContent.z = value;
    }
  }

  // Now we'll need to replace the original Layer object prototype
  // with the new Layer class.
  Layer.Content = LayerContent;
  Tilemap.Layer = Layer;

  // Because we're replacing the original, we'll need to copy over
  // some constants.
  Object.keys(LayerContent).forEach((key) => {
    Tilemap.Layer[key] = LayerContent[key];
  });
})();
