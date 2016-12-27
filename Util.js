'use strict';

export function sleep(times){
  return new Promise((resolve,reject)=>setTimeout(()=>resolve(),times));
}

export function dateFormat(format, time){
  if(typeof(format) === 'undefined')
    return undefined;
  let date = time?new Date(time):new Date();
  let o={
    "M+":date.getMonth()+1,//month
    "d+":date.getDate(),//day
    "h+":date.getHours(),//hour
    "m+":date.getMinutes(),//minute
    "s+":date.getSeconds(),//second
    "q+":Math.floor((date.getMonth()+3)/3),//quarter
    "S":date.getMilliseconds()//millisecond
  };
  if(/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4-RegExp.$1.length));

  for(let k in o)
    if(new RegExp("("+k+")").test(format))
      format = format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length));

  return format;
};

export function time2see(old){
  let now=new Date();
  let delta=(now.getTime()-old.getTime())/1000;
  if(delta<0)
    delta=0;
  if(now.getFullYear()!=old.getFullYear())
    return dateFormat('yyyy-MM-dd hh:mm'); 
  else if(delta>86400)
    return dateFormat('MM-dd hh:mm'); 
  else if(delta>3600){
    let hours=Math.round(delta/3600);
    return hours+'小时前'; 
  }else if(delta>=60){
    let minutes=Math.round(delta/60);
    return minutes+'分钟前'; 
  }else{
    console.log(old);
    return '刚刚';
  }
}
