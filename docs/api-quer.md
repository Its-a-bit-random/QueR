# API - QueR

## QueR
```ts
new QueR<T>(interval: number, handler: (data: Array<T>) => void) => QueR
```

Create a new QueR instance, QueR class is generic and should be typed. The handler function is called with an array of all the added tasks from the last flush.

| **Paramater**    | **Type**     | **Description**                          |
|------------------|--------------|------------------------------------------|
| `interval`    | `number`     | Time in seconds between each flush        |
| `handler` | `(data: Array<T>) => void` | The handler function that gets called each time the QueR is flushed. |

:::danger
You **MUST** call destory on QueR object when your done with them. Otherwise a **memory leak will be caused!**
:::

## Add
```ts
.Add(item: T) => void
```

Add a new item to the QueR.

| **Paramater**    | **Type**     | **Description**                          |
|------------------|--------------|------------------------------------------|
| `item`    | `T`     | The item to add (must be same type as the QueR was typed ad)        |

## Destroy
```ts
.Destroy()
```

:::warning
This method might be removed in the future. However for now the Destroy method must be called when your done with a QueR object.
:::

Forces the QueR to flush and disconnect the internal Heartbeat connection. This also prevents new items being added to the QueR
