/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2012/10/24 */

/**
 * file dict.js<br />
 *
 * @fileoverview 多言語対応辞書クラス。（英語）<br />
 * file-> dict_message.js
 * @author Shimizu
 * @version 1.0.0
 *
 * History(date|version|name|desc)<br />
 *  2011/02/10|1.0.0|Shimizu|新規作成<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/02/10 Shimizu ・新規作成
 *---------------------------------------------------------------------------*/
/**
 * 多言語対応辞書クラス（英語）
 * @namespace 多言語対応辞書クラス（英語）
 */
var Dict = {
  //key: value,     Translate the value of dialogue box message or title.  Don't change key.
  MVWF1008AAE:                        '{0} 包含非法字符。\n更多信息，请参阅帮助文件。',  // top.html,service.html   search function  call  message
  MVWF1011AAE:                        '{0} 内没有输入日期。',  // top.html,service.html   search function  call  message
  MVWF0003AAE:                        '由于车辆信息未选择\n服务信息不能打开。\n请从下拉菜单中选择所需选项(*)。',  // top.html,service.html   search function  call  message
  MVWF0004AAE:                        '输入搜索关键字：',  // top.html,service.html   search function  call  message
  MVWF0005AAE:                        '输入搜索关键字应在200个字符以内。',  // top.html,service.html   search function  call  message
  MVWF0006AAE:                        '输入不带空格的5个或更多字符关键字 YOKOGUSHI。\n',  // top.html,service.html   search function  call  message
  MVWF0007AAE:                        '输入搜索关键字在30个字以内。',  // top.html,service.html   search function  call  message
  MVWF0009AAE:                        '关键字包含非法字符。\n请参考{0} 并在此输入关键字。',  // top.html,service.html   search function  call  message
  MVWF0028AAE:                        '0 个搜索结果',  // service.html  search function  call  message
  MVWF0031AAE:                        '选择标题。',  // service.html   title_select screen function  call  message
  MVWF0032AAE:                        '搜索结果超过最大记录500.\n添加搜索选项以缩小搜索范围然后重试。',  //  service.html   search function  call  message
  MVWF0035AAE:                        '选择关键字。',  // top.html,service.html  index_screen function call message
  MVWF0036DEE:                        '搜索错误。',  //  service.html   search function  call  message
  MVWF0123DAE:                        '发生未遇到过的错误。',  // top.html  service.html ERROR function call message
  MVWF0124DAE:                        '关闭浏览器并重试。',  // top.html  service.html ERROR function message
  MVWF0125DAE:                        '系统错误',  // top.html  service.html ERROR function message
  CONST_FACEBOX_IMAGE_TITLE:          '关闭',  // service.html function display title
  CONST_README_TTL:                   '自述文件',  // top.html readme_page (1)
  CONST_TITLESELECT_TITLE:            '标题选择',  // service.html title_page (31)
  CONST_FLOW_TITLE:                   '故障排除 注意事项/备注/提示',  // service.html Troubleshoot_page(39)
  CONST_MANUAL_NAME_RM:               '修理手册 (RM)', // top.html (26)
  CONST_MANUAL_NAME_NM:               '新车特征 (NCF)', // top.html (26)
  CONST_MANUAL_NAME_EM:               '电路图 (EWD)', // top.html (26)
  CONST_MANUAL_NAME_BM:               '车身损伤修理手册 (BRM)', // top.html (26)
  CONST_MANUAL_NAME_OM:               '用户手册', // top.html (26)
  CONST_MANUAL_NAME_WC:               'Welcab 手册', // top.html (26)
  CONST_MANUAL_NAME_HR:               '混合动力急救手册', // top.html (26)
  CONST_MANUAL_NAME_ER:               '应急指南', // top.html (26)
  CONST_MANUAL_NAME_DM:               '混合动力车辆分解手册', // top.html (26)
  CONST_SERVICE_TAB_NAME_SR:          '结果',  // service.html (7)
  CONST_SERVICE_TAB_NAME_RM:          '修理手册',  // service.html  (8)
  CONST_SERVICE_TAB_NAME_NM:          '新车特征',  // service.html  (9)
  CONST_SERVICE_TAB_NAME_EM:          '电路图',  // service.html  (10)
  CONST_SERVICE_TAB_NAME_BM:          '车身损伤修理手册',  // service.html  (11)
  CONST_SERVICE_TAB_NAME_OM:          '用户手册',  // service.html  (12)
  CONST_SERVICE_TAB_NAME_WC:          'Welcab 手册',  //  service.html  (reserved)
  CONST_SERVICE_TAB_NAME_HR:          '混合动力急救手册',  //  service.html  (reserved)
  CONST_SERVICE_TAB_NAME_ER:          '应急指南',  // service.html  (13)
  CONST_SERVICE_TAB_NAME_DM:          '混合动力车辆分解手册',  // service.html  (14)
  CONST_RESULT_KEYWORD:               '"{keyword}"结果',  //  service.html (15)
  CONST_RESULT_KEYWORD_YOKOGUSHI:     '"{keyword}" 的 YOKOGUSHI 结果',  //  service.html (15)
  CONST_RESULT_KEYWORD_LEN:           '28',  //  service.html (15)
  CONST_RESULT_KEYWORD_LEN_YOKOGUSHI: '18',  //  service.html (15)
  CONST_RESULT_NUMBER:                '{all} 中的 {min}-{max}', //  service.html (21)
  CONST_RESULT_RM:                    '修理手册({result})', //  service.html (19)
  CONST_RESULT_NM:                    '新车特征({result})', //  service.html (19)
  CONST_RESULT_EM:                    '电路图({result})', //  service.html (21)
  CONST_RESULT_BM:                    '车身损伤修理手册({result})', //  service.html (?)
  CONST_DEFKEYROWD:                   '关键字',  //  top.html (21), service.html (4)
  CONST_KEYWORD_NM:                   '关键字',  //  top.html (21), service.html (4)
  CONST_YOKOGUSHI_VCHECK_ERROR:       '什么是 "YOKOGUSHI"?', //  top.html (21), service.html (4)
  CONST_LANG_NAME_VIEW_AND_MANUAL:    '中文',  //  top.html (17)

// START_MARK: Don't change below program code between START_MARK and END_MARK.
  MVWF0011AAE:                        'Techstream 启动失败。\n确认满足以下条件：\n- 已安装 Techstream。\n- 可以独立启动 Techstream。\n错误代码：',  // (reserved)
  MVWF0012AAE:                        '由于 Techstream 正在运行，操作失败。\n确认 Techstream 信息显示在屏幕上之后重试。\n错误代码：',  // (reserved)
  MVWF0013AAE:                        '操作失败因为以下功能正在运行。\n中断以下功能并重试。\n  Utility, CARB OBD II, CUW, SUW\n错误代码: ',  // (reserved)
  MVWF0014AAE:                        '操作失败。\n 如果 Techstream 已启动，则中断 Techstream 并重试。\n错误代码：',  // (reserved)
  MVWF0015AAE:                        '操作失败。\n错误代码：',  // (reserved)
  MVWF0016AAE:                        '操作失败。\n确认满足以下条件:\n已安装 Techstream 。\n错误代码: ',  // (reserved)
  MVWF0017AAE:                        '由于 Techstream 正在另一个浏览器运行，操作失败。\n关闭另一个浏览器并重试。\n错误代码：',  // (reserved)
  MVWF0021AAI:                        '准备...',  // (reserved)
  MVWF0022AAI:                        '准备: OK',  // (reserved)
  MVWF0023AAI:                        'Techstream 启动...',  // (reserved)
  MVWF0024AAI:                        'Techstream 启动：OK',  // (reserved)
  MVWF0025AAI:                        '功能启动...',  // (reserved)
  MVWF0034AAE:                        '选择搜索选项。',  // (reserved)
  MVWF0038AAI:                        '由于没有手册匹配您的疑问，\n搜索选项没有打开。',  // (reserved)
  CONST_GTS_FACEBOX_TITLE:            'GTS 发送/接收...',  // (reserved)
  CONST_GLOBAL_INDEX:                 '\
<div id="index_search_contents">\
<div id="index_search_body">\
<div id="initial">\
<ul id="shift_initial">\
<li>\
<a href="javascript:void(0);" id="alphaLnk" tabIndex="1003">Alphanumeric</a>\
</li>\
</ul>\
<div id="alphanum_list" class="initial_list invisible">\
<div class="alphabet">\
<a href="javascript:void(0);" class="initial" tabIndex="1004">A</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">B</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">C</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">D</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">E</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">F</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">G</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">H</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">I</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">J</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">K</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">L</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">M</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">N</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">O</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">P</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Q</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">R</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">S</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">T</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">U</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">V</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">W</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">X</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Y</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Z</a>\
</div>\
<div class="number">\
<a href="javascript:void(0);" class="initial" tabIndex="1004">1</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">2</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">3</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">4</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">5</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">6</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">7</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">8</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">9</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">0</a>\
</div>\
</div>\
</div>\
<div id="index_area">\
<div class="list_head">\
<div class="list_title">Index List</div>\
<div class="list_pager">\
<ul class="list_pager">\
<li class="invisible"><a id="firstPageIcn" tabIndex="1005" href="javascript:void(0);"><img src="./img/png/page_first.png" width="32" height="22" alt="<<" title="<<"></a></li>\
<li><a id="firstPageIcn_g" tabIndex="1005" href="javascript:void(0)"><img src="./img/png/page_first_g.png" width="32" height="22" alt="<<" title="<<"></a></li>\
<li class="invisible"><a id="prevPageIcn" tabIndex="1006" href="javascript:void(0);"><img src="./img/png/page_prev.png" width="32" height="22" alt="<" title="<"></a></li>\
<li><a id="prevPageIcn_g" tabIndex="1006" href="javascript:void(0)"><img src="./img/png/page_prev_g.png" width="32" height="22" alt="<" title="<"></a></li>\
<li class="invisible"><a id="nextPageIcn" tabIndex="1007" href="javascript:void(0);"><img src="./img/png/page_next.png" width="32" height="22" alt=">" title=">"></a></li>\
<li><a id="nextPageIcn_g" tabIndex="1007" href="javascript:void(0)"><img src="./img/png/page_next_g.png" width="32" height="22" alt=">" title=">"></a></li>\
<li class="invisible"><a id="lastPageIcn" tabIndex="1008" href="javascript:void(0);"><img src="./img/png/page_last.png" width="32" height="22" alt=">>" title=">>"></a></li>\
<li><a id="lastPageIcn_g" tabIndex="1008" href="javascript:void(0)"><img src="./img/png/page_last_g.png" width="32" height="22" alt=">>" title=">>"></a></li>\
</ul>\
</div>\
<div class="list_count" id="index_list_count"></div>\
</div>\
<div id="index_list"></div>\
</div>\
</div>\
<div id="index_search_foot">\
<input class="button_style" type="button" id="okBtn" tabIndex="1010" value="OK">\
<input class="button_style" type="button" id="cancelBtn" tabIndex="1011" value="Cancel">\
</div>\
</div>',
  CONST_INDEX_NAME:                   '索引',  // (reserved)
  CONST_INDEX_COUNT:                  '{0} 中的 {1}-{2}',  // (reserved)
  CONST_INDEX_EMPTY_COUNT:            '{0}',  // (reserved)
  CONST_INDEX_PAGER_FIRST:            '首页',  // (reserved)
  CONST_INDEX_PAGER_PREV:             '上一页',  // (reserved)
  CONST_INDEX_PAGER_NEXT:             '下一页',  // (reserved)
  CONST_INDEX_PAGER_LAST:             '最后',  // (reserved)
  CONST_SEARCH_OPTION_TITLE:          '搜索选项',  // (reserved)
  CONST_SEARCH_OPTION_REPAIR:         '修理手册',  // (reserved)
  CONST_SEARCH_OPTION_ALL:            '所有',  // (reserved)
  CONST_SEARCH_OPTION_LAYOUT:         '零件位置/组件',  // (reserved)
  CONST_SEARCH_OPTION_TROUBLE:        '故障排除（DTC 表/故障症状表）',  // (reserved)
  CONST_SEARCH_OPTION_REMOVE:         '拆卸/安装/拆解/更换/调节',  // (reserved)
  CONST_SEARCH_OPTION_MAINTENANCE:    '检查/车上检查',  // (reserved)
  CONST_SEARCH_OPTION_CUSTOM:         '自定义参数',  // (reserved)
  CONST_SEARCH_OPTION_PREPARED:       '准备',  // (reserved)
  CONST_SEARCH_OPTION_OTHER:          '其他',  // (reserved)
  CONST_SEARCH_OPTION_NCF:            '新车特征',  // (reserved)
  CONST_SEARCH_OPTION_EWD:            '电路图',  // (reserved)
  CONST_SEARCH_OPTION_RESET:          '重置',  // (reserved)
  CONST_SEARCH_OPTION_ENTRY:          '确定',  // (reserved)
  CONST_SEARCH_OPTION_CLOSE:          '取消',  // (reserved)
  CONST_SEARCH_OPTION_RETURN_TRUE:    '是',  // (reserved)
  CONST_SEARCH_OPTION_RETURN_FALSE:   '否'  // (reserved)
};

/**
 * 初期化
 */
Dict.$init = function() {
  var METHODNAME = 'Dict.$init';
  try {

    var len = DictConst.Keys.length;
    //DictConstの定義を言語ごとの定義にセット
    for(var i = 0; i < len; i++) {
      var key = DictConst.Keys[i];
      Dict[key] = DictConst[key];
    }

  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};
// END_MARK: Don't change above program code between START_MARK and END_MARK.
