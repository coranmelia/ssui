(function (global) {

    var dc = {};

// List URL's
    var homeHtml = "./Home.html";
    var MenuHtml = "./menu.html";
    var DetailHtml = "./detail.html";
    var locationHtml = "./location.html";
    var main = document.querySelector("#main-content");

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
                    main.innerHTML = responseText;
                    var url="./index.html";
                    history.pushState("./Home.html",null, url);
                },
                false);
            // add highlight to menu item HOME
            $( ".home span" ).addClass( "onload" );

        });

    dc.loadHome = function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                main.innerHTML = responseText;
                var url="./index.html";
                history.pushState("./Home.html",null, url);
            },
            false);
        // remove any highlight and add to HOME
        $("span").removeClass("onload");
        $( ".home span" ).addClass( "onload" );


    };

    dc.loadMenu= function (){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(
                MenuHtml,
                function (responseText) {
                    main.innerHTML = responseText;
                    var url="index.html";
                    history.pushState("./menu.html",null, url);
                },
                false);
            // remove any highlight and add to MENU
            $("span").removeClass("onload");
            $(".navmenu span").addClass("onload");

    };

    dc.loadDetail= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            DetailHtml,
            function (responseText) {
                main.innerHTML = responseText;
                var url="index.html";
                history.pushState("./detail.html",null, url);
            },
            false);

    };

    dc.loadLocation= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            locationHtml,
            function (responseText) {
                main.innerHTML = responseText;
                var url="index.html";
                history.pushState("./location.html",null, url);
            },
            false);

        $("span").removeClass("onload");
        $(".location span").addClass("onload");
    };

    window.addEventListener('popstate',
        function(e){
            var character = e.state;
            if(character == null){
                $ajaxUtils.sendGetRequest(homeHtml,
                    function (responseText) {
                        main.innerHTML = responseText;
                    },
                    false);
            } else {
                $ajaxUtils.sendGetRequest(
                    character,
                    function (responseText) {
                        main.innerHTML = responseText;
                    },
                    false);

                $("span").removeClass("onload");
                if(character === MenuHtml || character === DetailHtml) {
                    $(".navmenu span").addClass("onload");
                }
                if(character === homeHtml){
                    $( ".home span" ).addClass( "onload" );
                }
                if(character === locationHtml){
                    $( ".location span" ).addClass( "onload" );
                }
            }
    });

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
