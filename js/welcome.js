// 获取IP信息的函数
function getIpInfo() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: 'https://apis.map.qq.com/ws/location/v1/ip',
            data: {
                key: '5RQBZ-HU26J-J2OFB-DO3QY-MM3UO-WLFCD',
                output: 'jsonp',
            },
            dataType: 'jsonp',
            success: function(response) {
                // 检查返回状态
                if (response.status === 0) {
                    resolve(response);
                } else {
                    reject(new Error(response.message || '获取位置信息失败'));
                }
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

// 计算距离的函数
function getDistance(lng1, lat1, lng2, lat2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s.toFixed(2);
}

async function showWelcome() {
    try {
        // 等待获取位置信息
        const response = await getIpInfo();
        
        // 检查返回数据的完整性
        if (!response || response.status !== 0 || !response.result || !response.result.location) {
            throw new Error('位置信息不完整');
        }

        const result = response.result;
        const location = result.location;
        const adInfo = result.ad_info;

        // 计算距离
        let dist = getDistance(
            112.9454732, 
            28.2348894, 
            location.lng, 
            location.lat
        );

        let pos = adInfo.nation;
        let ip = result.ip;
        let posdesc;

        //根据国家、省份、城市信息自定义欢迎语  
        switch (adInfo.nation) {  
            case "日本":  
                posdesc = "よろしく，一起去看樱花吗";  
                break;  
            case "美国":  
                posdesc = "Let us live in peace!";  
                break;  
            case "英国":  
                posdesc = "想同你一起夜乘伦敦眼";  
                break;  
            case "俄罗斯":  
                posdesc = "干了这瓶伏特加！";  
                break;  
            case "法国":  
                posdesc = "C'est La Vie";  
                break;  
            case "德国":  
                posdesc = "Die Zeit verging im Fluge.";  
                break;  
            case "澳大利亚":  
                posdesc = "一起去大堡礁吧！";  
                break;  
            case "加拿大":  
                posdesc = "拾起一片枫叶赠予你";  
                break;  
            case "中国":  
                pos = adInfo.province + " " + adInfo.city + " " + adInfo.district;  
                ip = result.ip;  
                switch (adInfo.province) {  
                    case "北京市":  
                        posdesc = "北——京——欢迎你~~~";  
                        break;  
                    case "天津市":  
                        posdesc = "讲段相声吧。";  
                        break;  
                    case "河北省":  
                        posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";  
                        break;  
                    case "山西省":  
                        posdesc = "展开坐具长三尺，已占山河五百余。";  
                        break;  
                    case "内蒙古自治区":  
                        posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";  
                        break;  
                    case "辽宁省":  
                        posdesc = "我想吃烤鸡架！";  
                        break;  
                    case "吉林省":  
                        posdesc = "状元阁就是东北烧烤之王。";  
                        break;  
                    case "黑龙江省":  
                        posdesc = "很喜欢哈尔滨大剧院。";  
                        break;  
                    case "上海市":  
                        posdesc = "众所周知，中国只有两个城市。";  
                        break;  
                    case "江苏省":  
                        switch (adInfo.city) {  
                            case "南京市":  
                                posdesc = "这是我挺想去的城市啦。";  
                                break;  
                            case "苏州市":  
                                posdesc = "上有天堂，下有苏杭。";  
                                break;  
                            default:  
                                posdesc = "散装是必须要散装的。";  
                                break;  
                        }  
                        break;  
                    case "浙江省":  
                        posdesc = "东风渐绿西湖柳，雁已还人未南归。";  
                        break;  
                    case "河南省":  
                        switch (adInfo.city) {  
                            case "郑州市":  
                                posdesc = "豫州之域，天地之中。";  
                                break;  
                            case "南阳市":  
                                posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";  
                                break;  
                            case "驻马店市":  
                                posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";  
                                break;  
                            case "开封市":  
                                posdesc = "刚正不阿包青天。";  
                                break;  
                            case "洛阳市":  
                                posdesc = "洛阳牡丹甲天下。";  
                                break;  
                            default:  
                                posdesc = "可否带我品尝河南烩面啦？";  
                                break;  
                        }  
                        break;  
                    case "安徽省":  
                        posdesc = "蚌埠住了，芜湖起飞。";  
                        break;  
                    case "福建省":  
                        posdesc = "井邑白云间，岩城远带山。";  
                        break;  
                    case "江西省":  
                        posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";  
                        break;  
                    case "山东省":  
                        posdesc = "遥望齐州九点烟，一泓海水杯中泻。";  
                        break;  
                    case "湖北省":  
                        posdesc = "来碗热干面！";  
                        break;  
                    case "湖南省":  
                        posdesc = "74751，长沙斯塔克。";  
                        break;  
                    case "广东省":  
                        posdesc = "老板来两斤福建人。";  
                        break;  
                    case "广西壮族自治区":  
                        posdesc = "桂林山水甲天下。";  
                        break;  
                    case "海南省":  
                        posdesc = "朝观日出逐白浪，夕看云起收霞光。";  
                        break;  
                    case "四川省":  
                        posdesc = "康康川妹子。";  
                        break;  
                    case "贵州省":  
                        posdesc = "茅台，学生，再塞200。";  
                        break;  
                    case "云南省":  
                        posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";  
                        break;  
                    case "西藏自治区":  
                        posdesc = "躺在茫茫草原上，仰望蓝天。";  
                        break;  
                    case "陕西省":  
                        posdesc = "来份臊子面加馍。";  
                        break;  
                    case "甘肃省":  
                        posdesc = "羌笛何须怨杨柳，春风不度玉门关。";  
                        break;  
                    case "青海省":  
                        posdesc = "牛肉干和老酸奶都好好吃。";  
                        break;  
                    case "宁夏回族自治区":  
                        posdesc = "大漠孤烟直，长河落日圆。";  
                        break;  
                    case "新疆维吾尔自治区":  
                        posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";  
                        break;  
                    case "台湾省":  
                        posdesc = "我在这头，大陆在那头。";  
                        break;  
                    case "香港特别行政区":  
                        posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";  
                        break;  
                    case "澳门特别行政区":  
                        posdesc = "性感荷官，在线发牌。";  
                        break;  
                    default:  
                        posdesc = "带我去你的城市逛逛吧！";  
                        break;  
                }  
                break;  
            default:  
                posdesc = "带我去你的国家逛逛吧。";  
                break;  
        }  
  
        // 获取时间问候语
        let timeChange = getTimeGreeting();

        // 更新DOM
        const welcomeInfo = document.getElementById("welcome-info");
        if (welcomeInfo) {
            welcomeInfo.innerHTML = `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
        }
    } catch (err) {
        console.error("获取位置信息失败:", err);
        // 显示一个友好的错误信息
        const welcomeInfo = document.getElementById("welcome-info");
        if (welcomeInfo) {
            welcomeInfo.innerHTML = "欢迎访问本站！";
        }
    }
}

// 将时间问候语提取为独立函数
function getTimeGreeting() {
    let date = new Date();
    let hours = date.getHours();
    
    if (hours >= 5 && hours < 11) return "<span>上午好</span>，一日之计在于晨！";
    if (hours >= 11 && hours < 13) return "<span>中午好</span>，该摸鱼吃午饭了。";
    if (hours >= 13 && hours < 15) return "<span>下午好</span>，懒懒地睡个午觉吧！";
    if (hours >= 15 && hours < 16) return "<span>三点几啦</span>，一起饮茶呀！";
    if (hours >= 16 && hours < 19) return "<span>夕阳无限好！</span>";
    if (hours >= 19 && hours < 24) return "<span>晚上好</span>，夜生活嗨起来！";
    return "夜深了，早点休息，少熬夜。";
}

// 确保在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', showWelcome);
document.addEventListener('pjax:complete', showWelcome);
