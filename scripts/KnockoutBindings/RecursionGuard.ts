module KnockoutBindings
{
	//Used in knockout custom bindings to prevent a control firing an event which in turn updates an observable which recurses back to the control etc
	//This ensures that only one device (either the viewmodel or the control) can have prescedence over updating,
	//and the other will be silenced for the duration of the update.
	export class RecursionGuard
	{
		private isUpdating;
		public tryExecute(func: () => void): boolean
		{
			if (!this.isUpdating)
			{
				this.isUpdating = true;
				func();
				this.isUpdating = false;
				return true;
			}
			return false;
		}
	}
}