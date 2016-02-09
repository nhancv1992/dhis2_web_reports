Ext.onReady(function () {
    function b() {
        var o = 0;
        var l = 0;
        var j = 0;
        var i = 0;
        var p = 0;
        var m = 0;
        var k = 0;
        this.addData = function (n, s) {
            if (p == 0) {
                m = n;
                k = s
            } else {
                var r = n - m;
                var q = s - k;
                j += r * r * p / (p + 1);
                i += r * q * p / (p + 1);
                m += r / (p + 1);
                k += q / (p + 1)
            }
            o += n;
            l += s;
            p++
        };
        this.predict = function (n) {
            var q = this.getSlope();
            return this.getIntercept(q) + q * n
        };
        this.getSlope = function () {
            if (p < 2) {
                return Number.NaN
            }
            return i / j
        };
        this.getIntercept = function (n) {
            return (l - n * o) / p
        }
    }

    Ext.Ajax.method = "GET";
    Ext.override(Ext.chart.series.Line, {
        drawSeries: function () {
            var by = this, bm = by.chart, a1 = bm.axes, bu = bm.getChartStore(), aY = bu.getCount(), y = by.chart.surface, bw = {}, a2 = by.group, a9 = by.showMarkers, bK = by.markerGroup, bl = bm.shadow, bn = by.shadowGroups, aW = by.shadowAttributes, a5 = by.smooth, aF = bn.length, br = ["M"], a0 = ["M"], aQ = ["M"], aS = ["M"], ba = bm.markerIndex, bA = [].concat(by.axis), bB, bk = [], bC = {}, bI = [], x = {}, bb = false, a3 = [], bc = by.markerStyle, aU = by.style, aC = by.colorArrayStyle, a4 = aC && aC.length || 0, a8 = Ext.isNumber, bi = by.seriesIdx, aN = by.getAxesForXAndYFields(), aK = aN.xAxis, be = aN.yAxis, bG, aM, bH, bF, bq, aR, bE, bd, bf, aO, aP, aD, aE, aX, a6, a7, bo, aJ, bh, bj, bJ, aI, aG, bp, aT, aV, bD, i, bs, j, bt, aH, bg, bv, bx, aZ, aL, bz;
            if (by.fireEvent("beforedraw", by) === false) {
                return
            }
            if (!aY || by.seriesIsHidden) {
                bz = this.items;
                if (bz) {
                    for (a6 = 0, bo = bz.length; a6 < bo; ++a6) {
                        if (bz[a6].sprite) {
                            bz[a6].sprite.hide(true)
                        }
                    }
                }
                return
            }
            bv = Ext.apply(bc || {}, by.markerConfig);
            aZ = bv.type;
            delete bv.type;
            bx = aU;
            if (!bx["stroke-width"]) {
                bx["stroke-width"] = 0.5
            }
            if (ba && bK && bK.getCount()) {
                for (a6 = 0; a6 < ba; a6++) {
                    bj = bK.getAt(a6);
                    bK.remove(bj);
                    bK.add(bj);
                    bJ = bK.getAt(bK.getCount() - 2);
                    bj.setAttributes({
                        x: 0,
                        y: 0,
                        translate: {x: bJ.attr.translation.x, y: bJ.attr.translation.y}
                    }, true)
                }
            }
            by.unHighlightItem();
            by.cleanHighlights();
            by.setBBox();
            bw = by.bbox;
            by.clipRect = [bw.x, bw.y, bw.width, bw.height];
            for (a6 = 0, bo = bA.length; a6 < bo; a6++) {
                aJ = a1.get(bA[a6]);
                if (aJ) {
                    bh = aJ.calcEnds();
                    if (aJ.position == "top" || aJ.position == "bottom") {
                        i = bh.from;
                        bs = bh.to
                    } else {
                        j = bh.from;
                        bt = bh.to
                    }
                }
            }
            if (by.xField && !a8(i) && (aK == "bottom" || aK == "top") && !a1.get(aK)) {
                aJ = Ext.create("Ext.chart.axis.Axis", {chart: bm, fields: [].concat(by.xField)}).calcEnds();
                i = aJ.from;
                bs = aJ.to
            }
            if (by.yField && !a8(j) && (be == "right" || be == "left") && !a1.get(be)) {
                aJ = Ext.create("Ext.chart.axis.Axis", {chart: bm, fields: [].concat(by.yField)}).calcEnds();
                j = aJ.from;
                bt = aJ.to
            }
            if (isNaN(i)) {
                i = 0;
                aV = bw.width / ((aY - 1) || 1)
            } else {
                aV = bw.width / ((bs - i) || (aY - 1) || 1)
            }
            if (isNaN(j)) {
                j = 0;
                bD = bw.height / ((aY - 1) || 1)
            } else {
                bD = bw.height / ((bt - j) || (aY - 1) || 1)
            }
            by.eachRecord(function (l, k) {
                aG = l.get(by.xField);
                if (typeof aG == "string" || typeof aG == "object" && !Ext.isDate(aG) || aK && a1.get(aK) && a1.get(aK).type == "Category") {
                    if (aG in bC) {
                        aG = bC[aG]
                    } else {
                        aG = bC[aG] = k
                    }
                }
                bp = l.get(by.yField);
                if (typeof bp == "undefined" || (typeof bp == "string" && !bp)) {
                    if (Ext.isDefined(Ext.global.console)) {
                        Ext.global.console.warn("[Ext.chart.series.Line]  Skipping a store element with an undefined value at ", l, aG, bp)
                    }
                    return
                }
                if (typeof bp == "object" && !Ext.isDate(bp) || be && a1.get(be) && a1.get(be).type == "Category") {
                    bp = k
                }
                a3.push(k);
                bk.push(aG);
                bI.push(bp)
            });
            bo = bk.length;
            if (bo > bw.width) {
                aT = by.shrink(bk, bI, bw.width);
                bk = aT.x;
                bI = aT.y
            }
            by.items = [];
            aL = 0;
            bo = bk.length;
            for (a6 = 0; a6 < bo; a6++) {
                aG = bk[a6];
                bp = bI[a6];
                if (bp === false) {
                    if (a0.length == 1) {
                        a0 = []
                    }
                    bb = true;
                    by.items.push(false);
                    continue
                } else {
                    bd = (bw.x + (aG - i) * aV).toFixed(2);
                    bf = ((bw.y + bw.height) - (bp - j) * bD).toFixed(2);
                    if (bb) {
                        bb = false;
                        a0.push("M")
                    }
                    a0 = a0.concat([bd, bf])
                }
                if ((typeof aE == "undefined") && (typeof bf != "undefined")) {
                    aE = bf;
                    aD = bd
                }
                if (!by.line || bm.resizing) {
                    br = br.concat([bd, bw.y + bw.height / 2])
                }
                if (bm.animate && bm.resizing && by.line) {
                    by.line.setAttributes({path: br}, true);
                    if (by.fillPath) {
                        by.fillPath.setAttributes({path: br, opacity: 0.2}, true)
                    }
                    if (by.line.shadows) {
                        bG = by.line.shadows;
                        for (a7 = 0, aF = bG.length; a7 < aF; a7++) {
                            aM = bG[a7];
                            aM.setAttributes({path: br}, true)
                        }
                    }
                }
                if (a9) {
                    bj = bK.getAt(aL++);
                    if (!bj) {
                        bj = Ext.chart.Shape[aZ](y, Ext.apply({
                            group: [a2, bK],
                            x: 0,
                            y: 0,
                            translate: {x: +(aO || bd), y: aP || (bw.y + bw.height / 2)},
                            value: '"' + aG + ", " + bp + '"',
                            zIndex: 4000
                        }, bv));
                        bj._to = {translate: {x: +bd, y: +bf}}
                    } else {
                        bj.setAttributes({value: '"' + aG + ", " + bp + '"', x: 0, y: 0, hidden: false}, true);
                        bj._to = {translate: {x: +bd, y: +bf}}
                    }
                }
                by.items.push({series: by, value: [aG, bp], point: [bd, bf], sprite: bj, storeItem: bu.getAt(a3[a6])});
                aO = bd;
                aP = bf
            }
            if (a0.length <= 1) {
                return
            }
            if (by.smooth) {
                aS = Ext.draw.Draw.smooth(a0, a8(a5) ? a5 : by.defaultSmoothness)
            }
            aQ = a5 ? aS : a0;
            if (bm.markerIndex && by.previousPath) {
                bF = by.previousPath;
                if (!a5) {
                    Ext.Array.erase(bF, 1, 2)
                }
            } else {
                bF = a0
            }
            if (!by.line) {
                by.line = y.add(Ext.apply({type: "path", group: a2, path: br, stroke: bx.stroke || bx.fill}, bx || {}));
                if (bl) {
                    by.line.setAttributes(Ext.apply({}, by.shadowOptions), true)
                }
                by.line.setAttributes({fill: "none", zIndex: 3000});
                if (!bx.stroke && a4) {
                    by.line.setAttributes({stroke: aC[bi % a4]}, true)
                }
                if (bl) {
                    bG = by.line.shadows = [];
                    for (bH = 0; bH < aF; bH++) {
                        bB = aW[bH];
                        bB = Ext.apply({}, bB, {path: br});
                        aM = y.add(Ext.apply({}, {type: "path", group: bn[bH]}, bB));
                        bG.push(aM)
                    }
                }
            }
            if (by.fill) {
                aR = aQ.concat([["L", bd, bw.y + bw.height], ["L", aD, bw.y + bw.height], ["L", aD, aE]]);
                if (!by.fillPath) {
                    by.fillPath = y.add({
                        group: a2,
                        type: "path",
                        opacity: bx.opacity || 0.3,
                        fill: bx.fill || aC[bi % a4],
                        path: br
                    })
                }
            }
            aX = a9 && bK.getCount();
            if (bm.animate) {
                bq = by.fill;
                aH = by.line;
                bE = by.renderer(aH, false, {path: aQ}, a6, bu);
                Ext.apply(bE, bx || {}, {stroke: bx.stroke || bx.fill});
                delete bE.fill;
                aH.show(true);
                if (bm.markerIndex && by.previousPath) {
                    by.animation = bg = by.onAnimate(aH, {to: bE, from: {path: bF}})
                } else {
                    by.animation = bg = by.onAnimate(aH, {to: bE})
                }
                if (bl) {
                    bG = aH.shadows;
                    for (a7 = 0; a7 < aF; a7++) {
                        bG[a7].show(true);
                        if (bm.markerIndex && by.previousPath) {
                            by.onAnimate(bG[a7], {to: {path: aQ}, from: {path: bF}})
                        } else {
                            by.onAnimate(bG[a7], {to: {path: aQ}})
                        }
                    }
                }
                if (bq) {
                    by.fillPath.show(true);
                    by.onAnimate(by.fillPath, {
                        to: Ext.apply({}, {
                            path: aR,
                            fill: bx.fill || aC[bi % a4],
                            "stroke-width": 0
                        }, bx || {})
                    })
                }
                if (a9) {
                    aL = 0;
                    for (a6 = 0; a6 < bo; a6++) {
                        if (by.items[a6]) {
                            aI = bK.getAt(aL++);
                            if (aI) {
                                bE = by.renderer(aI, bu.getAt(a6), aI._to, a6, bu);
                                by.onAnimate(aI, {to: Ext.apply(bE, bv || {})});
                                aI.show(true)
                            }
                        }
                    }
                    for (; aL < aX; aL++) {
                        aI = bK.getAt(aL);
                        aI.hide(true)
                    }
                }
            } else {
                bE = by.renderer(by.line, false, {path: aQ, hidden: false}, a6, bu);
                Ext.apply(bE, bx || {}, {stroke: bx.stroke || bx.fill});
                delete bE.fill;
                by.line.setAttributes(bE, true);
                if (bl) {
                    bG = by.line.shadows;
                    for (a7 = 0; a7 < aF; a7++) {
                        bG[a7].setAttributes({path: aQ, hidden: false}, true)
                    }
                }
                if (by.fill) {
                    by.fillPath.setAttributes({path: aR, hidden: false}, true)
                }
                if (a9) {
                    aL = 0;
                    for (a6 = 0; a6 < bo; a6++) {
                        if (by.items[a6]) {
                            aI = bK.getAt(aL++);
                            if (aI) {
                                bE = by.renderer(aI, bu.getAt(a6), aI._to, a6, bu);
                                aI.setAttributes(Ext.apply(bv || {}, bE || {}), true);
                                aI.show(true)
                            }
                        }
                    }
                    for (; aL < aX; aL++) {
                        aI = bK.getAt(aL);
                        aI.hide(true)
                    }
                }
            }
            if (bm.markerIndex) {
                if (by.smooth) {
                    Ext.Array.erase(a0, 1, 2)
                } else {
                    Ext.Array.splice(a0, 1, 0, a0[1], a0[2])
                }
                by.previousPath = a0
            }
            by.renderLabels();
            by.renderCallouts();
            by.fireEvent("draw", by)
        }
    });
    DV = {};
    DV.instances = [];
    DV.i18n = {};
    DV.isDebug = false;
    DV.isSessionStorage = ("sessionStorage" in window && window.sessionStorage !== null);
    DV.getCore = function (o) {
        var k = {}, m = {}, l = {}, i = {}, j = {}, n;
        (function () {
            k.finals = {
                ajax: {
                    path_module: "/dhis-web-visualizer/",
                    path_api: "/api/",
                    path_commons: "/dhis-web-commons-ajax-json/",
                    data_get: "chartValues.json",
                    indicator_get: "indicatorGroups/",
                    indicator_getall: "indicators.json?paging=false&links=false",
                    indicatorgroup_get: "indicatorGroups.json?paging=false&links=false",
                    dataelement_get: "dataElementGroups/",
                    dataelement_getall: "dataElements.json?domainType=aggregate&paging=false&links=false",
                    dataelementgroup_get: "dataElementGroups.json?paging=false&links=false",
                    dataset_get: "dataSets.json?paging=false&links=false"
                },
                dimension: {
                    data: {value: "data", name: DV.i18n.data, dimensionName: "dx", objectName: "dx"},
                    indicator: {value: "indicator", name: DV.i18n.indicator, dimensionName: "dx", objectName: "in"},
                    dataElement: {
                        value: "dataelement",
                        name: DV.i18n.data_element,
                        dimensionName: "dx",
                        objectName: "de"
                    },
                    operand: {value: "operand", name: "Operand", dimensionName: "dx", objectName: "dc"},
                    dataSet: {value: "dataset", name: DV.i18n.dataset, dimensionName: "dx", objectName: "ds"},
                    category: {name: DV.i18n.categories, dimensionName: "co", objectName: "co"},
                    period: {value: "period", name: DV.i18n.period, dimensionName: "pe", objectName: "pe"},
                    fixedPeriod: {value: "periods"},
                    relativePeriod: {value: "relativePeriods"},
                    organisationUnit: {
                        value: "organisationUnits",
                        name: DV.i18n.organisation_units,
                        dimensionName: "ou",
                        objectName: "ou"
                    },
                    dimension: {value: "dimension"},
                    value: {value: "value"}
                },
                chart: {
                    series: "series",
                    category: "category",
                    filter: "filter",
                    column: "column",
                    stackedcolumn: "stackedcolumn",
                    bar: "bar",
                    stackedbar: "stackedbar",
                    line: "line",
                    area: "area",
                    pie: "pie",
                    radar: "radar"
                },
                data: {domain: "domain_", targetLine: "targetline_", baseLine: "baseline_", trendLine: "trendline_"},
                image: {png: "png", pdf: "pdf"},
                cmd: {init: "init_", none: "none_", urlparam: "id"},
                root: {id: "root"}
            };
            n = k.finals.dimension;
            n.objectNameMap = {};
            n.objectNameMap[n.data.objectName] = n.data;
            n.objectNameMap[n.indicator.objectName] = n.indicator;
            n.objectNameMap[n.dataElement.objectName] = n.dataElement;
            n.objectNameMap[n.operand.objectName] = n.operand;
            n.objectNameMap[n.dataSet.objectName] = n.dataSet;
            n.objectNameMap[n.category.objectName] = n.category;
            n.objectNameMap[n.period.objectName] = n.period;
            n.objectNameMap[n.organisationUnit.objectName] = n.organisationUnit;
            n.objectNameMap[n.dimension.objectName] = n.dimension;
            k.period = {
                periodTypes: [{id: "Daily", name: DV.i18n.daily}, {
                    id: "Weekly",
                    name: DV.i18n.weekly
                }, {id: "Monthly", name: DV.i18n.monthly}, {id: "BiMonthly", name: DV.i18n.bimonthly}, {
                    id: "Quarterly",
                    name: DV.i18n.quarterly
                }, {id: "SixMonthly", name: DV.i18n.sixmonthly}, {
                    id: "SixMonthlyApril",
                    name: DV.i18n.sixmonthly_april
                }, {id: "Yearly", name: DV.i18n.yearly}, {
                    id: "FinancialOct",
                    name: DV.i18n.financial_oct
                }, {id: "FinancialJuly", name: DV.i18n.financial_july}, {
                    id: "FinancialApril",
                    name: DV.i18n.financial_april
                }]
            };
            k.layout = {
                west_width: 424,
                west_fieldset_width: 418,
                west_width_padding: 2,
                west_fill: 2,
                west_fill_accordion_indicator: 56,
                west_fill_accordion_dataelement: 59,
                west_fill_accordion_dataset: 31,
                west_fill_accordion_period: 293,
                west_fill_accordion_organisationunit: 58,
                west_maxheight_accordion_indicator: 350,
                west_maxheight_accordion_dataelement: 350,
                west_maxheight_accordion_dataset: 350,
                west_maxheight_accordion_period: 513,
                west_maxheight_accordion_organisationunit: 500,
                west_maxheight_accordion_group: 350,
                west_scrollbarheight_accordion_indicator: 300,
                west_scrollbarheight_accordion_dataelement: 300,
                west_scrollbarheight_accordion_dataset: 300,
                west_scrollbarheight_accordion_period: 450,
                west_scrollbarheight_accordion_organisationunit: 450,
                west_scrollbarheight_accordion_group: 300,
                east_tbar_height: 31,
                east_gridcolumn_height: 30,
                form_label_width: 55,
                window_favorite_ypos: 100,
                window_confirm_width: 250,
                window_share_width: 500,
                grid_favorite_width: 420,
                grid_row_height: 27,
                treepanel_minheight: 135,
                treepanel_maxheight: 400,
                treepanel_fill_default: 310,
                treepanel_toolbar_menu_width_group: 140,
                treepanel_toolbar_menu_width_level: 120,
                multiselect_minheight: 100,
                multiselect_maxheight: 250,
                multiselect_fill_default: 345,
                multiselect_fill_reportingrates: 315
            };
            k.chart = {
                style: {inset: 30, fontFamily: "Arial,Sans-serif,Lucida Grande,Ubuntu"},
                theme: {dv1: ["#94ae0a", "#0b3b68", "#a61120", "#ff8809", "#7c7474", "#a61187", "#ffd13e", "#24ad9a", "#a66111", "#414141", "#4500c4", "#1d5700"]}
            };
            k.status = {icon: {error: "error_s.png", warning: "warning.png", ok: "ok.png"}}
        }());
        (function () {
            m.layout = {};
            m.layout.Record = function (p) {
                var p = Ext.clone(p);
                return function () {
                    if (!Ext.isObject(p)) {
                        console.log("Record: config is not an object: " + p);
                        return
                    }
                    if (!Ext.isString(p.id)) {
                        alert("Record: id is not text: " + p);
                        return
                    }
                    p.id = p.id.replace(".", "#");
                    return p
                }()
            };
            m.layout.Dimension = function (p) {
                var p = Ext.clone(p);
                return function () {
                    if (!Ext.isObject(p)) {
                        console.log("Dimension: config is not an object: " + p);
                        return
                    }
                    if (!Ext.isString(p.dimension)) {
                        console.log("Dimension: name is not a string: " + p);
                        return
                    }
                    if (p.dimension !== k.finals.dimension.category.objectName) {
                        var q = [];
                        if (!Ext.isArray(p.items)) {
                            console.log("Dimension: items is not an array: " + p);
                            return
                        }
                        for (var r = 0; r < p.items.length; r++) {
                            q.push(m.layout.Record(p.items[r]))
                        }
                        p.items = Ext.Array.clean(q);
                        if (!p.items.length) {
                            console.log("Dimension: has no valid items: " + p);
                            return
                        }
                    }
                    return p
                }()
            };
            m.layout.Layout = function (q) {
                var q = Ext.clone(q), r = {}, p, s;
                p = function (u) {
                    var u = Ext.clone(u);
                    if (!(u && Ext.isArray(u) && u.length)) {
                        return
                    }
                    for (var t = 0; t < u.length; t++) {
                        u[t] = m.layout.Dimension(u[t])
                    }
                    u = Ext.Array.clean(u);
                    return u.length ? u : null
                };
                analytical2layout = function (u) {
                    var w = Ext.clone(u), x = n.category.objectName;
                    u = Ext.clone(u);
                    w.columns = [];
                    w.rows = [];
                    w.filters = w.filters || [];
                    if (Ext.isArray(u.columns) && u.columns.length) {
                        u.columns.reverse();
                        for (var t = 0, v; t < u.columns.length; t++) {
                            v = u.columns[t];
                            if (v.dimension === x) {
                                continue
                            }
                            if (!w.columns.length) {
                                w.columns.push(v)
                            } else {
                                if (v.dimension === n.indicator.objectName) {
                                    w.filters.push(w.columns.pop());
                                    w.columns = [v]
                                } else {
                                    w.filters.push(v)
                                }
                            }
                        }
                    }
                    if (Ext.isArray(u.rows) && u.rows.length) {
                        u.rows.reverse();
                        for (var t = 0, v; t < u.rows.length; t++) {
                            v = u.rows[t];
                            if (v.dimension === x) {
                                continue
                            }
                            if (!w.rows.length) {
                                w.rows.push(v)
                            } else {
                                if (v.dimension === n.indicator.objectName) {
                                    w.filters.push(w.rows.pop());
                                    w.rows = [v]
                                } else {
                                    w.filters.push(v)
                                }
                            }
                        }
                    }
                    return w
                };
                s = function () {
                    var v = k.finals.dimension, u, w = {};
                    if (!r) {
                        return
                    }
                    u = Ext.Array.clean([].concat(r.columns || [], r.rows || [], r.filters || []));
                    for (var t = 0; t < u.length; t++) {
                        w[u[t].dimension] = u[t]
                    }
                    if (r.filters && r.filters.length) {
                        for (var t = 0; t < r.filters.length; t++) {
                            if (r.filters[t].dimension === v.indicator.objectName) {
                                j.message.alert(DV.i18n.indicators_cannot_be_specified_as_filter || "Indicators cannot be specified as filter");
                                return
                            }
                            if (r.filters[t].dimension === v.category.objectName) {
                                j.message.alert(DV.i18n.categories_cannot_be_specified_as_filter || "Categories cannot be specified as filter");
                                return
                            }
                            if (r.filters[t].dimension === v.dataSet.objectName) {
                                j.message.alert(DV.i18n.data_sets_cannot_be_specified_as_filter || "Data sets cannot be specified as filter");
                                return
                            }
                        }
                    }
                    if (w[v.operand.objectName] && w[v.indicator.objectName]) {
                        j.message.alert("Indicators and detailed data elements cannot be specified together");
                        return
                    }
                    if (w[v.operand.objectName] && w[v.dataElement.objectName]) {
                        j.message.alert("Detailed data elements and totals cannot be specified together");
                        return
                    }
                    if (w[v.operand.objectName] && w[v.dataSet.objectName]) {
                        j.message.alert("Data sets and detailed data elements cannot be specified together");
                        return
                    }
                    if (w[v.operand.objectName] && w[v.category.objectName]) {
                        j.message.alert("Categories and detailed data elements cannot be specified together");
                        return
                    }
                    return true
                };
                return function () {
                    var t = [], v = k.finals.dimension;
                    if (!(q && Ext.isObject(q))) {
                        alert("Layout: config is not an object (" + o.el + ")");
                        return
                    }
                    q.columns = p(q.columns);
                    q.rows = p(q.rows);
                    q.filters = p(q.filters);
                    if (!q.columns) {
                        alert("No series items selected");
                        return
                    }
                    if (!q.rows) {
                        alert("No category items selected");
                        return
                    }
                    for (var u = 0, w = Ext.Array.clean([].concat(q.columns || [], q.rows || [], q.filters || [])); u < w.length; u++) {
                        if (m.layout.Dimension(w[u])) {
                            t.push(w[u].dimension)
                        }
                    }
                    if (!Ext.Array.contains(t, v.period.objectName)) {
                        alert("At least one period must be specified as series, category or filter");
                        return
                    }
                    if (q.id) {
                        r.id = q.id
                    }
                    if (q.name) {
                        r.name = q.name
                    }
                    r.type = Ext.isString(q.type) ? q.type.toLowerCase() : k.finals.chart.column;
                    r.columns = q.columns;
                    r.rows = q.rows;
                    r.filters = q.filters;
                    r.showValues = Ext.isBoolean(q.showData) ? q.showData : (Ext.isBoolean(q.showValues) ? q.showValues : true);
                    r.hideEmptyRows = Ext.isBoolean(q.hideEmptyRows) ? q.hideEmptyRows : (Ext.isBoolean(q.hideEmptyRows) ? q.hideEmptyRows : true);
                    r.showTrendLine = Ext.isBoolean(q.regression) ? q.regression : (Ext.isBoolean(q.showTrendLine) ? q.showTrendLine : false);
                    r.targetLineValue = Ext.isNumber(q.targetLineValue) ? q.targetLineValue : null;
                    r.targetLineTitle = Ext.isString(q.targetLineLabel) && !Ext.isEmpty(q.targetLineLabel) ? q.targetLineLabel : (Ext.isString(q.targetLineTitle) && !Ext.isEmpty(q.targetLineTitle) ? q.targetLineTitle : null);
                    r.baseLineValue = Ext.isNumber(q.baseLineValue) ? q.baseLineValue : null;
                    r.baseLineTitle = Ext.isString(q.baseLineLabel) && !Ext.isEmpty(q.baseLineLabel) ? q.baseLineLabel : (Ext.isString(q.baseLineTitle) && !Ext.isEmpty(q.baseLineTitle) ? q.baseLineTitle : null);
                    r.rangeAxisMaxValue = Ext.isNumber(q.rangeAxisMaxValue) ? q.rangeAxisMaxValue : null;
                    r.rangeAxisMinValue = Ext.isNumber(q.rangeAxisMinValue) ? q.rangeAxisMinValue : null;
                    r.rangeAxisSteps = Ext.isNumber(q.rangeAxisSteps) ? q.rangeAxisSteps : null;
                    r.rangeAxisDecimals = Ext.isNumber(q.rangeAxisDecimals) ? q.rangeAxisDecimals : null;
                    r.rangeAxisTitle = Ext.isString(q.rangeAxisLabel) && !Ext.isEmpty(q.rangeAxisLabel) ? q.rangeAxisLabel : (Ext.isString(q.rangeAxisTitle) && !Ext.isEmpty(q.rangeAxisTitle) ? q.rangeAxisTitle : null);
                    r.domainAxisTitle = Ext.isString(q.domainAxisLabel) && !Ext.isEmpty(q.domainAxisLabel) ? q.domainAxisLabel : (Ext.isString(q.domainAxisTitle) && !Ext.isEmpty(q.domainAxisTitle) ? q.domainAxisTitle : null);
                    r.hideLegend = Ext.isBoolean(q.hideLegend) ? q.hideLegend : false;
                    r.hideTitle = Ext.isBoolean(q.hideTitle) ? q.hideTitle : false;
                    r.title = Ext.isString(q.title) && !Ext.isEmpty(q.title) ? q.title : null;
                    r.parentGraphMap = Ext.isObject(q.parentGraphMap) ? q.parentGraphMap : null;
                    r.legend = Ext.isObject(q.legend) ? q.legend : null;
                    if (!s()) {
                        return
                    }
                    return r
                }()
            };
            m.response = {};
            m.response.Header = function (p) {
                var p = Ext.clone(p);
                return function () {
                    if (!Ext.isObject(p)) {
                        console.log("Header: config is not an object: " + p);
                        return
                    }
                    if (!Ext.isString(p.name)) {
                        console.log("Header: name is not a string: " + p);
                        return
                    }
                    if (!Ext.isBoolean(p.meta)) {
                        console.log("Header: meta is not boolean: " + p);
                        return
                    }
                    return p
                }()
            };
            m.response.Response = function (p) {
                var p = Ext.clone(p);
                return function () {
                    if (!(p && Ext.isObject(p))) {
                        console.log("Response: config is not an object");
                        return
                    }
                    if (!(p.headers && Ext.isArray(p.headers))) {
                        console.log("Response: headers is not an array");
                        return
                    }
                    for (var q = 0, r; q < p.headers.length; q++) {
                        p.headers[q] = m.response.Header(p.headers[q])
                    }
                    p.headers = Ext.Array.clean(p.headers);
                    if (!p.headers.length) {
                        console.log("Response: no valid headers");
                        return
                    }
                    if (!(Ext.isArray(p.rows) && p.rows.length > 0)) {
                        if (DV.app && !DV.plugin) {
                            alert("No values found")
                        }
                        return
                    }
                    if (p.headers.length !== p.rows[0].length) {
                        console.log("Response: headers.length !== rows[i].length")
                    }
                    return p
                }()
            }
        }());
        (function () {
            l.prototype = {};
            l.prototype.array = {};
            l.prototype.array.getLength = function (q, p) {
                if (!Ext.isArray(q)) {
                    if (!p) {
                        console.log("support.prototype.array.getLength: not an array")
                    }
                    return null
                }
                return q.length
            };
            l.prototype.array.sort = function (r, q, p) {
                if (!l.prototype.array.getLength(r)) {
                    return
                }
                p = p || "name";
                r.sort(function (t, s) {
                    if (Ext.isObject(t) && Ext.isObject(s) && p) {
                        t = t[p];
                        s = s[p]
                    }
                    if (Ext.isString(t) && Ext.isString(s)) {
                        t = t.toLowerCase();
                        s = s.toLowerCase();
                        if (q === "DESC") {
                            return t < s ? 1 : (t > s ? -1 : 0)
                        } else {
                            return t < s ? -1 : (t > s ? 1 : 0)
                        }
                    } else {
                        if (Ext.isNumber(t) && Ext.isNumber(s)) {
                            return q === "DESC" ? s - t : t - s
                        }
                    }
                    return 0
                });
                return r
            };
            l.prototype.object = {};
            l.prototype.object.getLength = function (p, s) {
                if (!Ext.isObject(p)) {
                    if (!s) {
                        console.log("support.prototype.object.getLength: not an object")
                    }
                    return null
                }
                var r = 0;
                for (var q in p) {
                    if (p.hasOwnProperty(q)) {
                        r++
                    }
                }
                return r
            };
            l.prototype.object.hasObject = function (q, t, s) {
                if (!l.prototype.object.getLength(q)) {
                    return null
                }
                for (var r in q) {
                    var p = q[r];
                    if (q.hasOwnProperty(r) && p[t] === s) {
                        return true
                    }
                }
                return null
            };
            l.prototype.str = {};
            l.prototype.str.replaceAll = function (r, q, p) {
                return r.replace(new RegExp(q, "g"), p)
            }
        }());
        (function () {
            i.layout = {};
            i.layout.cleanDimensionArray = function (q) {
                if (!l.prototype.array.getLength(q)) {
                    return null
                }
                var r = [];
                for (var p = 0; p < q.length; p++) {
                    r.push(m.layout.Dimension(q[p]))
                }
                r = Ext.Array.clean(r);
                return r.length ? r : null
            };
            i.layout.sortDimensionArray = function (s, r) {
                if (!l.prototype.array.getLength(s, true)) {
                    return null
                }
                s = i.layout.cleanDimensionArray(s);
                if (!s) {
                    console.log("service.layout.sortDimensionArray: no valid dimensions");
                    return null
                }
                r = r || "dimensionName";
                Ext.Array.sort(s, function (u, t) {
                    if (u[r] < t[r]) {
                        return -1
                    }
                    if (u[r] > t[r]) {
                        return 1
                    }
                    return 0
                });
                for (var q = 0, p; q < s.length; q++) {
                    l.prototype.array.sort(s[q].items, "ASC", "id");
                    if (l.prototype.array.getLength(s[q].ids)) {
                        l.prototype.array.sort(s[q].ids)
                    }
                }
                return s
            };
            i.layout.getObjectNameDimensionMapFromDimensionArray = function (s) {
                var r = {};
                if (!l.prototype.array.getLength(s)) {
                    return null
                }
                for (var p = 0, q; p < s.length; p++) {
                    q = m.layout.Dimension(s[p]);
                    if (q) {
                        r[q.dimension] = q
                    }
                }
                return l.prototype.object.getLength(r) ? r : null
            };
            i.layout.getObjectNameDimensionItemsMapFromDimensionArray = function (s) {
                var r = {};
                if (!l.prototype.array.getLength(s)) {
                    return null
                }
                for (var p = 0, q; p < s.length; p++) {
                    q = m.layout.Dimension(s[p]);
                    if (q) {
                        r[q.dimension] = q.items
                    }
                }
                return l.prototype.object.getLength(r) ? r : null
            };
            i.layout.getExtendedLayout = function (u) {
                var u = Ext.clone(u), w = {
                    columns: [],
                    rows: [],
                    filters: [],
                    columnObjectNames: [],
                    columnDimensionNames: [],
                    columnItems: [],
                    columnIds: [],
                    rowObjectNames: [],
                    rowDimensionNames: [],
                    rowItems: [],
                    rowIds: [],
                    axisDimensions: [],
                    axisObjectNames: [],
                    axisDimensionNames: [],
                    sortedAxisDimensionNames: [],
                    filterDimensions: [],
                    filterObjectNames: [],
                    filterDimensionNames: [],
                    filterItems: [],
                    filterIds: [],
                    sortedFilterDimensions: [],
                    dimensions: [],
                    objectNames: [],
                    dimensionNames: [],
                    objectNameDimensionsMap: {},
                    objectNameItemsMap: {},
                    objectNameIdsMap: {},
                    dimensionNameDimensionsMap: {},
                    dimensionNameItemsMap: {},
                    dimensionNameIdsMap: {},
                    dimensionNameSortedIdsMap: {}
                };
                Ext.applyIf(w, u);
                if (u.columns) {
                    for (var s = 0, t, v, p; s < u.columns.length; s++) {
                        t = u.columns[s];
                        v = t.items;
                        p = {};
                        p.dimension = t.dimension;
                        p.objectName = t.dimension;
                        p.dimensionName = n.objectNameMap[t.dimension].dimensionName;
                        if (v) {
                            p.items = v;
                            p.ids = [];
                            for (var r = 0; r < v.length; r++) {
                                p.ids.push(v[r].id)
                            }
                        }
                        w.columns.push(p);
                        w.columnObjectNames.push(p.objectName);
                        w.columnDimensionNames.push(p.dimensionName);
                        w.columnItems = w.columnItems.concat(p.items);
                        w.columnIds = w.columnIds.concat(p.ids);
                        w.axisDimensions.push(p);
                        w.axisObjectNames.push(p.objectName);
                        w.axisDimensionNames.push(n.objectNameMap[p.objectName].dimensionName);
                        w.objectNameDimensionsMap[p.objectName] = p;
                        w.objectNameItemsMap[p.objectName] = p.items;
                        w.objectNameIdsMap[p.objectName] = p.ids
                    }
                }
                if (u.rows) {
                    for (var s = 0, t, v, p; s < u.rows.length; s++) {
                        t = u.rows[s];
                        v = t.items;
                        p = {};
                        p.dimension = t.dimension;
                        p.objectName = t.dimension;
                        p.dimensionName = n.objectNameMap[t.dimension].dimensionName;
                        if (v) {
                            p.items = v;
                            p.ids = [];
                            for (var r = 0; r < v.length; r++) {
                                p.ids.push(v[r].id)
                            }
                        }
                        w.rows.push(p);
                        w.rowObjectNames.push(p.objectName);
                        w.rowDimensionNames.push(p.dimensionName);
                        w.rowItems = w.rowItems.concat(p.items);
                        w.rowIds = w.rowIds.concat(p.ids);
                        w.axisDimensions.push(p);
                        w.axisObjectNames.push(p.objectName);
                        w.axisDimensionNames.push(n.objectNameMap[p.objectName].dimensionName);
                        w.objectNameDimensionsMap[p.objectName] = p;
                        w.objectNameItemsMap[p.objectName] = p.items;
                        w.objectNameIdsMap[p.objectName] = p.ids
                    }
                }
                if (u.filters) {
                    for (var s = 0, t, v, p; s < u.filters.length; s++) {
                        t = u.filters[s];
                        v = t.items;
                        p = {};
                        p.dimension = t.dimension;
                        p.objectName = t.dimension;
                        p.dimensionName = n.objectNameMap[t.dimension].dimensionName;
                        if (v) {
                            p.items = v;
                            p.ids = [];
                            for (var r = 0; r < v.length; r++) {
                                p.ids.push(v[r].id)
                            }
                        }
                        w.filters.push(p);
                        w.filterDimensions.push(p);
                        w.filterObjectNames.push(p.objectName);
                        w.filterDimensionNames.push(n.objectNameMap[p.objectName].dimensionName);
                        w.filterItems = w.filterItems.concat(p.items);
                        w.filterIds = w.filterIds.concat(p.ids);
                        w.objectNameDimensionsMap[p.objectName] = p;
                        w.objectNameItemsMap[p.objectName] = p.items;
                        w.objectNameIdsMap[p.objectName] = p.ids
                    }
                }
                w.axisDimensionNames = Ext.Array.unique(w.axisDimensionNames);
                w.filterDimensionNames = Ext.Array.unique(w.filterDimensionNames);
                w.columnDimensionNames = Ext.Array.unique(w.columnDimensionNames);
                w.rowDimensionNames = Ext.Array.unique(w.rowDimensionNames);
                w.filterDimensionNames = Ext.Array.unique(w.filterDimensionNames);
                w.sortedAxisDimensionNames = Ext.clone(w.axisDimensionNames).sort();
                w.sortedFilterDimensions = i.layout.sortDimensionArray(Ext.clone(w.filterDimensions));
                w.dimensions = [].concat(w.axisDimensions, w.filterDimensions);
                w.objectNames = [].concat(w.axisObjectNames, w.filterObjectNames);
                w.dimensionNames = [].concat(w.axisDimensionNames, w.filterDimensionNames);
                for (var s = 0, q; s < w.dimensionNames.length; s++) {
                    q = w.dimensionNames[s];
                    w.dimensionNameDimensionsMap[q] = [];
                    w.dimensionNameItemsMap[q] = [];
                    w.dimensionNameIdsMap[q] = []
                }
                for (var s = 0, p; s < w.dimensions.length; s++) {
                    p = w.dimensions[s];
                    w.dimensionNameDimensionsMap[p.dimensionName].push(p);
                    w.dimensionNameItemsMap[p.dimensionName] = w.dimensionNameItemsMap[p.dimensionName].concat(p.items);
                    w.dimensionNameIdsMap[p.dimensionName] = w.dimensionNameIdsMap[p.dimensionName].concat(p.ids)
                }
                for (var x in w.dimensionNameIdsMap) {
                    if (w.dimensionNameIdsMap.hasOwnProperty(x)) {
                        w.dimensionNameSortedIdsMap[x] = Ext.clone(w.dimensionNameIdsMap[x]).sort()
                    }
                }
                return w
            };
            i.layout.getSyncronizedXLayout = function (z, p) {
                var t = Ext.Array.clean([].concat(z.columns || [], z.rows || [], z.filters || [])), L = z.objectNameDimensionsMap[n.organisationUnit.objectName], w = L && Ext.Array.contains(L.ids, "USER_ORGUNIT"), N = L && Ext.Array.contains(L.ids, "USER_ORGUNIT_CHILDREN"), K = L && Ext.Array.contains(L.ids, "USER_ORGUNIT_GRANDCHILDREN"), q = function () {
                    if (L && Ext.isArray(L.ids)) {
                        for (var P = 0; P < L.ids.length; P++) {
                            if (L.ids[P].substr(0, 5) === "LEVEL") {
                                return true
                            }
                        }
                    }
                    return false
                }(), y = function () {
                    if (L && Ext.isArray(L.ids)) {
                        for (var P = 0; P < L.ids.length; P++) {
                            if (L.ids[P].substr(0, 8) === "OU_GROUP") {
                                return true
                            }
                        }
                    }
                    return false
                }(), s = n.organisationUnit.objectName, O;
                for (var H = 0, F, x, A; H < t.length; H++) {
                    F = t[H];
                    F.items = [];
                    x = p.metaData[F.objectName];
                    if (F.dimensionName === s) {
                        if (w || N || K) {
                            var J, v, C;
                            if (o.user && w) {
                                J = [];
                                for (var E = 0; E < o.user.ou.length; E++) {
                                    J.push({id: o.user.ou[E], name: p.metaData.names[o.user.ou[E]]})
                                }
                            }
                            if (o.user && o.user.ouc && N) {
                                v = [];
                                for (var E = 0; E < o.user.ouc.length; E++) {
                                    v.push({id: o.user.ouc[E], name: p.metaData.names[o.user.ouc[E]]})
                                }
                                l.prototype.array.sort(v)
                            }
                            if (o.user && o.user.ouc && K) {
                                var r = [].concat(o.user.ou, o.user.ouc), u = p.metaData[s];
                                C = [];
                                for (var E = 0, B; E < u.length; E++) {
                                    B = u[E];
                                    if (!Ext.Array.contains(r, B)) {
                                        C.push({id: B, name: p.metaData.names[B]})
                                    }
                                }
                                l.prototype.array.sort(C)
                            }
                            F.items = [].concat(J || [], v || [], C || [])
                        } else {
                            if (q || y) {
                                for (var E = 0, u = p.metaData[s], B; E < u.length; E++) {
                                    B = u[E];
                                    F.items.push({id: B, name: p.metaData.names[B]})
                                }
                                l.prototype.array.sort(F.items)
                            } else {
                                F.items = Ext.clone(z.dimensionNameItemsMap[F.dimensionName])
                            }
                        }
                    } else {
                        if (Ext.isArray(x) && x.length) {
                            var D = Ext.clone(p.metaData[F.dimensionName]);
                            for (var E = 0; E < D.length; E++) {
                                F.items.push({id: D[E], name: p.metaData.names[D[E]]})
                            }
                        } else {
                            F.items = Ext.clone(z.objectNameItemsMap[F.objectName])
                        }
                    }
                }
                O = m.layout.Layout(z);
                if (O) {
                    t = Ext.Array.clean([].concat(O.columns || [], O.rows || [], O.filters || []));
                    for (var H = 0, G = p.metaData.names, I; H < t.length; H++) {
                        I = t[H].items;
                        if (Ext.isArray(I) && I.length) {
                            for (var E = 0, M; E < I.length; E++) {
                                M = I[E];
                                if (Ext.isObject(M) && Ext.isString(G[M.id]) && !Ext.isString(M.name)) {
                                    M.name = G[M.id] || ""
                                }
                            }
                        }
                    }
                    return i.layout.getExtendedLayout(O)
                }
                return null
            };
            i.layout.layout2plugin = function (u, r) {
                var u = Ext.clone(u), t = Ext.Array.clean([].concat(u.columns || [], u.rows || [], u.filters || []));
                u.url = o.contextPath;
                if (r) {
                    u.el = r
                }
                if (Ext.isString(u.id)) {
                    return {id: u.id}
                }
                for (var q = 0, v, s; q < t.length; q++) {
                    v = t[q];
                    delete v.id;
                    delete v.ids;
                    delete v.type;
                    delete v.dimensionName;
                    delete v.objectName;
                    for (var p = 0, s; p < v.items.length; p++) {
                        s = v.items[p];
                        delete s.name;
                        delete s.code;
                        delete s.created;
                        delete s.lastUpdated;
                        delete s.value
                    }
                }
                if (!u.showTrendLine) {
                    delete u.showTrendLine
                }
                if (!u.targetLineValue) {
                    delete u.targetLineValue
                }
                if (!u.targetLineTitle) {
                    delete u.targetLineTitle
                }
                if (!u.baseLineValue) {
                    delete u.baseLineValue
                }
                if (!u.baseLineTitle) {
                    delete u.baseLineTitle
                }
                if (u.showValues) {
                    delete u.showValues
                }
                if (!u.hideLegend) {
                    delete u.hideLegend
                }
                if (!u.hideTitle) {
                    delete u.hideTitle
                }
                if (!u.title) {
                    delete u.title
                }
                if (!u.domainAxisTitle) {
                    delete u.domainAxisTitle
                }
                if (!u.rangeAxisTitle) {
                    delete u.rangeAxisTitle
                }
                if (!u.sorting) {
                    delete u.sorting
                }
                delete u.parentGraphMap;
                delete u.reportingPeriod;
                delete u.organisationUnit;
                delete u.parentOrganisationUnit;
                delete u.regression;
                delete u.cumulative;
                delete u.sortOrder;
                delete u.topLimit;
                return u
            };
            i.layout.analytical2layout = function (q) {
                var s = Ext.clone(q), t = n.category.objectName;
                q = Ext.clone(q);
                s.columns = [];
                s.rows = [];
                s.filters = s.filters || [];
                if (Ext.isArray(q.columns) && q.columns.length) {
                    q.columns.reverse();
                    for (var p = 0, r; p < q.columns.length; p++) {
                        r = q.columns[p];
                        if (r.dimension === t) {
                            continue
                        }
                        if (!s.columns.length) {
                            s.columns.push(r)
                        } else {
                            if (r.dimension === n.indicator.objectName) {
                                s.filters.push(s.columns.pop());
                                s.columns = [r]
                            } else {
                                s.filters.push(r)
                            }
                        }
                    }
                }
                if (Ext.isArray(q.rows) && q.rows.length) {
                    q.rows.reverse();
                    for (var p = 0, r; p < q.rows.length; p++) {
                        r = q.rows[p];
                        if (r.dimension === t) {
                            continue
                        }
                        if (!s.rows.length) {
                            s.rows.push(r)
                        } else {
                            if (r.dimension === n.indicator.objectName) {
                                s.filters.push(s.rows.pop());
                                s.rows = [r]
                            } else {
                                s.filters.push(r)
                            }
                        }
                    }
                }
                return s
            };
            i.response = {};
            i.response.getExtendedResponse = function (q, p) {
                var r = [];
                p.nameHeaderMap = {};
                p.idValueMap = {};
                (function () {
                    for (var s = 0, t; s < p.headers.length; s++) {
                        t = p.headers[s];
                        t.index = s;
                        if (t.meta) {
                            t.ids = Ext.clone(q.dimensionNameIdsMap[t.name]) || [];
                            t.size = t.ids.length;
                            r = r.concat(t.ids)
                        }
                    }
                    for (var s = 0, t; s < p.headers.length; s++) {
                        t = p.headers[s];
                        p.nameHeaderMap[t.name] = t
                    }
                }());
                (function () {
                    for (var s = 0, u, t; s < r.length; s++) {
                        u = r[s];
                        if (u.indexOf("#") !== -1) {
                            t = u.split("#");
                            p.metaData.names[u] = p.metaData.names[t[0]] + " " + p.metaData.names[t[1]]
                        }
                    }
                }());
                (function () {
                    var x = p.nameHeaderMap[k.finals.dimension.value.value].index, t = p.nameHeaderMap[k.finals.dimension.category.dimensionName], B = n.data.dimensionName, y = n.category.dimensionName, v = q.axisDimensionNames, z = [];
                    for (var w = 0; w < v.length; w++) {
                        z.push(p.nameHeaderMap[v[w]].index);
                        if (t && !Ext.Array.contains(v, y) && v[w] === B) {
                            z.push(t.index)
                        }
                    }
                    for (var w = 0, A, s; w < p.rows.length; w++) {
                        A = p.rows[w];
                        s = "";
                        for (var u = 0; u < z.length; u++) {
                            s += A[z[u]]
                        }
                        p.idValueMap[s] = A[x]
                    }
                }());
                return p
            }
        }());
        (function () {
            j.mask = {};
            j.mask.show = function (p, q) {
                if (!Ext.isObject(p)) {
                    console.log("support.gui.mask.show: component not an object");
                    return null
                }
                q = q || "Loading..";
                if (p.mask) {
                    p.mask.destroy();
                    p.mask = null
                }
                p.mask = new Ext.create("Ext.LoadMask", p, {
                    shadow: false,
                    message: q,
                    style: "box-shadow:0",
                    bodyStyle: "box-shadow:0"
                });
                p.mask.show()
            };
            j.mask.hide = function (p) {
                if (!Ext.isObject(p)) {
                    console.log("support.gui.mask.hide: component not an object");
                    return null
                }
                if (p.mask) {
                    p.mask.destroy();
                    p.mask = null
                }
            };
            j.message = {};
            j.message.alert = function (p) {
                console.log(p)
            };
            j.analytics = {};
            j.analytics.getParamString = function (B, s) {
                var w = s ? B.sortedAxisDimensionNames : B.axisDimensionNames, C = s ? B.sortedFilterDimensions : B.filterDimensions, p = s ? B.dimensionNameSortedIdsMap : B.dimensionNameIdsMap, t = "?", r = false, q = B.dimensionNameItemsMap, D = n.indicator.dimensionName;
                for (var x = 0, u, A; x < w.length; x++) {
                    u = w[x];
                    t += "dimension=" + u;
                    A = Ext.clone(p[u]);
                    if (u === D) {
                        for (var v = 0, z; v < A.length; v++) {
                            z = A[v].indexOf("#");
                            if (z > 0) {
                                r = true;
                                A[v] = A[v].substr(0, z)
                            }
                        }
                        A = Ext.Array.unique(A)
                    }
                    if (u !== n.category.dimensionName) {
                        t += ":" + A.join(";")
                    }
                    if (x < (w.length - 1)) {
                        t += "&"
                    }
                }
                if (r) {
                    t += "&dimension=" + k.finals.dimension.category.dimensionName
                }
                if (Ext.isArray(C) && C.length) {
                    for (var x = 0, y; x < C.length; x++) {
                        y = C[x];
                        t += "&filter=" + y.dimensionName + ":" + y.ids.join(";")
                    }
                }
                return t
            };
            j.analytics.validateUrl = function (q) {
                var r;
                if (Ext.isIE) {
                    r = "Too many items selected (url has " + q.length + " characters). Internet Explorer accepts maximum 2048 characters."
                } else {
                    var p = q.length > 8000 ? "8000" : (q.length > 4000 ? "4000" : "2000");
                    r = "Too many items selected (url has " + q.length + " characters). Please reduce to less than " + p + " characters."
                }
                r += "\n\nHint: A good way to reduce the number of items is to use relative periods and level/group organisation unit selection modes.";
                alert(r)
            };
            j.chart = {};
            j.chart.createChart = function (K) {
                var u = K.app.xResponse, A = K.app.xLayout, w, s, D, t, H, J, q, x, G, C, I, v, B, r, F, E, z, y, p = {};
                t = function () {
                    var ac = k.finals.dimension.period.dimensionName, M = A.columns[0].dimensionName, Q = A.rows[0].dimensionName, ad = [], L = A.columnIds, P = A.rowIds, N = [], ab = [], O = [], R;
                    for (var aa = 0, S, X, U, T; aa < P.length; aa++) {
                        S = {};
                        X = P[aa];
                        U = [];
                        T = false;
                        S[k.finals.data.domain] = u.metaData.names[X];
                        for (var Y = 0, V, W; Y < L.length; Y++) {
                            V = l.prototype.str.replaceAll(L[Y], "#", "") + l.prototype.str.replaceAll(P[aa], "#", "");
                            W = u.idValueMap[V];
                            U.push(W);
                            S[L[Y]] = W ? parseFloat(W) : "0.0"
                        }
                        T = !(Ext.Array.clean(U).length);
                        if (!(T && A.hideEmptyRows)) {
                            ad.push(S)
                        }
                    }
                    if (A.showTrendLine) {
                        for (var aa = 0, Z, ae; aa < L.length; aa++) {
                            Z = new b();
                            ae = k.finals.data.trendLine + L[aa];
                            for (var Y = 0; Y < ad.length; Y++) {
                                Z.addData(Y, ad[Y][L[aa]])
                            }
                            for (var Y = 0; Y < ad.length; Y++) {
                                ad[Y][ae] = parseFloat(Z.predict(Y).toFixed(1))
                            }
                            N.push(ae);
                            u.metaData.names[ae] = DV.i18n.trend + " (" + u.metaData.names[L[aa]] + ")"
                        }
                    }
                    if (Ext.isNumber(A.targetLineValue) || Ext.isNumber(parseFloat(A.targetLineValue))) {
                        for (var aa = 0; aa < ad.length; aa++) {
                            ad[aa][k.finals.data.targetLine] = parseFloat(A.targetLineValue)
                        }
                        ab.push(k.finals.data.targetLine)
                    }
                    if (Ext.isNumber(A.baseLineValue) || Ext.isNumber(parseFloat(A.baseLineValue))) {
                        for (var aa = 0; aa < ad.length; aa++) {
                            ad[aa][k.finals.data.baseLine] = parseFloat(A.baseLineValue)
                        }
                        O.push(k.finals.data.baseLine)
                    }
                    R = Ext.create("Ext.data.Store", {
                        fields: function () {
                            var af = Ext.clone(L);
                            af.push(k.finals.data.domain);
                            af = af.concat(N, ab, O);
                            return af
                        }(), data: ad
                    });
                    R.rangeFields = L;
                    R.domainFields = [k.finals.data.domain];
                    R.trendLineFields = N;
                    R.targetLineFields = ab;
                    R.baseLineFields = O;
                    R.numericFields = [].concat(R.rangeFields, R.trendLineFields, R.targetLineFields, R.baseLineFields);
                    R.getMaximum = function () {
                        var ag = [];
                        for (var af = 0; af < R.numericFields.length; af++) {
                            ag.push(R.max(R.numericFields[af]))
                        }
                        return Ext.Array.max(ag)
                    };
                    R.getMinimum = function () {
                        var ag = [];
                        for (var af = 0; af < R.numericFields.length; af++) {
                            ag.push(R.min(R.numericFields[af]))
                        }
                        return Ext.Array.min(ag)
                    };
                    R.getMaximumSum = function () {
                        var ag = [], af = 0;
                        R.each(function (ah) {
                            af = 0;
                            for (var ai = 0; ai < R.rangeFields.length; ai++) {
                                af += ah.data[R.rangeFields[ai]]
                            }
                            ag.push(af)
                        });
                        return Ext.Array.max(ag)
                    };
                    R.hasDecimals = function () {
                        var af = R.getRange();
                        for (var ah = 0; ah < af.length; ah++) {
                            for (var ag = 0, ai; ag < R.rangeFields.length; ag++) {
                                ai = af[ah].data[R.rangeFields[ag]];
                                if (Ext.isNumber(ai) && (ai % 1)) {
                                    return true
                                }
                            }
                        }
                        return false
                    };
                    R.getNumberOfDecimals = function () {
                        var ag = R.getRange(), af = [];
                        for (var ai = 0; ai < ag.length; ai++) {
                            for (var ah = 0, aj; ah < R.rangeFields.length; ah++) {
                                aj = ag[ai].data[R.rangeFields[ah]];
                                if (Ext.isNumber(aj) && (aj % 1)) {
                                    aj = aj.toString();
                                    af.push(aj.length - aj.indexOf(".") - 1)
                                }
                            }
                        }
                        return Ext.Array.max(af)
                    };
                    if (DV.isDebug) {
                        console.log("data", ad);
                        console.log("rangeFields", R.rangeFields);
                        console.log("domainFields", R.domainFields);
                        console.log("trendLineFields", R.trendLineFields);
                        console.log("targetLineFields", R.targetLineFields);
                        console.log("baseLineFields", R.baseLineFields)
                    }
                    return R
                };
                H = function (O) {
                    var N = k.finals.chart, Q = O.getMinimum(), R, M, P;
                    getRenderer = function (S) {
                        var U = "0.";
                        for (var T = 0; T < S; T++) {
                            U += "0"
                        }
                        return U
                    };
                    if ((A.type === N.stackedcolumn || A.type === N.stackedbar) && (A.showTrendLine || A.targetLineValue || A.baseLineValue)) {
                        var L = [O.getMaximum(), O.getMaximumSum()];
                        R = Math.ceil(Ext.Array.max(L) * 1.1);
                        R = Math.floor(R / 10) * 10
                    }
                    M = O.getNumberOfDecimals();
                    renderer = !!M && (O.getMaximum() < 20) ? getRenderer(M) : "0,0";
                    P = {
                        type: "Numeric",
                        position: "left",
                        fields: O.numericFields,
                        minimum: Q < 0 ? Q : 0,
                        label: {renderer: Ext.util.Format.numberRenderer(renderer)},
                        grid: {
                            odd: {opacity: 1, stroke: "#aaa", "stroke-width": 0.1},
                            even: {opacity: 1, stroke: "#aaa", "stroke-width": 0.1}
                        }
                    };
                    if (R) {
                        P.maximum = R
                    }
                    if (A.rangeAxisMaxValue) {
                        P.maximum = A.rangeAxisMaxValue
                    }
                    if (A.rangeAxisMinValue) {
                        P.minimum = A.rangeAxisMinValue
                    }
                    if (A.rangeAxisSteps) {
                        P.majorTickSteps = A.rangeAxisSteps - 1
                    }
                    if (A.rangeAxisDecimals) {
                        P.label.renderer = Ext.util.Format.numberRenderer(getRenderer(A.rangeAxisDecimals))
                    }
                    if (A.rangeAxisTitle) {
                        P.title = A.rangeAxisTitle
                    }
                    return P
                };
                J = function (L) {
                    var M = {
                        type: "Category",
                        position: "bottom",
                        fields: L.domainFields,
                        label: {rotate: {degrees: 330}}
                    };
                    if (A.domainAxisTitle) {
                        M.title = A.domainAxisTitle
                    }
                    return M
                };
                q = function (M) {
                    var L = [];
                    if (A.legend && A.legend.seriesNames) {
                        return A.legend.seriesNames
                    } else {
                        for (var P = 0, R, O, N, Q; P < M.rangeFields.length; P++) {
                            R = M.rangeFields[P];
                            O = u.metaData.names[R];
                            if (Ext.isObject(A.legend) && A.legend.maxLength) {
                                var N = parseInt(A.legend.maxLength);
                                if (Ext.isNumber(N)) {
                                    O = O.substr(0, N) + ".."
                                }
                            }
                            L.push(O)
                        }
                    }
                    return L
                };
                x = function (M) {
                    var L = {
                        type: "column",
                        axis: "left",
                        xField: M.domainFields,
                        yField: M.rangeFields,
                        style: {opacity: 0.8, lineWidth: 3},
                        markerConfig: {type: "circle", radius: 4},
                        tips: v(),
                        title: q(M)
                    };
                    if (A.showValues) {
                        L.label = {
                            display: "outside",
                            "text-anchor": "middle",
                            field: M.rangeFields,
                            font: k.chart.style.fontFamily,
                            renderer: function (N) {
                                return N === "0.0" ? "" : N
                            }
                        }
                    }
                    return L
                };
                G = function (M) {
                    var L = [];
                    for (var N = 0; N < M.trendLineFields.length; N++) {
                        L.push({
                            type: "line",
                            axis: "left",
                            xField: M.domainFields,
                            yField: M.trendLineFields[N],
                            style: {opacity: 0.8, lineWidth: 3, "stroke-dasharray": 8},
                            markerConfig: {type: "circle", radius: 0},
                            title: u.metaData.names[M.trendLineFields[N]]
                        })
                    }
                    return L
                };
                C = function (L) {
                    return {
                        type: "line",
                        axis: "left",
                        xField: L.domainFields,
                        yField: L.targetLineFields,
                        style: {opacity: 1, lineWidth: 2, "stroke-width": 1, stroke: "#041423"},
                        showMarkers: false,
                        title: (Ext.isString(A.targetLineTitle) ? A.targetLineTitle : DV.i18n.target) + " (" + A.targetLineValue + ")"
                    }
                };
                I = function (L) {
                    return {
                        type: "line",
                        axis: "left",
                        xField: L.domainFields,
                        yField: L.baseLineFields,
                        style: {opacity: 1, lineWidth: 2, "stroke-width": 1, stroke: "#041423"},
                        showMarkers: false,
                        title: (Ext.isString(A.baseLineTitle) ? A.baseLineTitle : DV.i18n.base) + " (" + A.baseLineValue + ")"
                    }
                };
                v = function () {
                    return {
                        trackMouse: true, cls: "dv-chart-tips", renderer: function (L, M) {
                            var N = M.value[1] === "0.0" ? "-" : M.value[1];
                            this.update('<div style="text-align:center"><div style="font-size:17px; font-weight:bold">' + N + '</div><div style="font-size:10px">' + L.data[k.finals.data.domain] + "</div></div>")
                        }
                    }
                };
                B = function (M) {
                    var L = k.chart.theme.dv1.slice(0, M.rangeFields.length);
                    if (A.targetLineValue || A.baseLineValue) {
                        L.push("#051a2e")
                    }
                    if (A.targetLineValue) {
                        L.push("#051a2e")
                    }
                    if (A.baseLineValue) {
                        L.push("#051a2e")
                    }
                    Ext.chart.theme.dv1 = Ext.extend(Ext.chart.theme.Base, {
                        constructor: function (N) {
                            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                                seriesThemes: L,
                                colors: L
                            }, N))
                        }
                    })
                };
                r = function (W) {
                    var S = 30, R = 7, X, Y = 0, T = "", N, V = false, Q = "top", Z = 12, U = 0, P = ["top", "right", "bottom", "left"];
                    if (A.type === k.finals.chart.pie) {
                        X = W.getCount();
                        W.each(function (aa) {
                            T += aa.data[W.domainFields[0]]
                        })
                    } else {
                        X = W.rangeFields.length;
                        for (var O = 0, M, L; O < W.rangeFields.length; O++) {
                            if (W.rangeFields[O].indexOf("#") !== -1) {
                                L = W.rangeFields[O].split("#");
                                M = u.metaData.names[L[0]] + " " + u.metaData.names[L[1]]
                            } else {
                                M = u.metaData.names[W.rangeFields[O]]
                            }
                            T += M
                        }
                    }
                    Y = T.length;
                    N = (X * S) + (Y * R);
                    if (N > K.app.centerRegion.getWidth() - 50) {
                        V = true;
                        Q = "right"
                    }
                    if (Q === "right") {
                        U = 5
                    }
                    if (A.legend) {
                        if (Ext.Array.contains(P, A.legend.position)) {
                            Q = A.legend.position
                        }
                        Z = A.legend.fontSize || Z;
                        Z = parseInt(Z) + "px"
                    }
                    return Ext.create("Ext.chart.Legend", {
                        position: Q,
                        isVertical: V,
                        labelFont: Z + " " + k.chart.style.fontFamily,
                        boxStroke: "#ffffff",
                        boxStrokeWidth: 0,
                        padding: U
                    })
                };
                F = function (M) {
                    var O = A.filterIds, L = [], Q = "", P;
                    if (A.type === k.finals.chart.pie) {
                        O = O.concat(A.columnIds)
                    }
                    if (Ext.isArray(O) && O.length) {
                        for (var N = 0; N < O.length; N++) {
                            Q += u.metaData.names[O[N]];
                            Q += N < O.length - 1 ? ", " : ""
                        }
                    }
                    if (A.title) {
                        Q = A.title
                    }
                    P = (K.app.centerRegion.getWidth() / Q.length) < 11.6 ? 13 : 18;
                    return Ext.create("Ext.draw.Sprite", {
                        type: "text",
                        text: Q,
                        font: "bold " + P + "px " + k.chart.style.fontFamily,
                        fill: "#111",
                        height: 20,
                        y: 20
                    })
                };
                E = function () {
                    return function () {
                        this.animate = false;
                        this.setWidth(K.app.centerRegion.getWidth() - 15);
                        this.setHeight(K.app.centerRegion.getHeight() - 40);
                        this.animate = true
                    }
                };
                z = function () {
                    return function () {
                        if (this.items) {
                            var P = this.items[0], M = this.legend, O, L;
                            if (this.legend.position === "top") {
                                O = M.x + (M.width / 2);
                                L = O - (P.el.getWidth() / 2)
                            } else {
                                var N = M ? M.width : 0;
                                L = (this.width / 2) - (P.el.getWidth() / 2)
                            }
                            P.setAttributes({x: L}, true)
                        }
                    }
                };
                y = function (L, Q, N, P) {
                    var O, M = {
                        store: L,
                        axes: Q,
                        series: N,
                        animate: true,
                        shadow: false,
                        insetPadding: 35,
                        width: K.app.centerRegion.getWidth() - 15,
                        height: K.app.centerRegion.getHeight() - 40,
                        theme: P || "dv1"
                    };
                    if (!A.hideLegend) {
                        M.legend = r(L);
                        if (M.legend.position === "right") {
                            M.insetPadding = 40
                        }
                    }
                    if (!A.hideTitle) {
                        M.items = [F(L)]
                    } else {
                        M.insetPadding = 10
                    }
                    O = Ext.create("Ext.chart.Chart", M);
                    O.setChartSize = E();
                    O.setTitlePosition = z();
                    O.onViewportResize = function () {
                        O.setChartSize();
                        O.redraw();
                        O.setTitlePosition()
                    };
                    O.on("afterrender", function () {
                        O.setTitlePosition()
                    });
                    return O
                };
                p.column = function () {
                    var L = t(), P = H(L), O = J(L), N = [P, O], M = [x(L)];
                    if (A.showTrendLine) {
                        M = G(L).concat(M)
                    }
                    if (A.targetLineValue) {
                        M.push(C(L))
                    }
                    if (A.baseLineValue) {
                        M.push(I(L))
                    }
                    B(L);
                    return y(L, N, M)
                };
                p.stackedcolumn = function () {
                    var M = this.column();
                    for (var L = 0, N; L < M.series.items.length; L++) {
                        N = M.series.items[L];
                        if (N.type === k.finals.chart.column) {
                            N.stacked = true
                        }
                    }
                    return M
                };
                p.bar = function () {
                    var T = t(), P = H(T), Q = J(T), S, O = x(T), L, M, U, R;
                    P.position = "bottom";
                    Q.position = "left";
                    Q.label.rotate.degrees = 360;
                    S = [P, Q];
                    O.type = "bar";
                    O.axis = "bottom";
                    if (A.showValues) {
                        O.label = {display: "outside", "text-anchor": "middle", field: T.rangeFields}
                    }
                    O = [O];
                    if (A.showTrendLine) {
                        L = G(T);
                        for (var N = 0; N < L.length; N++) {
                            L[N].axis = "bottom";
                            L[N].xField = T.trendLineFields[N];
                            L[N].yField = T.domainFields
                        }
                        O = L.concat(O)
                    }
                    if (A.targetLineValue) {
                        M = C(T);
                        M.axis = "bottom";
                        M.xField = T.targetLineFields;
                        M.yField = T.domainFields;
                        O.push(M)
                    }
                    if (A.baseLineValue) {
                        U = I(T);
                        U.axis = "bottom";
                        U.xField = T.baseLineFields;
                        U.yField = T.domainFields;
                        O.push(U)
                    }
                    B(T);
                    return y(T, S, O)
                };
                p.stackedbar = function () {
                    var M = this.bar();
                    for (var L = 0, N; L < M.series.items.length; L++) {
                        N = M.series.items[L];
                        if (N.type === k.finals.chart.bar) {
                            N.stacked = true
                        }
                    }
                    return M
                };
                p.line = function () {
                    var S = t(), O = H(S), P = J(S), Q = [O, P], M = [], L = k.chart.theme.dv1.slice(0, S.rangeFields.length), R = q(S);
                    for (var N = 0, T; N < S.rangeFields.length; N++) {
                        T = {
                            type: "line",
                            axis: "left",
                            xField: S.domainFields,
                            yField: S.rangeFields[N],
                            style: {opacity: 0.8, lineWidth: 3},
                            markerConfig: {type: "circle", radius: 4},
                            tips: v(),
                            title: R[N]
                        };
                        M.push(T)
                    }
                    if (A.showTrendLine) {
                        M = G(S).concat(M);
                        L = L.concat(L)
                    }
                    if (A.targetLineValue) {
                        M.push(C(S));
                        L.push("#051a2e")
                    }
                    if (A.baseLineValue) {
                        M.push(I(S));
                        L.push("#051a2e")
                    }
                    Ext.chart.theme.dv1 = Ext.extend(Ext.chart.theme.Base, {
                        constructor: function (U) {
                            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                                seriesThemes: L,
                                colors: L
                            }, U))
                        }
                    });
                    return y(S, Q, M)
                };
                p.area = function () {
                    A.hideEmptyRows = true;
                    var L = t(), P = H(L), O = J(L), N = [P, O], M = x(L);
                    M.type = "area";
                    M.style.opacity = 0.7;
                    M.style.lineWidth = 0;
                    delete M.label;
                    delete M.tips;
                    M = [M];
                    if (A.showTrendLine) {
                        M = G(L).concat(M)
                    }
                    if (A.targetLineValue) {
                        M.push(C(L))
                    }
                    if (A.baseLineValue) {
                        M.push(I(L))
                    }
                    B(L);
                    return y(L, N, M)
                };
                p.pie = function () {
                    var M = t(), O, L, P, N = {field: k.finals.data.domain};
                    if (A.showValues) {
                        N.display = "middle";
                        N.contrast = true;
                        N.font = "14px " + k.chart.style.fontFamily;
                        N.renderer = function (R) {
                            var Q = M.getAt(M.findExact(k.finals.data.domain, R));
                            return Q.data[M.rangeFields[0]]
                        }
                    }
                    O = [{
                        type: "pie",
                        field: M.rangeFields[0],
                        donut: 7,
                        showInLegend: true,
                        highlight: {segment: {margin: 5}},
                        label: N,
                        style: {opacity: 0.8, stroke: "#555"},
                        tips: {
                            trackMouse: true, cls: "dv-chart-tips", renderer: function (Q) {
                                this.update('<div style="text-align:center"><div style="font-size:17px; font-weight:bold">' + Q.data[M.rangeFields[0]] + '</div><div style="font-size:10px">' + Q.data[k.finals.data.domain] + "</div></div>")
                            }
                        }
                    }];
                    L = k.chart.theme.dv1.slice(0, u.nameHeaderMap[A.rowDimensionNames[0]].ids.length);
                    Ext.chart.theme.dv1 = Ext.extend(Ext.chart.theme.Base, {
                        constructor: function (Q) {
                            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                                seriesThemes: L,
                                colors: L
                            }, Q))
                        }
                    });
                    P = y(M, null, O);
                    P.insetPadding = 40;
                    P.shadow = true;
                    return P
                };
                p.radar = function () {
                    var L = t(), R = [], O = [], N = q(L), P;
                    R.push({type: "Radial", position: "radial", label: {display: true}});
                    for (var M = 0, Q; M < L.rangeFields.length; M++) {
                        Q = {
                            showInLegend: true,
                            type: "radar",
                            xField: L.domainFields,
                            yField: L.rangeFields[M],
                            style: {opacity: 0.5},
                            tips: v(),
                            title: N[M]
                        };
                        if (A.showValues) {
                            Q.label = {display: "over", field: L.rangeFields[M]}
                        }
                        O.push(Q)
                    }
                    P = y(L, R, O, "Category2");
                    P.insetPadding = 40;
                    P.height = K.app.centerRegion.getHeight() - 80;
                    P.setChartSize = function () {
                        this.animate = false;
                        this.setWidth(K.app.centerRegion.getWidth());
                        this.setHeight(K.app.centerRegion.getHeight() - 80);
                        this.animate = true
                    };
                    return P
                };
                return p[A.type]()
            }
        }());
        (function () {
            if (Ext.isArray(o.dimensions)) {
                l.prototype.array.sort(o.dimensions);
                for (var p = 0, q; p < o.dimensions.length; p++) {
                    q = o.dimensions[p];
                    q.dimensionName = q.id;
                    q.objectName = k.finals.dimension.dimension.objectName;
                    k.finals.dimension.objectNameMap[q.id] = q
                }
            }
            if (o.user && o.user.ouc) {
                l.prototype.array.sort(o.user.ouc)
            }
        }());
        return {conf: k, api: m, support: l, service: i, web: j, init: o}
    };
    var d = ".dv-chart-tips { border-radius: 2px; padding: 0px 3px 1px; border: 2px solid #000; background-color: #000; } \n";
    d += ".dv-chart-tips .x-tip-body { background-color: #000; font-size: 13px; font-weight: normal; color: #fff; -webkit-text-stroke: 0; } \n";
    d += ".dv-chart-tips .x-tip-body div { font-family: arial,sans-serif,ubuntu,consolas !important; } \n";
    d += ".x-mask-msg { padding: 0; border: 0 none; background-image: none; background-color: transparent; } \n";
    d += ".x-mask-msg div { background-position: 11px center; } \n";
    d += ".x-mask-msg .x-mask-loading { border: 0 none; \n background-color: #000; color: #fff; border-radius: 2px; padding: 12px 14px 12px 30px; opacity: 0.65; } \n";
    d += ".x-mask { opacity: 0; } \n";
    Ext.util.CSS.createStyleSheet(d);
    DV.i18n = {target: "Target", base: "Base", trend: "Trend"};
    DV.plugin = {};
    var g = {user: {}}, f = [], h = false, c = false, a, e;
    a = function (j) {
        var o = false, n = [], m = 0, l;
        l = function () {
            if (++m === n.length) {
                c = true;
                for (var p = 0; p < f.length; p++) {
                    e(f[p])
                }
                f = []
            }
        };
        n.push({
            url: j + "/api/system/info.jsonp", success: function (i) {
                g.contextPath = i.contextPath;
                l()
            }
        });
        n.push({
            url: j + "/api/organisationUnits.jsonp?userOnly=true&viewClass=detailed&paging=false&links=false",
            success: function (t) {
                var s = t.organisationUnits || [], q = [], u = [];
                if (s.length) {
                    for (var p = 0, v; p < s.length; p++) {
                        v = s[p];
                        q.push(v.id);
                        if (v.children) {
                            u = Ext.Array.clean(u.concat(Ext.Array.pluck(v.children, "id") || []))
                        }
                    }
                    g.user = {ou: q, ouc: u}
                } else {
                    alert("User is not assigned to any organisation units")
                }
                l()
            }
        });
        n.push({
            url: j + "/api/dimensions.jsonp?links=false&paging=false", success: function (i) {
                g.dimensions = i.dimensions;
                l()
            }
        });
        for (var k = 0; k < n.length; k++) {
            Ext.data.JsonP.request(n[k])
        }
    };
    e = function (l) {
        var n, k, j, i, m = {core: {}, app: {}};
        n = function (o) {
            if (!Ext.isObject(o)) {
                console.log("Chart configuration is not an object");
                return
            }
            if (!Ext.isString(o.el)) {
                console.log("No element id provided");
                return
            }
            o.id = o.id || o.uid;
            return true
        };
        k = function (s) {
            var t = s.core.init, r = s.core.api, q = s.core.support, o = s.core.service, p = s.core.web;
            t.el = l.el;
            Ext.get(t.el).setStyle("opacity", 0);
            p.chart = p.chart || {};
            p.chart.loadChart = function (v, u) {
                if (!Ext.isString(v)) {
                    alert("Invalid chart id");
                    return
                }
                Ext.data.JsonP.request({
                    url: t.contextPath + "/api/charts/" + v + ".jsonp?viewClass=dimensional&links=false",
                    failure: function (w) {
                        window.open(t.contextPath + "/api/charts/" + v + ".json?viewClass=dimensional&links=false", "_blank")
                    },
                    success: function (x) {
                        Ext.apply(x, u);
                        var w = r.layout.Layout(x);
                        if (w) {
                            p.chart.getData(w, true)
                        }
                    }
                })
            };
            p.chart.getData = function (v, w) {
                var u, x;
                if (!v) {
                    return
                }
                u = o.layout.getExtendedLayout(v);
                x = p.analytics.getParamString(u, true);
                p.mask.show(s.app.centerRegion);
                Ext.data.JsonP.request({
                    url: t.contextPath + "/api/analytics.jsonp" + x,
                    timeout: 60000,
                    headers: {"Content-Type": "application/json", Accepts: "application/json"},
                    disableCaching: false,
                    failure: function (y) {
                        p.mask.hide(s.app.centerRegion);
                        window.open(t.contextPath + "/api/analytics.json" + x, "_blank")
                    },
                    success: function (z) {
                        var y = r.response.Response(z);
                        if (!y) {
                            p.mask.hide(s.app.centerRegion);
                            return
                        }
                        u = o.layout.getSyncronizedXLayout(u, y);
                        if (!u) {
                            p.mask.hide(s.app.centerRegion);
                            return
                        }
                        s.app.paramString = x;
                        p.chart.getChart(v, u, y, w)
                    }
                })
            };
            p.chart.getChart = function (z, w, v, A) {
                var B, y, u, x;
                if (!w) {
                    w = o.layout.getExtendedLayout(z)
                }
                B = o.response.getExtendedResponse(w, v);
                s.app.layout = z;
                s.app.xLayout = w;
                s.app.response = v;
                s.app.xResponse = B;
                if (DV.isDebug) {
                    console.log("layout", s.app.layout);
                    console.log("xLayout", s.app.xLayout);
                    console.log("response", s.app.response);
                    console.log("xResponse", s.app.xResponse)
                }
                s.app.chart = s.core.web.chart.createChart(s);
                s.app.chart.on("afterrender", function () {
                    Ext.defer(function () {
                        Ext.get(s.core.init.el).fadeIn({duration: 400})
                    }, 300)
                });
                s.app.centerRegion.removeAll();
                s.app.centerRegion.add(s.app.chart);
                p.mask.hide(s.app.centerRegion)
            }
        };
        j = function () {
            var r = Ext.get(m.core.init.el), u, o, v = parseInt(r.getStyle("border-left-width")) + parseInt(r.getStyle("border-right-width")), s = parseInt(r.getStyle("border-top-width")) + parseInt(r.getStyle("border-bottom-width")), t = parseInt(r.getStyle("padding-left")) + parseInt(r.getStyle("padding-right")), p = parseInt(r.getStyle("padding-top")) + parseInt(r.getStyle("padding-bottom")), q = r.getWidth() - v - t, w = r.getHeight() - s - p;
            o = Ext.create("Ext.panel.Panel", {
                renderTo: r,
                bodyStyle: "border: 0 none",
                width: l.width || q,
                height: l.height || w,
                layout: "fit"
            });
            return {centerRegion: o}
        };
        i = function () {
            if (!n(l)) {
                return
            }
            m.core = DV.getCore(Ext.clone(g));
            k(m);
            m.app.viewport = j();
            m.app.centerRegion = m.app.viewport.centerRegion;
            if (l.id) {
                m.core.web.chart.loadChart(l.id, l)
            } else {
                layout = m.core.api.layout.Layout(l);
                if (!layout) {
                    return
                }
                m.core.web.chart.getData(layout)
            }
        }()
    };
    DV.plugin.getChart = function (i) {
        if (Ext.isString(i.url) && i.url.split("").pop() === "/") {
            i.url = i.url.substr(0, i.url.length - 1)
        }
        if (c) {
            e(i)
        } else {
            f.push(i);
            if (!h) {
                h = true;
                a(i.url)
            }
        }
    };
    DHIS = Ext.isObject(window.DHIS) ? DHIS : {};
    DHIS.getChart = DV.plugin.getChart
});
