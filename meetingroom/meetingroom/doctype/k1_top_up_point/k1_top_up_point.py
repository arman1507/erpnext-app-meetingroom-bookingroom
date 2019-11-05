# -- coding: utf-8 --
# Copyright (c) 2019, Frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class K1TopUpPoint(Document):
	pass

	def on_submit(self):
		self.on_approve()

	def on_approve(self):
		if(self.id_member):
			kirim = frappe.get_doc("K1 Member", self.id_member)
			kirim.point = kirim.point + self.top_up_point
			kirim.history_point = kirim.history_point + self.top_up_point
			frappe.msgprint("Sukses Top Up pada Id member {}".format(self.id_member))
			kirim.save()
			if(kirim.history_point < 50):
				kirim.member_type = '-'
			elif(kirim.history_point < 200):
				kirim.member_type = 'Bronze'
			elif(kirim.history_point < 500):
				kirim.member_type = 'Silver'
			else:
				kirim.member_type = 'Gold'
			kirim.save()