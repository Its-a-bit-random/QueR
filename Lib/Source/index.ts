import { RunService } from "@rbxts/services";

/**
 * A QueR acts like a queue for your tasks. It stores
 * all the tasks you give it and then act upon them every
 * so often. This can help you batch operations like
 * invoking remote functions/events.
 */
export default class QueR<T extends defined> {
	private m_FlushInterval;
	private m_Connection;
	private m_Handler;

	private m_RunningTime = 0;
	private m_Tasks = new Array<T>();
	private m_Destroyed = false;

	/**
	 * Destroy the QueR
	 * This forces a final flush as well as disconnecting the
	 * internal heartbeat connection. This also prevents any
	 * future tasks from being added
	 */
	public Destroy() {
		this.m_Connection.Disconnect();
		this.Flush();
		this.m_Destroyed = true;
	}

	/**
	 * Adds an item to be handled on the next flush.
	 * @param {T} item - The item to add
	 */
	public Add(item: T) {
		this.m_Tasks.push(item);
	}

	private Flush() {
		this.m_Handler(this.m_Tasks);
		this.m_Tasks = new Array<T>();
	}

  /**
   * @param {number} flushInterval - How often the QueR should flush in seconds
   * @param {(data: Array<T>) => void} handler - Handler function called on each flush
   */
	constructor(flushInterval: number, handler: (data: Array<T>) => void) {
		this.m_FlushInterval = flushInterval;
		this.m_Handler = handler;

		this.m_Connection = RunService.Heartbeat.Connect((deltaTime) => {
			this.m_RunningTime += deltaTime;

			if (this.m_RunningTime >= this.m_FlushInterval) {
				this.m_RunningTime = 0;
				this.Flush();
			}
		});
	}
}
