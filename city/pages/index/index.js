//引入城市的数据
var city  = require("../../utils/city.js")
console.log(city)
Page({
    //定义数据
    data:{
        //选中城市
        chooseCity:"--",
        //选中的城市
        searchLetter:[],
        //窗口高度
        windowHeight:0,
        //字母高度
        itemHeight:0,
        //城市数据
        cityList: [],
        //历史记录
        cityHistory: [],
        //热门城市
        hotCity:[],
        //显示的字母
        showLetter:''
    },
    //页面加载完成
    onLoad: function() {
        //获取屏幕的高度
        var windowHeight = wx.getSystemInfoSync().windowHeight
        //每个字母的高度
        var itemHeight = (windowHeight - 50)/city.searchLetter.length
        //获取选中过得城市
        var cityHistory = wx.getStorageSync('cityHistory');
        //更新数据
        this.setData({
            searchLetter: city.searchLetter,
            windowHeight:windowHeight,
            itemHeight: itemHeight,
            cityList:city.cityList,
            hotCity:city.hotCity,
            //更新选中的城市。如果不存在则给默认值
            chooseCity:cityHistory[0] || '',
            cityHistory: cityHistory,
        })
    },
    updateChooseCity: function(e){
        var that= this;
        //获取点击城市
        var chooseCity = e.target.dataset.city
        //获取本地存储中，所有点击过得城市
        var cityHistory = wx.getStorageSync("cityHistory") || []
        //当前选中的应给作为第一个成员
        cityHistory.unshift(chooseCity)
        //最多只能存6个
        cityHistory = cityHistory.slice(0,6)
        cityHistory = Array.from(new Set(cityHistory));
        //更新本地存储
        wx.setStorage({
            key: 'cityHistory',
            data: cityHistory,
            //更新数据
            success:function(){
                that.setData({
                    chooseCity: chooseCity,
                    cityHistory: cityHistory
                })
            }
        })
        
    },
    changeShowLetter:function(e){
        //获取点击字母
        var letter = e.target.dataset.letter;
        //更新数据
        this.setData({
            showLetter: letter
        })
    },
    letterTouchMove:function(e){
        //获取手指所在容器元素内的位置
        var pageY = e.touches[0].pageY -50
        //获取每一个字母的高度
        var itemHeight = this.data.itemHeight
        //包含的字母
        var  index = Math.floor(pageY/itemHeight);
        //根据索引值获取字母
        var letter = this.data.searchLetter[index];
        //如果当前letter和选中letter不同的话
        if(letter && letter != this.data.showLetter){
            //更新显示的字母
            this.setData({
                showLetter: letter
            })
        }
    }
})
