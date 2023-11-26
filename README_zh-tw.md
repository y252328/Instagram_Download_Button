# Instagram Download Button
[Github](https://github.com/y252328/Instagram_Download_Button), [Greasy Fork](https://greasyfork.org/zh-TW/scripts/406535-instagram-download-button) ~~, [OpenUserJS](https://openuserjs.org/scripts/y252328/Instagram_Download_Button)~~

**Instagram經常改變他們的前端，但我現在專注在正職工作上。所以如果這個腳本因Instagram網頁更改而無法使用，我可能無法在短時間內修復該腳本。感謝你的耐心等待。**

此腳本會在Instagram頁面上新增下載按鈕與開啟按鈕，透過這些按鈕可以下載或開啟大頭貼與貼文、限時動態、Highlight中的照片或影片

新版的程式只在Chrome上做了簡單的測試，所以如果有任何問題，歡迎與我聯繫並附上執行環境與出問題的IG網址!

> Note: 目前此腳本只在Windows 10 1903 64-bit上的Chrome ~~、Edge與Firefox~~ 搭配Tampermonkey測試過

## 注意
* 有些用戶反映啟用此腳本後帳戶會被登出，如果您遇到類似問題，請暫時停用此腳本。
* 有多個使用者回報，過度下載可能會使帳號被Instagram封鎖。請勿短時間內下載太多次。
* 不支援連續短片頁面 (即`https://www.instagram.com/reels/`)

## 已知問題
* 有時在主頁面時，按鈕可能無法正常工作
* 在啟用此script可能會被強制登出
* 在某些時候會造成跑版
* 在沒有分享按鈕的地方會無法正常運作(如private account post)
* 在收藏的貼文上可能無法正常運作
* 有時會下載到較低畫質的限時動態

## 關於新的URL獲取方式
在2022年5月左右，IG修改了網頁造成部分媒體無法下載(尤其是Reels)。從此腳本的1.13版開始增加了新的取得媒體URL的方法且預設為啟用(尚未套用在限時動態)，此方發法可以取得高解析度的圖片(待驗證)且目前所有的媒體都可以下載，但缺點是抓取URL的速度較慢(下載速度沒有影響)且可能還有些bugs，因此若不想使用新方法請將`disableNewUrlFetchMethod`設為**true**或是開啟`prefetchAndAttachLink`來預先載入url資訊。

## 選項
透過修改腳本開頭中的常數變數可以設定此腳本。
* `disableNewUrlFetchMethod` : boolean，停用新的URL獲取方法
* `prefetchAndAttachLink` : boolean，設為true時，將自動抓取連結並加入按鈕元素中
* `hoverToFetchAndAttachLink` : boolean，設為true且鼠標移到按鈕上時，將抓取連結並加入按鈕元素中
* `postFilenameTemplate` : string，貼文檔案的命名規則
* `storyFilenameTemplate` : string，現實動態的檔案命名規則
* `replaceJpegWithJpg` : boolean，設為true時，將.jpeg檔改成.jpg檔

## Naming Template
* `%id%` : 貼文者的ID
* `%datetime%` : 貼文時間，格式請見下一章節
* `%medianame%` : 原始的檔案名稱
* `%postId%` : 貼文ID
* `%mediaIndex%` : 檔案的序號
* ~~`%ext%` : 副檔名~~

## Datetime Template
* `%y%` : 年 (4位)
* `%m%` : 月 (01-12)
* `%d%` : 日 (01-31)
* `%H%` : 小時 (00-23)
* `%M%` : 分鐘 (00-59)
* `%S%` : 秒 (00-59)

## 快捷鍵 (在新版本中可能無法使用)
* `Alt` + `i` : 在新視窗開啟圖片/影片
* `Alt` + `k` : 下載圖片/影片
* `Alt` + `j` : 向前一個圖片/影片 (多圖貼文中)
* `Alt` + `l` : 向後一個圖片/影片 (多圖貼文中)

> 目前快捷鍵無法在Instagram主頁上使用

## 未列在[GitHub contributors list](https://github.com/y252328/Instagram_Download_Button/graphs/contributors)的Contributors (sort by contribution time)
* [孙年忠](https://greasyfork.org/users/829246-%E5%AD%99%E5%B9%B4%E5%BF%A0)
* [xxalexx](https://greasyfork.org/en/users/170052-xxalexx)

## 預覽
<img src="img/profile.png" alt="drawing" width="436" height="134"/>
<br/>
<img src="img/post.png" alt="drawing" width="467" height="294"/>
<br/>
<img src="img/story&highlight.png" alt="drawing" width="216" height="376"/>

## License
[MIT](https://github.com/y252328/Instagram_Download_Button/blob/master/LICENSE)