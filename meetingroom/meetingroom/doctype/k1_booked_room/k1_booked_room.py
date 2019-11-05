from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class K1BookedRoom(Document):
	pass

	def on_cancel(self):
		self.restore_point()

	def restore_point(self):
		if(self.id_member):
			restore = frappe.get_doc("K1 Member",self.id_member)
			restore.point = restore.point + self.booking_price
			restore.save()
			self.restore_status_room()
	
	def restore_status_room(self):
		if(self.data_booked_room):
			for i in self.data_booked_room:
				kamar = frappe.get_doc("K1 Room",i.room_code)
				kamar.status_room = 'Available'
				kamar.save()
				self.req_cancel()
	
	def req_cancel(self):
		req = frappe.get_doc("K1 Request Room", self.id_request)
		req.cancel()
		self.delete_room()
	
	def delete_room(self):
		frappe.delete_doc("K1 Booked Room", self.name)
