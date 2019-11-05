// Copyright (c) 2019, k1 and contributors
// For license information, please see license.txt


frappe.ui.form.on('K1 Request Room', {
	booking_date: function(frm) {
		if (frm.doc.booking_date < get_today()) {
			frm.set_value('booking_date','');
			msgprint("<b>Tidak bisa mengisi tanggal kurang dari hari ini</b>", 'Warning !')
		}
	},
	end_date : function(frm,cdt,cdn){
        if(frm.doc.end_date < frm.doc.booking_date){
            frm.set_value('end_date','');
            msgprint("<b>Tidak bisa mengisi tanggal kurang dari tanggal booking</b>", 'Warning !')
		}
		else{
            harga_booking(frm,cdt,cdn);
		}
		frappe.call({
			method : "frappe.client.get",
			args:{
				doctype : "K1 Member",
				name : frm.doc.id_member
			},
			callback:function(r){
				if(r.message.point < frm.doc.booking_price){
					frm.disable_save();
						frappe.throw('Poin Kurang, Silahkan Top Up');
				}
				else{
					frm.enable_save();
				}
			}
		})
    }
});

let harga_booking = function(frm,cdt,cdn){
	let data = locals[cdt][cdn]
	let total_hari = frappe.datetime.get_day_diff(data.end_date, data.booking_date);
	let harga = frm.doc.total;
	let total_harga = ( total_hari + 1 ) * harga;
	let member_type = frm.doc.member_type;
    if(member_type == 'Gold'){
        var total_bayar = total_harga-(total_harga*20/100)
	}
	else if(member_type =='Silver'){
        var total_bayar = total_harga-(total_harga*10/100)
	}
	else if(member_type =='Bronze'){
        var total_bayar = total_harga - (total_harga*5/100)
	}
	else{
		var total_bayar = total_harga
	}
	frappe.model.set_value(cdt, cdn,"booking_price",total_bayar);
}

frappe.ui.form.on("K1 Request Room Line","room_price",function(frm){
	var data = frm.doc.data_request_room
	var room_price = 0
	for(let x in data){
		room_price = room_price + data[x].room_price
	}
	frm.set_value("total",room_price)
});

cur_frm.set_query('room_code', 'data_request_room', function(doc, cdt, cdn){
	var d = locals[cdt][cdn];
	return{
		filters: [
			['K1 Room', 'status_room', '=', 'Available']
		]
	}
});