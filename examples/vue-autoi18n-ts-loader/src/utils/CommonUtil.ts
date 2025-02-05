import Vue from 'vue';

export enum ErrorCode {
  '错误' = '错误',
}

/*skip-i18n-start*/
export function download(fileName: string, blob: any) {
  Vue.prototype.$message.error('下载失败了');
}

export function upload() {
  Vue.prototype.$message.success('上传成功了');
}
/*skip-i18n-end*/
