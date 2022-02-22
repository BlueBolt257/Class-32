class Rope{
    //nlink = number of links, pointA - point of connection
    constructor(nlink, pointA)
    {
        this.nlink = nlink
        const group = Matter.Body.nextGroup(true);
        const rects = Matter.Composites.stack(100, 100, this.nlink, 1, 5, 5, function(x, y) {
            return Matter.Bodies.rectangle(x, y, 30, 5, { collisionFilter: { group: group } });
        });
            
        this.pointA = pointA;
        this.body = Matter.Composites.chain(rects, 0.1, 0, -0.6, 0, {stiffness: 0.1, length: 0.1, render: {type: 'line'}});
            
        World.add(engine.world, this.body);
        
            
        Matter.Composite.add(rects, Matter.Constraint.create({
            pointA: this.pointA,
            bodyB: rects.bodies[0],
            pointB: {x: -25, y: 0},
            length:10,
            stiffness: 0.1
        }));
      
    }
    
    break()
    { 
      this.body = null;
    }
    
    display()
    {
      if(this.body!=null)
        {
          for (var i = 0; i < this.body.bodies.length-1; i++)
          {
              this.drawVertices(this.body.bodies[i].vertices);
             }
        }
    }
    
    drawVertices(vertices) 
    {
      beginShape();
      fill('yellow')
      noStroke();
      
      for (var i = 0; i < vertices.length; i++) 
      {
       vertex(vertices[i].x, vertices[i].y);
       }
      endShape(CLOSE);
   }


}








