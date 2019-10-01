(function (global) {

    var dc = {};

// List URL's
    var homeHtml = "./ssui/snippet/Home.html";
    var MenuHtml = "./ssui/snippet/menu.html";
    var DetailHtml = "./ssui/snippet/detail.html";

// inserting innerHTML for select
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

// Show loading icon inside element identified by selector
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='./css/img/preloader.gif'></div>";
        insertHtml(selector, html);
    };

// On page load
    document.addEventListener("DOMContentLoaded",
        function (event) {

            // First load, show home view
            showLoading("#main-content");

            // call server
            $ajaxUtils.sendGetRequest(homeHtml,
                function (responseText) {
                    document.querySelector("#main-content").innerHTML = responseText;
                },
                false);

            $( ".home span" ).addClass( "onload" );

        });

    dc.loadHome = function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);

        $("span").removeClass("onload");
        $( ".home span" ).addClass( "onload" );
    };

    dc.loadMenu= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            MenuHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);

        $("span").removeClass("onload");
        $( ".navmenu span" ).addClass( "onload" );

    };

    dc.loadDetail= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            DetailHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);
    };
    global.$dc = dc;

})(window);

// other functions such as toggle dropdown menu
$(document).ready()
{
    // glazing dropdown menu
    function gf() {
        document.getElementById("gmenu").classList.toggle("show");

        // change text in parent menu and calculate total if both count and glazing have been selected
        $("#gmenu a").on("click", function () {
            var x = this.innerHTML;
            $(".glazing .drop").html(x);

            if($(".count .drop").html() != 'Choose Pack Size') {
                // console.log($(".count .drop").html());
                $("#total > b").html("$" + ($(".count .drop").html() * 3.95).toFixed(2));
            }

        });
    };
    // pack size (count) dropdown menu
    function cf() {
        document.getElementById("cmenu").classList.toggle("show");

        // change text in parent menu and calculate total if both count and glazing have been selected
        $("#cmenu a").on("click", function () {
            var x = parseInt(this.innerHTML);
            $(".count .drop").html(x);
            if($(".glazing .drop").html() != 'Choose Glazing') {
                $("#total > b").html("$" + (x * 3.95).toFixed(2));
            }
        });
    };

    // Close dropdown menu if click other places
    window.onclick = function (event) {
        if (!event.target.matches('.drop')) {
            var dp = document.getElementsByClassName("dropdown-sub");
            var i;
            for (i = 0; i < dp.length; i++) {
                var openDropdown = dp[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function addtocart() {
        var g = $(".glazing .drop").html();
        var c = parseInt($(".count .drop").html());
        if(g != 'Choose Glazing' && $.isNumeric(c)) {
            // alert(c);
            $("#detail").html("Glazing: " + g + " ........... x " + c);
            $(".added").show();
            $(".num").show();
        } else {
            alert("Please fill out your glazing and your pack size!");
        }
    }

    function backtodetail(){
        $(".added").hide();
    }
};
