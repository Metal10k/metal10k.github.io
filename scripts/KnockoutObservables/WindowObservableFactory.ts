module KnockoutObservables
{
	export class WindowObservableFactory
	{
		private isBreakpoint(alias): boolean
		{
			return $('.device-' + alias).is(':visible');
		}

		public createObservable(alias: BootstrapAlias): KnockoutObservable<IWindowState>
		{
			var $window = $(window);
			var observable = ko.observable<IWindowState>({
				alias: alias,
				width: $(window).width(),
				height: $(window).height(),
				isBreakpoint: this.isBreakpoint(BootstrapAlias[alias].toString())
			});

			$window.resize(() =>
			{
				observable({
					alias: alias,
					width: $window.width(),
					height: $window.height(),
					isBreakpoint: this.isBreakpoint(BootstrapAlias[alias].toString())
				});
			});
			return observable;
		}

		public static CreateObservableFromString(alias: string)
		{
			var factory = new WindowObservableFactory();
			return factory.createObservable(BootstrapAlias[alias]);
		}
	}

	interface IWindowState
	{
		alias: BootstrapAlias;
		width: number;
		height: number;
		isBreakpoint: boolean;
	}

	enum BootstrapAlias
	{
		xs,
		sm,
		md,
		lg
	}
}