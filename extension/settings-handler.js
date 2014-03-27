jQuery(document).ready(function() {
    var count = 0;
    var folders = {};
    var folders = JSON.parse(localStorage.getItem('folders'));
    for (var i = 0; i < Object.keys(folders).length; i++) {
        jQuery('.folder-list').append("<div class='folder-elem' id='"+i+"'>"+
            "Folder <span class='num'>"+(i+1)+"</span>: <input type='input' name='folders[]' "+
            "id='"+i+"' class='folder' value='"+folders[i]+"' />"+
            "&nbsp;<input type='submit' class='minus' value='-' /></div>");
        minus_click(this);
    }
    var total = Object.keys(folders).length
    jQuery('input.folder').each(function() {
        if (count >= Object.keys(folders).length) {
            jQuery(this).val("");
        } else {
            jQuery(this).val(folders[count++]);
        }
    });

    jQuery('input.add').click(function() {
        jQuery('.folder-list').append("<div id='"+total+"'>"+
            "Folder <span class='num'>"+(total+1)+"</span>: <input type='input name='folders[]' "+
            "id='"+total+"' class='folder' value='' />"+
            "&nbsp;<input type='submit' class='minus' value='-' /></div>");
        minus_click(this);       
        total++;
    });

    jQuery('input.submit').click(function() {
        count = 0;
        jQuery('input.folder').each(function() {
            if (jQuery(this).val() != "")
                folders[count++] = jQuery(this).val();
        });
        localStorage.setItem('folders',JSON.stringify(folders));
        chrome.runtime.reload();
    });
});

function minus_click(that) {
    jQuery('.minus').click(function() {
        jQuery(this).parent().remove();
        var count = 0;
        jQuery('.folder-elem').each(function() {
            jQuery(this).children(0).text((count+1));
            jQuery(this).children(1).attr("id",count);
            count++;
        });
    });
}
