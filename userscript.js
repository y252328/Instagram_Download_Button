// ==UserScript==
// @name         IG Download Button
// @namespace    https://github.com/y252328/Instagram_Download_Button
// @version      0.9
// @description  Add download button to download media in the post and the story in Instagram
// @author       ZhiYu
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('');
    };

    var svgTemplate = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="24" width="24"
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
</svg>
`;
    var checkExistTimer = setInterval(function() {
        // check story
        if (document.getElementsByClassName("story-dl-btn").length == 0) {
            if(document.querySelector('span[aria-label="功能表"]')) {
//                 let iconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC10lEQVR4nO2YPWsUURiFn9dEiBqRtAFRsdHCRgIpjGKjphIT/Ar4A6KFKfM/rPwDdolfVRIJBu3EpLEwnaC1wdhphGOxd9bZ2ZnszjIzb5D7wMLOvXffe86ZO7NzB5yQNCPpY/jMeOlwQdKIpB39Y0fSiIeWQx6TApeAsdTxWGhrHK8ADvfZVjteARwYYgDeAryJAXgL8CYG4C3AmxiAtwBvYgDeAryJAXgL8CYG4C3AmxiAtwBvYgDeAryJAXgL8CYG4C3AmxiAtwBvYgDeAryJAXgL8CYG4C3AmxiAtwBvYgBVF5R0pOqaddauLABJo5KeAbuS3kqaqLD2hKQN4KekJUmjVdWuDEkP1ckPSZMFY6fVzXTB2MlQK82jqnS3V4CkIUnzktYlLQ6Q8unM8QlgtSiEfgi/XQ210pwqWWc0eFoPHofyBs1mUl4sOclZSb9yzmzXSuhnBRSceUnak3SupLbFTI3ZvEHLmUFbZSYJNW5K+t0rhF4B9DB/ewBdW5k6y0lf+iZ4LPO7o2UnMrPXwB1gL9PV9+Wg4mX/B5gzs6Wyuuj20vZa+d+gmb1iwBBqMr8vtTwIhRDuUhACkBdC4+Y7kLSSuU62K6h5q+Ce0C8DXfM5OrYzdVeSvlofhc3sJXCP7pXQD42c+dr3Amb2gvIhNLPsaWgzFEK4T8tYLxozDw3uBs3sOa2VsF8IjZqHhrfDIYSildC4eXB4H2Bmy8AcnSG4mAcYbnpCADNbkvQVeByanpjZBw8tLgEABMMPvOZPiK/EUt+/Z/rGdRDfvJQkeBjPNLe9pgPIbn+PAws16WqSBVpe0rS9WvJF0mXgXU6Bz8AbQHWoqxEDrgHnc/qumNn7ZFAbSavA9fq1ubJmZjeSg2wAJ4FPdG9J/xd2gQtm9i1p6PgXCB1TwGbDwppgE5hKm4fMCkiQNAzMA1eBi8CZutXVxBdaN7wN4KmZdT2C/wX2kXxGPmF6LgAAAABJRU5ErkJggg==';
                addDownloadBtn(document.querySelector('span[aria-label="功能表"]'), "story-dl-btn", "white");
            }
        }

        // check post
        let articleList = document.querySelectorAll("article");
        for( let i = 0 ; i < articleList.length ; i ++ ) {
            if(articleList[i].querySelector('svg[aria-label="分享貼文"]') && articleList[i].getElementsByClassName("post-dl-btn").length == 0) {
//                 let iconImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2wAAAdsBV+WHHwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALkSURBVHic7Zs7axVBGIaf10TwEhHbQFCxUUglgRRBsRFSiQZvAX9AtDBlCmv/gJV/wC7xVuUgwaCdhLSmEyzsxGjlDT6LM657Zvdc2d0vkXlh4JzdOd++77Mze3YWVmaGhyRdAx6Erw/N7JmLDw8Akg4Bn4ATYdMXYNLMvjft5UDTBwya4194wuc5DyNeAA4OuK12eQHYM0oAvA14KwHwNuCtBMDbgLcSAG8D3koAvA14KwHwNuCtBMDbgLcSAG8D3koAvA14KwHwNuCtBMDbgLcSAG8D3koAvA14KwHwNuCtBMDbgLcSAG8D3koAqi4o6XDVNeusXRkASROSngBfJb2WNFNh7RlJm8A3SauSJqqqjZlV0oC7gOXaLjDbpe981NeA+S59Z0OtfN97VfnORoCkMUlLkjYkrYxA+VT0/TjQkjQ7ZJ1M4betUCuvk0PWmQiZNkLGsWxnjvQCnZRXhhwBZ4AfFM9sYSQwwAig/Mwb8As4O6S3lajGQrYv12kt6rQ9wjS4AvzsB6EfgD7hr4/gazuqs1aYAsDRaOQc6TGqSmVmL4EbwWheA0+HHsP+N7BoZqvD+qKYJcta+d+gmb1gRAg1he+pWm6EAoSbdIFAe4jHajw80HENWKdznuxU8Nd4lfJrwqBtpDlf4mMnqrtedg2oA+5z4BbFkTCI6j3zQbWvBaz9IsSwEBoJDw0thgKE27SD9VNj4aHB1aCZPaU9EnpBaDQ8NLwcDhC6jYTGw4PD8wAzWwMW6YTgEh5gvOkDApjZqqSPwP2w6ZGZvfPw4gIAIAS+43X8v0qPxHKfP0f7Jit98uKkkGEy2pxlzQPYjjodA5Zr8tWklmlnySvLmr05KukC8KakwHvgFe176P0kAZeBcyX7LprZW4B40dBi9IXLfmmtjswRgCnKn8T8L20XmOoKIECYBrb2gNmq2xYwHectfXtc0jiwBFwCzgOnC532hz7QvuBtAo/NrHAL/gc6o5bFjZfBgwAAAABJRU5ErkJggg==';
                addDownloadBtn(articleList[i].querySelector('svg[aria-label="分享貼文"]'), 'post-dl-btn', "black");
            }
        }

    }, 500);

    function addDownloadBtn(node, className, iconColor) {
        // add download button to post or story page and set onclick handler
        var btn = document.createElement("div");   // Create a <button> element
//         btn.innerHTML = '<img alt="download" width="25" src="' + iconSrc + '"/>';
//         btn.appendChild(genBtnSvg());
        btn.innerHTML = svgTemplate.replace('%color',iconColor);
        btn.setAttribute("class", className);
        btn.setAttribute("style", "cursor: pointer;margin-left: 16px;margin-top: 7px;");
        btn.onclick = function() {
            dlBtnClicked(btn);
        }
        node.parentNode.parentNode.appendChild(btn);
    }

    function dlBtnClicked(target) {
        // handle download button click
        if (window.location.pathname.includes('stories')) {
            handleStory(target);
        } else {
            handlePost(target);
        }
    }

    function handlePost(target) {
        // this function will extract url from target post and download it
        let articleNode = target;
        while(articleNode && articleNode.tagName !== "ARTICLE") {
            articleNode = articleNode.parentNode;
        }
        let list = articleNode.querySelectorAll('li[style][class]');
        let url = "";
        let filename = "";

        // =====================
        // = extract media url =
        // =====================
        if (list.length == 0) {
            // signle img or video
            if(document.querySelector('article  div > video')){
                url = document.querySelector('article  div > video').getAttribute('src');
            } else if(document.querySelector('article  div[role] div > img')){
                url = document.querySelector('article  div[role] div > img').getAttribute('src');
            }
        } else {
            // multiple imgs or videos
            let idx = 0;
            // check current index
            if (!document.querySelector('.coreSpriteLeftChevron')) {
                idx = 0;
            } else if (!document.querySelector('.coreSpriteRightChevron')) {
                idx = list.length-1;
            } else idx = 1;

            let node = list[idx];
            if(node.querySelector('video')) {
                url = node.querySelector('video').getAttribute('src');
            } else if(node.querySelector('img')) {
                url = node.querySelector('img').getAttribute('src');
            }
        }

        // =====================
        // = generate filename =
        // =====================
        // add url path to origin name
        filename = url.split('?')[0].split('\\').pop().split('/').pop() + filename;
        // add url path to filename
//         let pathList = window.location.pathname.split('\\').pop().split('/')
//         for (let i = pathList.length-1 ; i >= 0 ; i--) {
//             if ( pathList[i].length > 0 ) {
//                 filename = 'p_' + pathList[i] + '-' + filename;
//                 break;
//             }
//         }

        // add time to filename
        let datetime = new Date(articleNode.querySelector('time').getAttribute('datetime'))
        filename = datetime.yyyymmdd() + '_' + datetime.toTimeString().split(' ')[0].replace(/:/g, '') + '-' + filename;


        // add poster name to filename
        let posterName = articleNode.querySelector('header a').getAttribute('href').replace(/\//g, '');
        filename = posterName + '-' + filename;


        // =========================
        // = download if url valid =
        // =========================
        if(url.length > 0) {
            console.log(filename);
            downloadResource(url, filename);
        }
    }


    function handleStory(target) {
        // this function will extract url from target story and download it
        let url = ""
        if(document.querySelector('video > source')) {
            url = document.querySelector('video > source').getAttribute('src');
        } else if(document.querySelector('img[decoding="sync"]')){
            url = document.querySelector('img[decoding="sync"]').getAttribute('src');
        }
        let filename = url.split('?')[0].split('\\').pop().split('/').pop();

        // add time to filename
        let datetime = new Date(document.querySelector('time').getAttribute('datetime'))
        filename = datetime.yyyymmdd() + '_' + datetime.toTimeString().split(' ')[0].replace(/:/g, '') + '-' + filename;


        // add poster name to filename
        let posterName = document.querySelector('header a').getAttribute('href').replace(/\//g, '');
        filename = posterName + '-' + filename;
        downloadResource(url, filename);
        console.log(filename);
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


    function download(url, filename) {
        //creating an invisible element
        var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);
        //the above code is equivalent to
        // <a href="path of file" download="file name">

        document.body.appendChild(element);

        //onClick property
        element.click();

        document.body.removeChild(element);
    }

})();