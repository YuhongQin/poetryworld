import {
  install,
  install2
} from "./chunk-HZRHYTT2.js";
import {
  extendChartView,
  extendSeriesModel,
  format_exports,
  graphic_exports,
  helper_exports,
  installLabelLayout,
  number_exports,
  util_exports
} from "./chunk-DJHXIVHW.js";
import {
  SeriesData_default
} from "./chunk-NURO7GMT.js";
import "./chunk-ZUGBGGFC.js";
import "./chunk-GO2JNPCO.js";
import {
  registerLayout,
  registerPreprocessor,
  use
} from "./chunk-RRA2ZF5S.js";
import "./chunk-F5QR3K72.js";

// C:/Users/14276/Desktop/个人事务/Mobile-PoetryWorld_front-main/Mobile-PoetryWorld_front-main/mym_app/node_modules/echarts/lib/echarts.js
use([install, install2]);
use(installLabelLayout);

// C:/Users/14276/Desktop/个人事务/Mobile-PoetryWorld_front-main/Mobile-PoetryWorld_front-main/mym_app/node_modules/echarts-wordcloud/src/WordCloudSeries.js
extendSeriesModel({
  type: "series.wordCloud",
  visualStyleAccessPath: "textStyle",
  visualStyleMapper: function(model) {
    return {
      fill: model.get("color")
    };
  },
  visualDrawType: "fill",
  optionUpdated: function() {
    var option = this.option;
    option.gridSize = Math.max(Math.floor(option.gridSize), 4);
  },
  getInitialData: function(option, ecModel) {
    var dimensions = helper_exports.createDimensions(option.data, {
      coordDimensions: ["value"]
    });
    var list = new SeriesData_default(dimensions, this);
    list.initData(option.data);
    return list;
  },
  // Most of options are from https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md
  defaultOption: {
    maskImage: null,
    // Shape can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
    shape: "circle",
    keepAspect: false,
    left: "center",
    top: "center",
    width: "70%",
    height: "80%",
    sizeRange: [12, 60],
    rotationRange: [-90, 90],
    rotationStep: 45,
    gridSize: 8,
    drawOutOfBound: false,
    shrinkToFit: false,
    textStyle: {
      fontWeight: "normal"
    }
  }
});

// C:/Users/14276/Desktop/个人事务/Mobile-PoetryWorld_front-main/Mobile-PoetryWorld_front-main/mym_app/node_modules/echarts-wordcloud/src/WordCloudView.js
extendChartView({
  type: "wordCloud",
  render: function(seriesModel, ecModel, api) {
    var group = this.group;
    group.removeAll();
    var data = seriesModel.getData();
    var gridSize = seriesModel.get("gridSize");
    seriesModel.layoutInstance.ondraw = function(text, size, dataIdx, drawn) {
      var itemModel = data.getItemModel(dataIdx);
      var textStyleModel = itemModel.getModel("textStyle");
      var textEl = new graphic_exports.Text({
        style: helper_exports.createTextStyle(textStyleModel),
        scaleX: 1 / drawn.info.mu,
        scaleY: 1 / drawn.info.mu,
        x: (drawn.gx + drawn.info.gw / 2) * gridSize,
        y: (drawn.gy + drawn.info.gh / 2) * gridSize,
        rotation: drawn.rot
      });
      textEl.setStyle({
        x: drawn.info.fillTextOffsetX,
        y: drawn.info.fillTextOffsetY + size * 0.5,
        text,
        verticalAlign: "middle",
        fill: data.getItemVisual(dataIdx, "style").fill,
        fontSize: size
      });
      group.add(textEl);
      data.setItemGraphicEl(dataIdx, textEl);
      textEl.ensureState("emphasis").style = helper_exports.createTextStyle(
        itemModel.getModel(["emphasis", "textStyle"]),
        {
          state: "emphasis"
        }
      );
      textEl.ensureState("blur").style = helper_exports.createTextStyle(
        itemModel.getModel(["blur", "textStyle"]),
        {
          state: "blur"
        }
      );
      helper_exports.enableHoverEmphasis(
        textEl,
        itemModel.get(["emphasis", "focus"]),
        itemModel.get(["emphasis", "blurScope"])
      );
      textEl.stateTransition = {
        duration: seriesModel.get("animation") ? seriesModel.get(["stateAnimation", "duration"]) : 0,
        easing: seriesModel.get(["stateAnimation", "easing"])
      };
      textEl.__highDownDispatcher = true;
    };
    this._model = seriesModel;
  },
  remove: function() {
    this.group.removeAll();
    this._model.layoutInstance.dispose();
  },
  dispose: function() {
    this._model.layoutInstance.dispose();
  }
});

// C:/Users/14276/Desktop/个人事务/Mobile-PoetryWorld_front-main/Mobile-PoetryWorld_front-main/mym_app/node_modules/echarts-wordcloud/src/layout.js
if (!window.setImmediate) {
  window.setImmediate = function setupSetImmediate() {
    return window.msSetImmediate || window.webkitSetImmediate || window.mozSetImmediate || window.oSetImmediate || function setupSetZeroTimeout() {
      if (!window.postMessage || !window.addEventListener) {
        return null;
      }
      var callbacks = [void 0];
      var message = "zero-timeout-message";
      var setZeroTimeout = function setZeroTimeout2(callback) {
        var id = callbacks.length;
        callbacks.push(callback);
        window.postMessage(message + id.toString(36), "*");
        return id;
      };
      window.addEventListener(
        "message",
        function setZeroTimeoutMessage(evt) {
          if (typeof evt.data !== "string" || evt.data.substr(0, message.length) !== message) {
            return;
          }
          evt.stopImmediatePropagation();
          var id = parseInt(evt.data.substr(message.length), 36);
          if (!callbacks[id]) {
            return;
          }
          callbacks[id]();
          callbacks[id] = void 0;
        },
        true
      );
      window.clearImmediate = function clearZeroTimeout(id) {
        if (!callbacks[id]) {
          return;
        }
        callbacks[id] = void 0;
      };
      return setZeroTimeout;
    }() || // fallback
    function setImmediateFallback(fn) {
      window.setTimeout(fn, 0);
    };
  }();
}
if (!window.clearImmediate) {
  window.clearImmediate = function setupClearImmediate() {
    return window.msClearImmediate || window.webkitClearImmediate || window.mozClearImmediate || window.oClearImmediate || // "clearZeroTimeout" is implement on the previous block ||
    // fallback
    function clearImmediateFallback(timer2) {
      window.clearTimeout(timer2);
    };
  }();
}
var isSupported = function isSupported2() {
  var canvas = document.createElement("canvas");
  if (!canvas || !canvas.getContext) {
    return false;
  }
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  if (!ctx.getImageData) {
    return false;
  }
  if (!ctx.fillText) {
    return false;
  }
  if (!Array.prototype.some) {
    return false;
  }
  if (!Array.prototype.push) {
    return false;
  }
  return true;
}();
var minFontSize = function getMinFontSize() {
  if (!isSupported) {
    return;
  }
  var ctx = document.createElement("canvas").getContext("2d");
  var size = 20;
  var hanWidth, mWidth;
  while (size) {
    ctx.font = size.toString(10) + "px sans-serif";
    if (ctx.measureText("Ｗ").width === hanWidth && ctx.measureText("m").width === mWidth) {
      return size + 1;
    }
    hanWidth = ctx.measureText("Ｗ").width;
    mWidth = ctx.measureText("m").width;
    size--;
  }
  return 0;
}();
var getItemExtraData = function(item) {
  if (Array.isArray(item)) {
    var itemCopy = item.slice();
    itemCopy.splice(0, 2);
    return itemCopy;
  } else {
    return [];
  }
};
var shuffleArray = function shuffleArray2(arr) {
  for (var j, x, i = arr.length; i; ) {
    j = Math.floor(Math.random() * i);
    x = arr[--i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};
var timer = {};
var WordCloud = function WordCloud2(elements, options) {
  if (!isSupported) {
    return;
  }
  var timerId = Math.floor(Math.random() * Date.now());
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  elements.forEach(function(el, i) {
    if (typeof el === "string") {
      elements[i] = document.getElementById(el);
      if (!elements[i]) {
        throw new Error("The element id specified is not found.");
      }
    } else if (!el.tagName && !el.appendChild) {
      throw new Error(
        "You must pass valid HTML elements, or ID of the element."
      );
    }
  });
  var settings = {
    list: [],
    fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',
    fontWeight: "normal",
    color: "random-dark",
    minSize: 0,
    // 0 to disable
    weightFactor: 1,
    clearCanvas: true,
    backgroundColor: "#fff",
    // opaque white = rgba(255, 255, 255, 1)
    gridSize: 8,
    drawOutOfBound: false,
    shrinkToFit: false,
    origin: null,
    drawMask: false,
    maskColor: "rgba(255,0,0,0.3)",
    maskGapWidth: 0.3,
    layoutAnimation: true,
    wait: 0,
    abortThreshold: 0,
    // disabled
    abort: function noop() {
    },
    minRotation: -Math.PI / 2,
    maxRotation: Math.PI / 2,
    rotationStep: 0.1,
    shuffle: true,
    rotateRatio: 0.1,
    shape: "circle",
    ellipticity: 0.65,
    classes: null,
    hover: null,
    click: null
  };
  if (options) {
    for (var key in options) {
      if (key in settings) {
        settings[key] = options[key];
      }
    }
  }
  if (typeof settings.weightFactor !== "function") {
    var factor = settings.weightFactor;
    settings.weightFactor = function weightFactor(pt) {
      return pt * factor;
    };
  }
  if (typeof settings.shape !== "function") {
    switch (settings.shape) {
      case "circle":
      default:
        settings.shape = "circle";
        break;
      case "cardioid":
        settings.shape = function shapeCardioid(theta) {
          return 1 - Math.sin(theta);
        };
        break;
      case "diamond":
        settings.shape = function shapeSquare(theta) {
          var thetaPrime = theta % (2 * Math.PI / 4);
          return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
        };
        break;
      case "square":
        settings.shape = function shapeSquare(theta) {
          return Math.min(
            1 / Math.abs(Math.cos(theta)),
            1 / Math.abs(Math.sin(theta))
          );
        };
        break;
      case "triangle-forward":
        settings.shape = function shapeTriangle(theta) {
          var thetaPrime = theta % (2 * Math.PI / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;
      case "triangle":
      case "triangle-upright":
        settings.shape = function shapeTriangle(theta) {
          var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;
      case "pentagon":
        settings.shape = function shapePentagon(theta) {
          var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
          return 1 / (Math.cos(thetaPrime) + 0.726543 * Math.sin(thetaPrime));
        };
        break;
      case "star":
        settings.shape = function shapeStar(theta) {
          var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
          if ((theta + 0.955) % (2 * Math.PI / 5) - 2 * Math.PI / 10 >= 0) {
            return 1 / (Math.cos(2 * Math.PI / 10 - thetaPrime) + 3.07768 * Math.sin(2 * Math.PI / 10 - thetaPrime));
          } else {
            return 1 / (Math.cos(thetaPrime) + 3.07768 * Math.sin(thetaPrime));
          }
        };
        break;
    }
  }
  settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);
  var g = settings.gridSize;
  var maskRectWidth = g - settings.maskGapWidth;
  var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
  var minRotation = Math.min(settings.maxRotation, settings.minRotation);
  var rotationStep = settings.rotationStep;
  var grid, ngx, ngy, center, maxRadius;
  var escapeTime;
  var getTextColor;
  function randomHslColor(min, max) {
    return "hsl(" + (Math.random() * 360).toFixed() + "," + (Math.random() * 30 + 70).toFixed() + "%," + (Math.random() * (max - min) + min).toFixed() + "%)";
  }
  switch (settings.color) {
    case "random-dark":
      getTextColor = function getRandomDarkColor() {
        return randomHslColor(10, 50);
      };
      break;
    case "random-light":
      getTextColor = function getRandomLightColor() {
        return randomHslColor(50, 90);
      };
      break;
    default:
      if (typeof settings.color === "function") {
        getTextColor = settings.color;
      }
      break;
  }
  var getTextFontWeight;
  if (typeof settings.fontWeight === "function") {
    getTextFontWeight = settings.fontWeight;
  }
  var getTextClasses = null;
  if (typeof settings.classes === "function") {
    getTextClasses = settings.classes;
  }
  var interactive = false;
  var infoGrid = [];
  var hovered;
  var getInfoGridFromMouseTouchEvent = function getInfoGridFromMouseTouchEvent2(evt) {
    var canvas = evt.currentTarget;
    var rect = canvas.getBoundingClientRect();
    var clientX;
    var clientY;
    if (evt.touches) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    var eventX = clientX - rect.left;
    var eventY = clientY - rect.top;
    var x = Math.floor(eventX * (canvas.width / rect.width || 1) / g);
    var y = Math.floor(eventY * (canvas.height / rect.height || 1) / g);
    if (!infoGrid[x]) {
      return null;
    }
    return infoGrid[x][y];
  };
  var wordcloudhover = function wordcloudhover2(evt) {
    var info = getInfoGridFromMouseTouchEvent(evt);
    if (hovered === info) {
      return;
    }
    hovered = info;
    if (!info) {
      settings.hover(void 0, void 0, evt);
      return;
    }
    settings.hover(info.item, info.dimension, evt);
  };
  var wordcloudclick = function wordcloudclick2(evt) {
    var info = getInfoGridFromMouseTouchEvent(evt);
    if (!info) {
      return;
    }
    settings.click(info.item, info.dimension, evt);
    evt.preventDefault();
  };
  var pointsAtRadius = [];
  var getPointsAtRadius = function getPointsAtRadius2(radius) {
    if (pointsAtRadius[radius]) {
      return pointsAtRadius[radius];
    }
    var T = radius * 8;
    var t = T;
    var points = [];
    if (radius === 0) {
      points.push([center[0], center[1], 0]);
    }
    while (t--) {
      var rx = 1;
      if (settings.shape !== "circle") {
        rx = settings.shape(t / T * 2 * Math.PI);
      }
      points.push([
        center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),
        center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) * settings.ellipticity,
        t / T * 2 * Math.PI
      ]);
    }
    pointsAtRadius[radius] = points;
    return points;
  };
  var exceedTime = function exceedTime2() {
    return settings.abortThreshold > 0 && (/* @__PURE__ */ new Date()).getTime() - escapeTime > settings.abortThreshold;
  };
  var getRotateDeg = function getRotateDeg2() {
    if (settings.rotateRatio === 0) {
      return 0;
    }
    if (Math.random() > settings.rotateRatio) {
      return 0;
    }
    if (rotationRange === 0) {
      return minRotation;
    }
    return minRotation + Math.round(Math.random() * rotationRange / rotationStep) * rotationStep;
  };
  var getTextInfo = function getTextInfo2(word, weight, rotateDeg, extraDataArray) {
    var debug = false;
    var fontSize = settings.weightFactor(weight);
    if (fontSize <= settings.minSize) {
      return false;
    }
    var mu = 1;
    if (fontSize < minFontSize) {
      mu = function calculateScaleFactor() {
        var mu2 = 2;
        while (mu2 * fontSize < minFontSize) {
          mu2 += 2;
        }
        return mu2;
      }();
    }
    var fontWeight;
    if (getTextFontWeight) {
      fontWeight = getTextFontWeight(word, weight, fontSize, extraDataArray);
    } else {
      fontWeight = settings.fontWeight;
    }
    var fcanvas = document.createElement("canvas");
    var fctx = fcanvas.getContext("2d", { willReadFrequently: true });
    fctx.font = fontWeight + " " + (fontSize * mu).toString(10) + "px " + settings.fontFamily;
    var fw = fctx.measureText(word).width / mu;
    var fh = Math.max(
      fontSize * mu,
      fctx.measureText("m").width,
      fctx.measureText("Ｗ").width
    ) / mu;
    var boxWidth = fw + fh * 2;
    var boxHeight = fh * 3;
    var fgw = Math.ceil(boxWidth / g);
    var fgh = Math.ceil(boxHeight / g);
    boxWidth = fgw * g;
    boxHeight = fgh * g;
    var fillTextOffsetX = -fw / 2;
    var fillTextOffsetY = -fh * 0.4;
    var cgh = Math.ceil(
      (boxWidth * Math.abs(Math.sin(rotateDeg)) + boxHeight * Math.abs(Math.cos(rotateDeg))) / g
    );
    var cgw = Math.ceil(
      (boxWidth * Math.abs(Math.cos(rotateDeg)) + boxHeight * Math.abs(Math.sin(rotateDeg))) / g
    );
    var width = cgw * g;
    var height = cgh * g;
    fcanvas.setAttribute("width", width);
    fcanvas.setAttribute("height", height);
    if (debug) {
      document.body.appendChild(fcanvas);
      fctx.save();
    }
    fctx.scale(1 / mu, 1 / mu);
    fctx.translate(width * mu / 2, height * mu / 2);
    fctx.rotate(-rotateDeg);
    fctx.font = fontWeight + " " + (fontSize * mu).toString(10) + "px " + settings.fontFamily;
    fctx.fillStyle = "#000";
    fctx.textBaseline = "middle";
    fctx.fillText(
      word,
      fillTextOffsetX * mu,
      (fillTextOffsetY + fontSize * 0.5) * mu
    );
    var imageData = fctx.getImageData(0, 0, width, height).data;
    if (exceedTime()) {
      return false;
    }
    if (debug) {
      fctx.strokeRect(fillTextOffsetX * mu, fillTextOffsetY, fw * mu, fh * mu);
      fctx.restore();
    }
    var occupied = [];
    var gx = cgw;
    var gy, x, y;
    var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
    while (gx--) {
      gy = cgh;
      while (gy--) {
        y = g;
        singleGridLoop:
          while (y--) {
            x = g;
            while (x--) {
              if (imageData[((gy * g + y) * width + (gx * g + x)) * 4 + 3]) {
                occupied.push([gx, gy]);
                if (gx < bounds[3]) {
                  bounds[3] = gx;
                }
                if (gx > bounds[1]) {
                  bounds[1] = gx;
                }
                if (gy < bounds[0]) {
                  bounds[0] = gy;
                }
                if (gy > bounds[2]) {
                  bounds[2] = gy;
                }
                if (debug) {
                  fctx.fillStyle = "rgba(255, 0, 0, 0.5)";
                  fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
                }
                break singleGridLoop;
              }
            }
          }
        if (debug) {
          fctx.fillStyle = "rgba(0, 0, 255, 0.5)";
          fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
        }
      }
    }
    if (debug) {
      fctx.fillStyle = "rgba(0, 255, 0, 0.5)";
      fctx.fillRect(
        bounds[3] * g,
        bounds[0] * g,
        (bounds[1] - bounds[3] + 1) * g,
        (bounds[2] - bounds[0] + 1) * g
      );
    }
    return {
      mu,
      occupied,
      bounds,
      gw: cgw,
      gh: cgh,
      fillTextOffsetX,
      fillTextOffsetY,
      fillTextWidth: fw,
      fillTextHeight: fh,
      fontSize
    };
  };
  var canFitText = function canFitText2(gx, gy, gw, gh, occupied) {
    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];
      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        if (!settings.drawOutOfBound) {
          return false;
        }
        continue;
      }
      if (!grid[px][py]) {
        return false;
      }
    }
    return true;
  };
  var drawText = function drawText2(gx, gy, info, word, weight, distance, theta, rotateDeg, attributes, extraDataArray) {
    var fontSize = info.fontSize;
    var color;
    if (getTextColor) {
      color = getTextColor(
        word,
        weight,
        fontSize,
        distance,
        theta,
        extraDataArray
      );
    } else {
      color = settings.color;
    }
    var fontWeight;
    if (getTextFontWeight) {
      fontWeight = getTextFontWeight(word, weight, fontSize, extraDataArray);
    } else {
      fontWeight = settings.fontWeight;
    }
    var classes;
    if (getTextClasses) {
      classes = getTextClasses(word, weight, fontSize, extraDataArray);
    } else {
      classes = settings.classes;
    }
    elements.forEach(function(el) {
      if (el.getContext) {
        var ctx = el.getContext("2d");
        var mu = info.mu;
        ctx.save();
        ctx.scale(1 / mu, 1 / mu);
        ctx.font = fontWeight + " " + (fontSize * mu).toString(10) + "px " + settings.fontFamily;
        ctx.fillStyle = color;
        ctx.translate((gx + info.gw / 2) * g * mu, (gy + info.gh / 2) * g * mu);
        if (rotateDeg !== 0) {
          ctx.rotate(-rotateDeg);
        }
        ctx.textBaseline = "middle";
        ctx.fillText(
          word,
          info.fillTextOffsetX * mu,
          (info.fillTextOffsetY + fontSize * 0.5) * mu
        );
        ctx.restore();
      } else {
        var span = document.createElement("span");
        var transformRule = "";
        transformRule = "rotate(" + -rotateDeg / Math.PI * 180 + "deg) ";
        if (info.mu !== 1) {
          transformRule += "translateX(-" + info.fillTextWidth / 4 + "px) scale(" + 1 / info.mu + ")";
        }
        var styleRules = {
          position: "absolute",
          display: "block",
          font: fontWeight + " " + fontSize * info.mu + "px " + settings.fontFamily,
          left: (gx + info.gw / 2) * g + info.fillTextOffsetX + "px",
          top: (gy + info.gh / 2) * g + info.fillTextOffsetY + "px",
          width: info.fillTextWidth + "px",
          height: info.fillTextHeight + "px",
          lineHeight: fontSize + "px",
          whiteSpace: "nowrap",
          transform: transformRule,
          webkitTransform: transformRule,
          msTransform: transformRule,
          transformOrigin: "50% 40%",
          webkitTransformOrigin: "50% 40%",
          msTransformOrigin: "50% 40%"
        };
        if (color) {
          styleRules.color = color;
        }
        span.textContent = word;
        for (var cssProp in styleRules) {
          span.style[cssProp] = styleRules[cssProp];
        }
        if (attributes) {
          for (var attribute in attributes) {
            span.setAttribute(attribute, attributes[attribute]);
          }
        }
        if (classes) {
          span.className += classes;
        }
        el.appendChild(span);
      }
    });
  };
  var fillGridAt = function fillGridAt2(x, y, drawMask, dimension, item) {
    if (x >= ngx || y >= ngy || x < 0 || y < 0) {
      return;
    }
    grid[x][y] = false;
    if (drawMask) {
      var ctx = elements[0].getContext("2d");
      ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
    }
    if (interactive) {
      infoGrid[x][y] = { item, dimension };
    }
  };
  var updateGrid = function updateGrid2(gx, gy, gw, gh, info, item) {
    var occupied = info.occupied;
    var drawMask = settings.drawMask;
    var ctx;
    if (drawMask) {
      ctx = elements[0].getContext("2d");
      ctx.save();
      ctx.fillStyle = settings.maskColor;
    }
    var dimension;
    if (interactive) {
      var bounds = info.bounds;
      dimension = {
        x: (gx + bounds[3]) * g,
        y: (gy + bounds[0]) * g,
        w: (bounds[1] - bounds[3] + 1) * g,
        h: (bounds[2] - bounds[0] + 1) * g
      };
    }
    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];
      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        continue;
      }
      fillGridAt(px, py, drawMask, dimension, item);
    }
    if (drawMask) {
      ctx.restore();
    }
  };
  var putWord = function putWord2(item, loopIndex) {
    if (loopIndex > 20) {
      return null;
    }
    var word, weight, attributes;
    if (Array.isArray(item)) {
      word = item[0];
      weight = item[1];
    } else {
      word = item.word;
      weight = item.weight;
      attributes = item.attributes;
    }
    var rotateDeg = getRotateDeg();
    var extraDataArray = getItemExtraData(item);
    var info = getTextInfo(word, weight, rotateDeg, extraDataArray);
    if (!info) {
      return false;
    }
    if (exceedTime()) {
      return false;
    }
    if (!settings.drawOutOfBound && !settings.shrinkToFit) {
      var bounds = info.bounds;
      if (bounds[1] - bounds[3] + 1 > ngx || bounds[2] - bounds[0] + 1 > ngy) {
        return false;
      }
    }
    var r = maxRadius + 1;
    var tryToPutWordAtPoint = function(gxy) {
      var gx = Math.floor(gxy[0] - info.gw / 2);
      var gy = Math.floor(gxy[1] - info.gh / 2);
      var gw = info.gw;
      var gh = info.gh;
      if (!canFitText(gx, gy, gw, gh, info.occupied)) {
        return false;
      }
      drawText(
        gx,
        gy,
        info,
        word,
        weight,
        maxRadius - r,
        gxy[2],
        rotateDeg,
        attributes,
        extraDataArray
      );
      updateGrid(gx, gy, gw, gh, info, item);
      return {
        gx,
        gy,
        rot: rotateDeg,
        info
      };
    };
    while (r--) {
      var points = getPointsAtRadius(maxRadius - r);
      if (settings.shuffle) {
        points = [].concat(points);
        shuffleArray(points);
      }
      for (var i = 0; i < points.length; i++) {
        var res = tryToPutWordAtPoint(points[i]);
        if (res) {
          return res;
        }
      }
    }
    if (settings.shrinkToFit) {
      if (Array.isArray(item)) {
        item[1] = item[1] * 3 / 4;
      } else {
        item.weight = item.weight * 3 / 4;
      }
      return putWord2(item, loopIndex + 1);
    }
    return null;
  };
  var sendEvent = function sendEvent2(type, cancelable, details) {
    if (cancelable) {
      return !elements.some(function(el) {
        var event = new CustomEvent(type, {
          detail: details || {}
        });
        return !el.dispatchEvent(event);
      }, this);
    } else {
      elements.forEach(function(el) {
        var event = new CustomEvent(type, {
          detail: details || {}
        });
        el.dispatchEvent(event);
      }, this);
    }
  };
  var start = function start2() {
    var canvas = elements[0];
    if (canvas.getContext) {
      ngx = Math.ceil(canvas.width / g);
      ngy = Math.ceil(canvas.height / g);
    } else {
      var rect = canvas.getBoundingClientRect();
      ngx = Math.ceil(rect.width / g);
      ngy = Math.ceil(rect.height / g);
    }
    if (!sendEvent("wordcloudstart", true)) {
      return;
    }
    center = settings.origin ? [settings.origin[0] / g, settings.origin[1] / g] : [ngx / 2, ngy / 2];
    maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));
    grid = [];
    var gx, gy, i;
    if (!canvas.getContext || settings.clearCanvas) {
      elements.forEach(function(el) {
        if (el.getContext) {
          var ctx = el.getContext("2d");
          ctx.fillStyle = settings.backgroundColor;
          ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
          ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
        } else {
          el.textContent = "";
          el.style.backgroundColor = settings.backgroundColor;
          el.style.position = "relative";
        }
      });
      gx = ngx;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          grid[gx][gy] = true;
        }
      }
    } else {
      var bctx = document.createElement("canvas").getContext("2d");
      bctx.fillStyle = settings.backgroundColor;
      bctx.fillRect(0, 0, 1, 1);
      var bgPixel = bctx.getImageData(0, 0, 1, 1).data;
      var imageData = canvas.getContext("2d").getImageData(0, 0, ngx * g, ngy * g).data;
      gx = ngx;
      var x, y;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          y = g;
          singleGridLoop:
            while (y--) {
              x = g;
              while (x--) {
                i = 4;
                while (i--) {
                  if (imageData[((gy * g + y) * ngx * g + (gx * g + x)) * 4 + i] !== bgPixel[i]) {
                    grid[gx][gy] = false;
                    break singleGridLoop;
                  }
                }
              }
            }
          if (grid[gx][gy] !== false) {
            grid[gx][gy] = true;
          }
        }
      }
      imageData = bctx = bgPixel = void 0;
    }
    if (settings.hover || settings.click) {
      interactive = true;
      gx = ngx + 1;
      while (gx--) {
        infoGrid[gx] = [];
      }
      if (settings.hover) {
        canvas.addEventListener("mousemove", wordcloudhover);
      }
      if (settings.click) {
        canvas.addEventListener("click", wordcloudclick);
        canvas.addEventListener("touchstart", wordcloudclick);
        canvas.addEventListener("touchend", function(e) {
          e.preventDefault();
        });
        canvas.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
      }
      canvas.addEventListener("wordcloudstart", function stopInteraction() {
        canvas.removeEventListener("wordcloudstart", stopInteraction);
        canvas.removeEventListener("mousemove", wordcloudhover);
        canvas.removeEventListener("click", wordcloudclick);
        hovered = void 0;
      });
    }
    i = 0;
    var loopingFunction, stoppingFunction;
    var layouting = true;
    if (!settings.layoutAnimation) {
      loopingFunction = function(cb) {
        cb();
      };
      stoppingFunction = function() {
        layouting = false;
      };
    } else if (settings.wait !== 0) {
      loopingFunction = window.setTimeout;
      stoppingFunction = window.clearTimeout;
    } else {
      loopingFunction = window.setImmediate;
      stoppingFunction = window.clearImmediate;
    }
    var addEventListener = function addEventListener2(type, listener) {
      elements.forEach(function(el) {
        el.addEventListener(type, listener);
      }, this);
    };
    var removeEventListener = function removeEventListener2(type, listener) {
      elements.forEach(function(el) {
        el.removeEventListener(type, listener);
      }, this);
    };
    var anotherWordCloudStart = function anotherWordCloudStart2() {
      removeEventListener("wordcloudstart", anotherWordCloudStart2);
      stoppingFunction(timer[timerId]);
    };
    addEventListener("wordcloudstart", anotherWordCloudStart);
    timer[timerId] = (settings.layoutAnimation ? loopingFunction : setTimeout)(
      function loop() {
        if (!layouting) {
          return;
        }
        if (i >= settings.list.length) {
          stoppingFunction(timer[timerId]);
          sendEvent("wordcloudstop", false);
          removeEventListener("wordcloudstart", anotherWordCloudStart);
          delete timer[timerId];
          return;
        }
        escapeTime = (/* @__PURE__ */ new Date()).getTime();
        var drawn = putWord(settings.list[i], 0);
        var canceled = !sendEvent("wordclouddrawn", true, {
          item: settings.list[i],
          drawn
        });
        if (exceedTime() || canceled) {
          stoppingFunction(timer[timerId]);
          settings.abort();
          sendEvent("wordcloudabort", false);
          sendEvent("wordcloudstop", false);
          removeEventListener("wordcloudstart", anotherWordCloudStart);
          return;
        }
        i++;
        timer[timerId] = loopingFunction(loop, settings.wait);
      },
      settings.wait
    );
  };
  start();
};
WordCloud.isSupported = isSupported;
WordCloud.minFontSize = minFontSize;
var layout_default = WordCloud;

// C:/Users/14276/Desktop/个人事务/Mobile-PoetryWorld_front-main/Mobile-PoetryWorld_front-main/mym_app/node_modules/echarts-wordcloud/src/wordCloud.js
if (!layout_default.isSupported) {
  throw new Error("Sorry your browser not support wordCloud");
}
function updateCanvasMask(maskCanvas) {
  var ctx = maskCanvas.getContext("2d");
  var imageData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
  var newImageData = ctx.createImageData(imageData);
  var toneSum = 0;
  var toneCnt = 0;
  for (var i = 0; i < imageData.data.length; i += 4) {
    var alpha = imageData.data[i + 3];
    if (alpha > 128) {
      var tone = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
      toneSum += tone;
      ++toneCnt;
    }
  }
  var threshold = toneSum / toneCnt;
  for (var i = 0; i < imageData.data.length; i += 4) {
    var tone = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
    var alpha = imageData.data[i + 3];
    if (alpha < 128 || tone > threshold) {
      newImageData.data[i] = 0;
      newImageData.data[i + 1] = 0;
      newImageData.data[i + 2] = 0;
      newImageData.data[i + 3] = 0;
    } else {
      newImageData.data[i] = 255;
      newImageData.data[i + 1] = 255;
      newImageData.data[i + 2] = 255;
      newImageData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(newImageData, 0, 0);
}
registerLayout(function(ecModel, api) {
  ecModel.eachSeriesByType("wordCloud", function(seriesModel) {
    var gridRect = helper_exports.getLayoutRect(
      seriesModel.getBoxLayoutParams(),
      {
        width: api.getWidth(),
        height: api.getHeight()
      }
    );
    var keepAspect = seriesModel.get("keepAspect");
    var maskImage = seriesModel.get("maskImage");
    var ratio = maskImage ? maskImage.width / maskImage.height : 1;
    keepAspect && adjustRectAspect(gridRect, ratio);
    var data = seriesModel.getData();
    var canvas = document.createElement("canvas");
    canvas.width = gridRect.width;
    canvas.height = gridRect.height;
    var ctx = canvas.getContext("2d");
    if (maskImage) {
      try {
        ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
        updateCanvasMask(canvas);
      } catch (e) {
        console.error("Invalid mask image");
        console.error(e.toString());
      }
    }
    var sizeRange = seriesModel.get("sizeRange");
    var rotationRange = seriesModel.get("rotationRange");
    var valueExtent = data.getDataExtent("value");
    var DEGREE_TO_RAD = Math.PI / 180;
    var gridSize = seriesModel.get("gridSize");
    layout_default(canvas, {
      list: data.mapArray("value", function(value, idx) {
        var itemModel = data.getItemModel(idx);
        return [
          data.getName(idx),
          itemModel.get("textStyle.fontSize", true) || number_exports.linearMap(value, valueExtent, sizeRange),
          idx
        ];
      }).sort(function(a, b) {
        return b[1] - a[1];
      }),
      fontFamily: seriesModel.get("textStyle.fontFamily") || seriesModel.get("emphasis.textStyle.fontFamily") || ecModel.get("textStyle.fontFamily"),
      fontWeight: seriesModel.get("textStyle.fontWeight") || seriesModel.get("emphasis.textStyle.fontWeight") || ecModel.get("textStyle.fontWeight"),
      gridSize,
      ellipticity: gridRect.height / gridRect.width,
      minRotation: rotationRange[0] * DEGREE_TO_RAD,
      maxRotation: rotationRange[1] * DEGREE_TO_RAD,
      clearCanvas: !maskImage,
      rotateRatio: 1,
      rotationStep: seriesModel.get("rotationStep") * DEGREE_TO_RAD,
      drawOutOfBound: seriesModel.get("drawOutOfBound"),
      shrinkToFit: seriesModel.get("shrinkToFit"),
      layoutAnimation: seriesModel.get("layoutAnimation"),
      shuffle: false,
      shape: seriesModel.get("shape")
    });
    function onWordCloudDrawn(e) {
      var item = e.detail.item;
      if (e.detail.drawn && seriesModel.layoutInstance.ondraw) {
        e.detail.drawn.gx += gridRect.x / gridSize;
        e.detail.drawn.gy += gridRect.y / gridSize;
        seriesModel.layoutInstance.ondraw(
          item[0],
          item[1],
          item[2],
          e.detail.drawn
        );
      }
    }
    canvas.addEventListener("wordclouddrawn", onWordCloudDrawn);
    if (seriesModel.layoutInstance) {
      seriesModel.layoutInstance.dispose();
    }
    seriesModel.layoutInstance = {
      ondraw: null,
      dispose: function() {
        canvas.removeEventListener("wordclouddrawn", onWordCloudDrawn);
        canvas.addEventListener("wordclouddrawn", function(e) {
          e.preventDefault();
        });
      }
    };
  });
});
registerPreprocessor(function(option) {
  var series = (option || {}).series;
  !util_exports.isArray(series) && (series = series ? [series] : []);
  var compats = ["shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
  util_exports.each(series, function(seriesItem) {
    if (seriesItem && seriesItem.type === "wordCloud") {
      var textStyle = seriesItem.textStyle || {};
      compatTextStyle(textStyle.normal);
      compatTextStyle(textStyle.emphasis);
    }
  });
  function compatTextStyle(textStyle) {
    textStyle && util_exports.each(compats, function(key) {
      if (textStyle.hasOwnProperty(key)) {
        textStyle["text" + format_exports.capitalFirst(key)] = textStyle[key];
      }
    });
  }
});
function adjustRectAspect(gridRect, aspect) {
  var width = gridRect.width;
  var height = gridRect.height;
  if (width > height * aspect) {
    gridRect.x += (width - height * aspect) / 2;
    gridRect.width = height * aspect;
  } else {
    gridRect.y += (height - width / aspect) / 2;
    gridRect.height = width / aspect;
  }
}
/*! Bundled license information:

echarts-wordcloud/src/layout.js:
  (*!
   * wordcloud2.js
   * http://timdream.org/wordcloud2.js/
   *
   * Copyright 2011 - 2019 Tim Guan-tin Chien and contributors.
   * Released under the MIT license
   *)
*/
//# sourceMappingURL=echarts-wordcloud.js.map
