module Test
{
	class Bootstrapper
	{
		context: CanvasRenderingContext2D;
		world: Engine.World;
		camera: Engine.Camera;

		constructor()
		{
			var canv = document.createElement("canvas");
			canv.width = 256;
			canv.height = 256;
			document.body.appendChild(canv);
			this.context = canv.getContext("2d");

			this.world = new Engine.World();
			
			

			var rect = new Engine.Rect(new Engine.Vector2D(10, 10));
			this.world.addObject(rect);
			this.camera = new Engine.Camera(10);
		}

		run()
		{
			setInterval(() =>
			{
				this.tick();
			}, 1000 / 15);
		}

		tick()
		{
			this.context.clearRect(0, 0, 100, 100);
			this.world.draw(this.context, this.camera);
		}
	}

	$(function ()
	{
		var bootstrapper = new Bootstrapper();
		bootstrapper.run();
	});
}