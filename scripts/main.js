
function init(){
    $("#htmlViewport").addClass("hidden");
    $("#cssViewport").addClass("hidden");
    $("#jsViewport").addClass("hidden");
    $("#contentViewport").addClass("hidden");
    $("#html").trigger("click");
    $("#content").trigger("click");
}
function updateContents(){
    $("#contentViewport").contents().find("html").html("<html><head><style type='text/css'>"+$("#cssViewport").val()+"</style></head><body>"+$("#htmlViewport").val()+"</body></html>");
    document.getElementById("contentViewport").contentWindow.eval($("#jsViewport").val());
}
$(".language-toggle").click(function(){
    $(this).toggleClass("selected");
    var viewportId = $(this).attr("id")+"Viewport";
    $("#"+viewportId).toggleClass("hidden");
    var numHidden = 4-$(".hidden").length;
    if(numHidden==0){return;}
    $(".viewport").width($(window).width()/numHidden - 5);
});


$("textarea").on('change keyup paste',function(){
    updateContents();
});

$("textarea").keydown(function(k){
    if(k.keyCode==9){
        var caretStart = this.selectionStart;
        var caretEnd = this.selectionEnd;
        $(this).val($(this).val().substring(0,caretStart)+
                    "\t"+
                   $(this).val().substring(caretEnd));
        $(this).selectionStart = ++caretStart;
        $(this).selectionEnd = ++caretEnd;
        k.preventDefault();
    }
});
 


$(".language-toggle").hover(function(){
    $(this).addClass("highlighted");
}, function(){
    $(this).removeClass("highlighted");
});

$(".viewport").height($(window).height()-$("#topBar").height()-28);

init();

