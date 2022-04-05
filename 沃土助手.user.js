// ==UserScript==
// @name         沃土助手
// @namespace    https://github.com/qq57240/WakfuAssistant
// @version      0.2.0
// @description  沃土官方百科精准翻译及搜索框增强
// @author       Soviet
// @match        https://www.wakfu.com/en/mmorpg/encyclopedia/*
// @icon         https://raw.githubusercontents.com/qq57240/WakfuAssistant/main/128.png
// @resource css https://raw.githubusercontents.com/qq57240/WakfuAssistant/main/translate.css
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.githubusercontents.com/qq57240/WakfuAssistant/main/pedia.js
// @license      MIT License
// @compatible   chrome
// @compatible   firefox
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==
(function() {
    "use strict";
    GM_addStyle(GM_getResourceText("css"));
    $(".col-md-3").after($('<div id="append"></div>'));

    function getEN(str, pedarray) {
        let result = "";
        $.each(pedarray, function(k, v) {
            if (v != null) {
                if (v["cn"] == str) {
                    result = v["en"];
                    let reg1 = /\'/g;
                    let reg2 = /\"/g;
                    result = result.replace(reg1, "\\'").replace(reg2, '\\"');
                    return false;
                }
            }
        });
        if (result) {
            $("#text_0").val(result);
        }
    }

    function transListTable(pagetype) {
        $("tbody tr").each(function(index, el) {
            let pedarray, pedtype, jsonstr, jsonobj, type, id;
            jsonstr = $(el).find("td").eq(1).find("script").eq(0).text();
            if (jsonstr) {
                jsonobj = JSON.parse(jsonstr);
                id = jsonobj["linker-query-datas"].id;
                type = jsonobj["linker-id"].match(/(item)|(monster)|(set)/)[0];
                pedtype = type == "item" ? 1 : 0;
                pedarray = getArrayByType(type);
                if (pedarray[id] != null) {
                    $(el)
                        .find("td")
                        .eq(1)
                        .find("span")
                        .eq(pedtype)
                        .find("a")
                        .text(pedarray[id].cn);
                }
            }

            switch (pagetype) {
                case "monsters":
                    var en = $(el).find("td").eq(2).text();
                    if (en != "") {
                        let key = getKeybyEN(en, pedia.families);
                        if (key >= 0) {
                            $(el).find("td").eq(2).text(pedia.families[key].cn);
                        }
                    }
                case "pets":
                case "mounts":
                case "armors":
                case "weapons":
                case "accessories":
                    $(el).find(".item-caracteristics").find(".ak-title").each(function(index, em) {
                        let src_text = $(em).eq(0).text();
                        $.each(pedia.bonus, function(k, v) {
                            src_text = src_text.replace(v.en,v.cn);
                        });
                        $(em).eq(0).text(src_text);
                    });
                default:
                    return;
            }
        });
    }

    function transDetailTable() {
        let jsonstr, jsonobj, pedarray, id;
        jsonstr = $(".ak-container.ak-main-aside")
            .find('script[type="application/json"]')
            .text();
        if (jsonstr) {
            jsonobj = JSON.parse(jsonstr);
            id = jsonobj.storage.id;
            pedarray = getArrayByType(jsonobj["storage"].type);
            $("h1.ak-return-link").contents().eq(2).remove();
            $("h1.ak-return-link").append(pedarray[id].cn);
            $("h1.ak-return-link").css("font-family", "微软雅黑");
            $(".ak-panel-title")
                .contents()
                .each(function() {
                    if (this.nodeType == 3) {
                        if (this.wholeText.trim() == "Description" && descriptions[id]) {
                            debugger;
                            $(this).parent().next().html(descriptions[id].cn);
                        }
                    }
                });
        }
    }

    function transDetailList() {
        $(".row.ak-container")
            .find(".ak-title")
            .each(function(index, el) {
                let pedarray, jsonstr, jsonobj, id;
                jsonstr = $(el).find("script").text();
                if (jsonstr) {
                    jsonobj = JSON.parse(jsonstr);
                    pedarray = getArrayByType(
                        jsonobj["linker-id"].match(/(item)|(monster)|(set)/)[0]
                    );
                    id = jsonobj["linker-query-datas"].id;
                    if (pedarray[id] != null) {
                        $(el).find(".ak-linker").text(pedarray[id].cn);
                    }
                } else {
                    let enstr = trimStr($(el).text());
                    let key = getKeybyEN(enstr, pedia.skills);
                    if (pedia.skills[key]) {
                        if (pedia.skilldescriptions[key]) {
                            $(el).html(
                                '<span class="ak-linker" title="' +
                                pedia.skilldescriptions[key].cn +
                                '"><span style="color:#6495ED">' +
                                pedia.skills[key].cn +
                                "</span></span>"
                            );
                        } else {
                            $(el).html(pedia.skills[key].cn);
                        }
                    }
                }
            });
    }

    function transKeys() {
        transKeysList("item_monster_families", pedia.families);
        transKeysList("item_monster_nations", pedia.islands);
        transKeysList("item_monster_capturable", pedia.catchables);
        transKeysList("item_skills", pedia.jobs);
        transKeysList("item_type_1", pedia.consumables);
        transKeysList("item_type_2", pedia.consumables);
        transKeysList("item_rarities", pedia.rarities);
        transKeysList("item_ORIGIN", pedia.origines);
        transKeysList("item_effects", pedia.effects);
    }

    function transKeysList(keystr, keysarray) {
        let keysel = $('div[data-name="' + keystr + '"]');
        let tpl = "";
        if ($(keysel).length == 0) {
            return false;
        }
        $(keysel)
            .find("ul.ak-list-filters-check")
            .find("li")
            .each(function(index, el) {
                let id = $(el).find("input").attr("value");
                if (id) {
                    if (id.indexOf(",")) {
                        //console.log(id.split(",")[0]);
                        id = id.split(",")[0];
                    }
                    if (keysarray[id] != null) {
                        if (keystr == "item_rarities") {
                            tpl = '<span class="ak-icon-small ak-rarity-' + id + '"></span>';
                        }
                        $(el)
                            .find("label")
                            .html(tpl + keysarray[id].cn);
                    }
                }
            });
    }

    function getArrayByType(type) {
        switch (type) {
            case "monster":
            case "monsters":
            case "companions":
                return pedia.monsters;
            case "item":
            case "items":
                return pedia.items;
            case "set":
            case "sets":
                return pedia.sets;
            default:
                return pedia.items;
        }
    }

    function getKeybyEN(str, pedarray) {
        let result;
        str = str.trim();
        $.each(pedarray, function(key, val) {
            if (val && val.en === str) {
                result = key;
                return false;
            }
        });
        return result;
    }
    //去除字符窜两边空格

    function trimStr(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    function translate_run() {
        if ($(".ak-nav-expand-links").length != 0) {
            let pedarray, pedtype;
            let pathname = window.location.pathname;
            let pagetype = pathname.replace("/en/mmorpg/encyclopedia/", "");
            switch (pagetype) {
                case "sets":
                    pedarray = pedia.sets;
                    break;
                case "monsters":
                    pedarray = pedia.monsters;
                    break;
                default:
                    pedarray = pedia.items;
            }
            $("#text_0").attr("placeholder", "请在此输入需要翻译的中文全名...");
            $("#text_0").attr("autocomplete", "off");
            $("#text_0").removeAttr('"');
            $("#append").on("click", "div", function() {
                $("#text_0").val($(this).text());
                $("#append").hide();
                getEN($("#text_0").val(), pedarray);
            });
            $("#text_0").on("keyup", function(e) {
                if (e.keyCode == 13) {
                    getEN($("#text_0").val(), pedarray);
                    $("#append").hide();
                } else {
                    let kw = $("#text_0").val().trim();
                    $(".itemname").remove();
                    if (kw == "") {
                        $("#append").hide();
                        return false;
                    }
                    let conlist = new Array();
                    $.each(pedarray, function(k, v) {
                        if (v != null) {
                            if (v["cn"].indexOf(kw) == 0) {
                                if (conlist.indexOf(v["cn"]) === -1) {
                                    conlist.push(v["cn"]);
                                }
                            }
                        }
                    });
                    conlist.sort();
                    $.each(conlist, function(key, val) {
                        $("#append").append($('<div class="itemname">' + val + "</div>"));
                    });
                    $("#append").offset({
                        top: $("#text_0").offset().top + 45,
                        left: $("#text_0").offset().left
                    });
                    if (conlist.length > 13) {
                        $("#append").height(300);
                    } else {
                        $("#append").height("auto");
                    }
                    $("#append").width($("#text_0").width() + 20);
                    $("#append").show();
                }
            });
            let hastbody = $("tbody").length != 0;
            let hasdetail = $(".ak-encyclo-detail-right").length != 0;
            let hasdrops =
                $(".ak-container.ak-content-list.ak-displaymode-image-col").length !=
                0 && hasdetail;
            if (hastbody) {
                transListTable(pagetype);
                transKeys();
            }
            if (hasdetail) {
                transDetailTable();
                transDetailList();
            }
        }
    }

    function callback(mutationList, observer) {
        mutationList.forEach((mutation) => {
            if (mutation.type === "childList") {
                if (
                    mutation.removedNodes.length === 1 &&
                    mutation.removedNodes[0].className ===
                    "ak-table ak-responsivetable" &&
                    mutation.target.className === "ak-responsivetable-wrapper"
                ) {
                    translate_run();
                }
            }
        });
    }
    let ob = new MutationObserver(callback);
    let article = $(".ak-main-page")[0];
    let options = {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
    };
    ob.observe(article, options);
    translate_run();
})();