﻿/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@viselect/vanilla@3.5.0/dist/viselect.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*! @viselect/vanilla v3.5.0 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
(function (E, g) { typeof exports == "object" && typeof module < "u" ? module.exports = g() : typeof define == "function" && define.amd ? define(g) : (E = typeof globalThis < "u" ? globalThis : E || self, E.SelectionArea = g()) })(this, function () { "use strict"; var W = Object.defineProperty; var X = (E, g, v) => g in E ? W(E, g, { enumerable: !0, configurable: !0, writable: !0, value: v }) : E[g] = v; var u = (E, g, v) => (X(E, typeof g != "symbol" ? g + "" : g, v), v); class E { constructor() { u(this, "_listeners", new Map); u(this, "on", this.addEventListener); u(this, "off", this.removeEventListener); u(this, "emit", this.dispatchEvent) } addEventListener(n, e) { const t = this._listeners.get(n) ?? new Set; return this._listeners.set(n, t), t.add(e), this } removeEventListener(n, e) { var t; return (t = this._listeners.get(n)) == null || t.delete(e), this } dispatchEvent(n, ...e) { let t = !0; for (const s of this._listeners.get(n) ?? []) t = s(...e) !== !1 && t; return t } unbindAllListeners() { this._listeners.clear() } } const g = (c, n = "px") => typeof c == "number" ? c + n : c; function v({ style: c }, n, e) { if (typeof n == "object") for (const [t, s] of Object.entries(n)) s !== void 0 && (c[t] = g(s)); else e !== void 0 && (c[n] = g(e)) } const M = c => (n, e, t, s = {}) => { n instanceof HTMLCollection || n instanceof NodeList ? n = Array.from(n) : Array.isArray(n) || (n = [n]), Array.isArray(e) || (e = [e]); for (const i of n) if (i) for (const o of e) i[c](o, t, { capture: !1, ...s }); return [n, e, t, s] }, T = M("addEventListener"), b = M("removeEventListener"), w = c => { var s; const { clientX: n, clientY: e, target: t } = ((s = c.touches) == null ? void 0 : s[0]) ?? c; return { x: n, y: e, target: t } }; function C(c, n, e = "touch") { switch (e) { case "center": { const t = n.left + n.width / 2, s = n.top + n.height / 2; return t >= c.left && t <= c.right && s >= c.top && s <= c.bottom } case "cover": return n.left >= c.left && n.top >= c.top && n.right <= c.right && n.bottom <= c.bottom; case "touch": return c.right >= n.left && c.left <= n.right && c.bottom >= n.top && c.top <= n.bottom } } function A(c, n = document) { const e = Array.isArray(c) ? c : [c]; let t = []; for (let s = 0, i = e.length; s < i; s++) { const o = e[s]; typeof o == "string" ? t = t.concat(Array.from(n.querySelectorAll(o))) : o instanceof Element && t.push(o) } return t } const q = () => matchMedia("(hover: none), (pointer: coarse)").matches, K = () => "safari" in window, O = c => { let n, e = -1, t = !1; return { next(...s) { n = s, t || (t = !0, e = requestAnimationFrame(() => { c(...n), t = !1 })) }, cancel() { cancelAnimationFrame(e), t = !1 } } }; function H(c, n) { for (const e of n) { if (typeof e == "number") return c.button === e; if (typeof e == "object") { const t = e.button === c.button, s = e.modifiers.every(i => { switch (i) { case "alt": return c.altKey; case "ctrl": return c.ctrlKey || c.metaKey; case "shift": return c.shiftKey } }); return t && s } } return !1 } const { abs: S, max: R, min: k, ceil: D } = Math; class B extends E { constructor(e) { var o, l, r, h, f; super(); u(this, "_options"); u(this, "_selection", { stored: [], selected: [], touched: [], changed: { added: [], removed: [] } }); u(this, "_area"); u(this, "_clippingElement"); u(this, "_targetElement"); u(this, "_targetRect"); u(this, "_selectables", []); u(this, "_latestElement"); u(this, "_areaRect", new DOMRect); u(this, "_areaLocation", { y1: 0, x2: 0, y2: 0, x1: 0 }); u(this, "_singleClick", !0); u(this, "_frame"); u(this, "_scrollAvailable", !0); u(this, "_scrollingActive", !1); u(this, "_scrollSpeed", { x: 0, y: 0 }); u(this, "_scrollDelta", { x: 0, y: 0 }); u(this, "disable", this._bindStartEvents.bind(this, !1)); u(this, "enable", this._bindStartEvents); this._options = { selectionAreaClass: "selection-area", selectionContainerClass: void 0, selectables: [], document: window.document, startAreas: ["html"], boundaries: ["html"], container: "body", ...e, behaviour: { overlap: "invert", intersect: "touch", triggers: [0], ...e.behaviour, startThreshold: (o = e.behaviour) != null && o.startThreshold ? typeof e.behaviour.startThreshold == "number" ? e.behaviour.startThreshold : { x: 10, y: 10, ...e.behaviour.startThreshold } : { x: 10, y: 10 }, scrolling: { speedDivider: 10, manualSpeed: 750, ...(l = e.behaviour) == null ? void 0 : l.scrolling, startScrollMargins: { x: 0, y: 0, ...(h = (r = e.behaviour) == null ? void 0 : r.scrolling) == null ? void 0 : h.startScrollMargins } } }, features: { range: !0, touch: !0, ...e.features, singleTap: { allow: !0, intersect: "native", ...(f = e.features) == null ? void 0 : f.singleTap } } }; for (const p of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) typeof this[p] == "function" && (this[p] = this[p].bind(this)); const { document: t, selectionAreaClass: s, selectionContainerClass: i } = this._options; this._area = t.createElement("div"), this._clippingElement = t.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(s), i && this._clippingElement.classList.add(i), v(this._area, { willChange: "top, left, bottom, right, width, height", top: 0, left: 0, position: "fixed" }), v(this._clippingElement, { overflow: "hidden", position: "fixed", transform: "translate3d(0, 0, 0)", pointerEvents: "none", zIndex: "1" }), this._frame = O(p => { this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", p), this._redrawSelectionArea() }), this.enable() } _bindStartEvents(e = !0) { const { document: t, features: s } = this._options, i = e ? T : b; i(t, "mousedown", this._onTapStart), s.touch && i(t, "touchstart", this._onTapStart, { passive: !1 }) } _onTapStart(e, t = !1) { const { x: s, y: i, target: o } = w(e), { _options: l } = this, { document: r } = this._options, h = o.getBoundingClientRect(); if (e instanceof MouseEvent && !H(e, l.behaviour.triggers)) return; const f = A(l.startAreas, l.document), p = A(l.boundaries, l.document); this._targetElement = p.find(y => C(y.getBoundingClientRect(), h)); const m = e.composedPath(); if (!this._targetElement || !f.find(y => m.includes(y)) || !p.find(y => m.includes(y)) || !t && this._emitEvent("beforestart", e) === !1) return; this._areaLocation = { x1: s, y1: i, x2: 0, y2: 0 }; const a = r.scrollingElement ?? r.body; this._scrollDelta = { x: a.scrollLeft, y: a.scrollTop }, this._singleClick = !0, this.clearSelection(!1, !0), T(r, ["touchmove", "mousemove"], this._delayedTapMove, { passive: !1 }), T(r, ["mouseup", "touchcancel", "touchend"], this._onTapStop), T(r, "scroll", this._onScroll) } _onSingleTap(e) { const { singleTap: { intersect: t }, range: s } = this._options.features, i = w(e); let o; if (t === "native") o = i.target; else if (t === "touch") { this.resolveSelectables(); const { x: r, y: h } = i; o = this._selectables.find(f => { const { right: p, left: m, top: a, bottom: y } = f.getBoundingClientRect(); return r < p && r > m && h < y && h > a }) } if (!o) return; for (this.resolveSelectables(); !this._selectables.includes(o);) { if (!o.parentElement) return; o = o.parentElement } const { stored: l } = this._selection; if (this._emitEvent("start", e), e.shiftKey && s && this._latestElement) { const r = this._latestElement, [h, f] = r.compareDocumentPosition(o) & 4 ? [o, r] : [r, o], p = [...this._selectables.filter(m => m.compareDocumentPosition(h) & 4 && m.compareDocumentPosition(f) & 2), h, f]; this.select(p), this._latestElement = r } else l.includes(o) && (l.length === 1 || e.ctrlKey || l.every(r => this._selection.stored.includes(r))) ? this.deselect(o) : (this.select(o), this._latestElement = o); this._emitEvent("stop", e) } _delayedTapMove(e) { const { container: t, document: s, behaviour: { startThreshold: i } } = this._options, { x1: o, y1: l } = this._areaLocation, { x: r, y: h } = w(e); if (typeof i == "number" && S(r + h - (o + l)) >= i || typeof i == "object" && S(r - o) >= i.x || S(h - l) >= i.y) { if (b(s, ["mousemove", "touchmove"], this._delayedTapMove, { passive: !1 }), this._emitEvent("beforedrag", e) === !1) { b(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop); return } T(s, ["mousemove", "touchmove"], this._onTapMove, { passive: !1 }), v(this._area, "display", "block"), A(t, s)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (T(this._targetElement, "wheel", this._manualScroll, { passive: !1 }), this._selectables = this._selectables.filter(f => this._targetElement.contains(f))), this._setupSelectionArea(), this._emitEvent("start", e), this._onTapMove(e) } this._handleMoveEvent(e) } _setupSelectionArea() { const { _clippingElement: e, _targetElement: t, _area: s } = this, i = this._targetRect = t.getBoundingClientRect(); this._scrollAvailable ? (v(e, { top: i.top, left: i.left, width: i.width, height: i.height }), v(s, { marginTop: -i.top, marginLeft: -i.left })) : (v(e, { top: 0, left: 0, width: "100%", height: "100%" }), v(s, { marginTop: 0, marginLeft: 0 })) } _onTapMove(e) { const { x: t, y: s } = w(e), { _scrollSpeed: i, _areaLocation: o, _options: l, _frame: r } = this, { speedDivider: h } = l.behaviour.scrolling, f = this._targetElement; if (o.x2 = t, o.y2 = s, this._scrollAvailable && !this._scrollingActive && (i.y || i.x)) { this._scrollingActive = !0; const p = () => { if (!i.x && !i.y) { this._scrollingActive = !1; return } const { scrollTop: m, scrollLeft: a } = f; i.y && (f.scrollTop += D(i.y / h), o.y1 -= f.scrollTop - m), i.x && (f.scrollLeft += D(i.x / h), o.x1 -= f.scrollLeft - a), r.next(e), requestAnimationFrame(p) }; requestAnimationFrame(p) } else r.next(e); this._handleMoveEvent(e) } _handleMoveEvent(e) { const { features: t } = this._options; (t.touch && q() || this._scrollAvailable && K()) && e.preventDefault() } _onScroll() { const { _scrollDelta: e, _options: { document: t } } = this, { scrollTop: s, scrollLeft: i } = t.scrollingElement ?? t.body; this._areaLocation.x1 += e.x - i, this._areaLocation.y1 += e.y - s, e.x = i, e.y = s, this._setupSelectionArea(), this._frame.next(null) } _manualScroll(e) { const { manualSpeed: t } = this._options.behaviour.scrolling, s = e.deltaY ? e.deltaY > 0 ? 1 : -1 : 0, i = e.deltaX ? e.deltaX > 0 ? 1 : -1 : 0; this._scrollSpeed.y += s * t, this._scrollSpeed.x += i * t, this._onTapMove(e), e.preventDefault() } _recalculateSelectionAreaRect() { const { _scrollSpeed: e, _areaLocation: t, _areaRect: s, _targetElement: i, _options: o } = this, { scrollTop: l, scrollHeight: r, clientHeight: h, scrollLeft: f, scrollWidth: p, clientWidth: m } = i, a = this._targetRect, { x1: y, y1: L } = t; let { x2: _, y2: d } = t; const { behaviour: { scrolling: { startScrollMargins: x } } } = o; _ < a.left + x.x ? (e.x = f ? -S(a.left - _ + x.x) : 0, _ = _ < a.left ? a.left : _) : _ > a.right - x.x ? (e.x = p - f - m ? S(a.left + a.width - _ - x.x) : 0, _ = _ > a.right ? a.right : _) : e.x = 0, d < a.top + x.y ? (e.y = l ? -S(a.top - d + x.y) : 0, d = d < a.top ? a.top : d) : d > a.bottom - x.y ? (e.y = r - l - h ? S(a.top + a.height - d - x.y) : 0, d = d > a.bottom ? a.bottom : d) : e.y = 0; const P = k(y, _), j = k(L, d), F = R(y, _), I = R(L, d); s.x = P, s.y = j, s.width = F - P, s.height = I - j } _redrawSelectionArea() { const { x: e, y: t, width: s, height: i } = this._areaRect, { style: o } = this._area; o.left = `${e}px`, o.top = `${t}px`, o.width = `${s}px`, o.height = `${i}px` } _onTapStop(e, t) { var l; const { document: s, features: i } = this._options, { _singleClick: o } = this; b(s, ["mousemove", "touchmove"], this._delayedTapMove), b(s, ["touchmove", "mousemove"], this._onTapMove), b(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop), b(s, "scroll", this._onScroll), this._keepSelection(), e && o && i.singleTap.allow ? this._onSingleTap(e) : !o && !t && (this._updateElementSelection(), this._emitEvent("stop", e)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, b(this._targetElement, "wheel", this._manualScroll, { passive: !0 }), this._clippingElement.remove(), (l = this._frame) == null || l.cancel(), v(this._area, "display", "none") } _updateElementSelection() { const { _selectables: e, _options: t, _selection: s, _areaRect: i } = this, { stored: o, selected: l, touched: r } = s, { intersect: h, overlap: f } = t.behaviour, p = f === "invert", m = [], a = [], y = []; for (let _ = 0; _ < e.length; _++) { const d = e[_]; if (C(i, d.getBoundingClientRect(), h)) { if (l.includes(d)) o.includes(d) && !r.includes(d) && r.push(d); else if (p && o.includes(d)) { y.push(d); continue } else a.push(d); m.push(d) } } p && a.push(...o.filter(_ => !l.includes(_))); const L = f === "keep"; for (let _ = 0; _ < l.length; _++) { const d = l[_]; !m.includes(d) && !(L && o.includes(d)) && y.push(d) } s.selected = m, s.changed = { added: a, removed: y }, this._latestElement = void 0 } _emitEvent(e, t) { return this.emit(e, { event: t, store: this._selection, selection: this }) } _keepSelection() { const { _options: e, _selection: t } = this, { selected: s, changed: i, touched: o, stored: l } = t, r = s.filter(h => !l.includes(h)); switch (e.behaviour.overlap) { case "drop": { t.stored = [...r, ...l.filter(h => !o.includes(h))]; break } case "invert": { t.stored = [...r, ...l.filter(h => !i.removed.includes(h))]; break } case "keep": { t.stored = [...l, ...s.filter(h => !l.includes(h))]; break } } } trigger(e, t = !0) { this._onTapStart(e, t) } resolveSelectables() { this._selectables = A(this._options.selectables, this._options.document) } clearSelection(e = !0, t = !1) { const { selected: s, stored: i, changed: o } = this._selection; o.added = [], o.removed.push(...s, ...e ? i : []), t || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = { stored: e ? [] : i, selected: [], touched: [], changed: { added: [], removed: [] } } } getSelection() { return this._selection.stored } getSelectionArea() { return this._area } cancel(e = !1) { this._onTapStop(null, !e) } destroy() { this.cancel(), this.disable(), this._clippingElement.remove(), super.unbindAllListeners() } select(e, t = !1) { const { changed: s, selected: i, stored: o } = this._selection, l = A(e, this._options.document).filter(r => !i.includes(r) && !o.includes(r)); return o.push(...l), i.push(...l), s.added.push(...l), s.removed = [], this._latestElement = void 0, t || (this._emitEvent("move", null), this._emitEvent("stop", null)), l } deselect(e, t = !1) { const { selected: s, stored: i, changed: o } = this._selection, l = A(e, this._options.document).filter(r => s.includes(r) || i.includes(r)); l.length && (this._selection.stored = i.filter(r => !l.includes(r)), this._selection.selected = s.filter(r => !l.includes(r)), this._selection.changed.added = [], this._selection.changed.removed.push(...l.filter(r => !o.removed.includes(r))), this._latestElement = void 0, t || (this._emitEvent("move", null), this._emitEvent("stop", null))) } } return u(B, "version", "3.5.0"), B });
//# sourceMappingURL=viselect.umd.js.map