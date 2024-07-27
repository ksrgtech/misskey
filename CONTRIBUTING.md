# Contribution guide
> [!NOTE]
> This is fork of Misskey. Please go to [upsteam](https://github.com/misskey-dev/misskey) unless you are really intended to work on this repository.

ご興味をもっていただきありがとうございます。

> [!NOTE]
> このレポジトリではupstreamとは異なり、日本語を開発の第一言語とします。

## 貢献
このレポジトリはksrgtechが管理するレポジトリであり、故にksrgtechの思想が適用されます。

そのため、その思想が理解されない場合は貢献をお断りする場合があります。

## Issues
issueを作成するユーザーは重複を防ぐために、作成する前に同一の趣旨でissueが作られていないか確認することが奨励されています。

issueはforkの最新ブランチ上で解決した時点で閉じるものとし、issue自体に問題があるケースを除いてそれより前に閉じられるようなことはあってはなりません。

## Well-known branches
- **`master`**、**`develop`、`l10n_develop` の意味論は上流のプロジェクトに従うものとします。
- **`fork`** はフォーク用のブランチです。Pull requestのデフォルトのターゲットとなっています。

## Pull Request
- ロックファイルを除いた変更行数が1500行以上のPull Requestは複数のPRに分割されることが推奨されます。
- PRの題名はセマンティックコミットに沿ったものとします。
	- 機能追加は`feat`以外用いてはなりません。
	- 単独のプロジェクトの変更の場合は`feat(backend)`などのように、パッケージ名をつけることが推奨されます。
- Lintはマージ前にすべて解決される必要があります。
	- Lintを回避することは原則禁止します。
- テストケースは可能な限り追加してください。
- issueが解決される場合、closing keywordをつけて参照してください。

## コミッターがなすべきこと
- upstreamとは異なり、PRはマージコミットを伴うマージによって取り込むものとします。squash、及び`fork`ブランチのHEADへリベースしてからfast forwardする取り込みは禁止します。
  - これはbisectを容易にするための措置です。

## Release
リリースバージョンはupstreamのバージョンに、`-` (半角ハイフン) を付け加え、その直後にセマンティックバージョニングに沿ったバージョンをつけるものとします。

### Release Instructions
1. Commit version changes in the `develop` branch ([package.json](package.json))
2. Create a release PR.
	- Into `master` from `develop` branch.
	- The title must be in the format `Release: x.y.z`.
		- `x.y.z` is the new version you are trying to release.
3. Deploy and perform a simple QA check. Also verify that the tests passed.
4. Merge it. (Do not squash commit)
5. Create a [release of GitHub](https://github.com/misskey-dev/misskey/releases)
	- The target branch must be `master`
	- The tag name must be the version

> [!NOTE]
> Why this instruction is necessary:
> - To perform final QA checks
> - To distribute responsibility
> - To check direct commits to develop
> - To celebrate the release together 🎉

## Development
### Setup
Before developing, you have to set up environment. Misskey requires Redis, PostgreSQL, and FFmpeg.

You would want to install Meilisearch to experiment related features. Technically, meilisearch is not strict requirement, but some features and tests require it.

There are a few ways to proceed.

#### Use system-wide software
You could install them in system-wide (such as from package manager).

#### Use `docker compose`
You could obtain middleware container by typing `docker compose -f $PROJECT_ROOT/compose.local-db.yml up -d`.

#### Use Devcontainer
Devcontainer also has necessary setting. This method can be done by connecting from VSCode.

Instead of running `pnpm` locally, you can use Dev Container to set up your development environment.
To use Dev Container, open the project directory on VSCode with Dev Containers installed.
**Note:** If you are using Windows, please clone the repository with WSL. Using Git for Windows will result in broken files due to the difference in how newlines are handled.

It will run the following command automatically inside the container.
``` bash
git submodule update --init
pnpm install --frozen-lockfile
cp .devcontainer/devcontainer.yml .config/default.yml
pnpm build
pnpm migrate
```

After finishing the migration, you can proceed.

### Start developing
During development, it is useful to use the
```
pnpm dev
```
command.

- Server-side source files and automatically builds them if they are modified. Automatically start the server process(es).
- Vite HMR (just the `vite` command) is available. The behavior may be different from production.
- Service Worker is watched by esbuild.
- The front end can be viewed by accessing `http://localhost:5173`.
- The backend listens on the port configured with `port` in .config/default.yml.
If you have not changed it from the default, it will be "http://localhost:3000".
If "port" in .config/default.yml is set to something other than 3000, you need to change the proxy settings in packages/frontend/vite.config.local-dev.ts.

### `MK_DEV_PREFER=backend pnpm dev`
pnpm dev has another mode with `MK_DEV_PREFER=backend`.

```
MK_DEV_PREFER=backend pnpm dev
```

- This mode is closer to the production environment than the default mode.
- Vite runs behind the backend (the backend will proxy Vite at /vite).
- You can see Misskey by accessing `http://localhost:3000` (Replace `3000` with the port configured with `port` in .config/default.yml).
- To change the port of Vite, specify with `VITE_PORT` environment variable.
- HMR may not work in some environments such as Windows.

## Testing
- Test codes are located in [`/packages/backend/test`](/packages/backend/test).

### Run test
Create a config file.
```
cp .github/misskey/test.yml .config/
```
Prepare DB/Redis for testing.
```
docker compose -f packages/backend/test/compose.yml up
```
Alternatively, prepare an empty (data can be erased) DB and edit `.config/test.yml`.

Run all test.
```
pnpm test
```

#### Run specify test
```
pnpm jest -- foo.ts
```

### e2e tests
TODO

## Environment Variable

- `MISSKEY_CONFIG_YML`: Specify the file path of config.yml instead of default.yml (e.g. `2nd.yml`).
- `MISSKEY_WEBFINGER_USE_HTTP`: If it's set true, WebFinger requests will be http instead of https, useful for testing federation between servers in localhost. NEVER USE IN PRODUCTION.

## Continuous integration
Misskey uses GitHub Actions for executing automated tests.
Configuration files are located in [`/.github/workflows`](/.github/workflows).

## Vue
Misskey uses Vue(v3) as its front-end framework.
- Use TypeScript.
- **When creating a new component, please use the Composition API (with [setup sugar](https://v3.vuejs.org/api/sfc-script-setup.html) and [ref sugar](https://github.com/vuejs/rfcs/discussions/369)) instead of the Options API.**
	- Some of the existing components are implemented in the Options API, but it is an old implementation. Refactors that migrate those components to the Composition API are also welcome.

## nirax
niraxは、Misskeyで使用しているオリジナルのフロントエンドルーティングシステムです。
**vue-routerから影響を多大に受けているので、まずはvue-routerについて学ぶことをお勧めします。**

### ルート定義
ルート定義は、以下の形式のオブジェクトの配列です。

```ts
{
	name?: string;
	path: string;
	component: Component;
	query?: Record<string, string>;
	loginRequired?: boolean;
	hash?: string;
	globalCacheKey?: string;
	children?: RouteDef[];
}
```

> [!WARNING]
> 現状、ルートは定義された順に評価されます。
> たとえば、`/foo/:id`ルート定義の次に`/foo/bar`ルート定義がされていた場合、後者がマッチすることはありません。

### 複数のルーター
vue-routerとの最大の違いは、niraxは複数のルーターが存在することを許可している点です。
これにより、アプリ内ウィンドウでブラウザとは個別にルーティングすることなどが可能になります。

## Storybook

Misskey uses [Storybook](https://storybook.js.org/) for UI development.

### Setup & Run

#### Setup

```bash
pnpm --filter misskey-js build
```

#### Run

```bash
pnpm --filter frontend storybook-dev
```

### Usage

When you create a new component (in this example, `MyComponent.vue`), the story file (`MyComponent.stories.ts`) will be automatically generated by the `.storybook/generate.js` script.
You can override the default story by creating a impl story file (`MyComponent.stories.impl.ts`).

```ts
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StoryObj } from '@storybook/vue3';
import MyComponent from './MyComponent.vue';
export const Default = {
	render(args) {
		return {
			components: {
				MyComponent,
			},
			setup() {
				return {
					args,
				};
			},
			computed: {
				props() {
					return {
						...this.args,
					};
				},
			},
			template: '<MyComponent v-bind="props" />',
		};
	},
	args: {
		foo: 'bar',
	},
	parameters: {
		layout: 'centered',
	},
} satisfies StoryObj<typeof MyComponent>;
```

If you want to opt-out from the automatic generation, create a `MyComponent.stories.impl.ts` file and add the following line to the file.

```ts
import MyComponent from './MyComponent.vue';
void MyComponent;
```

You can override the component meta by creating a meta story file (`MyComponent.stories.meta.ts`).

```ts
export const argTypes = {
	scale: {
		control: {
			type: 'range',
			min: 1,
			max: 4,
		},
	},
};
```

Also, you can use msw to mock API requests in the storybook. Creating a `MyComponent.stories.msw.ts` file to define the mock handlers.

```ts
import { HttpResponse, http } from 'msw';
export const handlers = [
	http.post('/api/notes/timeline', ({ request }) => {
		return HttpResponse.json([]);
	}),
];
```

Don't forget to re-run the `.storybook/generate.js` script after adding, editing, or removing the above files.

## Nest

### Nest Service Circular dependency / Nestでサービスの循環参照でエラーが起きた場合

#### forwardRef
まずは簡単に`forwardRef`を試してみる

```typescript
export class FooService {
	constructor(
		@Inject(forwardRef(() => BarService))
		private barService: BarService
	) {
	}
}
```

#### OnModuleInit
できなければ`OnModuleInit`を使う

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BarService } from '@/core/BarService';

@Injectable()
export class FooService implements OnModuleInit {
	private barService: BarService // constructorから移動してくる

	constructor(
		private moduleRef: ModuleRef,
	) {
	}

	async onModuleInit() {
		this.barService = this.moduleRef.get(BarService.name);
	}

	public async niceMethod() {
		return await this.barService.incredibleMethod({ hoge: 'fuga' });
	}
}
```

##### Service Unit Test
テストで`onModuleInit`を呼び出す必要がある

```typescript
// import ...

describe('test', () => {
	let app: TestingModule;
	let fooService: FooService; // for test case
	let barService: BarService; // for test case

	beforeEach(async () => {
		app = await Test.createTestingModule({
			imports: ...,
			providers: [
				FooService,
				{ // mockする (mockは必須ではないかもしれない)
					provide: BarService,
					useFactory: () => ({
						incredibleMethod: jest.fn(),
					}),
				},
				{ // Provideにする
					provide: BarService.name,
					useExisting: BarService,
				},
			],
		})
			.useMocker(...
			.compile();

		fooService = app.get<FooService>(FooService);
		barService = app.get<BarService>(BarService) as jest.Mocked<BarService>;

		// onModuleInitを実行する
		await fooService.onModuleInit();
	});

	test('nice', () => {
		await fooService.niceMethod();

		expect(barService.incredibleMethod).toHaveBeenCalled();
		expect(barService.incredibleMethod.mock.lastCall![0])
			.toEqual({ hoge: 'fuga' });
	});
})
```

## Notes

### Misskeyのドメイン固有の概念は`Mi`をprefixする
例えばGoogleが自社サービスをMap、Earth、DriveではなくGoogle Map、Google Earth、Google Driveのように命名するのと同じ
コード上でMisskeyのドメイン固有の概念には`Mi`をprefixすることで、他のドメインの同様の概念と区別できるほか、名前の衝突を防ぐ。
ただし、文脈上Misskeyのものを指すことが明らかであり、名前の衝突の恐れがない場合は、一時的なローカル変数に限って`Mi`を省略してもよい。

### How to resolve conflictions occurred at pnpm-lock.yaml?

Just execute `pnpm` to fix it.

### INSERTするときにはsaveではなくinsertを使用する
#6441

### placeholder
SQLをクエリビルダで組み立てる際、使用するプレースホルダは重複してはならない
例えば
``` ts
query.andWhere(new Brackets(qb => {
	for (const type of ps.fileType) {
		qb.orWhere(`:type = ANY(note.attachedFileTypes)`, { type: type });
	}
}));
```
と書くと、ループ中で`type`というプレースホルダが複数回使われてしまいおかしくなる
だから次のようにする必要がある
```ts
query.andWhere(new Brackets(qb => {
	for (const type of ps.fileType) {
		const i = ps.fileType.indexOf(type);
		qb.orWhere(`:type${i} = ANY(note.attachedFileTypes)`, { [`type${i}`]: type });
	}
}));
```

### Not `null` in TypeORM
```ts
const foo = await Foos.findOne({
	bar: Not(null)
});
```
のようなクエリ(`bar`が`null`ではない)は期待通りに動作しない。
次のようにします:
```ts
const foo = await Foos.findOne({
	bar: Not(IsNull())
});
```

### `null` in SQL
SQLを発行する際、パラメータが`null`になる可能性のある場合はSQL文を出し分けなければならない
例えば
``` ts
query.where('file.folderId = :folderId', { folderId: ps.folderId });
```
という処理で、`ps.folderId`が`null`だと結果的に`file.folderId = null`のようなクエリが発行されてしまい、これは正しいSQLではないので期待した結果が得られない
だから次のようにする必要がある
``` ts
if (ps.folderId) {
	query.where('file.folderId = :folderId', { folderId: ps.folderId });
} else {
	query.where('file.folderId IS NULL');
}
```

### `[]` in SQL
SQLを発行する際、`IN`のパラメータが`[]`(空の配列)になる可能性のある場合はSQL文を出し分けなければならない
例えば
``` ts
const users = await Users.find({
	id: In(userIds)
});
```
という処理で、`userIds`が`[]`だと結果的に`user.id IN ()`のようなクエリが発行されてしまい、これは正しいSQLではないので期待した結果が得られない
だから次のようにする必要がある
``` ts
const users = userIds.length > 0 ? await Users.find({
	id: In(userIds)
}) : [];
```

### 配列のインデックス in SQL
SQLでは配列のインデックスは**1始まり**。
`[a, b, c]`の `a`にアクセスしたいなら`[0]`ではなく`[1]`と書く

### null IN
nullが含まれる可能性のあるカラムにINするときは、そのままだとおかしくなるのでORなどでnullのハンドリングをしよう。

### enumの削除は気をつける
enumの列挙の内容の削除は、その値をもつレコードを全て削除しないといけない

削除が重たかったり不可能だったりする場合は、削除しないでおく

### Migration作成方法
packages/backendで:
```sh
pnpm dlx typeorm migration:generate -d ormconfig.js -o <migration name>
```

- 生成後、ファイルをmigration下に移してください
- 作成されたスクリプトは不必要な変更を含むため除去してください

### JSON SchemaのobjectでanyOfを使うとき
JSON Schemaで、objectに対してanyOfを使う場合、anyOfの中でpropertiesを定義しないこと。
バリデーションが効かないため。（SchemaTypeもそのように作られており、objectのanyOf内のpropertiesは捨てられます）
https://github.com/misskey-dev/misskey/pull/10082

テキストhogeおよびfugaについて、片方を必須としつつ両方の指定もありうる場合:

```ts
export const paramDef = {
	type: 'object',
	properties: {
		hoge: { type: 'string', minLength: 1 },
		fuga: { type: 'string', minLength: 1 },
	},
	anyOf: [
		{ required: ['hoge'] },
		{ required: ['fuga'] },
	],
} as const;
```

### コネクションには`markRaw`せよ
**Vueのコンポーネントのdataオプションとして**misskey.jsのコネクションを設定するとき、必ず`markRaw`でラップしてください。インスタンスが不必要にリアクティブ化されることで、misskey.js内の処理で不具合が発生するとともに、パフォーマンス上の問題にも繋がる。なお、Composition APIを使う場合はこの限りではない(リアクティブ化はマニュアルなため)。

### JSONのimportに気を付けよう
TypeScriptでjsonをimportすると、tscでコンパイルするときにそのjsonファイルも一緒にdistディレクトリに吐き出されてしまう。この挙動により、意図せずファイルの書き換えが発生することがあるので、jsonをimportするときは書き換えられても良いものかどうか確認すること。書き換えされて欲しくない場合は、importで読み込むのではなく、`fs.readFileSync`などの関数を使って読み込むようにすればよい。

### コンポーネントのスタイル定義でmarginを持たせない
コンポーネント自身がmarginを設定するのは問題の元となることはよく知られている
marginはそのコンポーネントを使う側が設定する

## その他
### HTMLのクラス名で follow という単語は使わない
広告ブロッカーで誤ってブロックされる

### indexというファイル名を使うな
ESMではディレクトリインポートは廃止されているのと、ディレクトリインポートせずともファイル名が index だと何故か一部のライブラリ？でディレクトリインポートだと見做されてエラーになる
