/**
 * (description)
 * 
 * @export
 * @interface Subscriber
 */
export interface Subscriber {
	/**
	 * (description)
	 * 
	 * @param {*} newState (description)
	 */
	onStateChanged(newState: any): void
}