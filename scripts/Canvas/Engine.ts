module Engine
{
	export class World implements IDrawable
	{
		worldObjects: IDrawable[] = [];

		constructor()
		{

		}

		addObject(object: IDrawable)
		{
			this.worldObjects.push(object);
		}

		draw(context: CanvasRenderingContext2D, camera : Camera)
		{
			for (var obj in this.worldObjects)
			{
				this.worldObjects[obj].draw(context, camera);
			}
		}
	}

	export class Camera
	{
		position: Vector2D;
		canvasSize: Vector2D;
		scale: number;

		constructor(scale: number, position?:Vector2D, canvasSize? : Vector2D)
		{
			this.scale = scale;
			this.position = new Vector2D(0, 0);
			this.canvasSize = new Vector2D(256, 256);
		}

		private getTopLeft()
		{
			return this.position.SubtractVector(this.canvasSize.DivideBy(2));
		}

		getRelativePosition(absolutePosition: Vector2D) : Vector2D
		{
			var tl = this.getTopLeft();
			return new Vector2D(
				(absolutePosition.x - tl.x) * this.canvasSize.x,
				(absolutePosition.y - tl.y) * this.canvasSize.x);
		}

		scaleToPx(num: number): number
		{
			return num * this.scale;
		}
	}

	export interface IDrawable
	{
		draw(context: CanvasRenderingContext2D, camera: Camera);
	}

	export class Vector2D
	{
		x: number;
		y: number;

		constructor(x: number, y: number)
		{
			this.x = x;
			this.y = y;
		}

		Add(val : number)
		{
			return new Vector2D(this.x + val, this.y + val);
		}

		AddVector(vector: Vector2D)
		{
			return new Vector2D(this.x + vector.x, this.y + vector.y);
		}

		Subtract(val : number)
		{
			return new Vector2D(this.x - val, this.y - val);
		}

		SubtractVector(vector: Vector2D)
		{
			return new Vector2D(this.x - vector.x, this.y - vector.y);
		}

		Multiply(val : number)
		{
			return new Vector2D(this.x * val, this.y * val);
		}

		MultiplyByVector(vector: Vector2D)
		{
			return new Vector2D(this.x * vector.x, this.y * vector.y);
		}

		DivideBy(val: number)
		{
			return new Vector2D(this.x / val, this.y / val);
		}

		DivideByVector(vector: Vector2D)
		{
			return new Vector2D(this.x / vector.x, this.y / vector.y);
		}
	}

	export class SimpleObj implements IDrawable
	{
		position: Vector2D;
		velocity: Vector2D;
		acceleration: Vector2D;

		constructor(position: Vector2D, velocity?: Vector2D, acceleration?: Vector2D)
		{
			this.position = position;
			this.velocity = velocity || new Vector2D(0,0);
			this.acceleration = acceleration || new Vector2D(0, 0);
		}

		draw(context: CanvasRenderingContext2D, camera : Camera)
		{

		}
	}

	export class Rect extends SimpleObj
	{
		draw(context: CanvasRenderingContext2D, camera: Camera)
		{
			var relativePosition = camera.getRelativePosition(this.position);
			context.fillRect(relativePosition.x, relativePosition.y, 5, 5);
		}
	}
}