import { RunService } from "@rbxts/services";

const enum FlushIntervalType {
	Seconds,
	Frames,
	Deffered,
}

interface FlushType {
	Type: FlushIntervalType;
	Value: number;
}

/**
 * A QueR acts like a queue for your tasks. It stores
 * all the tasks you give it and then act upon them every
 * so often. This can help you batch operations like
 * invoking remote functions/events.
 */
export default class QueR<T extends defined> {
	/**
	 * Has all the different types of flush intervals you can use
	 * Some require you to call .Destory() when done using the QueR.
	 * Make sure to check if you need to destory the QueR when done.
	 */
	public static FlushType = {
		/**
		 * Flush all tasks every {seconds} seconds. This flush interval REQUIRES
		 * you to manually call .Destory() when done with the QueR
		 */
		Seconds: (seconds: number) => ({ Type: FlushIntervalType.Seconds, Value: seconds }),

		/**
		 * Flush all tasks every {frames} frames. This flush interval REQUIRES
		 * you to manually call .Destory() when done with the QueR
		 */
		Frames: (frames: number) => ({ Type: FlushIntervalType.Frames, Value: frames }),

		/**
		 * Flush after every frame. Does NOT need .Destroy() to be called
		 */
		Deffered: () => ({ Type: FlushIntervalType.Deffered, Value: 0 }),
	};

	private m_FlushInterval;
	private m_Connection: RBXScriptConnection | undefined;
	private m_Handler;

	private m_RunningTime = 0;
	private m_Tasks = new Array<T>();
	private m_Destroyed = false;
	private m_Scheduled: thread | undefined;

	/**
	 * Destroy the QueR
	 * This forces a final flush as well as disconnecting the
	 * internal heartbeat connection. This also prevents any
	 * future tasks from being added
	 */
	public Destroy() {
		this.m_Connection?.Disconnect();
		this.Flush();
		this.m_Destroyed = true;
	}

	/**
	 * Adds an item to be handled on the next flush.
	 * @param {T} item - The item to add
	 */
	public Add(item: T) {
		this.m_Tasks.push(item);

		if (this.m_Scheduled === undefined) {
			this.m_Scheduled = task.defer(() => {
				this.Flush();
				this.m_Scheduled = undefined;
			});
		}
	}

	private Flush() {
		this.m_Handler(this.m_Tasks);
		this.m_Tasks = new Array<T>();
	}

	constructor(flushInterval: FlushType, handler: (data: Array<T>) => void) {
		this.m_FlushInterval = flushInterval;
		this.m_Handler = handler;

		if (flushInterval.Type === FlushIntervalType.Seconds) {
			this.m_Connection = RunService.Heartbeat.Connect((deltaTime) => {
				this.m_RunningTime += deltaTime;

				if (this.m_RunningTime >= this.m_FlushInterval.Value) {
					this.m_RunningTime = 0;
					this.Flush();
				}
			});
		} else if (flushInterval.Type === FlushIntervalType.Frames) {
			this.m_Connection = RunService.Heartbeat.Connect(() => {
				this.m_RunningTime += 1;

				if (this.m_RunningTime >= this.m_FlushInterval.Value) {
					this.m_RunningTime = 0;
					this.Flush();
				}
			});
		}
	}
}
