# Freecell

## 六角學院 2019 theF2EChallenge Week2 新接龍
- [資訊](https://www.facebook.com/groups/173311386703334/permalink/364591804241957/)
- [UI設計師的設計理念](https://challenge.thef2e.com/user/638?schedule=2813#works-2813)
- [UI設計師出的設計稿](https://xd.adobe.com/spec/5bd27a54-838c-4dd0-60b4-f4dc01bc453a-2de3/grid)

## repo資訊
- 本repo使用我自己整理出來平常在用的[react+Typescript template](https://github.com/akari0624/react-starter_withTypeScript)來作為專案起始。
- 繼續只用funtional component + hook來寫

## 會用什麼第三方library
- 拖拉  
  ~~[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)~~  
  因為`react-beautiful-dnd`有它自己太獨特的物理現象模擬，改使用自己包裝[HTML5-dnd API](https://developer.mozilla.org/zh-TW/docs/Web/API/HTML_Drag_and_Drop_API)後做出來的[dragAndDrop module](./src/utils/DnDModule)
- 狀態管理  
  redux
    - middleware: redux-saga


## what I learn from this developing experience
1. reducer的state如果是`ES6`的原生[Map](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Map), [Set](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Set)的話，[redux-devtools-extension]要做`強迫序列化`的設定，不然會看不到東西。 [@see](./todo.md) [@code](./src/index.tsx)
2. 該如何為[customHook](https://reactjs.org/docs/hooks-custom.html)寫unitTest
