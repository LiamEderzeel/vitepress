# Proposed changes

The following document demonstrates the proposed changes and the backwords compatiblity of the excisting behaviour.

## line-numbers

Line numbers are currently added by ` ```ts:line-numbers` this breaks the markdown sytax highlighting for some ediors for example neovim. this can be fixed by adding a space like so ` ```ts: line-numbers` this is still excepted as valid by the current implementation.

### code block current line numbers behaviour
````md
```ts:line-numbers [controllers/test.ts]
````

```ts :line-numbers [controllers/test.ts]
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

### code block with `:line-numbers` overwriting with `line-numbers` attribute

The following proposal could `line-numbers` as an overwriting attribute for a more uniform whay of passing arguments to code blocks.
````md
```ts :line-numbers [controllers/test.ts] {line-numbers="3"}
````

```ts :line-numbers [controllers/test.ts] {line-numbers="3"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

### code block with `line-numbers` attribute

Supports *unary* attribute style `{line-numbers}` and attribute with value `line-numbers="3"`

````md
```ts [controllers/test.ts] {line-numbers}
````
```ts :line-numbers [controllers/test.ts] {line-numbers}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

## highlight-lines

### code block with current line highlights behaviour
Highlighting lines currently uses `{}` as delimiters to pass the line numbers to the code block as descibed in the shiki documentation [here](https://shiki.style/packages/markdown-it#line-highlight). It also wanrs that this why of passing hilights is deprecated and dispabled by default. Its being replaced with [Common Transformesrs](https://shiki.style/packages/transformers#transformers)

Also the `{}` delimiters are shared with the `markdown-it-attr` plugin which is enabled by default in vitepress.

````md
```ts {4} [controllers/test.ts]
````

```ts {4} [controllers/test.ts]
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```


### code block with line highlights overwriting with attribute

The following example overwrites the current hilighting behaviour with an attribute. This also makes it that `highlight-lines` and `line-numbers` share a commen syntax for more clear behaviour without breaking excisting behaviour. 

````md
```ts {4} [controllers/test.ts] {highlight-lines="2,7-9"}
````
```ts {4} [controllers/test.ts] {highlight-lines="2,7-9"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

### code block with with line highlights attribute

And for good mesure only the new syntax

````md
```ts [controllers/test.ts] {highlight-lines=4-5}
````
```ts [controllers/test.ts] {highlight-lines=4-5}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```
## file-name

In some cases it can be helpfull to display a file name with a code snipit to provide context to where this snippet is located in context of an project. Currently filenames can only be displayed useing a code group wrapper...  

````md
```ts [file-name="controllers/test.ts"]
````
:::code-group
```ts [controllers/test.ts]
->
```
:::
Or use [this](https://github.com/vuejs/vitepress/issues/1027#issuecomment-1191701981) workaround to display the file name like so.

::: danger TODO
add workaround here
:::


Displaying the filename could be supported through an attribute show in the next example. The relevance of implementing it in a way that not uses the tabs wil be more clear in combination with `:::code-group` in [this]() exmaple.

This also makes it that `file-name`, `highlight-lines` and `line-numbers` share a commen syntax for more clear behaviour without breaking excisting behaviour.  

Why not use `[file-name.ts]` to modify the file name? This would change excisting behaviour and be a breaking change.

` ````ts {file-name="controllers/test.ts"}`
```ts {file-name="controllers/test.ts"}
->
```

## tab-name


### code group with current tab behaviour
Currently tabs are named by the `[name]` this is ideal if you want to display multiple files in on `code-group`.

````md
```ts {2} [controllers/test.ts]
````
::: code-group
```ts [controllers/test.ts]
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

````md
```ts [router/test.ts]
````
```ts [router/test.ts]
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```
:::

### code group overwriting tab names with custom tab names

In some cases you want to display code snippets for multiple frameworks or languages and name your tabs after them. In this case you lose the context of wat file this code snippet is located.

````md
::: code-group
```ts [router/test.ts] {tab-name="koa"}
```
```ts [router/test.ts] {tab-name="express"}
```
:::
````

::: code-group
```ts [controllers/test.ts] {tab-name="koa"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

```ts [route/test.ts] {tab-name="express"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```
:::

### code group with custom tab names and filename

A combination of the tab-name and file-name attribute can add back the context of the file name lost by renaming the tabs. Why not use `[file-name.ts]`? This would change excisting behaviour and be a breaking change.

````md
::: code-group
```ts {file-name="controllers/test.ts" tab-name="koa"}
```
```ts {file-name="router/test.ts" tab-name="express"}
```
:::
````
::: code-group
```ts {file-name="controllers/test.ts" tab-name="koa"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

```ts {highlight-lines="3-4" line-numbers="100" file-name="controllers/test.yaml" tab-name="express"}
import { Middleware } from "koa"
import { IParsedParamsState } from "@valideer/koa";

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```
:::


## All changes in one example

::: code-group
```ts [controllers/test.ts] {highlight-lines="5-7" line-numbers="3" file-name="controllers/test.ts" tab-name="koa"}

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```

```ts [router/test.ts] {highlight-lines="5-7" line-numbers="3" file-name="controllers/test.ts" tab-name="express"}

const getAll: Middleware<IParsedParamsState<ResrouceIdParsedParams>> = (ctx) => {
    const params = ctx.state.parsedParams

	const client = new MongoClient(uri);
	const cursor = await client.db("").collection("users").updateOne(_id: params.id, { $set: { name: "new name" }});
	const users = await cursor.toArray(),

    res.body = {users};
}
```
:::

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Thank you for taking the time for reading through this entire proposal ❤️{style="text-align:center;"}
