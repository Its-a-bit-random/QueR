<p align="center">
	<img width="150" height="150" src="https://raw.githubusercontent.com/Its-a-bit-random/Quer/main/Images/Icon.png" alt="Logo">
</p>

<h1 align="center"><b>Quer</b></h1>

<p align="center">
  Lightweight batching utility for Roblox-TS that queues tasks and processes them at fixed intervals for optimized execution.
  <br />
  <a href="https://www.npmjs.com/package/@rbxts-its-a-bit-random/quer"><strong>NPM package →</strong></a>
  |
  <a href="https://its-a-bit-random.github.io/QueR"><strong>Docs →</strong></a>
</p>



## Installation

Add to your `package.json`:
```bash
npm i @rbxts-its-a-bit-random/quer
```

Then add @rbxts-its-a-bit-random to your rojo project:
```json
"ReplicatedStorage": {
    "$className": "ReplicatedStorage",
	"rbxts_include": {
		"$path": "include",
		"node_modules": {
			"$className": "Folder",
			"@rbxts": {
				"$path": "node_modules/@rbxts"
			},
            "@rbxts-its-a-bit-random": {
                "$path": "node_modules/@rbxts-its-a-bit-random"
            }
		}
	},
	"TS": {
		"$path": "out/shared"
	}
}
```

## Basic exmaple

This example shows how to batch printing numbers. It prints the numbers every 3 seconds.
```ts
import QueR from "@rbxts-its-a-bit-random/QueR";

const queue = new QueR<number>(QueR.FlushType.Seconds(3), (numbers) => {
	numbers.map((num) => {
		print(num);
	});
});

while (true) {
	task.wait(0.1);
	queue.Add(math.random(1, 10));
}
```
