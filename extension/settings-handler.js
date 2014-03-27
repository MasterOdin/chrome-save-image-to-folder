jQuery(document).ready(function() {
    var folders = {};
    for(var i = 0; i < 5; i++) {
        folders[i] = "Folder "+i;
    }
    localStorage.setItem('folders',JSON.stringify(folders));
    console.log(JSON.stringify(folders));
});