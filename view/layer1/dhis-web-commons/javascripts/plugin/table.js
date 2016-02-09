Ext.onReady(function () {
    Ext.Ajax.method = "GET";
    PT = {};
    PT.instances = [];
    PT.i18n = {};
    PT.isDebug = false;
    PT.isSessionStorage = ("sessionStorage" in window && window.sessionStorage !== null);
    PT.getCore = function (m) {
        var i = {}, k = {}, j = {}, g = {}, h = {}, l;
        (function () {
            i.finals = {
                url: {
                    path_module: "/dhis-web-pivot/",
                    organisationunitchildren_get: "getOrganisationUnitChildren.action"
                },
                dimension: {
                    data: {
                        value: "data",
                        name: PT.i18n.data,
                        dimensionName: "dx",
                        objectName: "dx",
                        warning: {filter: "..."}
                    },
                    category: {name: PT.i18n.categories, dimensionName: "co", objectName: "co"},
                    indicator: {value: "indicators", name: PT.i18n.indicators, dimensionName: "dx", objectName: "in"},
                    dataElement: {
                        value: "dataElements",
                        name: PT.i18n.data_elements,
                        dimensionName: "dx",
                        objectName: "de"
                    },
                    operand: {value: "operand", name: "Operand", dimensionName: "dx", objectName: "dc"},
                    dataSet: {value: "dataSets", name: PT.i18n.data_sets, dimensionName: "dx", objectName: "ds"},
                    period: {value: "period", name: PT.i18n.periods, dimensionName: "pe", objectName: "pe"},
                    fixedPeriod: {value: "periods"},
                    relativePeriod: {value: "relativePeriods"},
                    organisationUnit: {
                        value: "organisationUnits",
                        name: PT.i18n.organisation_units,
                        dimensionName: "ou",
                        objectName: "ou"
                    },
                    dimension: {value: "dimension"},
                    value: {value: "value"}
                },
                root: {id: "root"}
            };
            l = i.finals.dimension;
            l.objectNameMap = {};
            l.objectNameMap[l.data.objectName] = l.data;
            l.objectNameMap[l.indicator.objectName] = l.indicator;
            l.objectNameMap[l.dataElement.objectName] = l.dataElement;
            l.objectNameMap[l.operand.objectName] = l.operand;
            l.objectNameMap[l.dataSet.objectName] = l.dataSet;
            l.objectNameMap[l.category.objectName] = l.category;
            l.objectNameMap[l.period.objectName] = l.period;
            l.objectNameMap[l.organisationUnit.objectName] = l.organisationUnit;
            l.objectNameMap[l.dimension.objectName] = l.dimension;
            i.period = {
                periodTypes: [{id: "Daily", name: PT.i18n.daily}, {
                    id: "Weekly",
                    name: PT.i18n.weekly
                }, {id: "Monthly", name: PT.i18n.monthly}, {id: "BiMonthly", name: PT.i18n.bimonthly}, {
                    id: "Quarterly",
                    name: PT.i18n.quarterly
                }, {id: "SixMonthly", name: PT.i18n.sixmonthly}, {
                    id: "SixMonthlyApril",
                    name: PT.i18n.sixmonthly_april
                }, {id: "Yearly", name: PT.i18n.yearly}, {
                    id: "FinancialOct",
                    name: PT.i18n.financial_oct
                }, {id: "FinancialJuly", name: PT.i18n.financial_july}, {
                    id: "FinancialApril",
                    name: PT.i18n.financial_april
                }]
            };
            i.layout = {
                west_width: 424,
                west_fieldset_width: 418,
                west_width_padding: 2,
                west_fill: 2,
                west_fill_accordion_indicator: 56,
                west_fill_accordion_dataelement: 59,
                west_fill_accordion_dataset: 31,
                west_fill_accordion_period: 293,
                west_fill_accordion_organisationunit: 58,
                west_maxheight_accordion_indicator: 400,
                west_maxheight_accordion_dataelement: 400,
                west_maxheight_accordion_dataset: 400,
                west_maxheight_accordion_period: 513,
                west_maxheight_accordion_organisationunit: 900,
                west_maxheight_accordion_group: 340,
                west_maxheight_accordion_options: 449,
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
            i.pivot = {
                digitGroupSeparator: {comma: ",", space: " "},
                displayDensity: {compact: "3px", normal: "5px", comfortable: "10px"},
                fontSize: {small: "10px", normal: "11px", large: "13px"}
            }
        }());
        (function () {
            k.layout = {};
            k.layout.Record = function (n) {
                var n = Ext.clone(n);
                return function () {
                    if (!Ext.isObject(n)) {
                        console.log("Record: config is not an object: " + n);
                        return
                    }
                    if (!Ext.isString(n.id)) {
                        alert("Record: id is not text: " + n);
                        return
                    }
                    n.id = n.id.replace("#", ".");
                    return n
                }()
            };
            k.layout.Dimension = function (n) {
                var n = Ext.clone(n);
                return function () {
                    if (!Ext.isObject(n)) {
                        console.log("Dimension: config is not an object: " + n);
                        return
                    }
                    if (!Ext.isString(n.dimension)) {
                        console.log("Dimension: name is not a string: " + n);
                        return
                    }
                    if (n.dimension !== i.finals.dimension.category.objectName) {
                        var o = [];
                        if (!Ext.isArray(n.items)) {
                            console.log("Dimension: items is not an array: " + n);
                            return
                        }
                        for (var p = 0; p < n.items.length; p++) {
                            o.push(k.layout.Record(n.items[p]))
                        }
                        n.items = Ext.Array.clean(o);
                        if (!n.items.length) {
                            console.log("Dimension: has no valid items: " + n);
                            return
                        }
                    }
                    return n
                }()
            };
            k.layout.Layout = function (o) {
                var p = {}, n, q;
                n = function (s) {
                    var s = Ext.clone(s);
                    if (!(s && Ext.isArray(s) && s.length)) {
                        return
                    }
                    for (var r = 0; r < s.length; r++) {
                        s[r] = k.layout.Dimension(s[r])
                    }
                    s = Ext.Array.clean(s);
                    return s.length ? s : null
                };
                q = function () {
                    var t = i.finals.dimension, s, u = {};
                    if (!p) {
                        return
                    }
                    s = Ext.Array.clean([].concat(p.columns || [], p.rows || [], p.filters || []));
                    for (var r = 0; r < s.length; r++) {
                        u[s[r].dimension] = s[r]
                    }
                    if (p.filters && p.filters.length) {
                        for (var r = 0; r < p.filters.length; r++) {
                            if (p.filters[r].dimension === t.indicator.objectName) {
                                h.message.alert(PT.i18n.indicators_cannot_be_specified_as_filter || "Indicators cannot be specified as filter");
                                return
                            }
                            if (p.filters[r].dimension === t.category.objectName) {
                                h.message.alert(PT.i18n.categories_cannot_be_specified_as_filter || "Categories cannot be specified as filter");
                                return
                            }
                            if (p.filters[r].dimension === t.dataSet.objectName) {
                                h.message.alert(PT.i18n.data_sets_cannot_be_specified_as_filter || "Data sets cannot be specified as filter");
                                return
                            }
                        }
                    }
                    if (u[t.operand.objectName] && u[t.indicator.objectName]) {
                        h.message.alert("Indicators and detailed data elements cannot be specified together");
                        return
                    }
                    if (u[t.operand.objectName] && u[t.dataElement.objectName]) {
                        h.message.alert("Detailed data elements and totals cannot be specified together");
                        return
                    }
                    if (u[t.operand.objectName] && u[t.dataSet.objectName]) {
                        h.message.alert("Data sets and detailed data elements cannot be specified together");
                        return
                    }
                    if (u[t.operand.objectName] && u[t.category.objectName]) {
                        h.message.alert("Categories and detailed data elements cannot be specified together");
                        return
                    }
                    return true
                };
                return function () {
                    var r = [], t = i.finals.dimension;
                    if (!(o && Ext.isObject(o))) {
                        alert("Layout: config is not an object (" + m.el + ")");
                        return
                    }
                    o.columns = n(o.columns);
                    o.rows = n(o.rows);
                    o.filters = n(o.filters);
                    if (!(o.columns || o.rows)) {
                        alert(PT.i18n.at_least_one_dimension_must_be_specified_as_row_or_column);
                        return
                    }
                    for (var s = 0, u = Ext.Array.clean([].concat(o.columns || [], o.rows || [], o.filters || [])); s < u.length; s++) {
                        if (k.layout.Dimension(u[s])) {
                            r.push(u[s].dimension)
                        }
                    }
                    if (!Ext.Array.contains(r, t.period.objectName)) {
                        alert(PT.i18n.at_least_one_period_must_be_specified_as_column_row_or_filter);
                        return
                    }
                    if (o.id) {
                        p.id = o.id
                    }
                    if (o.name) {
                        p.name = o.name
                    }
                    p.columns = o.columns;
                    p.rows = o.rows;
                    p.filters = o.filters;
                    p.showTotals = Ext.isBoolean(o.totals) ? o.totals : (Ext.isBoolean(o.showTotals) ? o.showTotals : true);
                    p.showSubTotals = Ext.isBoolean(o.subtotals) ? o.subtotals : (Ext.isBoolean(o.showSubTotals) ? o.showSubTotals : true);
                    p.hideEmptyRows = Ext.isBoolean(o.hideEmptyRows) ? o.hideEmptyRows : false;
                    p.aggregationType = Ext.isString(o.aggregationType) ? o.aggregationType : "default";
                    p.showHierarchy = Ext.isBoolean(o.showHierarchy) ? o.showHierarchy : false;
                    p.displayDensity = Ext.isString(o.displayDensity) && !Ext.isEmpty(o.displayDensity) ? o.displayDensity : "normal";
                    p.fontSize = Ext.isString(o.fontSize) && !Ext.isEmpty(o.fontSize) ? o.fontSize : "normal";
                    p.digitGroupSeparator = Ext.isString(o.digitGroupSeparator) && !Ext.isEmpty(o.digitGroupSeparator) ? o.digitGroupSeparator : "space";
                    p.legendSet = Ext.isObject(o.legendSet) && Ext.isString(o.legendSet.id) ? o.legendSet : null;
                    p.parentGraphMap = Ext.isObject(o.parentGraphMap) ? o.parentGraphMap : null;
                    p.sorting = Ext.isObject(o.sorting) && Ext.isDefined(o.sorting.id) && Ext.isString(o.sorting.direction) ? o.sorting : null;
                    p.reportingPeriod = Ext.isObject(o.reportParams) && Ext.isBoolean(o.reportParams.paramReportingPeriod) ? o.reportParams.paramReportingPeriod : (Ext.isBoolean(o.reportingPeriod) ? o.reportingPeriod : false);
                    p.organisationUnit = Ext.isObject(o.reportParams) && Ext.isBoolean(o.reportParams.paramOrganisationUnit) ? o.reportParams.paramOrganisationUnit : (Ext.isBoolean(o.organisationUnit) ? o.organisationUnit : false);
                    p.parentOrganisationUnit = Ext.isObject(o.reportParams) && Ext.isBoolean(o.reportParams.paramParentOrganisationUnit) ? o.reportParams.paramParentOrganisationUnit : (Ext.isBoolean(o.parentOrganisationUnit) ? o.parentOrganisationUnit : false);
                    p.regression = Ext.isBoolean(o.regression) ? o.regression : false;
                    p.cumulative = Ext.isBoolean(o.cumulative) ? o.cumulative : false;
                    p.sortOrder = Ext.isNumber(o.sortOrder) ? o.sortOrder : 0;
                    p.topLimit = Ext.isNumber(o.topLimit) ? o.topLimit : 0;
                    if (!q()) {
                        return
                    }
                    return p
                }()
            };
            k.response = {};
            k.response.Header = function (n) {
                var n = Ext.clone(n);
                return function () {
                    if (!Ext.isObject(n)) {
                        console.log("Header: config is not an object: " + n);
                        return
                    }
                    if (!Ext.isString(n.name)) {
                        console.log("Header: name is not a string: " + n);
                        return
                    }
                    if (!Ext.isBoolean(n.meta)) {
                        console.log("Header: meta is not boolean: " + n);
                        return
                    }
                    return n
                }()
            };
            k.response.Response = function (n) {
                var n = Ext.clone(n);
                return function () {
                    if (!(n && Ext.isObject(n))) {
                        console.log("Response: config is not an object");
                        return
                    }
                    if (!(n.headers && Ext.isArray(n.headers))) {
                        console.log("Response: headers is not an array");
                        return
                    }
                    for (var o = 0, p; o < n.headers.length; o++) {
                        n.headers[o] = k.response.Header(n.headers[o])
                    }
                    n.headers = Ext.Array.clean(n.headers);
                    if (!n.headers.length) {
                        console.log("Response: no valid headers");
                        return
                    }
                    if (!(Ext.isArray(n.rows) && n.rows.length > 0)) {
                        alert("No values found");
                        return
                    }
                    if (n.headers.length !== n.rows[0].length) {
                        console.log("Response: headers.length !== rows[0].length")
                    }
                    return n
                }()
            }
        }());
        (function () {
            j.prototype = {};
            j.prototype.array = {};
            j.prototype.array.getLength = function (o, n) {
                if (!Ext.isArray(o)) {
                    if (!n) {
                        console.log("support.prototype.array.getLength: not an array")
                    }
                    return null
                }
                return o.length
            };
            j.prototype.array.sort = function (p, o, n) {
                if (!j.prototype.array.getLength(p)) {
                    return
                }
                n = n || "name";
                p.sort(function (r, q) {
                    if (Ext.isObject(r) && Ext.isObject(q) && n) {
                        r = r[n];
                        q = q[n]
                    }
                    if (Ext.isString(r) && Ext.isString(q)) {
                        r = r.toLowerCase();
                        q = q.toLowerCase();
                        if (o === "DESC") {
                            return r < q ? 1 : (r > q ? -1 : 0)
                        } else {
                            return r < q ? -1 : (r > q ? 1 : 0)
                        }
                    } else {
                        if (Ext.isNumber(r) && Ext.isNumber(q)) {
                            return o === "DESC" ? q - r : r - q
                        }
                    }
                    return -1
                });
                return p
            };
            j.prototype.object = {};
            j.prototype.object.getLength = function (n, q) {
                if (!Ext.isObject(n)) {
                    if (!q) {
                        console.log("support.prototype.object.getLength: not an object")
                    }
                    return null
                }
                var p = 0;
                for (var o in n) {
                    if (n.hasOwnProperty(o)) {
                        p++
                    }
                }
                return p
            };
            j.prototype.object.hasObject = function (o, r, q) {
                if (!j.prototype.object.getLength(o)) {
                    return null
                }
                for (var p in o) {
                    var n = o[p];
                    if (o.hasOwnProperty(p) && n[r] === q) {
                        return true
                    }
                }
                return null
            };
            j.prototype.str = {};
            j.prototype.str.replaceAll = function (p, o, n) {
                return p.replace(new RegExp(o, "g"), n)
            };
            j.prototype.str.toggleDirection = function (n) {
                return n === "DESC" ? "ASC" : "DESC"
            };
            j.prototype.number = {};
            j.prototype.number.getNumberOfDecimals = function (n) {
                var o = new String(n);
                return (o.indexOf(".") > -1) ? (o.length - o.indexOf(".") - 1) : 0
            };
            j.prototype.number.roundIf = function (p, n) {
                p = parseFloat(p);
                n = parseFloat(n);
                if (Ext.isNumber(p) && Ext.isNumber(n)) {
                    var o = j.prototype.number.getNumberOfDecimals(p);
                    return o > n ? Ext.Number.toFixed(p, n) : p
                }
                return p
            };
            j.prototype.number.prettyPrint = function (n, o) {
                o = o || "space";
                if (o === "none") {
                    return n
                }
                return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, i.pivot.digitGroupSeparator[o])
            };
            j.color = {};
            j.color.hexToRgb = function (p) {
                var o = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n;
                p = p.replace(o, function (s, u, t, q) {
                    return u + u + t + t + q + q
                });
                n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p);
                return n ? {r: parseInt(n[1], 16), g: parseInt(n[2], 16), b: parseInt(n[3], 16)} : null
            }
        }());
        (function () {
            g.layout = {};
            g.layout.cleanDimensionArray = function (o) {
                if (!j.prototype.array.getLength(o)) {
                    return null
                }
                var p = [];
                for (var n = 0; n < o.length; n++) {
                    p.push(k.layout.Dimension(o[n]))
                }
                p = Ext.Array.clean(p);
                return p.length ? p : null
            };
            g.layout.sortDimensionArray = function (q, p) {
                if (!j.prototype.array.getLength(q, true)) {
                    return null
                }
                q = g.layout.cleanDimensionArray(q);
                if (!q) {
                    console.log("service.layout.sortDimensionArray: no valid dimensions");
                    return null
                }
                p = p || "dimensionName";
                Ext.Array.sort(q, function (s, r) {
                    if (s[p] < r[p]) {
                        return -1
                    }
                    if (s[p] > r[p]) {
                        return 1
                    }
                    return 0
                });
                for (var o = 0, n; o < q.length; o++) {
                    j.prototype.array.sort(q[o].items, "ASC", "id");
                    if (j.prototype.array.getLength(q[o].ids)) {
                        j.prototype.array.sort(q[o].ids)
                    }
                }
                return q
            };
            g.layout.getObjectNameDimensionMapFromDimensionArray = function (q) {
                var p = {};
                if (!j.prototype.array.getLength(q)) {
                    return null
                }
                for (var n = 0, o; n < q.length; n++) {
                    o = k.layout.Dimension(q[n]);
                    if (o) {
                        p[o.dimension] = o
                    }
                }
                return j.prototype.object.getLength(p) ? p : null
            };
            g.layout.getObjectNameDimensionItemsMapFromDimensionArray = function (q) {
                var p = {};
                if (!j.prototype.array.getLength(q)) {
                    return null
                }
                for (var n = 0, o; n < q.length; n++) {
                    o = k.layout.Dimension(q[n]);
                    if (o) {
                        p[o.dimension] = o.items
                    }
                }
                return j.prototype.object.getLength(p) ? p : null
            };
            g.layout.getItemName = function (t, p, u, s) {
                var o = p.metaData, q = "";
                if (g.layout.isHierarchy(t, p, u)) {
                    var n = Ext.Array.clean(o.ouHierarchy[u].split("/"));
                    n.shift();
                    for (var r = 0; r < n.length; r++) {
                        q += (s ? '<span class="text-weak">' : "") + o.names[n[r]] + (s ? "</span>" : "") + " / "
                    }
                }
                q += o.names[u];
                return q
            };
            g.layout.getExtendedLayout = function (s) {
                var s = Ext.clone(s), u;
                u = {
                    columns: [],
                    rows: [],
                    filters: [],
                    columnObjectNames: [],
                    columnDimensionNames: [],
                    rowObjectNames: [],
                    rowDimensionNames: [],
                    axisDimensions: [],
                    axisObjectNames: [],
                    axisDimensionNames: [],
                    sortedAxisDimensionNames: [],
                    filterDimensions: [],
                    filterObjectNames: [],
                    filterDimensionNames: [],
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
                    dimensionNameSortedIdsMap: {},
                    dimensionNameAxisMap: {}
                };
                Ext.applyIf(u, s);
                if (s.columns) {
                    for (var q = 0, r, t, n; q < s.columns.length; q++) {
                        r = s.columns[q];
                        t = r.items;
                        n = {};
                        n.dimension = r.dimension;
                        n.objectName = r.dimension;
                        n.dimensionName = l.objectNameMap[r.dimension].dimensionName;
                        if (t) {
                            n.items = t;
                            n.ids = [];
                            for (var p = 0; p < t.length; p++) {
                                n.ids.push(t[p].id)
                            }
                        }
                        u.columns.push(n);
                        u.columnObjectNames.push(n.objectName);
                        u.columnDimensionNames.push(n.dimensionName);
                        u.axisDimensions.push(n);
                        u.axisObjectNames.push(n.objectName);
                        u.axisDimensionNames.push(l.objectNameMap[n.objectName].dimensionName);
                        u.objectNameDimensionsMap[n.objectName] = n;
                        u.objectNameItemsMap[n.objectName] = n.items;
                        u.objectNameIdsMap[n.objectName] = n.ids;
                        u.dimensionNameAxisMap[n.dimensionName] = u.columns
                    }
                }
                if (s.rows) {
                    for (var q = 0, r, t, n; q < s.rows.length; q++) {
                        r = Ext.clone(s.rows[q]);
                        t = r.items;
                        n = {};
                        n.dimension = r.dimension;
                        n.objectName = r.dimension;
                        n.dimensionName = l.objectNameMap[r.dimension].dimensionName;
                        if (t) {
                            n.items = t;
                            n.ids = [];
                            for (var p = 0; p < t.length; p++) {
                                n.ids.push(t[p].id)
                            }
                        }
                        u.rows.push(n);
                        u.rowObjectNames.push(n.objectName);
                        u.rowDimensionNames.push(n.dimensionName);
                        u.axisDimensions.push(n);
                        u.axisObjectNames.push(n.objectName);
                        u.axisDimensionNames.push(l.objectNameMap[n.objectName].dimensionName);
                        u.objectNameDimensionsMap[n.objectName] = n;
                        u.objectNameItemsMap[n.objectName] = n.items;
                        u.objectNameIdsMap[n.objectName] = n.ids;
                        u.dimensionNameAxisMap[n.dimensionName] = u.rows
                    }
                }
                if (s.filters) {
                    for (var q = 0, r, t, n; q < s.filters.length; q++) {
                        r = s.filters[q];
                        t = r.items;
                        n = {};
                        n.dimension = r.dimension;
                        n.objectName = r.dimension;
                        n.dimensionName = l.objectNameMap[r.dimension].dimensionName;
                        if (t) {
                            n.items = t;
                            n.ids = [];
                            for (var p = 0; p < t.length; p++) {
                                n.ids.push(t[p].id)
                            }
                        }
                        u.filters.push(n);
                        u.filterDimensions.push(n);
                        u.filterObjectNames.push(n.objectName);
                        u.filterDimensionNames.push(l.objectNameMap[n.objectName].dimensionName);
                        u.objectNameDimensionsMap[n.objectName] = n;
                        u.objectNameItemsMap[n.objectName] = n.items;
                        u.objectNameIdsMap[n.objectName] = n.ids;
                        u.dimensionNameAxisMap[n.dimensionName] = u.filters
                    }
                }
                u.legendSet = s.legendSet ? m.idLegendSetMap[s.legendSet.id] : null;
                if (s.legendSet) {
                    u.legendSet = m.idLegendSetMap[s.legendSet.id];
                    j.prototype.array.sort(u.legendSet.mapLegends, "ASC", "startValue")
                }
                u.axisDimensionNames = Ext.Array.unique(u.axisDimensionNames);
                u.filterDimensionNames = Ext.Array.unique(u.filterDimensionNames);
                u.columnDimensionNames = Ext.Array.unique(u.columnDimensionNames);
                u.rowDimensionNames = Ext.Array.unique(u.rowDimensionNames);
                u.filterDimensionNames = Ext.Array.unique(u.filterDimensionNames);
                u.sortedAxisDimensionNames = Ext.clone(u.axisDimensionNames).sort();
                u.sortedFilterDimensions = g.layout.sortDimensionArray(Ext.clone(u.filterDimensions));
                u.dimensions = [].concat(u.axisDimensions, u.filterDimensions);
                u.objectNames = [].concat(u.axisObjectNames, u.filterObjectNames);
                u.dimensionNames = [].concat(u.axisDimensionNames, u.filterDimensionNames);
                for (var q = 0, o; q < u.dimensionNames.length; q++) {
                    o = u.dimensionNames[q];
                    u.dimensionNameDimensionsMap[o] = [];
                    u.dimensionNameItemsMap[o] = [];
                    u.dimensionNameIdsMap[o] = []
                }
                for (var q = 0, n; q < u.dimensions.length; q++) {
                    n = u.dimensions[q];
                    u.dimensionNameDimensionsMap[n.dimensionName].push(n);
                    u.dimensionNameItemsMap[n.dimensionName] = u.dimensionNameItemsMap[n.dimensionName].concat(n.items);
                    u.dimensionNameIdsMap[n.dimensionName] = u.dimensionNameIdsMap[n.dimensionName].concat(n.ids)
                }
                for (var v in u.dimensionNameIdsMap) {
                    if (u.dimensionNameIdsMap.hasOwnProperty(v)) {
                        u.dimensionNameSortedIdsMap[v] = Ext.clone(u.dimensionNameIdsMap[v]).sort()
                    }
                }
                u.tableUuid = m.el + "_" + Ext.data.IdGenerator.get("uuid").generate();
                return u
            };
            g.layout.getSyncronizedXLayout = function (A, n) {
                var F, z, s = Ext.Array.clean([].concat(A.columns || [], A.rows || [], A.filters || [])), O = A.objectNameDimensionsMap[l.organisationUnit.objectName], w = O && Ext.Array.contains(O.ids, "USER_ORGUNIT"), Q = O && Ext.Array.contains(O.ids, "USER_ORGUNIT_CHILDREN"), N = O && Ext.Array.contains(O.ids, "USER_ORGUNIT_GRANDCHILDREN"), o = function () {
                    if (O && Ext.isArray(O.ids)) {
                        for (var S = 0; S < O.ids.length; S++) {
                            if (O.ids[S].substr(0, 5) === "LEVEL") {
                                return true
                            }
                        }
                    }
                    return false
                }(), y = function () {
                    if (O && Ext.isArray(O.ids)) {
                        for (var S = 0; S < O.ids.length; S++) {
                            if (O.ids[S].substr(0, 8) === "OU_GROUP") {
                                return true
                            }
                        }
                    }
                    return false
                }(), v = l.category.objectName, r = l.organisationUnit.objectName, p = function () {
                    var T = [];
                    for (var S = 0; S < n.headers.length; S++) {
                        T.push(n.headers[S].name)
                    }
                    return T
                }(), R;
                F = function (T) {
                    var S;
                    S = function (V) {
                        var W;
                        for (var U = 0; U < V.length; U++) {
                            if (V[U].dimension === T) {
                                W = V[U]
                            }
                        }
                        if (W) {
                            Ext.Array.remove(V, W)
                        }
                        return V
                    };
                    if (A.columns) {
                        A.columns = S(A.columns)
                    }
                    if (A.rows) {
                        A.rows = S(A.rows)
                    }
                    if (A.filters) {
                        A.filters = S(A.filters)
                    }
                };
                z = function () {
                    var V = A.dimensionNameAxisMap[r], X = n.metaData.ouHierarchy, W = [], Y, S;
                    for (var U = 0; U < V.length; U++) {
                        if (V[U].dimensionName === r) {
                            Y = U;
                            break
                        }
                    }
                    for (var T in X) {
                        if (X.hasOwnProperty(T)) {
                            S = Ext.Array.clean(X[T].split("/"));
                            if (!W[S.length]) {
                                W[S.length] = []
                            }
                            W[S.length].push({id: T, name: n.metaData.names[T]})
                        }
                    }
                    W = Ext.Array.clean(W);
                    console.log("levels", W)
                };
                for (var J = 0, H, x, B; J < s.length; J++) {
                    H = s[J];
                    H.items = [];
                    x = n.metaData[H.objectName];
                    if (H.dimensionName === r) {
                        if (w || Q || N) {
                            var M, u, D;
                            if (m.user && w) {
                                M = [];
                                for (var G = 0; G < m.user.ou.length; G++) {
                                    M.push({id: m.user.ou[G], name: g.layout.getItemName(A, n, m.user.ou[G], false)})
                                }
                            }
                            if (m.user && m.user.ouc && Q) {
                                u = [];
                                for (var G = 0; G < m.user.ouc.length; G++) {
                                    u.push({id: m.user.ouc[G], name: g.layout.getItemName(A, n, m.user.ouc[G], false)})
                                }
                                j.prototype.array.sort(u)
                            }
                            if (m.user && m.user.ouc && N) {
                                var q = [].concat(m.user.ou, m.user.ouc), t = n.metaData[r];
                                D = [];
                                for (var G = 0, C; G < t.length; G++) {
                                    C = t[G];
                                    if (!Ext.Array.contains(q, C)) {
                                        D.push({id: C, name: g.layout.getItemName(A, n, C, false)})
                                    }
                                }
                                j.prototype.array.sort(D)
                            }
                            H.items = [].concat(M || [], u || [], D || [])
                        } else {
                            if (o || y) {
                                for (var G = 0, t = n.metaData[r], C; G < t.length; G++) {
                                    C = t[G];
                                    H.items.push({id: C, name: g.layout.getItemName(A, n, C, false)})
                                }
                                j.prototype.array.sort(H.items)
                            } else {
                                H.items = Ext.clone(A.dimensionNameItemsMap[H.dimensionName])
                            }
                        }
                    } else {
                        if (Ext.isArray(x) && x.length) {
                            var E = Ext.clone(n.metaData[H.dimensionName]);
                            for (var G = 0; G < E.length; G++) {
                                H.items.push({id: E[G], name: n.metaData.names[E[G]]})
                            }
                        } else {
                            H.items = Ext.clone(A.objectNameItemsMap[H.objectName])
                        }
                    }
                }
                s = Ext.Array.clean([].concat(A.columns || [], A.rows || [], A.filters || []));
                for (var J = 0, I = n.metaData.names, L; J < s.length; J++) {
                    L = s[J].items;
                    if (Ext.isArray(L) && L.length) {
                        for (var G = 0, P; G < L.length; G++) {
                            P = L[G];
                            if (Ext.isObject(P) && Ext.isString(I[P.id]) && !Ext.isString(P.name)) {
                                P.name = I[P.id] || ""
                            }
                        }
                    }
                }
                for (var J = 0, K; J < A.axisDimensionNames.length; J++) {
                    K = A.axisDimensionNames[J];
                    if (!Ext.Array.contains(p, K)) {
                        F(K)
                    }
                }
                if (O && A.showHierarchy) {
                    z()
                }
                R = k.layout.Layout(A);
                if (R) {
                    return g.layout.getExtendedLayout(R)
                }
                return null
            };
            g.layout.getExtendedAxis = function (B, aa) {
                var t, r, C = [], z = 1, L, q, H = [], Z = [], s = [], G = [], x = [], y = [], O = [], u = {};
                if (aa === "col") {
                    t = Ext.clone(B.columnDimensionNames);
                    r = "colSpan"
                } else {
                    if (aa === "row") {
                        t = Ext.clone(B.rowDimensionNames);
                        r = "rowSpan"
                    }
                }
                if (!(Ext.isArray(t) && t.length)) {
                    return
                }
                for (var V = 0; V < t.length; V++) {
                    C.push({dimensionName: t[V]})
                }
                q = function () {
                    var n = [];
                    for (var ab = 0; ab < C.length; ab++) {
                        n.push(B.dimensionNameIdsMap[C[ab].dimensionName])
                    }
                    return n
                }();
                L = q.length;
                for (var V = 0, M; V < L; V++) {
                    M = q[V].length;
                    H.push(M);
                    z = z * M;
                    Z.push(z)
                }
                for (var V = 0; V < L; V++) {
                    if (H[V] === 1) {
                        if (V === 0) {
                            s.push(z)
                        } else {
                            if (B.hideEmptyRows && aa === "row") {
                                s.push(z / Z[V])
                            } else {
                                s.push(s[0])
                            }
                        }
                    } else {
                        s.push(z / Z[V])
                    }
                }
                G.push(q[0]);
                if (L.length > 1) {
                    for (var V = 1, X, P; V < L; V++) {
                        X = [];
                        P = H[V] === 1 ? H[0] : Z[V - 1];
                        for (var T = 0; T < P; T++) {
                            X = X.concat(q[V])
                        }
                        G.push(X)
                    }
                }
                for (var V = 0, w, Q, E, U; V < L; V++) {
                    w = [];
                    Q = q[V];
                    E = s[V];
                    U = z / (E * Q.length);
                    for (var T = 0; T < U; T++) {
                        for (var S = 0; S < Q.length; S++) {
                            for (var R = 0; R < E; R++) {
                                w.push(Q[S])
                            }
                        }
                    }
                    x.push(w)
                }
                for (var V = 0, K; V < z; V++) {
                    K = "";
                    for (var T = 0; T < L; T++) {
                        K += x[T][V]
                    }
                    if (K) {
                        y.push(K)
                    }
                }
                for (var V = 0, I; V < x.length; V++) {
                    I = [];
                    for (var T = 0, p; T < x[V].length; T++) {
                        p = {id: x[V][T], uuid: Ext.data.IdGenerator.get("uuid").generate(), dim: V, axis: aa};
                        if (V === x.length - 1) {
                            p.leaf = true
                        }
                        I.push(p)
                    }
                    O.push(I)
                }
                for (var V = 0; V < O.length; V++) {
                    for (var T = 0, p, Y = 0, o; T < O[V].length; T++) {
                        p = O[V][T];
                        if (Y === 0) {
                            p[r] = s[V];
                            p.children = p.leaf ? 0 : s[V];
                            p.oldest = true;
                            if (V === 0) {
                                p.root = true
                            }
                            o = p
                        }
                        p.oldestSibling = o;
                        if (++Y === s[V]) {
                            Y = 0
                        }
                    }
                }
                if (L > 1) {
                    for (var V = 1, A; V < L; V++) {
                        A = O[V];
                        for (var T = 0, Y = 0, E = s[V - 1]; T < A.length; T++) {
                            A[T].parent = O[V - 1][T]
                        }
                    }
                }
                if (O.length) {
                    var v = L > 1 ? j.prototype.array.sort(Ext.clone(s))[1] : z, D = O[O.length - 1];
                    for (var V = 0, W, F, p, J = []; V < D.length; V++) {
                        W = D[V];
                        J.push(W.uuid);
                        F = [];
                        p = W;
                        while (p.parent) {
                            p = p.parent;
                            F.push(p.oldestSibling.uuid)
                        }
                        W.uuids = Ext.clone(F);
                        if (J.length === v) {
                            for (var T = (V - v) + 1, W; T <= V; T++) {
                                W = D[T];
                                W.uuids = W.uuids.concat(J)
                            }
                            J = []
                        }
                    }
                }
                for (var V = 0; V < O.length; V++) {
                    for (var T = 0, N; T < O[V].length; T++) {
                        N = O[V][T];
                        u[N.uuid] = N
                    }
                }
                return {
                    type: aa,
                    items: C,
                    xItems: {unique: q, gui: G, all: x},
                    objects: {all: O},
                    ids: y,
                    span: s,
                    dims: L,
                    size: z,
                    uuidObjectMap: u
                }
            };
            g.layout.isHierarchy = function (o, n, p) {
                return o.showHierarchy && Ext.isObject(n.metaData.ouHierarchy) && n.metaData.ouHierarchy.hasOwnProperty(p)
            };
            g.layout.layout2plugin = function (s, p) {
                var s = Ext.clone(s), r = Ext.Array.clean([].concat(s.columns || [], s.rows || [], s.filters || []));
                s.url = m.contextPath;
                if (p) {
                    s.el = p
                }
                if (Ext.isString(s.id)) {
                    return {id: s.id}
                }
                for (var o = 0, t, q; o < r.length; o++) {
                    t = r[o];
                    delete t.id;
                    delete t.ids;
                    delete t.type;
                    delete t.dimensionName;
                    delete t.objectName;
                    for (var n = 0, q; n < t.items.length; n++) {
                        q = t.items[n];
                        delete q.name;
                        delete q.code;
                        delete q.created;
                        delete q.lastUpdated;
                        delete q.value
                    }
                }
                if (s.showTotals) {
                    delete s.showTotals
                }
                if (s.showSubTotals) {
                    delete s.showSubTotals
                }
                if (!s.hideEmptyRows) {
                    delete s.hideEmptyRows
                }
                if (!s.showHierarchy) {
                    delete s.showHierarchy
                }
                if (s.displayDensity === "normal") {
                    delete s.displayDensity
                }
                if (s.fontSize === "normal") {
                    delete s.fontSize
                }
                if (s.digitGroupSeparator === "space") {
                    delete s.digitGroupSeparator
                }
                if (!s.legendSet) {
                    delete s.legendSet
                }
                if (!s.sorting) {
                    delete s.sorting
                }
                delete s.parentGraphMap;
                delete s.reportingPeriod;
                delete s.organisationUnit;
                delete s.parentOrganisationUnit;
                delete s.regression;
                delete s.cumulative;
                delete s.sortOrder;
                delete s.topLimit;
                return s
            };
            g.response = {};
            g.response.getExtendedResponse = function (o, n) {
                var p = [];
                n = Ext.clone(n);
                n.nameHeaderMap = {};
                n.idValueMap = {};
                (function () {
                    for (var q = 0, r; q < n.headers.length; q++) {
                        r = n.headers[q];
                        r.index = q;
                        if (r.meta) {
                            r.ids = Ext.clone(o.dimensionNameIdsMap[r.name]) || [];
                            r.size = r.ids.length;
                            p = p.concat(r.ids)
                        }
                    }
                    for (var q = 0, r; q < n.headers.length; q++) {
                        r = n.headers[q];
                        n.nameHeaderMap[r.name] = r
                    }
                }());
                (function () {
                    for (var q = 0, s, r; q < p.length; q++) {
                        s = p[q];
                        if (s.indexOf(".") !== -1) {
                            r = s.split(".");
                            n.metaData.names[s] = n.metaData.names[r[0]] + " " + n.metaData.names[r[1]]
                        }
                    }
                }());
                (function () {
                    var w = n.nameHeaderMap[i.finals.dimension.value.value].index, r = n.nameHeaderMap[i.finals.dimension.category.dimensionName], A = l.data.dimensionName, x = l.category.dimensionName, t = o.axisDimensionNames, y = [];
                    for (var u = 0; u < t.length; u++) {
                        y.push(n.nameHeaderMap[t[u]].index);
                        if (r && !Ext.Array.contains(t, x) && t[u] === A) {
                            y.push(r.index)
                        }
                    }
                    for (var u = 0, z, q; u < n.rows.length; u++) {
                        z = n.rows[u];
                        q = "";
                        for (var s = 0, v; s < y.length; s++) {
                            v = y[s];
                            q += n.headers[v].name === x ? "." : "";
                            q += z[v]
                        }
                        n.idValueMap[q] = z[w]
                    }
                }());
                return n
            }
        }());
        (function () {
            h.mask = {};
            h.mask.show = function (n, o) {
                if (!Ext.isObject(n)) {
                    console.log("support.gui.mask.show: component not an object");
                    return null
                }
                o = o || "Loading..";
                if (n.mask && n.mask.destroy) {
                    n.mask.destroy();
                    n.mask = null
                }
                n.mask = new Ext.create("Ext.LoadMask", n, {
                    shadow: false,
                    msg: o,
                    style: "box-shadow:0",
                    bodyStyle: "box-shadow:0"
                });
                n.mask.show()
            };
            h.mask.hide = function (n) {
                if (!Ext.isObject(n)) {
                    console.log("support.gui.mask.hide: component not an object");
                    return null
                }
                if (n.mask) {
                    n.mask.destroy();
                    n.mask = null
                }
            };
            h.message = {};
            h.message.alert = function (n) {
                console.log(n)
            };
            h.analytics = {};
            h.analytics.getParamString = function (B, q) {
                var v = q ? B.sortedAxisDimensionNames : B.axisDimensionNames, C = q ? B.sortedFilterDimensions : B.filterDimensions, n = q ? B.dimensionNameSortedIdsMap : B.dimensionNameIdsMap, r = "?", p = false, o = B.dimensionNameItemsMap, D = l.indicator.dimensionName, A = l.category.dimensionName, t = {
                    count: "COUNT",
                    sum: "SUM",
                    stddev: "STDDEV",
                    variance: "VARIANCE"
                };
                for (var w = 0, s, z; w < v.length; w++) {
                    s = v[w];
                    r += "dimension=" + s;
                    z = Ext.clone(n[s]);
                    if (s === D) {
                        for (var u = 0, y; u < z.length; u++) {
                            y = z[u].indexOf(".");
                            if (y > 0) {
                                p = true;
                                z[u] = z[u].substr(0, y)
                            }
                        }
                        z = Ext.Array.unique(z)
                    }
                    if (s !== A) {
                        r += ":" + z.join(";")
                    }
                    if (w < (v.length - 1)) {
                        r += "&"
                    }
                }
                if (p) {
                    r += "&dimension=" + i.finals.dimension.category.dimensionName
                }
                if (Ext.isArray(C) && C.length) {
                    for (var w = 0, x; w < C.length; w++) {
                        x = C[w];
                        r += "&filter=" + x.dimensionName + ":" + x.ids.join(";")
                    }
                }
                if (B.showHierarchy) {
                    r += "&hierarchyMeta=true"
                }
                if (t.hasOwnProperty(B.aggregationType)) {
                    r += "&aggregationType=" + t[B.aggregationType]
                }
                return r
            };
            h.analytics.validateUrl = function (o) {
                var p;
                if (Ext.isIE) {
                    p = "Too many items selected (url has " + o.length + " characters). Internet Explorer accepts maximum 2048 characters."
                } else {
                    var n = o.length > 8000 ? "8000" : (o.length > 4000 ? "4000" : "2000");
                    p = "Too many items selected (url has " + o.length + " characters). Please reduce to less than " + n + " characters."
                }
                p += "\n\nHint: A good way to reduce the number of items is to use relative periods and level/group organisation unit selection modes.";
                alert(p)
            };
            h.pivot = {};
            h.pivot.sort = function (t, y, n) {
                var y = Ext.clone(y), o = t.sorting.id, r = t.rows[0], p = y.idValueMap, u = t.sorting ? t.sorting.direction : "DESC", s;
                r.ids = [];
                if (Ext.isString(o)) {
                    o = o.toLowerCase() === "total" ? "total_" : o
                } else {
                    if (Ext.isNumber(o)) {
                        if (o === 0) {
                            o = "total_"
                        } else {
                            o = n.ids[parseInt(o) - 1]
                        }
                    } else {
                        return t
                    }
                }
                for (var q = 0, x, w, v; q < r.items.length; q++) {
                    x = r.items[q];
                    w = o + x.id;
                    v = parseFloat(p[w]);
                    x.value = Ext.isNumber(v) ? v : (Number.MAX_VALUE * -1)
                }
                j.prototype.array.sort(r.items, u, "value");
                for (var q = 0; q < r.items.length; q++) {
                    r.ids.push(r.items[q].id)
                }
                if (o !== t.sorting.id) {
                    t.sorting.id = o
                }
                return t
            };
            h.pivot.getHtml = function (D, p, J, C) {
                var w, E, n, o, G, t, r, v, A, F, L, u = function (M) {
                    var N;
                    if (!M) {
                        return null
                    }
                    N = M.xItems.unique;
                    if (N) {
                        return N.length < 2 ? 1 : (M.size / N[0].length)
                    }
                    return null
                }, I = u(J), B = u(C), z = [], K = [], s = [], y = {}, x = Ext.isObject(D.legendSet) && Ext.isArray(D.legendSet.mapLegends) && D.legendSet.mapLegends.length, q = 0, H;
                p.sortableIdObjects = [];
                w = function (M, N) {
                    N = N || 2;
                    return parseFloat(j.prototype.number.roundIf(M, 2)).toString()
                };
                E = function (P, Y) {
                    var V, W, S, T, N, O, aa, M = Ext.isObject(P) && Ext.isString(P.type) && P.type.substr(0, 5) === "value" && !P.empty, U = Ext.isObject(P) && Ext.isString(P.type) && P.type === "value" && !P.empty, Z = "", R = "";
                    if (!Ext.isObject(P)) {
                        return ""
                    }
                    if (P.hidden || P.collapsed) {
                        return ""
                    }
                    q = q + 1;
                    if (M && D.legendSet) {
                        var X = parseFloat(P.value);
                        W = D.legendSet.mapLegends;
                        for (var Q = 0; Q < W.length; Q++) {
                            if (Ext.Number.constrain(X, W[Q].startValue, W[Q].endValue) === X) {
                                V = W[Q].color
                            }
                        }
                    }
                    S = P.colSpan ? 'colspan="' + P.colSpan + '" ' : "";
                    T = P.rowSpan ? 'rowspan="' + P.rowSpan + '" ' : "";
                    N = P.collapsed ? "" : P.htmlValue || P.value || "";
                    N = P.type !== "dimension" ? j.prototype.number.prettyPrint(N, D.digitGroupSeparator) : N;
                    O = i.pivot.displayDensity[P.displayDensity] || i.pivot.displayDensity[D.displayDensity];
                    aa = i.pivot.fontSize[P.fontSize] || i.pivot.fontSize[D.fontSize];
                    Z += P.hidden ? " td-hidden" : "";
                    Z += P.collapsed ? " td-collapsed" : "";
                    Z += U ? " pointer" : "";
                    Z += V ? " legend" : (P.cls ? " " + P.cls : "");
                    if (Ext.isString(Y)) {
                        Z += " td-sortable";
                        p.sortableIdObjects.push({id: Y, uuid: P.uuid})
                    }
                    R += "<td " + (P.uuid ? ('id="' + P.uuid + '" ') : "");
                    R += ' class="' + Z + '" ' + S + T;
                    if (V) {
                        R += ">";
                        R += '<div class="legendCt">';
                        R += '<div class="number ' + P.cls + '" style="padding:' + O + "; padding-right:3px; font-size:" + aa + '">' + N + "</div>";
                        R += '<div class="arrowCt ' + P.cls + '">';
                        R += '<div class="arrow" style="border-bottom:8px solid transparent; border-right:8px solid ' + V + '">&nbsp;</div>';
                        R += "</div></div></div></td>"
                    } else {
                        R += 'style="padding:' + O + "; font-size:" + aa + ';">' + N + "</td>"
                    }
                    return R
                };
                n = function (M) {
                    return !!D.showSubTotals && M && M.dims > 1
                };
                o = function () {
                    return !!D.showTotals
                };
                doSortableColumnHeaders = function () {
                    return (C && C.dims === 1)
                };
                G = function () {
                    var U = [], M;
                    M = function () {
                        return (J && C) ? E({
                            cls: "pivot-dim-empty cursor-default",
                            colSpan: C.dims,
                            rowSpan: J.dims,
                            htmlValue: "&nbsp;"
                        }) : ""
                    };
                    if (!(J && Ext.isObject(J))) {
                        return U
                    }
                    for (var R = 0, T; R < J.dims; R++) {
                        T = [];
                        if (R === 0) {
                            T.push(M())
                        }
                        for (var P = 0, Q, N = 0, S, O; P < J.size; P++) {
                            N++;
                            S = null;
                            O = null;
                            Q = J.objects.all[R][P];
                            Q.type = "dimension";
                            Q.cls = "pivot-dim";
                            Q.noBreak = false;
                            Q.hidden = !(Q.rowSpan || Q.colSpan);
                            Q.htmlValue = g.layout.getItemName(D, p, Q.id, true);
                            if (R === J.dims - 1 && doSortableColumnHeaders()) {
                                S = J.ids[P]
                            }
                            T.push(E(Q, S));
                            if (R === 0 && N === J.span[R] && n(J)) {
                                T.push(E({
                                    type: "dimensionSubtotal",
                                    cls: "pivot-dim-subtotal cursor-default",
                                    rowSpan: J.dims,
                                    htmlValue: "&nbsp;"
                                }));
                                N = 0
                            }
                            if (R === 0 && (P === J.size - 1) && o()) {
                                O = doSortableColumnHeaders() ? "total_" : null;
                                T.push(E({
                                    uuid: Ext.data.IdGenerator.get("uuid").generate(),
                                    type: "dimensionTotal",
                                    cls: "pivot-dim-total",
                                    rowSpan: J.dims,
                                    htmlValue: "Total"
                                }, O))
                            }
                        }
                        U.push(T)
                    }
                    return U
                };
                t = function () {
                    var aB = [], Y = [], am, S = [], ag = [], ac, ae = J ? J.size : 1, ao = C ? C.size : 1, af;
                    af = function (aC) {
                        if (!aC.children) {
                            aC.collapsed = true;
                            if (aC.parent) {
                                aC.parent.oldestSibling.children--
                            }
                        }
                        if (aC.parent) {
                            af(aC.parent.oldestSibling)
                        }
                    };
                    if (C) {
                        for (var ax = 0, aa; ax < C.size; ax++) {
                            aa = [];
                            for (var aw = 0, Q, aq; aw < C.dims; aw++) {
                                Q = C.objects.all[aw][ax];
                                Q.type = "dimension";
                                Q.cls = "pivot-dim td-nobreak" + (g.layout.isHierarchy(D, p, Q.id) ? " align-left" : "");
                                Q.noBreak = true;
                                Q.hidden = !(Q.rowSpan || Q.colSpan);
                                Q.htmlValue = g.layout.getItemName(D, p, Q.id, true);
                                aa.push(Q)
                            }
                            Y.push(aa)
                        }
                    }
                    for (var ax = 0, O, R, au = p.idValueMap; ax < ao; ax++) {
                        O = [];
                        R = [];
                        for (var aw = 0, ak, ar, az, M, T, N; aw < ae; aw++) {
                            M = false;
                            N = [];
                            ak = (J ? J.ids[aw] : "") + (C ? C.ids[ax] : "");
                            T = Ext.data.IdGenerator.get("uuid").generate();
                            if (J) {
                                N = N.concat(J.objects.all[J.dims - 1][aw].uuids)
                            }
                            if (C) {
                                N = N.concat(C.objects.all[C.dims - 1][ax].uuids)
                            }
                            if (au[ak]) {
                                ar = parseFloat(au[ak]);
                                az = ar.toString()
                            } else {
                                ar = 0;
                                az = "&nbsp;";
                                M = true
                            }
                            O.push(ar);
                            R.push({
                                uuid: T,
                                type: "value",
                                cls: "pivot-value" + (M ? " cursor-default" : ""),
                                value: ar,
                                htmlValue: az,
                                empty: M,
                                uuids: N
                            });
                            y[T] = N
                        }
                        z.push(O);
                        K.push(R)
                    }
                    if (J && o()) {
                        for (var ax = 0, M = [], aj = 0; ax < K.length; ax++) {
                            for (aw = 0, Q; aw < K[ax].length; aw++) {
                                Q = K[ax][aw];
                                M.push(Q.empty);
                                aj += Q.value
                            }
                            S.push({
                                type: "valueTotal",
                                cls: "pivot-value-total",
                                value: aj,
                                htmlValue: Ext.Array.contains(M, false) ? w(aj) : "",
                                empty: !Ext.Array.contains(M, false)
                            });
                            if (doSortableColumnHeaders()) {
                                var X = "total_" + C.ids[ax], ab = !Ext.Array.contains(M, false);
                                p.idValueMap[X] = ab ? null : aj
                            }
                            M = [];
                            aj = 0
                        }
                    }
                    if (J && C) {
                        if (D.hideEmptyRows) {
                            for (var ax = 0, an, P, ad; ax < K.length; ax++) {
                                an = K[ax];
                                P = !Ext.Array.contains(Ext.Array.pluck(an, "empty"), false);
                                if (P) {
                                    for (var aw = 0; aw < an.length; aw++) {
                                        an[aw].collapsed = true
                                    }
                                    if (o()) {
                                        S[ax].collapsed = true
                                    }
                                    ad = Y[ax][C.dims - 1];
                                    af(ad)
                                }
                            }
                        }
                    }
                    am = K;
                    if (n(J)) {
                        var ah = [];
                        for (var ax = 0, aa, W, Z; ax < am.length; ax++) {
                            aa = [];
                            W = 0;
                            Z = 0;
                            for (var aw = 0, ai, aA = [], M = []; aw < am[ax].length; aw++) {
                                ai = am[ax][aw];
                                W += ai.value;
                                M.push(!!ai.empty);
                                aA.push(!!ai.collapsed);
                                Z++;
                                aa.push(ai);
                                if (Z === I) {
                                    var ab = !Ext.Array.contains(M, false);
                                    aa.push({
                                        type: "valueSubtotal",
                                        cls: "pivot-value-subtotal" + (ab ? " cursor-default" : ""),
                                        value: W,
                                        htmlValue: ab ? "&nbsp;" : w(W),
                                        empty: ab,
                                        collapsed: !Ext.Array.contains(aA, false)
                                    });
                                    Z = 0;
                                    W = 0;
                                    M = [];
                                    aA = []
                                }
                            }
                            ah.push(aa)
                        }
                        am = ah
                    }
                    if (n(C)) {
                        var al = [], ah = [], ay = [], av;
                        av = function (aF) {
                            var aE = [];
                            for (var aC = 0, aD; aC < C.dims; aC++) {
                                aD = {};
                                aD.type = "dimensionSubtotal";
                                aD.cls = "pivot-dim-subtotal cursor-default";
                                aD.collapsed = Ext.Array.contains(aF, true);
                                if (aC === 0) {
                                    aD.htmlValue = "&nbsp;";
                                    aD.colSpan = C.dims
                                } else {
                                    aD.hidden = true
                                }
                                aE.push(aD)
                            }
                            return aE
                        };
                        for (var ax = 0, aa, aA = []; ax < Y.length; ax++) {
                            al.push(Y[ax]);
                            aA.push(!!Y[ax][0].collapsed);
                            if (!Ext.isArray(Y[ax + 1]) || !!Y[ax + 1][0].root) {
                                al.push(av(aA));
                                aA = []
                            }
                        }
                        for (var ax = 0; ax < al.length; ax++) {
                            ah.push([])
                        }
                        for (var ax = 0; ax < am[0].length; ax++) {
                            for (var aw = 0, U = 0, ap = 0, V = 0, M = [], aA, ai; aw < am.length; aw++) {
                                ai = am[aw][ax];
                                ah[ap++].push(ai);
                                V += ai.value;
                                M.push(!!ai.empty);
                                U++;
                                if (Y[aw][0].root) {
                                    aA = !!Y[aw][0].collapsed
                                }
                                if (!Ext.isArray(Y[aw + 1]) || Y[aw + 1][0].root) {
                                    var ab = !Ext.Array.contains(M, false);
                                    ah[ap++].push({
                                        type: ai.type === "value" ? "valueSubtotal" : "valueSubtotalTotal",
                                        value: V,
                                        htmlValue: ab ? "&nbsp;" : w(V),
                                        collapsed: aA,
                                        cls: (ai.type === "value" ? "pivot-value-subtotal" : "pivot-value-subtotal-total") + (ab ? " cursor-default" : "")
                                    });
                                    U = 0;
                                    V = 0;
                                    M = []
                                }
                            }
                        }
                        for (var ax = 0, Q, aA = [], M = [], V = 0, at = 0; ax < S.length; ax++) {
                            Q = S[ax];
                            ay.push(Q);
                            aA.push(!!Q.collapsed);
                            M.push(!!Q.empty);
                            V += Q.value;
                            at++;
                            if (at === C.span[0]) {
                                var ab = !Ext.Array.contains(M, false);
                                ay.push({
                                    type: "valueTotalSubgrandtotal",
                                    cls: "pivot-value-total-subgrandtotal" + (ab ? " cursor-default" : ""),
                                    value: V,
                                    htmlValue: ab ? "&nbsp;" : w(V),
                                    empty: ab,
                                    collapsed: !Ext.Array.contains(aA, false)
                                });
                                aA = [];
                                M = [];
                                V = 0;
                                at = 0
                            }
                        }
                        Y = al;
                        am = ah;
                        S = ay
                    }
                    for (var ax = 0, aa; ax < am.length; ax++) {
                        aa = [];
                        if (C) {
                            aa = aa.concat(Y[ax])
                        }
                        aa = aa.concat(am[ax]);
                        if (J) {
                            aa = aa.concat(S[ax])
                        }
                        ag.push(aa)
                    }
                    for (var ax = 0, aa; ax < ag.length; ax++) {
                        aa = [];
                        for (var aw = 0; aw < ag[ax].length; aw++) {
                            aa.push(E(ag[ax][aw]))
                        }
                        aB.push(aa)
                    }
                    return aB
                };
                v = function () {
                    var T = [];
                    if (C && o()) {
                        var W;
                        for (var O = 0, S = 0, R = []; O < K[0].length; O++) {
                            for (var M = 0, N; M < K.length; M++) {
                                N = K[M][O];
                                S += N.value;
                                R.push(!!N.empty)
                            }
                            s.push({
                                type: "valueTotal",
                                value: S,
                                htmlValue: Ext.Array.contains(R, false) ? w(S) : "",
                                empty: !Ext.Array.contains(R, false),
                                cls: "pivot-value-total"
                            });
                            S = 0;
                            R = []
                        }
                        W = s;
                        if (J && n(J)) {
                            var P = [];
                            for (var O = 0, V, Q = 0, R = [], U = 0; O < W.length; O++) {
                                V = W[O];
                                P.push(V);
                                Q += V.value;
                                R.push(!!V.empty);
                                U++;
                                if (U === I) {
                                    P.push({
                                        type: "valueTotalSubgrandtotal",
                                        value: Q,
                                        htmlValue: Ext.Array.contains(R, false) ? w(Q) : "",
                                        empty: !Ext.Array.contains(R, false),
                                        cls: "pivot-value-total-subgrandtotal"
                                    });
                                    Q = 0;
                                    U = 0
                                }
                            }
                            W = P
                        }
                        for (var O = 0; O < W.length; O++) {
                            T.push(E(W[O]))
                        }
                    }
                    return T
                };
                A = function () {
                    var O = 0, P = [], M = [];
                    if (o()) {
                        for (var N = 0, Q; N < s.length; N++) {
                            Q = s[N];
                            O += Q.value;
                            P.push(Q.empty)
                        }
                        if (J && C) {
                            M.push(E({
                                type: "valueGrandTotal",
                                cls: "pivot-value-grandtotal",
                                value: O,
                                htmlValue: Ext.Array.contains(P, false) ? w(O) : "",
                                empty: !Ext.Array.contains(P, false)
                            }))
                        }
                    }
                    return M
                };
                F = function () {
                    var O, N = v(), P = A(), Q, M = [];
                    if (o()) {
                        if (C) {
                            O = [E({
                                type: "dimensionSubtotal",
                                cls: "pivot-dim-total",
                                colSpan: C.dims,
                                htmlValue: "Total"
                            })]
                        }
                        Q = [].concat(O || [], N || [], P || []);
                        M.push(Q)
                    }
                    return M
                };
                L = function () {
                    var N = '<table id="' + D.tableUuid + '" class="pivot">';
                    for (var M = 0; M < H.length; M++) {
                        N += "<tr>" + H[M].join("") + "</tr>"
                    }
                    return N += "</table>"
                };
                return function () {
                    H = Ext.Array.clean([].concat(G() || [], t() || [], F() || []));
                    return {html: L(H), uuidDimUuidsMap: y, xColAxis: J, xRowAxis: C, tdCount: q}
                }()
            }
        }());
        (function () {
            if (Ext.isArray(m.dimensions)) {
                j.prototype.array.sort(m.dimensions);
                for (var n = 0, o; n < m.dimensions.length; n++) {
                    o = m.dimensions[n];
                    o.dimensionName = o.id;
                    o.objectName = i.finals.dimension.dimension.objectName;
                    i.finals.dimension.objectNameMap[o.id] = o
                }
            }
            if (m.user && m.user.ouc) {
                j.prototype.array.sort(m.user.ouc)
            }
            m.idLegendSetMap = {};
            for (var n = 0, p; n < m.legendSets.length; n++) {
                p = m.legendSets[n];
                m.idLegendSetMap[p.id] = p
            }
        }());
        return {conf: i, api: k, support: j, service: g, web: h, init: m}
    };
    css = "table.pivot { \n font-family: arial,sans-serif,ubuntu,consolas; \n } \n";
    css += ".td-nobreak { \n white-space: nowrap; \n } \n";
    css += ".td-hidden { \n display: none; \n } \n";
    css += ".td-collapsed { \n display: none; \n } \n";
    css += "table.pivot { \n border-collapse: collapse; \n border-spacing: 0px; \n border: 0 none; \n } \n";
    css += ".pivot td { \n padding: 5px; \n border: \n 1px solid #b2b2b2; \n } \n";
    css += ".pivot-dim { \n background-color: #dae6f8; \n text-align: center; \n } \n";
    css += ".pivot-dim.highlighted { \n	background-color: #c5d8f6; \n } \n";
    css += ".pivot-dim-subtotal { \n background-color: #cad6e8; \n text-align: center; \n } \n";
    css += ".pivot-dim-total { \n background-color: #bac6d8; \n text-align: center; \n } \n";
    css += ".pivot-dim-total.highlighted { \n background-color: #adb8c9; \n } \n";
    css += ".pivot-dim-empty { \n background-color: #dae6f8; \n text-align: center; \n } \n";
    css += ".pivot-value { \n background-color: #fff; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".pivot-value-subtotal { \n background-color: #f4f4f4; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".pivot-value-subtotal-total { \n background-color: #e7e7e7; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".pivot-value-total { \n background-color: #e4e4e4; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".pivot-value-total-subgrandtotal { \n background-color: #d8d8d8; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".pivot-value-grandtotal { \n background-color: #c8c8c8; \n white-space: nowrap; \n text-align: right; \n } \n";
    css += ".x-mask-msg { \n padding: 0; \n	border: 0 none; \n background-image: none; \n background-color: transparent; \n } \n";
    css += ".x-mask-msg div { \n background-position: 11px center; \n } \n";
    css += ".x-mask-msg .x-mask-loading { \n border: 0 none; \n	background-color: #000; \n color: #fff; \n border-radius: 2px; \n padding: 12px 14px 12px 30px; \n opacity: 0.65; \n } \n";
    css += ".x-mask { opacity: 0 } \n";
    css += ".pivot td.legend { \n padding: 0; \n } \n";
    css += ".pivot div.legendCt { \n display: table; \n float: right; \n width: 100%; \n } \n";
    css += ".pivot div.arrowCt { \n display: table-cell; \n vertical-align: top; \n width: 8px; \n } \n";
    css += ".pivot div.arrow { \n width: 0; \n height: 0; \n } \n";
    css += ".pivot div.number { \n display: table-cell; \n } \n", css += ".pivot div.legendColor { \n display: table-cell; \n width: 2px; \n } \n";
    css += ".pointer { \n cursor: pointer; \n } \n";
    css += '.td-sortable { \n background-image: url("http://dhis2-cdn.org/v214/plugin/images/arrowupdown.png"); \n background-repeat: no-repeat; \n background-position: right center; \n padding-right: 15px !important; \n } \n';
    Ext.util.CSS.createStyleSheet(css);
    PT.plugin = {};
    var e = {user: {}}, d = [], f = false, b = false, a, c;
    a = function (g) {
        var m = false, l = [], k = 0, j;
        j = function () {
            if (++k === l.length) {
                b = true;
                for (var n = 0; n < d.length; n++) {
                    c(d[n])
                }
                d = []
            }
        };
        l.push({
            url: g + "/api/system/info.jsonp", success: function (i) {
                e.contextPath = i.contextPath;
                j()
            }
        });
        l.push({
            url: g + "/api/organisationUnits.jsonp?userOnly=true&viewClass=detailed&links=false",
            success: function (q) {
                var p = q.organisationUnits || [], o = [], s = [];
                if (p.length) {
                    for (var n = 0, t; n < p.length; n++) {
                        t = p[n];
                        o.push(t.id);
                        if (t.children) {
                            s = Ext.Array.clean(s.concat(Ext.Array.pluck(t.children, "id") || []))
                        }
                    }
                    e.user = {ou: o, ouc: s}
                } else {
                    alert("User is not assigned to any organisation units")
                }
                j()
            }
        });
        e.legendSets = [];
        l.push({
            url: g + "/api/dimensions.jsonp?links=false&paging=false", success: function (i) {
                e.dimensions = i.dimensions;
                j()
            }
        });
        for (var h = 0; h < l.length; h++) {
            Ext.data.JsonP.request(l[h])
        }
    };
    c = function (j) {
        var l, i, h, g, k = {core: {}, app: {}};
        l = function (m) {
            if (!Ext.isObject(m)) {
                console.log("Report table configuration is not an object");
                return
            }
            if (!Ext.isString(m.el)) {
                console.log("No valid element id provided");
                return
            }
            m.id = m.id || m.uid;
            return true
        };
        i = function (q) {
            var r = k.core.init, p = k.core.api, o = k.core.support, m = k.core.service, n = k.core.web;
            n.events = n.events || {};
            n.events.setColumnHeaderMouseHandlers = function (t, s) {
                if (Ext.isArray(t.sortableIdObjects)) {
                    for (var u = 0, w, v; u < t.sortableIdObjects.length; u++) {
                        w = t.sortableIdObjects[u];
                        v = Ext.get(w.uuid);
                        v.dom.xLayout = t;
                        v.dom.response = s;
                        v.dom.metaDataId = w.id;
                        v.dom.onColumnHeaderMouseClick = n.events.onColumnHeaderMouseClick;
                        v.dom.onColumnHeaderMouseOver = n.events.onColumnHeaderMouseOver;
                        v.dom.onColumnHeaderMouseOut = n.events.onColumnHeaderMouseOut;
                        v.dom.setAttribute("onclick", "this.onColumnHeaderMouseClick(this.xLayout, this.response, this.metaDataId)");
                        v.dom.setAttribute("onmouseover", "this.onColumnHeaderMouseOver(this)");
                        v.dom.setAttribute("onmouseout", "this.onColumnHeaderMouseOut(this)")
                    }
                }
            };
            n.events.onColumnHeaderMouseClick = function (t, s, u) {
                if (t.sorting && t.sorting.id === u) {
                    t.sorting.direction = o.prototype.str.toggleDirection(t.sorting.direction)
                } else {
                    t.sorting = {id: u, direction: "DESC"}
                }
                k.core.web.pivot.sort(t, s, u)
            };
            n.events.onColumnHeaderMouseOver = function (s) {
                Ext.get(s).addCls("pointer highlighted")
            };
            n.events.onColumnHeaderMouseOut = function (s) {
                Ext.get(s).removeCls("pointer highlighted")
            };
            n.pivot = n.pivot || {};
            n.pivot.loadTable = function (s) {
                if (!Ext.isString(s)) {
                    alert("Invalid report table id");
                    return
                }
                Ext.data.JsonP.request({
                    url: r.contextPath + "/api/reportTables/" + s + ".jsonp?viewClass=dimensional&links=false",
                    failure: function (t) {
                        window.open(r.contextPath + "/api/reportTables/" + s + ".json?viewClass=dimensional&links=false", "_blank")
                    },
                    success: function (u) {
                        var t = p.layout.Layout(u);
                        if (t) {
                            n.pivot.getData(t, true)
                        }
                    }
                })
            };
            n.pivot.getData = function (t, u) {
                var s, v;
                if (!t) {
                    return
                }
                s = m.layout.getExtendedLayout(t);
                v = n.analytics.getParamString(s, true);
                n.mask.show(k.app.centerRegion);
                Ext.data.JsonP.request({
                    url: r.contextPath + "/api/analytics.jsonp" + v,
                    timeout: 60000,
                    headers: {"Content-Type": "application/json", Accepts: "application/json"},
                    disableCaching: false,
                    failure: function (w) {
                        n.mask.hide(k.app.centerRegion);
                        window.open(r.contextPath + "/api/analytics.json" + v, "_blank")
                    },
                    success: function (x) {
                        var w = p.response.Response(x);
                        if (!w) {
                            n.mask.hide(k.app.centerRegion);
                            return
                        }
                        s = m.layout.getSyncronizedXLayout(s, w);
                        if (!s) {
                            n.mask.hide(k.app.centerRegion);
                            return
                        }
                        k.app.paramString = v;
                        n.pivot.createTable(t, s, w, u)
                    }
                })
            };
            n.pivot.createTable = function (x, u, t, y) {
                var z, w, s, v;
                if (!u) {
                    u = m.layout.getExtendedLayout(x)
                }
                z = m.response.getExtendedResponse(u, t);
                w = m.layout.getExtendedAxis(u, "col");
                s = m.layout.getExtendedAxis(u, "row");
                v = n.pivot.getHtml(u, z, w, s);
                k.app.centerRegion.update(v.html);
                Ext.defer(function () {
                    Ext.get(k.core.init.el).fadeIn({duration: 400})
                }, 300);
                k.app.layout = x;
                k.app.xLayout = u;
                k.app.response = t;
                k.app.xResponse = z;
                k.app.uuidDimUuidsMap = v.uuidDimUuidsMap;
                k.app.uuidObjectMap = Ext.applyIf((w ? w.uuidObjectMap : {}), (s ? s.uuidObjectMap : {}));
                n.events.setColumnHeaderMouseHandlers(u, t);
                n.mask.hide(k.app.centerRegion)
            };
            n.pivot.sort = function (y, u, s) {
                var y = Ext.clone(y), u = Ext.clone(u), w = y.rows[0], t = u.idValueMap, z = y.sorting ? y.sorting.direction : "DESC", x;
                w.ids = [];
                for (var v = 0, C, B, A; v < w.items.length; v++) {
                    C = w.items[v];
                    B = s + C.id;
                    A = parseFloat(t[B]);
                    C.value = Ext.isNumber(A) ? A : (Number.MAX_VALUE * -1)
                }
                o.prototype.array.sort(w.items, z, "value");
                for (var v = 0; v < w.items.length; v++) {
                    w.ids.push(w.items[v].id)
                }
                x = p.layout.Layout(y);
                n.pivot.createTable(x, null, u, false)
            }
        };
        h = function () {
            return {centerRegion: Ext.get(j.el)}
        };
        g = function () {
            if (!l(j)) {
                return
            }
            k.core = PT.getCore(Ext.clone(e));
            k.core.init.el = j.el;
            Ext.get(k.core.init.el).setStyle("opacity", 0);
            i(k);
            k.app.viewport = h();
            k.app.centerRegion = k.app.viewport.centerRegion;
            if (j.id) {
                k.core.web.pivot.loadTable(j.id)
            } else {
                layout = k.core.api.layout.Layout(j);
                if (!layout) {
                    return
                }
                k.core.web.pivot.getData(layout)
            }
        }()
    };
    PT.plugin.getTable = function (g) {
        if (Ext.isString(g.url) && g.url.split("").pop() === "/") {
            g.url = g.url.substr(0, g.url.length - 1)
        }
        if (b) {
            c(g)
        } else {
            d.push(g);
            if (!f) {
                f = true;
                a(g.url)
            }
        }
    };
    DHIS = Ext.isObject(window.DHIS) ? DHIS : {};
    DHIS.getTable = PT.plugin.getTable
});
