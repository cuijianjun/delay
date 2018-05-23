//index.js
//获取应用实例
const app = getApp()

const rule = {
  lat: '40.01900100708008',//公司法人纬度
  lng: '116.46380615234375',//公司的经度
  maxDistance: 500 ,//最大允许距离偏差
  bssid: "08:9b:4b:95:99:8d",//约定的无线ID
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    locationChecked: false,//位置信息是否已经确定
    distance: '',//当前用户的距离
    wifiChecked:false,//wifi是否确认
    isChecked:false//最终状态
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //按钮绑定的事件处理
  bindGetLocationTap:function(){
    let that =this;
    wx.getLocation({
      success: function(res) {
        //判断距离
        console.log(res)
        const distance = that.getDistance(res.latitude,res.longitude)
        if (distance<=rule.maxDistance){
          //在有效范围内
          that.setData({
            distance:distance.toFixed(2),
            locationChecked: true
          })
          that.openWifi()
        }else{
          wx.showModal({
            title: '提示',
            content: '当前的位置已经超出了范围',
          })
          that.setData({
            distance: distance.toFixed(2),
            locationChecked: false
          })
        }
      },
    })
  },
  //计算用户位置与预设位置的距离
  getDistance:function(lat,lng){
    let distance = 0;
    const radLat1 = lat * Math.PI / 180;
    const radLat2 = rule.lat * Math.PI / 180;
    const deltaLat = radLat1 - radLat2;
    const deltaLng = lng * Math.PI / 180 - rule.lng * Math.PI / 180;
    distance = 2 * Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(deltaLat / 2), 2)
        +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)
      )
    );
    return distance * 6378137;
  },
  //开启wifi
  openWifi:function(){
    let that = this;
    wx.startWifi({
      success:function(res){
        console.log(res)
        that.getCurrentWifi()
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '无法开始wifi，请开启wifi重试',
        })
      }
    })  
  },
  //获取当前链接的wifi
  getCurrentWifi: function(){
    let that =  this;
    wx.getConnectedWifi({
      success: function(res){
        console.log(res)
        that.checkCurrentWifi(res.wifi)
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '未连接到wifi',
        })
      }
    })
  },
  //判断当前l链接的wifi是否为公司指定的wifi
  checkCurrentWifi:function(wifi){

    if(rule.bssid === wifi.BSSID){
      //确认验证成功
      this.setData({
        wifiChecked:true,
        isChecked:true
      })
      wx.showModal({
        title: '提示',
        content: '您已经完成打卡',
      })
      //还需要获取当前用户的openID，然后最终确认该用户已经完成打卡
      this.getCurrentUserOpenId()
    }else{
      wx.showModal({
        title: '提示',
        content: '您并没有连接到指定的路由器,wifi验证失败',
      })
    }
  },
  //获取当前用户的OpenId,不安全的做法
  //大家千万不要在实际项目中这么做
  getCurrentUserOpenId:function(){
    const appId = "wx9cb9d33791ddc3f8"
    const appSecret = 'c321da4550bdb6b9887f549aa6c7abc2'
    wx.login({
      success:function(res){
        const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + res.code + '&grant_type=authorization_code'
        wx.request({
          url:url,
          success: function(response){
            console.log(response)
            wx.showModal({
              title: '成功提示',
              content: '尊敬的用户，您的标识为'+response.data.openid+',您已经成功打卡，并且已经提交到服务器',
            })
          }
        })
      }
    })

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
