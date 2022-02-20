/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2013/01/22 */

/**
 * file top.js<br />
 *
 * @fileoverview このファイルには、TOP画面(CD版)についての処理が<br />
 * 定義されています。<br />
 * file-> top.js
 * @author 渡会
 * @version 1.0.0
 *
 * History(date|version|name|desc)<br />
 *  2011/02/10|1.0.0   |渡会|新規作成<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/02/10 渡会 ・新規作成
 *---------------------------------------------------------------------------*/
/**
 * Top画面クラス
 * @namespace Top画面クラス
 */
var Top = {};

/**
 * ファイルパスの格納定数
 * @type object(連想配列)
 */
Top.PATH_LIST = {
  "HELP":     "",
  "README":   "",
  "SERVICE":  "",
  "PUBBIND":  "",
  "PUBLISHING": "",
  "PUB":      "",
  "YOKOGUSI": ""
};

/**
 * Xパスの格納定数
 * @type object(連想配列)
 */
Top.XPATH_LIST = {
  "PUBBIND":  "//pub-bind[@id]",
  "TRGT":     "//market-code",
  "BRAND":    "//brand",
  "MODEL":    "//model-name",
  "VTYPE":    "//model-code",
  "OPT1":     "//option1",
  "OPT2":     "//option2",
  "OPT3":     "//option3",
  "OPT4":     "//option4",
  "OPT5":     "//option5",
  "TERM":     "//term[@date]",
  "LANG":     "//media-lang[@lang]",
  "FLLMDL":   "//full-model-code/name",
  "MANUALS":  "//bind-manual",
  "TERM_BIND":    "//term-bind-manual[@date=\'{0}\']",
  "BIND_MANUAL":  "./bind-manual",
  "BIND_SIMPLE": 
    "//term-bind-manual[@txt-search='yes']/bind-manual[@visible='yes']",
  "BIND_YOKO": 
    "//term-bind-manual[@yokogushi='yes']/bind-manual[@visible='yes']"
};

/**
 * TOP画面保持の共通情報
 * @private
 * @type object(連想配列)
 */
Top.globalInfo = {
  "VIEW_LANG":    "",
  "PUB_BIND_ID":  "",
  "FOR_LANG_CODE":"",
  "FOR_LANG":     "",
  "BRAND":        "",
  "OPTION1":      "",
  "OPTION2":      "",
  "OPTION3":      "",
  "OPTION4":      "",
  "OPTION5":      "",
  "CAR_NAME":     "",
  "CAR_TYPE":     "",
  "TYPE":         "",
  "TEKI_DATE":    "",
  "LANG_CODE":    "",
  "LANG_NAME":    "",
  "START_TYPE":   "",
  "PARTS_CD":     "",
  "KEYWORD":      "",
  "VALID_SIMPLE": "",
  "VALID_YOKO":   "",
  "SCH_OPT_DEF":  "",
  "SCH_OPT_SEL":  "",
  "SCH_OPT_INF":  "0",
  "CONTENT_TYPE": "00",
  "MANUALS":      ""
};

/**
 * 公開パブ情報XML
 */
Top.docPublishing = null;

/**
 * パブ内の簡易検索の可不可
 */
Top.validSimple = false;

/**
 * パブ内の横串検索の可不可
 */
Top.validYoko = false;

/**
 * 画面内のエラー要素配列
 * @private
 * @type array
 */
Top.errorElements = [];

/**
 * 索引画面から設定された検索キーワード
 * @private
 * @type string
 */
Top.indexKeywordTxt = "";

/**
 * 新規Window時のオプション
 * @type string
 */
Top.WINDOW_OPEN_OPTION = "\
left=0,top=0,toolbar=no,menubar=no,\
directories=no,status=yes,scrollbars=yes,resizable=yes";
/**
 * フェイスボックスインスタンス
 * @private
 * @type Facebox
 */
Top.faceBox = null;

/**
 * Top画面クラスの初期化処理
 */
Top.$init = function() {
  var METHODNAME = "Top.$init";
  try {
    
    var getPath = Use.Util.$getContentsPath;
    
    Top.faceBox = new Facebox();
    
    Use.$init(Top.faceBox);
    //ショートカット機能抑止
    Util.$stopShortCut({
      openNewWindowByLink   : true,
      openNextTabByLink     : true,
      openPrevTabByLink     : true,
      cloneTab              : true,
      restorePrevTab        : true,
      restorePrevWindow     : true,
      updatePage            : true,
      updatePageForce       : true,
      cancelDownload        : false,
      nextPage              : true,
      prevPage              : true,
      contextMenu           : true,
      showFavorites         : false,
      addPageToFavorite     : false,
      addAllTabsToFavorite  : false,
      showSource            : true
    });
    Use.Util.$stopSubmit(document.forms[0]);
    
    Field.$setValue($("keyword"), Use.Util.$getMessage("CONST_DEFKEYROWD"));
    Element.$addClassName($("keyword"), "deftxt");
    
    // 定数の初期化処理
    Top.PATH_LIST.HELP     = getPath("C_TOP_OPEN_HELP_PATH");
    Top.PATH_LIST.README   = getPath("C_TOP_OPEN_README_PATH");
    Top.PATH_LIST.SERVICE  = getPath("C_TOP_OPEN_SERVICE_PATH");
    Top.PATH_LIST.PUBBIND  = getPath("C_TOP_PUBBIND_XML_PATH");
    Top.PATH_LIST.PUBLISHING = getPath("C_TOP_PUBLISHING_XML_PATH");
    Top.PATH_LIST.PUB      = getPath("C_TOP_RM_XML_PATH");
    Top.PATH_LIST.YOKOGUSI = getPath("C_TOP_YOKOGUSHI_HELP");
    
    // イベント登録
    Use.Util.$observe($("keyword"), "change", Top.$doBeforeChangeKeywordTxt);
    Use.Util.$observe($("keyword"), "keydown", Top.$doKeydownKeywordTxt);
    Use.Util.$observe($("keyword"), "focus", Top.$doFocusKeywordTxt);
    Use.Util.$observe($("keyword"), "blur", Top.$doBlurKeywordTxt);
    
    Use.Util.$observe($("btn_service"), "click", Top.$doBeforeClickServiceBtn);
    Use.Util.$observe($("btn_search"), "click", Top.$doBeforeClickSearchBtn);
    Use.Util.$observe($("mdl_readme"), "click", Top.$doClickHajimeLnk);
    Use.Util.$observe($("mdl_index"), "click", Top.$doClickSakuinLnk);
    Use.Util.$observe($("yokogushiBtn"), "click", Top.$doBeforeClickYokogushiBtn);
    Use.Util.$observe($("teki_date"), "change", Top.$doBeforeChangePubbndTrmfrymSel);
    Use.Util.$observe($("lnk_help"), "click", Top.$doClickHelpLnk);
    Use.Util.$observe($("lnk_yokogushi"), "click", Top.$doClickYokogushiHelpIcn);
    
    // XML読込み開始
    Top.loadPublishingXml();
    Top.$loadPubBindXml();
    
    //Top.$doClickHajimeLnk();
    $("mdl_readme").focus();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 世代絞込み用XMLの取得処理(pub-bind.xml)
 * @private
 */
Top.$loadPubBindXml = function() {
  var METHODNAME = "Top.$loadPubBindXml";
  try {
    
    Use.Util.$request(
      Top.PATH_LIST.PUBBIND,
      true,
      Top.$getPubBindOnSuccess,
      Top.$getPubBindOnFailure,
      true,
      true
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 世代絞込み用XMLの取得成功処理(pub-bind.xml)
 * @param {Response} res レスポンスオブジェクト
 */
Top.$getPubBindOnSuccess = function(res) {
  var METHODNAME = "Top.$getPubBindOnSuccess";
  try {
    
    // 車種世代コードの保持
    var doc = res.responseXML;
    var ele = Util.$getSingleNode(doc, Top.XPATH_LIST.PUBBIND);
    Top.globalInfo.PUB_BIND_ID = Util.$getAttrValue(ele, "id");
    
    Top.$setCarInfo(doc);
    Top.$setBindManuals(doc);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 世代絞込み用XMLの取得失敗処理(pub-bind.xml)
 * @param {Response} res レスポンスオブジェクト
 */
Top.$getPubBindOnFailure = function(res) {
  var METHODNAME = "Top.$getPubBindOnFailure";
  try {
    
    Use.SystemError.$show(null, METHODNAME, "MVWF0123DAE");
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 公開パブ情報XML取得処理(publishing.xml)
 */
Top.loadPublishingXml = function() {
  var METHODNAME = "Top.$loadPublishingXml";
  try {
    
    Use.Util.$request(
      Top.PATH_LIST.PUBLISHING,
      true,
      Top.$getPublishingOnSuccess,
      Top.$getPublishingOnFailure,
      true,
      true
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 公開パブ情報XMLの取得成功処理(publishing.xml)
 * @param {Response} res レスポンスオブジェクト
 */
Top.$getPublishingOnSuccess = function(res) {
  var METHODNAME = "Top.$getPublishingOnSuccess";
  try {
    
    var doc = res.responseXML;
    Top.docPublishing = doc;
    // 言語表示欄の設定
    Top.$setLang(doc);
    // パブ内の検索の可不可を設定
    Top.$setBindSearch(doc);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 公開パブ情報XMLの取得失敗処理(publishing.xml)
 * @param {Response} res レスポンスオブジェクト
 */
Top.$getPublishingOnFailure = function(res) {
  var METHODNAME = "Top.$getPublishingOnFailure";
  try {
    
    Use.SystemError.$show(null, METHODNAME, "MVWF0123DAE");
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 車両情報設定処理
 * @private
 * @param {object} pubbindDoc DOM ROOTオブジェクト(pub-bind.xml)
 */
Top.$setCarInfo = function(pubbindDoc) {
  var METHODNAME = "Top.$setCarInfo";
  try {
    
    var trgtList = {
      "J": "Japan",
      "U": "North America",
      "E": "欧洲和一般国家"
    };
    var key = null;
    
    /* @private */
    var getSingleValue = function(doc, xpath) {
      var elm = Util.$getSingleNode(doc, xpath);
      // 取得成功時は要素内文字列を返し、失敗時は""を返す
      return elm ? Util.$getNodeText(elm) : "";
    }
    
    // 仕向け表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.TRGT);
    // 値の取得に成功している場合は変換し、失敗している場合はそのまま出力
    $("for_lang_name").innerHTML = key ? trgtList[key] : key;
    Top.globalInfo.FOR_LANG_CODE = key;
    Top.globalInfo.FOR_LANG = trgtList[key];
    
    // ブランド表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.BRAND);
    $("brand_name").innerHTML = key;
    Top.globalInfo.BRAND = key;
    
    // 車名表示欄の設定
    Top.$setCarName(pubbindDoc);
    
    // 型式表示欄の設定
    Top.$setModelType(pubbindDoc);
    
    // オプション１表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.OPT1);
    // 文字列がある場合のみ処理
    if(key) {
      $("option1").innerHTML = key;
      Top.globalInfo.OPTION1 = key;
      Element.$removeClassName($("option1").parentNode, "invisible");
    }
    
    // オプション２表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.OPT2);
    // 文字列がある場合のみ処理
    if(key) {
      $("option2").innerHTML = key;
      Top.globalInfo.OPTION2 = key;
      Element.$removeClassName($("option2").parentNode, "invisible");
    }
    
    // オプション３表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.OPT3);
    // 文字列がある場合のみ処理
    if(key) {
      $("option3").innerHTML = key;
      Top.globalInfo.OPTION3 = key;
      Element.$removeClassName($("option3").parentNode, "invisible");
    }
    
    // オプション４表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.OPT4);
    // 文字列がある場合のみ処理
    if(key) {
      $("option4").innerHTML = key;
      Top.globalInfo.OPTION4 = key;
      Element.$removeClassName($("option4").parentNode, "invisible");
    }
    
    // オプション５表示欄の設定
    key = getSingleValue(pubbindDoc, Top.XPATH_LIST.OPT5);
    // 文字列がある場合のみ処理
    if(key) {
      $("option5").innerHTML = key;
      Top.globalInfo.OPTION5 = key;
      Element.$removeClassName($("option5").parentNode, "invisible");
    }
    
    // 適用時期表示欄の設定
    Top.$setTekiDate(pubbindDoc);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 車名設定処理
 * @private
 * @param {object} doc DOM ROOTオブジェクト(pub-bind.xml)
 */
Top.$setCarName = function(doc) {
  var METHODNAME = "Top.$setCarName";
  try {
    
    var els = Util.$getNodes(doc, Top.XPATH_LIST.MODEL);
    var txtAry = [];
    var len = els.length;
    var pEle = null;
    var idx = 0;
    
    // ソート用配列の作成
    for(idx = 0; idx < len; idx++) {
      txtAry.push(Util.$getNodeText(els[idx]));
    }
    txtAry.sort();
    
    // 車名の数だけ画面上に表示
    for(idx = 0; idx < len; idx++) {
      pEle = document.createElement("p");
      pEle.innerHTML = txtAry[idx];
      $("car_name_list").appendChild(pEle);
      // カウンタが0の場合はカンマを付与しない
      Top.globalInfo.CAR_NAME += idx ? "," + txtAry[idx] : txtAry[idx];
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 型式設定処理
 * @private
 * @param {object} doc DOM ROOTオブジェクト(pub-bind.xml)
 */
Top.$setModelType = function(doc) {
  var METHODNAME = "Top.$setModelType";
  try {
    
    var els = Util.$getNodes(doc, Top.XPATH_LIST.VTYPE);
    var txtAry = [];
    var len = els.length;
    var pEle = document.createElement("p");
    var idx = 0;
    var current = "";
    
    // ソート用配列の作成
    for(idx = 0; idx < len; idx++) {
      current = Util.$getNodeText(els[idx]);
      if(Util.$getIndexOfArray(txtAry, current) == -1) {
        txtAry.push(current);
      }
    }
    txtAry.sort();
    
    // 型式の数だけ画面上に表示
    len = txtAry.length;
    for(idx = 0; idx < len; idx++) {
      // カウンタが0の場合はカンマを付与しない
      $("model_type").innerHTML += idx ? "," : "";
      $("model_type").innerHTML += txtAry[idx];
    }
    pEle.innerHTML = $("model_type").innerHTML.replace(/,/g, ", ");
    $("model_type_list").appendChild(pEle);
    Top.globalInfo.TYPE = $("model_type").innerHTML;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 適用時期設定処理
 * @private
 * @param {object} doc DOM ROOTオブジェクト(pub-bind.xml)
 */
Top.$setTekiDate = function(doc) {
  var METHODNAME = "Top.$setTekiDate";
  try {
    
    var els = Util.$getNodes(doc, Top.XPATH_LIST.TERM);
    var len = els.length;
    var sorts = [];
    var val = "";
    var my  = "";
    var key = "";
    var optEle = null;
    
    // 並び替え用処理
    for(var i = 0; i < len; i++) {
      sorts.push({
        "DATE": Util.$getAttrValue(els[i], "date"),
        "MY"  : Util.$getAttrValue(els[i], "model-year")
      });
    }
    
    // 適用時期をソートする
    sorts.sort(function(bef, aft) {
      return bef.DATE > aft.DATE ? -1 : 1;
    });
    
    // 最大件数が1件を超える場合、ブランク行の追加を行う
    if(len > 1) {
      optEle = document.createElement("option");
      optEle.selected = true;
      optEle.value = "";
      optEle.innerHTML = "";
      $("teki_date").appendChild(optEle);
    }
    
    // 適用時期の数だけ画面上に表示
    for(var i = 0; i < len; i++) {
      val = sorts[i].DATE;
      key = val + "/";
      my = "";
      
      // モデルイヤーがある場合は付与する
      if(sorts[i].MY.replace(/^[ 　\\t]*$/, "")) {
        my = sorts[i].MY;
        key += my;
        my = my.replace(/([0-9]{4})/, "($1MY)");
      }
      val = val.replace(/([0-9]{4})([0-9]{2})/, "$1.$2") + my;
      key += "/" + val;
      optEle = document.createElement("option");
      optEle.value = key;
      optEle.innerHTML = val;
      $("teki_date").appendChild(optEle);
    }
    
    Event.$fireEvent($("teki_date"), "change");
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 言語設定処理
 * @private
 * @param {object} doc DOM ROOTオブジェクト(pub.xml)
 */
Top.$setLang = function(doc) {
  var METHODNAME = "Top.$setLang";
  try {
    
    var ele = Util.$getSingleNode(doc, Top.XPATH_LIST.LANG);
    var langCode = Util.$getAttrValue(ele, "lang");
    var langName = Use.Util.$getMessage("CONST_LANG_NAME_VIEW_AND_MANUAL");
    $("lang_name").innerHTML = langName;
    Top.globalInfo.VIEW_LANG = langCode;
    Top.globalInfo.LANG_CODE = langCode;
    Top.globalInfo.LANG_NAME = langName;
    
    // 英語の場合のみ、索引アイコンを活性にする
    if(langCode  == "en") {
      Element.$addClassName($("mdl_index_g"), "invisible");
      Element.$removeClassName($("mdl_index"), "invisible");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * パブ内の検索の可不可を設定
 */
Top.$setBindSearch = function(doc) {
  var METHODNAME = "Top.$setBindSearch";
  try {
    var eleValidSimple = Util.$getSingleNode(doc, Top.XPATH_LIST.BIND_SIMPLE);
    var eleValidYoko   = Util.$getSingleNode(doc, Top.XPATH_LIST.BIND_YOKO);
    // テキスト検索XMLが収録されている、
    // かつ修理書/解説書/配線図/ボデー修理書のうち、表示するマニュアルがある場合
    if(eleValidSimple != null) {
      Top.validSimple = true;
    }
    // 横串検索XMLが収録されている、
    // かつ修理書/解説書/配線図/ボデー修理書のうち、表示するマニュアルがある場合
    if(eleValidYoko != null) {
      Top.validYoko = true;
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 適用時期選択値変更(適用時期プルダウン選択値変更)
 * @param {Event} evt イベントオブジェクト
 */
Top.$doBeforeChangePubbndTrmfrymSel = function(evt) {
  var METHODNAME = "Top.$doBeforeChangePubbndTrmfrymSel";
  try {
    
    var ele = Event.$element(evt);
    var len = Top.errorElements.length;
    var val = Field.$getValue(ele);
    var strTekiDate = val.split("/")[0];
    
    // エラー項目の初期化
    for(var i = 0; i < len; i++) {
      Element.$removeClassName(
        Top.errorElements[i], Use.Util.CLASS_INPUT_ERROR);
    }
    Top.globalInfo.TEKI_DATE = val;
    
    // 適用時期に対応する公開パブ情報XMLを取得
    if(Top.$setPublishingInfo(strTekiDate) == false) {
      throw Use.Util.$getMessage("MVWF0123DAE");
    }
    // 検索/横串検索ボタンの活性/非活性制御
    Top.$setDisabledSearchBtn(
        strTekiDate, 
        Top.globalInfo.VALID_SIMPLE, 
        Top.globalInfo.VALID_YOKO
        );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 公開パブ情報XMLの取得処理
 * @param {string} strTekiDate 適用時期(yyyyMM)
 */
Top.$setPublishingInfo = function(strTekiDate) {
  var METHODNAME = "Top.$setPublishingInfo";
  try {
    var strValidSimple     = "";
    var strValidYoko       = "";
    var strType            = "";
    var strVisible         = "";
    var aryEleManual       = [];
    var aryEleManualAll    = [];
    var lenEleManual       = 0;
    var lenEleManualAll    = 0;
    var aryShowManuals     = [];
    var strShowManuals     = "";
    var strSearchManuals   = "";
    var xpathBindManual    = "";
    var xpathBindManualAll = "";
    var eleManual          = null;
    var eleManualAll       = null;

    // 適用時期が未選択の場合
    if(Util.$isUndefined(strTekiDate) == true 
        || strTekiDate == null 
        || strTekiDate == "") {
      Top.globalInfo.VALID_SIMPLE = "yes";
      Top.globalInfo.VALID_YOKO   = "yes";
      Top.globalInfo.MANUALS      = "";
      Top.globalInfo.SCH_OPT_DEF  = "";
      Top.globalInfo.SCH_OPT_SEL  = "";
      Top.globalInfo.SCH_OPT_INF  = "";
      return true;
    }

    xpathBindManual 
        = Top.XPATH_LIST.TERM_BIND.replace("{0}", strTekiDate);
    xpathBindManualAll 
        = Top.XPATH_LIST.TERM_BIND.replace("{0}", "ALL");
    eleManual 
        = Util.$getSingleNode(Top.docPublishing, xpathBindManual);
    eleManualAll 
        = Util.$getSingleNode(Top.docPublishing, xpathBindManualAll);

    // 選択された適用時期の表示マニュアルが取得できない場合
    if(eleManual == null || eleManualAll == null) {
      return false;
    }

    // テキスト検索XMLの有無を取得
    strValidSimple = Util.$getAttrValue(eleManual, "txt-search");
    // 横串検索XMLの有無を取得
    strValidYoko   = Util.$getAttrValue(eleManual, "yokogushi");

    aryEleManual    = Util.$getNodes(eleManual, 
        Top.XPATH_LIST.BIND_MANUAL);
    aryEleManualAll = Util.$getNodes(eleManualAll, 
        Top.XPATH_LIST.BIND_MANUAL);
    lenEleManual    = aryEleManual.length;
    lenEleManualAll = aryEleManualAll.length;

    // 修理書、解説書、配線図、ボデー修理書の表示マニュアルを取得する
    for(var i = 0; i < lenEleManual; i++) {
      strType    = Util.$getAttrValue(aryEleManual[i], "type");
      strVisible = Util.$getAttrValue(aryEleManual[i], "visible");
      // 表示マニュアルを取得する
      if(strVisible == "yes") {
        // 例:"RM"→"00"
        strType = DictConst.C_PUB_TYPE_CONVERTER[strType];
        aryShowManuals.push(strType);
      }
    }

    // 検索マニュアルをカンマ区切りで保持する
    strSearchManuals = aryShowManuals.join(",");

    // テキスト検索XMLは存在するが、修理書、解説書、配線図、ボデー修理書が非表示の場合
    if(strValidSimple == "yes" && strSearchManuals == "") {
      strValidSimple = "no";
    }
    // 横串検索XMLは存在するが、修理書、解説書、配線図が非表示の場合
    if(strValidYoko == "yes" 
        && strSearchManuals.replace(/(,?30)+/g, "") == "") {
      strValidYoko = "no";
    }

    // その他の表示マニュアルを取得する
    for(var i = 0; i < lenEleManualAll; i++) {
      strType    = Util.$getAttrValue(aryEleManualAll[i], "type");
      strVisible = Util.$getAttrValue(aryEleManualAll[i], "visible");
      // 表示マニュアルを取得する
      if(strVisible == "yes") {
        // 例:"RM"→"00"
        strType = DictConst.C_PUB_TYPE_CONVERTER[strType];
        aryShowManuals.push(strType);
      }
    }
    // 表示マニュアルをカンマ区切りで保持する
    strShowManuals = aryShowManuals.join(",");

    Top.globalInfo.VALID_SIMPLE = strValidSimple;
    Top.globalInfo.VALID_YOKO   = strValidYoko;
    Top.globalInfo.MANUALS      = strShowManuals;
    Top.globalInfo.SCH_OPT_DEF  = strSearchManuals;
    Top.globalInfo.SCH_OPT_SEL  = strSearchManuals;
    Top.globalInfo.SCH_OPT_INF  = "0";
    return true;

  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索/横串検索の活性/非活性変更処理
 * @param {string} strTekiDate 適用時期(yyyyMM)
 * @param {string} validSimple yes:有効 / no:無効
 * @param {string} validYoko   yes:有効 / no:無効
 */
Top.$setDisabledSearchBtn = function(
    strTekiDate, strValidSimple, strValidYoko) {
  var METHODNAME = "Top.$setDisabledSearchBtn";
  try {
    var eleBtnSearch    = $("btn_search");
    var eleBtnYokogushi = $("yokogushiBtn");

    // 適用時期が未選択の場合
    if(Util.$isUndefined(strTekiDate) == true 
        || strTekiDate == null 
        || strTekiDate == "") {
      // 検索ボタンを活性にする
      Use.Util.$setDisabled(eleBtnSearch, false);
      // 横串検索ボタンを活性にする
      Use.Util.$setDisabled(eleBtnYokogushi, false);
    } else {
      // テキスト検索XMLが有効の場合
      if(strValidSimple == "yes") {
        // 検索ボタンを活性にする
        Use.Util.$setDisabled(eleBtnSearch, false);
      // テキスト検索XMLが無効の場合
      } else if(strValidSimple == "no") {
        // 検索ボタンを非活性にする
        Use.Util.$setDisabled(eleBtnSearch, true);
      }
      // 横串検索XMLが有効の場合
      if(strValidYoko == "yes") {
        // 横串検索ボタンを活性にする
        Use.Util.$setDisabled(eleBtnYokogushi, false);
      // 横串検索XMLが無効の場合
      } else if(strValidYoko == "no") {
        // 横串検索ボタンを非活性にする
        Use.Util.$setDisabled(eleBtnYokogushi, true);
      }
    }

  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 収録マニュアル情報取得
 * @private
 * @param {object} pubbindDoc DOM ROOTオブジェクト(pub-bind.xml)
 */
Top.$setBindManuals = function(pubbindDoc) {
  var METHODNAME = "Top.$setBindManuals";
  try {
    
    var elmTbody = $$("table#manual_info_table tbody")[0];
    var elmTr = null;
    var elmTd = null;
    var els = Util.$getNodes(pubbindDoc, Top.XPATH_LIST.MANUALS);
    var len = els.length;
    var key = "";
    var dateReg = /([0-9]{4})([0-9]{2})([0-9]{2})/;
    var prefix = "CONST_MANUAL_NAME_";
    var manuals = [];
    var rowInfo = {};
    var codes = "";
    var patern = {
      "RM":1, "NM":2, "EM":3, "BM":4, "OM":5,
      "ER":6, "DM":7, "WC":8, "HR":9
    };
    var manualType = {
      "RM":"00", "NM":"10", "EM":"20", "BM":"30", "OM":"40",
      "WC":"70", "HR":"80", "ER":"60", "DM":"50"
    };
    var dt = null;
    var tmpInfo = [];
    
    // マニュアル数分ループ処理を行う
    for(var i = 0; i < len; i++) {
      key = Util.$getAttrValue(els[i], "type");
      
      // 未登録の場合のみ処理を行う
      if(Util.$getIndexOfArray(tmpInfo, key) == -1) {
        rowInfo = {"TYPE": "", "NAME": "", "ORDER": 0};
        rowInfo.TYPE = key;
        rowInfo.NAME = Use.Util.$getMessage(prefix + key);
        rowInfo.ORDER = patern[key];
        
        manuals.push(rowInfo);
        tmpInfo.push(key);
        
        codes += i ? "," + manualType[key] : manualType[key];
      }
    }
    
    // 取得した項目を降順にする
    manuals.sort(function (bef, aft) {
      // befの値がaftより大きい場合は-1を、違う場合は1を返す
      return bef["ORDER"] > aft["ORDER"] ? 1 : -1;
    });
    
    len = manuals.length;
    
    // マニュアル数分ループ処理を行う
    for(var i = 0; i < len; i++) {
      elmTr = new Element("tr");
      elmTd = new Element("td");
      // 奇数行、偶数行でクラス分け
      if((i + 1) % 2 != 0) {
        Element.$addClassName(elmTr, "color_row_set1");
      } else {
        Element.$addClassName(elmTr, "color_row_set2");
      }
      Element.$addClassName(elmTd, "manual_name");
      elmTd.innerHTML = manuals[i].NAME;
      Element.$insert(elmTr, elmTd);
      Element.$insert(elmTbody, elmTr);
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索オプション指定画面表示(検索オプションリンククリック時)
 */
Top.$doBeforeClickKeywordOptLnk = function() {
  var METHODNAME = "Top.$doBeforeClickKeywordOptLnk";
  try {
    
    var myGlobalInfo = Top.globalInfo;
    var showSearchOpt = function() {
      Use.SearchOption.$show(
        Top.doAfterClickKeywordOptLnk,
        Top.faceBox,
        myGlobalInfo.SCH_OPT_DEF,
        myGlobalInfo.SCH_OPT_SEL,
        $("keywordOptLnk")
      );
    }
    
    var len = Top.errorElements.length;
    // エラー項目の初期化
    for(var i = 0; i < len; i++) {
      Element.$removeClassName(
        Top.errorElements[i], Use.Util.CLASS_INPUT_ERROR);
    }
    Top.myErrorElements = [];
    
    // 車両情報のチェック処理
    if($("teki_date").value) {
      // 検索オプションデフォルト値がない場合のみ取得処理
      if(!myGlobalInfo.SCH_OPT_DEF) {
        Top.doBeforeSearchOptDefaultVal("MVWF0038AAI", showSearchOpt);
      // 検索オプションデフォルト値がある場合は閲覧画面表示
      } else {
        showSearchOpt();
      }
    } else {
      Use.Util.$alert(Use.Util.$getMessage("MVWF0003AAE"), [$("teki_date")]);
      Top.errorElements = [$("teki_date")];
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索オプション指定画面表示(検索オプションリンククリック時)
 * @param {string} selectVal 検索オプション選択値
 */
Top.doAfterClickKeywordOptLnk = function(selectVal) {
  var METHODNAME = "Top.doAfterClickKeywordOptLnk";
  try {
    
    var retTr = Use.Util.$getMessage("CONST_SEARCH_OPTION_RETURN_TRUE");
    var retFl = Use.Util.$getMessage("CONST_SEARCH_OPTION_RETURN_FALSE");
    var target = Util.Selector.$select("> span", $("keywordOptLnk"))[0];
    var myGlobalInfo = Top.globalInfo;
    
    // 検索オプションデフォルト値と選択値に違いがある場合は変更有りとする
    if(myGlobalInfo.SCH_OPT_DEF != selectVal) {
      myGlobalInfo.SCH_OPT_INF = "1";
      target.innerHTML = retTr;
    // 違いが無い場合は変更なしとする
    } else {
      myGlobalInfo.SCH_OPT_INF = "0";
      target.innerHTML = retFl;
    }
    myGlobalInfo.SCH_OPT_SEL = selectVal;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索オプションデフォルト値取得
 * @param {string} messageid メッセージID
 * @param {function} callback コールバック関数
 */
Top.doBeforeSearchOptDefaultVal = function(messageid, callback) {
  var METHODNAME = "Top.doBeforeSearchOptDefaultVal";
  try {
    
    var conv = DictConst.C_LANGUAGE_CONV;
    var invokeData = Use.Util.$createJSONInvokeData("013");
    var myGlobalInfo = Top.globalInfo;
    var trymVals = $("pubbndTrmfrymSel").value.split("/");
    
    invokeData.put("langVal", conv[mySuccession.LANG_CODE]);
    invokeData.put("pubbndTrmfrymVal",  trymVals[1] + "/" + trymVals[0]);
    
    Top.doRequestForJSON(
      invokeData, function(res) {
        Top.doAfterSearchOptDefaultVal(res, messageid, callback);
      });
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索オプションデフォルト値取得 コールバック処理
 * @param {response} res レスポンスオブジェクト
 * @param {string} messageid メッセージID
 * @param {function} callback コールバック関数
 */
Top.doAfterSearchOptDefaultVal = function(res, messageid, callback) {
  var METHODNAME = "Top.doAfterSearchOptDefaultVal";
  try {
    
    var result = res.getAssistInfoTable("PUB_TYPE_INFO");
    var len = result.getRowCount();
    var joinAry = [];
    var myGlobalInfo = Top.globalInfo;
    
    // 取得したJSON内のマニュアル数分ループ処理
    for(var i = 0; i < len; i++) {
      joinAry.push(result.getValue(i, "KB_PUB_TYPE") + "0");
      // パブ種別区分が"0"(修理書)の場合はコンテンツ種別に値を設定
      if(result.getValue(i, "KB_PUB_TYPE") == "0") {
        myGlobalInfo.CONTENT_TYPE = result.getValue(i, "KB_CONT_TYPE");
      }
    }
    
    myGlobalInfo.SCH_OPT_DEF = joinAry.join(",");
    myGlobalInfo.SCH_OPT_SEL = joinAry.join(",");
    myGlobalInfo.SCH_OPT_INF = "0";
    
    // 検索オプションデフォルト値が無い場合、メッセージを表示する
    if(!myGlobalInfo.SCH_OPT_DEF) {
      Use.Util.$alert(Use.Util.$getMessage(messageid), null, null, null);
      return;
    }
    
    // 引数のコールバック関数がある場合は処理を実行する
    if(callback) {
      callback();
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索オプションのクリア処理
 * @private
 */
Top.doClearSearchOptVal = function() {
  var METHODNAME = "Top.doClearSearchOptVal";
  try {
    
    var redrawVar    = null;
    var myGlobalInfo = Top.globalInfo;
    var target       = Util.Selector.$select("> span", $("keywordOptLnk"))[0];
    
    myGlobalInfo.SCH_OPT_DEF = "";
    myGlobalInfo.SCH_OPT_SEL = "";
    myGlobalInfo.SCH_OPT_INF = "0";
    target.innerHTML = Use.Util.$getMessage("CONST_SEARCH_OPTION_RETURN_FALSE");
    // innerHTMLへ代入した直後に次の操作が走ると、未完成のままDOM操作が終了する
    // ため、以下の処理を行いIE9でDOM操作を完了させた後に次の処理を行う
    redrawVar = Element.$getDimensions(target);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * TOP共通情報の取得処理
 * @return object(連想配列) グローバルインフォ
 */
Top.$getGlobalInfo = function() {
  var METHODNAME = "Top.$getGlobalInfo";
  try {
    
    var myGlobalInfo = {};
    Util.$propcopy(Top.globalInfo, myGlobalInfo);
    return myGlobalInfo;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索キーワードのonFocusイベント
 * @param {Event} evt イベントオブジェクト
 */
Top.$doFocusKeywordTxt = function(evt) {
  var METHODNAME = "Top.$doFocusKeywordTxt";
  try {
    
    var target = Event.$element(evt);
    
    // deftxtクラスがある場合、未入力にする
    if(Element.$hasClassName(target, "deftxt") == true) {
      Field.$setValue(target, "");
      Element.$removeClassName(target, "deftxt");
      Util.$setTextBoxSelection(target);
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索キーワードのonBlurイベント
 * @param {Event} evt イベントオブジェクト
 */
Top.$doBlurKeywordTxt = function(evt) {
  var METHODNAME = "Top.$doBlurKeywordTxt";
  try {
    
    var target = Event.$element(evt);
    
    // 未入力の場合、デフォルト値を設定
    if(Field.$getValue(target) == "") {
      Field.$setValue(target, Use.Util.$getMessage("CONST_DEFKEYROWD"));
      Element.$addClassName(target, "deftxt");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索キーワード入力(検索キーワード変更時)
 */
Top.$doBeforeChangeKeywordTxt = function() {
  var METHODNAME = "Top.$doBeforeChangeKeywordTxt";
  try {
    
    Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索キーワード内でキー押下
 * @param {Event} evt イベントオブジェクト
 */
Top.$doKeydownKeywordTxt = function(evt) {
  var METHODNAME = "Top.$doKeydownKeywordTxt";
  try {
    
    var keyCode = Event.$getKeyCode(evt);
    
    // Enterキー押下の場合
    if(keyCode == Event.KEY_RETURN) {
      // テキスト検索XMLが有効の場合
      if(Top.globalInfo.VALID_SIMPLE == "yes") {
        Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
        // 簡易検索処理の実行
        Top.$doBeforeClickSearchBtn();
        Event.$stop(evt);
      // テキスト検索XMLが無効の場合
      } else if(Top.globalInfo.VALID_SIMPLE == "no") {
        // 横串検索XMLが有効の場合
        if(Top.globalInfo.VALID_YOKO == "yes") {
          Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
          // 横串検索処理の実行
          Top.$doBeforeClickYokogushiBtn();
          Event.$stop(evt);
        }
      }
    }
    
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 簡易検索(検索ボタン押下時)
 */
Top.$doBeforeClickSearchBtn = function() {
  var METHODNAME = "Top.$doBeforeClickSearchBtn";
  try {
    
    var valid = Use.Validator;
    var keywordText = Field.$getValue($("keyword"));
    var msg = "";
    var url = Top.PATH_LIST.SERVICE;
    var opt = Top.WINDOW_OPEN_OPTION;
    
    var errors = [];
    var lenErr = Top.errorElements.length;
    var keywordName = Use.Util.$getMessage("CONST_KEYWORD_NM");
    
    
    // エラー項目の初期化
    for(var i = 0; i < lenErr; i++) {
      Element.$removeClassName(
        Top.errorElements[i], Use.Util.CLASS_INPUT_ERROR);
    }
    
    // 検索キーワードにdeftxtクラスがある場合、未入力とする
    if(Element.$hasClassName($("keyword"), "deftxt")) {
      keywordText = "";
    }
    
    // 検索キーワードのエラーをクリア
    Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
    
    // プルダウンの必須チェック
    if(!$("teki_date").value) {
      msg = "MVWF0003AAE";
      errors.push($("teki_date"));
    }
    
    // 検索キーワードの必須チェック
    if(!valid.$isNotEmpty(keywordText)) {
      msg = msg || "MVWF0004AAE";
      errors.push($("keyword"));
    // テキストのサイズチェック
    } else if(!valid.$checkSize(keywordText, 200)) {
      msg = msg || "MVWF0005AAE";
      errors.push($("keyword"));
    // 単語数チェック
    } else if(!valid.$checkNumberOfWords(keywordText, 30)) {
      msg = msg || "MVWF0007AAE";
      errors.push($("keyword"));
    // 禁止文字チェック
    } else if(valid.$checkPermissionWord(keywordText) != -1) {
      msg = msg || "MVWF1008AAE";
      errors.push($("keyword"));
    // 空文字チェック
    } else if(valid.$isAllBlank(keywordText)) {
      msg = msg || "MVWF1011AAE";
      errors.push($("keyword"));
    }
    
    // msgに文字列がある場合はキーワードのNG処理
    if(msg) {
      Use.Util.$alert(Use.Util.$getMessage(msg, keywordName), errors);
      Top.errorElements = errors;
    // 文字列が無ければ正常と判断
    } else {
      // 検索キーワードが、索引画面から設定された検索キーワードと異なる場合
      // 品名コードをクリアする
      if(keywordText != Top.indexKeywordTxt) {
        Top.globalInfo.PARTS_CD = "";
      }
      
      Top.globalInfo.START_TYPE = "2";
      $("start_type").innerHTML = "2";
      Top.globalInfo.KEYWORD = keywordText;
      Util.$openUrl(url, "_blank", opt, Util.WINDOW_SIZE_1)
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 横串検索ボタン
 */
Top.$doBeforeClickYokogushiBtn = function() {
  var METHODNAME = "Top.$doBeforeClickYokogushiBtn";
  try {
    
    var valid = Use.Validator;
    var keywordText = Field.$getValue($("keyword"));
    var msg = "";
    var url = Top.PATH_LIST.SERVICE;
    var opt = Top.WINDOW_OPEN_OPTION;
    
    var errors = [];
    var lenErr = Top.errorElements.length;
    
    // エラー項目の初期化
    for(var i = 0; i < lenErr; i++) {
      Element.$removeClassName(
        Top.errorElements[i], Use.Util.CLASS_INPUT_ERROR);
    }
    
    var keywordName = Use.Util.$getMessage("CONST_KEYWORD_NM");
    var yokogushiKey = Use.Util.$getMessage("CONST_YOKOGUSHI_VCHECK_ERROR");
    
    // 検索キーワードにdeftxtクラスがある場合、未入力とする
    if(Element.$hasClassName($("keyword"), "deftxt")) {
      keywordText = "";
    }
    
    // プルダウンの必須チェック
    if(!$("teki_date").value) {
      msg = Use.Util.$getMessage("MVWF0003AAE");
      errors.push($("teki_date"));
    }
    
    // 必須チェック
    if(!valid.$isNotEmpty(keywordText)) {
      msg = msg || Use.Util.$getMessage("MVWF0004AAE");
      errors.push($("keyword"));
    // 桁数チェック
    } else if(!valid.$isCorrectPattern(keywordText, "^.{5,200}$")) {
      msg = msg || Use.Util.$getMessage("MVWF0006AAE");
      errors.push($("keyword"));
    // 最大単語数チェック
    } else if(!valid.$checkNumberOfWords(keywordText, 1)) {
      msg = msg || Use.Util.$getMessage("MVWF0006AAE");
      errors.push($("keyword"));
    // ALLブランクチェック
    } else if(valid.$isAllBlank(keywordText)) {
      msg = msg || Use.Util.$getMessage("MVWF0009AAE", yokogushiKey);
      errors.push($("keyword"));
    // 属性チェック
    } else if(!valid.$isCorrectPattern(keywordText, "^[Ａ-Ｚａ-ｚ／０-９A-Za-z/0-9]+$")) {
      msg = msg || Use.Util.$getMessage("MVWF0009AAE", yokogushiKey);
      errors.push($("keyword"));
    //禁止文字チェック
    } else if(valid.$checkPermissionWord(keywordText) != -1) {
      msg = msg || Use.Util.$getMessage("MVWF0009AAE", yokogushiKey);
      errors.push($("keyword"));
    }
    
    // msgに文字列がある場合はキーワードのNG処理
    if(msg) {
      Use.Util.$alert(msg, errors);
      Top.errorElements = errors;
    // 文字列が無ければ正常と判断
    } else {
      // 検索キーワードが、索引画面から設定された検索キーワードと異なる場合
      // 品名コードをクリアする
      if(keywordText != Top.indexKeywordTxt) {
        Top.globalInfo.PARTS_CD = "";
      }
      
      Top.globalInfo.START_TYPE = "3";
      Top.globalInfo.KEYWORD = keywordText;
      Util.$openUrl(url, "_blank", opt, Util.WINDOW_SIZE_1)
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 閲覧画面表示(サービス情報ボタン押下時)
 */
Top.$doBeforeClickServiceBtn = function() {
  var METHODNAME = "Top.$doBeforeClickServiceBtn";
  try {
    
    var url = Top.PATH_LIST.SERVICE;
    var opt = Top.WINDOW_OPEN_OPTION;
    var keywordText = Field.$getValue($("keyword"));
    
    // プルダウンの必須チェックがNGの場合はアラート表示
    if(!$("teki_date").value) {
      Use.Util.$alert(Use.Util.$getMessage("MVWF0003AAE"), [$("teki_date")]);
      Top.errorElements = [$("teki_date")];
    // OKの場合は画面表示処理
    } else {
      // 検索キーワードにdeftxtクラスがある場合、未入力とする
      if(Element.$hasClassName($("keyword"), "deftxt")) {
        keywordText = "";
      }
      
      // 検索キーワードが、索引画面から設定された検索キーワードと異なる場合
      // 品名コードをクリアする
      if(keywordText != Top.indexKeywordTxt) {
        Top.globalInfo.PARTS_CD = "";
      }
      
      Top.globalInfo.START_TYPE = "1";
      $("start_type").innerHTML = "1";
      Top.globalInfo.KEYWORD = keywordText;
      Util.$openUrl(url, "_blank", opt, Util.WINDOW_SIZE_1);
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * ヘルプ画面表示(ヘルプリンククリック時)
 */
Top.$doClickHelpLnk = function(sw, sh) {
  var METHODNAME = "Top.$doClickHelpLnk";
  try {
    
    var url = Top.PATH_LIST.HELP;
    var opt = Top.WINDOW_OPEN_OPTION;
    var tgt = "ShowGuideBook_" + Use.Util.$getInitDate();
    
    Util.$openUrl(url, tgt, opt, Util.WINDOW_SIZE_2);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 横串検索ヘルプ アイコン
 */
Top.$doClickYokogushiHelpIcn = function() {
  var METHODNAME = "Top.doClickYokogushiHelpIcn";
  try {
    
    var url = Top.PATH_LIST.YOKOGUSI;
    var opt = Top.WINDOW_OPEN_OPTION;
    var tgt = "ShowYokogushiGuideBook_" + Use.Util.$getInitDate();
    
    Util.$openUrl(url, tgt, opt, Util.WINDOW_SIZE_2);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 索引リスト選択画面表示(索引リスト選択画面表示アイコンクリック時)
 */
Top.$doClickSakuinLnk = function() {
  var METHODNAME = "Top.$doClickSakuinLnk";
  try {
    
    Use.Index.$show(
      Top.faceBox,
      Top.$setIndexResults,
      Top.globalInfo.LANG_CODE,
      Top.globalInfo.LANG_CODE,
      $("mdl_index")
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * はじめにお読みください画面表示(はじめにお読みください表示リンククリック時)
 */
Top.$doClickHajimeLnk = function() {
  var METHODNAME = "Top.$doClickHajimeLnk";
  try {
    
    Use.Util.$request(
      Top.PATH_LIST.README,
      true,
      Top.$getReadMeOnSuccess,
      Top.$getReadMeOnFailure,
      true,
      false
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * HTML取得成功時の処理(readme.html)
 * @param {Response} res レスポンスオブジェクト
 */
Top.$getReadMeOnSuccess = function(res) {
  var METHODNAME = "Top.$getReadMeOnSuccess";
  try {
    
    var root = $$("html")[0];
    var klass = root.className;
    var title = Use.Util.$getMessage("CONST_README_TTL");
    var inEle = document.createElement("div");
    
    inEle.innerHTML = res.responseText;
    inEle.innerHTML =
      Util.Selector.$select("div#contents_body", inEle)[0].innerHTML;
    $("readme_body").innerHTML = inEle.innerHTML;
    
    Use.Util.$revealFacebox(Top.faceBox, $("readme"), "", true, title, true);
    Use.Util.$observe($("fbx_btn_agree"), "click",
      function() { Top.$doClickYesBtn(klass) });
    Use.Util.$observe($("fbx_btn_notagree"), "click",
      function() { Top.$doClickNoBtn(klass) });
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * HTML取得失敗時の処理(readme.html)
 * @param {object} res レスポンスオブジェクト
 */
Top.$getReadMeOnFailure = function(res) {
  var METHODNAME = "Top.$getReadMeOnFailure";
  try {
    
    Use.SystemError.$show(null, METHODNAME, "MVWF0123DAE");
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 「同意する」押下時の処理
 * @param {string} klass HTMLエレメントのデフォルトクラス名
 */
Top.$doClickYesBtn = function(klass) {
  var METHODNAME = "Top.$doClickYesBtn";
  try {
    
    Top.faceBox.close();
    Element.$addClassName($$("html")[0], klass);
    $("mdl_readme").focus();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 「同意しない」押下時の処理
 * @param {string} klass HTMLエレメントのデフォルトクラス名
 */
Top.$doClickNoBtn = function(klass) {
  var METHODNAME = "Top.$doClickNoBtn";
  try {
    
    Top.faceBox.close(true);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 索引画面のコールバック処理
 * @param {element} article 選択品名行
 */
Top.$setIndexResults = function(article) {
  var METHODNAME = "Top.$setIndexResults";
  try {
    
    var target = $("keyword");
    var paragraph = null;
    var articlecd = null;
    var partsName = null;
    
    // 検索キーワードのエラーをクリア
    Element.$removeClassName(target, Use.Util.CLASS_INPUT_ERROR);
    
    paragraph = Util.Selector.$select("div.paragraph", article)[0];
    articlecd = Util.Selector.$select("div.articlecode", article)[0];
    
    partsName = Util.$getNodeText(paragraph);
    
    Field.$setValue(target, partsName);
    Top.indexKeywordTxt = partsName;
    Top.globalInfo.PARTS_CD = Util.$getNodeText(articlecd);
    
    Element.$removeClassName(target, "deftxt");
    Util.$setTextBoxSelection(target);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}
