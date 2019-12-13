import fs from 'fs'
import path from 'path'
import xlsx from 'node-xlsx'
import iconv from 'iconv-lite'
import util from '../util'

let title = '微信';

//             收入	                     提现	                手续费
// 微信企业账户	明细表：订单总金额	    总表： 划账金额合计	    总表：手续费金额 合计	
// 微信个人账户	收入	                  中性交易	              服务费的总计

module.exports = {
    //解析个人账户
    analysisPersonal(fileObj){
        let arr = [];
        //收入
        let income = 0;

        let cashFee = 0;
        //手续费
        let rowIndex = fileObj.findIndex(item=>item[0] == '交易时间');
        let colIndex = -1;

        let serviceFee = 0;

        for(let i in fileObj){
          let value=fileObj[i];
          //收入
          if(i == 7) {
            let text = value[0];
            let index = text.indexOf('笔');
            income = parseFloat(text.substring(index+2, text.length-1));
          }
          //提现
          if(i==9){
            let text = value[0];
            let index = text.indexOf('笔');
            cashFee = parseFloat(text.substring(index+2, text.length-1));
          }

          if(i == rowIndex){
             colIndex = value.findIndex(item=>item=='备注');
          }

          if(i>rowIndex && colIndex>=0){
            let text = value[colIndex]; 
            if(text && text.indexOf('服务费')>=0){
                let _value = parseFloat(text.replace('服务费','').replace('¥',''));
                serviceFee = util.floatAdd(serviceFee,_value);
            }
          }
        }
        //收入
        arr.push(income);
        //提现
        arr.push(cashFee);
        //手续费
        arr.push(serviceFee);
        return arr;
    },
    //企业账户  setFile:总表   allFile：明细表
    analysisCompany(setFile, allFile){
        let arr = [];
        //收入
        let income = 0;
        let rowIndex0 = -1, colIndex0 = -1;
        if(allFile){
            // rowIndex0 = allFile.findIndex(item =>{
            //     for(let item2 of item){
            //         if(item2.indexOf('订单总金额')>=0) return true;
            //     }
            // });

            for(let i in allFile){
                let value = allFile[i]
                if(colIndex0<0){
                    colIndex0 = value.findIndex(item=>item.indexOf('订单总金额')>=0);
                    if(colIndex0>=0) rowIndex0 = i;
                }
            }
            if(rowIndex0>0 && colIndex0>0) income = parseFloat(allFile[parseInt(rowIndex0,10)+1][colIndex0].replace('`',''));
        }
        arr.push(income);


        let cashFee = 0;
        let serviceFee = 0;
        if(setFile){
            let rowIndex = setFile.findIndex(item=>item[0] == '划账日期');
            let colIndex = -1;
            for(let i in setFile){
                let value=setFile[i];
                //提现 ---划账金额合计
                if(value.length>0 && typeof(value[0])=='string' && value[0].indexOf('划账金额合计')>=0){
                    let index = value[0].indexOf('共');
                    cashFee = parseFloat( value[0].substr(index+1).replace('元',''))
                }
                if(i == rowIndex){
                    colIndex = value.findIndex(item=>item.indexOf('手续费金额')>=0);
                }
                //手续费
                if(i>rowIndex && colIndex>=0){
                    let text = value[colIndex]; 
                    if(text){ 
                        serviceFee = util.floatAdd(serviceFee, parseFloat(text));
                    }
                }
            }
        }
        //提现
        arr.push(cashFee);
        //手续费
        arr.push(serviceFee);
        return arr;
    },
    analysis(filePath){
        //类型列表 [个人、企业]
        let typeList = fs.readdirSync(filePath);
        let result = [];
        for(let text of typeList){
            //类型path
            let typePath = path.join(filePath, text);
            //账户列表
            let accountList = fs.readdirSync(typePath);
            let i=0;
            for(let account of accountList){
                //账户地址
                let accountPath = path.join(typePath, account);
                let _accountList1 = fs.readdirSync(accountPath);
                let _result = [];
                if(text == '个人'){
                    let _text  = _accountList1.find(item=>{
                        let stat1 = fs.statSync(path.join(accountPath, item));
                        return stat1.isDirectory();
                    });
                    let _textPath = path.join(accountPath, _text);
                    let _textList = fs.readdirSync(_textPath);

                    let fileName  = _textList.find(item=>{
                        return item.indexOf('微信支付账单')>=0;
                    });
                    //读取文件内容
                    var fileObj = xlsx.parse(path.join(_textPath, fileName));
                    var excelObj = fileObj[0].data;

                    _result = this.analysisPersonal(excelObj);
                }else if(text == '企业'){
                    // if(i>0){return ;}
                    // i++;
                    //汇总
                    let setP = _accountList1.find(item=>item.indexOf('bak')<0&&item.indexOf('Set')>0);
                    let allP = _accountList1.find(item=>item.indexOf('bak')<0&&item.indexOf('All')>0&&item.indexOf('All')<=15);
                    let setFile = null, allFile = null;
                    if(setP){ 
                        let downLoadFilePath = path.join(accountPath, setP);
                        let csvfile =fs.readFileSync(downLoadFilePath);
                        csvfile = iconv.decode(csvfile,'gbk');
                        let dataBuffer =Buffer.concat([new Buffer('\xEF\xBB\xBF','binary'),new Buffer(csvfile)]);//node不支持utf-8 - BOM 格式
                        fs.writeFileSync(path.join(accountPath, 'bak_'+setP),dataBuffer,'utf-8');

                        //读取文件内容
                        var fileObj = xlsx.parse(path.join(accountPath, 'bak_'+setP));
                        setFile = fileObj[0].data;
                    }
                    if(allP){
                        // let downLoadFilePath = path.join(accountPath, allP);
                        // let csvfile =fs.readFileSync(downLoadFilePath);
                        // csvfile = iconv.decode(csvfile,'gbk');
                        // let dataBuffer =Buffer.concat([new Buffer('\xEF\xBB\xBF','binary'),new Buffer(csvfile)]);//node不支持utf-8 - BOM 格式
                        // fs.writeFileSync(path.join(accountPath, 'bak_'+allP),dataBuffer,'utf-8');

                        //读取文件内容
                        var fileObj = xlsx.parse(path.join(accountPath, allP));
                        allFile = fileObj[0].data;
                    }

                    _result = this.analysisCompany(setFile, allFile);
                }

                // console.log(text, account, _result)
                result.push([title,text, account, ..._result])
            }
        }
        return result;
    }
}   