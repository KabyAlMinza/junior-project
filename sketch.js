let engine = Matter.Engine.create();

let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: innerWidth,
    height: innerHeight,
    wireframes: false
  }
});

//parms: x,y,width,height,options
let ground = Matter.Bodies.rectangle(innerWidth / 2, innerHeight, innerWidth, 20, { isStatic: true });
let platform1 = Matter.Bodies.rectangle(innerWidth / 5, innerHeight / 2, 300, 20, { isStatic: true });
let stack1 = Matter.Composites.stack(innerWidth / 6, innerHeight / 4, 4, 4, 0, 0, function (x, y) {
  return Matter.Bodies.polygon(x, y, 8, 30);
});
let platform2 = Matter.Bodies.rectangle(4 * innerWidth / 5, innerHeight / 2, 300, 20, { isStatic: true });
let stack2 = Matter.Composites.stack(4.5 * innerWidth / 6, innerHeight / 4, 4, 4, 0, 0, function (x, y) {
  return Matter.Bodies.polygon(x, y, 8, 30);
});

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false }
  }
});
render.mouse = mouse;

let ball1 = Matter.Bodies.circle(600, 3 * innerHeight / 4, 20);
let sling = Matter.Constraint.create({
  pointA: { x: 600, y: 3 * innerHeight / 4 },
  bodyB: ball1,
  stiffness: 0.05
});
let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
  if (e.body === ball1) firing = true;
});

Matter.Events.on(engine, 'afterUpdate', function () {
  if (firing && Math.abs(ball1.position.x - 600) < 20 && Math.abs(ball1.position.y - 3 * innerHeight / 4) < 20) {
    ball1 = Matter.Bodies.circle(600, 3 * innerHeight / 4, 20);
    Matter.World.add(engine.world, ball1);
    sling.bodyB = ball1;
    firing = false;
  }
});


// 

let ball2 = Matter.Bodies.circle(innerWidth - 600, 3 * innerHeight / 4, 20);
let sling1 = Matter.Constraint.create({
  pointA: { x: innerWidth - 600, y: 3 * innerHeight / 4 },
  bodyB: ball2,
  stiffness: 0.05
});
let firing2 = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e1) {
  if (e1.body === ball2) firing2 = true;
});

Matter.Events.on(engine, 'afterUpdate', function () {
  if (firing2 && Math.abs(ball2.position.x - (innerWidth - 600)) < 20 && Math.abs(ball2.position.y - 3 * innerHeight / 4) < 20) {
    ball2 = Matter.Bodies.circle(innerWidth - 600, 3 * innerHeight / 4, 20);
    Matter.World.add(engine.world, ball2);
    sling1.bodyB = ball2;
    firing2 = false;
  }
});
// 
// 

engine.world.gravity.y = 0.2;

;

Matter.World.add(engine.world, [platform1, platform2, ground, mouseConstraint, stack1, stack2, ball1, ball2, sling1, sling]);
Matter.Engine.run(engine);
Matter.Render.run(render);