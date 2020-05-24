

//实时天气请求AJAX
function getNowWeather (url) {
    const nowWeather = new XMLHttpRequest();
    nowWeather.open("GET",url);
    nowWeather.send();
    nowWeather.onreadystatechange = function () {
         if(nowWeather.readyState == 4 && nowWeather.status == 200) {
            let message = JSON.parse(nowWeather.responseText);
            document.getElementById("city").innerHTML = message.city;
            document.getElementById("now-time").innerHTML = message.update_time;
            document.getElementById("temperature").innerHTML = message.tem;
            document.getElementById("condition").innerHTML = message.wea;
            document.getElementById("win").innerHTML = message.win;
            document.getElementById("win-speed").innerHTML = message.win_speed;
            document.getElementById("win-meter").innerHTML = message.win_meter;
            document.getElementById("tem-day").innerHTML = message.tem_day;
            document.getElementById("tem-night").innerHTML = message.tem_night;
            document.getElementById("air-quality").innerHTML = message.air;
            }
    }
}

//默认为当地ip的天气
getNowWeather ("https://www.tianqiapi.com/free/day?appid=31393724&appsecret=NB6dRgZj");

//七日天气预报请求AJAX
function getSevenWea (url) {
    const sevenWea = new XMLHttpRequest();
    sevenWea.open("GET",url);
    sevenWea.send();
    sevenWea.onreadystatechange = function () {
        console.log('13')
        if(sevenWea.readyState == 4 && sevenWea.status == 200){
            console.log('13')
            let message = JSON.parse(sevenWea.responseText);    
            let li = document.getElementsByClassName("seven-wea-li")  
            let xArr = []; 
            let maxTemp = [];
            let minTemp = [];
            for(let i = 0; i < 7; i++) {
                li[i].innerHTML =`
                    <p class="data">${message.data[i].date}</p>
                    <div class="ct-daytime">
                        <p class="day-weather">${message.data[i].wea}</p>
                        <img class="wea-img">
                    </div>
                    <div class="day-wind">
                        <span>${message.data[i].win}<span>${message.data[i].win_speed}</span></span>
                    </div>
            `;
            let img = document.getElementsByClassName("wea-img")[i];
            console.log(message.data[i].wea_img)
            if(message.data[i].wea_img == 'qing'){
                img.src = "./imgs/qing.png"
            }else if(message.data[i].wea_img == 'yun'){
                img.src = "./imgs/yun.png"
            }else if(message.data[i].wea_img == 'yin'){
                img.src = "./imgs/yin.png"
            }else if(message.data[i].wea_img == 'yu'){
                img.src = "./imgs/yu.png"
            }else{
                img.src = "./imgs/yu.png"
            }
            xArr.push(message.data[i].date);
            maxTemp.push(message.data[i].tem_day);
            minTemp.push(message.data[i].tem_night);
        }
        console.log(xArr);
        console.log(maxTemp);
        console.log(minTemp);
        //天气变化的折线图
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
         type: 'line',
          data: {
                labels: xArr,
                datasets: [{
                    label: "最高气温",
                    borderColor: '#fdc472',
                    pointBackgroundColor:"#fdc472",
                    pointBackgroundColor:"#fdc472",
                    data: maxTemp,
              },
              {
                label: "最低气温",
                borderColor: '#95cdfa',
                pointBorderColor:"#95cdfa",
                pointBackgroundColor:"#95cdfa",    
                data: minTemp,
          }
            ]
            }  ,

    // 配置选项
    options: {}
});
       
    }
}

}
getSevenWea("https://www.tianqiapi.com/free/week?appid=31393724&appsecret=NB6dRgZj");

//生活指数请求AJAX
function getLifeWarrp (url) {
    let lifeWarrp = document.getElementsByClassName("life-warrp");
    const lifeGuide = new XMLHttpRequest();
    lifeGuide.open("GET",url);
    lifeGuide.send();
    lifeGuide.onreadystatechange = function () {
        if(lifeGuide.readyState == 4 && lifeGuide.status == 200){
            let message = JSON.parse(lifeGuide.responseText); 
            console.log(message)  
            for(let i = 0; i <= message.HeWeather6[0].lifestyle.length-1; i++){
                lifeWarrp[i].innerHTML = `
                        <div class="life-content">
                            <img src="./imgs/${i}.png">
                            <p>${message.HeWeather6[0].lifestyle[i].brf}</p>
                            <p>${message.HeWeather6[0].lifestyle[i].txt}</p>
                        </div>
                `
            }
        }
    }

}
//默认当地IP地址得生活指数
getLifeWarrp("https://free-api.heweather.net/s6/weather/lifestyle?location=auto_ip&key=6771de630d5843c9953433bb6567bda1");


//指定地点的天气
let search = document.getElementsByClassName("search")[0];
let localArr = [];
search.addEventListener("keydown",(event) => {
    if(event.keyCode == 13){
        let i = 0;
        let value = document.getElementsByClassName("search")[0].value;
        localArr.unshift(value);
        //指定地点的实时天气
        getNowWeather(`https://www.tianqiapi.com/free/day?city=${value}&appid=31393724&appsecret=NB6dRgZj`);
        //指定地点的七日天气预报
        getSevenWea(`https://www.tianqiapi.com/free/week?city=${value}&appid=31393724&appsecret=NB6dRgZj`);
        //指定地点的生活指数
        getLifeWarrp(`https://free-api.heweather.net/s6/weather/lifestyle?location=${value}&key=6771de630d5843c9953433bb6567bda1`)

        search.blur();
        i++;
    }
    search.value = '';
})


//获取历史记录按钮，绑定事件，显示历史记录
let localBtn = document.getElementById("btn");
let localBox = document.getElementById("local-box");
let localLi = document.getElementById("local-li");
let count = 1;
localBtn.onclick = function () {
    if(count%2 === 1){
        console.log(localArr)
        for(let j = 0; j <= localArr.length-1; j++){
            localLi.innerHTML += `
            <span>${localArr[j]}</span>
            `;  
        }
    }
    if(count%2 === 0){
        localLi.innerHTML = ``;
        
    }
    count++;
}


