import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import { getData, setData } from './storage.js';
import { ToastAndroid } from 'react-native';

const exportExcel = () => {
  const path = `${RNFS.ExternalDirectoryPath}/accounts.xlsx`;
  // console.log(path);
  getData('accounts').then(val => {
    let str = '';
    let accounts = [];
    str = val;
    accounts = str === '' ? [] : JSON.parse(str);
    const ws = XLSX.utils.json_to_sheet(accounts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'account');
    // console.log(wb);
    const wbout = XLSX.write(wb, {type:'binary', bookType:'xlsx'});
    RNFS.writeFile(path, wbout, 'ascii').then(r => {
      console.log('export successfully');
      ToastAndroid.show(`导出成功,Excel文件存放在${path}`, ToastAndroid.LONG);
    }).catch(e => {
      console.log('export error:' + e);
    });
  });
};

const importExcel = () => {
  const path = `${RNFS.ExternalDirectoryPath}/accounts.xlsx`;
  RNFS.readFile(path, 'ascii').then(res => {
    const wb = XLSX.read(res, {type: 'binary'});
    const ws = wb.Sheets[wb.SheetNames[0]];
    const accounts = XLSX.utils.sheet_to_json(ws);
    // console.log(accounts);
    setData('accounts', JSON.stringify(accounts));
    this.accList.handleImport(accounts);
    ToastAndroid.show('导入成功', ToastAndroid.SHORT);
  });
};

export { exportExcel, importExcel };
