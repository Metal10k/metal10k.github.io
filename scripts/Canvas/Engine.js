var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Engine;
(function (Engine) {
    var World = (function () {
        function World() {
            this.worldObjects = [];
        }
        World.prototype.addObject = function (object) {
            this.worldObjects.push(object);
        };

        World.prototype.draw = function (context, camera) {
            for (var obj in this.worldObjects) {
                this.worldObjects[obj].draw(context, camera);
            }
        };
        return World;
    })();
    Engine.World = World;

    var Camera = (function () {
        function Camera(scale, position, canvasSize) {
            this.scale = scale;
            this.position = new Vector2D(0, 0);
            this.canvasSize = new Vector2D(256, 256);
        }
        Camera.prototype.getTopLeft = function () {
            return this.position.SubtractVector(this.canvasSize.DivideBy(2));
        };

        Camera.prototype.getRelativePosition = function (absolutePosition) {
            var tl = this.getTopLeft();
            return new Vector2D((absolutePosition.x - tl.x) * this.canvasSize.x, (absolutePosition.y - tl.y) * this.canvasSize.x);
        };

        Camera.prototype.scaleToPx = function (num) {
            return num * this.scale;
        };
        return Camera;
    })();
    Engine.Camera = Camera;

    var Vector2D = (function () {
        function Vector2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2D.prototype.Add = function (val) {
            return new Vector2D(this.x + val, this.y + val);
        };

        Vector2D.prototype.AddVector = function (vector) {
            return new Vector2D(this.x + vector.x, this.y + vector.y);
        };

        Vector2D.prototype.Subtract = function (val) {
            return new Vector2D(this.x - val, this.y - val);
        };

        Vector2D.prototype.SubtractVector = function (vector) {
            return new Vector2D(this.x - vector.x, this.y - vector.y);
        };

        Vector2D.prototype.Multiply = function (val) {
            return new Vector2D(this.x * val, this.y * val);
        };

        Vector2D.prototype.MultiplyByVector = function (vector) {
            return new Vector2D(this.x * vector.x, this.y * vector.y);
        };

        Vector2D.prototype.DivideBy = function (val) {
            return new Vector2D(this.x / val, this.y / val);
        };

        Vector2D.prototype.DivideByVector = function (vector) {
            return new Vector2D(this.x / vector.x, this.y / vector.y);
        };
        return Vector2D;
    })();
    Engine.Vector2D = Vector2D;

    var SimpleObj = (function () {
        function SimpleObj(position, velocity, acceleration) {
            this.position = position;
            this.velocity = velocity || new Vector2D(0, 0);
            this.acceleration = acceleration || new Vector2D(0, 0);
        }
        SimpleObj.prototype.draw = function (context, camera) {
        };
        return SimpleObj;
    })();
    Engine.SimpleObj = SimpleObj;

    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            _super.apply(this, arguments);
        }
        Rect.prototype.draw = function (context, camera) {
            var relativePosition = camera.getRelativePosition(this.position);
            context.fillRect(relativePosition.x, relativePosition.y, 5, 5);
        };
        return Rect;
    })(SimpleObj);
    Engine.Rect = Rect;
})(Engine || (Engine = {}));
