# dcordTest

本來是想寫在middlewares的,但是因為要寫測試就導致變成在測試middlewares這套額外的插件等等
這應該是middlewares自己的測試

因此改成只專屬寫一個pathUrl,然後針對這個pathUrl去做測試
主要寫測試只有寫在service/homeWork裡面

另外有一些原本案子的utils沒有拔掉是因為裡面也有測試可以提供參考

這一整套建置都是我自己完成的,再交給其他同事去開發,只需要開發service的內容即可
然後還有其他sql等等操作的核心內容都被我拔掉了,因為沒用到也不需要放進來

## 測試
直接執行即可,每次precommit也會自動跑npm test

    npm test


## 執行
直接執行即可,每次precommit也會自動跑npm test

    npm i
    npm start
