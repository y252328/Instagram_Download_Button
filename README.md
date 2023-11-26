# Instagram Download Button
[Github](https://github.com/y252328/Instagram_Download_Button), [Greasy Fork](https://greasyfork.org/en/scripts/406535-instagram-download-button) ~~, [OpenUserJS](https://openuserjs.org/scripts/y252328/Instagram_Download_Button)~~

**Instagram changes their front-end frequently, but I'm focusing on my full time job now. Which means I may not fix this script in a short time if this script breaked by Instagram web changing. Thank you for your patience.**

This repository is a JavaScript for Greasemonkey/Tampermonkey. This script will add a download button and open button to your Instagram and you can download or open profile pictures, media in the posts, stories, and highlights by one click.

The newer versions code only do some simple tests on Chrome. So if you have any problem, please feel free to contact me in English or Chinese and attach the detail information such as your runtime environment, IG post url, etc.

> Note: This script only tests on Chrome ~~, Edge, and Firefox~~ with Tampermonkey on Windows 10 1903 64-bit.

## Caution
* Some user feedback that account be logged out when this script is enabled, please disable this script if you meet a similar issue.
* There is some feedback provided by users that Instagram will block your account for a few hours (maybe longer) if you download too much media in a short time. So please mind the download number.
* Doesn't support reels page (i.e., `https://www.instagram.com/reels/`)

## Issues
* Sometimes may not work on the main feed
* May be loged out when this script enabled
* May break the layout
* May not work on in private account post due to no share button 
* May not work with saved posts
* May get lower resolution Story media

## About the new url fetch method
Around May 2022, Instagram modified the web page so that some media could not be downloaded (especially Reels). From this script version 1.13, a new method of fetching media url has been added and is enabled by default (not yet applied to Story). This new method can obtain full resolution pictures (to be verified) and all media can be downloaded at present, but the disadvantage is that the speed of fetching URLs is slow (download speed has no effect) and may have some bugs. You can set `disableNewUrlFetchMethod` to **true** if you don't want to use the new method. Or you can set `prefetchAndAttachLink` to **true** in order to prefetch the URL info.

## Options
This script can be configured by modifying the following constant variables in the head of this script.
* `disableNewUrlFetchMethod` : boolean, disable new url fetch method which uses info API
* `prefetchAndAttachLink` : boolean, attach the link into the button elements if true
* `hoverToFetchAndAttachLink` : boolean, fetch and add link when hover the button
* `postFilenameTemplate` : string, naming rule for media downloading in the post
* `storyFilenameTemplate` : string, naming rule for media downloading in the story
* `replaceJpegWithJpg` : boolean, replace `.jpeg` with `.jpg` if true

## Naming Template
* `%id%` : the poster id
* `%datetime%` : the media upload time, see next section for the datatime format
* `%medianame%` : the original media file name
* `%postId%` : the post id
* `%mediaIndex%` : the media index in multiple-media posts
* ~~`%ext%` : the file extension of media~~

## Datetime Template
* `%y%` : year (4 digits)
* `%m%` : month (01-12)
* `%d%` : day (01-31)
* `%H%` : hour (00-23)
* `%M%` : min (00-59)
* `%S%` : sec (00-59)

## Shortcut Keys (May not work in newer versions)
* `Alt` + `i` : Open the media in the new tab
* `Alt` + `k` : Download the media
* `Alt` + `j` : Next media in the multiple media post
* `Alt` + `l` : Previous media in the multiple media post

> The shortcut keys do not work on the Instagram main page currently

## Contributors who aren't listed in the [GitHub contributors list](https://github.com/y252328/Instagram_Download_Button/graphs/contributors) (sort by contribution time)
* [孙年忠](https://greasyfork.org/users/829246-%E5%AD%99%E5%B9%B4%E5%BF%A0)
* [xxalexx](https://greasyfork.org/en/users/170052-xxalexx)

## Preview
<img src="img/profile.png" alt="drawing" width="436" height="134"/>
<br/>
<img src="img/post.png" alt="drawing" width="467" height="294"/>
<br/>
<img src="img/story&highlight.png" alt="drawing" width="216" height="376"/>

## License
[MIT](https://github.com/y252328/Instagram_Download_Button/blob/master/LICENSE)
