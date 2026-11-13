import { jsPDF } from 'jspdf';
import type { Lang } from '../context/PreferencesContext';
import { SITE_CONFIG } from '../config/site';

export interface ReportField {
  label: string;
  value: string;
}

export interface CalculatorSnapshot {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  inputs: ReportField[];
  results: ReportField[];
  formula: string;
}

function cleanText(text: string | null | undefined): string {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function extractLinesFromElement(el: Element): string[] {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('br').forEach((br) => {
    br.replaceWith('\n');
  });
  clone.querySelectorAll('div, p, li').forEach((block) => {
    block.prepend('\n');
  });
  const raw = clone.textContent || '';
  return raw
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

/**
 * Extracts live input values and computed output metrics directly from a calculator DOM section.
 */
export function extractCalculatorSnapshot(id: string, lang: Lang): CalculatorSnapshot | null {
  const section = document.getElementById(id);
  if (!section) return null;

  const isEn = lang === 'en';
  const title = cleanText(section.querySelector('h3')?.textContent) || id;
  const subtitle = cleanText(section.querySelector('h3 + p')?.textContent);

  // Extract inputs and their labels
  const inputs: ReportField[] = [];
  const inputElements = section.querySelectorAll('input');
  inputElements.forEach((input) => {
    const labelEl = input.id
      ? section.querySelector(`label[for="${CSS.escape(input.id)}"]`)
      : null;
    const labelText = cleanText(labelEl?.textContent).replace(/\*$/, '').trim();
    const rawVal = input.value.trim();
    const displayVal = rawVal !== '' ? rawVal : '0';
    if (labelText) {
      inputs.push({ label: labelText, value: displayVal });
    }
  });

  // Extract active mode for VAT calculator if present
  if (id === 'vat') {
    const activeTab = section.querySelector('button.shadow-xs');
    if (activeTab) {
      inputs.unshift({
        label: isEn ? 'Calculation Mode' : 'وضع الحساب',
        value: cleanText(activeTab.textContent),
      });
    }
  }

  // Extract results from the summary box (.lg\:col-span-5)
  const resultsBox = section.querySelector('.lg\\:col-span-5');
  const results: ReportField[] = [];
  let badge = '';
  let formula = '';

  if (resultsBox) {
    // Check status badge (Profitable / Loss / etc.)
    const badgeEl = resultsBox.querySelector('span.rounded-full');
    if (badgeEl) {
      badge = cleanText(badgeEl.textContent);
    }

    // Primary result card (has text-2xl or text-3xl)
    const primaryCard = resultsBox.querySelector('.p-4.rounded-xl');
    if (primaryCard) {
      const pLabel = cleanText(primaryCard.querySelector('span')?.textContent);
      const pVal = cleanText(
        primaryCard.querySelector('.text-2xl, .text-3xl')?.textContent
      );
      if (pLabel && pVal) {
        results.push({ label: pLabel, value: pVal });
      }
    }

    // Secondary metric cards inside .grid-cols-2
    const gridCards = resultsBox.querySelectorAll('.grid-cols-2 > div');
    gridCards.forEach((card) => {
      const spans = card.querySelectorAll('span');
      if (spans.length >= 2) {
        const sLabel = cleanText(spans[0].textContent);
        const sVal = cleanText(spans[1].textContent);
        if (sLabel && sVal) {
          results.push({ label: sLabel, value: sVal });
        }
      }
    });

    // Extra summary rows (e.g. Selling Price fixed costs)
    const extraRow = resultsBox.querySelector('.p-3.flex.justify-between.items-center');
    if (extraRow) {
      const spans = extraRow.querySelectorAll('span');
      if (spans.length >= 2) {
        results.push({
          label: cleanText(spans[0].textContent),
          value: cleanText(spans[1].textContent),
        });
      }
    }

    // Order Cost breakdown rows
    const breakdownRows = resultsBox.querySelectorAll('.space-y-1\\.5 > div');
    breakdownRows.forEach((row) => {
      const itemName = cleanText(row.children[0]?.textContent);
      const valEl = row.children[1];
      const itemVal = valEl
        ? Array.from(valEl.children)
            .map((c) => cleanText(c.textContent))
            .filter(Boolean)
            .join(' ') || cleanText(valEl.textContent)
        : '';
      if (itemName && itemVal) {
        results.push({ label: itemName, value: itemVal });
      }
    });

    // Formula footer (preserve <br> and block boundaries cleanly)
    const formulaEl = resultsBox.querySelector('.border-t.text-xs');
    if (formulaEl) {
      formula = extractLinesFromElement(formulaEl).join('\n');
    }
  }

  return {
    id,
    title,
    subtitle,
    badge,
    inputs,
    results,
    formula,
  };
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const paragraphs = text.split('\n').filter(Boolean);
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = ctx.measureText(testLine).width;
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill?: string,
  stroke?: string
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

/**
 * Generates and downloads a crisp A4 Arabic/English PDF report using native Canvas text shaping + jsPDF.
 */
export async function generateCalculatorsPdfReport(
  calculatorIds: string[],
  lang: Lang,
  singleCalculatorTitle?: string
): Promise<boolean> {
  if (calculatorIds.length === 0) return false;

  // Ensure web fonts (Tajawal) are loaded before drawing to canvas
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue with fallback font
    }
  }

  const snapshots = calculatorIds
    .map((id) => extractCalculatorSnapshot(id, lang))
    .filter((s): s is CalculatorSnapshot => s !== null);

  if (snapshots.length === 0) return false;

  const isEn = lang === 'en';
  const fontFamily = "'Tajawal', 'IBM Plex Sans Arabic', 'Segoe UI', Arial, sans-serif";

  // A4 at 150 DPI (1240 x 1754)
  const PAGE_W = 1240;
  const PAGE_H = 1754;
  const MARGIN = 60;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const FOOTER_H = 90;

  const pages: HTMLCanvasElement[] = [];

  const createPageCanvas = (isFirstPage: boolean): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; startY: number } => {
    const canvas = document.createElement('canvas');
    canvas.width = PAGE_W;
    canvas.height = PAGE_H;
    const ctx = canvas.getContext('2d')!;
    ctx.direction = isEn ? 'ltr' : 'rtl';

    // White Page Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);

    // Top Header Banner
    const headerH = isFirstPage ? 150 : 95;
    drawRoundedRect(ctx, MARGIN, 45, CONTENT_W, headerH, 18, '#0F766E');

    const textAnchorX = isEn ? MARGIN + 32 : PAGE_W - MARGIN - 32;
    const oppositeAnchorX = isEn ? PAGE_W - MARGIN - 32 : MARGIN + 32;

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = isEn ? 'left' : 'right';
    ctx.font = `800 ${isFirstPage ? 30 : 22}px ${fontFamily}`;

    const reportHeading =
      snapshots.length === 1
        ? isEn
          ? `${snapshots[0].title} — Report`
          : `تقرير ${snapshots[0].title}`
        : singleCalculatorTitle
        ? singleCalculatorTitle
        : isEn
        ? 'Store Financial Analysis Report'
        : 'التقرير المالي الشامل للمتجر الإلكتروني';

    ctx.fillText(reportHeading, textAnchorX, isFirstPage ? 100 : 88);

    ctx.fillStyle = '#CCFBF1';
    ctx.font = `500 17px ${fontFamily}`;
    const brandSub = isEn
      ? `${SITE_CONFIG.nameEn} — Saudi E-commerce Financial Calculators`
      : `منصة ${SITE_CONFIG.name} — حاسبات التجارة الإلكترونية في السعودية`;
    ctx.fillText(brandSub, textAnchorX, isFirstPage ? 136 : 118);

    if (isFirstPage) {
      const todayStr = new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      ctx.textAlign = isEn ? 'right' : 'left';
      ctx.fillStyle = '#CCFBF1';
      ctx.font = `600 15px ${fontFamily}`;
      ctx.fillText(isEn ? 'Report Date' : 'تاريخ التقرير', oppositeAnchorX, 95);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 18px ${fontFamily}`;
      ctx.fillText(todayStr, oppositeAnchorX, 125);
    }

    return {
      canvas,
      ctx,
      startY: 45 + headerH + 28,
    };
  };

  let current = createPageCanvas(true);
  pages.push(current.canvas);
  let cursorY = current.startY;

  for (const snap of snapshots) {
    // Pre-calculate card height
    const ctx = current.ctx;
    ctx.font = `500 16px ${fontFamily}`;
    const subtitleLines = wrapText(ctx, snap.subtitle, CONTENT_W - 64);

    ctx.font = `500 15px ${fontFamily}`;
    const formulaLines = wrapText(ctx, snap.formula, CONTENT_W - 64);

    const rowsCount = Math.max(snap.inputs.length, snap.results.length, 1);
    const headerBlockH = 74 + subtitleLines.length * 24;
    const rowsBlockH = 44 + rowsCount * 42 + 16;
    const formulaBlockH = formulaLines.length > 0 ? 30 + formulaLines.length * 22 : 16;
    const cardH = headerBlockH + rowsBlockH + formulaBlockH + 20;

    // Check if we need a new page
    if (cursorY + cardH > PAGE_H - FOOTER_H) {
      current = createPageCanvas(false);
      pages.push(current.canvas);
      cursorY = current.startY;
    }

    const pCtx = current.ctx;
    pCtx.direction = isEn ? 'ltr' : 'rtl';

    // Outer Card
    drawRoundedRect(pCtx, MARGIN, cursorY, CONTENT_W, cardH, 16, '#FFFFFF', '#CBD5E1');

    // Card Title Strip
    drawRoundedRect(pCtx, MARGIN + 1, cursorY + 1, CONTENT_W - 2, headerBlockH, 15, '#F8FAFC');
    pCtx.beginPath();
    pCtx.moveTo(MARGIN, cursorY + headerBlockH);
    pCtx.lineTo(MARGIN + CONTENT_W, cursorY + headerBlockH);
    pCtx.strokeStyle = '#E2E8F0';
    pCtx.lineWidth = 1;
    pCtx.stroke();

    const cardTextX = isEn ? MARGIN + 28 : PAGE_W - MARGIN - 28;
    const cardOppX = isEn ? PAGE_W - MARGIN - 28 : MARGIN + 28;

    pCtx.textAlign = isEn ? 'left' : 'right';
    pCtx.fillStyle = '#0F172A';
    pCtx.font = `800 22px ${fontFamily}`;
    pCtx.fillText(snap.title, cardTextX, cursorY + 42);

    if (snap.badge) {
      pCtx.textAlign = isEn ? 'right' : 'left';
      pCtx.fillStyle = '#0F766E';
      pCtx.font = `700 16px ${fontFamily}`;
      pCtx.fillText(snap.badge, cardOppX, cursorY + 42);
    }

    pCtx.textAlign = isEn ? 'left' : 'right';
    pCtx.fillStyle = '#475569';
    pCtx.font = `500 16px ${fontFamily}`;
    subtitleLines.forEach((line, i) => {
      pCtx.fillText(line, cardTextX, cursorY + 72 + i * 24);
    });

    // Two Columns: Inputs & Results
    const bodyStartY = cursorY + headerBlockH + 18;
    const colGap = 24;
    const colW = (CONTENT_W - 56 - colGap) / 2;

    const inputsX = isEn ? MARGIN + 28 : PAGE_W - MARGIN - 28 - colW;
    const resultsX = isEn ? MARGIN + 28 + colW + colGap : MARGIN + 28;

    // Column Headers
    pCtx.fillStyle = '#334155';
    pCtx.font = `700 16px ${fontFamily}`;
    pCtx.textAlign = isEn ? 'left' : 'right';
    pCtx.fillText(
      isEn ? 'Entered Inputs' : 'البيانات المدخلة',
      isEn ? inputsX : inputsX + colW,
      bodyStartY + 18
    );

    pCtx.fillStyle = '#0F766E';
    pCtx.fillText(
      isEn ? 'Calculated Results' : 'النتائج المحسوبة',
      isEn ? resultsX : resultsX + colW,
      bodyStartY + 18
    );

    // Draw Input Rows
    snap.inputs.forEach((item, idx) => {
      const rowY = bodyStartY + 34 + idx * 40;
      drawRoundedRect(
        pCtx,
        inputsX,
        rowY,
        colW,
        34,
        8,
        idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
        '#E2E8F0'
      );

      pCtx.font = `700 15px ${fontFamily}`;
      const valWidth = pCtx.measureText(item.value).width;
      pCtx.fillStyle = '#0F172A';
      pCtx.textAlign = isEn ? 'right' : 'left';
      pCtx.fillText(item.value, isEn ? inputsX + colW - 12 : inputsX + 12, rowY + 22);

      pCtx.font = `500 14px ${fontFamily}`;
      pCtx.fillStyle = '#475569';
      pCtx.textAlign = isEn ? 'left' : 'right';
      const maxLabelW = Math.max(120, colW - 36 - valWidth);
      let lbl = item.label;
      while (pCtx.measureText(lbl).width > maxLabelW && lbl.length > 4) {
        lbl = lbl.slice(0, -2) + '…';
      }
      pCtx.fillText(lbl, isEn ? inputsX + 12 : inputsX + colW - 12, rowY + 22);
    });

    // Draw Result Rows
    snap.results.forEach((item, idx) => {
      const rowY = bodyStartY + 34 + idx * 40;
      const isPrimary = idx === 0;
      drawRoundedRect(
        pCtx,
        resultsX,
        rowY,
        colW,
        34,
        8,
        isPrimary ? '#F0FDFA' : '#F8FAFC',
        isPrimary ? '#99F6E4' : '#E2E8F0'
      );

      pCtx.font = `800 ${isPrimary ? 16 : 14}px ${fontFamily}`;
      const valWidth = pCtx.measureText(item.value).width;
      pCtx.fillStyle = isPrimary ? '#0F766E' : '#0F172A';
      pCtx.textAlign = isEn ? 'right' : 'left';
      pCtx.fillText(item.value, isEn ? resultsX + colW - 12 : resultsX + 12, rowY + 22);

      pCtx.font = `${isPrimary ? '700' : '500'} 14px ${fontFamily}`;
      pCtx.fillStyle = isPrimary ? '#115E59' : '#475569';
      pCtx.textAlign = isEn ? 'left' : 'right';
      const maxLabelW = Math.max(110, colW - 36 - valWidth);
      let lbl = item.label;
      while (pCtx.measureText(lbl).width > maxLabelW && lbl.length > 4) {
        lbl = lbl.slice(0, -2) + '…';
      }
      pCtx.fillText(lbl, isEn ? resultsX + 12 : resultsX + colW - 12, rowY + 22);
    });

    // Formula Footnote inside card
    if (formulaLines.length > 0) {
      const formulaY = bodyStartY + 34 + rowsCount * 40 + 16;
      pCtx.beginPath();
      pCtx.moveTo(MARGIN + 28, formulaY - 8);
      pCtx.lineTo(PAGE_W - MARGIN - 28, formulaY - 8);
      pCtx.strokeStyle = '#E2E8F0';
      pCtx.lineWidth = 1;
      pCtx.stroke();

      pCtx.textAlign = isEn ? 'left' : 'right';
      pCtx.fillStyle = '#64748B';
      pCtx.font = `500 14px ${fontFamily}`;
      formulaLines.forEach((line, i) => {
        pCtx.fillText(line, cardTextX, formulaY + 14 + i * 21);
      });
    }

    cursorY += cardH + 24;
  }

  // Draw Footers on all pages
  const totalPages = pages.length;
  pages.forEach((canvas, idx) => {
    const fCtx = canvas.getContext('2d')!;
    fCtx.direction = isEn ? 'ltr' : 'rtl';
    fCtx.beginPath();
    fCtx.moveTo(MARGIN, PAGE_H - 65);
    fCtx.lineTo(PAGE_W - MARGIN, PAGE_H - 65);
    fCtx.strokeStyle = '#CBD5E1';
    fCtx.lineWidth = 1;
    fCtx.stroke();

    fCtx.fillStyle = '#64748B';
    fCtx.font = `500 14px ${fontFamily}`;
    fCtx.textAlign = isEn ? 'left' : 'right';
    const disclaimer = isEn
      ? 'Disclaimer: Results are estimates based on user inputs and do not replace professional financial or tax advice.'
      : 'إخلاء مسؤولية: النتائج تقديرية وتعتمد على البيانات المدخلة ولا تُعد استشارة مالية أو ضريبية متخصصة.';
    fCtx.fillText(disclaimer, isEn ? MARGIN : PAGE_W - MARGIN, PAGE_H - 36);

    fCtx.textAlign = isEn ? 'right' : 'left';
    const pageLabel = isEn
      ? `Page ${idx + 1} of ${totalPages}`
      : `صفحة ${idx + 1} من ${totalPages}`;
    fCtx.fillText(pageLabel, isEn ? PAGE_W - MARGIN : MARGIN, PAGE_H - 36);
  });

  // Assemble PDF with jsPDF (A4 portrait in mm: 210 x 297)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pages.forEach((canvas, idx) => {
    if (idx > 0) pdf.addPage();
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
  });

  const dateSlug = new Date().toISOString().slice(0, 10);
  const fileName =
    snapshots.length === 1
      ? `report-${snapshots[0].id}-${dateSlug}.pdf`
      : `store-tools-report-${dateSlug}.pdf`;

  try {
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  } catch {
    pdf.save(fileName);
  }

  return true;
}
