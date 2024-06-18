addEventListener("click", (event) => {
  const playerPosition = {
    x: frontEndPlayers[socket.id].x,
    y: frontEndPlayers[socket.id].y,
  };

  const angle = Math.atan2(
    event.clientY* window.devicePixelRatio - playerPosition.y, //canvas.height / 2,
    event.clientX * window.devicePixelRatio - playerPosition.x //canvas.width / 2,
  );

  // const velocity = {
  //   x: Math.cos(angle) * 5,
  //   y: Math.sin(angle) * 5,
  // };

  //sending to backend
  socket.emit("shoot", {
    x: playerPosition.x,
    y: playerPosition.y,
    angle
  });

  // frontEndProjectTiles.push(
  //   new Projectile({
  //     x: playerPosition.x, //canvas.width / 2,
  //     y: playerPosition.y, //canvas.height / 2,
  //     radius: 5,
  //     color: "white",
  //     velocity,
  //   })
  // );

  console.log(frontEndProjectTiles);
});
