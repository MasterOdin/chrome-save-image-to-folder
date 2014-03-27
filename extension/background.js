var menu_obj = {
    'title': "Save Image in Folder...",
    'contexts': ["image"],
    'onclick': (function() { return false; })
};

var parent_id = chrome.contextMenus.create(menu_obj);
console.log(chrome.downloads.showDefaultFolder());
var folders = JSON.parse(localStorage.getItem("folders"));
for (var i = 0; i < Object.keys(folders).length; i++) {
    var child_obj = {
        'title': folders[i],
        'contexts': ["all"],
        'onclick': (function(info,tab) { 
            console.log(info['srcUrl']);
            var url = info['srcUrl'];
            var filename = url.substring(url.lastIndexOf('/')+1);
            chrome.downloads.download({url:url,filename:filename,saveAs: false});
        }),
        'parentId': parent_id
    };
    chrome.contextMenus.create(child_obj);
}

