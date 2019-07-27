## complete
-  ~~能把牌 從 tmp區  移回 下方dropping區~~
-  ~~下方dropping區 , 牌已經0張時，可以重新放上牌~~

## bug to fix:
- ~~找出redux dev tool開發時 store面板上沒顯示出值的原因~~
[@see commit_080aa7](080aa7e3766a225ab8b9151b3704d64a1a0be7bc)  

  -  [react-native-debugger/issues/264](https://github.com/jhen0409/react-native-debugger/issues/264)  
  -  [redux-devtools-extension/issues/647](https://github.com/zalmoxisus/redux-devtools-extension/issues/647)
- render時 key有重複，需找出原因
-  第一次將牌放上tmp區時 不知為何會造成背景圖片整個repaint一次，形成 `閃電白畫面 感`，只有第一次會，後面就不會發生，不知為何

## feature to implement: 
- ~~time travel功能~~ 有不完美的地方，但已做出來
- write a custom hook - useInterval hook, 顯示經過時間
- 右上finish區 牌 改成完全堆疊
- 根據tmp區剩n個空格，能夠拉動符合規則的n+1張牌

