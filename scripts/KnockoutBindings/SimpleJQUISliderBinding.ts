/// <reference path="RecursionGuard.ts" />
/// <reference path="KnockoutStateApiWrapper.ts" />

module KnockoutBindings
{
	export class SimpleJqueryUISliderBinding implements KnockoutBindingHandler
	{
		private stateApi: KnockoutStateApiWrapper<SimpleJqueryUiSliderState>;

		constructor(stateApi?: KnockoutStateApiWrapper<SimpleJqueryUiSliderState>)
		{
			this.stateApi = stateApi || new KnockoutStateApiWrapper<SimpleJqueryUiSliderState>();
		}

		init = (element: Element, valueAccessor, allBindingsAccessor) =>
		{
			var state = this.stateApi.Get(element) || new SimpleJqueryUiSliderState();
			var viewModel = <SimpleJqueryUiSliderViewModel> ko.utils.unwrapObservable(valueAccessor());

			$(element).slider(viewModel.options || {});

			ko.utils.registerEventHandler(element, "slidechange", function (event, ui)
			{
				state.recursionGuard.tryExecute(() =>
				{
					var observable = viewModel.value;
					observable(ui.value);
				});

			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function ()
			{
				state.recursionGuard.tryExecute(() =>
				{
					$(element).slider("destroy");
				});
			});
			ko.utils.registerEventHandler(element, "slide", function (event, ui)
			{
				state.recursionGuard.tryExecute(() =>
				{
					var observable = viewModel.value;
					observable(ui.value);
				});
			});

			this.stateApi.Set(element, state);
		};

		update = (element: Element, valueAccessor, allBindings) =>
		{
			var state = this.stateApi.Get(element);
			state.recursionGuard.tryExecute(() =>
			{
				var viewModel = ko.toJS(valueAccessor());	//recursive unwrap

				var value = <number>ko.unwrap(viewModel.value);
				if (isNaN(value)) value = 0;

				if (state.prevMin != viewModel.options.min)
				{
					$(element).slider("option", "min", viewModel.options.min);
					state.prevMin = viewModel.options.min;
				}
				if (state.prevMax != viewModel.options.max)
				{
					$(element).slider("option", "max", viewModel.options.max);
					state.prevMax = viewModel.options.max;
				}
				//Order is important. This must come last.
				if (state.prevValue != value)
				{
					$(element).slider("value", value);
					state.prevValue = value;
				}
			});
		};
	}
	}

	class SimpleJqueryUiSliderViewModel
	{
		options: JQueryUI.SliderOptions;
		value: any;
	}

	class SimpleJqueryUiSliderState
	{
		prevValue: number;
		prevMax: number;
		prevMin: number;
		isUpdating: boolean;
	}
}

ko.bindingHandlers["simpleSlider"] = new KnockoutBindings.SimpleJqueryUISliderBinding();