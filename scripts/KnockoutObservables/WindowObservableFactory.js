var KnockoutObservables;
(function (KnockoutObservables) {
    var WindowObservableFactory = (function () {
        function WindowObservableFactory() {
        }
        WindowObservableFactory.prototype.isBreakpoint = function (alias) {
            return $('.device-' + alias).is(':visible');
        };

        WindowObservableFactory.prototype.createObservable = function (alias) {
            var _this = this;
            var $window = $(window);
            var observable = ko.observable({
                alias: alias,
                width: $(window).width(),
                height: $(window).height(),
                isBreakpoint: this.isBreakpoint(BootstrapAlias[alias].toString())
            });

            $window.resize(function () {
                observable({
                    alias: alias,
                    width: $window.width(),
                    height: $window.height(),
                    isBreakpoint: _this.isBreakpoint(BootstrapAlias[alias].toString())
                });
            });
            return observable;
        };

        WindowObservableFactory.CreateObservableFromString = function (alias) {
            var factory = new WindowObservableFactory();
            return factory.createObservable(BootstrapAlias[alias]);
        };
        return WindowObservableFactory;
    })();
    KnockoutObservables.WindowObservableFactory = WindowObservableFactory;

    var BootstrapAlias;
    (function (BootstrapAlias) {
        BootstrapAlias[BootstrapAlias["xs"] = 0] = "xs";
        BootstrapAlias[BootstrapAlias["sm"] = 1] = "sm";
        BootstrapAlias[BootstrapAlias["md"] = 2] = "md";
        BootstrapAlias[BootstrapAlias["lg"] = 3] = "lg";
    })(BootstrapAlias || (BootstrapAlias = {}));
})(KnockoutObservables || (KnockoutObservables = {}));
