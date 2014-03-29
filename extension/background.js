var menu_obj = {
    'title': "Save Image in Folder...",
    'contexts': ["image"],
    'onclick': (function() { return false; })
};

var parent_id = chrome.contextMenus.create(menu_obj);
var folders = JSON.parse(localStorage.getItem("folders"));
var items = {};
for (var i = 0; i < Object.keys(folders).length; i++) {
    var child_obj = {
        'title': folders[i],
        'contexts': ["all"],
        'onclick': (function(info,tab) { 
            var url = info['srcUrl'];
            var dir = items[info['menuItemId']];
            var filename = dir+url.substring(url.lastIndexOf('/')+1);
            chrome.downloads.download({url:url,filename:filename,saveAs: false},function() {
                console.log(chrome.runtime.lastError);
            });
        }),
        'parentId': parent_id
    };
    var id = chrome.contextMenus.create(child_obj);
    items[id] = folders[i];
}
