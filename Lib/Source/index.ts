import { RunService } from "@rbxts/services";

export default class QueR<T extends defined> {
	private m_FlushInterval;
	private m_Connection;
	private m_Handler;

	private m_RunningTime = 0;
	private m_Tasks = new Array<T>();
	private m_Destroyed = false;

	public Destroy() {
		this.m_Connection.Disconnect();
		this.Flush();
		this.m_Destroyed = true;
	}

	public Add(item: T) {
		this.m_Tasks.push(item);
	}

	private Flush() {
		this.m_Handler(this.m_Tasks);
		this.m_Tasks = new Array<T>();
	}

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
