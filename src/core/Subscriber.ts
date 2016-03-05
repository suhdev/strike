export interface Subscriber {
	onStateChanged(newState: any): void
}