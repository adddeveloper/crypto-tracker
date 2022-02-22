var url, p1, p2, holder, img;
img = "https://www.coinlore.com/img/25x25/";
holder = document.querySelector(".holder-in-window");
p1 = 0;
url = "https://api.coinlore.net/api/tickers/?start="+p1+"&limit="+"30";
/*
csupply: "18945677.00"
id: "90"
market_cap_usd: "755814649764.44"
msupply: "21000000"
name: "Bitcoin"
nameid: "bitcoin"
percent_change_1h: "-0.45"
percent_change_7d: "-5.60"
percent_change_24h: "-0.14"
price_btc: "1.00"
price_usd: "39893.78"
rank: 1
symbol: "BTC"
tsupply: "18945677"
volume24: 10615675862.45487
volume24a: 17074781219.82185
*/

function again(){
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        for(var i=0; i<data.data.length; i++){
            var names, priceOne, symbol, rank, market_cap; 
            market_cap = data.data[i].market_cap_usd;
            rank = data.data[i].rank;
            names =data.data[i].name;
            priceOne=data.data[i].price_usd;
            symbol = data.data[i].symbol;
            var change1h, change24h, changeweek, changevolume;
            change1h = data.data[i].percent_change_1h;
            change24h = data.data[i].percent_change_24h;
            changeweek = data.data[i].percent_change_7d;
            changevolume = data.data[i].volume24;
            // style
            /*
            1h
            25h
            weekly
            volume 24
            */
            var cup, cdown, color1h, color24h, colorweek;
            cup = '<i class="bi bi-caret-up-fill"></i>';
            cdown = '<i class="bi bi-caret-down-fill"></i>';
            if(change1h < 0){
                color1h = "red";
                change1h = cdown+change1h;
            } else if(change1h > 0){
                color1h = "green";
                change1h = cup+change1h;
            } else{
                color1h = "black";
            }

            if(change24h < 0){
                color24h = "red";
                change24h = cdown+change24h;
            } else if(change24h > 0){
                color24h = "green";
                change24h = cup+change24h;
            } else{
                color24h = "black";
            }

            if(changeweek < 0){
                colorweek = "red";
                changeweek = cdown+changeweek;
            } else if(changeweek > 0){
                colorweek = "green";
                changeweek = cup+changeweek;
            } else{
                colorweek = "black";
            }
            holder.innerHTML +=
            '<div class="containers align-items-center d-flex flex-row justify-content-start p-2">'+
            '<div class="align-items-center d-flex flex-nowrap my-auto">'+
                '<p class="p-1 titlespara">'+
                    '<span style="color: black;">'+
                        rank+
                    '</span>'+
                '</p>'+
            '</div>'+
            '<div class="align-items-center d-flex justify-content-center me-5 mx-3 namesheader">'+
                '<img style="width: 25px; height: 25px;" src="'+img+data.data[i].nameid+'.png'+'" class="me-2">'+
                '<div class="d-flex flex-column">'+
                    '<span class="font-me p-0 p-0" style="font-size: 1rem;">'+symbol+'</span>'+
                    '<span class="font-me p-0 p-0" style="font-size: 0.8rem;font-weight: bold;">'+names+'</span>'+
                '</div>'+
            '</div>'+
            '<p class="namesheader p-1"> <b>$</b>'+priceOne+'</p>'+
            '<div class="align-items-center d-flex flex-nowrap my-auto">'+
                '<p class="p-1 titlespara">'+
                    '<span style="color: black;"> <b>$</b>'+
                        market_cap+
                    '</span>'+
                '</p>'+
                '<p class="p-1 titlespara">'+
                    '<span style="color:'+color1h+';">'+
                        change1h+
                    '% </span>'+
                '</p>'+
                '<p class="p-1 titlespara">'+
                    '<span style="color:'+color24h+';">'+
                        change24h+
                    '% </span>'+
                '</p>'+
                '<p class="p-1 titlespara">'+
                    '<span style="color:'+colorweek+';">'+
                        changeweek+
                    '% </span>'+
                '</p>'+              
                '<p class="p-1 titlespara">'+
                    '<span style="color:black;"> <b>$</b>'+
                        changevolume+
                    '</span>'+
                '</p>'+
            '</div>'+
        '</div>'+
        '<hr/>'
        }
    });
} again()

var sbutton = document.getElementById("sbutton");
sbutton.addEventListener("click", ()=>{
    p1 += 30;
    url = "https://api.coinlore.net/api/tickers/?start="+p1+"&limit="+"30";
    console.log(p1, url)
    again()
})