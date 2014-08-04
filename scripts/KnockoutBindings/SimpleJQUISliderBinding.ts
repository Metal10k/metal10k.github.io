module KnockoutBindings
{
	export class SimpleJqueryUISliderBinding implements KnockoutBindingHandler
	{
		init = (element, valueAccessor, allBindingsAccessor) =>
		{
			var state = <SimpleJqueryUiSliderState>ko.utils.domData.get(element, "state") || new SimpleJqueryUiSliderState();
			var viewModel = <SimpleJqueryUiSliderViewModel> ko.utils.unwrapObservable(valueAccessor());

			$(element).slider(viewModel.options || {});

			ko.utils.registerEventHandler(element, "slidechange", function (event, ui)
			{
				var observable = viewModel.value;
				observable(ui.value);
			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function ()
			{
				$(element).slider("destroy");
			});
			ko.utils.registerEventHandler(element, "slide", function (event, ui)
			{
				var observable = viewModel.value;
				observable(ui.value);
			});

			ko.utils.domData.set(element, "state", state);
		};

		update = (element, valueAccessor, allBindings) =>
		{
			var state = <SimpleJqueryUiSliderState>ko.utils.domData.get(element, "state");
			var viewModel = ko.toJS(valueAccessor());	//recursive unwrap

			var value = <number>ko.unwrap(viewModel.value);
			if (isNaN(value)) value = 0;

			if (state.prevValue != value)
			{
				$(element).slider("value", value);
				state.prevValue = value;
			}
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

			ko.utils.domData.set(element, "state", state);
		};
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