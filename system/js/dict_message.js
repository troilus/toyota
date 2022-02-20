/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2011/12/20 */

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
  MVWF0011AAE:                        'Techstream 启动失败。\n确认满足以下条件：\n-已安装 Techstream。\n- 可以独立启动 Techstream。\n错误代码: ',  // manual_page   GTS function call message
  MVWF0012AAE:                        '由于Techstream 正在运行，操作失败。\n确认显示在屏幕上的 Techstream 信息后重试。\n错误代码: ',  // manual_page   GTS function call message
  MVWF0013AAE:                        '操作失败因为以下功能正在运行\n中断以下功能并重试。\n  Utility, CARB OBD II, CUW, SUW\n错误代码:  ',  // manual_page   GTS function call message
  MVWF0014AAE:                        '操作失败。\n如果已经启动 Techstream，则中断 Techstream 并重试。\n错误代码：',  // manual_page   GTS function call message
  MVWF0015AAE:                        '操作失败。\n错误代码:',  // manual_page   GTS function call message
  MVWF0016AAE:                        '操作失败。\n确认满足以下条件：\n- 已安装 Techstream。\n错误代码： ',  // manual_page   GTS function call message
  MVWF0017AAE:                        '由于 Techstream 运行在另一个浏览器上，操作失败。\n关闭其他浏览器并重试。\n错误代码: ',  // manual_page   GTS function call message
  MVWF0021AAI:                        '准备...',  // manual_page   GTS function call message
  MVWF0022AAI:                        '准备: OK',  // manual_page   GTS function call message
  MVWF0023AAI:                        'Techstream 启动...',  // manual_page   GTS function call message
  MVWF0024AAI:                        'Techstream 启动: OK',  // manual_page   GTS function call message
  MVWF0025AAI:                        '功能启动...',  // manual_page   GTS function call message
  MVWF0123DAE:                        '发生未遇到过的错误。',  // manual_page  ERROR function call message
  MVWF0124DAE:                        '关闭浏览器并重试。',  // manual_page  ERROR function call message
  MVWF0125DAE:                        '系统错误',  // manual_page  ERROR function call message
  CONST_FACEBOX_IMAGE_TITLE:          '关闭',
  CONST_GTS_FACEBOX_TITLE:            'GTS 发送/接收...',  // manual_page   GTS function call title
  CONST_CONTENTS_TITLE_PRINT:         '打印-丰田服务信息',  // manual_page  print function call title
  CONST_CONTENTS_TITLE_DIAGNOSTIC:    '诊断帮助 - 丰田服务信息',   // manual_page  diagnostic function call title
  CONST_CONTENTS_TITLE_INSPECTION:    '检查程序 - 丰田服务信息',   // manual_page inspection function call title
  CONST_CONTENTS_TITLE_REFERENCE:     '参考页 - 丰田服务信息',    // manual_page  reference function title
  CONST_CONTENTS_FIXED_HEAD:          '<div class="fontEn" id="header_head"><div id="head_buttons"><input type="button" class="button_style" id="btn_print" value="打印"></div><div id="navigation"><p><a href="javascript:void(0);" class="link" id="lnk_close">关闭</a></p></div></div>',      // manual_page common header, translate these words   "Print" and Exit
  CONST_CONTENTS_FIXED_HEAD_IE:       '<div class="fontEn" id="header_head"><div id="head_buttons"><input type="button" class="button_style" id="btn_print" value="打印"><input type="button" class="button_style" id="btn_printpreview" value="预览"></div><div id="navigation"><p><a href="javascript:void(0);" class="link" id="lnk_close">关闭</a></p></div></div>',     // manual_page common header, translate these words   "Print" and "PrintPreview" and Exit
  CONST_CONTENTS_FIXED_FOOT:          '<div class="fontEn" id="footer_message">&copy; 2012 丰田汽车公司。版权所有。</div>',     // manual_page  common footer
  CONST_CONTENTS_FLOW_NAVE_TITLE:     '概览',  // manual_page flow function call title
  CONST_CONTENTS_FLOW_BTN_PROC:       '步骤',  // manual_page flow function call title
  CONST_CONTENTS_FLOW_BTN_JUDGE:      '标准'  // manual_page flow function call title
};

// START_MARK: Don't change below program code between START_MARK and END_MARK.
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
