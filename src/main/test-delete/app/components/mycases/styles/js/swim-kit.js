// JavaScript USDA SWIM KIT Library
// IPT 2017
//
//	Dependencies
//		-- jquery.min.js
//		-- bootstrap.min.js
//		-- material.min.js
//		-- bootstrap-datepicker.js
//		-- swim-kit.js
//
//	Contents (these are searchable text values)
//		--	General Functions
//		--	Form Functions
//		--	Fancy Select Field Function
//		--	DataTables Functions
//		--	Formatting Functions
//		--	Documentation
//
//
//
//	******* DOCUMENTATION IS AT THE END OF THIS FILE *******************
//
//
//
// 	** History **
//		v 1.0.1 - Refactored many of the JS functions and combined them into this single file
//
//
// 		swim-kit.js - initial release
//
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

var currentDate = new Date();
var currentDateTime = new Date().getTime();
var currentYear = currentDate.getFullYear();

//$(document).ready(function() {
$(window).load(function() {
    /////////// General Functions ////////////////////
    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Check if the page has a datepicker and if so activate it
    if ($('.datepicker').length != 0) {

        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

        var dt = $(".datepicker");

        dt.datepicker({
            format: 'mm/dd/yyyy',
            onRender: function(date) {
                return date.valueOf() > now.valueOf() ? 'disabled' : '';
            }
        });

        // Handle the green underline success state toggle based on if datepicker is populated or not
        dt.on('changeDate', function(ev) {
            var mDate = new moment(ev.date);
            $(this).attr('value', mDate.format('MM/DD/YYYY'));
            $(this).closest("div.form-group").removeClass("is-empty").addClass("has-success");
        });

        setTimeout(function(){
            if (dt.val()) {
                $(this).closest("div.form-group").removeClass("is-empty").addClass("has-success");
            }
        }, 200);
    }

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
    if ($('.navbar-color-on-scroll').length != 0) {
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
        interval: 400000
    });

    /////////// Form Functions ////////////////////

    // Function that handles the auto height adjust feature for textareas MM 2-25-17
    $.each($("textarea"), function(el) {
        var $this = $(this);
        var $formgroup = $this.closest(".form-group");
        var $offset = this.offsetHeight - this.clientHeight;

        var resizeTextarea = function(el) {
            $(el).css("height", "auto").css("height", el.scrollHeight + $offset);
        };

        resizeTextarea(this);

        setTimeout(function(){
            if($this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                $formgroup.removeClass("has-success");
            }
        },200);

        $this.on("keyup input focus", function() {
            resizeTextarea(this);

            if($this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                $formgroup.removeClass("has-success");
            }
        });
    });

    // Function that handles the success state green underline treatment for input fields MM 2-25-17
    $.each($("input"), function(el) {
        var $this = $(this);
        var $formgroup = $this.closest(".form-group");

        setTimeout(function(){
            if($this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                //$formgroup.removeClass("has-success");
            }
        },200);

        $this.on("keyup input focus blur", function() {
            //var $this = $(this);
            if($this.prop("required") && $this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                $formgroup.removeClass("has-success");
            }
        });
    });

    // Function that handles the success state green underline treatment for select fields MM 2-25-17
    $.each($("select"), function(el) {
        var $this = $(this);
        var $formgroup = $this.closest(".form-group");

        setTimeout(function(){
            if($this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                $formgroup.removeClass("has-success");
            }
        },200);

        $this.on("change blur", function() {
            if($this.val() !== "") {
                $formgroup.addClass("has-success");
            } else {
                $formgroup.removeClass("has-success");
            }
        });
    });

    // Handle field masking Mitch M 2-26-17
    //$.mask.definitions['h'] = "^[0-9][0-9]?$|^100$";
    //$.mask.definitions['e'] = "[a-zA-Z0-9\-\_]+";
    $(".percent").mask("99?9%", {autoclear: false});
    $(".datepicker").mask("99/99/9999", {autoclear: false});
    $(".phone").mask("(999) 999-9999", {autoclear: false});
    $(".zip").mask("99999-9999", {autoclear: false});
    $(".ssn").mask("999-99-9999");
    $(".percent").on("blur", function() {
        var value = ($(this).val().length == 1) ? $(this).val() + '%' : ($(this).val() > 100 ? 100 : $(this).val());
        $(this).val(value);
    });

    /////////// Fancy Select Field Function ////////////////////

    var e = function(e) {
        this.element_ = e, this.setDefaults_(), this.init()
    };
    window.MaterialSelectfield = e, e.prototype.CssClasses_ = {
        LABEL: "swim-selectfield__label",
        SELECT: "swim-selectfield__select",
        SELECTED_BOX: "swim-selectfield__box",
        SELECTED_BOX_VALUE: "swim-selectfield__box-value",
        LIST_OPTION_BOX: "swim-selectfield__list-option-box",
        IS_DIRTY: "is-dirty",
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_INVALID: "is-invalid",
        IS_UPGRADED: "is-upgraded",
        IS_SELECTED: "is-selected"
    }, e.prototype.Keycodes_ = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        UP_ARROW: 38,
        DOWN_ARROW: 40
    }, e.prototype.setDefaults_ = function() {
        this.options_ = [], this.optionsMap_ = {}, this.optionsArr_ = [], this.closing_ = !0, this.keyDownTimerId_ = null, this.observer_ = null
    }, e.prototype.onFocus_ = function(e) {
        this.closing_ && this.show_(e)
    }, e.prototype.onBlur_ = function(e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, e.prototype.onSelected_ = function(e) {
        if (e.target && "LI" == e.target.nodeName) {
            var t = this.options_[e.target.getAttribute("data-value")];
            if (t.disabled) return e.stopPropagation(), !1;
            this.selectedOptionValue_.textContent = t.textContent, t.selected = !0;
            var s;
            if ("function" == typeof window.Event ? s = new Event("change", {
                    bubbles: !0,
                    cancelable: !0
                }) : "function" == typeof document.createEvent && (s = document.createEvent("HTMLEvents"), s.initEvent("change", !0, !0)), s && this.select_.dispatchEvent(s), "" !== t.textContent) {
                this.element_.classList.add(this.CssClasses_.IS_DIRTY);
                var i = this.listOptionBox_.querySelector("." + this.CssClasses_.IS_SELECTED);
                i && i.classList.remove(this.CssClasses_.IS_SELECTED), e.target.classList.add(this.CssClasses_.IS_SELECTED)
            } else {
                this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
                var i = this.listOptionBox_.querySelector("." + this.CssClasses_.IS_SELECTED);
                i && i.classList.remove(this.CssClasses_.IS_SELECTED)
            }
        }
    }, e.prototype.onclick_ = function(e) {
        this.toggle(e)
    }, e.prototype.update_ = function() {
        var e;
        if (this.options_ && this.options_.length > 0)
            for (var t = 0; t < this.options_.length; t++) {
                var s = this.options_[t];
                if (s.selected && "" !== s.value) {
                    var e = !0;
                    this.element_.classList.add(this.CssClasses_.IS_DIRTY), this.listOptionBox_.querySelector("." + this.CssClasses_.IS_SELECTED).classList.remove(this.CssClasses_.IS_SELECTED), this.listOptionBox_.querySelectorAll("LI")[t].classList.add(this.CssClasses_.IS_SELECTED)
                }
            }
        e || this.element_.classList.remove(this.CssClasses_.IS_DIRTY), this.checkDisabled(), this.checkValidity()
    }, e.prototype.checkValidity = function() {
        this.select_.validity && (this.select_.validity.valid ? this.element_.classList.remove(this.CssClasses_.IS_INVALID) : this.element_.classList.add(this.CssClasses_.IS_INVALID))
    }, e.prototype.checkValidity = e.prototype.checkValidity, e.prototype.checkDisabled = function() {
        this.select_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, e.prototype.checkDisabled = e.prototype.checkDisabled, e.prototype.disable = function() {
        this.select_.disabled = !0, this.update_()
    }, e.prototype.disable = e.prototype.disable, e.prototype.enable = function() {
        this.select_.disabled = !1, this.update_()
    }, e.prototype.enable = e.prototype.enable, e.prototype.isDescendant_ = function(e, t) {
        for (var s = t.parentNode; null != s;) {
            if (s == e) return !0;
            s = s.parentNode
        }
        return !1
    }, e.prototype.toggle = function(e) {
        this.element_.classList.contains(this.CssClasses_.IS_FOCUSED) ? e.target && "LI" == e.target.nodeName && this.isDescendant_(this.listOptionBox_, e.target) ? this.onSelected_(e) : this.hide_() : this.show_(e)
    }, e.prototype.show_ = function(e) {
        if (this.checkDisabled(), !this.element_.classList.contains(this.CssClasses_.IS_DISABLED)) {
            this.element_.classList.add(this.CssClasses_.IS_FOCUSED), this.closing_ = !1, this.strSearch_ = "";
            var t = this.listOptionBox_ && this.listOptionBox_.querySelector("." + this.CssClasses_.IS_SELECTED);
            t && (t.parentElement.parentElement.scrollTop = t.offsetTop), this.boundKeyDownHandler_ = this.onKeyDown_.bind(this), this.boundClickDocHandler_ = function(t) {
                t === e || this.closing_ || t.target.parentNode === this.element_ || t.target.parentNode === this.selectedOption_ || this.hide_()
            }.bind(this), document.addEventListener("keydown", this.boundKeyDownHandler_), document.addEventListener("click", this.boundClickDocHandler_)
        }
    }, e.prototype.onKeyDown_ = function(e) {
        var t = this.listOptionBox_.querySelectorAll("li:not([disabled])");
        if (t && t.length > 0 && !this.closing_) {
            var s, i = Array.prototype.slice.call(t).indexOf(this.listOptionBox_.querySelectorAll("." + this.CssClasses_.IS_SELECTED)[0]);
            if (e.keyCode === this.Keycodes_.UP_ARROW || e.keyCode === this.Keycodes_.DOWN_ARROW) - 1 != i && t[i].classList.remove(this.CssClasses_.IS_SELECTED), e.keyCode === this.Keycodes_.UP_ARROW ? (e.preventDefault(), s = i > 0 ? t[i - 1] : t[t.length - 1]) : (e.preventDefault(), s = t.length > i + 1 ? t[i + 1] : t[0]), s && (s.classList.add(this.CssClasses_.IS_SELECTED), this.listOptionBox_.scrollTop = s.offsetTop, this.lastSelectedItem_ = s);
            else if (e.keyCode !== this.Keycodes_.SPACE && e.keyCode !== this.Keycodes_.ENTER || !this.lastSelectedItem_) {
                if (e.keyCode === this.Keycodes_.ESCAPE) {
                    e.preventDefault();
                    var o;
                    document.createEvent ? (o = document.createEvent("MouseEvent"), o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : o = new MouseEvent("mousedown"), document.body.dispatchEvent(o), document.createEvent || (o = new MouseEvent("mouseup"), document.body.dispatchEvent(o)), document.body.click()
                } else if (this.validKeyCode_(e.keyCode)) {
                    var n = e.which || e.keyCode;
                    this.strSearch_ += String.fromCharCode(n), this.keyDownTimerId_ && clearTimeout(this.keyDownTimerId_), this.keyDownTimerId_ = setTimeout(function() {
                        this.keyDownTimerId_ = null, this.strSearch_ = ""
                    }.bind(this), 300);
                    var l = this.searchByStrIndex_(0);
                    l > -1 && (-1 != i && t[i].classList.remove(this.CssClasses_.IS_SELECTED), s = t[l], s.classList.add(this.CssClasses_.IS_SELECTED), this.listOptionBox_.scrollTop = s.offsetTop, this.lastSelectedItem_ = s)
                }
            } else {
                e.preventDefault();
                var o;
                document.createEvent ? (o = document.createEvent("MouseEvent"), o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : o = new MouseEvent("mousedown"), this.lastSelectedItem_.dispatchEvent(o), document.createEvent || (o = new MouseEvent("mouseup"), this.lastSelectedItem_.dispatchEvent(o))
            }
        }
    }, e.prototype.searchByStrIndex_ = function(e) {
        for (var t = this.strSearch_, s = new RegExp("^" + t + "."), i = -1, o = this.optionsArr_, n = 0; n < o.length; n++)
            if (s.test(o[n])) {
                i = n;
                break
            }
        return -1 != i ? this.optionsMap_[this.optionsArr_[i]] : -1
    }, e.prototype.validKeyCode_ = function(e) {
        return e > 47 && 58 > e || 32 == e || 13 == e || e > 64 && 91 > e || e > 95 && 112 > e || e > 185 && 193 > e || e > 218 && 223 > e
    }, e.prototype.hide_ = function() {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED), this.closing_ = !0, this.strSearch_ = "", this.boundClickDocHandler_ && document.removeEventListener("click", this.boundClickDocHandler_), this.boundKeyDownHandler_ && document.removeEventListener("keydown", this.boundKeyDownHandler_), this.update_()
    }, e.prototype.init = function() {
        if (this.element_) {
            this.element_.classList.remove(this.CssClasses_.IS_DIRTY), this.lastSelectedItem_ = null, this.label_ = this.element_.querySelector("." + this.CssClasses_.LABEL), this.select_ = this.element_.querySelector("." + this.CssClasses_.SELECT);

            document.createElement("span");

            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.SELECTED_BOX), e.tabIndex = -1, this.selectedOption_ = e;

            /*var t = document.createElement("span");
             t.classList.add("form-control-prepend"), t.innerHTML = "<img src=\"assets/img/arrow-down-lrg.png\" alt=\"Arrow down\">", e.appendChild(t);*/

            var s = document.createElement("span");
            s.classList.add(this.CssClasses_.SELECTED_BOX_VALUE), s.tabIndex = 0, e.appendChild(s), this.selectedOptionValue_ = s, this.element_.appendChild(this.selectedOption_);

            var i = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
            this.makeElements_(), this.boundClickHandler = this.onclick_.bind(this), this.element_.addEventListener("click", this.boundClickHandler), i && this.element_.classList.add(this.CssClasses_.IS_INVALID), this.checkDisabled()
        }
    }, e.prototype.refreshOptions = function() {
        this.mdlDowngrade_(), this.setDefaults_(), this.init()
    }, e.prototype.clearElements_ = function() {}, e.prototype.makeElements_ = function() {
        if (this.select_ && (this.options_ = this.select_.querySelectorAll("option"), this.select_.style.visibility = "hidden", 0 == this.options_.length && (this.options_ = [document.createElement("option")]), this.options_.length)) {
            var e = document.createElement("div"),
                t = '<ul tabindex="-1">',
                s = "";
            e.classList.add(this.CssClasses_.LIST_OPTION_BOX), e.tabIndex = "-1";
            for (var i = 0; i < this.options_.length; i++) {
                var o = this.options_[i],
                    n = (o.textContent || "").toUpperCase().replace(/( )|(\n)/g, ""),
                    l = "";
                this.optionsMap_[n] = i, this.optionsArr_.push(n), o.selected && "" !== o.textContent && (this.element_.classList.add(this.CssClasses_.IS_DIRTY), this.selectedOptionValue_.textContent = o.textContent, l += this.CssClasses_.IS_SELECTED), o.disabled && (l += "" != l ? " " + this.CssClasses_.IS_DISABLED : this.CssClasses_.IS_DISABLED), s += '<li class="' + l + '" data-value="' + i + '" tabindex="-1">' + o.textContent + "</li>"
            }
            t += s + "</ul>", e.innerHTML = t, this.element_.appendChild(e), this.listOptionBox_ = e, window.MutationObserver && (this.observer_ = new MutationObserver(function(e) {
                e.forEach(function(e) {
                    "childList" == e.type && this.refreshOptions()
                }.bind(this))
            }.bind(this)), this.observer_.observe(this.select_, {
                attributes: !0,
                childList: !0,
                characterData: !0
            }))
        }
    }, e.prototype.mdlDowngrade_ = function() {
        this.element_.removeEventListener("click", this.boundClickHandler), this.listOptionBox_ && this.element_.removeChild(this.listOptionBox_), this.selectedOption_ && this.element_.removeChild(this.selectedOption_), this.element_.removeAttribute("data-upgraded"), this.select_.style.visibility = "visible", this.observer_ && this.observer_.disconnect()
    }, e.prototype.mdlDowngrade = e.prototype.mdlDowngrade_, e.prototype.mdlDowngrade = e.prototype.mdlDowngrade, componentHandler.register({
        constructor: e,
        classAsString: "MaterialSelectfield",
        cssClass: "swim-js-selectfield",
        widget: !0
    });


    /////////// DataTables Functions ////////////////////

    // DataTables for parent page tables (not modal windows)
    var table_expandable = $('#table-work-queue').DataTable({
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "iDisplayLength": 10,
        "bPaginate": false,
        "bLengthChange": false,
        'bFilter': false,
        'bSort': true,
        'bInfo': false,
        "oLanguage": {
            "sSearch": "Search within: ",
            "sInfo": 'Showing _END_ Results ',
            "sInfoEmpty": 'No results to show',
            "sEmptyTable": "No results found, please try again.",
            "sInfoFiltered": "out of _MAX_"
        },
        "ajax": "assets/data/sample_data_table_work_queue.txt",
        "columns": [{
            "data": "id"
        }, {
            "data": "Title"
        }, {
            "data": "State"
        }, {
            "data": "Region"
        }, {
            "data": "Type"
        }, {
            "data": "Submission_Date"
        }, {
            "data": "Elapsed_Time"
        }, {
            "render": function ( data, type, full, meta ) {
                return '<button type="button" rel="tooltip" title="Assign" aria-labelledby="Assign' + full.id + '" role="presentation" class="btn btn-table mr20" data-toggle="modal" data-target="#myModal"><title id="Assign' + full.id + '">Assign</title>' +
                    '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm15.398 15.8c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Download" aria-labelledby="Download' + full.id + '" role="presentation" class="btn btn-table"><title id="Download' + full.id + '">Download</title>' +
                    '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M14 2v11h2.51l-4.51 5.01-4.51-5.01h2.51v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm3 19v3h-14v-3h-2v5h18v-5h-2z"/> </svg>' +
                    '</button>'
            }
        }],
        "order": [
            [0, 'asc']
        ]
    });

    var table_work_queue_no_icons = $('#table-work-queue-no-icons').DataTable({
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "iDisplayLength": 10,
        "bPaginate": false,
        "bLengthChange": false,
        'bFilter': false,
        'bSort': true,
        'bInfo': false,
        "oLanguage": {
            "sSearch": "Search within: ",
            "sInfo": 'Showing _END_ Results ',
            "sInfoEmpty": 'No results to show',
            "sEmptyTable": "No results found, please try again.",
            "sInfoFiltered": "out of _MAX_"
        },
        "ajax": "assets/data/sample_data_table_work_queue.txt",
        "columns": [{
            "data": "Title"
        }, {
            "data": "State"
        }, {
            "data": "Region"
        }, {
            "data": "Type"
        }, {
            "data": "Submission_Date"
        }, {
            "data": "Elapsed_Time"
        }],
        "order": [
            [0, 'asc']
        ]
    });

    // R2S2 NO Work Queues Assigned Requests Mitch M 3-25-17
    var table_work_queue_assigned_requests = $("#table-work-queue-assigned-requests").DataTable({
        "sPaginationType": "full_numbers",
        "bAutoWidth": true,
        "bPaginate": true,
        "bSort": true,
        "bInfo": false,
        "pagingType": "simple",
        "pageLength": 10,
        "processing": false,
        "oLanguage": {
            "sSearch": "Search within: ",
            "sInfo": "Showing _END_ Results ",
            "sInfoEmpty": "No results to show",
            "sEmptyTable": "No results found, please try again.",
            "sInfoFiltered": "out of _MAX_"
        },
        "ajax": "../assets/data/sample_data_table_work_queue_assigned_requests.txt",
        "columns": [{
            //"data": "Title"
            "render": function ( data, type, full, meta ) {
                return '<a href="javascript:;" title="' + full.Title + '">' + full.Title + '</a>';
            }
        }, {
            "data": "Type"
        }, {
            "data": "Region"
        }, {
            "data": "State"
        }, {
            "render": function (data, type, full, meta) {
                var Assignment_Date = dateFromISO8601(full.Assignment_Date);
                return Assignment_Date;
            }
        }, {
            "render": function (data, type, full, meta) {
                var Due_Date = full.Due_Date;
                var Assignment_Date = full.Assignment_Date;
                indicatorType = returnCircleIndicator(Due_Date, Assignment_Date);
                return indicatorType;
            }
        }, {
            "data": "Status"
        }],
        "order": [
            [0, "asc"]
        ],
        // Custom dropdown table filter functions Mitch M 3-25-17
        initComplete: function () {
            var col1 = this.api().columns(2);
            var col2 = this.api().columns(3);

            col1.every(function () {
                var column = this;
                var selectOpt = $("#select-state-agency option");
                $("#select-regional-office").on("change", function () {
                    $("#select-state-agency option").remove();
                    var classN = $("#select-regional-office option:selected").prop("class");
                    if (classN == "ALL") {
                        $.each(selectOpt, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("#select-state-agency option:first-child").remove();
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                        column.search("").draw();
                    } else {
                        var opts = selectOpt.filter('.' + classN);
                        $.each(opts, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                    }
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                        col2.search("").draw();
                    } else {
                        col2.search("").draw();
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });
            // 4th column (number 3 index below)
            col2.every(function () {
                var column = this;
                $("#select-state-agency").on("change", function () {
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                    } else {
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });

            checkLoadMoreButton();
        }

    });

    // R2S2 NO All Requests Current Waivers Mitch M 3-26-17
    var table_all_requests_current_waivers = $("#table-all-requests-current-waivers").DataTable({
        "sPaginationType": "full_numbers",
        "bAutoWidth": true,
        "bPaginate": true,
        "bSort": true,
        "bInfo": false,
        "pagingType": "simple",
        "pageLength": 10,
        "processing": false,
        "oLanguage": {
            "sSearch": "Search within: ",
            "sInfo": "Showing _END_ Results ",
            "sInfoEmpty": "No results to show",
            "sEmptyTable": "No results found, please try again.",
            "sInfoFiltered": "out of _MAX_"
        },
        "ajax": "../assets/data/sample_data_table_all_requests_current_waivers.txt",
        "columns": [{
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function (data, type, full, meta) {
                return returnTableCheckbox(data);
            }

        }, {
            "render": function ( data, type, full, meta ) {
                return '<a href="javascript:;" title="' + full.Title + '">' + full.Title + '</a>';
            }
        }, {
            "data": "Serial_Number"
        }, {
            "data": "Region"
        }, {
            "data": "State"
        }, {
            "render": function (data, type, full, meta) {
                var Approval = dateFromISO8601(full.Approval);
                return Approval;
            }
        }, {
            "render": function (data, type, full, meta) {
                var Implementation = dateFromISO8601(full.Implementation);
                return Implementation;
            }
        }, {
            "render": function (data, type, full, meta) {
                var Implementation = full.Implementation;
                var Expiration = full.Expiration;
                indicatorType = returnCircleIndicator(Expiration, Implementation);
                return indicatorType;
            }
        }, {
            "render": function(data, type, full, meta) {
                return returnTableHotDog();
            }

        }, {
            "searchable": true,
            "visible": false,
            "render": function(data, type, full, meta) {
                var Expiration = full.Expiration;
                return returnTimeSpanIndicator(Expiration);
            }

        }, {
            "searchable": true,
            "visible": false,
            "render": function(data, type, full, meta) {
                var Expiration = full.Expiration;
                return returnYearIndicator(Expiration);
            }
        }],
        "order": [
            [1, "asc"]
        ],
        // Custom dropdown table filter functions Mitch M 3-25-17
        initComplete: function () {
            var col1 = this.api().columns(3);
            var col2 = this.api().columns(4);
            var col3 = this.api().columns(7);
            var coltimespan = this.api().columns(9);
            var colyear = this.api().columns(10);
            col1.every(function () {
                var column = this;
                var selectOpt = $("#select-state-agency option");
                $("#select-regional-office").on("change", function () {
                    $("#select-state-agency option").remove();
                    var classN = $("#select-regional-office option:selected").prop("class");
                    if (classN == "ALL") {
                        $.each(selectOpt, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("#select-state-agency option:first-child").remove();
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                        column.search("").draw();
                    } else {
                        var opts = selectOpt.filter('.' + classN);
                        $.each(opts, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                    }
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                        col2.search("").draw();
                    } else {
                        col2.search("").draw();
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });
            // 4th column State filter
            col2.every(function () {
                var column = this;
                $("#select-state-agency").on("change", function () {
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                    } else {
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });
            // 5th column Expiration filter
            col3.every(function () {
                var column = this;
                $("#select-expiration-date").on("change", function () {
                    var val = $(this).val();
                    if (val == "All") {
                        coltimespan.search("").draw();
                        colyear.search("").draw();
                    } else if (val == 1) {                               // Filter - Last 90 days selected
                        colyear.search("").draw();
                        coltimespan.search(val).draw();
                    } else if (val == 2) {                               // Filter - Last 90 days selected
                        colyear.search("").draw();
                        coltimespan.search("[1|2]", true, false).draw();
                    } else if (val == 3) {                               // Filter - This Year selected
                        coltimespan.search("").draw();
                        colyear.search(currentYear).draw();
                    } else {                                             // Filter - Last Year selected
                        var lastYear = currentYear - 1;
                        coltimespan.search("").draw();
                        colyear.search(lastYear).draw();
                    }
                    checkLoadMoreButton();
                });
            });

            checkLoadMoreButton();
        }

    });


    // R2S2 SE VA Requests Current Waivers Mitch M 3-26-17
    var table_va_requests_current_waivers = $("#table-va-requests-current-waivers").DataTable({
        "sPaginationType": "full_numbers",
        "bAutoWidth": true,
        "bPaginate": true,
        "bSort": true,
        "bInfo": false,
        "pagingType": "simple",
        "pageLength": 10,
        "processing": false,
        "oLanguage": {
            "sSearch": "Search within: ",
            "sInfo": "Showing _END_ Results ",
            "sInfoEmpty": "No results to show",
            "sEmptyTable": "No results found, please try again.",
            "sInfoFiltered": "out of _MAX_"
        },
        "ajax": "../assets/data/sample_data_table_va_requests_current_waivers.txt",
        "columns": [{
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function (data, type, full, meta) {
                return returnTableCheckbox(data);
            }

        }, {
            "render": function ( data, type, full, meta ) {
                return '<a href="javascript:;" title="' + full.Title + '">' + full.Title + '</a>';
            }
        }, {
            "data": "Serial_Number"
        }, {
            "render": function (data, type, full, meta) {
                var Approval = dateFromISO8601(full.Approval);
                return Approval;
            }
        }, {
            "render": function (data, type, full, meta) {
                var Implementation = dateFromISO8601(full.Implementation);
                var Implementation2 = full.Implementation;
                var Expiration = full.Expiration;
                indicatorType = returnCircleIndicator(Expiration, Implementation2, true);
                if (indicatorType == "success") {
                    return Implementation + '<span class="table-icon-edit"><a href="javascript:;" data-toggle="modal" data-target="#modal-edit-date"><img src="../assets/img/icon-edit.png" alt="Edit icon" title="Edit icon"></a></span>';
                } else {
                    return Implementation;
                }
            }
        }, {
            "render": function (data, type, full, meta) {
                var Implementation = full.Implementation;
                var Expiration = full.Expiration;
                indicatorType = returnCircleIndicator(Expiration, Implementation);
                return indicatorType;
            }
        }, {
            "render": function(data, type, full, meta) {
                return returnTableHotDog();
            }

        }, {
            "searchable": true,
            "visible": false,
            "render": function(data, type, full, meta) {
                var Expiration = full.Expiration;
                return returnTimeSpanIndicator(Expiration);
            }

        }, {
            "searchable": true,
            "visible": false,
            "render": function(data, type, full, meta) {
                var Expiration = full.Expiration;
                return returnYearIndicator(Expiration);
            }
        }],
        "order": [
            [1, "asc"]
        ],
        // Custom dropdown table filter functions Mitch M 3-25-17
        initComplete: function () {
            var col1 = this.api().columns(3);
            var col2 = this.api().columns(4);
            var col3 = this.api().columns(7);
            var coltimespan = this.api().columns(9);
            var colyear = this.api().columns(10);
            col1.every(function () {
                var column = this;
                var selectOpt = $("#select-state-agency option");
                $("#select-regional-office").on("change", function () {
                    $("#select-state-agency option").remove();
                    var classN = $("#select-regional-office option:selected").prop("class");
                    if (classN == "ALL") {
                        $.each(selectOpt, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("#select-state-agency option:first-child").remove();
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                        column.search("").draw();
                    } else {
                        var opts = selectOpt.filter('.' + classN);
                        $.each(opts, function (i, j) {
                            $(j).appendTo("#select-state-agency");
                        });
                        $("<option value=\"All\" class=\"ALL\">All</option>").prependTo("#select-state-agency").prop("selected",true);
                    }
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                        col2.search("").draw();
                    } else {
                        col2.search("").draw();
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });
            // 4th column State filter
            col2.every(function () {
                var column = this;
                $("#select-state-agency").on("change", function () {
                    var val = $(this).val();
                    if (val == "All") {
                        column.search("").draw();
                    } else {
                        column.search(val).draw();
                    }
                    checkLoadMoreButton();
                });
            });
            // 5th column Expiration filter
            col3.every(function () {
                var column = this;
                $("#select-expiration-date").on("change", function () {
                    var val = $(this).val();
                    if (val == "All") {
                        coltimespan.search("").draw();
                        colyear.search("").draw();
                    } else if (val == 1) {                               // Filter - Last 90 days selected
                        console.log("1 selected.....");
                        colyear.search("").draw();
                        coltimespan.search(val).draw();
                    } else if (val == 2) {                               // Filter - Last 90 days selected
                        console.log("2 selected.....");
                        colyear.search("").draw();
                        coltimespan.search(1|2,true).draw();
                    } else if (val == 3) {                               // Filter - This Year selected
                        coltimespan.search("").draw();
                        colyear.search(currentYear).draw();
                    } else {                                             // Filter - Last Year selected
                        var lastYear = currentYear - 1;
                        coltimespan.search("").draw();
                        colyear.search(lastYear).draw();
                    }
                    checkLoadMoreButton();
                });
            });

            checkLoadMoreButton();
        }

    });

    /////////// Table helpers ////////////////////

    // Handle click on "Select all" control
    $('#table-select-all').on('click', function(){
        var rows = $(".table-loader").DataTable().rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
        handleAlertBottomCounter();
    });

    // Handle click on checkbox to set state of "Select all" control
    $(".table-loader tbody").on('change', 'input[type="checkbox"]', function(){
        if(!this.checked){
            var el = $('#table-select-all').get(0);
            if(el && el.checked && ('indeterminate' in el)){
                el.indeterminate = true;
            }
        }
        handleAlertBottomCounter();
    });

    // Handle show All records, displays 10000
    $('#table-filter-wq-show-number').on("change", function(){
        var $this = $(this).val();
        if ($this == "ALL") {
            $(".table-loader").DataTable().page.len(10000).draw();
        } else {
            $(".table-loader").DataTable().page.len($(this).val()).draw();
        }
        checkLoadMoreButton();
    });

    // Handle the showing and hiding of the bottom alert bar based on checked
    // checkboxes in a table, also display the number checked
    function handleAlertBottomCounter() {
        var table = $(".table-loader").DataTable();
        var countCheckedCheckboxes = table
            .rows()
            .nodes()
            .to$()      // Convert to a jQuery object
            .find('input[type="checkbox"]:checked').length;
        var alert = $(".alert-bottom");
        if (countCheckedCheckboxes > 0) {
            alert.removeClass("hidden");
            alert.slideDown(500);
        } else {
            alert.slideUp(500, function() {
                alert.addClass("hidden");
            });
        }
        $("#table-alert-select-count p").text(countCheckedCheckboxes);
    }

    // Render a circle indicator in tables based on business rules in the options below
    // This accepts two UTC dates, formats them and returns a color indicator in green, yellow, or red
    // If true is passed in as the third parameter, only the indicatorType text string is returned i.e. "success"
    function returnCircleIndicator(date1, date2, simple) {
        var date1 = dateFromISO8601(date1);
        var date2 = dateFromISO8601(date2);

        var lower1 = 0;
        var upper1 = 2;

        var indicatorType = "success";
        var dateDiff = (Math.round((Date.parse(date1) - Date.parse(date2))/(86400000)));
        if (dateDiff >= lower1 && dateDiff <= upper1)
            indicatorType = "danger";
        if (dateDiff > 2 && dateDiff <= 7)
            indicatorType = "warning";
        if (dateDiff > 7)
            indicatorType = "success";
        if (simple) {
            return indicatorType;
        } else {
            return '<p class="indicator indicator-' + indicatorType + '" title="Due Date indicator is set to ' + indicatorType + '"></p> ' + date1 + ' (' + dateDiff + ')';
        }
    }

    // Used for the Date filter dropdown, the integer returned gets placed in a hidden column which is used to filter on
    function returnTimeSpanIndicator(date) {
        var date = dateFromISO8601(date);
        var spanIndicator = 0;
        var dateDiff = (Math.round((currentDateTime - Date.parse(date))/(86400000)) + 1);
        if (dateDiff <= 30) { // Last 30 Days
            spanIndicator = 1;
        } else if (dateDiff <= 90) { // Last 90 Days
            spanIndicator = 2;
        } else {
            spanIndicator = 0;
        }
        return spanIndicator;
    }

    // Returns the full year from a formatted date string pass in, 03/28/2017 will return 2017
    function returnYearIndicator(date) {
        var date = dateFromISO8601(date);
        var yearIndicator = date.split("/");
        return yearIndicator[2];
    }

    // Renders a Material Design checkbox when called
    function returnTableCheckbox(data) {
        return '<div class="checkbox"><label><input type="checkbox" value="' + $('<div/>').text(data).html() + '"><span class="checkbox-material"><span class="check"></span></span></label></div>';
    }

    // Render a hot dog menu inside a table cell
    function returnTableHotDog() {
        return '<div class="dropdown">'
            + '<div class="icon-table-menu" data-toggle="dropdown"><img src="../assets/img/icon-hotdog-blue.png" height="7" width="28" alt="Table Row Hotdog Menu"" title="Table Row Hotdog Menu"></div>'
            + '<ul class="dropdown-menu">'
            + '<li><a href="#">Extend</a></li>'
            + '<li><a href="#">Modify</a></li>'
            + '<li><a href="#">Extend &amp; Modify</a></li>'
            + '</ul>'
            + '</div>';
    }

    /////////// Table Lazy Load Functions (First implemented in Release 2) ////////////////////
    // This will apply to any table that has the ID "table-loader" and will display 10 records to start Mitch M 3-26-17
    var $btn_more = $("#btn-load-more");
    var $btn_less = $("#btn-show-less");
    var $current_index = 10;

    $btn_more.click(function(e) {
        e.preventDefault();
        var VisibleRows = $('.table-loader>tbody>tr:visible').length;
        var i = VisibleRows + 10;
        $(".table-loader").DataTable().page.len(i).draw();
        $current_index += 10;
        checkLoadMoreButton();
    });

    $btn_less.click(function(e) {
        e.preventDefault();
        $(".table-loader").DataTable().page.len($current_index - 10).draw();
        $current_index -= 10;
        checkLoadMoreButton();
    });

    // Handle table Load More and Less buttons with row calculations, handle showing and hiding
    function checkLoadMoreButton() {
        var $trs = $(".table-loader").DataTable().rows().count();
        var $trs_length = $trs;
        var $current_length = $('.table-loader>tbody>tr:visible').length;
        if ($current_length >= $trs_length || $current_length < 10) {
            $btn_more.hide();
        } else {
            $btn_more.show();
            var $current_length_1 = $current_length + 1;
            var $load_to_calc = ((($current_length_1 + 10) < ($trs_length)) ? ($current_length_1 + 10) : $trs_length);
            $btn_more.prop("value", "Load More (" + $current_length_1 + " to " + $load_to_calc + ")");
        }
        if ($trs_length > 10 && $current_length > 10) {
            $btn_less.show();
        } else {
            $btn_less.hide();
        }
    }

    // Format a date from ISO8061 to a short date i.e. 03/28/2017
    function dateFromISO8601(isostr) {
        var parts = isostr.match(/\d+/g);
        var date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
        var mm = date.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        var dd = date.getDate();
        dd = (dd < 10) ? '0' + dd : dd;
        var yyyy = date.getFullYear();
        var finaldate = mm + '/' + dd + '/' + yyyy;
        return finaldate;
    }

    setTimeout(function() {
        $("[rel='tooltip']").tooltip();
    }, 300);


    // Add event listener for opening and closing details sections from table rows
    // This is the new version that uses hidden table rows that contain employee details 2-21-17
    $('#table-modal tbody').on('click', 'td.details-control', function() {
        var $row = $(this).closest('tr');
        var $row_hidden = $row.next('tr');

        // Check if any other rows are expanded
        if ($row.closest("table").find("shown")) {

        }
        if ($row.hasClass("shown")) {
            // This row is already open - close it
            $row_hidden.addClass("hidden-row");
            $row.removeClass('shown');
            $row.css({
                "border-bottom": "10px solid #f2f2f2"
            });
        } else {
            // Open this row
            $row_hidden.removeClass("hidden-row");
            $row.addClass('shown');
            // Make the table border 0 so the details section attaches to the parent table row
            $row.css({
                "border-bottom": "0"
            });
        }

    });

    // Handle large, in-page expandable/collapsible sections Mitch M 2-25-17
    $(".swim-section").on("click", ".swim-section-expand a", function(){
        var $this = $(this);
        var $hidden_section = $this.closest(".swim-section.expandable").find(".hidden-section");
        var $icon_expand = $this.find(".icon-expand");
        var $icon_collapse = $this.find(".icon-collapse");
        var $section_title_show = $this.closest(".swim-section.expandable").find(".expand.shown");
        var $section_title_hide = $this.closest(".swim-section.expandable").find(".expand.hidden");

            if ($hidden_section.hasClass("hidden")) {
                $hidden_section.removeClass("hidden");
                $icon_expand.addClass("hidden");
                $icon_collapse.removeClass("hidden");
                $section_title_show.removeClass("shown").addClass("hidden");
                $section_title_hide.removeClass("hidden").addClass("shown");
            } else {
                $hidden_section.addClass("hidden");
                $icon_collapse.addClass("hidden");
                $icon_expand.removeClass("hidden");
                $section_title_show.removeClass("shown").addClass("hidden");
                $section_title_hide.removeClass("hidden").addClass("shown");
            }
    });

    // Handle closing notification bars with an animation when the close button is clicked
    $("div.alert").on("click", "button.close", function() {
        $(".alert-top").slideUp(500, function() {
            $(this).remove();
        });
        $(".alert-bottom").slideUp(500, function() {
            $(this).addClass("hidden");
        });
    });

    // Menu Float Blue functions Mitch M 2-26-17
    $("div#menu-float-blue").on("click", ".menu-float-blue-closed", function(){
       $(this).addClass("hidden");
       $(this).closest("#menu-float-blue").find(".menu-float-blue-open").removeClass("hidden");
    });

    $("div#menu-float-blue").on("click", ".menu-float-blue-open .close", function(){
        $(this).closest(".menu-float-blue-open").addClass("hidden");
        $(this).closest("#menu-float-blue").find(".menu-float-blue-closed").removeClass("hidden");
    });

    // Menu Float Blue fancy page scroll Mitch M 2-26-17
    $("#menu-float-blue .menu-float-blue-open ul li a").on("click", function() {
        var $offset;
        $offset = 75;

        var scrollAnchor = $(this).attr("data-scroll"),
            scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - $offset;

        $("body,html").animate({
            scrollTop: scrollPoint
        }, 500);

        return false;

    });





    // On any radio button click, remove the disabled state of the Continue button
    setTimeout(function() {
        $(".radio").on("click", function() {
            $("button").removeAttr("disabled");
        });
    }, 300);

    // On any checkbox click, remove the disabled state of the Continue button
    $(".check").on("click", function() {

        setTimeout(function() {
            if ($('input[type=checkbox]:checked').is(":checked") == true) {
                $("#btn-finalize").removeAttr("disabled");
            } else {
                $("#btn-finalize").attr('disabled', 'disabled');
            }
        }, 300);
    });

    /*$('body').on('click', '.btn-table', function () {
     $('[rel=tooltip]').tooltip('hide');

     });*/
    $('[data-toggle=tooltip],[rel=tooltip]').tooltip({
        container: 'body'
    }).click(function() {
        $('.tooltip').not(this).hide();
    });


//});
});
/////////// Formatting Functions ////////////////////

/* Formatting function for the modal window, expandable table details view */
/* This gets used by the DataTables API to create the detailed view layout  */
function formatRowDetails(d) {
    return '<div class="slider">' +
        '<div class="row">' +
        '<div class="col-md-3">Title: <strong>Face to Face</strong></div>' +
        '<div class="col-md-3">State: <strong>VA</strong></div>' +
        '<div class="col-md-6">Due Date: <strong>11/22/2016</strong></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-3">Title: <strong>Face to Face</strong></div>' +
        '<div class="col-md-3">State: <strong>VA</strong></div>' +
        '<div class="col-md-6">Due Date: <strong>11/22/2016</strong></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-3">Title: <strong>Face to Face</strong></div>' +
        '<div class="col-md-3">State: <strong>VA</strong></div>' +
        '<div class="col-md-6">Due Date: <strong>11/22/2016</strong></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-3">Title: <strong>Face to Face</strong></div>' +
        '<div class="col-md-3">State: <strong>VA</strong></div>' +
        '<div class="col-md-6">Due Date: <strong>11/22/2016</strong></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-3">Title: <strong>Face to Face</strong></div>' +
        '<div class="col-md-3">State: <strong>VA</strong></div>' +
        '<div class="col-md-6">Due Date: <strong>11/22/2016</strong></div>' +
        '</div>' +
        '</div>';
}

/* Full Screen Overlay Menu - Open when someone clicks the top left hamburger menu */
function openNav() {
    $("#swim-overlay-menu").css({"width" : "100%"});
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    $("#swim-overlay-menu").css({"width" : "0%"});
}

materialKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > 260) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17),

}


var big_image;

materialKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    }
}

// Handle Regional and State Agency table filters Mitch M 3-22-17
/*function filterRegOfficeState() {
    console.log("2");
    var allOptions = $("#select-state-agency option");
    $("#select-regional-office").change(function () {
        $("#select-state-agency option").remove();
        var classN = $("#select-regional-office option:selected").prop("class");
        if (classN == "all") {
            $.each(allOptions, function (i, j) {
                $(j).appendTo("#select-state-agency");
            });
            allOptions.attr('selected','selected');
        } else {
            var opts = allOptions.filter('.' + classN);
            $.each(opts, function (i, j) {
                $(j).appendTo("#select-state-agency");
            });
            $("<option value=\"All\" class=\"all\">All</option>").prependTo("#select-state-agency").prop("selected",true);
        }
    });

}*/

// Implement three dropdown filters in DataTables tables Mitch M 3-22-17
/*
function fnThreeWayFilter() {
    console.log("1");
    filterRegOfficeState();
    /!* Get the filter values *!/
    var filter1 = $('#select-regional-office').val();
    var filter2 = $('#select-state-agency').val();
    //var filter3 = $('#table-filter-wq-show-number').val();
    var filter = "";

    /!* Concat them together *!/
    if (filter1 != "") {
        filter += filter1 + " ";
    }

    if (filter2 != "") {
        filter += filter2 + " ";
    }

    /!*if (filter3 != "") {
        filter += filter3 + " ";
    }*!/

    /!* Drop the last space *!/
    if (filter != "") {
        filter = filter.replace(/ $/, "");
    }

    $("table-work-queue-assigned-requests").fnFilter(filter);
}*/
