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
This is a temporary function for now and **MIGHT be removed in the future**
:::

Forces the QueR to flush and disconnect the internal Heartbeat connection. This also prevents new items being added to the QueR
