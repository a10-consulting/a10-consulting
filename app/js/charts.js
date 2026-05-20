/* ============================================================
   A10 Projects — Lightweight Canvas Chart Library
   No external dependencies — pure Canvas 2D API
   ============================================================ */

'use strict';

window.A10Charts = (() => {
  const FONT = '700 12px Inter,system-ui,sans-serif';
  const FONT_SMALL = '600 11px Inter,system-ui,sans-serif';
  const NAVY = '#0f2a44';
  const MID  = '#6b7280';
  const LINE = 'rgba(15,42,68,0.08)';

  /* ── Helpers ───────────────────────────────────────────── */
  function px(canvas) {
    return window.devicePixelRatio || 1;
  }

  function setup(id) {
    const canvas = typeof id === 'string' ? document.getElementById(id) : id;
    if (!canvas) return null;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas, ctx, w: rect.width, h: rect.height };
  }

  function wrapText(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return [text];
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function truncate(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(t + '…').width > maxWidth) t = t.slice(0, -1);
    return t + '…';
  }

  /* ── Doughnut ──────────────────────────────────────────── */
  function doughnut(id, { labels, data, colors }) {
    const s = setup(id);
    if (!s) return;
    const { ctx, w, h } = s;

    const legendH = 24 * Math.ceil(labels.length / 2);
    const chartH = h - legendH - 8;
    const cx = w / 2;
    const cy = chartH / 2 + 4;
    const r  = Math.min(cx, cy) * 0.82;
    const inner = r * 0.62;
    const total = data.reduce((a, b) => a + b, 0) || 1;

    let angle = -Math.PI / 2;
    data.forEach((val, i) => {
      if (!val) return;
      const sweep = (val / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + sweep);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      angle += sweep;
    });

    // Inner hole
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Centre label
    ctx.font = `900 22px Inter,sans-serif`;
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 6);
    ctx.font = FONT_SMALL;
    ctx.fillStyle = MID;
    ctx.fillText('total', cx, cy + 12);

    // Legend
    const colW = w / 2;
    labels.forEach((label, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const lx = col * colW + 12;
      const ly = chartH + 8 + row * 22;

      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.roundRect(lx, ly + 2, 12, 12, 3);
      ctx.fill();

      ctx.font = FONT_SMALL;
      ctx.fillStyle = NAVY;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`${label} (${data[i]})`, lx + 16, ly + 2);
    });
  }

  /* ── Vertical Bar ──────────────────────────────────────── */
  function bar(id, { labels, datasets, yTickFormat, stacked }) {
    const s = setup(id);
    if (!s) return;
    const { ctx, w, h } = s;

    const PAD_L = 56, PAD_R = 12, PAD_T = 14, legendH = datasets.length > 1 ? 28 : 4;
    const PAD_B = 48;
    const chartW = w - PAD_L - PAD_R;
    const chartH = h - PAD_T - PAD_B - legendH;

    // Max value
    let maxVal = 0;
    if (stacked) {
      labels.forEach((_, i) => {
        const sum = datasets.reduce((s, d) => s + (d.data[i] || 0), 0);
        if (sum > maxVal) maxVal = sum;
      });
    } else {
      datasets.forEach(d => d.data.forEach(v => { if (v > maxVal) maxVal = v; }));
    }
    maxVal = maxVal || 1;
    const niceMax = Math.ceil(maxVal / 5) * 5 || 5;

    // Grid lines & Y axis
    const nTicks = 5;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.font = FONT_SMALL;
    ctx.fillStyle = MID;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let t = 0; t <= nTicks; t++) {
      const val = (niceMax / nTicks) * t;
      const y = PAD_T + legendH + chartH - (val / niceMax) * chartH;
      ctx.beginPath();
      ctx.moveTo(PAD_L, y);
      ctx.lineTo(PAD_L + chartW, y);
      ctx.stroke();
      ctx.fillText(yTickFormat ? yTickFormat(val) : Math.round(val), PAD_L - 6, y);
    }

    // Bars
    const n = labels.length;
    const groupW = chartW / n;
    const barSetW = Math.min(groupW * 0.7, 60);
    const barW = datasets.length > 1 ? barSetW / datasets.length - 2 : barSetW;

    datasets.forEach((ds, di) => {
      ctx.fillStyle = ds.backgroundColor || '#3e6697';
      ds.data.forEach((val, i) => {
        const bh = (val / niceMax) * chartH;
        const bx = PAD_L + i * groupW + (groupW - barSetW) / 2 + (stacked ? 0 : di * (barW + 2));
        const by = stacked && di > 0
          ? PAD_T + legendH + chartH - datasets.slice(0, di).reduce((s, d) => s + ((d.data[i] || 0) / niceMax) * chartH, 0) - bh
          : PAD_T + legendH + chartH - bh;

        const safeBh = Math.max(0, bh);
        const radius = Math.max(0, Math.min(4, barW / 2, safeBh / 2));
        ctx.beginPath();
        if (stacked) {
          ctx.rect(bx, by, barSetW, safeBh);
        } else {
          ctx.roundRect(bx, by, barW, safeBh, [radius, radius, 0, 0]);
        }
        ctx.fill();
      });
    });

    // X labels
    ctx.font = FONT_SMALL;
    ctx.fillStyle = MID;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    labels.forEach((label, i) => {
      const lx = PAD_L + i * groupW + groupW / 2;
      const ly = PAD_T + legendH + chartH + 6;
      ctx.fillText(truncate(ctx, label, groupW - 4), lx, ly);
    });

    // Legend
    if (datasets.length > 1) {
      let lx = PAD_L;
      datasets.forEach(ds => {
        ctx.fillStyle = ds.backgroundColor || '#3e6697';
        ctx.beginPath();
        ctx.roundRect(lx, 4, 12, 12, 3);
        ctx.fill();
        ctx.font = FONT_SMALL;
        ctx.fillStyle = NAVY;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(ds.label, lx + 16, 5);
        lx += ctx.measureText(ds.label).width + 34;
      });
    }
  }

  /* ── Horizontal Bar ────────────────────────────────────── */
  function barH(id, { labels, datasets, xTickFormat }) {
    const s = setup(id);
    if (!s) return;
    const { ctx, w, h } = s;

    const labelW = 160;
    const PAD_R = 40, PAD_T = 8, PAD_B = 28;
    const chartW = w - labelW - PAD_R;
    const rowH = (h - PAD_T - PAD_B) / labels.length;
    const barH = Math.min(rowH * 0.55, 22);

    let maxVal = 0;
    datasets.forEach(d => d.data.forEach(v => { if (v > maxVal) maxVal = v; }));
    maxVal = maxVal || 1;

    // Grid lines
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.font = FONT_SMALL;
    ctx.fillStyle = MID;
    const nTicks = 4;
    for (let t = 0; t <= nTicks; t++) {
      const val = (maxVal / nTicks) * t;
      const x = labelW + (val / maxVal) * chartW;
      ctx.beginPath();
      ctx.moveTo(x, PAD_T);
      ctx.lineTo(x, h - PAD_B);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(xTickFormat ? xTickFormat(val) : Math.round(val), x, h - PAD_B + 4);
    }

    // Bars
    labels.forEach((label, i) => {
      const y = PAD_T + i * rowH + rowH / 2;

      // Label
      ctx.font = FONT_SMALL;
      ctx.fillStyle = NAVY;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(truncate(ctx, label, labelW - 8), labelW - 8, y);

      // Bar(s)
      datasets.forEach((ds, di) => {
        const val = ds.data[i] || 0;
        const bw = (val / maxVal) * chartW;
        const bx = labelW;
        const by = y - barH / 2 + di * (barH / datasets.length + 1);
        const bhi = datasets.length > 1 ? barH / datasets.length - 1 : barH;
        const radius = Math.min(4, bhi / 2);

        ctx.fillStyle = Array.isArray(ds.backgroundColor)
          ? ds.backgroundColor[i % ds.backgroundColor.length]
          : (ds.backgroundColor || '#3e6697');
        ctx.beginPath();
        ctx.roundRect(bx, by, Math.max(bw, 2), bhi, [0, radius, radius, 0]);
        ctx.fill();

        // Value label
        if (bw > 24) {
          ctx.font = `700 11px Inter,sans-serif`;
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText((xTickFormat ? xTickFormat(val) : val), bx + bw - 5, by + bhi / 2);
        }
      });
    });
  }

  return { doughnut, bar, barH };
})();
