"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: '姓名',
  tel: '電話',
  save: '保存',
  confirm: '確認',
  cancel: '取消',
  delete: '刪除',
  loading: '加載中...',
  noCoupon: '暫無優惠券',
  nameEmpty: '請填寫姓名',
  telInvalid: '請填寫正確的電話',
  vanCalendar: {
    end: '結束',
    start: '開始',
    title: '日期選擇',
    confirm: '確定',
    startEnd: '開始/結束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: maxRange => `最多選擇 ${maxRange} 天`
  },
  vanPicker: {
    select: '請選擇'
  },
  vanContactCard: {
    addText: '添加聯系人'
  },
  vanContactList: {
    addText: '新建聯系人'
  },
  vanPagination: {
    prev: '上一頁',
    next: '下一頁'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '釋放即可刷新...',
    loading: '載入中...'
  },
  vanSubmitBar: {
    label: '合計：'
  },
  vanCoupon: {
    unlimited: '無使用門檻',
    discount: discount => `${discount}折`,
    condition: condition => `滿${condition}元可用`
  },
  vanCouponCell: {
    title: '優惠券',
    count: count => `${count}張可用`
  },
  vanCouponList: {
    exchange: '兌換',
    close: '不使用優惠',
    enable: '可使用優惠券',
    disabled: '不可使用優惠券',
    placeholder: '請輸入優惠碼'
  },
  vanAddressEdit: {
    area: '地區',
    postal: '郵政編碼',
    areaEmpty: '請選擇地區',
    addressEmpty: '請填寫詳細地址',
    postalEmpty: '郵政編碼不正確',
    defaultAddress: '設為默認收貨地址'
  },
  vanAddressEditDetail: {
    label: '詳細地址',
    placeholder: '街道門牌信息'
  },
  vanAddressList: {
    add: '新增地址'
  }
};
exports.default = _default;