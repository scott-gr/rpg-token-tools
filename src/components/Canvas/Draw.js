export function draw(ctx, frameCount) {
  // ─── LEAVE THIS FUNCTION TO RESIZING THE CANVAS FOR RETINA DISPLAYS ─────────────
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  // ─── DRAW FUNCTIONS HERE ─ -V ───────────────────────────────────────────────────────
  //

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);
  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
  // ────────────────────────────────────────────────────────────────────────────────
}
