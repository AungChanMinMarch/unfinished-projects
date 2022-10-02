function motionTrail(noOfTrail, transparency, obj, r, color, abc) {
    for (let i = noOfTrail; i > 0; i--) {
        ctx.save();
        ctx.globalAlpha = 1 - transparency * i;
        abc(i, obj, r, color);
        ctx.restore();
    }
}
