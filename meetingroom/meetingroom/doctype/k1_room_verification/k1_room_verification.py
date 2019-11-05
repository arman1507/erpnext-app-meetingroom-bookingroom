# -- coding: utf-8 --
# Copyright (c) 2019, Frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class K1RoomVerification(Document):
	pass

	def before_save(self):
		self.change_status_booked_room()

	def change_status_booked_room(self):
		if(self.id_booking):
			booked = frappe.get_doc("K1 Booked Room",self.id_booking)
			if(booked.status == 'Booked'):
				booked.status = 'In Room'
				self.status = 'In Room'
				booked.save()