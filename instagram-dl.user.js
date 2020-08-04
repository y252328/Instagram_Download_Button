// ==UserScript==
// @name                Instagram Download Button
// @name:zh-TW          Instagram 下載器
// @namespace           https://github.com/y252328/Instagram_Download_Button
// @version             1.4.2
// @compatible          chrome
// @compatible          firefox
// @compatible          opera
// @compatible          edge
// @description         Add download button and open button to download or open profile picture and media in the posts, stories and highlights in Instagram
// @description:zh-TW   在Instagram頁面加入下載按鈕與開啟按鈕，透過這些按鈕可以下載或開啟大頭貼與貼文、限時動態、Highlight中的照片或影片
// @author              ZhiYu
// @match               https://www.instagram.com/*
// @grant               none
// @license             MIT
// ==/UserScript==

(function () {
    'use strict';
    function yyyymmdd(date) {
        // ref: https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object?page=1&tab=votes#tab-top
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
    }

    var svgDownloadBtn =
        `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="24" width="24"
	 viewBox="0 0 477.867 477.867" style="fill:%color;" xml:space="preserve">
	<g>
		<path d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267
			c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4
			c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"/>
	</g>
	<g>
		<path d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0
			s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713
			l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333
			C342.915,312.486,342.727,301.682,335.947,295.134z"/>
	</g>
</svg>`;

    var svgNewtabBtn =
        `<svg id="Capa_1" style="fill:%color;" viewBox="0 0 482.239 482.239" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
    <path d="m465.016 0h-344.456c-9.52 0-17.223 7.703-17.223 17.223v86.114h-86.114c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h344.456c9.52 0 17.223-7.703 17.223-17.223v-86.114h86.114c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223zm-120.56 447.793h-310.01v-310.01h310.011v310.01zm103.337-103.337h-68.891v-223.896c0-9.52-7.703-17.223-17.223-17.223h-223.896v-68.891h310.011v310.01z"/>
</svg>`;

    var checkExistTimer = setInterval(function () {
        let lang = document.getElementsByTagName("html")[0].getAttribute('lang');
        let sharePostSelector = "section > button > div";
        let menuSeletor = "header button > span";
        let profileSelector = "header section svg";

        // check story
        if (document.getElementsByClassName("custom-btn").length === 0) {
            if (document.querySelector(menuSeletor)) {
                addCustomBtn(document.querySelector(menuSeletor), "white", append2Post);
            }
        }

        // check post
        let articleList = document.querySelectorAll("article");
        for (let i = 0; i < articleList.length; i++) {
            if (articleList[i].querySelector(sharePostSelector) &&
                articleList[i].getElementsByClassName("custom-btn").length === 0) {
                addCustomBtn(articleList[i].querySelector(sharePostSelector), "black", append2Post);
            }
        }

        // check profile
        if (document.getElementsByClassName("custom-btn").length === 0) {
            if (document.querySelector(profileSelector)) {
                addCustomBtn(document.querySelector(profileSelector), "black", append2Header);
            }
        }
    }, 500);

    function append2Header(node, btn) {
        node.parentNode.parentNode.parentNode.insertBefore(btn, node.parentNode.parentNode);
    }

    function append2Post(node, btn) {
        node.parentNode.parentNode.appendChild(btn);
    }

    function addCustomBtn(node, iconColor, appendNode) {
        // add download button and set onclick handler
        // add newtab button
        let newtabBtn = createCustomBtn(svgNewtabBtn, iconColor, "newtab-btn", "16px");
        appendNode(node, newtabBtn);

        // add download button
        let downloadBtn = createCustomBtn(svgDownloadBtn, iconColor, "download-btn", "14px");
        appendNode(node, downloadBtn);
    }

    function createCustomBtn(svg, iconColor, className, marginLeft) {
        let newBtn = document.createElement("span");
        newBtn.innerHTML = svg.replace('%color', iconColor);
        newBtn.setAttribute("class", "custom-btn " + className);
        newBtn.setAttribute("title", "open in new tab");
        newBtn.setAttribute("style", "cursor: pointer;margin-left: " + marginLeft + ";margin-top: 8px;");
        newBtn.onclick = customBtnClicked;
        return newBtn;
    }

    function customBtnClicked(e) {
        // handle button click
        let target = e.currentTarget;
        if (window.location.pathname.includes('stories')) {
            handleStory(target);
        } else if (document.querySelector('header') && 
                   document.querySelector('header').contains(target)) {
            handleProfile(target);
        } else {
            handlePost(target);
        }
    }

    function handleProfile(target) {
        // extract profile picture url and download or open it
        let img = document.querySelector('header img');
        let url = img.getAttribute('src');
        let filename = '.png';

        if (url.length > 0) {
            // check url
            if (target.getAttribute("class").includes("download-btn")) {
                // generate filename 
                // add poster name to filename
                let posterName = document.querySelector('header h1').textContent;
                filename = posterName + filename;

                // download
                downloadResource(url, filename);
            } else {
                // open url in new tab
                openResource(url);
            }
        }
    }

    function handlePost(target) {
        // extract url from target post and download or open it
        let articleNode = target;
        while (articleNode && articleNode.tagName !== "ARTICLE") {
            articleNode = articleNode.parentNode;
        }
        let list = articleNode.querySelectorAll('li[style][class]');
        let url = "";
        let filename = "";

        // =====================
        // = extract media url =
        // =====================
        if (list.length === 0) {
            // single img or video
            if (articleNode.querySelector('article  div > video')) {
                url = articleNode.querySelector('article  div > video').getAttribute('src');
            } else if (articleNode.querySelector('article  div[role] div > img')) {
                url = articleNode.querySelector('article  div[role] div > img').getAttribute('src');
            } else {
                console.log("Err: not find media at handle post single")
            }
        } else {
            // multiple imgs or videos
            let idx = 0;
            // check current index
            if (!articleNode.querySelector('.coreSpriteLeftChevron')) {
                idx = 0;
            } else if (!articleNode.querySelector('.coreSpriteRightChevron')) {
                idx = list.length - 1;
            } else idx = 1;

            let node = list[idx];
            if (node.querySelector('video')) {
                url = node.querySelector('video').getAttribute('src');
            } else if (node.querySelector('img')) {
                url = node.querySelector('img').getAttribute('src');
            }
        }

        // ==============================
        // = download or open media url =
        // ==============================
        if (url.length > 0) {
            // check url
            if (target.getAttribute("class").includes("download-btn")) {
                // generate filename 
                // add time to filename
                let datetime = new Date(articleNode.querySelector('time').getAttribute('datetime'));
                filename = yyyymmdd(datetime) + '_' + datetime.toTimeString().split(' ')[0].replace(/:/g, '') + '-' + filename;
                // add poster name to filename
                let posterName = articleNode.querySelector('header a').getAttribute('href').replace(/\//g, '');
                filename = posterName + '-' + filename;

                // download
                downloadResource(url, filename);
            } else {
                // open url in new tab
                openResource(url);
            }
        }
    }

    function handleStory(target) {
        // extract url from target story and download or open it
        let url = "";

        // =====================
        // = extract media url =
        // =====================
        if (document.querySelector('video > source')) {
            url = document.querySelector('video > source').getAttribute('src');
        } else if (document.querySelector('img[decoding="sync"]')) {
            url = document.querySelector('img[decoding="sync"]').getAttribute('src');
        }
        let filename = url.split('?')[0].split('\\').pop().split('/').pop();

        // ==============================
        // = download or open media url =
        // ==============================
        if (target.getAttribute("class").includes("download-btn")) {
            // generate filename 
            // add time to filename
            let datetime = new Date(document.querySelector('time').getAttribute('datetime'));
            filename = yyyymmdd(datetime) + '_' + datetime.toTimeString().split(' ')[0].replace(/:/g, '') + '-' + filename;
            // add poster name to filename
            let posterName = document.querySelector('header a').getAttribute('href').replace(/\//g, '');
            filename = posterName + '-' + filename;

            // download
            downloadResource(url, filename);
        } else {
            // open url in new tab
            openResource(url);
        }
    }

    function openResource(url) {
        // open url in new tab
        var a = document.createElement('a');
        a.href = url;
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function forceDownload(blob, filename) {
        // ref: https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
        var a = document.createElement('a');
        a.download = filename;
        a.href = blob;
        // For Firefox https://stackoverflow.com/a/32226068
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    // Current blob size limit is around 500MB for browsers
    function downloadResource(url, filename) {
        // ref: https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
        if (!filename) filename = url.split('\\').pop().split('/').pop();
        fetch(url, {
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'cors'
        })
            .then(response => response.blob())
            .then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);
                forceDownload(blobUrl, filename);
            })
            .catch(e => console.error(e));
    }
})();