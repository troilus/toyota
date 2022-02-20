/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2011/12/16 */

/**
 * file use_searchoption.js<br />
 *
 * @fileoverview このファイルには、検索オプション指定画面の関数が<br />
 * 定義されています。<br />
 * file-> use_searchoption.js
 * @author 柳原
 * @version 1.0.0
 *
 * History(date|version|name|desc)<br />
 *  2011/08/24|1.0.0   |柳原|新規作成<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/08/24 1.0.0 柳原 ・新規作成
 *---------------------------------------------------------------------------*/
/**
 * 検索オプション
 * @namespace 検索オプションクラス
 */
Use.SearchOption = {};
/**
 * フェイスボックスインスタンス
 * @private
 * @type Facebox
 */
Use.SearchOption.faceBox = null;
/**
 * 検索オプションデフォルト値
 * @private
 * @type string
 */
Use.SearchOption.defaultId = "";
/**
 * 検索オプション選択値
 * @private
 * @type string
 */
Use.SearchOption.optionId = "";
/**
 * コールバック関数
 * @private
 * @type function
 */
Use.SearchOption.$callback = null;
/**
 * 表示／非表示切替え用ID
 * @type object(連想配列)
 */
Use.SearchOption.DIV_ID = {
  "00": "fbx_manRmOpt",
  "01": "fbx_catArrangmentOpt",
  "02": "fbx_catTroubleOpt",
  "03": "fbx_catOptDetachOpt",
  "04": "fbx_catCheckOpt",
  "05": "fbx_catCustomOpt",
  "06": "fbx_catPreperationOpt",
  "09": "fbx_catOtherOpt",
  "10": "fbx_manNcfOpt",
  "20": "fbx_manEwdOpt"
};
/**
 * チェックボックスID
 * @type object(連想配列)
 */
Use.SearchOption.CHECKBOX_ID = {
    "00": "fbx_manRmChk",
    "01": "fbx_catArrangmentChk",
    "02": "fbx_catTroubleChk",
    "03": "fbx_catChkDetachChk",
    "04": "fbx_catCheckChk",
    "05": "fbx_catCustomChk",
    "06": "fbx_catPreperationChk",
    "09": "fbx_catOtherChk",
    "10": "fbx_manNcfChk",
    "20": "fbx_manEwdChk"
};
/**
 * チェックボックスID
 * @type object(連想配列)
 * @private
 */
Use.SearchOption.checkboxId = {};
/**
 * 処理終了時にフォーカスを戻すエレメント
 * @private
 * @type element
 */
Use.SearchOption.beforeFocus = null;
/**
 * HTML置換え用のメッセージ対応一覧
 * @type object(連想配列)
 */
Use.SearchOption.PAGE_TEXT = {
  "{repair}":      "CONST_SEARCH_OPTION_REPAIR",
  "{all}":         "CONST_SEARCH_OPTION_ALL",
  "{layout}":      "CONST_SEARCH_OPTION_LAYOUT",
  "{trouble}":     "CONST_SEARCH_OPTION_TROUBLE",
  "{remove}":      "CONST_SEARCH_OPTION_REMOVE",
  "{maintenance}": "CONST_SEARCH_OPTION_MAINTENANCE",
  "{custom}":      "CONST_SEARCH_OPTION_CUSTOM",
  "{prepared}":    "CONST_SEARCH_OPTION_PREPARED",
  "{other}":       "CONST_SEARCH_OPTION_OTHER",
  "{ncf}":         "CONST_SEARCH_OPTION_NCF",
  "{ewd}":         "CONST_SEARCH_OPTION_EWD",
  "{reset}":       "CONST_SEARCH_OPTION_RESET",
  "{entry}":       "CONST_SEARCH_OPTION_ENTRY",
  "{close}":       "CONST_SEARCH_OPTION_CLOSE"
};
/**
 * 修理書新構成のコード一覧
 * @type Array
 */
Use.SearchOption.REPAIR_NEW_LAYOUT_CODE = [
    "01","02","03","04","05","06","09"
  ];
/**
 * パブ種別区分コード一覧
 * @type Array
 */
Use.SearchOption.CHECK_BOX = [
    "00","10","20"
  ];
/**
 * HTML置換え文字列一覧
 * @type Array
 */
Use.SearchOption.PAGE_TEXT_CODE = [
    "{repair}","{all}","{layout}","{trouble}","{remove}","{maintenance}",
    "{custom}","{prepared}","{other}","{ncf}","{ewd}",
    "{reset}","{entry}","{close}"
  ];
/**
 * フェースボックス用HTML
 * @type string
 */
Use.SearchOption.PAGE = '';
/**
 * フェイスボックス用HTMLのテンプレート
 * @type string
 */
Use.SearchOption.PAGE_TEMP = '\
<div id="search_option">\
<div id="search_option_head"></div>\
<div id="search_option_body">\
<fieldset>\
<legend>\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="manRmChk"><span tabIndex="1001" id="manRmChk_span"><label  for="fbx_manRmChk">{repair}</label></span></div>\
</legend>\
<div id="allOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="allChk"><span tabIndex="1002" id="allChk_span"><label  for="fbx_allChk">{all}</label></span></div>\
</div>\
<div id="catArrangmentOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catArrangmentChk"><span tabIndex="1003" id="catArrangmentChk_span"><label  for="fbx_catArrangmentChk">{layout}</label></span></div>\
</div>\
<div id="catTroubleOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catTroubleChk"><span tabIndex="1004" id="catTroubleChk_span"><label  for="fbx_catTroubleChk">{trouble}</label></span></div>\
</div>\
<div id="catOptDetachOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catChkDetachChk"><span tabIndex="1005" id="catChkDetachChk_span"><label  for="fbx_catChkDetachChk">{remove}</label></span></div>\
</div>\
<div id="catCheckOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catCheckChk"><span tabIndex="1006" id="catCheckChk_span"><label  for="fbx_catCheckChk">{maintenance}</label></span></div>\
</div>\
<div id="catCustomOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catCustomChk"><span tabIndex="1007" id="catCustomChk_span"><label  for="fbx_catCustomChk">{custom}</label></span></div>\
</div>\
<div id="catPreperationOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catPreperationChk"><span tabIndex="1008" id="catPreperationChk_span"><label  for="fbx_catPreperationChk">{prepared}</label></span></div>\
</div>\
<div id="catOtherOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="catOtherChk"><span tabIndex="1009" id="catOtherChk_span"><label  for="fbx_catOtherChk">{other}</label></span></div>\
</div>\
</fieldset>\
<div id="manNcfOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="manNcfChk"><span tabIndex="1010" id="manNcfChk_span"><label  for="fbx_manNcfChk">{ncf}</label></span></div>\
</div>\
<div id="manEwdOpt" class="invisible">\
<div class="chkBoxRoot"><input tabIndex="-1" type="checkbox" id="manEwdChk"><span tabIndex="1011" id="manEwdChk_span"><label  for="fbx_manEwdChk">{ewd}</label></span></div>\
</div>\
</div>\
<div id="search_option_foot">\
<input type="button" class="button_style" id="resetBtn" value="{reset}" tabIndex="1018">\
<div>\
<input type="button" class="button_style" id="okBtn"value="{entry}" tabIndex="1019">\
<input type="button" class="button_style" id="cancelBtn" value="{close}" tabIndex="1020">\
</div>\
</div>\
</div>';

/**
 * 検索オプション画面表示
 * @param {function} callback コールバック関数
 * @param {Facebox} faceBox フェイスボックスインスタンス
 * @param {string} defaultId 検索オプションデフォルト値
 * @param {string} optionId 検索オプション選択値
 * @param {element} fcsElm 終了時のフォーカスエレメント
 */
Use.SearchOption.$show = function(
    callback, faceBox, defaultId, optionId, fcsElm) {
  var METHODNAME = "Use.SearchOption.$show";
  try {
    var htmlEle = $$('html')[0];
    var pageText = Use.SearchOption.PAGE_TEXT;
    var pageTextCode = Use.SearchOption.PAGE_TEXT_CODE;
    var fieldsetStart = "";
    var fieldsetEnd = "";
    var convertStart = "";
    var convertEnd = "";
    var manRmId = "";
    var textLen = 0;
    Use.SearchOption.$callback = callback;
    Use.SearchOption.faceBox = faceBox;
    Use.SearchOption.defaultId = defaultId;
    Use.SearchOption.optionId = optionId;
    Use.SearchOption.checkboxId = Use.SearchOption.CHECKBOX_ID;
    Use.SearchOption.beforeFocus = fcsElm;

    // スクロールバーを消去する
    Element.$addClassName(htmlEle, 'noscrollbar');
    
    Use.SearchOption.PAGE = Use.SearchOption.PAGE_TEMP;

    textLen = pageTextCode.length;
    //HTMLの表示文字列を置き換える
    for(var textIdx = 0; textIdx < textLen; textIdx++) {
      Use.SearchOption.PAGE = 
        Use.SearchOption.PAGE.replace(pageTextCode[textIdx],
            Use.Util.$getMessage(pageText[pageTextCode[textIdx]]));
    }

    Use.Util.$revealFacebox(
        Use.SearchOption.faceBox, Use.SearchOption.PAGE, '', false,
        Use.Util.$getMessage("CONST_SEARCH_OPTION_TITLE"), true, '',
        Use.SearchOption.$doClickCancelBtn);

    //チェックボックスへクリックイベントの登録
    Use.Util.$observe($("fbx_allChk"),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["00"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["01"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["02"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["03"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["04"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["05"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["06"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["09"]),
        "click", Use.SearchOption.$doClickOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["10"]),
        "click", Use.SearchOption.$doSelectSpanElm);
    Use.Util.$observe($(Use.SearchOption.checkboxId["20"]),
        "click", Use.SearchOption.$doSelectSpanElm);

    Use.Util.$observe($("fbx_allChk_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["00"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["01"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["02"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["03"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["04"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["05"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["06"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["09"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["10"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    Use.Util.$observe($(Use.SearchOption.checkboxId["20"] + "_span"),
        "keydown", Use.SearchOption.$doKeyDownOptionChk);
    
    Use.Util.$observe($(
        "fbx_resetBtn"), "click", Use.SearchOption.$doClickResetBtn);
    Use.Util.$observe($(
        "fbx_okBtn"), "click", Use.SearchOption.$doClickOkBtn);
    Use.Util.$observe($(
        "fbx_cancelBtn"), "click", Use.SearchOption.$doClickCancelBtn);

    //キャンセルボタンにフォーカスを当てる。
    $("fbx_cancelBtn").focus();

    Use.SearchOption.$setContents();
    Use.SearchOption.$setOptions();
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 初期表示 画面表示設定
 * @private
 */
Use.SearchOption.$setContents = function() {
  var METHODNAME = "Use.SearchOption.$setContents";
  try {
    var defaultId = Use.SearchOption.defaultId.split(",");
    var divId = Use.SearchOption.DIV_ID;
    var repairCode = null;
    var target = null;
    var defaultLen = 0;
    var repLen = 0;

    defaultLen = defaultId.length;
    //渡されたコンテンツ種別区分の表示処理
    for(var conIdx = 0; conIdx < defaultLen; conIdx++) {

      target = $(divId[defaultId[conIdx]]);
      //エリア表示
      if(defaultId[conIdx] == "00") {
        repairCode = Use.SearchOption.REPAIR_NEW_LAYOUT_CODE;
        repLen = repairCode.length;
        //修理書エリア内全部を表示にする
        //配置図/構成図,トラブルシュート,脱着,点検,
        //カスタマイズ,準備品,その他の処理
        for(var repIdx = 0; repIdx < repLen; repIdx++) {
          //チェックボックスを表示する
          if(Element.$hasClassName(
              $(divId[repairCode[repIdx]]), "invisible")) {
            Element.$removeClassName(
                $(divId[repairCode[repIdx]]), "invisible");
          }
          Element.$addClassName($(divId[repairCode[repIdx]]), "visible");
        }
        //修理書見出し すべて
        if(Element.$hasClassName($("fbx_allOpt"), "invisible")) {
          Element.$removeClassName($("fbx_allOpt"), "invisible");
        }
        Element.$addClassName($("fbx_allOpt"), "visible");
        continue;
      }

      //オプション指定エリアの表示の判定
      if(Element.$hasClassName(target, "invisible")) {
        Element.$removeClassName(target, "invisible");
      }
      Element.$addClassName(target, "visible");
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 初期表示 チェックボックス設定
 * @private
 */
Use.SearchOption.$setOptions = function() {
  var METHODNAME = "Use.SearchOption.$setOptions";
  try {
    var optionId = Use.SearchOption.optionId.split(",");
    var optFlag = false;
    var optLen = optionId.length;
    //検索オプション選択値に01～06、09 が含む／含まないを判定する
    for(var optIdx = 0; optIdx < optLen; optIdx++) {
      //検索オプション選択値に01～06、09 を含む場合 optFlag = true にする
      if(("01" <= optionId[optIdx] &&
          optionId[optIdx] <= "06") || optionId[optIdx] == "09") {
        optFlag = true;
        break;
      }
    }

    optLen = optionId.length;
    //チェックボックスの値を設定する
    for(var optIdx = 0; optIdx < optLen; optIdx++) {
      //オプション指定エリアのチェックボックスONの判定
      //修理書の場合
      //検索オプション選択値に01～06、09 を含まない場合
      if(optionId[optIdx] == "00" && !optFlag && 
          Util.Selector.$select("fieldset", $("search_option_body"))) {
        //オプション指定エリアのチェックボックスONの処理
        Use.SearchOption.$setCheckValue(true);
        $(Use.SearchOption.checkboxId["00"]).checked = true;
      }
      //検索オプション選択値に01～06、09 を含む場合
      if(optFlag && 
          Util.Selector.$select("fieldset", $("search_option_body"))) {
        $(Use.SearchOption.checkboxId["00"]).checked = true;
      }

      //配置図/構成図,トラブルシュート,脱着,点検,カスタマイズ,
      //準備品,その他の処理
      if(Element.$hasClassName(
          $(Use.SearchOption.DIV_ID[optionId[optIdx]]), "visible")) {
        $(Use.SearchOption.checkboxId[optionId[optIdx]]).checked = true;
      }
      

      //新型車解説書,配線図,ボデー修理書,取扱説明書,ウェルキャブ,
      //ハイブリッドレスキュー,Emergency Response Guide,
      //Hybrid Vehicle Dismantling Manual の処理
      if(Element.$hasClassName(
          $(Use.SearchOption.DIV_ID[optionId[optIdx]]), "visible")) {
        $(Use.SearchOption.checkboxId[optionId[optIdx]]).checked = true;
      }
    }

    //ここまでの処理で01～06、09のチェックボックスにチェックが全て付いた場合，
    //"すべて選択"のチェックも付ける
    if(Use.SearchOption.$checkRepairCheckBox() == 1) {
      //チェックボックスが有効の場合
      if(Element.$hasClassName($("fbx_allOpt"), "visible")) {
        $("fbx_allChk").checked = true;
      }
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * チェックボックス選択／解除処理
 * @param {Event} evt イベント
 */
Use.SearchOption.$doClickOptionChk = function(evt) {
  var METHODNAME = "Use.SearchOption.$doClickOptionChk";
  try {
    var targets = null;
    var eventId = "";
    var checked = "";
    var checkedFlag = false;
    //イベントの発生した要素
    var targetEl = Event.$element(evt);

    //クリックイベントの発生した要素のIDを取得する
    //イベントの発生する要素は<input>,<label>
    if(Util.$getAttrValue(targetEl, "id")) {
      eventId = Util.$getAttrValue(targetEl, "id");
    //文字の上でイベントが発生した場合
    } else {
      eventId = Util.$getAttrValue(targetEl, "for");
    }

    //イベントの発生した要素が，"修理書選択"又は"すべて選択"の場合の処理
    //"修理書選択(区分あり)"，"すべて選択"
    //のチェックボックスをON/OFFした際の処理
    if(eventId == Use.SearchOption.checkboxId["00"] || eventId == "fbx_allChk") {
      //イベントの発生したチェックボックスのチェックが外される場合
      if( $(eventId).checked == false ) {
        $(Use.SearchOption.checkboxId["00"]).checked = false;
        Use.SearchOption.$setCheckValue(false);
      //イベントの発生したチェックボックスのチェックが付けられる場合
      } else {
        $(Use.SearchOption.checkboxId["00"]).checked = true;
        Use.SearchOption.$setCheckValue(true);
      }
    //"配置図/構成図"～"その他"のチェックボックスを全てON/OFFした際の処理
    } else {
      //チェックボックスの状態を全て確認する
      checkedFlag = Use.SearchOption.$checkRepairCheckBox();

      //クリックしたチェックボックスがONにされた場合
      if(Event.$element(evt).checked) {
        $(Use.SearchOption.checkboxId["00"]).checked = true;

        //チェックボックスが全てチェックされている状態の場合
        if(checkedFlag == 1) {
          $("fbx_allChk").checked = true;
        }
      //クリックしたチェックボックスがOFFにされた場合
      } else {
        $("fbx_allChk").checked = false;
        //チェックボックスが全てチェックされていない状態の場合
        if(checkedFlag == 2) {
          $(Use.SearchOption.checkboxId["00"]).checked = false;
        }
      }
    }
    
    Use.SearchOption.$doSelectSpanElm(evt);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブ移動時用文字列選択処理
 * @param {Event} evt イベントオブジェクト
 */
Use.SearchOption.$doSelectSpanElm = function(evt) {
  var METHODNAME = "Use.SearchOption.$doSelectSpanElm";
  try {
    
    var target = Event.$element(evt).parentNode;
    var spanEle = Util.Selector.$select("> span", target)[0];
    spanEle.focus();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブ移動時用チェックボックス選択処理
 * @param {Event} evt イベントオブジェクト
 */
Use.SearchOption.$doKeyDownOptionChk = function(evt) {
  var METHODNAME = "Use.SearchOption.$doKeyDownOptionChk";
  try {
    
    var elm = Event.$element(evt);
    var div = elm.parentNode;
    var checkBox = Util.Selector.$select("> input", div)[0];
    var keyCode = Event.$getKeyCode(evt);
    
    // スペースキー押下のみ処理を行う
    if(Event.KEY_SPACE == keyCode) {
      checkBox.checked = !checkBox.checked;
      Event.$fireEvent(checkBox, "click");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * チェックボックスの値設定
 * @private
 * @param {boolean} check チェックボックス値
 */
Use.SearchOption.$setCheckValue = function(check) {
  var METHODNAME = "Use.SearchOption.$setCheckValue";
  try {
    var repairCode = Use.SearchOption.REPAIR_NEW_LAYOUT_CODE;
    var repLen = repairCode.length;
    //修理書 検索オプション選択値のチェックボックスを設定する
    for(var repIdx = 0; repIdx < repLen; repIdx++) {
      //処理対象のチェックボックスが，表示状態時
      if(Element.$hasClassName(
          $(Use.SearchOption.DIV_ID[repairCode[repIdx]]), "visible")) {
        $(Use.SearchOption.checkboxId[repairCode[repIdx]]).checked = check;
      }
    }
    //処理対象のチェックボックスが，表示状態時
    if(Element.$hasClassName($("fbx_allOpt"), "visible")) {
      $("fbx_allChk").checked = check;
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 修理書のチェックボックスの状態を確認する
 * @private
 * @return {number} 修理書のチェックボックスの状態<br />
 *   0: チェックが疎らの状態<br />
 *   1: 全てチェックが入っている状態<br />
 *   2: 全てチェックが外れている状態
 */
Use.SearchOption.$checkRepairCheckBox = function() {
  var METHODNAME = "Use.SearchOption.$checkRepairCheckBox";
  try {
    var status = 0;
    var repairCode = Use.SearchOption.REPAIR_NEW_LAYOUT_CODE;
    var checked = $(Use.SearchOption.checkboxId[repairCode[0]]).checked;
    var repLen = 0;

    //検索オプション選択値のチェックボックスに
    //チェックが疎らの状態:0
    //全てチェックが入っている状態:1
    //全てチェックが外れている状態:2
    checked ? status = 1 : status = 2;

    repLen = repairCode.length;
    //チェックボックスの状態を全て確認する
    for(var tIdx = 1; tIdx < repLen; tIdx++) {
      //チェックボックスが全てチェックされている状態又は逆の状態は
      //"修理書選択" 又は "すべて選択"の状態を設定し直す
      if(checked != 
        $(Use.SearchOption.checkboxId[repairCode[tIdx]]).checked) {
        //チェックが疎らの状態
        status = 0;
        break;
      }
    }
    return status;
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * オプション指定初期化
 */
Use.SearchOption.$doClickResetBtn = function() {
  var METHODNAME = "Use.SearchOption.$doClickResetBtn";
  try {
    Use.SearchOption.optionId = Use.SearchOption.defaultId;
    //チェックボックスの状態を引継ぎ項目の状態にする
    Use.SearchOption.$setOptions();
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * オプション指定決定処理
 */
Use.SearchOption.$doClickOkBtn = function() {
  var METHODNAME = "Use.SearchOption.$doClickOkBtn";
  try {
    var checkResult = "";
    var repairCode = Use.SearchOption.REPAIR_NEW_LAYOUT_CODE;
    var checkBoxes = Use.SearchOption.CHECK_BOX;
    var repLen = 0;
    var boxLen = 0; 

    //01～06、09のチェックボックスにチェックが全て付いていない場合
    if(Use.SearchOption.$checkRepairCheckBox() == false) {
      repLen = repairCode.length;
      //01～06、09のチェックボックスを参照する
      for(var repIdx = 0; repIdx < repLen; repIdx++) {
        //チェックボックスにチェックが付いている場合
        if($(Use.SearchOption.checkboxId[repairCode[repIdx]]).checked) {
          checkResult += repairCode[repIdx] + ",";
        }
      }
    }
    boxLen = checkBoxes.length;
    //パブ種別区分のチェックボックスを参照する
    for(var boxIdx = 0; boxIdx < boxLen; boxIdx++) {

      //チェックボックスにチェックが付いている場合
      if($(Use.SearchOption.checkboxId[checkBoxes[boxIdx]]).checked) {
        checkResult += checkBoxes[boxIdx] + ",";
      }
    }
    //チェックが一つも付いていない場合
    if(checkResult.length == 0) {
      Use.Util.$alert(Use.Util.$getMessage("MVWF0034AAE"), null, null);
      return;
    }
    checkResult = checkResult.substring(0, checkResult.length - 1);
    //結果を返す
    Use.SearchOption.$callback(checkResult);

    Element.$removeClassName($$('html')[0], 'noscrollbar');
    //検索オプション指定画面を非表示にする。
    Use.SearchOption.faceBox.close();
    // 直前のフォーカス位置がある場合はフォーカスを戻す
    if(Use.SearchOption.beforeFocus != undefined) {
      Use.SearchOption.beforeFocus.focus();
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索オプション画面を閉じる
 */
Use.SearchOption.$doClickCancelBtn = function() {
  var METHODNAME = "Use.SearchOption.$doClickCancelBtn";
  try {
    Element.$removeClassName($$('html')[0], 'noscrollbar');
    Use.SearchOption.faceBox.close();

    // 直前のフォーカス位置がある場合はフォーカスを戻す
    if(Use.SearchOption.beforeFocus != undefined) {
      Use.SearchOption.beforeFocus.focus();
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};
