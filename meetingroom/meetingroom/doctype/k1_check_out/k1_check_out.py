from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class K1CheckOut(Document):
	pass

	def on_submit(self):
		self.change_status_kamar()

	def change_status_kamar(self):
		if (self.data_check_out):
			for i in self.data_check_out:
				checkout = frappe.get_doc("K1 Room",i.room_code)
				checkout.status_room = 'Available'
				checkout.save()

			booked_room = frappe.get_doc("K1 Booked Room",self.id_booking)
			room_verif = frappe.get_doc("K1 Room Verification",self.id_verification)
			booked_room.status = 'Closed'
			room_verif.status = 'Closed'
			booked_room.save()
			room_verif.save()
			booked_room.submit()
			room_verif.submit()
			