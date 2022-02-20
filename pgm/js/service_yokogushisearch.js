/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2011/12/16 */

/**
 * file service_yokogushisearch.js<br />
 *
 * @fileoverview このファイルには、横串検索の関数が定義されています。<br />
 * file-> service_yokogushisearch.js
 * @author 渡会
 * @version 1.0.0
 *
 * History(date|version|name|desc)<br />
 *  2011/03/10|1.0.0   |渡会|新規作成<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/03/10 1.0.0 渡会 ・新規作成
 *---------------------------------------------------------------------------*/
/**
 * 横串検索
 * @namespace 横串検索クラス
 */
Service.YokogushiSearch = {};
/**
 * テキスト検索XML用XPATH
 * @type string
 */
Service.YokogushiSearch.SEARCH_DTC = "//dtc";
/**
 * 検索結果の上限値
 * @type number
 */
Service.YokogushiSearch.MAX_RESULT = 500;
/**
 * 検索対象要素を取得するXPATH
 */
Service.YokogushiSearch.LOCATION = ".//location[@type=\'{manual}\']";
/**
 * 検索結果のコールバック関数
 * @private
 * @type function
 */
Service.YokogushiSearch.$result = null;
/**
 * マニュアル言語
 * @private
 * @type string
 */
Service.YokogushiSearch.mlang = "";
/**
 * 車種世代コード
 * @private
 * @type string
 */
Service.YokogushiSearch.pubBindID = "";
/**
 * 適用時期
 * @private
 * @type string
 */
Service.YokogushiSearch.tekiDate = "";
/**
 * 検索対象マニュアル情報
 * @private
 * @type Array
 */
Service.YokogushiSearch.manuals = [];
/**
 * 車両型式
 * @private
 * @type string
 */
Service.YokogushiSearch.carType = "";
/**
 * 品名コード
 * @private
 * @type string
 */
Service.YokogushiSearch.partsCD = "";
/**
 * 検索キーワード
 * @private
 * @type string
 */
Service.YokogushiSearch.keyword = "";
/**
 * 開始位置
 * @private
 * @type string
 */
Service.YokogushiSearch.position = "";
/**
 * 取得件数
 * @private
 * @type string
 */
Service.YokogushiSearch.number = "";
/**
 * 全角/半角変換
 * @type object(連想配列)
 */
Service.YokogushiSearch.REPLACE_ZENKAKU_CHAR = {
  Ａ: "A",
  Ｂ: "B",
  Ｃ: "C",
  Ｄ: "D",
  Ｅ: "E",
  Ｆ: "F",
  Ｇ: "G",
  Ｈ: "H",
  Ｉ: "I",
  Ｊ: "J",
  Ｋ: "K",
  Ｌ: "L",
  Ｍ: "M",
  Ｎ: "N",
  Ｏ: "O",
  Ｐ: "P",
  Ｑ: "Q",
  Ｒ: "R",
  Ｓ: "S",
  Ｔ: "T",
  Ｕ: "U",
  Ｖ: "V",
  Ｗ: "W",
  Ｘ: "X",
  Ｙ: "Y",
  Ｚ: "Z",
  ａ: "A",
  ｂ: "B",
  ｃ: "C",
  ｄ: "D",
  ｅ: "E",
  ｆ: "F",
  ｇ: "G",
  ｈ: "H",
  ｉ: "I",
  ｊ: "J",
  ｋ: "K",
  ｌ: "L",
  ｍ: "M",
  ｎ: "N",
  ｏ: "O",
  ｐ: "P",
  ｑ: "Q",
  ｒ: "R",
  ｓ: "S",
  ｔ: "T",
  ｕ: "U",
  ｖ: "V",
  ｗ: "W",
  ｘ: "X",
  ｙ: "Y",
  ｚ: "Z",
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
  i: "I",
  j: "J",
  k: "K",
  l: "L",
  m: "M",
  n: "N",
  o: "O",
  p: "P",
  q: "Q",
  r: "R",
  s: "S",
  t: "T",
  u: "U",
  v: "V",
  w: "W",
  x: "X",
  y: "Y",
  z: "Z",
  "０": "0",
  "１": "1",
  "２": "2",
  "３": "3",
  "４": "4",
  "５": "5",
  "６": "6",
  "７": "7",
  "８": "8",
  "９": "9",
  "\／": "\/"
};

/**
 * 横串検索
 * @param {function} result コールバック関数
 * @param {string} mlang マニュアル言語
 * @param {string} pubBindID 車種世代コード
 * @param {string} tekiDate 適用時期
 * @param {Array} manuals 検索対象マニュアル情報
 * @param {string} carType 車両型式
 * @param {string} partsCD 品名コード
 * @param {string} keyword 検索キーワード
 * @param {string} position 開始位置
 * @param {string} number 取得件数
 */
Service.YokogushiSearch.$search = function(result, mlang, pubBindID,
    tekiDate, manuals, carType, partsCD, keyword, position, number) {
  var METHODNAME = "Service.YokogushiSearch.$search";
  try {
    var url = null;

    var aryManuals = manuals.split(",");

    Service.YokogushiSearch.$result = result;
    Service.YokogushiSearch.mlang = mlang;
    Service.YokogushiSearch.pubBindID = pubBindID;
    Service.YokogushiSearch.tekiDate = tekiDate;
    Service.YokogushiSearch.manuals = aryManuals;
    Service.YokogushiSearch.carType = carType;
    Service.YokogushiSearch.partsCD = partsCD.toLowerCase();
    Service.YokogushiSearch.keyword = 
      keyword.replace(/[Ａ-Ｚａ-ｚ０-９a-z／]/g, function(s) {
        return Service.YokogushiSearch.REPLACE_ZENKAKU_CHAR[s]; 
      });
    Service.YokogushiSearch.position = position;
    Service.YokogushiSearch.number = number;

    //XML読み込み
    url = Use.Util.$getContentsPath(
        "C_SERVICE_YOKOGUSHI_INDEX_XML_PATH", "", "", mlang, "");
    url = url.replace("{1}",
        encodeURIComponent(Service.YokogushiSearch.keyword.substring(0,5)));

    //横串検索の対象XMLを取得する
    Use.Util.$request(
      url,
      false,
      Service.YokogushiSearch.$getSearchOnSuccess,
      Service.YokogushiSearch.$getSearchOnFailure,
      true,
      true
    );

  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * テキスト検索XML読込成功時処理
 * @param {Response} res レスポンスオブジェクト
 */
Service.YokogushiSearch.$getSearchOnSuccess = function(res) {
  var METHODNAME = "Service.YokogushiSearch.$getSearchOnSuccess";
  try {
    var yokogushiIndex = res.responseXML;
    var matchFlg = false;
    var result = {};
    var arrManual = [];
    var manual = {};
    var arrPara = [];
    var copyedArrPara = [];
    var locations = null;
    var query = "";
    var manualId = "";
    var dtcCode = null;
    var termFrom = "";
    var termTo = "";
    var filters = "";
    var min = 0;
    var max = 0;
    var dtcLen = 0;
    var codeLen = 0;
    var manualLen = 0;
    var locLen = 0;
    var workManuals = [];
    var status = "0";
    var messageid = "";
    var nHitcount = 0;
    var isExpand = false;
    var isHitcountOver = false;
    var nManualLen = 0;

    //dtc一覧を取得
    dtcList = Util.$getNodes(
        yokogushiIndex, Service.YokogushiSearch.SEARCH_DTC);

    dtcLen = dtcList.length;
    //dtc要素を全て参照する
    for(var dtcIdx = 0; dtcIdx < dtcLen; dtcIdx++) {

      dtcNode = dtcList[dtcIdx];

      dtcCode = Util.$getAttrValue(dtcNode, "dtccode");

      //dtccode属性と検索キーワードを比較
      if(dtcCode.indexOf(Service.YokogushiSearch.keyword) != 0) {
        //検索キーワードとdtccode属性の文字列が一致し無かった場合要素を削除する
        dtcNode.parentNode.removeChild(dtcNode);
      }
    }

    workManuals = Service.YokogushiSearch.manuals;
    manualLen = workManuals.length;
    //初期化時に取得した検索対象マニュアル分ループする
    for(var mIdx = 0; mIdx < manualLen; mIdx++) {

      //XPATHクエリ式を初期化する
      query = Service.YokogushiSearch.LOCATION;
      manualType = DictConst.C_SERVICE_MANUAL_TYPE[workManuals[mIdx]];
      manualId = DictConst.C_PUB_TYPE_CONVERTER[manualType];

      manual = {};
      manual["id"] = manualType;

      //指定のカテゴリのlocationを取得する
      query = query.replace("{manual}", manualId);

      //直接指定したカテゴリのlocationのリストを取得する
      locations = Util.$getNodes(yokogushiIndex, query);

      locLen = locations.length;
      //DTC配下のリストをループする
      for(var locIdx = 0; locIdx < locLen; locIdx++) {

        //適用時期の判定
        termFrom = Util.$getAttrValue(locations[locIdx], "term-from");

        //適用時期がマデ埋めされている場合
        if(!(null == Util.$getAttr(locations[locIdx], "term-to"))) {
          termTo = Util.$getAttrValue(locations[locIdx], "term-to");
        //適用時期がマデ埋めされていない場合、termToに最大値を設定する
        } else {
          termTo = "999999";
        }

        //適用時期の範囲に入っていない場合,現在見ている要素を削除する
        if(termFrom > Service.YokogushiSearch.tekiDate || 
            Service.YokogushiSearch.tekiDate >= termTo) {
          locations[locIdx].parentNode.removeChild(locations[locIdx]);
          continue;
        }

        //車両型式がある場合
        if(Service.YokogushiSearch.carType != "" ) {
          //location以下のfilterを取得
          filters = Util.$getNodes(
              locations[locIdx], 
              "./filter[@id=\'" + Service.YokogushiSearch.carType + "\']");
          //車両型式を検索した結果一致した場合,
          //そのlocation要素を削除する
          if(filters.length != 0) {
            locations[locIdx].parentNode.removeChild(locations[locIdx]);
            continue;
          }
        }
      }

      //カテゴリ毎の検索結果を作成する
      //指定のカテゴリのlocationを再取得する
      query = query.replace("{manual}", manualId);

      //直接指定したカテゴリのlocationのリストを取得する
      locations = Util.$getNodes(yokogushiIndex, query);

      min = 0;
      max = 0;

      //検索結果が有る場合
      if(locations.length > 0) {
        arrPara = [];
        //検索結果の作成(マージ機能有り)
        Service.YokogushiSearch.$makeContent(
            yokogushiIndex, locations, manualId, arrPara);
        min = parseInt(Service.YokogushiSearch.position, 10);
        if(min > locations.length){
          // 取得開始位置が検索結果件数を超えた場合
          // 取得開始位置を1にする
          min = 1;
        }
        max = min + parseInt(Service.YokogushiSearch.number, 10) - 1;

        //検索結果の件数が最大件数を超えた場合，それ以下の結果を切り捨てる
        if(max > arrPara.length) {
          max = arrPara.length;
        }
        //指定件数分，検索結果を取得する
        copyedArrPara = [];
        //検索結果の作成
        for(var slIdx = min; slIdx <= max; slIdx++) {
          copyedArrPara.push(arrPara[slIdx - 1]);
        }
        manual["position"] = min.toString();
        manual["number"] = (max - min + 1).toString();
        manual["cnt"] = arrPara.length;
        manual["contents"] = copyedArrPara;

      //検索対象のノードが存在しない場合
      } else {
        manual["position"] = 0;
        manual["number"] = 0;
        manual["cnt"] = 0;
        manual["contents"] = [];
      }

      arrManual.push(manual);
    }

    nManualLen = arrManual.length;
    //マニュアル数分繰り返し
    for(var i = 0; i < nManualLen; i++) {
      nHitcount = arrManual[i].cnt;
      //検索結果の有無をチェック
      if(!isExpand && nHitcount >= 1) {
        isExpand = true;
      }
      //マニュアル毎の最大件数が500件のため、超えている場合は500件で上書き
      if(nHitcount > Service.YokogushiSearch.MAX_RESULT) {
        arrManual[i].cnt = Service.YokogushiSearch.MAX_RESULT;
        isHitcountOver = true;
      }
    }
    //検索したすべてのマニュアルの検索結果件数が0件の場合
    if(!isExpand) {
      status = "2";
      messageid = "MVWF0028AAE";
    }
    //検索結果件数が500件を超えたマニュアルがある場合
    if(isHitcountOver) {
      status = "3";
      messageid = "MVWF0032AAE";
    }

    result["status"]    = status;
    result["keyword"]   = Service.YokogushiSearch.keyword;
    result["messageid"] = messageid;
    result["manual"]    = arrManual;

    Service.YokogushiSearch.$result(result);
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * コンテンツ情報を作成
 * @private
 * @param {object} yokogushiIndex DOM情報
 * @param {object} locationList パラグラフ要素一覧
 * @param {string} manualId パブタイプ
 * @param {string} arrPara マニュアル情報リスト
 * @return {object(連想配列)} コンテンツ情報
 */
Service.YokogushiSearch.$makeContent = function(
    yokogushiIndex, locationList, manualId, arrPara) {
  var METHODNAME = "Service.YokogushiSearch.$makeContent";
  try {
    var query = Service.YokogushiSearch.LOCATION.replace("{manual}", manualId);
    var mergeQuery = "";

    var locLen = 0;
    var locItem = null;
    var wLocationList = [];
    var wLocLen = 0;
    var wLocItem = null;

    var category = "";
    var disptitle = "";
    var linkkey = "";
    var mergedParts = "";
    var srvcatId = "";
    var sectionId ="";
    var ttlId = "";
    var paraId = "";
    var dtccode = "";
    var ncfParaCategory = "";
    var partsList = [];
    var partsLen = 0;
    var parts = [];

    locLen = locationList.length;

    // locationのマージ処理
    for(var i = 0; i < locLen; i++) {
      locItem = locationList[i];

      // 初期化
      category = "";
      disptitle = "";
      linkkey = "";
      mergedParts = "";
      srvcatId = Util.$getAttrValue(locItem, "servcat-id");
      sectionId = Util.$getAttrValue(locItem, "section-id");
      ttlId = Util.$getAttrValue(locItem, "ttl-id");
      paraId = Util.$getAttrValue(locItem, "para-id");
      dtccode = "";
      ncfParaCategory = "";
      partsList = [];
      partsLen = 0;
      parts = [];

      // 配線図の場合、品名コードを取得
      if(manualId == "EM") {
        partsList = Util.$getNodes(locItem, "./prt/parts");
        partsLen = partsList.length;
        for(var j = 0; j < partsLen; j++) {
          parts.push(Util.$getNodeText(partsList[j]));
        }
      }

      // キーが同じlocationを取得するXPATHを作成
      mergeQuery = ".//location[@type=\'{manual}\'";
      mergeQuery = mergeQuery + " and @servcat-id=\'{servcat-id}\'"
      mergeQuery = mergeQuery + " and @section-id=\'{section-id}\'"
      mergeQuery = mergeQuery + " and @ttl-id=\'{ttl-id}\'"
      if(manualId == "RM" || manualId == "NM") {
        mergeQuery = mergeQuery + " and @para-id=\'{para-id}\'"
      }
      mergeQuery = mergeQuery + "]"
      mergeQuery = mergeQuery.replace("{manual}", manualId);
      mergeQuery = mergeQuery.replace("{servcat-id}", srvcatId);
      mergeQuery = mergeQuery.replace("{section-id}", sectionId);
      mergeQuery = mergeQuery.replace("{ttl-id}", ttlId);
      mergeQuery = mergeQuery.replace("{para-id}", paraId);

      // キーが同じlocationを取得する
      wLocationList = Util.$getNodes(yokogushiIndex, mergeQuery);
      wLocLen = wLocationList.length;

      // キーが同じlocationの削除処理
      for(var j = 1; j < wLocLen; j++) {
        wLocItem = wLocationList[j];

        // 配線図の場合、キーが同じlocationから品名コードを取得
        if(manualId == "EM") {
          partsList = Util.$getNodes(wLocItem, "./prt/parts");
          partsLen = partsList.length;
          // 品名コードを追加
          for(var k = 0; k < partsLen; k++) {
            parts.push(Util.$getNodeText(partsList[k]));
          }
        }

        // キーが同じlocationを削除
        wLocItem.parentNode.removeChild(wLocItem);
      }

      // キーが同じlocationを削除した場合
      if(wLocLen >= 2) {
        // XMLからキーが同じlocationを削除した後のlocationのリストを再取得
        locationList = Util.$getNodes(yokogushiIndex, query);
        locLen = locationList.length;
      }

      // 検索結果リンクのリンク文字列を取得
      disptitle = Util.$getAttrValue(locItem, "disp-name");

      // 修理書
      if(manualId == "RM") {
        category = "C";
        dtccode = Util.$getAttrValue(locItem.parentNode, "dtccode");
        linkkey = srvcatId + "," + sectionId + "," + ttlId + "," 
            + paraId + "," + dtccode;
      // 解説書
      } else if(manualId == "NM") {
        category = "F";
        ncfParaCategory = Util.$getAttrValue(locItem, "ncf-para-category");
        linkkey = srvcatId + "," + sectionId + "," + ttlId + "," 
            + ncfParaCategory + "," + paraId;
      // 配線図
      } else if(manualId == "EM") {
        category = "";
        linkkey = Util.$getAttrValue(locItem, "linkkey");
        // 同一の品名コードをマージする
        mergedParts = Service.YokogushiSearch.$merge(parts);
      }

      // 検索結果を作成する
      arrPara.push({
        id:        i + 1,
        category:  category,
        type:      "10",
        disptitle: disptitle,
        linkkey:   linkkey,
        parts:     mergedParts
      });
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * マージ処理
 * @private
 * @param {Array} マージ対象の値
 * @return {string} マージ後の値
 */
Service.YokogushiSearch.$merge = function(val) {
  var METHODNAME = "Service.YokogushiSearch.$merge";
  try {
    var valueLen = val.length;
    var preValue = "";
    var result = "";

    //値がない場合，処理を終える
    if(valueLen == 0) {
      return result;
    }

    //比較元のループ
    for(var valIdx = 0; valIdx < valueLen; valIdx++) {
      //比較対象のループ
      for(var curIdx = valIdx + 1; curIdx < valueLen; curIdx++) {
        //同一の値が見つかった場合
        if(val[curIdx] == val[valIdx]) {
          val[curIdx] = null;
        }
      }
    }
    //結果の文字列を作成
    for(var resIdx = 0; resIdx < valueLen; resIdx++) {
      //値が存在する場合
      if(val[resIdx] != null) {
        //初回のループで無い場合
        if(result != "") {
          result += ",";
        }
        result += val[resIdx];
      }
    }
    return result;
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 横串検索XML読込処理の失敗時処理
 * @param {Response} res XMLのDOM情報
 */
Service.YokogushiSearch.$getSearchOnFailure = function(res) {
  var METHODNAME = "Service.YokogushiSearch.$getSearchOnFailure";
  try {
    var result = {};
    var status = "0";
    var messageid = "";
    var arrManual = [];
    var manual = {};
    var manualLen = 0;
    
    //ファイルが存在しない場合
    status = "2";
    messageid = "MVWF0028AAE";
    
    manualLen = Service.YokogushiSearch.manuals.length;
    //マニュアル数分繰り返し
    for(var i = 0; i < manualLen; i++) {
      manual = {};
      manual["id"] = 
          DictConst.C_SERVICE_MANUAL_TYPE[Service.YokogushiSearch.manuals[i]];
      manual["position"] = 0;
      manual["number"] = 0;
      manual["cnt"] = 0;
      manual["contents"] = [];
      arrManual.push(manual);
    }
    
    result["status"]    = status;
    result["keyword"]   = Service.YokogushiSearch.keyword;
    result["messageid"] = messageid;
    result["manual"]    = arrManual;
    
    Service.YokogushiSearch.$result(result);
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};
