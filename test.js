'use strict';

//import {joinDict} from './Util';
//
function joinDict(dict,k2v='=',v2v='&'){
  let rs=[];
  for(let k in dict)
    rs.push(`${k}${k2v}${dict[k]}`);
  return rs.join(v2v);
}

let kk={
  name:'hj',
  age:25,
  k:'',
};

console.log(joinDict(kk));
