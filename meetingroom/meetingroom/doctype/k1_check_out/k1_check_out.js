frappe.ui.form.on('K1 Check Out', {
	id_verification: function(frm) {
		frm.doc.data_check_out = []
		if (frm.doc.id_verification){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "K1 Room Verification",
					name: frm.doc.id_verification
				},
				callback: function (r) {
                    if (r.message) {
                        for (var row in r.message.data_room_verification) {
                            var child = frm.add_child("data_check_out");
                            frappe.model.set_value(child.doctype, child.name, "room_code",
                                r.message.data_room_verification[row].room_code);
                            frappe.model.set_value(child.doctype, child.name, "room_type",
                                r.message.data_room_verification[row].room_type);
                            frappe.model.set_value(child.doctype, child.name, "room_price",
                                r.message.data_room_verification[row].room_price);
                        }
                    }
                    frm.refresh_field('data_check_out')
                }
            })
		}
	}
});


cur_frm.set_query('id_verification', function() {
	return{
		filters: [
			['K1 Room Verification', 'status', '=', 'In Room']
		]
	}
});