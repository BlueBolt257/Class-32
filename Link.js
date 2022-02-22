class Link{
    constructor(body1, body2){
        var lastLink = body1.body.bodies.length - 2
        this.link = Matter.Constraint.create({
            bodyA: body1.body.bodies[lastLink], 
            pointA: {x:0, y:0},
            bodyB: body2, 
            pointB :{x:0, y:0},
            length: -10,
            stiffness: 0.01
        })
        World.add(engine.world, this.link)
    }

    detach(){
        World.remove(engine.world, this.link)
    }
}








