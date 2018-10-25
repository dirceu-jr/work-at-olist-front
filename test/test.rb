require 'watir'

browser = Watir::Browser.new

browser.goto 'http://localhost:5000/'

browser.element(tag_name: 'input', id: 'submit_button').click

sleep 1

browser.text_field(id: "name").when_present.set("test name")
browser.text_field(id: "email").when_present.set("dirceuu@gmail.com")
browser.text_field(id: "password").when_present.set("abcdefA1")
browser.text_field(id: "confirm_password").when_present.set("abcdefA1")

sleep 1

browser.element(tag_name: 'input', id: 'submit_button').click

element = browser.div(class: "right")

p element.text

sleep 1
