! function(a) {
    jQuery.fn.exists = function() {
        return jQuery(this).length
    }, a(function() {
        a(".phonefield").exists() && a(".phonefield").mask("38 (999) 999-99-99"), a(".form_check").exists() && a(".form_check").each(function() {
            function d() {
                b.find(".rfield").each(function() {
                    if (a(this).hasClass("phonefield")) {
                        var b = a(this); - 1 != b.val().indexOf("_") || "" == b.val() ? b.addClass("empty_field") : b.removeClass("empty_field")
                    } else if (a(this).hasClass("mailfield")) {
                        var c = a(this),
                            d = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                        d.test(c.val()) ? c.removeClass("empty_field") : c.addClass("empty_field")
                    } else if (a(this).is(":checkbox")) {
                        var e = a(this);
                        e.is(":checked") ? e.removeClass("empty_field") : e.addClass("empty_field")
                    } else "" != a(this).val() ? a(this).removeClass("empty_field") : a(this).addClass("empty_field")
                })
            }

            function e() {
                b.find(".empty_field").addClass("rf_error"), b.find(".empty_field").parents(".rline").find(".rfield_error").css({
                    visibility: "visible"
                }), setTimeout(function() {
                    b.find(".empty_field").removeClass("rf_error"), b.find(".empty_field").parents(".rline").find(".rfield_error").css({
                        visibility: "hidden"
                    })
                }, 5e3)
            }
            var b = a(this),
                c = b.find(".btnsubmit");

            if ($('html').attr('lang') == 'ru') {
                b.find(".rfield").addClass("empty_field").parents(".rline").append('<span class="rfield_error">Заполните это поле</span>'), c.addClass("disabled"), setInterval(function() {
                    d();
                    var a = b.find(".empty_field").length;
                    if (a > 0) {
                        if (c.hasClass("disabled")) return !1;
                        c.addClass("disabled")
                    } else c.removeClass("disabled")
                }, 500), c.click(function() {
                    return a(this).hasClass("disabled") ? (e(), !1) : void b.addClass("ok")
                })
            } else {
                b.find(".rfield").addClass("empty_field").parents(".rline").append('<span class="rfield_error">Заповніть це поле</span>'), c.addClass("disabled"), setInterval(function() {
                    d();
                    var a = b.find(".empty_field").length;
                    if (a > 0) {
                        if (c.hasClass("disabled")) return !1;
                        c.addClass("disabled")
                    } else c.removeClass("disabled")
                }, 500), c.click(function() {
                    return a(this).hasClass("disabled") ? (e(), !1) : void b.addClass("ok")
                })
            }
        })
    })
}(jQuery);