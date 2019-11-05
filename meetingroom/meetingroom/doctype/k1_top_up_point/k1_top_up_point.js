frappe.ui.form.on('K1 Top Up Point', {
	top_up_nominal: function(frm) {
		var tu = frm.doc.top_up_nominal;
		var ptu = tu / 10000;
		frm.set_value('top_up_point',ptu);
	}
});