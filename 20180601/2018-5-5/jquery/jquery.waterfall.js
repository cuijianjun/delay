
// 所有的jQuery 插件其实都是在 jQuery 的原型上 添加的方法

jQuery.fn.waterfall = function () {
    console.log('插件被调用了');

    // 设置元素间的距离
    var gap = 10;

    // this 指的是谁？
    // this 指的是调用插件的 DOM
    // console.log(this);

    // 在 .items 中实现 .item 的瀑布流布局

    // 获得所有需要定位子无素
    var items = $(this).children();

    // 为 .items 设置为相对定位
    $(this).css({
        position: 'relative',
        left: gap / 2
    });

    // 计算每列的宽度（可以根据所要显示的列数来确定）

    // 假定 5 列
    var column = 5;

    // .items 的宽度
    var cwidth = $(this).width();

    // 每列的宽度
    var width = cwidth / column;

    // 将计算好的每列的宽度设置给所有的子元素
    items.width(width - gap);

    // 定义一个数组，来记录每一列的高度
    var h = [];

    // 需要为不同的子元素设置不同的定位坐标

    items.each(function (key, val) {
        // console.log(key);

        // 如果是第1行，top值 全部为 0 left 值为 索引值 * 定宽

        // 根据列数，来判断第1的元素
        if(key < column) {

            // 记录第1行元素的度度
            h.push($(this).height());

            $(this).css({
                position: 'absolute',
                left: key * width,
                top: 0
            });
        } else { // 除了第 1 行外，top 值为最小的列的高度
            // left 值为 列的索引值 * 定宽
            
            // console.log(h)
            var min_val = h[0];
            var min_key = 0;

            for(var i=0; i<h.length; i++) {
                if(h[i] < min_val) {
                    min_val = h[i];
                    min_key = i;
                }
            }

            // 更新最小列
            h[min_key] += $(this).height() + gap;

            $(this).css({
                position: 'absolute',
                left: width * min_key,
                top: min_val + gap
            })
        }
    });

    // console.log(h)

    h.sort(function (a, b) {
        return a < b;
    })

    // console.log(h)

    $(this).height(h[0]);
}