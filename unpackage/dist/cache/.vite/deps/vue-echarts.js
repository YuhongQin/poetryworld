import {
  getOptionCategoryInterval,
  hideOverlap,
  makeLabelFormatter,
  prepareLayoutList,
  shiftLayoutOnX,
  shiftLayoutOnY,
  shouldShowAllLabels
} from "./chunk-BUT7J5RS.js";
import "./chunk-PFIX6YTE.js";
import "./chunk-76MPX4BB.js";
import {
  BoundingRect_default,
  DISPLAY_STATES,
  PathProxy_default,
  Path_default,
  Point_default,
  Polyline_default,
  SPECIAL_STATES,
  Transformable_default,
  __export,
  __extends,
  __reExport,
  animateLabelValue,
  applyTransform,
  cubicProjectPoint,
  defaults,
  dist,
  each,
  filter,
  getBoundingRect,
  getECData,
  getPixelPrecision,
  identity,
  indexOf,
  init,
  initProps,
  invert,
  isElementRemoved,
  isFunction,
  keys,
  labelInner,
  lerp,
  linearMap,
  makeInner,
  map,
  max,
  min,
  mul,
  normalizeRadian,
  parsePercent2 as parsePercent,
  quadraticProjectPoint,
  retrieve2,
  round,
  throttle,
  updateProps,
  use,
  windingLine
} from "./chunk-4HBSGC4O.js";

// E:/竞赛/poetryworld/node_modules/vue-demi/lib/index.mjs
var lib_exports = {};
__export(lib_exports, {
  Vue: () => Vue,
  Vue2: () => Vue2,
  del: () => del,
  install: () => install,
  isVue2: () => isVue2,
  isVue3: () => isVue3,
  set: () => set
});
__reExport(lib_exports, vue_star);
import * as Vue from "vue";
import * as vue_star from "vue";
var isVue2 = false;
var isVue3 = true;
var Vue2 = void 0;
function install() {
}
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/coord/axisModelCommonMixin.js
var AxisModelCommonMixin = (
  /** @class */
  function() {
    function AxisModelCommonMixin2() {
    }
    AxisModelCommonMixin2.prototype.getNeedCrossZero = function() {
      var option = this.option;
      return !option.scale;
    };
    AxisModelCommonMixin2.prototype.getCoordSysModel = function() {
      return;
    };
    return AxisModelCommonMixin2;
  }()
);

// E:/竞赛/poetryworld/node_modules/zrender/lib/contain/polygon.js
var EPSILON = 1e-8;
function isAroundEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}
function contain(points, x, y) {
  var w = 0;
  var p = points[0];
  if (!p) {
    return false;
  }
  for (var i = 1; i < points.length; i++) {
    var p2 = points[i];
    w += windingLine(p[0], p[1], p2[0], p2[1], x, y);
    p = p2;
  }
  var p0 = points[0];
  if (!isAroundEqual(p[0], p0[0]) || !isAroundEqual(p[1], p0[1])) {
    w += windingLine(p[0], p[1], p0[0], p0[1], x, y);
  }
  return w !== 0;
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/coord/geo/Region.js
var TMP_TRANSFORM = [];
function transformPoints(points, transform) {
  for (var p = 0; p < points.length; p++) {
    applyTransform(points[p], points[p], transform);
  }
}
function updateBBoxFromPoints(points, min2, max2, projection) {
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    if (projection) {
      p = projection.project(p);
    }
    if (p && isFinite(p[0]) && isFinite(p[1])) {
      min(min2, min2, p);
      max(max2, max2, p);
    }
  }
}
function centroid(points) {
  var signedArea = 0;
  var cx = 0;
  var cy = 0;
  var len = points.length;
  var x0 = points[len - 1][0];
  var y0 = points[len - 1][1];
  for (var i = 0; i < len; i++) {
    var x1 = points[i][0];
    var y1 = points[i][1];
    var a = x0 * y1 - x1 * y0;
    signedArea += a;
    cx += (x0 + x1) * a;
    cy += (y0 + y1) * a;
    x0 = x1;
    y0 = y1;
  }
  return signedArea ? [cx / signedArea / 3, cy / signedArea / 3, signedArea] : [points[0][0] || 0, points[0][1] || 0];
}
var Region = (
  /** @class */
  function() {
    function Region2(name) {
      this.name = name;
    }
    Region2.prototype.setCenter = function(center) {
      this._center = center;
    };
    Region2.prototype.getCenter = function() {
      var center = this._center;
      if (!center) {
        center = this._center = this.calcCenter();
      }
      return center;
    };
    return Region2;
  }()
);
var GeoJSONRegion = (
  /** @class */
  function(_super) {
    __extends(GeoJSONRegion2, _super);
    function GeoJSONRegion2(name, geometries, cp) {
      var _this = _super.call(this, name) || this;
      _this.type = "geoJSON";
      _this.geometries = geometries;
      _this._center = cp && [cp[0], cp[1]];
      return _this;
    }
    GeoJSONRegion2.prototype.calcCenter = function() {
      var geometries = this.geometries;
      var largestGeo;
      var largestGeoSize = 0;
      for (var i = 0; i < geometries.length; i++) {
        var geo = geometries[i];
        var exterior = geo.exterior;
        var size = exterior && exterior.length;
        if (size > largestGeoSize) {
          largestGeo = geo;
          largestGeoSize = size;
        }
      }
      if (largestGeo) {
        return centroid(largestGeo.exterior);
      }
      var rect = this.getBoundingRect();
      return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    };
    GeoJSONRegion2.prototype.getBoundingRect = function(projection) {
      var rect = this._rect;
      if (rect && !projection) {
        return rect;
      }
      var min2 = [Infinity, Infinity];
      var max2 = [-Infinity, -Infinity];
      var geometries = this.geometries;
      each(geometries, function(geo) {
        if (geo.type === "polygon") {
          updateBBoxFromPoints(geo.exterior, min2, max2, projection);
        } else {
          each(geo.points, function(points) {
            updateBBoxFromPoints(points, min2, max2, projection);
          });
        }
      });
      if (!(isFinite(min2[0]) && isFinite(min2[1]) && isFinite(max2[0]) && isFinite(max2[1]))) {
        min2[0] = min2[1] = max2[0] = max2[1] = 0;
      }
      rect = new BoundingRect_default(min2[0], min2[1], max2[0] - min2[0], max2[1] - min2[1]);
      if (!projection) {
        this._rect = rect;
      }
      return rect;
    };
    GeoJSONRegion2.prototype.contain = function(coord) {
      var rect = this.getBoundingRect();
      var geometries = this.geometries;
      if (!rect.contain(coord[0], coord[1])) {
        return false;
      }
      loopGeo:
        for (var i = 0, len = geometries.length; i < len; i++) {
          var geo = geometries[i];
          if (geo.type !== "polygon") {
            continue;
          }
          var exterior = geo.exterior;
          var interiors = geo.interiors;
          if (contain(exterior, coord[0], coord[1])) {
            for (var k = 0; k < (interiors ? interiors.length : 0); k++) {
              if (contain(interiors[k], coord[0], coord[1])) {
                continue loopGeo;
              }
            }
            return true;
          }
        }
      return false;
    };
    GeoJSONRegion2.prototype.transformTo = function(x, y, width, height) {
      var rect = this.getBoundingRect();
      var aspect = rect.width / rect.height;
      if (!width) {
        width = aspect * height;
      } else if (!height) {
        height = width / aspect;
      }
      var target = new BoundingRect_default(x, y, width, height);
      var transform = rect.calculateTransform(target);
      var geometries = this.geometries;
      for (var i = 0; i < geometries.length; i++) {
        var geo = geometries[i];
        if (geo.type === "polygon") {
          transformPoints(geo.exterior, transform);
          each(geo.interiors, function(interior) {
            transformPoints(interior, transform);
          });
        } else {
          each(geo.points, function(points) {
            transformPoints(points, transform);
          });
        }
      }
      rect = this._rect;
      rect.copy(target);
      this._center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    };
    GeoJSONRegion2.prototype.cloneShallow = function(name) {
      name == null && (name = this.name);
      var newRegion = new GeoJSONRegion2(name, this.geometries, this._center);
      newRegion._rect = this._rect;
      newRegion.transformTo = null;
      return newRegion;
    };
    return GeoJSONRegion2;
  }(Region)
);
var GeoSVGRegion = (
  /** @class */
  function(_super) {
    __extends(GeoSVGRegion2, _super);
    function GeoSVGRegion2(name, elOnlyForCalculate) {
      var _this = _super.call(this, name) || this;
      _this.type = "geoSVG";
      _this._elOnlyForCalculate = elOnlyForCalculate;
      return _this;
    }
    GeoSVGRegion2.prototype.calcCenter = function() {
      var el = this._elOnlyForCalculate;
      var rect = el.getBoundingRect();
      var center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
      var mat = identity(TMP_TRANSFORM);
      var target = el;
      while (target && !target.isGeoSVGGraphicRoot) {
        mul(mat, target.getLocalTransform(), mat);
        target = target.parent;
      }
      invert(mat, mat);
      applyTransform(center, center, mat);
      return center;
    };
    return GeoSVGRegion2;
  }(Region)
);

// E:/竞赛/poetryworld/node_modules/echarts/lib/coord/axisTickLabelBuilder.js
var inner = makeInner();
function tickValuesToNumbers(axis, values) {
  var nums = map(values, function(val) {
    return axis.scale.parse(val);
  });
  if (axis.type === "time" && nums.length > 0) {
    nums.sort();
    nums.unshift(nums[0]);
    nums.push(nums[nums.length - 1]);
  }
  return nums;
}
function createAxisLabels(axis) {
  var custom = axis.getLabelModel().get("customValues");
  if (custom) {
    var labelFormatter_1 = makeLabelFormatter(axis);
    return {
      labels: tickValuesToNumbers(axis, custom).map(function(numval) {
        var tick = {
          value: numval
        };
        return {
          formattedLabel: labelFormatter_1(tick),
          rawLabel: axis.scale.getLabel(tick),
          tickValue: numval
        };
      })
    };
  }
  return axis.type === "category" ? makeCategoryLabels(axis) : makeRealNumberLabels(axis);
}
function createAxisTicks(axis, tickModel) {
  var custom = axis.getTickModel().get("customValues");
  if (custom) {
    return {
      ticks: tickValuesToNumbers(axis, custom)
    };
  }
  return axis.type === "category" ? makeCategoryTicks(axis, tickModel) : {
    ticks: map(axis.scale.getTicks(), function(tick) {
      return tick.value;
    })
  };
}
function makeCategoryLabels(axis) {
  var labelModel = axis.getLabelModel();
  var result = makeCategoryLabelsActually(axis, labelModel);
  return !labelModel.get("show") || axis.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: result.labelCategoryInterval
  } : result;
}
function makeCategoryLabelsActually(axis, labelModel) {
  var labelsCache = getListCache(axis, "labels");
  var optionLabelInterval = getOptionCategoryInterval(labelModel);
  var result = listCacheGet(labelsCache, optionLabelInterval);
  if (result) {
    return result;
  }
  var labels;
  var numericLabelInterval;
  if (isFunction(optionLabelInterval)) {
    labels = makeLabelsByCustomizedCategoryInterval(axis, optionLabelInterval);
  } else {
    numericLabelInterval = optionLabelInterval === "auto" ? makeAutoCategoryInterval(axis) : optionLabelInterval;
    labels = makeLabelsByNumericCategoryInterval(axis, numericLabelInterval);
  }
  return listCacheSet(labelsCache, optionLabelInterval, {
    labels,
    labelCategoryInterval: numericLabelInterval
  });
}
function makeCategoryTicks(axis, tickModel) {
  var ticksCache = getListCache(axis, "ticks");
  var optionTickInterval = getOptionCategoryInterval(tickModel);
  var result = listCacheGet(ticksCache, optionTickInterval);
  if (result) {
    return result;
  }
  var ticks;
  var tickCategoryInterval;
  if (!tickModel.get("show") || axis.scale.isBlank()) {
    ticks = [];
  }
  if (isFunction(optionTickInterval)) {
    ticks = makeLabelsByCustomizedCategoryInterval(axis, optionTickInterval, true);
  } else if (optionTickInterval === "auto") {
    var labelsResult = makeCategoryLabelsActually(axis, axis.getLabelModel());
    tickCategoryInterval = labelsResult.labelCategoryInterval;
    ticks = map(labelsResult.labels, function(labelItem) {
      return labelItem.tickValue;
    });
  } else {
    tickCategoryInterval = optionTickInterval;
    ticks = makeLabelsByNumericCategoryInterval(axis, tickCategoryInterval, true);
  }
  return listCacheSet(ticksCache, optionTickInterval, {
    ticks,
    tickCategoryInterval
  });
}
function makeRealNumberLabels(axis) {
  var ticks = axis.scale.getTicks();
  var labelFormatter = makeLabelFormatter(axis);
  return {
    labels: map(ticks, function(tick, idx) {
      return {
        level: tick.level,
        formattedLabel: labelFormatter(tick, idx),
        rawLabel: axis.scale.getLabel(tick),
        tickValue: tick.value
      };
    })
  };
}
function getListCache(axis, prop) {
  return inner(axis)[prop] || (inner(axis)[prop] = []);
}
function listCacheGet(cache, key) {
  for (var i = 0; i < cache.length; i++) {
    if (cache[i].key === key) {
      return cache[i].value;
    }
  }
}
function listCacheSet(cache, key, value) {
  cache.push({
    key,
    value
  });
  return value;
}
function makeAutoCategoryInterval(axis) {
  var result = inner(axis).autoInterval;
  return result != null ? result : inner(axis).autoInterval = axis.calculateCategoryInterval();
}
function calculateCategoryInterval(axis) {
  var params = fetchAutoCategoryIntervalCalculationParams(axis);
  var labelFormatter = makeLabelFormatter(axis);
  var rotation = (params.axisRotate - params.labelRotate) / 180 * Math.PI;
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var tickCount = ordinalScale.count();
  if (ordinalExtent[1] - ordinalExtent[0] < 1) {
    return 0;
  }
  var step = 1;
  if (tickCount > 40) {
    step = Math.max(1, Math.floor(tickCount / 40));
  }
  var tickValue = ordinalExtent[0];
  var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
  var unitW = Math.abs(unitSpan * Math.cos(rotation));
  var unitH = Math.abs(unitSpan * Math.sin(rotation));
  var maxW = 0;
  var maxH = 0;
  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    var width = 0;
    var height = 0;
    var rect = getBoundingRect(labelFormatter({
      value: tickValue
    }), params.font, "center", "top");
    width = rect.width * 1.3;
    height = rect.height * 1.3;
    maxW = Math.max(maxW, width, 7);
    maxH = Math.max(maxH, height, 7);
  }
  var dw = maxW / unitW;
  var dh = maxH / unitH;
  isNaN(dw) && (dw = Infinity);
  isNaN(dh) && (dh = Infinity);
  var interval = Math.max(0, Math.floor(Math.min(dw, dh)));
  var cache = inner(axis.model);
  var axisExtent = axis.getExtent();
  var lastAutoInterval = cache.lastAutoInterval;
  var lastTickCount = cache.lastTickCount;
  if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 && lastAutoInterval > interval && cache.axisExtent0 === axisExtent[0] && cache.axisExtent1 === axisExtent[1]) {
    interval = lastAutoInterval;
  } else {
    cache.lastTickCount = tickCount;
    cache.lastAutoInterval = interval;
    cache.axisExtent0 = axisExtent[0];
    cache.axisExtent1 = axisExtent[1];
  }
  return interval;
}
function fetchAutoCategoryIntervalCalculationParams(axis) {
  var labelModel = axis.getLabelModel();
  return {
    axisRotate: axis.getRotate ? axis.getRotate() : axis.isHorizontal && !axis.isHorizontal() ? 90 : 0,
    labelRotate: labelModel.get("rotate") || 0,
    font: labelModel.getFont()
  };
}
function makeLabelsByNumericCategoryInterval(axis, categoryInterval, onlyTick) {
  var labelFormatter = makeLabelFormatter(axis);
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var labelModel = axis.getLabelModel();
  var result = [];
  var step = Math.max((categoryInterval || 0) + 1, 1);
  var startTick = ordinalExtent[0];
  var tickCount = ordinalScale.count();
  if (startTick !== 0 && step > 1 && tickCount / step > 2) {
    startTick = Math.round(Math.ceil(startTick / step) * step);
  }
  var showAllLabel = shouldShowAllLabels(axis);
  var includeMinLabel = labelModel.get("showMinLabel") || showAllLabel;
  var includeMaxLabel = labelModel.get("showMaxLabel") || showAllLabel;
  if (includeMinLabel && startTick !== ordinalExtent[0]) {
    addItem(ordinalExtent[0]);
  }
  var tickValue = startTick;
  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    addItem(tickValue);
  }
  if (includeMaxLabel && tickValue - step !== ordinalExtent[1]) {
    addItem(ordinalExtent[1]);
  }
  function addItem(tickValue2) {
    var tickObj = {
      value: tickValue2
    };
    result.push(onlyTick ? tickValue2 : {
      formattedLabel: labelFormatter(tickObj),
      rawLabel: ordinalScale.getLabel(tickObj),
      tickValue: tickValue2
    });
  }
  return result;
}
function makeLabelsByCustomizedCategoryInterval(axis, categoryInterval, onlyTick) {
  var ordinalScale = axis.scale;
  var labelFormatter = makeLabelFormatter(axis);
  var result = [];
  each(ordinalScale.getTicks(), function(tick) {
    var rawLabel = ordinalScale.getLabel(tick);
    var tickValue = tick.value;
    if (categoryInterval(tick.value, rawLabel)) {
      result.push(onlyTick ? tickValue : {
        formattedLabel: labelFormatter(tick),
        rawLabel,
        tickValue
      });
    }
  });
  return result;
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/coord/Axis.js
var NORMALIZED_EXTENT = [0, 1];
var Axis = (
  /** @class */
  function() {
    function Axis2(dim, scale, extent) {
      this.onBand = false;
      this.inverse = false;
      this.dim = dim;
      this.scale = scale;
      this._extent = extent || [0, 0];
    }
    Axis2.prototype.contain = function(coord) {
      var extent = this._extent;
      var min2 = Math.min(extent[0], extent[1]);
      var max2 = Math.max(extent[0], extent[1]);
      return coord >= min2 && coord <= max2;
    };
    Axis2.prototype.containData = function(data) {
      return this.scale.contain(data);
    };
    Axis2.prototype.getExtent = function() {
      return this._extent.slice();
    };
    Axis2.prototype.getPixelPrecision = function(dataExtent) {
      return getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent);
    };
    Axis2.prototype.setExtent = function(start, end) {
      var extent = this._extent;
      extent[0] = start;
      extent[1] = end;
    };
    Axis2.prototype.dataToCoord = function(data, clamp) {
      var extent = this._extent;
      var scale = this.scale;
      data = scale.normalize(data);
      if (this.onBand && scale.type === "ordinal") {
        extent = extent.slice();
        fixExtentWithBands(extent, scale.count());
      }
      return linearMap(data, NORMALIZED_EXTENT, extent, clamp);
    };
    Axis2.prototype.coordToData = function(coord, clamp) {
      var extent = this._extent;
      var scale = this.scale;
      if (this.onBand && scale.type === "ordinal") {
        extent = extent.slice();
        fixExtentWithBands(extent, scale.count());
      }
      var t = linearMap(coord, extent, NORMALIZED_EXTENT, clamp);
      return this.scale.scale(t);
    };
    Axis2.prototype.pointToData = function(point, clamp) {
      return;
    };
    Axis2.prototype.getTicksCoords = function(opt) {
      opt = opt || {};
      var tickModel = opt.tickModel || this.getTickModel();
      var result = createAxisTicks(this, tickModel);
      var ticks = result.ticks;
      var ticksCoords = map(ticks, function(tickVal) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(tickVal) : tickVal),
          tickValue: tickVal
        };
      }, this);
      var alignWithLabel = tickModel.get("alignWithLabel");
      fixOnBandTicksCoords(this, ticksCoords, alignWithLabel, opt.clamp);
      return ticksCoords;
    };
    Axis2.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal") {
        return [];
      }
      var minorTickModel = this.model.getModel("minorTick");
      var splitNumber = minorTickModel.get("splitNumber");
      if (!(splitNumber > 0 && splitNumber < 100)) {
        splitNumber = 5;
      }
      var minorTicks = this.scale.getMinorTicks(splitNumber);
      var minorTicksCoords = map(minorTicks, function(minorTicksGroup) {
        return map(minorTicksGroup, function(minorTick) {
          return {
            coord: this.dataToCoord(minorTick),
            tickValue: minorTick
          };
        }, this);
      }, this);
      return minorTicksCoords;
    };
    Axis2.prototype.getViewLabels = function() {
      return createAxisLabels(this).labels;
    };
    Axis2.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    };
    Axis2.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    };
    Axis2.prototype.getBandWidth = function() {
      var axisExtent = this._extent;
      var dataExtent = this.scale.getExtent();
      var len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0);
      len === 0 && (len = 1);
      var size = Math.abs(axisExtent[1] - axisExtent[0]);
      return Math.abs(size) / len;
    };
    Axis2.prototype.calculateCategoryInterval = function() {
      return calculateCategoryInterval(this);
    };
    return Axis2;
  }()
);
function fixExtentWithBands(extent, nTick) {
  var size = extent[1] - extent[0];
  var len = nTick;
  var margin = size / len / 2;
  extent[0] += margin;
  extent[1] -= margin;
}
function fixOnBandTicksCoords(axis, ticksCoords, alignWithLabel, clamp) {
  var ticksLen = ticksCoords.length;
  if (!axis.onBand || alignWithLabel || !ticksLen) {
    return;
  }
  var axisExtent = axis.getExtent();
  var last;
  var diffSize;
  if (ticksLen === 1) {
    ticksCoords[0].coord = axisExtent[0];
    last = ticksCoords[1] = {
      coord: axisExtent[1]
    };
  } else {
    var crossLen = ticksCoords[ticksLen - 1].tickValue - ticksCoords[0].tickValue;
    var shift_1 = (ticksCoords[ticksLen - 1].coord - ticksCoords[0].coord) / crossLen;
    each(ticksCoords, function(ticksItem) {
      ticksItem.coord -= shift_1 / 2;
    });
    var dataExtent = axis.scale.getExtent();
    diffSize = 1 + dataExtent[1] - ticksCoords[ticksLen - 1].tickValue;
    last = {
      coord: ticksCoords[ticksLen - 1].coord + shift_1 * diffSize
    };
    ticksCoords.push(last);
  }
  var inverse = axisExtent[0] > axisExtent[1];
  if (littleThan(ticksCoords[0].coord, axisExtent[0])) {
    clamp ? ticksCoords[0].coord = axisExtent[0] : ticksCoords.shift();
  }
  if (clamp && littleThan(axisExtent[0], ticksCoords[0].coord)) {
    ticksCoords.unshift({
      coord: axisExtent[0]
    });
  }
  if (littleThan(axisExtent[1], last.coord)) {
    clamp ? last.coord = axisExtent[1] : ticksCoords.pop();
  }
  if (clamp && littleThan(last.coord, axisExtent[1])) {
    ticksCoords.push({
      coord: axisExtent[1]
    });
  }
  function littleThan(a, b) {
    a = round(a);
    b = round(b);
    return inverse ? a > b : a < b;
  }
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/label/labelGuideHelper.js
var PI2 = Math.PI * 2;
var CMD = PathProxy_default.CMD;
var DEFAULT_SEARCH_SPACE = ["top", "right", "bottom", "left"];
function getCandidateAnchor(pos, distance, rect, outPt, outDir) {
  var width = rect.width;
  var height = rect.height;
  switch (pos) {
    case "top":
      outPt.set(rect.x + width / 2, rect.y - distance);
      outDir.set(0, -1);
      break;
    case "bottom":
      outPt.set(rect.x + width / 2, rect.y + height + distance);
      outDir.set(0, 1);
      break;
    case "left":
      outPt.set(rect.x - distance, rect.y + height / 2);
      outDir.set(-1, 0);
      break;
    case "right":
      outPt.set(rect.x + width + distance, rect.y + height / 2);
      outDir.set(1, 0);
      break;
  }
}
function projectPointToArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y, out) {
  x -= cx;
  y -= cy;
  var d = Math.sqrt(x * x + y * y);
  x /= d;
  y /= d;
  var ox = x * r + cx;
  var oy = y * r + cy;
  if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI2;
  }
  var angle = Math.atan2(y, x);
  if (angle < 0) {
    angle += PI2;
  }
  if (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) {
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  var x1 = r * Math.cos(startAngle) + cx;
  var y1 = r * Math.sin(startAngle) + cy;
  var x2 = r * Math.cos(endAngle) + cx;
  var y2 = r * Math.sin(endAngle) + cy;
  var d1 = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
  var d2 = (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y);
  if (d1 < d2) {
    out[0] = x1;
    out[1] = y1;
    return Math.sqrt(d1);
  } else {
    out[0] = x2;
    out[1] = y2;
    return Math.sqrt(d2);
  }
}
function projectPointToLine(x1, y1, x2, y2, x, y, out, limitToEnds) {
  var dx = x - x1;
  var dy = y - y1;
  var dx1 = x2 - x1;
  var dy1 = y2 - y1;
  var lineLen = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  dx1 /= lineLen;
  dy1 /= lineLen;
  var projectedLen = dx * dx1 + dy * dy1;
  var t = projectedLen / lineLen;
  if (limitToEnds) {
    t = Math.min(Math.max(t, 0), 1);
  }
  t *= lineLen;
  var ox = out[0] = x1 + t * dx1;
  var oy = out[1] = y1 + t * dy1;
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
function projectPointToRect(x1, y1, width, height, x, y, out) {
  if (width < 0) {
    x1 = x1 + width;
    width = -width;
  }
  if (height < 0) {
    y1 = y1 + height;
    height = -height;
  }
  var x2 = x1 + width;
  var y2 = y1 + height;
  var ox = out[0] = Math.min(Math.max(x, x1), x2);
  var oy = out[1] = Math.min(Math.max(y, y1), y2);
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
var tmpPt = [];
function nearestPointOnRect(pt, rect, out) {
  var dist2 = projectPointToRect(rect.x, rect.y, rect.width, rect.height, pt.x, pt.y, tmpPt);
  out.set(tmpPt[0], tmpPt[1]);
  return dist2;
}
function nearestPointOnPath(pt, path, out) {
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  var x1;
  var y1;
  var minDist = Infinity;
  var data = path.data;
  var x = pt.x;
  var y = pt.y;
  for (var i = 0; i < data.length; ) {
    var cmd = data[i++];
    if (i === 1) {
      xi = data[i];
      yi = data[i + 1];
      x0 = xi;
      y0 = yi;
    }
    var d = minDist;
    switch (cmd) {
      case CMD.M:
        x0 = data[i++];
        y0 = data[i++];
        xi = x0;
        yi = y0;
        break;
      case CMD.L:
        d = projectPointToLine(xi, yi, data[i], data[i + 1], x, y, tmpPt, true);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.C:
        d = cubicProjectPoint(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.Q:
        d = quadraticProjectPoint(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.A:
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        i += 1;
        var anticlockwise = !!(1 - data[i++]);
        x1 = Math.cos(theta) * rx + cx;
        y1 = Math.sin(theta) * ry + cy;
        if (i <= 1) {
          x0 = x1;
          y0 = y1;
        }
        var _x = (x - cx) * ry / rx + cx;
        d = projectPointToArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y, tmpPt);
        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;
      case CMD.R:
        x0 = xi = data[i++];
        y0 = yi = data[i++];
        var width = data[i++];
        var height = data[i++];
        d = projectPointToRect(x0, y0, width, height, x, y, tmpPt);
        break;
      case CMD.Z:
        d = projectPointToLine(xi, yi, x0, y0, x, y, tmpPt, true);
        xi = x0;
        yi = y0;
        break;
    }
    if (d < minDist) {
      minDist = d;
      out.set(tmpPt[0], tmpPt[1]);
    }
  }
  return minDist;
}
var pt0 = new Point_default();
var pt1 = new Point_default();
var pt2 = new Point_default();
var dir = new Point_default();
var dir2 = new Point_default();
function updateLabelLinePoints(target, labelLineModel) {
  if (!target) {
    return;
  }
  var labelLine = target.getTextGuideLine();
  var label = target.getTextContent();
  if (!(label && labelLine)) {
    return;
  }
  var labelGuideConfig = target.textGuideLineConfig || {};
  var points = [[0, 0], [0, 0], [0, 0]];
  var searchSpace = labelGuideConfig.candidates || DEFAULT_SEARCH_SPACE;
  var labelRect = label.getBoundingRect().clone();
  labelRect.applyTransform(label.getComputedTransform());
  var minDist = Infinity;
  var anchorPoint = labelGuideConfig.anchor;
  var targetTransform = target.getComputedTransform();
  var targetInversedTransform = targetTransform && invert([], targetTransform);
  var len = labelLineModel.get("length2") || 0;
  if (anchorPoint) {
    pt2.copy(anchorPoint);
  }
  for (var i = 0; i < searchSpace.length; i++) {
    var candidate = searchSpace[i];
    getCandidateAnchor(candidate, 0, labelRect, pt0, dir);
    Point_default.scaleAndAdd(pt1, pt0, dir, len);
    pt1.transform(targetInversedTransform);
    var boundingRect = target.getBoundingRect();
    var dist2 = anchorPoint ? anchorPoint.distance(pt1) : target instanceof Path_default ? nearestPointOnPath(pt1, target.path, pt2) : nearestPointOnRect(pt1, boundingRect, pt2);
    if (dist2 < minDist) {
      minDist = dist2;
      pt1.transform(targetTransform);
      pt2.transform(targetTransform);
      pt2.toArray(points[0]);
      pt1.toArray(points[1]);
      pt0.toArray(points[2]);
    }
  }
  limitTurnAngle(points, labelLineModel.get("minTurnAngle"));
  labelLine.setShape({
    points
  });
}
var tmpArr = [];
var tmpProjPoint = new Point_default();
function limitTurnAngle(linePoints, minTurnAngle) {
  if (!(minTurnAngle <= 180 && minTurnAngle > 0)) {
    return;
  }
  minTurnAngle = minTurnAngle / 180 * Math.PI;
  pt0.fromArray(linePoints[0]);
  pt1.fromArray(linePoints[1]);
  pt2.fromArray(linePoints[2]);
  Point_default.sub(dir, pt0, pt1);
  Point_default.sub(dir2, pt2, pt1);
  var len1 = dir.len();
  var len2 = dir2.len();
  if (len1 < 1e-3 || len2 < 1e-3) {
    return;
  }
  dir.scale(1 / len1);
  dir2.scale(1 / len2);
  var angleCos = dir.dot(dir2);
  var minTurnAngleCos = Math.cos(minTurnAngle);
  if (minTurnAngleCos < angleCos) {
    var d = projectPointToLine(pt1.x, pt1.y, pt2.x, pt2.y, pt0.x, pt0.y, tmpArr, false);
    tmpProjPoint.fromArray(tmpArr);
    tmpProjPoint.scaleAndAdd(dir2, d / Math.tan(Math.PI - minTurnAngle));
    var t = pt2.x !== pt1.x ? (tmpProjPoint.x - pt1.x) / (pt2.x - pt1.x) : (tmpProjPoint.y - pt1.y) / (pt2.y - pt1.y);
    if (isNaN(t)) {
      return;
    }
    if (t < 0) {
      Point_default.copy(tmpProjPoint, pt1);
    } else if (t > 1) {
      Point_default.copy(tmpProjPoint, pt2);
    }
    tmpProjPoint.toArray(linePoints[1]);
  }
}
function setLabelLineState(labelLine, ignore, stateName, stateModel) {
  var isNormal = stateName === "normal";
  var stateObj = isNormal ? labelLine : labelLine.ensureState(stateName);
  stateObj.ignore = ignore;
  var smooth = stateModel.get("smooth");
  if (smooth && smooth === true) {
    smooth = 0.3;
  }
  stateObj.shape = stateObj.shape || {};
  if (smooth > 0) {
    stateObj.shape.smooth = smooth;
  }
  var styleObj = stateModel.getModel("lineStyle").getLineStyle();
  isNormal ? labelLine.useStyle(styleObj) : stateObj.style = styleObj;
}
function buildLabelLinePath(path, shape) {
  var smooth = shape.smooth;
  var points = shape.points;
  if (!points) {
    return;
  }
  path.moveTo(points[0][0], points[0][1]);
  if (smooth > 0 && points.length >= 3) {
    var len1 = dist(points[0], points[1]);
    var len2 = dist(points[1], points[2]);
    if (!len1 || !len2) {
      path.lineTo(points[1][0], points[1][1]);
      path.lineTo(points[2][0], points[2][1]);
      return;
    }
    var moveLen = Math.min(len1, len2) * smooth;
    var midPoint0 = lerp([], points[1], points[0], moveLen / len1);
    var midPoint2 = lerp([], points[1], points[2], moveLen / len2);
    var midPoint1 = lerp([], midPoint0, midPoint2, 0.5);
    path.bezierCurveTo(midPoint0[0], midPoint0[1], midPoint0[0], midPoint0[1], midPoint1[0], midPoint1[1]);
    path.bezierCurveTo(midPoint2[0], midPoint2[1], midPoint2[0], midPoint2[1], points[2][0], points[2][1]);
  } else {
    for (var i = 1; i < points.length; i++) {
      path.lineTo(points[i][0], points[i][1]);
    }
  }
}
function setLabelLineStyle(targetEl, statesModels, defaultStyle) {
  var labelLine = targetEl.getTextGuideLine();
  var label = targetEl.getTextContent();
  if (!label) {
    if (labelLine) {
      targetEl.removeTextGuideLine();
    }
    return;
  }
  var normalModel = statesModels.normal;
  var showNormal = normalModel.get("show");
  var labelIgnoreNormal = label.ignore;
  for (var i = 0; i < DISPLAY_STATES.length; i++) {
    var stateName = DISPLAY_STATES[i];
    var stateModel = statesModels[stateName];
    var isNormal = stateName === "normal";
    if (stateModel) {
      var stateShow = stateModel.get("show");
      var isLabelIgnored = isNormal ? labelIgnoreNormal : retrieve2(label.states[stateName] && label.states[stateName].ignore, labelIgnoreNormal);
      if (isLabelIgnored || !retrieve2(stateShow, showNormal)) {
        var stateObj = isNormal ? labelLine : labelLine && labelLine.states[stateName];
        if (stateObj) {
          stateObj.ignore = true;
        }
        if (!!labelLine) {
          setLabelLineState(labelLine, true, stateName, stateModel);
        }
        continue;
      }
      if (!labelLine) {
        labelLine = new Polyline_default();
        targetEl.setTextGuideLine(labelLine);
        if (!isNormal && (labelIgnoreNormal || !showNormal)) {
          setLabelLineState(labelLine, true, "normal", statesModels.normal);
        }
        if (targetEl.stateProxy) {
          labelLine.stateProxy = targetEl.stateProxy;
        }
      }
      setLabelLineState(labelLine, false, stateName, stateModel);
    }
  }
  if (labelLine) {
    defaults(labelLine.style, defaultStyle);
    labelLine.style.fill = null;
    var showAbove = normalModel.get("showAbove");
    var labelLineConfig = targetEl.textGuideLineConfig = targetEl.textGuideLineConfig || {};
    labelLineConfig.showAbove = showAbove || false;
    labelLine.buildPath = buildLabelLinePath;
  }
}
function getLabelLineStatesModels(itemModel, labelLineName) {
  labelLineName = labelLineName || "labelLine";
  var statesModels = {
    normal: itemModel.getModel(labelLineName)
  };
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    var stateName = SPECIAL_STATES[i];
    statesModels[stateName] = itemModel.getModel([stateName, labelLineName]);
  }
  return statesModels;
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/label/LabelManager.js
function cloneArr(points) {
  if (points) {
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
      newPoints.push(points[i].slice());
    }
    return newPoints;
  }
}
function prepareLayoutCallbackParams(labelItem, hostEl) {
  var label = labelItem.label;
  var labelLine = hostEl && hostEl.getTextGuideLine();
  return {
    dataIndex: labelItem.dataIndex,
    dataType: labelItem.dataType,
    seriesIndex: labelItem.seriesModel.seriesIndex,
    text: labelItem.label.style.text,
    rect: labelItem.hostRect,
    labelRect: labelItem.rect,
    // x: labelAttr.x,
    // y: labelAttr.y,
    align: label.style.align,
    verticalAlign: label.style.verticalAlign,
    labelLinePoints: cloneArr(labelLine && labelLine.shape.points)
  };
}
var LABEL_OPTION_TO_STYLE_KEYS = ["align", "verticalAlign", "width", "height", "fontSize"];
var dummyTransformable = new Transformable_default();
var labelLayoutInnerStore = makeInner();
var labelLineAnimationStore = makeInner();
function extendWithKeys(target, source, keys2) {
  for (var i = 0; i < keys2.length; i++) {
    var key = keys2[i];
    if (source[key] != null) {
      target[key] = source[key];
    }
  }
}
var LABEL_LAYOUT_PROPS = ["x", "y", "rotation"];
var LabelManager = (
  /** @class */
  function() {
    function LabelManager2() {
      this._labelList = [];
      this._chartViewList = [];
    }
    LabelManager2.prototype.clearLabels = function() {
      this._labelList = [];
      this._chartViewList = [];
    };
    LabelManager2.prototype._addLabel = function(dataIndex, dataType, seriesModel, label, layoutOption) {
      var labelStyle = label.style;
      var hostEl = label.__hostTarget;
      var textConfig = hostEl.textConfig || {};
      var labelTransform = label.getComputedTransform();
      var labelRect = label.getBoundingRect().plain();
      BoundingRect_default.applyTransform(labelRect, labelRect, labelTransform);
      if (labelTransform) {
        dummyTransformable.setLocalTransform(labelTransform);
      } else {
        dummyTransformable.x = dummyTransformable.y = dummyTransformable.rotation = dummyTransformable.originX = dummyTransformable.originY = 0;
        dummyTransformable.scaleX = dummyTransformable.scaleY = 1;
      }
      dummyTransformable.rotation = normalizeRadian(dummyTransformable.rotation);
      var host = label.__hostTarget;
      var hostRect;
      if (host) {
        hostRect = host.getBoundingRect().plain();
        var transform = host.getComputedTransform();
        BoundingRect_default.applyTransform(hostRect, hostRect, transform);
      }
      var labelGuide = hostRect && host.getTextGuideLine();
      this._labelList.push({
        label,
        labelLine: labelGuide,
        seriesModel,
        dataIndex,
        dataType,
        layoutOption,
        computedLayoutOption: null,
        rect: labelRect,
        hostRect,
        // Label with lower priority will be hidden when overlapped
        // Use rect size as default priority
        priority: hostRect ? hostRect.width * hostRect.height : 0,
        // Save default label attributes.
        // For restore if developers want get back to default value in callback.
        defaultAttr: {
          ignore: label.ignore,
          labelGuideIgnore: labelGuide && labelGuide.ignore,
          x: dummyTransformable.x,
          y: dummyTransformable.y,
          scaleX: dummyTransformable.scaleX,
          scaleY: dummyTransformable.scaleY,
          rotation: dummyTransformable.rotation,
          style: {
            x: labelStyle.x,
            y: labelStyle.y,
            align: labelStyle.align,
            verticalAlign: labelStyle.verticalAlign,
            width: labelStyle.width,
            height: labelStyle.height,
            fontSize: labelStyle.fontSize
          },
          cursor: label.cursor,
          attachedPos: textConfig.position,
          attachedRot: textConfig.rotation
        }
      });
    };
    LabelManager2.prototype.addLabelsOfSeries = function(chartView) {
      var _this = this;
      this._chartViewList.push(chartView);
      var seriesModel = chartView.__model;
      var layoutOption = seriesModel.get("labelLayout");
      if (!(isFunction(layoutOption) || keys(layoutOption).length)) {
        return;
      }
      chartView.group.traverse(function(child) {
        if (child.ignore) {
          return true;
        }
        var textEl = child.getTextContent();
        var ecData = getECData(child);
        if (textEl && !textEl.disableLabelLayout) {
          _this._addLabel(ecData.dataIndex, ecData.dataType, seriesModel, textEl, layoutOption);
        }
      });
    };
    LabelManager2.prototype.updateLayoutConfig = function(api) {
      var width = api.getWidth();
      var height = api.getHeight();
      function createDragHandler(el, labelLineModel) {
        return function() {
          updateLabelLinePoints(el, labelLineModel);
        };
      }
      for (var i = 0; i < this._labelList.length; i++) {
        var labelItem = this._labelList[i];
        var label = labelItem.label;
        var hostEl = label.__hostTarget;
        var defaultLabelAttr = labelItem.defaultAttr;
        var layoutOption = void 0;
        if (isFunction(labelItem.layoutOption)) {
          layoutOption = labelItem.layoutOption(prepareLayoutCallbackParams(labelItem, hostEl));
        } else {
          layoutOption = labelItem.layoutOption;
        }
        layoutOption = layoutOption || {};
        labelItem.computedLayoutOption = layoutOption;
        var degreeToRadian = Math.PI / 180;
        if (hostEl) {
          hostEl.setTextConfig({
            // Force to set local false.
            local: false,
            // Ignore position and rotation config on the host el if x or y is changed.
            position: layoutOption.x != null || layoutOption.y != null ? null : defaultLabelAttr.attachedPos,
            // Ignore rotation config on the host el if rotation is changed.
            rotation: layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.attachedRot,
            offset: [layoutOption.dx || 0, layoutOption.dy || 0]
          });
        }
        var needsUpdateLabelLine = false;
        if (layoutOption.x != null) {
          label.x = parsePercent(layoutOption.x, width);
          label.setStyle("x", 0);
          needsUpdateLabelLine = true;
        } else {
          label.x = defaultLabelAttr.x;
          label.setStyle("x", defaultLabelAttr.style.x);
        }
        if (layoutOption.y != null) {
          label.y = parsePercent(layoutOption.y, height);
          label.setStyle("y", 0);
          needsUpdateLabelLine = true;
        } else {
          label.y = defaultLabelAttr.y;
          label.setStyle("y", defaultLabelAttr.style.y);
        }
        if (layoutOption.labelLinePoints) {
          var guideLine = hostEl.getTextGuideLine();
          if (guideLine) {
            guideLine.setShape({
              points: layoutOption.labelLinePoints
            });
            needsUpdateLabelLine = false;
          }
        }
        var labelLayoutStore = labelLayoutInnerStore(label);
        labelLayoutStore.needsUpdateLabelLine = needsUpdateLabelLine;
        label.rotation = layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.rotation;
        label.scaleX = defaultLabelAttr.scaleX;
        label.scaleY = defaultLabelAttr.scaleY;
        for (var k = 0; k < LABEL_OPTION_TO_STYLE_KEYS.length; k++) {
          var key = LABEL_OPTION_TO_STYLE_KEYS[k];
          label.setStyle(key, layoutOption[key] != null ? layoutOption[key] : defaultLabelAttr.style[key]);
        }
        if (layoutOption.draggable) {
          label.draggable = true;
          label.cursor = "move";
          if (hostEl) {
            var hostModel = labelItem.seriesModel;
            if (labelItem.dataIndex != null) {
              var data = labelItem.seriesModel.getData(labelItem.dataType);
              hostModel = data.getItemModel(labelItem.dataIndex);
            }
            label.on("drag", createDragHandler(hostEl, hostModel.getModel("labelLine")));
          }
        } else {
          label.off("drag");
          label.cursor = defaultLabelAttr.cursor;
        }
      }
    };
    LabelManager2.prototype.layout = function(api) {
      var width = api.getWidth();
      var height = api.getHeight();
      var labelList = prepareLayoutList(this._labelList);
      var labelsNeedsAdjustOnX = filter(labelList, function(item) {
        return item.layoutOption.moveOverlap === "shiftX";
      });
      var labelsNeedsAdjustOnY = filter(labelList, function(item) {
        return item.layoutOption.moveOverlap === "shiftY";
      });
      shiftLayoutOnX(labelsNeedsAdjustOnX, 0, width);
      shiftLayoutOnY(labelsNeedsAdjustOnY, 0, height);
      var labelsNeedsHideOverlap = filter(labelList, function(item) {
        return item.layoutOption.hideOverlap;
      });
      hideOverlap(labelsNeedsHideOverlap);
    };
    LabelManager2.prototype.processLabelsOverall = function() {
      var _this = this;
      each(this._chartViewList, function(chartView) {
        var seriesModel = chartView.__model;
        var ignoreLabelLineUpdate = chartView.ignoreLabelLineUpdate;
        var animationEnabled = seriesModel.isAnimationEnabled();
        chartView.group.traverse(function(child) {
          if (child.ignore && !child.forceLabelAnimation) {
            return true;
          }
          var needsUpdateLabelLine = !ignoreLabelLineUpdate;
          var label = child.getTextContent();
          if (!needsUpdateLabelLine && label) {
            needsUpdateLabelLine = labelLayoutInnerStore(label).needsUpdateLabelLine;
          }
          if (needsUpdateLabelLine) {
            _this._updateLabelLine(child, seriesModel);
          }
          if (animationEnabled) {
            _this._animateLabels(child, seriesModel);
          }
        });
      });
    };
    LabelManager2.prototype._updateLabelLine = function(el, seriesModel) {
      var textEl = el.getTextContent();
      var ecData = getECData(el);
      var dataIndex = ecData.dataIndex;
      if (textEl && dataIndex != null) {
        var data = seriesModel.getData(ecData.dataType);
        var itemModel = data.getItemModel(dataIndex);
        var defaultStyle = {};
        var visualStyle = data.getItemVisual(dataIndex, "style");
        if (visualStyle) {
          var visualType = data.getVisual("drawType");
          defaultStyle.stroke = visualStyle[visualType];
        }
        var labelLineModel = itemModel.getModel("labelLine");
        setLabelLineStyle(el, getLabelLineStatesModels(itemModel), defaultStyle);
        updateLabelLinePoints(el, labelLineModel);
      }
    };
    LabelManager2.prototype._animateLabels = function(el, seriesModel) {
      var textEl = el.getTextContent();
      var guideLine = el.getTextGuideLine();
      if (textEl && (el.forceLabelAnimation || !textEl.ignore && !textEl.invisible && !el.disableLabelAnimation && !isElementRemoved(el))) {
        var layoutStore = labelLayoutInnerStore(textEl);
        var oldLayout = layoutStore.oldLayout;
        var ecData = getECData(el);
        var dataIndex = ecData.dataIndex;
        var newProps = {
          x: textEl.x,
          y: textEl.y,
          rotation: textEl.rotation
        };
        var data = seriesModel.getData(ecData.dataType);
        if (!oldLayout) {
          textEl.attr(newProps);
          if (!labelInner(textEl).valueAnimation) {
            var oldOpacity = retrieve2(textEl.style.opacity, 1);
            textEl.style.opacity = 0;
            initProps(textEl, {
              style: {
                opacity: oldOpacity
              }
            }, seriesModel, dataIndex);
          }
        } else {
          textEl.attr(oldLayout);
          var prevStates = el.prevStates;
          if (prevStates) {
            if (indexOf(prevStates, "select") >= 0) {
              textEl.attr(layoutStore.oldLayoutSelect);
            }
            if (indexOf(prevStates, "emphasis") >= 0) {
              textEl.attr(layoutStore.oldLayoutEmphasis);
            }
          }
          updateProps(textEl, newProps, seriesModel, dataIndex);
        }
        layoutStore.oldLayout = newProps;
        if (textEl.states.select) {
          var layoutSelect = layoutStore.oldLayoutSelect = {};
          extendWithKeys(layoutSelect, newProps, LABEL_LAYOUT_PROPS);
          extendWithKeys(layoutSelect, textEl.states.select, LABEL_LAYOUT_PROPS);
        }
        if (textEl.states.emphasis) {
          var layoutEmphasis = layoutStore.oldLayoutEmphasis = {};
          extendWithKeys(layoutEmphasis, newProps, LABEL_LAYOUT_PROPS);
          extendWithKeys(layoutEmphasis, textEl.states.emphasis, LABEL_LAYOUT_PROPS);
        }
        animateLabelValue(textEl, dataIndex, data, seriesModel, seriesModel);
      }
      if (guideLine && !guideLine.ignore && !guideLine.invisible) {
        var layoutStore = labelLineAnimationStore(guideLine);
        var oldLayout = layoutStore.oldLayout;
        var newLayout = {
          points: guideLine.shape.points
        };
        if (!oldLayout) {
          guideLine.setShape(newLayout);
          guideLine.style.strokePercent = 0;
          initProps(guideLine, {
            style: {
              strokePercent: 1
            }
          }, seriesModel);
        } else {
          guideLine.attr({
            shape: oldLayout
          });
          updateProps(guideLine, {
            shape: newLayout
          }, seriesModel);
        }
        layoutStore.oldLayout = newLayout;
      }
    };
    return LabelManager2;
  }()
);
var LabelManager_default = LabelManager;

// E:/竞赛/poetryworld/node_modules/echarts/lib/label/installLabelLayout.js
var getLabelManager = makeInner();
function installLabelLayout(registers) {
  registers.registerUpdateLifecycle("series:beforeupdate", function(ecModel, api, params) {
    var labelManager = getLabelManager(api).labelManager;
    if (!labelManager) {
      labelManager = getLabelManager(api).labelManager = new LabelManager_default();
    }
    labelManager.clearLabels();
  });
  registers.registerUpdateLifecycle("series:layoutlabels", function(ecModel, api, params) {
    var labelManager = getLabelManager(api).labelManager;
    params.updatedSeries.forEach(function(series) {
      labelManager.addLabelsOfSeries(api.getViewOfSeriesModel(series));
    });
    labelManager.updateLayoutConfig(api);
    labelManager.layout(api);
    labelManager.processLabelsOverall();
  });
}

// E:/竞赛/poetryworld/node_modules/echarts/lib/export/core.js
use(installLabelLayout);

// E:/竞赛/poetryworld/node_modules/vue-echarts/dist/index.js
var METHOD_NAMES = [
  "getWidth",
  "getHeight",
  "getDom",
  "getOption",
  "resize",
  "dispatchAction",
  "convertToPixel",
  "convertFromPixel",
  "containPixel",
  "getDataURL",
  "getConnectedDataURL",
  "appendData",
  "clear",
  "isDisposed",
  "dispose"
];
function usePublicAPI(chart) {
  function makePublicMethod(name) {
    return (...args) => {
      if (!chart.value) {
        throw new Error("ECharts is not initialized yet.");
      }
      return chart.value[name].apply(chart.value, args);
    };
  }
  function makePublicMethods() {
    const methods = /* @__PURE__ */ Object.create(null);
    METHOD_NAMES.forEach((name) => {
      methods[name] = makePublicMethod(name);
    });
    return methods;
  }
  return makePublicMethods();
}
function useAutoresize(chart, autoresize, root) {
  (0, lib_exports.watch)(
    [root, chart, autoresize],
    ([root2, chart2, autoresize2], _, onCleanup) => {
      let ro = null;
      if (root2 && chart2 && autoresize2) {
        const { offsetWidth, offsetHeight } = root2;
        const autoresizeOptions = autoresize2 === true ? {} : autoresize2;
        const { throttle: wait = 100, onResize } = autoresizeOptions;
        let initialResizeTriggered = false;
        const callback = () => {
          chart2.resize();
          onResize == null ? void 0 : onResize();
        };
        const resizeCallback = wait ? throttle(callback, wait) : callback;
        ro = new ResizeObserver(() => {
          if (!initialResizeTriggered) {
            initialResizeTriggered = true;
            if (root2.offsetWidth === offsetWidth && root2.offsetHeight === offsetHeight) {
              return;
            }
          }
          resizeCallback();
        });
        ro.observe(root2);
      }
      onCleanup(() => {
        if (ro) {
          ro.disconnect();
          ro = null;
        }
      });
    }
  );
}
var autoresizeProps = {
  autoresize: [Boolean, Object]
};
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
function omitOn(attrs) {
  const result = {};
  for (const key in attrs) {
    if (!isOn(key)) {
      result[key] = attrs[key];
    }
  }
  return result;
}
function unwrapInjected(injection, defaultValue) {
  const value = (0, lib_exports.isRef)(injection) ? (0, lib_exports.unref)(injection) : injection;
  if (value && typeof value === "object" && "value" in value) {
    return value.value || defaultValue;
  }
  return value || defaultValue;
}
var LOADING_OPTIONS_KEY = "ecLoadingOptions";
function useLoading(chart, loading, loadingOptions) {
  const defaultLoadingOptions = (0, lib_exports.inject)(LOADING_OPTIONS_KEY, {});
  const realLoadingOptions = (0, lib_exports.computed)(() => ({
    ...unwrapInjected(defaultLoadingOptions, {}),
    ...loadingOptions == null ? void 0 : loadingOptions.value
  }));
  (0, lib_exports.watchEffect)(() => {
    const instance = chart.value;
    if (!instance) {
      return;
    }
    if (loading.value) {
      instance.showLoading(realLoadingOptions.value);
    } else {
      instance.hideLoading();
    }
  });
}
var loadingProps = {
  loading: Boolean,
  loadingOptions: Object
};
var registered = null;
var TAG_NAME = "x-vue-echarts";
function register() {
  if (registered != null) {
    return registered;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    return registered = false;
  }
  try {
    const reg = new Function(
      "tag",
      // Use esbuild repl to keep build process simple
      // https://esbuild.github.io/try/#dAAwLjIzLjAALS1taW5pZnkAY2xhc3MgRUNoYXJ0c0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgX19kaXNwb3NlID0gbnVsbDsKCiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7CiAgICBpZiAodGhpcy5fX2Rpc3Bvc2UpIHsKICAgICAgdGhpcy5fX2Rpc3Bvc2UoKTsKICAgICAgdGhpcy5fX2Rpc3Bvc2UgPSBudWxsOwogICAgfQogIH0KfQoKaWYgKGN1c3RvbUVsZW1lbnRzLmdldCh0YWcpID09IG51bGwpIHsKICBjdXN0b21FbGVtZW50cy5kZWZpbmUodGFnLCBFQ2hhcnRzRWxlbWVudCk7Cn0K
      "class EChartsElement extends HTMLElement{__dispose=null;disconnectedCallback(){this.__dispose&&(this.__dispose(),this.__dispose=null)}}customElements.get(tag)==null&&customElements.define(tag,EChartsElement);"
    );
    reg(TAG_NAME);
  } catch (e) {
    return registered = false;
  }
  return registered = true;
}
document.head.appendChild(document.createElement("style")).textContent = "x-vue-echarts{display:block;width:100%;height:100%;min-width:0}\n";
var wcRegistered = register();
if (Vue2) {
  Vue2.config.ignoredElements.push(TAG_NAME);
}
var THEME_KEY = "ecTheme";
var INIT_OPTIONS_KEY = "ecInitOptions";
var UPDATE_OPTIONS_KEY = "ecUpdateOptions";
var NATIVE_EVENT_RE = /(^&?~?!?)native:/;
var ECharts = (0, lib_exports.defineComponent)({
  name: "echarts",
  props: {
    option: Object,
    theme: {
      type: [Object, String]
    },
    initOptions: Object,
    updateOptions: Object,
    group: String,
    manualUpdate: Boolean,
    ...autoresizeProps,
    ...loadingProps
  },
  emits: {},
  inheritAttrs: false,
  setup(props, { attrs }) {
    const root = (0, lib_exports.shallowRef)();
    const chart = (0, lib_exports.shallowRef)();
    const manualOption = (0, lib_exports.shallowRef)();
    const defaultTheme = (0, lib_exports.inject)(THEME_KEY, null);
    const defaultInitOptions = (0, lib_exports.inject)(INIT_OPTIONS_KEY, null);
    const defaultUpdateOptions = (0, lib_exports.inject)(UPDATE_OPTIONS_KEY, null);
    const { autoresize, manualUpdate, loading, loadingOptions } = (0, lib_exports.toRefs)(props);
    const realOption = (0, lib_exports.computed)(
      () => manualOption.value || props.option || null
    );
    const realTheme = (0, lib_exports.computed)(
      () => props.theme || unwrapInjected(defaultTheme, {})
    );
    const realInitOptions = (0, lib_exports.computed)(
      () => props.initOptions || unwrapInjected(defaultInitOptions, {})
    );
    const realUpdateOptions = (0, lib_exports.computed)(
      () => props.updateOptions || unwrapInjected(defaultUpdateOptions, {})
    );
    const nonEventAttrs = (0, lib_exports.computed)(() => omitOn(attrs));
    const nativeListeners = {};
    const listeners = (0, lib_exports.getCurrentInstance)().proxy.$listeners;
    const realListeners = {};
    if (!listeners) {
      Object.keys(attrs).filter((key) => isOn(key)).forEach((key) => {
        let event = key.charAt(2).toLowerCase() + key.slice(3);
        if (event.indexOf("native:") === 0) {
          const nativeKey = `on${event.charAt(7).toUpperCase()}${event.slice(
            8
          )}`;
          nativeListeners[nativeKey] = attrs[key];
          return;
        }
        if (event.substring(event.length - 4) === "Once") {
          event = `~${event.substring(0, event.length - 4)}`;
        }
        realListeners[event] = attrs[key];
      });
    } else {
      Object.keys(listeners).forEach((key) => {
        if (NATIVE_EVENT_RE.test(key)) {
          nativeListeners[key.replace(NATIVE_EVENT_RE, "$1")] = listeners[key];
        } else {
          realListeners[key] = listeners[key];
        }
      });
    }
    function init$1(option) {
      if (!root.value) {
        return;
      }
      const instance = chart.value = init(
        root.value,
        realTheme.value,
        realInitOptions.value
      );
      if (props.group) {
        instance.group = props.group;
      }
      Object.keys(realListeners).forEach((key) => {
        let handler = realListeners[key];
        if (!handler) {
          return;
        }
        let event = key.toLowerCase();
        if (event.charAt(0) === "~") {
          event = event.substring(1);
          handler.__once__ = true;
        }
        let target = instance;
        if (event.indexOf("zr:") === 0) {
          target = instance.getZr();
          event = event.substring(3);
        }
        if (handler.__once__) {
          delete handler.__once__;
          const raw = handler;
          handler = (...args) => {
            raw(...args);
            target.off(event, handler);
          };
        }
        target.on(event, handler);
      });
      function resize() {
        if (instance && !instance.isDisposed()) {
          instance.resize();
        }
      }
      function commit() {
        const opt = option || realOption.value;
        if (opt) {
          instance.setOption(opt, realUpdateOptions.value);
        }
      }
      if (autoresize.value) {
        (0, lib_exports.nextTick)(() => {
          resize();
          commit();
        });
      } else {
        commit();
      }
    }
    function setOption(option, updateOptions) {
      if (props.manualUpdate) {
        manualOption.value = option;
      }
      if (!chart.value) {
        init$1(option);
      } else {
        chart.value.setOption(option, updateOptions || {});
      }
    }
    function cleanup() {
      if (chart.value) {
        chart.value.dispose();
        chart.value = void 0;
      }
    }
    let unwatchOption = null;
    (0, lib_exports.watch)(
      manualUpdate,
      (manualUpdate2) => {
        if (typeof unwatchOption === "function") {
          unwatchOption();
          unwatchOption = null;
        }
        if (!manualUpdate2) {
          unwatchOption = (0, lib_exports.watch)(
            () => props.option,
            (option, oldOption) => {
              if (!option) {
                return;
              }
              if (!chart.value) {
                init$1();
              } else {
                chart.value.setOption(option, {
                  // mutating `option` will lead to `notMerge: false` and
                  // replacing it with new reference will lead to `notMerge: true`
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value
                });
              }
            },
            { deep: true }
          );
        }
      },
      {
        immediate: true
      }
    );
    (0, lib_exports.watch)(
      [realTheme, realInitOptions],
      () => {
        cleanup();
        init$1();
      },
      {
        deep: true
      }
    );
    (0, lib_exports.watchEffect)(() => {
      if (props.group && chart.value) {
        chart.value.group = props.group;
      }
    });
    const publicApi = usePublicAPI(chart);
    useLoading(chart, loading, loadingOptions);
    useAutoresize(chart, autoresize, root);
    (0, lib_exports.onMounted)(() => {
      init$1();
    });
    (0, lib_exports.onBeforeUnmount)(() => {
      if (wcRegistered && root.value) {
        root.value.__dispose = cleanup;
      } else {
        cleanup();
      }
    });
    return {
      chart,
      root,
      setOption,
      nonEventAttrs,
      nativeListeners,
      ...publicApi
    };
  },
  render() {
    const attrs = Vue2 ? { attrs: this.nonEventAttrs, on: this.nativeListeners } : { ...this.nonEventAttrs, ...this.nativeListeners };
    attrs.ref = "root";
    attrs.class = attrs.class ? ["echarts"].concat(attrs.class) : "echarts";
    return (0, lib_exports.h)(TAG_NAME, attrs);
  }
});
export {
  INIT_OPTIONS_KEY,
  LOADING_OPTIONS_KEY,
  THEME_KEY,
  UPDATE_OPTIONS_KEY,
  ECharts as default
};
//# sourceMappingURL=vue-echarts.js.map
