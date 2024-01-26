// Текущее
function Current() {}
Current.APP = '';
Current.INSTANCE = '';
Current.NODUMMY = false;

// Инициализация
$(document).ready(function() {
    Current.APP = $('#pFlowId').val();
    Current.INSTANCE = $('#pInstance').val();
    Common.css();
    try {
        if ($('#pFlowId').val().match(/[234].{3,}/)) {
            if (($('#USER_ID').length) && ($('#USER_ID').val() != '') && ($('#USER_ID').val() != undefined)) {
                Common.init();
                Manual.init();
                Message.init();
                Schedule.init();
                Notify.init();
                Apps.init();
            }
        }
    } catch (initException) {
        history.back();
    }
});

// Разное
function Common() {}

Common.APP = 2003;
Common.TMP_1;
Common.TMP_2;
Common.TMP_3;
Common.TMP_4;
Common.TMP_5;
Common.FLAG_1 = true;
Common.FLAG_2 = true;
Common.FLAG_3 = true;
Common.FLAG_4 = true;
Common.FLAG_5 = true;
Common.FLAG_6 = true;
Common.FLAG_7 = true;
Common.FLAG_8 = true;
Common.FLAG_9 = true;
Common.FLAG_10 = true;
Common.NOTIFY_SELECTOR = 'utils_c_notify';
Common.ARR_1 = new Array();
Common.ARR_2 = new Array();
Common.ARR_3 = new Array();
Common.ARR_4 = new Array();
Common.ARR_5 = new Array();
Common.timer_1;

Common.init = function() {
    $(document).on("click.common", "." + Common.NOTIFY_SELECTOR, function() {
        Common.denotify($(this));
        return
    });

    if (!Current.NODUMMY) {
        setTimeout(function() {
            runAsyncAjaxRequest2(Common.APP,
                $("#pFlowStepId").attr("value"),
                "ZERO_PAGE",
                "APPLICATION_PROCESS=DUMMY",
                null,
                null,
                null,
                null,
                function(ajax, params) {
                    Common.dummy(ajax, params)
                },
                null);
        }, 60000);
    }
}

Common.css = function() {
    var doc = document;
    var css = 'commoncss';
    if (!doc.getElementById(css)) {
        var $_head = $('head');
        var link = doc.createElement('link');
        link.id = css;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://isu.ifmo.ru/i/cis-css/classes/common/style.1.1.css';
        link.media = 'all';
        $_head.append(link);
    }
    return
}

Common.dummy = function(ajaxRequest, ajaxParams) {
    return
}

Common.loader = function(obj, what, version) {
    if (what == undefined) {
        what = 'after'
    }
    var loader = document.createElement('img');
    $_loader = $(loader);
    if (version == 2) {
        $_loader.attr({
            src: '/i/cis-images/loading/loading16x16.gif',
            alt: '+'
        });
    } else {
        $_loader.attr({
            src: what == 'after' ? '/i/cis-images/loading/loading16x16.gif' : '/i/cis-images/loading/loading_pman.gif',
            alt: '+'
        });
    }

    var too = $(obj);
    $_loader.css({
        'position': what == 'after' ? 'absolute' : '',
        // 'top':too.offset().top-(what == 'after' ? 7 : 0), 'left':(version == 3 ? '' : too.offset()).left+too.width()-6, // DEPRECATED
        'z-index': '100500'
    });
    switch (what) {
        case 'after':
            {
                obj.after($_loader);
                break;
            }
        case 'html':
            {
                obj.html($_loader);
            }
    }

    return $_loader;
}

Common.deloader = function(lid) {
    lid.remove();
    return
}

Common.loader2 = function(obj) {
    var $_loader = $(document.createElement('img'));
    $_loader.attr({
        src: '/i/cis-images/loading/loading_2.gif',
        alt: 'загрузка...'
    });
    obj.html($_loader);
    return $_loader;
}
Common.deloader2 = function(lid) {
    lid.remove();
    return
}

Common.loader3 = function(obj, h, w, b, t) {
    var $_loaderImg = $(document.createElement('img'));
    $_loaderImg.attr({
        src: '/i/cis-images/loading/loading_2.gif',
        alt: 'загрузка...'
    });
    if (b == true) {
        $_loaderImg.addClass('u_c_l3_b');
    }
    w = (w == undefined) ? '100%' : w + 'px';
    var $_loader = $(document.createElement('div'));
    $_loader.attr({
        style: 'height:' + h + 'px;padding-top:' + (h - 10) + 'px;width:' + w + ';',
        title: 'Пожалуйста, подождите, идет загрузка контента ...'
    });
    $_loader.addClass('utils_c_loader3');
    $_loader.append($_loaderImg);
    $_loader.append(t);
    obj.html($_loader);
    return $_loader;
}
Common.deloader3 = function(lid) {
    lid.remove();
    return
}

Common.loader4 = function(obj, h, b, w) {
    var $_loaderImg = $(document.createElement('img'));
    $_loaderImg.attr({
        src: '/i/cis-images/loading/loading_2.gif',
        alt: 'загрузка...'
    });
    if (b == true) {
        $_loaderImg.addClass('u_c_l4_b');
    }
    if (w != null) {
        w = 'width:' + w + 'px;left:' + obj.offset().left + 'px;';
    }
    var $_loader = $(document.createElement('div'));
    $_loader.attr({
        style: 'height:' + h + 'px;' + w + 'padding-top:' + ((h - 10) / 2) + 'px;top:' + obj.offset().top + 'px;',
        title: 'Пожалуйста, подождите, идет загрузка контента ...'
    });
    $_loader.addClass('utils_c_loader4');
    $_loader.append($_loaderImg);
    $('body').append($_loader);
    return $_loader;
}
Common.deloader4 = function(lid) {
    lid.remove();
    return
}

Common.modal = function(obj, title, id, black, white) {
    var mod = document.createElement('div');
    var $_mod = $(mod)
    $_mod.attr('title', title);
    $_mod.attr('id', id);
    $_mod.addClass('utils_c_modal');
    if (black == true) {
        $_mod.addClass('u_c_m_black');
    } else if (white == true) {
        $_mod.addClass('u_c_m_white');
    }
    obj.append($_mod);
    return $_mod
}

Common.demodal = function(mod) {
    mod.remove();
    return
}

Common.notify = function(pText, pUrgent, pCenter, pLong, pEternal, fCallback, fCallbackParams) {
    var theme = typeof G2 == 'undefined' ? 'old' : 'new';
    var param = {};
    if (typeof pText == "object") {
        param = {
            text: pText.text || '',
            style: pText.style || 'info',
            center: pText.center || false,
            longTime: pText.longTime || 'short',
            callback: pText.callback,
            callbackParams: pText.callbackParams
        }
    } else {
        param = {
            text: pText,
            style: (pUrgent || false) == true ? 'warning' : 'info',
            center: pCenter || false,
            longTime: (pEternal || false) == true ? 'always' : (pLong || false) == true ? 'long' : 'short',
            callback: fCallback,
            callbackParams: fCallbackParams
        }
    }
    var vExisting = $('.' + Common.NOTIFY_SELECTOR);
    var $_notify = $(document.createElement('div'));
    if (theme == 'old') {
        var vColors = param.style == 'warning' ? 'u_c_n_urgent' : 'u_c_n_regular';
        $_notify.addClass(vColors);
    } else if (theme == 'new') {
        $_notify.addClass('alert');
        if (param.style != 'warning') {
            $_notify.addClass(param.style == 'info' ? 'alert-info' : param.style == 'danger' ? 'alert-danger' : param.style == 'success' ? 'alert-success' : '');
        }
    }
    switch (param.center) {
        case true:
            {
                $_notify.addClass('u_c_n_center');
                break;
            }
        default:
            break;
    }
    var vTop = '20%';
    $_notify.html(param.text);
    $_notify.addClass('utils_c_notify');
    $('body').append($_notify);
    vExisting.animate({
        'top': '+=' + parseInt($_notify.height() + parseInt($_notify.css('padding-bottom').replace('px', '')) * 1.5)
    }, 500);
    $_notify.animate({
        'top': '20%'
    }, 500, function() {
        if (param.longTime != 'always') {
            setTimeout(function() {
                $_notify.fadeOut(2000, function() {
                    $_notify.remove();
                })
            }, param.longTime == 'long' ? 8000 : param.longTime == 'short' ? 3000 : typeof param.longTime == 'number' ? param.longTime : 3000);
        }
        if (typeof callback == 'function') {
            callback(callbackParams);
        }
        return;
    });
    $_notify.attr('style', function(i, val) {
        return val + 'margin-left:-' + /*(parseInt($_notify.width()/2)+100)*/ '225' + 'px;';
    });
    return $_notify
}

Common.denotify = function(obj) {
    obj.fadeOut(500, function() {
        obj.remove();
    })
    return
}

Common.float = function(obj, text, milestone) {
    milestone = (milestone == undefined || milestone == null) ? $(window) : milestone;
    if ($('.utils_c_reshow').length > 0) {
        return
    }
    obj.addClass('utils_c_floating');
    var $_reshow = $(document.createElement('a'));
    $_reshow.attr({
        title: 'Нажмите сюда',
        href: '#reshow'
    });
    $_reshow.addClass('utils_c_reshow');
    $_reshow.click(function() {
        Common.loader($(this), 'html', 2);
        var vTop = $(window).scrollTop() + milestone.height() + milestone.offset().top - $(window).scrollTop();
        obj.animate({
            top: vTop
        }, 555, function() {
            $_reshow.remove();
        });
    });
    $_reshow.html(text);
    $('body').append($_reshow);
    $(window).scroll(
        function() {
            if (!$_reshow.length) {
                return false;
            }
            if ($(this).scrollTop() > obj.height() + obj.offset().top - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('top', '5px')
            } else if (obj.offset().top > $(this).scrollTop() + $(this).height() - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('bottom', '5px')
            } else {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'none')
            }
            return false;
        }
    );
    return
}
Common.defloat = function(obj) {
    obj.removeClass('utils_c_floating');
    return
}

Common.top = function() {
    $('html,body').animate({
        scrollTop: 0
    }, 555);
    return
}

Common.dateValidate = function(date, msg) {
    var splitDate;
    var errWrongDate = 'Неправильный формат даты. Правильный формат: дд.мм.гггг';
    try {
        splitDate = date.split('.');
        if ((splitDate.length < 3) || (!date.match(/^\d{2}\.\d{2}\.\d{4}$/)) || ((parseInt(splitDate[0]) > 31) && (parseInt(splitDate[1]) != 2)) || (parseInt(splitDate[1]) > 12) || ((parseInt(splitDate[0]) > 29) && (parseInt(splitDate[1]) == 2))) {
            throw {
                message: errWrongDate,
                code: 1
            }
        }
    } catch (exception) {
        if (msg == true) {
            Common.notify(exception.message, true);
        }
        return false
    }
    return true
}
Common.dateCast = function(string) {
    var array = string.split('.');
    var date = new Date();
    date.setDate(array[0]);
    date.setMonth(array[1] - 1);
    date.setYear(array[2]);
    return date
}

Common.location = function() {
    return {
        server: window.location.href.match(/[a-z]{1,}(?=\/f\?p=)/)[0] || 'apex',
        workspace: $v('WFAPPNM') || '100000'
    }
}

Common.apexReplace = function (string) {
	return string.replace(/&.*?\./g,function (obj) {
		var replaceName = obj.substr(1,obj.length - 2),
			output = '';
		if (replaceName == 'APP_ID') {
			output = $('#pFlowId').val();
		} else if (replaceName == 'APP_PAGE_ID') {
			output = $('#p_flow_step_id').val() || $('#pFlowStepId').val();
		} else if (replaceName == 'SESSION') {
			output = $('#pInstance').val();
		} else if (replaceName == 'REQUEST') {
			output = $('#pRequest').val();
		} else {
			output = $v(replaceName);
		}
		return output;
	});
}

Common.prepareText = function (value) {
	var virtualDomElement = document.createElement('span');
	virtualDomElement.textContent = value;
	return virtualDomElement.textContent;
}

// Инструкции
function Manual() {}

Manual.APP = 2003;
Manual.MAN_ANY_SELECTOR = 'man_any_app';
Manual.MAN_CUR_SELECTOR = 'man_cur_app';

Manual.init = function() {
    $(document).on("click.manual", "." + Manual.MAN_ANY_SELECTOR, function() {
        Manual.show($(this), $(this).attr('appi'), $(this).attr('appc'))
        return
    });
    $(document).on("click.manual", "." + Manual.MAN_CUR_SELECTOR, function() {
        Manual.show($(this), $('#pFlowId').val(), 'web')
        return
    });
    return
}

Manual.show = function(triggeringObject, application, appWhatIs) {
    var lo = Common.loader(triggeringObject);
    runAsyncAjaxRequest2(Manual.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", null, ["ACTION", "APP_TO_SUPPORT", "APP_TO_SUP_WHATIS"], ['manuals', application, appWhatIs], null, null, function(ajax, params) {
        Manual.visualize(ajax, params)
    }, ['<ajax-manuals>', '</ajax-manuals>', lo]);
    return
}

Manual.visualize = function(ajaxRequest, ajaxParams) {
    if (!$('#i_service_manual').length) {
        var imh = document.createElement('div');
        $(imh).attr({
            id: 'i_service_manual',
            style: 'display:none;'
        });
        $('body').prepend($(imh));
    }

    var holder = $('#i_service_manual');
    holder.html(ajaxRequest.getPartial(ajaxParams[0], ajaxParams[1]));
    holder.css('top', $(window).scrollTop() + 15);
    holder.addClass('i_external_pane');
    Manual.css(holder);

    var $_modal = $('.modal-region-wrap');
    $_modal.click(function() {
        Manual.close(holder, $('.modal-region-wrap'));
        return false;
    });
    holder.after($_modal);

    var reshow = document.createElement('a');
    $_reshow = $(reshow)
    $_reshow.attr({
        title: 'Показать инструкции и документацию',
        href: '#reshow'
    });
    $_reshow.addClass('reshow-manuals')
    $_reshow.html('Показать инструкции и документацию');
    $_reshow.click(function() {
        Common.loader($(this), 'html', 2)
        holder.animate({
            top: $(window).scrollTop() + 15
        }, 555, function() {
            $_reshow.css('display', 'none');
            $_reshow.html('Показать инструкции и документацию');
        });
    });
    holder.append($_reshow);

    $(window).scroll(
        function() {
            if (!$_reshow.length) {
                return false;
            }
            if ($(this).scrollTop() > holder.height() + holder.offset().top - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('top', '5px')
            } else if (holder.offset().top > $(this).scrollTop() + $(this).height() - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('bottom', '5px')
            } else {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'none')
            }
            return false;
        }
    );

    var quit = document.createElement('a');
    var $_quit = $(quit)
    $_quit.attr({
        title: 'Закрыть окно инструкций',
        href: '#close'
    });
    $_quit.addClass('close-manual');
    $_quit.html('Закрыть');
    $_quit.hover(function() {
        holder.css('border-top-color', '#F13939');
        return
    }, function() {
        holder.css('border-top-color', '#F37A7A');
        return
    });
    $_quit.click(function() {
        Manual.close(holder, $('.modal-region-wrap'));
        return false;
    })
    holder.append($_quit);

    if ($('#pFlowId').val() == Manual.APP) {
        Manual.reset(holder);
    }
    Common.deloader(ajaxParams[2]);
    return
}

Manual.reset = function(holder) {
    var rp = holder.children('div').children('div').attr('id').replace('R', '');
    $a_report_Split(rp, '1_5_5', null);
    return
}

Manual.css = function(holder) {
    var doc = document;
    var css = 'manualcss';
    if (!doc.getElementById(css)) {
        var $_head = $('head');
        var link = doc.createElement('link');
        link.id = css;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://isu.ifmo.ru/i/cis-css/classes/manual/style.1.2.css';
        link.media = 'all';
        $_head.append(link);
    }
    return
}

Manual.close = function(holder, modal) {
    modal.remove();
    holder.remove();
    return
}

// Сообщения
function Message() {}

Message.VTOGLOBAL = '';
Message.APP = 2003;
Message.isInit = false;
Message.subject = '';

Message.COMPOSE_SELECTOR = 'msg_compose';
Message.COMPOSE_TO_SELECTOR = 'msg_compose_to';
Message.REPLY_SELECTOR = 'msg_reply';
Message.EXTREME_SELECTOR = 'msg_reply_extreme';
Message.FORWARD_SELECTOR = 'msg_forward';
Message.FEEDBACK_SELECTOR = 'msg_feedback';
Message.SEE_SELECTOR = 'msg_see';
Message.FEEDBACK_CUR_SELECTOR = 'msg_cur_feedback';

Message.callback = function() {
    return;
};
Message.seeCallback = function() {
    return;
};
Message.replyCallback = function() {
    return;
};
Message.fwdCallback = function() {
    return;
};
Message.newCallback = function() {
    return;
};

Message.openCallback = function() {
    return;
};

Message.init = function() {
    $(document).on("click.message", "." + Message.COMPOSE_SELECTOR, function() {
        Message.subject = $(this).attr('subject');
        Message.callback = Message.newCallback;
        Message.show($(this), '', 'compose', '');
        return
    });
    $(document).on("click.message", "." + Message.COMPOSE_TO_SELECTOR, function() {
        Message.subject = $(this).attr('subject');
        Message.callback = Message.newCallback;
        Message.show($(this), $(this).attr('to'), 'compose_to', '')
        return
    });
    $(document).on("click.message", "." + Message.REPLY_SELECTOR, function() {
        var msg = $(this).attr('msg').replace('-', '');
        Message.callback = Message.replyCallback;
        Message.show($(this), '', 'reply', msg)
        return
    });
    $(document).on("click.message", "." + Message.EXTREME_SELECTOR, function() {
        var nmb = $('#new-msg-box');
        if (nmb.length) {
            nmb.remove();
        }
        Message.show($(this), '', 'reply_extreme', '');
        return
    });
    $(document).on("click.message", "." + Message.FORWARD_SELECTOR, function() {
        var msg = $(this).attr('msg').replace('-', '');
        Message.callback = Message.fwdCallback;
        Message.show($(this), '', 'forward', msg)
        return
    });
    $(document).on("click.message", "." + Message.FEEDBACK_SELECTOR, function() {
        //Message.show ($(this), '', 'feedback', $(this).attr('appi')+':'+$(this).attr('appc'))
        getBlank(203, $(this).attr('appi'), $(this));
        return
    });
    $(document).on("click.message", "." + Message.SEE_SELECTOR, function() {
        var msg = $(this).attr('msg').replace('-', '')
        Message.callback = Message.seeCallback;
        Message.see(msg);
        return
    });
    $(document).on("click.message", "." + Message.FEEDBACK_CUR_SELECTOR, function() {
        //Message.show ($(this), '', 'feedback', $('#pFlowId').val()+':web')
        getBlank(203, null, $(this));
        return
    });
    return
}

Message.show = function(triggeringObject, recipientId, messageType, preset) {
    var lo = Common.loader(triggeringObject);
    runAsyncAjaxRequest2(Message.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", null, ["ACTION", "MSG_TO_ID", "MSG_TYPE", "MSG_REFWD"], ['message', recipientId, messageType, preset], null, null, function(ajax, params) {
        Message.visualize(ajax, params)
    }, ['<ajax-messager>', '</ajax-messager>', lo, messageType]);
	Message.openCallback();
    return
}

Message.visualize = function(ajaxRequest, ajaxParams) {
    if (!$('#i_service_message').length) {
        var imh = document.createElement('div');
        $(imh).attr({
            id: 'i_service_message',
            style: 'display:none;'
        });
        $('body').prepend($(imh));
    }
    var holder = $('#i_service_message');
    $('body').prepend(holder);
    holder.html(ajaxRequest.getPartial(ajaxParams[0], ajaxParams[1]));
    holder.css('top', $(window).scrollTop() + 15);
    holder.addClass('i_external_pane');
    Message.css(holder);

    var $_modal = $('.modal-region-wrap');
    $_modal.click(function() {
        if (confirm('Отменить сообщение?')) {
            Message.close(holder, $('.modal-region-wrap'));
        }
        return false;
    });
    holder.after($_modal);

    var reshow = document.createElement('a');
    $_reshow = $(reshow)
    $_reshow.attr({
        title: 'Продолжить написание сообщения',
        href: '#reshow'
    });
    $_reshow.addClass('reshow-messager')
    $_reshow.html('Продолжить написание сообщения');
    $_reshow.click(function() {
        Common.loader($(this), 'html', 2)
        holder.animate({
            top: $(window).scrollTop() + 15
        }, 555, function() {
            $_reshow.css('display', 'none');
            $_reshow.html('Продолжить написание сообщения');
        });
    });
    holder.append($_reshow);

    $(window).scroll(
        function() {
            if (!$_reshow.length) {
                return false;
            }
            if ($(this).scrollTop() > holder.height() + holder.offset().top - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('top', '5px')
            } else if (holder.offset().top > $(this).scrollTop() + $(this).height() - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('bottom', '5px')
            } else {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'none')
            }
            return false;
        }
    );

    var quit = document.createElement('a');
    $_quit = $(quit)
    $_quit.attr({
        title: 'Закрыть окно написания сообщения',
        href: 'javascript:void(0);'
    });
    $_quit.addClass('close-messager');
    $_quit.html('Закрыть');
    $_quit.hover(function() {
        holder.css('border-top-color', '#F13939');
        return
    }, function() {
        holder.css('border-top-color', '#F37A7A');
        return
    });
    $_quit.click(function() {
        Message.close(holder, $('.modal-region-wrap'));
    });
    holder.append($_quit);

    var send = document.createElement('a');
    $_send = $(send)
    $_send.attr({
        href: '#send'
    });
    $_send.addClass('send-message');
    $_send.html('Отправить сообщение');
    $_send.click(function() {
        Message.send($(this), holder, $('.modal-region-wrap'));
        return false;
    })
    holder.append($_send);

    $("#MSG_CORE").summernote({
        "lang": "ru-RU",
        "focus": (ajaxParams[3] == 'reply' ? "true" : "false"),
        "toolbar": [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol"]],
            ["insert", ["link", "video"]],
            ["misc", ["undo", "redo"]],
            ["help", ["help"]]
        ]
    });

    Message.bind();
    Common.deloader(ajaxParams[2]);
    Message.action(ajaxParams[3]);
    Message.attach();
    return
}

Message.action = function(actionToDo) {
    switch (actionToDo) {
        case 'compose':
            {
                Message.isInit = true;
                $('#MSG_TO').focus();
                break;
            }
        case 'compose_to':
            {
                Message.isInit = true;
                $('#MSG_SUBJ').focus();
                if (Message.subject != '') {
                    $('#MSG_SUBJ').val(Message.subject)
                }
                break;
            }
        case 'reply':
        case 'reply_extreme':
        case 'feedback':
            {
                $('#MSG_TO').focus();
                var subj = $('#MSG_SUBJ');
                subj.focus();
                subj.val(subj.val());
                Message.isInit = true;
                $('#MSG_RETEXT a').attr('target', '_blank');
                break;
            }
        case 'forward':
            {
                Message.isInit = true;
                $('#MSG_TO').focus();
                break;
            }
        default:
            return;
    }
    return
}

Message.see = function(preset) {
    runAsyncAjaxRequest2(Common.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", "APPLICATION_PROCESS=MSG_SEE", null, null, ["x01"], [preset], function(ajax, params) {
        Common.notify('Сообщение отмечено как прочитанное.');
        Message.callback();
        return
    }, null);
    return
}

Message.attach = function() {
    runAsyncAjaxRequest2(Common.APP,
        $("#pFlowStepId").attr("value"),
        "ZERO_PAGE",
        "APPLICATION_PROCESS=MSG_ATTACH_GET",
        null,
        null,
        null,
        null,
        function(ajax, params) {
			$(document).trigger('Message.attach');
            if (ajax.response > 0) {
                Attach.init();
            } else {
                Attach.bind('semi');
            }
        },
        null);
    return
}

Message.send = function(runner, holder, modal) {
    var t = $('#MSG_TO_ID').val();
    if ((t == null) || (t == '')) {
        Message.fail();
        $('#MSG_TO').focus()
        return
    } else {
        Message.unfail()
    }
    Common.modal(holder, 'Идет отправка. Пожалуйста, подождите ...')
    runner.attr({
        title: '',
        href: ''
    });
    runner.addClass('send-message-progr');
    Common.loader(runner, 'html');

    var msg_text = $("#MSG_CORE").code().substr(0, 31999);

    modal.unbind('click');

    runAsyncAjaxRequest2(Message.APP,
        $("#pFlowStepId").attr("value"),
        "ZERO_PAGE",
        "APPLICATION_PROCESS=MSG_SEND", ["MSG_REFWD", "MSG_TO_ID", "MSG_SUBJ", "MSG_TO_COPY", "MSG_CORE", "MSG_FILE", "MSG_TO_COPY_XTRA_LIST"], [$v("MSG_REFWD"), $v("MSG_TO_ID"), $v("MSG_SUBJ"), $v("MSG_TO_COPY"), msg_text, $v("MSG_FILE"), ($('#MSG_TO_COPY_XTRA_LIST').length == 0) ? '' : $v('MSG_TO_COPY_XTRA_LIST')],
        ["x01"],
        [$v("pFlowId")],
        function(ajax, params) {
            Message.complete(ajax, params)
        }, [holder, modal]);
    return
}

Message.fail = function() {
    $('#msg-to-wrapper').addClass('fail');
    $('.message-error').remove();
    var errm = $(document.createElement('span'));
    errm.addClass('message-error');
    errm.html('! Адресат некорректен');
    $('#i_service_message .send-message').after(errm);
    Common.notify('Ошибка: выберите адресат сообщения ...', true);
    return
}

Message.unfail = function() {
    $('#msg-to-wrapper').removeClass('fail');
    $('#i_service_message span.message-error').remove();
    return
}

Message.complete = function(ajaxRequest, ajaxParams) {
    Common.notify('Сообщение отправлено успешно.', false, true);
    Message.close(ajaxParams[0], ajaxParams[1]);
    Message.callback();
    return
}

Message.bind = function() {
    var to = $('#MSG_TO');
    var event;
    to.bind({
        focus: function(event) {
            if (Message.isInit == true) {
                Message.search(event, to, 'focus');
            }
            return
        },
        keyup: function(event) {
            var keyCode = event.keyCode;
            if (keyCode == 13) {
                Message.uCommit($('#msg-to-list .mtl-user-selected').attr('uid'));
                $('#MSG_SUBJ').focus();
            }
            Message.arrows(event, to);
            Message.search(event, to, 'key');
            return
        }
    });
    var subject = $('#MSG_SUBJ');
    subject.bind('focus', function() {
        Message.check()
    });
    var list = $('#msg-to-list div.mtl-user');
    $("#i_service_message").on("click", '#msg-to-list div.mtl-user', function(event) {
        Message.uCommit($(this).attr('uid'));
        $('#MSG_SUBJ').focus();
        return
    });
    var copy = $('#msg-to-copy>div');
    $("#i_service_message").on("click", '#msg-to-copy>div', function(event) {
        Message.uCopy($(this));
        return
    });
    var xtra = $('#i_service_message .xtra-more');
    $("#i_service_message").on("click", '.xtra-more', function(event) {
        event.stopPropagation();
        Message.uCopyList();
        return
    });
    $("#i_service_message").on("click", '.msg-to-copy-xtra-list > [oid]', function(event) {
        event.stopPropagation();
        Message.uCopyListRemove($(this));
        return
    });
}

// Search event
Message.str = '';
Message.search = function(event, to, runner) {
    var code = event.keyCode;
    if ((code != 35) && (code != 36) && (code != 37) && (code != 38) && (code != 39) && (code != 40) && (code != 13)) {
        $('#msg-to-load').css('display', 'block');
        Message.str = to.val();
        runAsyncAjaxRequest2(Message.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", "APPLICATION_PROCESS=MSG_GETULIST", ['MSG_TO'], [Message.str], null, null, function(ajax, params) {
            if (to.val() == Message.str) {
                Message.uList(ajax, params);
            } else {
                Message.search(event, to, runner);
            } /* extra-check-fixation */
        }, [runner]);
    }
    return
}

// Move Effect
Message.arrows = function(event, to) {
    var code = event.which;
    var vCurrent = $('#current-element').html();
    var vMax = $('#max-element').html();
    var vTo = 0;
    switch (code) {
        case 40:
            {
                vCurrent == vMax ? null : $('.mtl-' + vCurrent).removeClass('mtl-user-selected');
                vTo = (vCurrent == vMax ? vMax : ++vCurrent);
                $('.mtl-' + vTo).addClass('mtl-user-selected');
                $('#current-element').html(vTo);
                break;
            }
        case 38:
            {
                vCurrent == 1 ? null : $('.mtl-' + vCurrent).removeClass('mtl-user-selected');
                vTo = (((vCurrent == 1) || (vCurrent == 0)) ? 1 : --vCurrent);
                $('.mtl-' + vTo).addClass('mtl-user-selected');
                $('#current-element').html(vTo);
                break;
            }
    }
    var rlct = $('.msg-to-list-list-ovrflw');
    rlct.animate({
        scrollTop: $('.mtl-' + vTo).height() * vTo - (rlct.position().top * 3)
    }, 200);
    return
}

Message.check = function() {
    if ($.trim($('#MSG_TO_ID').val()) != '') {
        runAsyncAjaxRequest2(Message.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", "APPLICATION_PROCESS=MSG_GETUDATA", ["MSG_TO_ID"], [$('#MSG_TO_ID').val()], null, null, function(ajax, params) {
            Message.uData(ajax, params)
        }, [$('#MSG_TO_ID').val(), true]);
    } else {
        $('#msg-to-list').css('display', 'none');
        return false;
    }
    return true;
}

Message.uData = function(ajaxRequest, ajaxParams) {
    var cid = Message.VTOGLOBAL;
    if (cid != ajaxParams[0]) {
        $('#MSG_TO_COPY').val('');
        $('#msg-to-copy').html('');
        cid = '0';
    }
    var vOk;
    var xml = ajaxRequest.response.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    var $list = $xml.find('addr').each(
        function() {
            vOk = true;
            $('#msg-to-ava img').attr('src', $(this).find('ava').text());
            $('#MSG_TO').val($(this).find('u').text());
            $('#msg-to-hidden').val($('#MSG_TO').val());
            $('#msg-to-meta').html($(this).find('m').text());
            if (cid != ajaxParams[0]) {
                $(this).find('c').each(
                    function() {
                        $(this).find('group').each(
                            function() {
                                $('#msg-to-copy').append('<div gr="' + $(this).text() + '" title="Отправить копию сообщения студентам группы ' + $(this).text() + '?">Копия группе ' + $(this).text() + '<span><img src="/i/cis-images/icons/unchecked_1_32.png" alt="?" /></span></div>');
                            }
                        );
                        $(this).find('dep').each(
                            function() {
                                $('#msg-to-copy').append('<div dep="' + $(this).find('i').text() + '" title="Отправить копию сообщения сотрудникам ' + $(this).find('n').text() + '?">Копия ' + $(this).find('n').text() + '<span><img src="/i/cis-images/icons/unchecked_1_32.png" alt="?" /></span></div>');
                            }
                        );
                    }
                );
            }
        }
    );
    if (vOk) {
        Message.unfail()
    }
    if (ajaxParams[1] == undefined) {
        if (vOk) {
            $('#MSG_TO_ID').val(ajaxParams[0])
        };
        $('#MSG_SUBJ').focus();
    }
    $('#msg-to-list').css('display', 'none');
    Message.VTOGLOBAL = ajaxParams[0];
    return vOk;
}

Message.uList = function(ajaxRequest, ajaxParams) {
    $('#MSG_UL').val(ajaxRequest.response);
    Message.uListShow(ajaxParams[0]);
    $('#msg-to-load').css('display', 'none');
    return;
}

Message.uListShow = function(runner) {
    $('#msg-to-list .msg-to-list-list').html('');
    $('#msg-to-list').css('display', 'none');
    var xml = $('#MSG_UL').val().replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
    var vCount = 0;
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    var $list = $xml.find('list').each(
        function() {
            var count = 0;
            var uid = 0;
            $(this).find('user').each(
                function() {
                    count++;
                    uid = $(this).find('uid').text();
                    $('#msg-to-list .msg-to-list-list').append('<div class="mtl-user ' + $(this).find('src').text() + ' mtl-' + (++vCount) + '" uid="' + uid + '"><div class="mtl-fio">' + $(this).find('fio').text() + '</div><div class="mtl-meta">' + $(this).find('uid').text() + ' ' + $(this).find('meta').text() + '</div></div>');
                }
            );
            if ((count == 1) && runner == 'focus') {
                $('#msg-to-list').css('display', 'none');
                Message.uCommit(uid);
            } else {
                $('#msg-to-list').css('display', 'block');
            }
            return
        }
    );
    $('#msg-to-list .msg-to-list-list').append('<div id="current-element" style="display:none;">0</div>');
    $('#msg-to-list .msg-to-list-list').append('<div id="max-element" style="display:none;">' + vCount + '</div>');
    $('#msg-to-load').css('display', 'none');
    return;
}

Message.uCommit = function(u) {
    $('#MSG_TO_ID').val(u);
    Message.check();
}

Message.uCopy = function(obj) {
    var tmp = $('#MSG_TO_COPY').val();
    if (obj.attr('gr') != undefined) {
        if (tmp.indexOf('g' + obj.attr('gr') + ':') == -1) {
            tmp += 'g' + obj.attr('gr') + ':';
            obj.children('span').html('<img src="/i/cis-images/icons/checked_1_32.png" alt="!" />');
            obj.css('background-color', '#D3DBE8');
        } else {
            tmp = tmp.replace('g' + obj.attr('gr') + ':', '');
            obj.children('span').html('<img src="/i/cis-images/icons/unchecked_1_32.png" alt="?" />');
            obj.attr('style', '');
        }
    }
    if (obj.attr('dep') != undefined) {
        if (tmp.indexOf('d' + obj.attr('dep') + ':') == -1) {
            tmp += 'd' + obj.attr('dep') + ':';
            obj.children('span').html('<img src="/i/cis-images/icons/checked_1_32.png" alt="!" />');
            obj.css('background-color', '#D3DBE8');
        } else {
            tmp = tmp.replace('d' + obj.attr('dep') + ':', '');
            obj.children('span').html('<img src="/i/cis-images/icons/unchecked_1_32.png" alt="?" />');
            obj.attr('style', '');
        }
    }
    $('#MSG_TO_COPY').val(tmp);
    return
}

Message.uCopyList = function() {
    if ($('#msg-to-hidden').val().length == 0) {
        Common.notify('Уточните, кого вы хотите добавить в список полчателей', true, true);
        return
    }
    if ($('#MSG_TO_ID').val().length == 0) {
        Common.notify('Не обнаружено объектов для добавления', true, true);
        return
    }
    var hldr = $('#MSG_TO_COPY_XTRA .msg-to-copy-xtra-list'),
        uid = $('#MSG_TO_ID').val(),
        srcCopy = $('#MSG_TO_COPY'),
        trgtCopy = $('#MSG_TO_COPY_XTRA_LIST'),
        $_trgt, txtHldr;
    var arrSrcCopy = srcCopy.val().split(':'),
        arrTrgtCopy = trgtCopy.val().split(':'),
        arrResult = new Array();
    if ((arrSrcCopy.length == 0) || (arrSrcCopy.length == 1 && arrSrcCopy[0] == '')) {
        arrSrcCopy = arrSrcCopy.concat('u' + uid);
    }
    for (i = 0; i < arrSrcCopy.length; i++) {
        if ((arrSrcCopy[i] != '') && ($.inArray(arrSrcCopy[i], arrTrgtCopy) < 0)) {
            arrResult[arrResult.length] = arrSrcCopy[i];
        }
    }
    if (arrTrgtCopy.concat(arrResult).length > 11) {
        Common.notify('Вы можете сделать копирование не более чем 10 адресатов, помимо основного', true);
        return
    }
    trgtCopy.val(arrTrgtCopy.concat(arrResult).join(':'));
    for (i = 0; i < arrResult.length; i++) {
        if (!hldr.find('[oid="' + arrResult[i] + '"]').length) {
            $_trgt = $(document.createElement('div'));
            $_trgt.attr({
                'oid': arrResult[i]
            });
            if (arrResult[i].match(/^d/i)) {
                $_trgt.html($('[dep="' + arrResult[i].replace(/^d/i, '') + '"]').text());
            }
            if (arrResult[i].match(/^g/i)) {
                $_trgt.html($('[gr="' + arrResult[i].replace(/^g/i, '') + '"]').text());
            }
            if (arrResult[i].match(/^u/i) && (uid.length > 0)) {
                $_trgt.html('[' + uid + '] ' + $('#msg-to-hidden').val());
            }
            if ($_trgt.html().length > 0) {
                hldr.append($_trgt);
            }
        }
    }
    if (arrResult.length > 0) {
        $('#MSG_TO_COPY_XTRA,label[for="MSG_TO_COPY_XTRA"]').show(500);
    }
    $('#MSG_TO').val('');
    Common.notify('Добавлено в список для отправки', false, true);
    return
}

Message.uCopyListRemove = function(obj) {
    var oid = obj.attr('oid'),
        trgtCopy = $('#MSG_TO_COPY_XTRA_LIST'),
        trgtArray = trgtCopy.val().split(':')
    for (var i = 0; i < trgtArray.length; i++) {
        if ((trgtArray[i] == oid)) {
            trgtArray.splice(i, 1);
        }
    }
    trgtCopy.val(trgtArray.join(':'));
    obj.hide(500, function() {
        $(this).remove();
        if ((trgtArray.length == 0) || ((trgtArray.length == 1) && (trgtArray[0].length == 0))) {
            apex.item('MSG_TO_COPY_XTRA').hide();
        }
        return
    })
    return
}

Message.css = function(holder) {
    var doc = document;
    var css = 'messagecss';
    if (!doc.getElementById(css)) {
        var $_head = $('head');
        var link = doc.createElement('link');
        link.id = css;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://isu.ifmo.ru/i/cis-css/classes/message/style.1.2.4.css';
        link.media = 'all';
        $_head.append(link);
    }
    return
}

Message.disable = function(holder) {
    $(holder).children('a').unbind();
}

Message.close = function(holder, modal) {
    Message.subject = '';
    runAsyncAjaxRequest2(Message.APP,
        $("#pFlowStepId").attr("value"),
        "ZERO_PAGE",
        "APPLICATION_PROCESS=MSG_CLOSE",
        null, null, null, null,
        function(ajax, params) {
            $('#msg-to-copy>div').off();
            holder.remove();
            modal.remove();
            Message.VTOGLOBAL = '';
            Message.isInit = false;
        },
        null);
    return
}

// Расписание
function Schedule() {}

Schedule.APP = 2003;
Schedule.ME_SELECTOR = 'schedule_me';

Schedule.init = function() {
    $(document).on("click.schedule", "." + Schedule.ME_SELECTOR, function() {
        Schedule.show($(this));
        return
    });
    return
}

Schedule.show = function(triggeringObject, application, appWhatIs) {
    var lo = Common.loader(triggeringObject);
    runAsyncAjaxRequest2(Schedule.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", null, ["ACTION"], ['schedule'], null, null, function(ajax, params) {
        Schedule.visualize(ajax, params)
    }, ['<ajax-schedule>', '</ajax-schedule>', lo]);
    return
}

Schedule.visualize = function(ajaxRequest, ajaxParams) {
    if (!$('#i_service_schedule').length) {
        var ish = document.createElement('div');
        $(ish).attr({
            id: 'i_service_schedule',
            style: 'display:none;'
        });
        $('body').prepend($(ish));
    }

    var holder = $('#i_service_schedule');
    holder.html(ajaxRequest.getPartial(ajaxParams[0], ajaxParams[1]));
    holder.css('top', $(window).scrollTop() + 15);
    holder.addClass('i_external_pane');
    Schedule.css(holder);

    var $_modal = $('.modal-region-wrap');
    $_modal.click(function() {
        Message.close(holder, $('.modal-region-wrap'));
        return false;
    });
    holder.after($_modal);

    var reshow = document.createElement('a');
    $_reshow = $(reshow)
    $_reshow.attr({
        title: 'Показать ближайшие занятия',
        href: '#reshow'
    });
    $_reshow.addClass('reshow-schedule')
    $_reshow.html('Показать ближайшие занятия');
    $_reshow.click(function() {
        Common.loader($(this), 'html', 2)
        holder.animate({
            top: $(window).scrollTop() + 15
        }, 555, function() {
            $_reshow.css('display', 'none');
            $_reshow.html('Показать ближайшие занятия');
        });
    });
    holder.append($_reshow);

    $(window).scroll(
        function() {
            if (!$_reshow.length) {
                return false;
            }
            if ($(this).scrollTop() > holder.height() + holder.offset().top - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('top', '5px')
            } else if (holder.offset().top > $(this).scrollTop() + $(this).height() - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('bottom', '5px')
            } else {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'none')
            }
            return false;
        }
    );

    var quit = document.createElement('a');
    var $_quit = $(quit)
    $_quit.attr({
        title: 'Закрыть окно расписания',
        href: '#close'
    });
    $_quit.addClass('close-schedule');
    $_quit.html('Закрыть');
    $_quit.hover(function() {
        holder.css('border-top-color', '#F13939');
        return
    }, function() {
        holder.css('border-top-color', '#F37A7A');
        return
    });
    $_quit.click(function() {
        Schedule.close(holder, $('.modal-region-wrap'));
        return false;
    })
    holder.append($_quit);

    Common.deloader(ajaxParams[2]);
    return
}

Schedule.css = function(holder) {
    var doc = document;
    var css = 'schedulecss';
    if (!doc.getElementById(css)) {
        var $_head = $('head');
        var link = doc.createElement('link');
        link.id = css;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://isu.ifmo.ru/i/cis-css/classes/schedule/style.1.2.css';
        link.media = 'all';
        $_head.append(link);
    }
    return
}

Schedule.close = function(holder, modal) {
    modal.remove();
    holder.remove();
    return
}


var v_from = $v('pFlowId');
//эту функцию вешаем на событие клик на любой элемент
function getBlank(blankId, flowId, obj) {
    //вызываем асинхронно, какой бланк будет грузить с приложения бланки и заявки
    var lo = Common.loader(obj);
    runAsyncAjaxRequest2('2010', $("#pFlowStepId").attr("value"), '10', null, ['P0_REQUEST_ID'], [blankId], null, null, function(ajax, params) {
        buildInfo(ajax, params, blankId, flowId);
        Common.deloader(lo);
    });
    return;
}

//Функция очищения
function destroyAll() {
    $(document).unbind('keyup');
    $("#resultPanelMessage").remove();
    $(".body_background").remove();
    $("head").find("link[id=cssId]").remove();
    $("head").find("link[id=cssIdHelp]").remove();
}


//Закрываем область 
//в качестве паремаетра можно передать 'force', что означает, что не будет спрашиваться о том, хочет пользователь закрыть или нет
function destroyHelpDesk(param) {
    if (param == 'force') {
        destroyAll();
    } else {
        if (confirm('Отменить обращение?')) {
            destroyAll();
        }
    }
}

function checkResponse(responseResult, off) {
    var response = responseResult;
    if (response != '') {
        $("body").append('<div class="message-block">' + response + '</div>');
        setTimeout('$(".message-block").animate({opacity: 0}, 2000,function() {$(".message-block").remove();});', 1500);
    }
    if (off != null) {
        if (response != '') {
            $("body").append('<div class="message-block">' + response + '</div>');
            $(".message-block").animate({
                opacity: 0
            }, 2000, function() {
                $(".message-block").remove();
                destroyHelpDesk('force');
            });
        } else {
            destroyHelpDesk('force');
        }
    }

}
//Функция собирающая, упаковывающая данные с формы и отправляющая их на сервер
function sendInfoForm(blankId, flowId) {
    if ((blankId == 203) && ($('textarea.HELPDESK').val() == '')) {
        alert('Вы не ввели текст обращения!');
        return;
    }
    //Блочим форму
    $(document).unbind('keyup');
    $('.submit_b').unbind('click');
    $(".cancel_b").unbind('click');
    $('.submit_b').html('<img style="position: relative;" class="pacman-img" src="/i/cis-images/loading/loading_pman.gif" alt="------" />');
    $('.body_background').unbind('click');
    //собираем все элементы, значения которых нам необходимо отправить на сервер
    //Отправка данные будет поэтапно, порциями по 10 элементов, так как доступны только переменные с x01 по x10.
    //Будем отправлять данные по 10 значений, ограничением по 4000 байт.
    //Сохранять их в коллекцию, потом уже работать с коллекцией в самом конце пересылки
    //Для начала необходимо послать номер заявки и номер приложения откуда подана заявка
    if ((flowId == null) || (flowId == '')) {
        flowId = $v('pFlowId');
    }
    checkResponse(runAjaxRequest2('2010', null, null, $("#pFlowStepId").attr("value"), '0', 'APPLICATION_PROCESS=SET_AJAX_DATA', ['P0_AJAX_COLLECTION_NAME'], [blankId], ['x01', 'x02'], [blankId, flowId]));
    var arrParam = []; //наименование параметров x01-x10
    var arrDataId = [] //ids of data
    var arrData = []; //данные
    var allDataIds = $('#resultPanelMessage').find('.templ_parameters').find('*[name=f02]');
    var allData = $('#resultPanelMessage').find('.templ_parameters').find('*[name=f01]');
    var partOfX;
    for (i = 0; i < allDataIds.length; i++) {
        var element = allData[i];
        var elementId = allDataIds[i];
        if (String(i).length < 2) {
            partOfX = 2 * i + 1;
        } else {
            partOfX = 2 * (i % (Math.pow(10, (String(i).length - 1)))) + 1;
        }
        if (partOfX < 8) {
            arrParam[partOfX - 1] = 'x0' + partOfX;
            arrParam[partOfX] = 'x0' + (partOfX + 1);
        } else {
            arrParam[partOfX - 1] = 'x0' + partOfX;
            arrParam[partOfX] = 'x' + (partOfX + 1);

        }
        arrData[partOfX - 1] = $(elementId).val();
        arrData[partOfX] = $(element).val();
        if ((i + 1) % 5 == 0) {
            checkResponse(runAjaxRequest2('2010', null, null, $("#pFlowStepId").attr("value"), '0', 'APPLICATION_PROCESS=SET_AJAX_DATA', null, null, arrParam, arrData));
            arrParam = [];
            arrData = [];
        }
    }
    if ((arrParam.length > 0) && (arrData.length > 0)) {
        checkResponse(runAjaxRequest2('2010', null, null, $("#pFlowStepId").attr("value"), '0', 'APPLICATION_PROCESS=SET_AJAX_DATA', null, null, arrParam, arrData));

    }
    runAsyncAjaxRequest2('2010', $("#pFlowStepId").attr("value"), '0', 'APPLICATION_PROCESS=PROCESS_REQUEST', null, null, null, null, function(ajax, params) {
        checkResponse(ajax.response, 'off');
    });
    return;
}

//Метод, осуществляющий всю необходимую подготовку и вывод формы.
function buildInfo(ajaxObject, paramsObject, blankId, flowId) {
    //забираем страницу с 2010 приложения бланки и заявки
    var respRegionResult = ajaxObject.getPartial("<!--START_BLANK_INFO-->", "<!--END_BLANK_INFO-->");
    if (respRegionResult != '') {
        //Формируем разметку
        var resultPanel = '<div id="resultPanelMessage" style="display:none;"></div>';
        $('body').append('<div class="body_background"></div>');
        $('body').append(resultPanel);
        $("#resultPanelMessage").html(respRegionResult);
        $("#resultPanelMessage").append('<a href="#close" class="cancel_b">Закрыть</div><a href="#submit_b" class="submit_b btn btn-primary">Отправить</a>');
        //подключаем css файлы непосредственно самих бланков и завявок и в данном случаем helpdeska
        $('head').append('<link id="cssId" rel="stylesheet" href="/i/cis-css/blanks/blanks.css" type="text/css" />');
        $('head').append('<link id="cssIdHelp" rel="stylesheet" href="/i/cis-css/helpdesk/helpdesk_bootstrap3.css" type="text/css" />');
        $("#resultPanelMessage").css('position', 'fixed');
        $("#resultPanelMessage").addClass('i_external_pane');
        $(window).scroll(
            function() {
                $("#resultPanelMessage").css('position', 'absolute');
                if (!$('.body_background').length) {
                    return;
                }
                var topVar = $('.body_background').offset().top;
                var topCur = $('#resultPanelMessage').offset().top;
                var panHeight = $('#resultPanelMessage').height();
                var winSize = $('.body_background').height();
                if (((topCur + panHeight) < topVar) || (topCur > topVar) || (panHeight < winSize)) {
                    $('#resultPanelMessage').css('top', topVar + 15 + 'px');
                }
                return false;
            }
        );
        $("#resultPanelMessage").find(".text_templ_field, .select-templ-field").addClass("form-control");
        //Показываем что сформировали
        $("#resultPanelMessage").show();
        //Добавляем подсветку верхнего бордера и кнопки "Закрыть"
        $('.cancel_b').hover(function() {
                $('.cancel_b').css({
                    "background-color": "#FF0000"
                });
                $('#resultPanelMessage').css({
                    "border-top": "5px solid #FF0000"
                });
            },
            function() {
                $('.cancel_b').css({
                    "background-color": "#F37A7A"
                });
                $('#resultPanelMessage').css({
                    "border-top": "5px solid #F37A7A"
                });
            });
        //вешаем bind обработчик на закрытие. Удаляем все объекты и подключенные файлы
        $(".cancel_b").bind('click', function() {
            destroyHelpDesk('force');
        });
        $(".body_background").bind('click', function() {
            destroyHelpDesk();
        });
        //обрабатываем нажатие на клавишу escape
        $(document).bind('keyup', function(event) {
            if (event.keyCode == 27) {
                destroyHelpDesk();
            }
        });
        //Действие по кнопке отправить, здесь важно учесть и серверную часть и ряд других параметов
        //в первую очередь отправить метаданные о приложении, потом отправить сами данные, представленные на странице
        $('.submit_b').bind('click', function() {
			if (blankId == 203 && $("#resultPanelMessage").find('select.HELPDESK').val() === "") {
				G2.notify('Необходимо указать тип подаваемой завки', '', true);
				return false;
			}
            $(window).scrollTop();
            sendInfoForm(blankId, flowId);
        });
        $.event.trigger("blankFormBuilded");
    }
    return;

}

// Уведомления
function Notify() {}

Notify.APP = 2003;

Notify.READ_SELECTOR = 'alrm_read';
Notify.DROP_SELECTOR = 'alrm_drop';
Notify.SUBSCRIBE_SELECTOR = 'alrm_subscribe';
Notify.UNSUBSCRIBE_SELECTOR = 'alrm_unsubscribe';
Notify.ALARM_SELECTOR = 'arlm_box';

Notify.MSG1 = 'подписаться';
Notify.MSG2 = 'отменить подписку';
Notify.MSG3 = 'подтвердить прочтение';
Notify.MSG4 = 'удалить';
Notify.MSG5 = '';
Notify.MSG6 = 'Вы уверены, что хотите отменить подписку на этот объект?';
Notify.MSG7 = 'Получение подтверждено.';
Notify.MSG8 = 'Уведомление удалено.';
Notify.MSG9 = 'Подписка оформлена.';
Notify.MSG10 = 'Подписка отменена.';
Notify.MSG11 = '';
Notify.MSG12 = '';

Notify.init = function() {
    $('.' + Notify.SUBSCRIBE_SELECTOR).attr('title', Notify.MSG1);
    $('.' + Notify.UNSUBSCRIBE_SELECTOR).attr('title', Notify.MSG2);
    $('.' + Notify.READ_SELECTOR).attr('title', Notify.MSG3);
    $('.' + Notify.DROP_SELECTOR).attr('title', Notify.MSG4);

    $(document).on("click.notify", "." + Notify.READ_SELECTOR, function() {
        Notify.read($(this));
        return
    });
    $(document).on("click.notify", "." + Notify.DROP_SELECTOR, function() {
        Notify.drop($(this));
        return
    });
    $(document).on("click.notify", "." + Notify.SUBSCRIBE_SELECTOR, function() {
        Notify.subscribe($(this));
        return
    });
    $(document).on("click.notify", "." + Notify.UNSUBSCRIBE_SELECTOR, function() {
        Notify.unsubscribe($(this));
        return
    });
    return
}

Notify.master = function(runner, what) {
    var oid = runner.attr('oid');
    var action, a, b, c;
    switch (what.toLowerCase()) {
        case 'r':
            {
                action = 'READ';
                break;
            }
        case 'd':
            {
                action = 'DROP';
                runner.css('visibility', 'visible');
                break;
            }
        case 's':
            {
                action = 'SUBSCRIBE';
                a = runner.attr('ot') == undefined ? '' : runner.attr('ot');
                b = runner.attr('tm') == undefined ? '' : runner.attr('tm');
                break;
            }
        case 'u':
            {
                if (!confirm(Notify.MSG6)) {
                    return;
                }
                action = 'UNSUBSCRIBE';
                break;
            }
        default:
            {
                return;
            }
    }
    var ldr = Common.loader(runner);
    runAsyncAjaxRequest2(Notify.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", "APPLICATION_PROCESS=ALRM_" + action, null, null, ["x01", "x02", "x03"], [oid, a, b], function(ajax, params) {
        if (ajax.response > 0) {
            switch (what.toLowerCase()) {
                case 'r':
                    {
                        runner.removeAttr('oid');
                        runner.hide(400, function() {
                            runner.remove();
                        });
                        Common.notify(Notify.MSG7);
                        break;
                    }
                case 'd':
                    {
                        runner.removeAttr('oid');
                        runner.hide(400, function() {
                            runner.parents('.' + Notify.ALARM_SELECTOR).hide(400, function() {
                                runner.remove();
                            });
                        });
                        Common.notify(Notify.MSG8);
                        break;
                    }
                case 's':
                    {
                        action = 'SUBSCRIBE';
                        runner.hide(400);
                        Common.notify(Notify.MSG9);
                        break;
                    }
                case 'u':
                    {
                        action = 'UNSUBSCRIBE';
                        runner.hide(400);
                        Common.notify(Notify.MSG10);
                        break;
                    }
                default:
                    {
                        return;
                    }
            }
        } else {
            alert('Ошибка. Повторите ваш запрос позже или свяжитесь с командой поддержки ИСУ.')
        }
        Common.deloader(ldr);
        return
    }, null);
    return
}

Notify.subscribe = function(runner) {
    Notify.master(runner, 's');
    return
}

Notify.unsubscribe = function(runner) {
    Notify.master(runner, 'u');
    return
}

Notify.read = function(runner) {
    Notify.master(runner, 'r');
    return
}

Notify.drop = function(runner) {
    Notify.master(runner, 'd');
    return
}

function Attach() {}

Attach.iframe = '';
Attach.SELECTOR = 'FLD_ATTACH';
Attach.SELECTOR_ID = 'FLD_ATTACH_ID';
Attach.SELECTOR_NAME = 'FLD_ATTACH_NAME';
Attach.MSG_ATTACH_LIST = 'MSG_FILE';
Attach.CLEAR_SELECTOR = 'at_rem';
Attach.OLDER_SELECTOR = 'FLD_ATTACH_OLDER';

Attach.init = function() {
    $('#isu_attach_ifr').remove();
    var ldr = Common.loader2($('#msg_attach_hldr'));
    Attach.iframe = '<iframe id="isu_attach_ifr" src="f?p=' + Common.APP + ':' + 0 + ':' + $v('pInstance') + '::NO::ACTION:attach" name="isu_attach_ifr" style="display:none;"></iframe>';
    $('#wwvFlowForm').parent().append(Attach.iframe);
    $('#isu_attach_ifr').unbind('load').load(function() {
        Common.deloader2(ldr);
        Attach.prepare();
        Attach.bind('full');
    })
    return
}

Attach.bind = function(what) {
    $(document).off("click.attach").on("click.attach", "." + Attach.CLEAR_SELECTOR, function() {
        var vId = $(this).attr('id').replace('at_', '');
        $('#' + Attach.MSG_ATTACH_LIST).val(function(i, val) {
            return val.replace(':' + vId, '');
        })
        var runner = $(this);
        runner.hide(400, function() {
            runner.remove();
        });
        return
    });
    if (what.toLowerCase() != 'full') {
        return
    }
    $('#' + Attach.OLDER_SELECTOR).off().on({
        change: function() {
            Attach.listed();
            return
        }
    });
    return
}

Attach.prepare = function() {
    var hldr = $('#msg_attach_hldr');
    var obj = isu_attach_ifr.$('#' + Attach.SELECTOR);
    var obj2 = isu_attach_ifr.$('#' + Attach.OLDER_SELECTOR);
    obj.change(function() {
        isu_attach_ifr.$('#wwvFlowForm').append($('#' + Attach.SELECTOR));
        isu_attach_ifr.apex.submit({
            request: "MSG_ATTACH"
        });
        var ldr = Common.loader2(hldr);
        var mod = Common.modal($('body'), 'идет загрузка, пожалуйста не закрывайте окно ...', 'attach_modal', false, true);
        $('#isu_attach_ifr').unbind('load').load(function() {
            $(this).remove();
            $('#wwvFlowForm').parent().append(Attach.iframe);
            $('#isu_attach_ifr').unbind('load').load(function() {
                var fai = isu_attach_ifr.$('#' + Attach.SELECTOR_ID).val();
                $_span = $(document.createElement('span'));
                $_span.html(isu_attach_ifr.$('#' + Attach.SELECTOR_NAME).val());
                $_span.attr('id', 'at_' + fai);
                $_span.addClass(Attach.CLEAR_SELECTOR);
                $('#' + Attach.MSG_ATTACH_LIST).val(function(i, val) {
                    return val + ':' + fai;
                });
                $('#msg_attach_lst_hldr').append($_span);
                $(this).remove();
                Attach.init();
                Common.demodal(mod);
            });
            return
        });
        return
    });
    $('#msg_attach_hldr').html(obj);
    if (!obj2.length) {
        return
    }
    $('#msg_attach_hldr').append(obj2);
    return
}

Attach.listed = function() {
    var obj = $('#' + Attach.OLDER_SELECTOR);
    var fai = obj.val();
    if (obj.val == '0') {
        return
    }
    if ($('#' + Attach.MSG_ATTACH_LIST).val().indexOf(fai) >= 0) {
        Common.notify('уже добавлено', true);
        return
    }
    $_span = $(document.createElement('span'));
    $_span.html($('#' + Attach.OLDER_SELECTOR).children('option[value="' + fai + '"]').html());
    $_span.attr('id', 'at_' + fai);
    $_span.addClass(Attach.CLEAR_SELECTOR);
    $('#' + Attach.MSG_ATTACH_LIST).val(function(i, val) {
        return val + ':' + fai;
    });
    $('#msg_attach_lst_hldr').append($_span);
    obj.val('0');
    return
}

// Центр приложений
Apps = function() {}

Apps.APPS_LSTR_SELECTOR = 'acls_lstr';
Apps.APPS_LSTR_ICON_SELECTOR = 'acls_lstr.acls_icon';
Apps.APPS_LSTR_DEFAULT_WIDTH = '25px';
Apps.TEXT = '';

Apps.init = function() {
    return // #debug
    /*if ($('#USER_ID').val() != '129276') {
        return
    }
    Apps.css('prepare');
    Apps.prepare();
    return*/
}

Apps.prepare = function() {
    var $_hldr = $('.' + Apps.APPS_LSTR_ICON_SELECTOR);
    if ($_hldr.length > 0) {
        $_hldr.html(Apps.TEXT);
        $('#logo > a:first-child').css('margin-left', Apps.APPS_LSTR_DEFAULT_WIDTH);
    }
    $(document).on("click.apps", "." + Apps.APPS_LSTR_SELECTOR, function() {
        Apps.show($(this));
        return
    });
    return
}

Apps.show = function(triggeringObject) {
    var lo = Common.loader(triggeringObject);
    runAsyncAjaxRequest2(Manual.APP, $("#pFlowStepId").attr("value"), "ZERO_PAGE", null, ["ACTION", "APP_CLASS_APP"], ['apps', Current.APP], null, null, function(ajax, params) {
        Apps.visualize(ajax, params)
    }, ['<ajax-apps>', '</ajax-apps>', lo]);
    return
}

Apps.visualize = function(ajaxRequest, ajaxParams) {
    if (!$('#i_service_apps').length) {
        var imh = document.createElement('div');
        $(imh).attr({
            id: 'i_service_apps',
            style: 'display:none;'
        });
        $('body').prepend($(imh));
    }

    var holder = $('#i_service_apps');
    holder.html(ajaxRequest.getPartial(ajaxParams[0], ajaxParams[1]));
    holder.css('top', $(window).scrollTop() + 15);
    holder.addClass('i_external_pane');
    Apps.css('run');

    var $_modal = $('.modal-region-wrap');
    $_modal.click(function() {
        Apps.close(holder, $('.modal-region-wrap'));
        return false;
    });
    holder.after($_modal);

    var reshow = document.createElement('a');
    $_reshow = $(reshow)
    $_reshow.attr({
        title: 'Показать приложения программного комплекса',
        href: '#reshow'
    });
    $_reshow.addClass('reshow-apps')
    $_reshow.html('Показать приложения программного комплекса');
    $_reshow.click(function() {
        Common.loader($(this), 'html', 2)
        holder.animate({
            top: $(window).scrollTop() + 15
        }, 555, function() {
            $_reshow.css('display', 'none');
            $_reshow.html('Показать инструкции и документацию');
        });
    });
    holder.append($_reshow);

    $(window).scroll(
        function() {
            if (!$_reshow.length) {
                return false;
            }
            if ($(this).scrollTop() > holder.height() + holder.offset().top - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('top', '5px')
            } else if (holder.offset().top > $(this).scrollTop() + $(this).height() - 5) {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'block')
                $_reshow.css('bottom', '5px')
            } else {
                $_reshow.attr('style', '')
                $_reshow.css('display', 'none')
            }
            return false;
        }
    );

    var quit = document.createElement('a');
    var $_quit = $(quit)
    $_quit.attr({
        title: 'Закрыть окно выбора приложений',
        href: '#close'
    });
    $_quit.addClass('close-apps');
    $_quit.html('Закрыть');
    $_quit.hover(function() {
        holder.css('border-top-color', '#F13939');
        return
    }, function() {
        holder.css('border-top-color', '#F37A7A');
        return
    });
    $_quit.click(function() {
        Apps.close(holder, $('.modal-region-wrap'));
        return false;
    })
    holder.append($_quit);

    //Apps.reset (holder);
    Common.deloader(ajaxParams[2]);
    return
}

Apps.reset = function(holder) {
    var rp = holder.children('div').children('div').attr('id').replace('R', '');
    $a_report_Split(rp, '1_5_5', null);
    return
}

Apps.close = function(holder, modal) {
    modal.remove();
    holder.remove();
    return
}

Apps.css = function(action) {
    var doc = document;
    var css = (action == 'prepare') ? 'appscssp' : 'appscss';
    var csspath = (action == 'prepare') ? 'https://isu.ifmo.ru/i/cis-css/classes/apps/style.p.1.0.css' : 'https://isu.ifmo.ru/i/cis-css/classes/apps/style.1.0.css';
    if (!doc.getElementById(css)) {
        var $_head = $('head');
        var link = doc.createElement('link');
        link.id = css;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = csspath;
        link.media = 'all';
        $_head.append(link);
    }
    return
}

function checkIfHeaderHas(fileName) {
    vRetVal = false;
    $.each($("head>link"), function() {
        if ($(this).attr("href").toLowerCase() === fileName.toLowerCase()) {
            vRetVal = true;
            return false;
        }
    });

    $.each($("head>script"), function() {
        if ($(this).is("[src]")) {
            if ($(this).attr("src").toLowerCase() === fileName.toLowerCase()) {
                vRetVal = true;
                return false;
            }
        }
    });

    return vRetVal;
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    } else if (filetype == "css") {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


function setSelect2(v_open) {
    $("select.multiselect-list").select2({
        placeholder: "Выберите значение",
        width: "resolve"
    });
    $("select.multiselect-list").select2(v_open);
    $("select.multiselect-list").change(function(e) {
        clearTimeout(Common.timer_1);
        var obj = e.val;
        var elem = $(this).next();
        Common.timer_1 = setTimeout(function() {
            elem.val(obj).change();
        }, 500);
    });
}

function updateSelect2(v_open) {
    if (!checkIfHeaderHas("/i/libraries/andrew-libraries/select2/select2.css")) {
        loadjscssfile('/i/libraries/andrew-libraries/select2/select2.css', 'css');
    }
    if (!checkIfHeaderHas("/i/libraries/andrew-libraries/select2/select2.min.js")) {
        $.getScript("/i/libraries/andrew-libraries/select2/select2.min.js", function() {

            if (!checkIfHeaderHas("/i/libraries/andrew-libraries/select2/select2_locale_ru.js")) {
                $.getScript("/i/libraries/andrew-libraries/select2/select2_locale_ru.js", function() {
                    setSelect2(v_open);
                });
            } else {
                setSelect2(v_open);
            }
        });
    } else setSelect2(v_open);
}

function ShowLoaderRegion(obj, loaderText, fontSize, fontTopMargin) {
    var vLoaderText = '<i class="fa fa-refresh fa-spin"></i> ',
        vFontTopMargin,
        objELem;
    if ($(obj).hasClass("modal")) {
        objElem = $(obj).find(".modal-dialog");
    } else {
        objElem = $(obj);
    }
    if (loaderText == null) {
        vLoaderText += 'Загрузка ...';
    } else {
        vLoaderText += loaderText;
    }
    $(objElem).fadeTo('slow', .6);
    //var topCoord = $(obj).offset().top;
    //var leftCoord = $(obj).offset().left;
    var widthVal = $(objElem).width();
    var heightVal = $(objElem).height();
    if (fontTopMargin != null && fontTopMargin != "undefined" && fontTopMargin != '') {
        vFontTopMargin = fontTopMargin;
    } else {
        vFontTopMargin = parseInt(heightVal / 3);
    }
    $(objElem).on("resize.loader_region", function() {
        $(this).find(".loaderObj").width($(this).width());
    });
    //$(obj).append('<div class="loaderObj" style="position: absolute;top:' + topCoord + 'px;left:' + leftCoord + 'px;width: ' + widthVal + 'px;height:' + heightVal + 'px;z-index:2;opacity:0.4;filter: alpha(opacity = 50); text-align: center;"><span style="margin-top: ' + parseInt(heightVal / 3) + 'px;display: block;font-size: ' + (fontSize || 43) + 'px;color: #000000;font-weight: bold;" class="loaderText">' + vLoaderText + '</span></div>');
    // $(objElem).prepend('<div class="loaderObj" style="position: absolute;width: ' + widthVal + 'px;height:' + heightVal + 'px;z-index:2;opacity:0.4;filter: alpha(opacity = 50); text-align: center;"><span style="margin-top: ' + vFontTopMargin + 'px;display: block;font-size: ' + (fontSize || 34) + 'px;color: #000000;font-weight: bold;" class="loaderText">' + vLoaderText + '</span></div>');
    $(objElem).addClass("hasLoaderObj");
    var ldr = $(document.createElement("div"));
    ldr.addClass("loaderObj");
    ldr.css({
        "position":"absolute",
        "width":widthVal+"px",
        "height":heightVal+"px",
        "z-index":"2",
        "opacity":"0.4",
        "filter":"alpha(opacity = 50)",
        "text-align":"center"
    });
    ldr.html('<span style="margin-top: ' + vFontTopMargin + 'px;display: block;font-size: ' + (fontSize || 30) + 'px;color: #000000;font-weight: bold;" class="loaderText">' + vLoaderText + '</span>');
    $(objElem).prepend(ldr);
    return ldr;
}

function HideLoaderRegion(obj) {
    var objElem;
    if ($(obj).hasClass("modal")) {
        objElem = $(obj).find(".modal-dialog");
    } else {
        objElem = $(obj);
    }
    var $_objElem = $(objElem);
    if ($_objElem.hasClass('loaderObj')) {
        $_objElem.parents(".hasLoaderObj").stop().fadeTo('slow', 1);
        $_objElem.parents(".hasLoaderObj").removeClass("hasLoaderObj");
        $_objElem.remove();
    } else {
        $_objElem.children('.loaderObj').remove();
        $_objElem.stop().fadeTo('slow', 1);
        $_objElem.off("resize.loader_region");    
    }
    return
}

var isu = {};
if (isu === null || typeof(isu) != "object") {
    isu = {};
}
if (isu.ajax === null || typeof(isu.ajax) != "object") {
    isu.ajax = {};
}
isu.ajax = {
    /*clob*/
    clob: function(pReturn, pCollection, pAppNumber) {
        if (pAppNumber == null) {
            pAppNumber = $x('pFlowId').value;
        }
        if (pCollection == null) {
            pCollection = 'CLOB_CONTENT';
        }
        var that = this;
        this.ajax = new htmldb_Get(null, pAppNumber, 'APXWGT', 0);
        this.ajax.addParam('p_widget_name', 'apex_utility');
        this.ajax.addParam('x04', pCollection);
        this._get = _get;
        this._set = _set;
        this._return = !!pReturn ? pReturn : _return;
        return;

        function _get(pValue) {
            that.ajax.addParam('x05', 'GET');
            that.ajax.GetAsync(that._return);
        }

        function _set(pValue) {
            that.ajax.addParam('x05', 'SET');
            that.ajax.AddArrayClob(pValue, 1);
            that.ajax.GetAsync(that._return);
        }

        function _return() {
            if (p.readyState == 1) {} else if (p.readyState == 2) {} else if (p.readyState == 3) {} else if (p.readyState == 4) {
                return p;
            } else {
                return false;
            }
        }
    },
    clobGetElement: function(objElem, callback) {
        var clob_ob = new apex.ajax.clob(
            function() {
                var rs = p.readyState
                if (rs == 1 || rs == 2 || rs == 3) {
                    $x_Show('modal-reg');
                    $x_Show('AjaxLoading');
                } else if (rs == 4) {
                    $(objElem).val(p.responseText);
                    $x_Hide('AjaxLoading');
                    $x_Hide('modal-reg');
                    if (typeof callback == "function")
                        callback();
                } else {
                    return false;
                }
            }
        );
        clob_ob._get();
    },
    clobSetElement: function(objElement, callback) {
        $x_Show('modal-reg');
        $x_Show('AjaxLoading');
        var clob_ob = new apex.ajax.clob(
            function() {
                var rs = p.readyState
                if (rs == 1 || rs == 2 || rs == 3) {
                    $x_Show('modal-reg');
                    $x_Show('AjaxLoading');
                } else if (rs == 4) {
                    $x_Hide('AjaxLoading');
                    $x_Hide('modal-reg');
                    if (typeof callback == "function")
                        callback();
                } else {
                    return false;
                }
            }
        );
        var p_html = $(objElement).val();
        if (p_html) {
            clob_ob._set(p_html);
        } else {
            p_html = '';
            clob_ob._set(p_html);
        }
    },
    clobSetString: function(string, callback) {
        $x_Show('modal-reg');
        $x_Show('AjaxLoading');
        var clob_ob = new isu.ajax.clob(
            function() {
                var rs = p.readyState
                if (rs == 1 || rs == 2 || rs == 3) {
                    $x_Show('modal-reg');
                    $x_Show('AjaxLoading');
                } else if (rs == 4) {
                    $x_Hide('AjaxLoading');
                    $x_Hide('modal-reg');
                    if (typeof callback == "function")
                        callback();
                } else {
                    return false;
                }
            }
        );
        clob_ob._set(string || '');
    },
    clobGetString: function(callback) {
        var clob_ob = new isu.ajax.clob(
            function() {
                var rs = p.readyState
                if (rs == 1 || rs == 2 || rs == 3) {
                    $x_Show('modal-reg');
                    $x_Show('AjaxLoading');
                } else if (rs == 4) {
                    $x_Hide('AjaxLoading');
                    $x_Hide('modal-reg');
                    if (typeof callback == "function")
                        callback(p.responseText);
                } else {
                    return false;
                }
            }
        );
        clob_ob._get();
    }
};

$.event.copy = function (from, to) {
    from = from.jquery ? from : $(from);
    to = to.jquery ? to : $(to);

    var events = from[0].events || $.data(from[0], "events") || $._data(from[0], "events");
    if (!from.length || !to.length || !events) return;

    return to.each(function () {
        for (var type in events)
        for (var handler in events[type])
        $.event.add(this, type, events[type][handler], events[type][handler].data);
    });
};


