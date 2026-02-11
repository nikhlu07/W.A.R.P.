# WARP // Visual Identity System 1.0

**Theme:** Clinical Acceleration  
**Vibe:** High-frequency trading meets Mirror's Edge  
**Aesthetic:** Bright Brutalism

---

## 1. The Philosophy: "Zero-Radius"

The core rule of WARP is **Speed**. Speed has no friction. Friction comes from curves. Therefore, **WARP has no curves.**

### Core Principles

- **Border-Radius:** `0px` (Strict rule)
- **Angles:** 45° and 90° only
- **Aesthetic:** Laboratory clean, data-dense, sharp

---

## 2. Color Palette: "Hazard on White"

Neon yellow is hard to read on white. We solve this by using **Black as the structure** and **Yellow as the energy**, all sitting on a blinding White canvas.

| Role | Color Name | Hex Code | Usage |
|------|------------|----------|-------|
| **Canvas** | Flash White | `#FFFFFF` | The background. Pure, blinding white. |
| **Ink** | Vantablack | `#050505` | Primary text, borders, and structural lines. High contrast. |
| **Energy** | Volt Yellow | `#D9FF00` | The core brand color. Used for button backgrounds, highlights, and active states. |
| **Data** | Chrome Grey | `#E5E5E5` | Subtle grids, dividers, and inactive elements. |
| **Alert** | Signal Red | `#FF2A00` | Errors and "Stop" states (rare usage). |

### 🎨 The "Wasp" Rule

Never put Volt Yellow text on White. It is invisible.

**Correct Combinations:**
- ✅ Black Text on Volt Yellow Background
- ✅ Volt Yellow Icon on Black Background
- ✅ Black Text on White Background

**Incorrect Combinations:**
- ❌ Volt Yellow Text on White Background

---

## 3. Typography: "Machine Readable"

We mix a wide, aggressive header font with a technical monospace font for data.

### Headline Font: **Unbounded** (Google Fonts) or **Druk Wide**

- **Style:** 800 (Extra Bold), Uppercase
- **Usage:** "PAYMENT REQUIRED", "402 ERROR", "WARP PROTOCOL"
- **Effect:** Feels like a warning label on shipping container

### Body/Data Font: **JetBrains Mono** or **Space Mono**

- **Style:** 400 (Regular)
- **Usage:** All paragraph text, buttons, and code snippets
- **Effect:** Reinforces that this is a developer tool

---

## 4. UI Components (The "Constructed" Look)

### A. Buttons (The "Hard Press")

Do not use standard shadows. Use **Hard Shadows** (solid offset blocks) to make elements feel physical and mechanical.

#### Primary Button

- **Background:** `#D9FF00` (Volt Yellow)
- **Text:** `#050505` (Black), Uppercase, Bold
- **Border:** `2px Solid #050505`
- **Shadow:** `4px` offset (Solid Black), No Blur
- **Interaction:** When clicked, the button moves *down* 4px to cover the shadow

#### Secondary Button

- **Background:** `Transparent`
- **Text:** `#050505`
- **Border:** `1px Solid #050505`
- **Hover:** Background turns `#050505`, Text turns `#D9FF00`

### B. Cards & Containers (The "Data Plate")

Cards should look like technical specifications or tickets.

- **Background:** White
- **Border:** `1px Solid #E5E5E5` (Light Grey)
- **The "Cut":** The top-right corner of every card is "clipped" at a 45-degree angle (using CSS `clip-path` or a pseudo-element)
- **Header Strip:** A thin `#D9FF00` strip at the top of active cards

### C. The "402" Input Field

Since this is a payment protocol, the input field is the hero.

#### State: Default

- Thick Black Border (`2px`)
- Placeholder text: `ENTER_STX_ADDRESS...` (Monospace)

#### State: Payment Required (The Design Hook)

- The entire input background flashes `#D9FF00`
- Text becomes **Bold**
- A "Lock" icon appears on the right

---

## 5. Visual Motifs

### 1. The "Scanline" Grid

- Use a very faint background pattern of `1px` dots or a grid on the white background
- **Color:** `#F0F0F0`
- **Why:** It prevents the white from feeling "empty" and makes it feel like "graph paper" or a blueprint

### 2. The "Barcode" Lines

- Use decorative vertical bars of varying widths to separate sections
- **Example:** `▮ ▮▮ ▯ ▮` (Black bars of different thickness)
- **Usage:** Dividers between sections instead of horizontal lines

### 3. "Glitch" Decor

- Occasionally, offset a headline by 2px to the left or right to create a "misalignment" effect, symbolizing the "WARP" speed

---

## 6. CSS Implementation Guide

### CSS Variables

```css
:root {
  --warp-white: #FFFFFF;
  --warp-black: #050505;
  --warp-yellow: #D9FF00;
  --warp-grey: #E5E5E5;
  --warp-red: #FF2A00;
}
```

### Body Styles

```css
body {
  background-color: var(--warp-white);
  color: var(--warp-black);
  font-family: 'JetBrains Mono', monospace;
  background-image: radial-gradient(var(--warp-grey) 1px, transparent 1px);
  background-size: 20px 20px; /* The Technical Grid */
}
```

### The Aggressive Button

```css
.btn-warp {
  background: var(--warp-yellow);
  color: var(--warp-black);
  border: 2px solid var(--warp-black);
  box-shadow: 6px 6px 0px var(--warp-black); /* Hard Shadow */
  font-weight: 800;
  text-transform: uppercase;
  transition: all 0.1s ease;
  cursor: pointer;
}

.btn-warp:active {
  transform: translate(6px, 6px);
  box-shadow: 0px 0px 0px var(--warp-black);
}
```

### The Clipped Card

```css
.card-warp {
  background: white;
  border: 1px solid var(--warp-black);
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% calc(100% - 20px), 
    calc(100% - 20px) 100%, 
    0 100%
  ); /* The 45-degree cut on bottom right */
  padding: 2rem;
}
```

### The Headline

```css
h1 {
  font-family: 'Unbounded', sans-serif;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
```

---

## Summary of the Aesthetic

Imagine a **shipping label** on a nuclear device. It is white, has sharp black text, bold barcodes, and a bright yellow "Hazard" sticker.

**That is WARP.**
