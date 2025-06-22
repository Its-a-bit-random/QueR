import QueR from "@rbxts/QueR";
import { makeHello } from "shared/module";

print(makeHello("main.server.ts"));

const qeue = new QueR<number>(1, (numbers) => {
	numbers.map((num) => {
		print(num);
	});
});

while (true) {
	task.wait(0.1);
	qeue.Add(math.random(1, 10));
}
