// pages/friends/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [
      { icon: 'new_friends.png', title: '新的朋友', unread: 1 },
      { icon: 'group.png', title: '群聊' },
      { icon: 'tag.png', title: '标签' },
      { icon: 'mp.png', title: '公众号' }
    ],
    friends: [
      { name: 'C', header: true },
      { avatar: 'avatar_3.jpg', name: '曹操' },
      { name: 'G', header: true },
      { avatar: 'avatar_2.jpg', name: '关羽' },
      { name: 'L', header: true },
      { avatar: 'avatar_1.jpg', name: '刘备' },
      { name: 'X', header: true },
      { avatar: 'avatar_4.jpg', name: '小乔' },
      { name: 'S', header: true },
      { avatar: 'avatar_9.jpg', name: '司马懿' },
      { name: 'W', header: true },
      { avatar: 'avatar_8.jpg', name: '王朗' },
      { name: 'Z', header: true },
      { avatar: 'avatar_3.jpg', name: '张飞' },
      { avatar: 'avatar_5.jpg', name: '周瑜' },
      { avatar: 'avatar_7.jpg', name: '诸葛亮' },
      { avatar: 'avatar_1.jpg', name: '赵云' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})