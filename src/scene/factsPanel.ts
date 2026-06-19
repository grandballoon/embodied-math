import type { FactGroup } from "../core/facts.ts";

/** A per-shape color picker the panel shows at the top of the sheet. */
export interface ColorControl {
  readonly color: number; // current effective color, 0xRRGGBB
  readonly onChange: (color: number) => void;
}

/** A per-shape lock toggle (size or position) the panel shows at the top of the sheet. */
export interface LockControl {
  readonly locked: boolean;
  readonly onToggle: (locked: boolean) => void;
}

/**
 * A per-shape opacity slider in the color selector. `alpha` is the body-opacity
 * multiplier (see shapeLayer); fires continuously while dragging, so callers
 * must NOT re-render the panel on change (that would kill the in-flight drag).
 */
export interface AlphaControl {
  readonly alpha: number;
  readonly min: number;
  readonly max: number;
  readonly onChange: (alpha: number) => void;
}

/**
 * A one-shot action button (e.g. "Double the square") shown under the header.
 * Generic — the panel knows nothing about what it does; the caller decides when
 * to supply one and what it means.
 */
export interface ActionControl {
  readonly label: string;
  readonly title?: string;
  /**
   * Optional numeric input rendered beside the button (e.g. a scalar for
   * "multiply"). When present, its current value is parsed and passed to
   * onClick; otherwise onClick is called with NaN (and can ignore it).
   */
  readonly input?: {
    readonly value: number;
    readonly step?: number;
    readonly title?: string;
  };
  readonly onClick: (inputValue: number) => void;
}

/** The controls (color, opacity, size + position locks, actions) shown in the fact-sheet header. */
export interface PanelControls {
  readonly color?: ColorControl;
  readonly alpha?: AlphaControl;
  readonly lock?: LockControl;
  readonly positionLock?: LockControl;
  /** Zero or more one-shot action buttons, stacked under the header. */
  readonly actions?: readonly ActionControl[];
}

/** Quick-pick palette (the shape hues + white); custom picker covers the rest. */
const PALETTE = [
  0xff6b8a, 0xff9f43, 0xffd166, 0x69db7c, 0x5ad1c2, 0x8aa9ff, 0xc77dff, 0xffffff,
];

const hex = (n: number): string => "#" + n.toString(16).padStart(6, "0");

/**
 * The on-screen fact sheet for the focused shape. Plain DOM rather than
 * canvas sprites: math text (π, ², √, ⁄, ⟨⟩) renders crisply for free, the
 * panel costs nothing from the WebGL budget, and it's screen-reader friendly.
 *
 * Renders whatever FactGroups it's given — it knows nothing about shapes,
 * only about the Fact schema, so future fact producers (equations, function
 * graphs) reuse it unchanged. Re-rendered on every driver update; the node
 * count is tiny, so rebuilding beats diffing.
 */
export class FactsPanel {
  private readonly root: HTMLElement;
  // Collapse state lives on the instance: render() rebuilds the DOM on every
  // driver update, so a class on the node alone wouldn't survive.
  private collapsed = false;

  constructor() {
    const el = document.getElementById("facts-panel");
    if (!el) throw new Error("Missing element #facts-panel");
    this.root = el;
  }

  render(groups: readonly FactGroup[] | null, controls?: PanelControls): void {
    if (!groups || groups.length === 0) {
      this.root.hidden = true;
      return;
    }
    this.root.hidden = false;
    this.root.classList.toggle("collapsed", this.collapsed);

    const body = document.createElement("div");
    body.className = "facts-body";
    const header = this.headerRow(controls);
    if (header) body.append(header);
    for (const a of controls?.actions ?? []) body.append(this.actionRow(a));
    for (const g of groups) body.append(...this.groupNodes(g));

    this.root.replaceChildren(this.titleBar(), body);
  }

  /** Top bar with a collapse chevron; folds the fact body away when clicked. */
  private titleBar(): HTMLElement {
    const bar = document.createElement("button");
    bar.type = "button";
    bar.className = "facts-titlebar";
    bar.setAttribute("aria-expanded", String(!this.collapsed));

    const title = document.createElement("span");
    title.textContent = "Facts";
    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▾";

    bar.append(title, chevron);
    bar.addEventListener("click", () => {
      this.collapsed = !this.collapsed;
      this.root.classList.toggle("collapsed", this.collapsed);
      bar.setAttribute("aria-expanded", String(!this.collapsed));
    });
    return bar;
  }

  /** Top controls row: the size-lock button (left) and color selector (right). */
  private headerRow(controls?: PanelControls): Node | null {
    if (
      !controls ||
      (!controls.color && !controls.lock && !controls.positionLock && !controls.alpha)
    )
      return null;
    const row = document.createElement("div");
    row.className = "sheet-header";

    const left = document.createElement("div");
    left.className = "lock-group";
    if (controls.lock) left.append(this.lockButton(controls.lock, "size"));
    if (controls.positionLock)
      left.append(this.lockButton(controls.positionLock, "position"));

    // The color selector stacks the swatch row over the opacity slider.
    const right = document.createElement("div");
    right.className = "color-group";
    if (controls.color) {
      const swatchRow = document.createElement("div");
      swatchRow.className = "swatch-row";
      const label = document.createElement("span");
      label.className = "color-label";
      label.textContent = "Color";
      swatchRow.append(label, this.swatches(controls.color));
      right.append(swatchRow);
    }
    if (controls.alpha) right.append(this.alphaRow(controls.alpha));

    row.append(left, right);
    return row;
  }

  /** The opacity (alpha) slider beneath the swatches. */
  private alphaRow(ac: AlphaControl): HTMLElement {
    const wrap = document.createElement("label");
    wrap.className = "alpha-control";
    wrap.title = "Shape opacity";

    const label = document.createElement("span");
    label.className = "alpha-label";
    label.textContent = "Opacity";

    const input = document.createElement("input");
    input.type = "range";
    input.min = String(ac.min);
    input.max = String(ac.max);
    input.step = "0.1";
    input.value = String(ac.alpha);

    const val = document.createElement("span");
    val.className = "alpha-val";
    val.textContent = ac.alpha.toFixed(1);

    // Update the readout locally and recolor the shape; do NOT trigger a panel
    // re-render (it would replace this slider mid-drag).
    input.addEventListener("input", () => {
      const v = parseFloat(input.value);
      val.textContent = v.toFixed(1);
      ac.onChange(v);
    });

    wrap.append(label, input, val);
    return wrap;
  }

  /** A full-width action button (e.g. "Double the square") under the header. */
  private actionRow(action: ActionControl): HTMLElement {
    const wrap = document.createElement("div");
    wrap.className = "action-row";
    let input: HTMLInputElement | null = null;
    if (action.input) {
      wrap.classList.add("has-input");
      input = document.createElement("input");
      input.type = "number";
      input.className = "action-input";
      input.value = String(action.input.value);
      if (action.input.step != null) input.step = String(action.input.step);
      if (action.input.title) input.title = action.input.title;
      wrap.append(input);
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "action-btn";
    btn.textContent = action.label;
    if (action.title) btn.title = action.title;
    btn.addEventListener("click", () =>
      action.onClick(input ? Number(input.value) : NaN),
    );
    wrap.append(btn);
    return wrap;
  }

  private lockButton(lock: LockControl, what: "size" | "position"): HTMLElement {
    const label = what === "size" ? "Size" : "Position";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lock-btn" + (lock.locked ? " locked" : "");
    btn.textContent = (lock.locked ? "🔒" : "🔓") + " " + label;
    btn.title = lock.locked ? `${label} locked — click to unlock` : `Lock ${what}`;
    btn.setAttribute("aria-pressed", String(lock.locked));
    btn.addEventListener("click", () => lock.onToggle(!lock.locked));
    return btn;
  }

  private swatches(cc: ColorControl): HTMLElement {
    const swatches = document.createElement("div");
    swatches.className = "swatches";

    let matchedPreset = false;
    for (const c of PALETTE) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "swatch";
      b.style.background = hex(c);
      b.title = hex(c);
      if (c === cc.color) {
        b.classList.add("active");
        matchedPreset = true;
      }
      b.addEventListener("click", () => cc.onChange(c));
      swatches.append(b);
    }

    // A rainbow swatch wrapping a hidden native color input — covers any color
    // outside the preset palette, and stays "active" when one is in use.
    const custom = document.createElement("label");
    custom.className = "swatch custom";
    if (!matchedPreset) custom.classList.add("active");
    custom.title = "Custom color";
    const input = document.createElement("input");
    input.type = "color";
    input.value = hex(cc.color);
    input.addEventListener("input", () =>
      cc.onChange(parseInt(input.value.slice(1), 16)),
    );
    custom.append(input);
    swatches.append(custom);

    return swatches;
  }

  private groupNodes(group: FactGroup): Node[] {
    const nodes: Node[] = [];
    const h = document.createElement("h3");
    h.textContent = group.title;
    nodes.push(h);

    for (const fact of group.facts) {
      const row = document.createElement("div");
      row.className = "fact";
      const label = document.createElement("span");
      label.className = "label";
      label.textContent = fact.label;
      const value = document.createElement("span");
      value.className = "value";
      value.textContent = fact.value;
      row.append(label, value);
      nodes.push(row);

      if (fact.formula || fact.detail) {
        const sub = document.createElement("div");
        sub.className = "sub";
        sub.textContent = [fact.formula, fact.detail]
          .filter(Boolean)
          .join("   •   ");
        nodes.push(sub);
      }
    }
    return nodes;
  }
}
