# API - QueR

## QueR
```ts
new QueR<T>(interval: FlushType, handler: (data: Array<T>) => void) => QueR
```

Create a new QueR instance, QueR class is generic and should be typed. The handler function is called with an array of all the added tasks from the last flush.

| **Paramater**    | **Type**     | **Description**                          |
|------------------|--------------|------------------------------------------|
| `interval`    | `FlushType`     | Use the [.FlushType](#flushtype) static field to fill this        |
| `handler` | `(data: Array<T>) => void` | The handler function that gets called each time the QueR is flushed. |

## FlushType
#### Since `2.0.0`
```ts
.FlushType.X<T>(Y: T) => {Type: number, Value: number}
```
A static which describes each type of flushing you can use. The table below describes all FlushTypes, their behaviour and if you need to use .Destroy().

| **FlushType** | **Behaviour** | **Requires Destroy** |
|---------------|---------------|----------------------|
| `Seconds(x)`  | Flushes every x seconds.         | ✅ |
| `Frames(x)`   | Flushes every x frames.          | ✅ |
| `Deffered`    | Flush at the end of every frame  | ❌ |

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

:::info
Destroy is not always required. Make sure to check if your [FlushType](#flushtype) requires destroy
:::

Forces the QueR to flush and disconnect the internal Heartbeat connection. This also prevents new items being added to the QueR
