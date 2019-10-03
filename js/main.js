(function (global) {

    var dc = {};

// List URL's
    let homeHtml = "./Home.html";
    let MenuHtml = "./menu.html";
    let DetailHtml = "./detail.html";
    let locationHtml = "./location.html";
    let main = document.querySelector("#main-content");

// inserting innerHTML for select
    let insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

// Show loading icon inside element identified by selector
    let showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='./css/img/preloader.gif'></div>";
        insertHtml(selector, html);
    };

// On page load

    // default load
    document.addEventListener("DOMContentLoaded",
        function (event) {

            // First load, show home view
            showLoading("#main-content");
            // call server
            $ajaxUtils.sendGetRequest(homeHtml,
                function (responseText) {
                    main.innerHTML = responseText;
                    let url="./index.html";
                    history.pushState("./Home.html",null, url);
                },
                false);
            // add highlight to menu item HOME
            $( ".home span" ).addClass( "onload" );

        });

    // home load
    dc.loadHome = function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                main.innerHTML = responseText;
                let url="./index.html";
                // push the state to history
                history.pushState("./Home.html",null, url);
            },
            false);
        // remove any highlight and add to HOME
        $("span").removeClass("onload");
        $( ".home span" ).addClass( "onload" );


    };

    // menu load
    dc.loadMenu= function (){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(
                MenuHtml,
                function (responseText) {
                    main.innerHTML = responseText;
                    let url="index.html";
                    // push the state to history
                    history.pushState("./menu.html",null, url);
                },
                false);
            // remove any highlight and add to MENU
            $("span").removeClass("onload");
            $(".navmenu span").addClass("onload");

    };

    // detail load
    dc.loadDetail= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            DetailHtml,
            function (responseText) {
                main.innerHTML = responseText;
                let url="index.html";
                // push the state to history
                history.pushState("./detail.html",null, url);
            },
            false);

    };

    // location load
    dc.loadLocation= function (){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            locationHtml,
            function (responseText) {
                main.innerHTML = responseText;
                let url="index.html";
                // push the state to history
                history.pushState("./location.html",null, url);
            },
            false);

        // reset menu item highlight to LOCATION
        $("span").removeClass("onload");
        $(".location span").addClass("onload");
    };

    // pop state from history
    window.addEventListener('popstate',
        function(e){
            let character = e.state;
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

                // reset menu item highlight
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

/* other functions such as toggle dropdown menu */
$(document).ready()
{
    // glazing dropdown menu
    function gf() {
        document.getElementById("gmenu").classList.toggle("show");

        // change text in parent menu and calculate total if both count and glazing have been selected
        $("#gmenu a").on("click", function () {
            let x = this.innerHTML;
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
            let x = parseInt(this.innerHTML);
            $(".count .drop").html(x);
            if($(".glazing .drop").html() != 'Choose Glazing') {
                $("#total > b").html("$" + (x * 3.95).toFixed(2));
            }
        });
    };

    // Collapse dropdown menu if clicks elsewhere
    window.onclick = function (event) {
        if (!event.target.matches('.drop')) {
            let dp = document.getElementsByClassName("dropdown-sub");
            let i;
            for (i = 0; i < dp.length; i++) {
                let openDropdown = dp[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    /* function to add an item to cart */
    function addtocart() {
        let g = $(".glazing .drop").html();
        let c = parseInt($(".count .drop").html());

        // both glazing and count need to be selected in order to add item to cart
        if(g != 'Choose Glazing' && $.isNumeric(c)) {
            $("#detail").html("Glazing: " + g + " ........... x " + c);
            $("#err1, #err2").hide();
            $(".added").show();
            $(".num").show();
            let cNum = parseInt($(".num text").html())+1;
            $(".num text").html(cNum);
        }else {
            // if either field has not been selected, show error message
            $("#err1").show();
        }
    }

    function backtodetail(){
        $(".added").hide();
    }
};
