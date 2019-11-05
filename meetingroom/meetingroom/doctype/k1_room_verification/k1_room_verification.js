// Copyright (c) 2019, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('K1 Room Verification', {
	id_booking: function(frm) {
		frm.doc.data_room_verification = []
		if (frm.doc.id_booking){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "K1 Booked Room",
					name: frm.doc.id_booking
				},
				callback: function (r) {
                    if (r.message) {
                        for (var row in r.message.data_booked_room) {
                            var child = frm.add_child("data_room_verification");
                            frappe.model.set_value(child.doctype, child.name, "room_code",
                                r.message.data_booked_room[row].room_code);
                            frappe.model.set_value(child.doctype, child.name, "room_type",
                                r.message.data_booked_room[row].room_type);
                            frappe.model.set_value(child.doctype, child.name, "room_price",
                                r.message.data_booked_room[row].room_price);
                        }
                    }
                    frm.refresh_field('data_room_verification')
                }
            })
        }
	}
});

cur_frm.set_query('id_booking', function() {
	return{
		filters: [
			['K1 Booked Room', 'status', '=', 'Booked']
		]
	}
});