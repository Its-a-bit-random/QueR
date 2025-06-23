# Installing

This page goes over how to install QueR into you project.

Firstly you need to add the package to your dependencies.
```bash
npm i @rbxts-its-a-bit-random/quer
```

Next you need to add the `rbxts-its-a-bit-random` org to your rojo project if you havent already:

```json [default.project.json]
"ReplicatedStorage": {
    "$className": "ReplicatedStorage",
	"rbxts_include": {
		"$path": "include",
		"node_modules": {
			"$className": "Folder",
			"@rbxts": {
				"$path": "node_modules/@rbxts"
			},
            "@rbxts-its-a-bit-random": { // [!code focus]
                "$path": "node_modules/@rbxts-its-a-bit-random" // [!code focus]
            } // [!code focus]
		}
	},
	"TS": {
		"$path": "out/shared"
	}
}
```

Then you can use QueR in your project however you wish.
