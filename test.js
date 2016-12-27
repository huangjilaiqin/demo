'use strict';



let kk=['hj','lq'];
let url='http://static.qiuqiusd.com/upload/pic/post/20161227/db24_405x592';

let r=/(\d+)x(\d+)$/.exec(url);
console.log(r);
r=url.match(/(\d+)x(\d+)$/);
console.log(r[1],r[2]);

