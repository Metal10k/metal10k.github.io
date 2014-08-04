var Test;
(function (Test) {
    var Bootstrapper = (function () {
        function Bootstrapper() {
            var canv = document.createElement("canvas");
            canv.width = 256;
            canv.height = 256;
            document.body.appendChild(canv);
            this.context = canv.getContext("2d");

            this.world = new Engine.World();

            var rect = new Engine.Rect(new Engine.Vector2D(10, 10), new Engine.Vector2D(0, 0.1));
            this.world.addObject(rect);
            this.camera = new Engine.Camera(10);
        }
        Bootstrapper.prototype.run = function () {
            var _this = this;
            setInterval(function () {
                _this.tick();
            }, 1000 / 15);
        };

        Bootstrapper.prototype.tick = function () {
            this.context.clearRect(0, 0, 100, 100);
            this.world.draw(this.context, this.camera);
            this.world.update();
        };
        return Bootstrapper;
    })();

    $(function () {
        var bootstrapper = new Bootstrapper();
        bootstrapper.run();
    });
})(Test || (Test = {}));
