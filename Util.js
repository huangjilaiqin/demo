'use strict';

export function sleep(times){
  return new Promise((resolve,reject)=>setTimeout(()=>resolve(),times));
}
