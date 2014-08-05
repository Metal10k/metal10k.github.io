module KnockoutBindings
{
	export class KnockoutStateApiWrapper<T>
	{
		private stateObjectKey: string;
		constructor(stateObjectKey?: string)
		{
			this.stateObjectKey = stateObjectKey || "state";
		}

		public Get(element : Element): T
		{
			return <T>ko.utils.domData.get(element, this.stateObjectKey);
		}

		public Set(element: Element, state: T)
		{
			ko.utils.domData.set(element, this.stateObjectKey, state); 
		}
	}
}