# フルスクラッチ GUI 入門

さて、いきなり自分で考えたGUIをスクラッチし始めるのもエキサイティングですが、
何を作ればいいか思いつかないという方も多いかと思います。
そこで、第一歩として「既存UIの再実装」をしてみましょう。

今回は `Vue.js v2.6.11` を利用してselect要素を自作します。

# 前提

- HTML / CSS / JS / Vue.js に関しては概要説明のみとします。
- アクセシビリティへの考慮はキーボード操作のみとします。

# フルスクラッチ GUI の原罪

さて、フルスクラッチ GUI を作るにあたって、一つ注意点があります。

本稿では、ブラウザネイティブの form 要素を再実装することになるでしょう。
しかし再実装した瞬間にアクセシビリティは大きく損なわれます。

- キーボード操作が可能ですか？
- tab でフォーカスできますか？
- フォーカス時のアウトラインが表示されますか？

また、適切な要素を使わないことは、文書がセマンティックでなくなるという欠点があります。
例えばbutton要素はスクリーンリーダーでは「ボタン」と読み上げられます。
いくらdiv でボタンに見た目を似せても、スクリーンリーダーにとってはただの文字列です。

これらの問題を適切に解決するためには、適切な要素を選択する以外にありません。

ここから先は当然のようにアクセシビリティが損なわれる世界です。
スクラッチではどうしてもネイティブのアクセシビリティに至らないことも多くあります。

# 作ってみようよ

ここから実装を試みていきますが、実力に自信のある方はまず、ここから先を読まないことをおすすめします。

というのも、自分のやり方、アイデアで実装してみたくないですか？
あくまでここから先は、筆者 hashrock の実装の一案に過ぎません。

React でも Vue でも Angular でも構いません。まずは自分で実装を試みて、
それからここから先を読んだほうが 10 倍楽しめることでしょう。
自分のアイデアをブラウザというキャンバスで試してみませんか？
その情熱こそが、複雑 GUI が人を引きつける第一のポイントです。

# select 要素を自作してみよう

## トレースもとを観察しよう

まず、トレースもとのUIを配置します。

```html
<select>
  <option>Option 01</option>
  <option>Option 02</option>
  <option>Option 03</option>
  <option>Option 04</option>
  <option>Option 05</option>
</select>
```

これをレンダリングすると下記の図のようになります。

![普通のSelect要素](./assets/native-select.png)

一通り操作を行い、どんな遷移があるか洗い出しましょう。

遷移を図示すると下記のようになります。

![マウス操作](./assets/event-diagram-mouse.png)

現時点ではキーボード操作による遷移は考えません。

## モックしよう

開発順序は人によるかとは思いますが、私は書きながら設計を考えたいので、まずモックを選択します。
一番難しそうな状況の View を先に作ってしまいます。

まずは細かい挙動はおいておいて、開いた状態のコンポーネントをモックします。

v-if などで非表示にすることでこれらの挙動を再現できます。

今回の肝はフロートする options で、`position: absolute`が必要になりそうです。

![image](assets/005.png)

DOM構造は下記の通りとしました。

この時点でtabindexをつけておきましょう。

```html
<div class="select" tabindex="0">
  <div class="label">Option 01 ▼</div>
  <ul class="options">
    <!-- 選択状態にある要素にselectedクラスをつけておく -->
    <li class="option selected">Option 01</li>
    <li class="option">Option 02</li>
    <li class="option">Option 03</li>
    <li class="option">Option 04</li>
    <li class="option">Option 05</li>
  </ul>
</div>
```

Optionはdivでも表現可能ですが、リストであることを考えると ul / li 要素を使うほうが適切でしょう。

フォーカス時のアウトラインは、デフォルトだとポップアップも含む要素全体にかかってしまいます。

![image](assets/006.png)

今回は`outline: 0px;`でアウトラインを非表示にしますが、フォーカス時の視覚的ヒントがないとアクセシビリティ上の問題がありますので、必ず代替アウトラインを付け直してください。

CSSは下記のようになります。各プロパティについてはコメントで解説します。


```css
.select {
  /* absoluteの基準地点 */
  position: relative;
  /* 見た目関連 */
  border: 1px solid #999;
  padding: 0.25em 0.5em;
  line-height: 0.9em;
  border-radius: 4px;
  cursor: default;
  /* アウトラインは消去（必ず代替アウトラインを設定すること） */
  outline: 0px;
}
.select:focus {
  /* 代替アウトライン */
  box-shadow: 0 0 0px 2px dodgerblue;
}
.options {
  /* 絶対配置 */
  position: absolute;
  /* 親要素の高さ分縦方向に移動 */
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #999;
  white-space: nowrap;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;  
}
.option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.option:hover {
  background: #eee;
}
.option.selected {
  background: #888;
  color: white;
}
```

見た目が完成したら、実データを表示できるようにしたり、クリック時などの挙動を組み込んで行きます。

## オープン・クローズの挙動をつけよう

select をクリックすることでトグルするようにしましょう。

Vue.jsの場合、単純にopenというフラグを持たせてしまえばOKです。

## 要素を選択可能にする


また、何番目の要素が選択されているかを selectedIndex というデータに持たせます。

optionsデータも作成しましょう。

## 実データをpropsとして受け取る

optionsはコンポーネントの利用側から渡せるようにします。

propsにArrayを取るようにします。

## v-modelに対応する

v-modelは利用用途によっては推奨されなくなってきています。

ですが、Form要素のような粒度の小さいコンポーネントにとっては手軽です。

対応するには、props down, events upの流儀に則った上で、下記のインターフェイスを備えます。

- value prop
- input event


## キーボード操作に対応しよう

アクセシビリティの確保において、キーボード操作への対応は重要です。
併せて、フォーカス時の挙動についても再確認しておきましょう。

![キーボード操作](./assets/event-diagram-keyboard.png)

まず最初に tabindex をつけるところからです。

## 改善が必要な点

今回は扱いませんでしたが、コンポーネントの下にいつも余裕があるとは限らないので、ポップアップする要素は上下に出し分けられると良いでしょう。


## WAI-ARIA について

今回、時間的な余裕がなく、WAI-ARIA にきちんと対応したコンポーネントを紹介することができませんでした。
理想を言えばスクリーンリーダーに完全対応したコンポーネントを作りたかったところですが、
そのようなコンポーネントは、そもそもの select 要素をそのまま使うだけで良いです。

無駄に自作しない、というのも大事になってくるでしょう。
といいつつ、１章まるごと無駄に自作してしまいました。

しっかりしたコンポーネントを作りたい場合は、下記のサンプル実装を参考にしてください。

https://w3c.github.io/aria-practices/examples/listbox/listbox-collapsible.html

