import fs from 'fs'
import path from 'path'
import xlsx from 'node-xlsx'

import wx from './utils/wx/index'
import zfb from './utils/zfb/index'
import util from './utils/util'

let month = '10月份';

let list = [['--','--','账户','收入', '提现', '手续费']];

let monthPath = path.resolve(`docs/${month}`);
let monthList = fs.readdirSync(monthPath);
for(let _mfile of monthList){
    let filePath = path.join(monthPath, _mfile);
    let stat = fs.statSync(filePath);
    if(stat.isDirectory()){
        if(_mfile.indexOf('微信')>=0){
          let _list = wx.analysis(filePath);
          list = list.concat(_list);
        }else if(_mfile.indexOf('支付宝')>=0){
          let _list = zfb.analysis(filePath);
          list = list.concat(_list);
        }
    }
}
let sum1 = 0, sum2 = 0, sum3 = 0;
for(let i in list){
  if(i==0)continue;
  if(list[i][3]) sum1 = util.floatAdd(sum1, list[i][3]);
  if(list[i][4]) sum2 = util.floatAdd(sum2, list[i][4]);
  if(list[i][5]) sum3 = util.floatAdd(sum3, list[i][5]);
}

list.push(['','','总计', sum1, sum2, sum3])
console.log(list)
var buffer = xlsx.build([
  {
    name:'sheet1',
    data: list
  }
]);
//将文件内容插入新的文件中
fs.writeFileSync(`${month}统计.xlsx`,buffer,{'flag':'w'});