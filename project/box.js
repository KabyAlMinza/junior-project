

// 
let ball2 = Matter.Bodies.circle(innerWidth - 600, 3*innerHeight/4,20);
let sling1 = Matter.Constraint.create({ 
      pointA: { x: innerWidth - 600, y: 3*innerHeight/4 }, 
      bodyB: ball2, 
      stiffness: 0.05
  });
  let firing2 = false;
  Matter.Events.on(mouseConstraint,'enddrag', function(e1) {
    if(e1.body === ball2) firing2 = true;
  });

Matter.Events.on(engine,'afterUpdate', function() {
  if (firing2 && Math.abs(ball2.position.x-(innerWidth - 600)) < 20 && Math.abs(ball2.position.y-3*innerHeight/4 ) < 20) {
      ball2 = Matter.Bodies.circle(innerWidth - 600, 3*innerHeight/4 , 20);
      Matter.World.add(engine.world, ball2);
      sling11.bodyB = ball2;
      firing2 = false;
  }
});
// 
