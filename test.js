'use strict';

//let moment require('moment');
import moment from 'moment'; 
let k=new Date(2016,11,12,8,23,45);
console.log(k);
let a=moment(k).format('MM-DD HH:mm:ss');
console.log(a);
