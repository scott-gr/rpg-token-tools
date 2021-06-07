export function draw(ctx, frameCount) {
  // ─── LEAVE THIS FUNCTION TO RESIZING THE CANVAS FOR RETINA DISPLAYS ─────────────
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  // ─── DRAW FUNCTIONS HERE ─ -V ───────────────────────────────────────────────────────
  //
  ctx.arc(150, 150, 140, 0,360)
  ctx.stroke()
  // ────────────────────────────────────────────────────────────────────────────────
}
