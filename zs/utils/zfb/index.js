import fs from 'fs'
import path from 'path'
import xlsx from 'node-xlsx'
import iconv from 'iconv-lite'
import util from '../util'

let title = '支付宝';
//             收入	                     提现	                手续费
// 支付宝	   收入金额 合计	          支出金额  其他	      支出金额  收费

module.exports = {
    //企业账户 --账务明细(汇总).csv
    analysisCompany(excelObj){
        
        let income = 0; //收入
        let cashFee = 0; //提现
        let serviceFee = 0; //手续费
        if(excelObj){
            // for(let item of excelObj){
            //     console.log('--'+item[0]+'--', item[0] == '合计', item[0] == '其它', item[0] == '收费')
            // }
            let rowIndex = excelObj.findIndex(item=>item[0] == '类型');
            if(rowIndex>0){
                let rowIndex0 = excelObj.findIndex(item=>item[0].indexOf('合计')>=0), colIndex0 = excelObj[rowIndex].findIndex(item=>item.indexOf('收入金额')>=0);
                let rowIndex1 = excelObj.findIndex(item=>item[0].indexOf('其它')>=0), colIndex1 = excelObj[rowIndex].findIndex(item=>item.indexOf('支出金额')>=0);
                let rowIndex2 = excelObj.findIndex(item=>item[0].indexOf('收费')>=0), colIndex2 = excelObj[rowIndex].findIndex(item=>item.indexOf('支出金额')>=0);

                // console.log(rowIndex0, colIndex0)
                // console.log(rowIndex1, colIndex1)
                // console.log(rowIndex2, colIndex2)
                if(rowIndex0>=0) income = Math.abs(excelObj[rowIndex0][colIndex0]);
                if(rowIndex1>=0) cashFee = Math.abs(excelObj[rowIndex1][colIndex1]);
                if(rowIndex2>=0) serviceFee = Math.abs(excelObj[rowIndex2][colIndex2]);
            }
        }
        
        return [income, cashFee , serviceFee];
    },
    analysis(filePath){
        //账户列表
        let accountList = fs.readdirSync(filePath);
        let result = [];
        for(let account of accountList){
            //账户地址
            let accountPath = path.join(filePath, account);
            let stat1 = fs.statSync(accountPath);
            if(stat1.isDirectory()){
                let _accountList1 = fs.readdirSync(accountPath);
                let _result = [];
                let text = '企业';
                if(_accountList1.length>0){
                    let _accountPath = _accountList1.find(item=>item.indexOf('bak')<0&&item.indexOf('账务明细')>0&&item.indexOf('汇总')>0);
                    if(_accountPath){
                        let downLoadFilePath = path.join(accountPath, _accountPath);
                        let csvfile =fs.readFileSync(downLoadFilePath);
                        csvfile = iconv.decode(csvfile,'gbk');
                        let dataBuffer =Buffer.concat([new Buffer('\xEF\xBB\xBF','binary'),new Buffer(csvfile)]);//node不支持utf-8 - BOM 格式
                        fs.writeFileSync(path.join(accountPath, 'bak_'+_accountPath),dataBuffer,'utf-8');
    
                        //读取文件内容
                        var fileObj = xlsx.parse(path.join(accountPath, 'bak_'+_accountPath));
                        var excelObj = fileObj[0].data;
    
                        _result = this.analysisCompany(excelObj);
                    }
                }else{
                    _result = [0,0,0]
                }
                // console.log(text, account, _result)
                result.push([title,text, account, ..._result])
            }
        }
        // console.log(result)
        return result;
    }
}   