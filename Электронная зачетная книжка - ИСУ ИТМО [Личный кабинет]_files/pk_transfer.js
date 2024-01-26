;
'use strict';
(function () {
	function G2Access () {
		return typeof G2 != 'undefined';
	}

	function GLoader (mode) {
		if (mode) {
			if (G2Access()) {
				G2.superManLoader();
			}
		}
		else {
			if (G2Access()) {
				G2.superManDeloader();
			}
		}
	}
	
	function sendNotification (mes,type) {
		if (typeof type == 'undefined') {
			type = false;
		}
		if (type) {
			if (G2Access()) {
				G2.notify(mes,'',true);
			} else {
				Common.notify(mes,true);
			}
		} else {
			if (G2Access()) {
				G2.notify(mes);
			} else {
				Common.notify(mes);
			}
		}
	}
	
	function getMainApp () {
		return Common.location().workspace == '100000' ? 2135 : 326;
	}
	
	var pkPack = {};
	
	pkPack.redirect = function (input) {
		if (typeof input == 'undefined' || typeof input.type == 'undefined') {
			console.error('Ошибка инициализации');
			return false;
		}
		GLoader();
		
		// console.log(input, $v("pFlowId"), $("#pFlowStepId").val());
		//console.log("line 54");
		
		var flowId = input.flow || $v("pFlowId"),
			pageId = input.page || $("#pFlowStepId").val();
			
		if (typeof input.flow == 'undefined' && $v("pFlowId") == getMainApp()) {
			flowId = $('#P1_PARENT_APP_ID').val();
		}
		
		if (typeof input.page == 'undefined' && $v("pFlowId") == getMainApp()) {
			pageId = $('#P1_PARENT_PAGE_ID').val();
		}
		
		runAsyncAjaxRequest3({
			flow_id: getMainApp(),
			pageNew: 1,
			process: 'SERVICE_FLOW_GOTO',
			g_param: [input.type, input.id, flowId, pageId, input.dep, input.planId, input.fromList, input.purId],
			callback: function (e) {
				GLoader(false);
				try {					
					var result = JSON.parse(e.response);
					if (result.error) {
						sendNotification(result.error.message,true);
						return false;
					}
					if ((result.url || '') == '') {
						sendNotification('Произошла ошибка при формировании ссылки',true);
						return false;
					}
					GLoader();
					if ($v('USER_ID') != 186232){
					window.location.href = result.url;
					}
				} catch (e) {
					console.error(e);
					sendNotification('Внутреняя ошибка',true);
				}
			}
		});
	};
	
	pkPack.createNew = function (mode, personal, dep, fromList) {
		function purchaseChoose () {
			function setEvents () {
				modal.on('click', '.purchase_sel', function () {
					var currentId = this.dataset.id;
					modal.find('.purchase_sel').removeClass('active');
					modal.find('.purchse_info_container, .purchase_info_placeholder').addClass('hide');
					$(this).addClass('active');
					modal.find('.purchse_info_container[data-id="'+ currentId +'"], .purchase_info_tools').removeClass('hide');
				});
				
				modal.find('#SELECT_PURCHASE_BTN').on('click', function () {
					pkPack.redirect({
						type : mode,
						id: 'new',
						purId : modal.find('.purchase_sel.active')[0].dataset.id,
						dep: dep,
						fromList: fromList
					});
				});
				
				modal.find('#NO_PURCHASE_BTN').on('click', function () {
					pkPack.redirect({
						type : mode,
						id: 'new',
						dep: dep,
						fromList: fromList
					});
				});
			}
			
			Handlebars.registerHelper('prepareInfo', function(opts) {
				if (typeof opts.fn(this) == 'string') {
					return new Handlebars.SafeString('<p>' + opts.fn(this).replace(/\n/g,'</p><p>') + '</p>');
				} else {
					return new Handlebars.SafeString(opts.fn(this));
				}
			});
			
			var HbTmp,
				template,
				modal = bootbox.dialog({
					title: 'Выбор закупки',
					message: ' ',
					show: false
				});
				
			modal.init(function(e){
				modal.find('.modal-dialog').addClass('modal-lg');
			});
			
			G2.ajax({
				app: getMainApp(),
				page: 1,
				process: 'GET_PURCHASE_TMP'
			}).then(function (result) {
				HbTmp = result;
				template = Handlebars.compile(HbTmp);
				return G2.ajax({
					app: getMainApp(),
					page: 1,
					process: 'GET_PURCHASE_LIST',
					data_type: 'json'
				})
			}).then(function (result) {
				modal.find('.modal-body').html(template(result));
				setEvents();
				modal.modal('show');
			});
		}
		
		function createAction () {
			if (planId || mode == 'fact') {
				pkPack.redirect({
					type : mode,
					id: 'new',
					planId : planId,
					fromList: 'Y'
				});
			} else {
				/*UPD 13.08.2020 по просьбе Ани убрали воззможность выбора закупки при подачи заявки*/
				if(mode == 'plan' && personal && dep == null && fromList == 'Y'){
					pkPack.redirect({
						type : mode,
						id: 'new',
						fromList: 'Y'
					});
				}else{
					purchaseChoose();
				}
				
			}
		}
		
		function copyAction (qual_id) {
			runAsyncAjaxRequest3({
				flow_id: getMainApp(),
				page: 1,
				process: 'OD_FACT_FROM_PLAN',
				g_param: [qual_id, 'Y'],
				callback: function (e) {
					var result = JSON.parse(e.response);
					if (result.error) {
						G2.notify(result.error.message,'',true);
						return false;
					}
					G2.notify('Отчет успешно создан. Перенаправление');
					window.location.href = result.url;
				}
			});
		}
		
		function getPlanModalContent (list, fio, sex) {
			var fioArray = fio.split(' ');
			return  '<div class="note note-info"><p><b>' + (sex == 'М' ? 'Уважаемый ' : 'Уважаемая ') + fioArray[1] + ' ' + fioArray[2] + '!</b></p>' +
					'<p>Для автоматического заполнения формы, выберите, пожалуйста, запланированное ранее мероприятие и нажмите "Плановая заявка".</p>' +
					'<p>Если вы хотите подать новую заявку, просто нажмите "Обычная заявка"</p></div>' +
					'<div class="form-group">'+
						'<label class="control-label optional">План</label>'+
						'<select class="form-control" id="plan_id_picker">' + list.map(function (obj, ind) {
				return '<option value="' + obj.id + '" ' + (ind == 0 ? 'selected="selected"' : '') + '>' + obj.name + '</option>';
			}).join('') + '</select></div>';
		}
		
		function getFactModalContent (list, fio, sex) {
			var fioArray = fio.split(' ');
			return  '<div class="note note-info"><p><b>' + (sex == 'М' ? 'Уважаемый ' : 'Уважаемая ') + fioArray[1] + ' ' + fioArray[2] + '!</b></p>' +
					'<p>Для автоматического составления отчёта, выберите, пожалуйста, одно из мероприятий, которые были вами ранее запланированы.</p>' +
					'<p>Если вы хотите создать отчёт по другому мероприятию, просто нажмите кнопку "Новый отчёт"</p></div>' +
					'<div class="form-group">'+
						'<label class="control-label optional">Заявка</label>'+
						'<select class="form-control" id="plan_id_picker">' + list.map(function (obj, ind) {
				return '<option value="' + obj.id + '" ' + (ind == 0 ? 'selected="selected"' : '') + '>' + obj.name + '</option>';
			}).join('') + '</select></div>';
		}
		
		if (typeof mode == 'undefined') {
			console.error('Для корректной работы функции необходимо указать параметр mode');
			return false;
		}
		
		if (typeof personal == 'undefined') {
			personal = true;
		}
		
		var planId = null;
		
		if (mode == 'plan') {
			if (personal) {
				runAsyncAjaxRequest3({
					flow_id: getMainApp(),
					page: 1,
					process: 'OD_GET_PLAN_LIST',
					callback: function (e) {
						var result = JSON.parse(e.response);
						if (result.array.length) {
							bootbox.dialog({
								message: getPlanModalContent(result.array, result.fio, result.sex),
								title: 'Плановое повышение квалификации', 
								className: 'plan_modal_dialog',
								buttons: {
									plan: {
										label: 'Плановая заявка',
										className: "",
										callback: function(e) {
											planId = $(this).find('#plan_id_picker').val();
											createAction();
										}
									},
									ignore: {
										label: 'Обычная заявка',
										className: "btn-primary",
										callback: function(e) {
											createAction();
										}
									}
								}
							});
						} else {
							createAction();
						}
					}
				});
			} else {
				createAction();
			}
		} else if (mode == 'fact') {
			if (personal) {
				runAsyncAjaxRequest3({
					flow_id: getMainApp(),
					page: 1,
					process: 'OD_GET_PLAN_TO_FACT_LIST',
					callback: function (e) {
						var result = JSON.parse(e.response);
						if (result.array.length) {
							bootbox.dialog({
								message: getFactModalContent(result.array, result.fio, result.sex),
								title: 'Отчет о повышении квалификации', 
								className: 'fact_modal_dialog',
								buttons: {
									plan: {
										label: 'Отчет о заявленном ранее ПК',
										className: "",
										callback: function(e) {
											copyAction($(this).find('#plan_id_picker').val());
										}
									},
									ignore: {
										label: 'Новый отчет',
										className: "btn-primary",
										callback: function(e) {
											createAction();
										}
									}
								}
							});
						} else {
							createAction();
						}
					}
				});
			} else {
				createAction();
			}
		}
	};
	$(document.body).on('click', '#CREATE_HOBBY', function () {
		$('#HOBBIES').addClass('form-loading');
		G2.ajax({
			process: 'ADD_HOBBY',
			success: function (e) {
				var result = JSON.parse(e);
				if (result.error) {
					G2.notify('Ошибка! ' + result.error, '', true);
					$('#HOBBIES').removeClass('form-loading');
					return false;
				}
				apex.jQuery('#HOBBIES').trigger('apexrefresh');
				$('#HOBBIES').removeClass('form-loading');
			},
			error: function (e) {
				G2.notify('Ошибка! Обратитесь к администратору', '', true);
				$('#HOBBIES').removeClass('form-loading');
			}
		});	
	});
	
	window.ppk_package_utils = pkPack;
})();