// Copyright (c) 2019, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('K1 Member', {
	member_name: function(frm) {
		frm.set_value('join_date',get_today());
	}
});