## complete
-  ~~能把牌 從 tmp區  移回 下方dropping區~~
-  ~~下方dropping區 , 牌已經0張時，可以重新放上牌~~

## bug to fix:
- 找出redux dev tool開發時 store面板上沒顯示出值的原因
- render時 key有重複，需找出原因
-  第一次將牌放上tmp區時 不知為何會造成背景圖片整個repaint一次，形成 `閃電白畫面 感`，只有第一次會，後面就不會發生，不知為何

## feature to implement: 
- time travel功能
- write a custom hook - useInterval hook, 顯示經過時間
- 右上finish區 牌 改成完全堆疊
- 根據tmp區剩n個空格，能夠拉動符合規則的n+1張牌

