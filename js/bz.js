// 切换壁纸
// 存数据
// name：命名 data：数据
function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  // 过期或有错误返回 0 否则返回数据
  if (d) {
      let t = Date.now() - d.time
      if (t < (time * 60 * 1000) && t > -1) return d.data;
  }
  return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

//# 读取背景
try {
  let data = loadData('blogbg', 1440)
  if (data) changeBg(data, 1)
  else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
  let bg = document.getElementById('web_bg')
  if (s.charAt(0) == '#') {
      bg.style.backgroundColor = s
      bg.style.backgroundImage = 'none'
  } else bg.style.backgroundImage = s
  if (!flag) { saveData('blogbg', s) }
}


// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}

function getPicture_() {
  let bg = document.getElementById("web_bg");
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    bg.style.backgroundImage = link;
    localStorage.setItem("blogbg", link);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}
// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
  let div = document.createElement('div')
  document.body.appendChild(div)
  winbox = WinBox({
      id: 'changeBgBox',
      index: 999,
      title: "切换背景",
      x: "center",
      y: "center",
      minwidth: '300px',
      height: "60%",
      background: '#c7ebe3',
      onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
      onrestore: () => { div.innerHTML = '' }
  });
  winResize();
  window.addEventListener('resize', winResize)

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
  <div id="article-container" style="padding:10px;">
    <center>
      <p>
        <button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding: 15px 0;border-radius:30px;color:white;font-size:1.1em">
          <i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景
        </button>
      </p>
    </center>
  
  <h3>1. 二次元 </h3>
  <details class="folding-tag cyan="">
    <summary> 查看二次元背景 </summary>
    <div class="content">
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/you_2.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/you_2.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/59.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/59.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/sn.png)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/sn.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/42.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/42.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/17.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/17.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/18.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/18.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/3.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/3.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/43.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/43.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/49.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/49.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/54.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/54.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/55.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/55.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/25.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/25.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/26.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/26.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/27.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/27.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/28.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/28.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/29.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/29.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/33.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/33.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/38.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/38.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/63.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/63.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/45.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/45.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/46.jpg)" class="imgbox" onclick="changeBg('url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/46.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/yuanshen1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/yuanshen1.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm15.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm15.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm2.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm2.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm7.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm7.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm8.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm8.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm3.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm3.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm11.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm11.webp)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.bitiful.net/img/dm12.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.bitiful.net/img/dm12.webp)')"></a>
      </div>
    </div>  
  </details>
  

  <h3>2. 风景</h3>
  <details class="folding-tag" cyan="">
    <summary> 查看适配的风景</summary>
    <div class="content">
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://gcore.jsdelivr.net/gh/mikeytki/CDN/img/you_1.jpg)" class="pimgbox" onclick="changeBg('url(https\://gcore.jsdelivr.net/gh/mikeytki/CDN/you_1.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.ladydaily.com/img/fj1.webp)')"></a>
      </div>
    </div>
  </details>

  <h3>3. 渐变色</h3>
  <details class="folding-tag" cyan="">
    <summary> 查看适配渐变色背景</summary>
    <div class="content">
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
      </div>
    </div>
  </details>
    
  <h3>4. 纯色</h3>
  <details class="folding-tag" cyan="">
    <summary> 查看适配纯色背景</summary>
    <div class="content">
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  
      </div>
    </div>
  </details>
  
  <h3>5. 适配手机</h3>
  <details class="folding-tag" cyan="">
    <summary> 查看适配手机背景 </summary>
      <div class="content">
        <div class="bgbox">
          <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/mb4.webp)" class="pimgbox" onclick="changeBg('url(https\://sourcebucket.s3.ladydaily.com/img/mb4.webp)')"></a>
        </div>
      </div>
  </details>
  
  
  <h3>6. 自定义背景</h3>
  <details class="folding-tag" cyan="">
    <summary> 设置自定义背景 </summary>
    <div class="content"><p></p>
      <center>
        <input type="text" id="pic-link" style="background:#c7ebe3" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://source.fomal.cc/img/home_bg.webp">
      </center>
      <p></p>
      <p></p>
      <center>
        <button class="winbox_btn" type="button" onclick="getPicture()" style="background:#c7ebe3;width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:black;line-height:2;">🌈切换背景🌈</button>
      </center>
      <p></p>
    </div>
  </details>

    
`;
}

// 适应窗口大小
function winResize() {
  let box = document.querySelector('#changeBgBox')
  if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
  var offsetWid = document.documentElement.clientWidth;
  if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
  } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
  else createWinbox();
}