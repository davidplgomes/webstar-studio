import React, { useEffect, useRef, useCallback } from 'react';

// ── Helpers ──────────────────────────────────────────────
const LIME = { r: 207, g: 255, b: 40 };
const rgba = (r: number, g: number, b: number, a: number) =>
    `rgba(${r},${g},${b},${a})`;
const limeA = (a: number) => rgba(LIME.r, LIME.g, LIME.b, a);

interface DataBar {
    xRatio: number;   // 0-1  position relative to width
    yRatio: number;   // 0-1  position relative to height
    wRatio: number;   // 0-1  width relative to width
    phase: number;    // animation phase offset
    speed: number;    // pulse speed
    maxAlpha: number; // peak brightness
}

interface Node {
    xRatio: number;
    yRatio: number;
    radius: number;
    phase: number;
    speed: number;
}

// ── Component ────────────────────────────────────────────
const TechnicalBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    // Seed data once, not on every render
    const dataBarsRef = useRef<DataBar[]>([]);
    const nodesRef = useRef<Node[]>([]);
    const initedRef = useRef(false);

    const initSeedData = useCallback(() => {
        if (initedRef.current) return;
        initedRef.current = true;

        // Create data bars — spread across the central vertical region
        const bars: DataBar[] = [];
        for (let i = 0; i < 18; i++) {
            const side = i % 2 === 0 ? 1 : -1;
            bars.push({
                xRatio: 0.5 + side * (0.02 + Math.random() * 0.18),
                yRatio: 0.06 + (i / 18) * 0.88,
                wRatio: 0.02 + Math.random() * 0.08,
                phase: Math.random() * Math.PI * 2,
                speed: 0.3 + Math.random() * 0.5,
                maxAlpha: 0.15 + Math.random() * 0.45,
            });
        }
        dataBarsRef.current = bars;

        // Create circuit nodes — small dots along schematic lines
        const nodes: Node[] = [];
        for (let i = 0; i < 30; i++) {
            nodes.push({
                xRatio: 0.15 + Math.random() * 0.7,
                yRatio: 0.05 + Math.random() * 0.9,
                radius: 1 + Math.random() * 2,
                phase: Math.random() * Math.PI * 2,
                speed: 0.4 + Math.random() * 0.8,
            });
        }
        nodesRef.current = nodes;
    }, []);

    useEffect(() => {
        initSeedData();

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let w = 0;
        let h = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        // ── Draw functions ─────────────────────────────────
        const drawGrid = () => {
            const spacing = 80;
            ctx.strokeStyle = 'rgba(255,255,255,0.025)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let x = 0; x < w; x += spacing) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = 0; y < h; y += spacing) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();
        };

        const drawCentralAxis = () => {
            const cx = w / 2;
            // Main vertical spine
            ctx.strokeStyle = limeA(0.04);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx, 0);
            ctx.lineTo(cx, h);
            ctx.stroke();

            // Small tick marks along axis
            ctx.strokeStyle = limeA(0.06);
            ctx.lineWidth = 0.5;
            for (let y = 40; y < h; y += 80) {
                ctx.beginPath();
                ctx.moveTo(cx - 6, y);
                ctx.lineTo(cx + 6, y);
                ctx.stroke();
            }
        };

        const drawSchematicCurves = (time: number) => {
            const cx = w / 2;
            const cy = h / 2;

            // Lens-like arcs — symmetrical pairs that breathe subtly
            const breathe = Math.sin(time * 0.15) * 0.015 + 1;

            ctx.strokeStyle = limeA(0.06);
            ctx.lineWidth = 0.8;

            // Upper arc
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.35, cy - h * 0.1);
            ctx.quadraticCurveTo(cx, cy - h * 0.25 * breathe, cx + w * 0.35, cy - h * 0.1);
            ctx.stroke();

            // Lower arc (mirror)
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.35, cy + h * 0.1);
            ctx.quadraticCurveTo(cx, cy + h * 0.25 * breathe, cx + w * 0.35, cy + h * 0.1);
            ctx.stroke();

            // Wider outer arcs
            ctx.strokeStyle = limeA(0.03);
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.45, cy - h * 0.02);
            ctx.quadraticCurveTo(cx, cy - h * 0.35 * breathe, cx + w * 0.45, cy - h * 0.02);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cx - w * 0.45, cy + h * 0.02);
            ctx.quadraticCurveTo(cx, cy + h * 0.35 * breathe, cx + w * 0.45, cy + h * 0.02);
            ctx.stroke();

            // Diagonal braces — like a technical diagram
            ctx.strokeStyle = limeA(0.025);
            ctx.lineWidth = 0.5;
            ctx.setLineDash([4, 8]);
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.3, 0);
            ctx.lineTo(cx, cy);
            ctx.lineTo(cx + w * 0.3, h);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cx + w * 0.3, 0);
            ctx.lineTo(cx, cy);
            ctx.lineTo(cx - w * 0.3, h);
            ctx.stroke();
            ctx.setLineDash([]);
        };

        const drawDataBars = (time: number) => {
            const bars = dataBarsRef.current;
            for (const bar of bars) {
                const pulse = (Math.sin(time * bar.speed + bar.phase) + 1) / 2;
                const alpha = 0.03 + pulse * bar.maxAlpha;

                const x = bar.xRatio * w;
                const y = bar.yRatio * h;
                const bw = bar.wRatio * w;

                // Glow layer
                ctx.shadowColor = limeA(0.4);
                ctx.shadowBlur = 12 * pulse;
                ctx.fillStyle = limeA(alpha);
                ctx.fillRect(x - bw / 2, y - 1, bw, 2);
                ctx.shadowBlur = 0;
            }
        };

        const drawNodes = (time: number) => {
            const nodes = nodesRef.current;
            for (const node of nodes) {
                const pulse = (Math.sin(time * node.speed + node.phase) + 1) / 2;
                const alpha = 0.05 + pulse * 0.25;

                const x = node.xRatio * w;
                const y = node.yRatio * h;

                // Outer glow
                ctx.beginPath();
                ctx.arc(x, y, node.radius + 3 * pulse, 0, Math.PI * 2);
                ctx.fillStyle = limeA(alpha * 0.3);
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(x, y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = limeA(alpha);
                ctx.fill();
            }
        };

        const drawVignette = () => {
            const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.9);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.6, 'rgba(0,0,0,0.3)');
            grad.addColorStop(1, 'rgba(0,0,0,0.85)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        };

        // ── Main loop ──────────────────────────────────────
        const draw = (time: number) => {
            const t = time * 0.001; // seconds

            // Clear to pure black
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            drawGrid();
            drawCentralAxis();
            drawSchematicCurves(t);
            drawDataBars(t);
            drawNodes(t);
            drawVignette();

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [initSeedData]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{ backgroundColor: '#000000' }}
        />
    );
};

export default TechnicalBackground;
