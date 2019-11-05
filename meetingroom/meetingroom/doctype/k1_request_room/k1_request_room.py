from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class K1RequestRoom(Document):
	pass

	def on_submit(self):
		self.on_approve()

	def on_approve(self):
		if(self.docstatus == 1):
			booked = frappe.new_doc("K1 Booked Room")
			booked.id_request = self.name
			booked.status = 'Booked'
			for i in self.data_request_room:
				booked.append('data_booked_room',{
					'room_code': i.room_code,
					'room_type': i.room_type,
					'room_price': i.room_price
				})
			booked.save()

			new_booked = frappe.get_doc("K1 Booked Room", booked.name)
			frappe.msgprint('Success create booked with doc no.{}'.format(new_booked.name))
			self.change_status_kamar()

	def change_status_kamar(self):
		if(self.data_request_room):
			for i in self.data_request_room:
				kamar = frappe.get_doc("K1 Room",i.room_code)
				kamar.status_room = 'Booked'
				kamar.save()
				self.pengurangan_poin()

	def pengurangan_poin(self):
		if(self.id_member):
			kurang = frappe.get_doc("K1 Member",self.id_member)
			kurang.point = kurang.point - self.booking_price
			kurang.save()